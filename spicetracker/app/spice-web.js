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
