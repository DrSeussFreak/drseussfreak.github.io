// Browser services for the SpiceTracker web app (Google sign-in, Drive requests, file import/export).
window.SpiceWeb = {
  signIn(clientId, scope, prompt, hint) {
    return new Promise((resolve) => {
      const done = (o) => resolve(JSON.stringify(o));
      const oauth = window.google && google.accounts && google.accounts.oauth2;
      if (!oauth) return done({ error: "Google sign-in is still loading. Try again in a moment." });
      const client = oauth.initTokenClient({
        client_id: clientId, scope, prompt, hint: hint || undefined,
        callback: (r) => done(r.error ? { error: r.error_description || r.error } : { token: r.access_token, expires: Number(r.expires_in) }),
        error_callback: (e) => done(e.type === "popup_closed" ? {} :
          { error: e.type === "popup_failed_to_open" ? "Your browser blocked Google's sign-in window. Allow pop-ups for this site." : (e.message || e.type) }),
      });
      client.requestAccessToken();
    });
  },
  /** One-shot: the next click renews Google access (browsers block the window without a click). */
  armRenew(clientId, scope, hint) {
    return new Promise((resolve) => {
      const onClick = () => {
        document.removeEventListener("click", onClick, true);
        SpiceWeb.signIn(clientId, scope, "", hint).then(resolve);
      };
      document.addEventListener("click", onClick, true);
    });
  },
  /** Stored secrets, decrypted with this browser's non-extractable key. Unreadable entries are skipped. */
  async loadSecrets() {
    const out = {};
    try {
      const names = Object.keys(localStorage).filter((k) => k.startsWith(SECRET_PREFIX));
      if (!names.length) return JSON.stringify(out);
      const key = await deviceKey(false);
      if (!key) return JSON.stringify(out);
      for (const k of names) {
        try {
          const raw = Uint8Array.from(atob(localStorage.getItem(k)), (c) => c.charCodeAt(0));
          const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv: raw.subarray(0, 12) }, key, raw.subarray(12));
          out[k.slice(SECRET_PREFIX.length)] = new TextDecoder().decode(plain);
        } catch (_) {}
      }
    } catch (_) {}
    return JSON.stringify(out);
  },
  saveSecret(k, v) {
    secretQueue = secretQueue.then(async () => {
      if (v === null || v === undefined) return localStorage.removeItem(SECRET_PREFIX + k);
      const key = await deviceKey(true);
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const sealed = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(v)));
      const all = new Uint8Array(12 + sealed.length);
      all.set(iv); all.set(sealed, 12);
      localStorage.setItem(SECRET_PREFIX + k, toBase64(all));
    }).catch(() => {});
  },
  /** Sign-out: remove everything except appearance, including the browser key. */
  clearSession() {
    secretQueue = secretQueue.then(async () => {
      for (const k of Object.keys(localStorage))
        if (k.startsWith("spicetracker.") && !k.startsWith("spicetracker.theme.")) localStorage.removeItem(k);
      const db = await openKeyDb();
      await idb(db.transaction("keys", "readwrite").objectStore("keys").delete("device"));
      db.close();
    }).catch(() => {});
  },
  revoke(token) { try { google.accounts.oauth2.revoke(token, () => {}); } catch (_) {} },
  async http(method, url, headers, body) {
    const res = await fetch(url, { method, headers: JSON.parse(headers), body: body || undefined, cache: "no-store" });
    return JSON.stringify({ code: res.status, text: await res.text() });
  },
  pickFile() {
    return new Promise((resolve) => {
      const input = document.createElement("input");
      input.type = "file";
      input.oncancel = () => resolve(null);
      input.onchange = async () => {
        const f = input.files[0];
        if (!f) return resolve(null);
        try {
          const bytes = new Uint8Array(await f.arrayBuffer());
          if (bytes[0] === 0x50 && bytes[1] === 0x4b) resolve(JSON.stringify({ name: f.name, entries: await unzipXml(bytes) }));
          else resolve(JSON.stringify({ name: f.name, base64: toBase64(bytes) }));
        } catch (_) { resolve(JSON.stringify({ name: f.name, base64: "" })); }
      };
      input.click();
    });
  },
  download(name, text) {
    const url = URL.createObjectURL(new Blob([text], { type: "application/octet-stream" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: name });
    document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
  },
};

const SECRET_PREFIX = "spicetracker.secret.";
let secretQueue = Promise.resolve();

function idb(req) {
  return new Promise((resolve, reject) => { req.onsuccess = () => resolve(req.result); req.onerror = () => reject(req.error); });
}
function openKeyDb() {
  const req = indexedDB.open("spicetracker", 1);
  req.onupgradeneeded = () => req.result.createObjectStore("keys");
  return idb(req);
}
/** An AES key the page can use but can't read or export. */
async function deviceKey(create) {
  const db = await openKeyDb();
  try {
    let key = await idb(db.transaction("keys").objectStore("keys").get("device"));
    if (!key && create) {
      key = await crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);
      await idb(db.transaction("keys", "readwrite").objectStore("keys").put(key, "device"));
    }
    return key || null;
  } finally { db.close(); }
}

function toBase64(bytes) {
  let s = "";
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  return btoa(s);
}

/** The XML parts of an Office/OpenDocument zip, read through its central directory. */
async function unzipXml(bytes) {
  const v = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  let end = bytes.length - 22;
  while (end >= 0 && v.getUint32(end, true) !== 0x06054b50) end--;
  if (end < 0) throw new Error("not a zip");
  const count = v.getUint16(end + 10, true);
  let p = v.getUint32(end + 16, true);
  const out = {}, dec = new TextDecoder();
  for (let i = 0; i < count && v.getUint32(p, true) === 0x02014b50; i++) {
    const method = v.getUint16(p + 10, true), size = v.getUint32(p + 20, true), real = v.getUint32(p + 24, true);
    const nameLen = v.getUint16(p + 28, true), extra = v.getUint16(p + 30, true), note = v.getUint16(p + 32, true), at = v.getUint32(p + 42, true);
    const name = dec.decode(bytes.subarray(p + 46, p + 46 + nameLen));
    p += 46 + nameLen + extra + note;
    if (!name.toLowerCase().endsWith(".xml") || real > 50_000_000) continue;
    const start = at + 30 + v.getUint16(at + 26, true) + v.getUint16(at + 28, true);
    const raw = bytes.subarray(start, start + size);
    if (method === 0) out[name] = dec.decode(raw);
    else if (method === 8) out[name] = await new Response(new Blob([raw]).stream().pipeThrough(new DecompressionStream("deflate-raw"))).text();
  }
  return out;
}
