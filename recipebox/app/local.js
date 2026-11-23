// This browser's copy of the account, so you stay signed in and the app works without Google Drive.
// Records are sealed with a device key that scripts can use but can't read out of the browser.

const DB_NAME = "recipebox-web-v1";
const STORE = "kv";
const enc = new TextEncoder();
const dec = new TextDecoder();

function openDb() {
  return new Promise((res, rej) => {
    const r = indexedDB.open(DB_NAME, 1);
    r.onupgradeneeded = () => r.result.createObjectStore(STORE);
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
    r.onblocked = () => rej(new Error("Browser storage is busy"));
  });
}
async function tx(mode, work) {
  const db = await openDb();
  try {
    return await new Promise((res, rej) => {
      const t = db.transaction(STORE, mode), req = work(t.objectStore(STORE));
      t.oncomplete = () => res(req?.result);
      t.onerror = () => rej(t.error);
      t.onabort = () => rej(t.error);
    });
  } finally { db.close(); }
}
const get = (k) => tx("readonly", (s) => s.get(k));
const put = (k, v) => tx("readwrite", (s) => s.put(v, k));
const del = (k) => tx("readwrite", (s) => s.delete(k));

async function deviceKey() {
  const have = await get("deviceKey");
  if (have) return have;
  const key = await crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);
  // add() fails if another tab created the key first; that tab's key is then the one to use.
  try { await tx("readwrite", (s) => s.add(key, "deviceKey")); } catch { /* created elsewhere */ }
  return get("deviceKey");
}

const accountKey = (email) => "account:" + email.toLowerCase();

export const getSession = () => get("session");
export const setSession = (s) => put("session", s);

export async function loadAccount(email) {
  const rec = await get(accountKey(email));
  if (!rec) return null;
  const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv: rec.iv }, await deviceKey(), rec.body);
  return JSON.parse(dec.decode(plain));
}
export async function saveAccount(email, value) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const body = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, await deviceKey(), enc.encode(JSON.stringify(value)));
  await put(accountKey(email), { iv, body });
}
export async function forgetAccount(email) {
  await del(accountKey(email));
  await del("session");
}
