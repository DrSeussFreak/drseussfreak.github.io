// The encrypted StudCraft project format shared with Android and Mac (securesync/SecureFormat.kt). Change both together.
//
// Container: "SCE1" | version u8 | kind u8 | reserved u16 | keyId[16] | objectId[16] | metaLen u32be | metaIv[12]
//            | metaCiphertext | bodyIv[12] | bodyCiphertext
// The metadata AAD is the 56-byte header. The body AAD is every byte before the body ciphertext.

export const CONTAINER_VERSION = 1;
export const KIND = Object.freeze({ PROJECT: 1, DRAFT: 2, QUEUE: 3 });
export const HEADER_BYTES = 56;
export const IV_BYTES = 12;
export const TAG_BYTES = 16;
export const MAX_META_BYTES = 4096;
export const META_RANGE_BYTES = 8192;
export const MAX_FILE_BYTES = 8 * 1024 * 1024;
export const MAX_IMAGE_BYTES = 3 * 1024 * 1024;
export const MAX_KEYRING_BYTES = 16 * 1024;
export const KEYRING_FORMAT = 'studcraft-keyring';
export const KEYRING_VERSION = 1;
export const KDF = 'PBKDF2-HMAC-SHA256';
export const CIPHER = 'AES-256-GCM';
export const ITERATIONS = 600_000;
export const MAX_ITERATIONS = 2_000_000;
export const SALT_BYTES = 16;
export const MIN_PASSPHRASE = 12;
export const MAX_PASSPHRASE = 1024;
export const LOST_PASSPHRASE_WARNING = 'StudCraft never stores or sends this passphrase. If you lose it, your encrypted projects cannot be recovered by anyone.';

const MAGIC = [0x53, 0x43, 0x45, 0x31];
const MAX_JSON_DEPTH = 8;
const HEX32 = /^[0-9a-f]{32}$/;
const MIME = ['image/jpeg', 'image/png'];
const enc = new TextEncoder();
const utf8 = (s) => enc.encode(s);

export class SecureError extends Error {
  constructor(reason, message) { super(message); this.reason = reason; }
}
const bad = () => new SecureError('INVALID', "This isn't a readable StudCraft encrypted file.");
const tooLarge = () => new SecureError('TOO_LARGE', 'This encrypted file is too large.');
const tampered = () => new SecureError('TAMPERED', 'This encrypted file was changed or belongs to a different key.');
const wrongPass = () => new SecureError('WRONG_PASSPHRASE', 'Wrong passphrase, or the keyring was changed.');

export const toHex = (b) => Array.from(b, (x) => x.toString(16).padStart(2, '0')).join('');
export function fromHex(text) {
  if (typeof text !== 'string' || text.length % 2 || !/^[0-9a-f]*$/.test(text)) throw bad();
  const out = new Uint8Array(text.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(text.slice(i * 2, i * 2 + 2), 16);
  return out;
}
export const randomId = () => toHex(crypto.getRandomValues(new Uint8Array(16)));

export function toB64(bytes) {
  let text = '';
  for (let i = 0; i < bytes.length; i += 0x6000) text += String.fromCharCode(...bytes.subarray(i, i + 0x6000));
  return btoa(text);
}
export function fromB64(text) {
  if (typeof text !== 'string' || !text || text.length % 4 || !/^[A-Za-z0-9+/]+={0,2}$/.test(text)) return null;
  let binary;
  try { binary = atob(text); } catch { return null; }
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return toB64(bytes) === text ? bytes : null;
}

const normalize = (p) => String(p ?? '').normalize('NFC');
export function passphraseProblem(passphrase, confirmation) {
  const clean = normalize(passphrase);
  if (clean.length < MIN_PASSPHRASE) return `Use at least ${MIN_PASSPHRASE} characters.`;
  if (clean.length > MAX_PASSPHRASE) return `Use at most ${MAX_PASSPHRASE} characters.`;
  if (clean !== normalize(confirmation)) return "The passphrases don't match.";
  return null;
}

function jsonDepth(text) {
  let depth = 0; let deepest = 0; let inString = false; let escaped = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (escaped) escaped = false;
    else if (inString && c === '\\') escaped = true;
    else if (c === '"') inString = !inString;
    else if (inString) continue;
    else if (c === '{' || c === '[') deepest = Math.max(deepest, ++depth);
    else if (c === '}' || c === ']') depth--;
  }
  return deepest;
}
const isObject = (v) => typeof v === 'object' && v !== null && !Array.isArray(v);
function parseJson(bytes) {
  let text;
  try { text = new TextDecoder('utf-8', { fatal: true }).decode(bytes); } catch { throw bad(); }
  if (jsonDepth(text) > MAX_JSON_DEPTH) throw bad();
  let value;
  try { value = JSON.parse(text); } catch { throw bad(); }
  if (!isObject(value)) throw bad();
  return value;
}

/* ---------- keys ---------- */
async function hkdf(rootKey, info, bits = 256) {
  return new Uint8Array(await crypto.subtle.deriveBits({ name: 'HKDF', hash: 'SHA-256', salt: new Uint8Array(32), info: utf8(info) }, rootKey, bits));
}

/** Derives the working keys. Neither CryptoKey can be exported. The caller wipes rootBytes. */
export async function deriveKeys(rootBytes) {
  if (rootBytes.length !== 32) throw bad();
  const root = await crypto.subtle.importKey('raw', rootBytes, 'HKDF', false, ['deriveBits']);
  const contentBits = await hkdf(root, 'studcraft/v1/content');
  const nameBits = await hkdf(root, 'studcraft/v1/names');
  const keyId = (await hkdf(root, 'studcraft/v1/key-id')).slice(0, 16);
  try {
    const content = await crypto.subtle.importKey('raw', contentBits, 'AES-GCM', false, ['encrypt', 'decrypt']);
    const names = await crypto.subtle.importKey('raw', nameBits, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
    return { content, names, keyId: toHex(keyId) };
  } finally {
    contentBits.fill(0);
    nameBits.fill(0);
  }
}

async function nameTag(keys, text) {
  return toHex(new Uint8Array(await crypto.subtle.sign('HMAC', keys.names, utf8(text))).slice(0, 16));
}
export const groupTag = (keys, project) => nameTag(keys, `project:${project}`);
export const importedProjectId = (keys, sourceId) => nameTag(keys, `firestore:${sourceId}`);

async function passKey(phrase, salt, iterations, usage) {
  const material = await crypto.subtle.importKey('raw', utf8(phrase), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations }, material, { name: 'AES-GCM', length: 256 }, false, [usage]);
}
const keyringAad = (generation, keyId, iterations, salt, iv) =>
  utf8([KEYRING_FORMAT, KEYRING_VERSION, generation, keyId, KDF, iterations, salt, CIPHER, iv].join('\n'));

export async function wrapRoot(rootBytes, keyId, passphrase, generation = 1) {
  const phrase = normalize(passphrase);
  if (phrase.length < MIN_PASSPHRASE || phrase.length > MAX_PASSPHRASE) throw new SecureError('WEAK_PASSPHRASE', 'Passphrase length is out of range.');
  const salt = crypto.getRandomValues(new Uint8Array(SALT_BYTES));
  const iv = crypto.getRandomValues(new Uint8Array(IV_BYTES));
  const saltText = toB64(salt); const ivText = toB64(iv);
  const key = await passKey(phrase, salt, ITERATIONS, 'encrypt');
  const wrapped = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv, tagLength: 128, additionalData: keyringAad(generation, keyId, ITERATIONS, saltText, ivText) }, key, rootBytes));
  return utf8(JSON.stringify({ format: KEYRING_FORMAT, version: KEYRING_VERSION, generation, keyId, kdf: { name: KDF, iterations: ITERATIONS, salt: saltText }, cipher: { name: CIPHER, iv: ivText }, wrapped: toB64(wrapped) }));
}

export function parseKeyring(bytes) {
  if (bytes.length > MAX_KEYRING_BYTES) throw tooLarge();
  const r = parseJson(bytes);
  if (r.format !== KEYRING_FORMAT || !Number.isInteger(r.version)) throw bad();
  if (r.version !== KEYRING_VERSION) throw new SecureError('UNSUPPORTED_VERSION', 'This keyring was made by a newer version of StudCraft. Update the app.');
  if (!Number.isInteger(r.generation) || r.generation < 1 || r.generation > 1_000_000 || !HEX32.test(r.keyId ?? '')) throw bad();
  if (!isObject(r.kdf) || !isObject(r.cipher) || r.kdf.name !== KDF || r.cipher.name !== CIPHER) throw bad();
  if (!Number.isInteger(r.kdf.iterations) || r.kdf.iterations < ITERATIONS || r.kdf.iterations > MAX_ITERATIONS) throw bad();
  const salt = fromB64(r.kdf.salt); const iv = fromB64(r.cipher.iv); const wrapped = fromB64(r.wrapped);
  if (!salt || !iv || !wrapped || salt.length !== SALT_BYTES || iv.length !== IV_BYTES || wrapped.length !== 32 + TAG_BYTES) throw bad();
  return { generation: r.generation, keyId: r.keyId, iterations: r.kdf.iterations, saltText: r.kdf.salt, salt, ivText: r.cipher.iv, iv, wrapped };
}

/** Returns the raw root key. The caller wipes it. */
export async function unwrapRoot(bytes, passphrase) {
  const r = parseKeyring(bytes);
  const phrase = normalize(passphrase);
  if (phrase.length < MIN_PASSPHRASE || phrase.length > MAX_PASSPHRASE) throw wrongPass();
  const key = await passKey(phrase, r.salt, r.iterations, 'decrypt');
  let root;
  try {
    root = new Uint8Array(await crypto.subtle.decrypt({ name: 'AES-GCM', iv: r.iv, tagLength: 128, additionalData: keyringAad(r.generation, r.keyId, r.iterations, r.saltText, r.ivText) }, key, r.wrapped));
  } catch { throw wrongPass(); }
  const derived = await deriveKeys(root);
  if (derived.keyId !== r.keyId) { root.fill(0); throw wrongPass(); }
  return { root, keys: derived, generation: r.generation };
}

export async function newRoot() {
  const root = crypto.getRandomValues(new Uint8Array(32));
  return { root, keys: await deriveKeys(root) };
}

/* ---------- container ---------- */
function parseHeader(bytes, needFull) {
  if (!(bytes instanceof Uint8Array) || bytes.length < HEADER_BYTES + TAG_BYTES) throw bad();
  if (bytes.length > MAX_FILE_BYTES) throw tooLarge();
  for (let i = 0; i < 4; i++) if (bytes[i] !== MAGIC[i]) throw bad();
  if (bytes[4] !== CONTAINER_VERSION) throw new SecureError('UNSUPPORTED_VERSION', 'This file was made by a newer version of StudCraft. Update the app.');
  const kind = bytes[5];
  if (![1, 2, 3].includes(kind) || bytes[6] !== 0 || bytes[7] !== 0) throw bad();
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const metaLen = view.getUint32(40);
  if (metaLen < TAG_BYTES + 2 || metaLen > MAX_META_BYTES + TAG_BYTES) throw bad();
  const metaEnd = HEADER_BYTES + metaLen;
  if (bytes.length < metaEnd) throw bad();
  if (needFull && bytes.length < metaEnd + IV_BYTES + TAG_BYTES) throw bad();
  return { kind, keyId: toHex(bytes.subarray(8, 24)), objectId: toHex(bytes.subarray(24, 40)), metaLen, metaEnd };
}

export async function sealContainer({ key, keyId, kind, objectId, meta, body }) {
  const metaPlain = utf8(JSON.stringify(meta));
  if (metaPlain.length > MAX_META_BYTES) throw tooLarge();
  const metaLen = metaPlain.length + TAG_BYTES;
  const head = new Uint8Array(HEADER_BYTES);
  head.set(MAGIC, 0); head[4] = CONTAINER_VERSION; head[5] = kind;
  head.set(fromHex(keyId), 8); head.set(fromHex(objectId), 24);
  new DataView(head.buffer).setUint32(40, metaLen);
  head.set(crypto.getRandomValues(new Uint8Array(IV_BYTES)), 44);
  const metaCt = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv: head.subarray(44, 56), tagLength: 128, additionalData: head }, key, metaPlain));
  const bodyIv = crypto.getRandomValues(new Uint8Array(IV_BYTES));
  const prefix = new Uint8Array(HEADER_BYTES + metaLen + IV_BYTES);
  prefix.set(head); prefix.set(metaCt, HEADER_BYTES); prefix.set(bodyIv, HEADER_BYTES + metaLen);
  const bodyCt = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv: bodyIv, tagLength: 128, additionalData: prefix }, key, body));
  if (prefix.length + bodyCt.length > MAX_FILE_BYTES) throw tooLarge();
  const out = new Uint8Array(prefix.length + bodyCt.length);
  out.set(prefix); out.set(bodyCt, prefix.length);
  return out;
}

function checkExpect(h, keyId, kind, objectId) {
  if (h.keyId !== keyId) throw tampered();
  if (kind !== undefined && h.kind !== kind) throw tampered();
  if (objectId !== undefined && h.objectId !== objectId) throw tampered();
}

/** Decrypts only the metadata, so a listing needs just the first bytes of each file. */
export async function openMeta({ key, keyId, bytes, kind, objectId }) {
  const h = parseHeader(bytes, false);
  checkExpect(h, keyId, kind, objectId);
  let plain;
  try {
    plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: bytes.subarray(44, 56), tagLength: 128, additionalData: bytes.subarray(0, HEADER_BYTES) }, key, bytes.subarray(HEADER_BYTES, h.metaEnd));
  } catch { throw tampered(); }
  return { header: h, meta: parseJson(new Uint8Array(plain)) };
}

export async function openContainer({ key, keyId, bytes, kind, objectId }) {
  const { header: h, meta } = await openMeta({ key, keyId, bytes, kind, objectId });
  if (bytes.length < h.metaEnd + IV_BYTES + TAG_BYTES) throw bad();
  const bodyStart = h.metaEnd + IV_BYTES;
  let plain;
  try {
    plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: bytes.subarray(h.metaEnd, bodyStart), tagLength: 128, additionalData: bytes.subarray(0, bodyStart) }, key, bytes.subarray(bodyStart));
  } catch { throw tampered(); }
  return { header: h, meta, body: new Uint8Array(plain) };
}

/* ---------- project ---------- */
// eslint-disable-next-line no-control-regex
const hasControl = (s, allowNewline = false) => (allowNewline ? /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f]/ : /[\u0000-\u001f\u007f-\u009f]/).test(s);
const isText = (v, max, nl = false) => typeof v === 'string' && Array.from(v).length <= max && !hasControl(v, nl);
const inRange = (v, lo, hi) => typeof v === 'number' && Number.isFinite(v) && v >= lo && v <= hi;
const whole = (v, lo, hi) => Number.isInteger(v) && v >= lo && v <= hi;
const ENUM = /^[A-Z0-9_]{1,48}$/;

export function validateMeta(m, expect = {}) {
  if (!isObject(m) || m.v !== 1 || !HEX32.test(m.project ?? '') || !HEX32.test(m.version ?? '')) throw bad();
  if (!Array.isArray(m.parents) || m.parents.length > 8 || m.parents.some((p) => typeof p !== 'string' || !HEX32.test(p) || p === m.version)) throw bad();
  if (!isText(m.title, 100) || !whole(m.updatedAt, 0, 8.64e15) || !isText(m.device ?? '', 32)) throw bad();
  if (!whole(m.width, 16, 96) || !whole(m.height, 16, 96) || typeof m.hasGrid !== 'boolean' || typeof m.hasImage !== 'boolean') throw bad();
  if (expect.project && m.project !== expect.project) throw tampered();
  if (expect.version && m.version !== expect.version) throw tampered();
  return { v: 1, project: m.project, version: m.version, parents: [...m.parents], title: m.title, updatedAt: m.updatedAt, device: m.device ?? '', width: m.width, height: m.height, hasGrid: m.hasGrid, hasImage: m.hasImage };
}

function checkGridText(text, size) {
  if (typeof text !== 'string' || text.length > 400000) throw bad();
  let at = 0;
  for (const part of text.split(',')) {
    const m = /^([0-9a-z]{1,4})\*([0-9a-z]{1,4})$/.exec(part);
    if (!m) throw bad();
    const n = parseInt(m[2], 36);
    if (n < 1 || at + n > size) throw bad();
    at += n;
  }
  if (at !== size) throw bad();
}

export function validateSettings(s) {
  if (!isObject(s)) throw bad();
  for (const k of ['style', 'backing', 'palette', 'rarity']) if (typeof s[k] !== 'string' || !ENUM.test(s[k])) throw bad();
  if (!inRange(s.tolerance, 0, 32) || typeof s.dither !== 'boolean' || typeof s.legal !== 'boolean') throw bad();
  if (!inRange(s.brightness, -0.35, 0.35) || !inRange(s.contrast, 0.7, 1.5) || !inRange(s.saturation, 0.5, 1.6)) throw bad();
  if (s.sampleId !== undefined && s.sampleId !== null && !/^[a-z]{1,16}$/.test(s.sampleId)) throw bad();
  if (!isText(s.sourceLabel ?? '', 80)) throw bad();
  if (s.extras !== undefined && s.extras !== null && (typeof s.extras !== 'string' || s.extras.length > 2000 || !/^[A-Za-z0-9_=,;:+.-]*$/.test(s.extras))) throw bad();
  const out = { style: s.style, backing: s.backing, palette: s.palette, rarity: s.rarity, tolerance: s.tolerance, dither: s.dither, legal: s.legal, brightness: s.brightness, contrast: s.contrast, saturation: s.saturation, sampleId: s.sampleId ?? null, sourceLabel: s.sourceLabel ?? '' };
  if (s.extras) out.extras = s.extras;
  return out;
}

export function validateBody(b, meta) {
  if (!isObject(b) || b.v !== 1 || !isText(b.notes ?? '', 1000, true)) throw bad();
  const settings = validateSettings(b.settings);
  const size = meta.width * meta.height;
  const hasGrid = b.grid !== undefined && b.grid !== null;
  if (hasGrid !== meta.hasGrid) throw tampered();
  if (hasGrid) { checkGridText(b.grid, size); checkGridText(b.original, size); }
  const hasImage = b.image !== undefined && b.image !== null;
  if (hasImage !== meta.hasImage) throw tampered();
  let image = null;
  if (hasImage) {
    if (!isObject(b.image) || !MIME.includes(b.image.mime)) throw bad();
    const raw = fromB64(b.image.data);
    if (!raw || raw.length > MAX_IMAGE_BYTES) throw bad();
    image = { mime: b.image.mime, data: b.image.data };
  }
  return { notes: b.notes ?? '', settings, grid: hasGrid ? b.grid : null, original: hasGrid ? b.original : null, image };
}

export function buildProjectParts(snapshot, ids) {
  const hasGrid = typeof snapshot.grid === 'string';
  const meta = { v: 1, project: ids.project, version: ids.version, parents: ids.parents, title: String(snapshot.title ?? ''), updatedAt: ids.updatedAt, device: ids.device ?? '', width: snapshot.width, height: snapshot.height, hasGrid, hasImage: Boolean(snapshot.image) };
  validateMeta(meta);
  const body = { v: 1, notes: snapshot.notes ?? '', settings: snapshot.settings, grid: hasGrid ? snapshot.grid : null, original: hasGrid ? snapshot.original : null, image: snapshot.image ?? null };
  validateBody(body, meta);
  return { meta, body: utf8(JSON.stringify(body)) };
}

export function parseBody(bytes, meta) { return validateBody(parseJson(bytes), meta); }
export const jsonBytes = (value) => utf8(JSON.stringify(value));
export const readJson = parseJson;
