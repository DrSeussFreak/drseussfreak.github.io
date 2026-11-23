// IndexedDB holds non-extractable CryptoKeys and ciphertext only.
const DB = 'studcraft-secure';
const STORE = 'kv';

export function createIdbKv(factory = globalThis.indexedDB) {
  let opening = null;
  const open = () => {
    opening ??= new Promise((resolve, reject) => {
      if (!factory) { reject(new Error('unavailable')); return; }
      const req = factory.open(DB, 1);
      req.onupgradeneeded = () => req.result.createObjectStore(STORE);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
      req.onblocked = () => reject(new Error('blocked'));
    }).catch((e) => { opening = null; throw e; });
    return opening;
  };
  const run = async (mode, work) => {
    const db = await open();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, mode);
      let value;
      const req = work(tx.objectStore(STORE), (v) => { value = v; });
      if (req) req.onsuccess = () => { value = req.result; };
      tx.oncomplete = () => resolve(value);
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error);
    });
  };
  return {
    get: (k) => run('readonly', (s) => s.get(k)),
    set: (k, v) => run('readwrite', (s) => { s.put(v, k); }),
    del: (k) => run('readwrite', (s) => { s.delete(k); }),
    keys: async (prefix) => (await run('readonly', (s) => s.getAllKeys())).filter((k) => String(k).startsWith(prefix)),
    /** Two tabs starting together end up with the same record. */
    setIfAbsent: (k, v) => run('readwrite', (s, done) => {
      const get = s.get(k);
      get.onsuccess = () => {
        if (get.result !== undefined) done(get.result);
        else { s.put(v, k); done(v); }
      };
    }),
  };
}

/** Used when IndexedDB is blocked: nothing is written to disk. */
export function createMemoryKv() {
  const map = new Map();
  return {
    async get(k) { return map.get(k); },
    async set(k, v) { map.set(k, v); },
    async del(k) { map.delete(k); },
    async keys(prefix) { return [...map.keys()].filter((k) => k.startsWith(prefix)); },
    async setIfAbsent(k, v) { if (!map.has(k)) map.set(k, v); return map.get(k); },
  };
}

export async function createBestKv() {
  const kv = createIdbKv();
  try { await kv.get('probe'); return { kv, durable: true }; } catch { return { kv: createMemoryKv(), durable: false }; }
}
