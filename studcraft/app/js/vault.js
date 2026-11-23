// API keys live in memory. "Remember" stores only ciphertext, encrypted with the user's passphrase.

export const VAULT_KEY = 'studcraft.vault.v1';
export const PBKDF2_ITERATIONS = 600_000;
const MAX_ITERATIONS = 5_000_000;
const AAD = new TextEncoder().encode('studcraft-keys-v1');
export const MIN_PASSPHRASE = 10;

const toB64 = (bytes) => btoa(String.fromCharCode(...bytes));
const fromB64 = (text) => Uint8Array.from(atob(text), (c) => c.charCodeAt(0));

async function deriveKey(passphrase, salt, iterations, usage) {
  const material = await crypto.subtle.importKey('raw', new TextEncoder().encode(passphrase), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', hash: 'SHA-256', salt, iterations },
    material,
    { name: 'AES-GCM', length: 256 },
    false,
    [usage],
  );
}

export async function encryptKeys(keys, passphrase) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(passphrase, salt, PBKDF2_ITERATIONS, 'encrypt');
  const data = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv, additionalData: AAD }, key, new TextEncoder().encode(JSON.stringify(keys))));
  return { v: 1, kdf: 'PBKDF2-SHA-256', iterations: PBKDF2_ITERATIONS, salt: toB64(salt), iv: toB64(iv), data: toB64(data) };
}

export async function decryptKeys(record, passphrase) {
  if (!isValidRecord(record)) throw new Error('Saved keys are unreadable.');
  const key = await deriveKey(passphrase, fromB64(record.salt), record.iterations, 'decrypt');
  let plain;
  try {
    plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: fromB64(record.iv), additionalData: AAD }, key, fromB64(record.data));
  } catch {
    throw new Error('Wrong passphrase, or the saved keys were changed.');
  }
  const parsed = JSON.parse(new TextDecoder().decode(plain));
  const out = {};
  for (const provider of ['gemini', 'claude', 'openai']) {
    if (typeof parsed[provider] === 'string') out[provider] = parsed[provider];
  }
  return out;
}

export function isValidRecord(r) {
  return !!r && r.v === 1 && Number.isInteger(r.iterations) && r.iterations >= PBKDF2_ITERATIONS && r.iterations <= MAX_ITERATIONS &&
    typeof r.salt === 'string' && typeof r.iv === 'string' && typeof r.data === 'string' && r.data.length < 20000 &&
    fromB64Safe(r.salt) === 16 && fromB64Safe(r.iv) === 12;
}

function fromB64Safe(text) {
  try { return fromB64(text).length; } catch { return -1; }
}

export function readVault(storage) {
  try {
    const raw = storage.getItem(VAULT_KEY);
    if (!raw) return null;
    const record = JSON.parse(raw);
    return isValidRecord(record) ? record : null;
  } catch {
    return null;
  }
}

export function writeVault(storage, record) { storage.setItem(VAULT_KEY, JSON.stringify(record)); }

export function clearVault(storage) {
  try { storage.removeItem(VAULT_KEY); } catch { /* storage may be blocked */ }
}

/** Holds keys in a private field. Nothing here serializes or prints them. */
export class KeyStore {
  #keys = new Map();
  set(provider, value) {
    const clean = String(value ?? '').trim();
    if (clean) this.#keys.set(provider, clean); else this.#keys.delete(provider);
  }
  get(provider) { return this.#keys.get(provider) ?? ''; }
  has(provider) { return this.#keys.has(provider); }
  providers() { return [...this.#keys.keys()]; }
  values() { return [...this.#keys.values()]; }
  snapshot() { return Object.fromEntries(this.#keys); }
  load(keys) { for (const [p, v] of Object.entries(keys)) this.set(p, v); }
  clear() { this.#keys.clear(); }
  toJSON() { return {}; }
  toString() { return '[KeyStore]'; }
}
