// The studcraft-settings.vault format shared with Android and Mac (settings/SettingsVault.kt). Change both together.

export const FILE_NAME = 'studcraft-settings.vault';
export const FORMAT = 'studcraft-settings-vault';
export const VERSION = 1;
export const KDF = 'PBKDF2-HMAC-SHA256';
export const CIPHER = 'AES-256-GCM';
export const ITERATIONS = 600_000;
export const MAX_ITERATIONS = 2_000_000;
export const SALT_BYTES = 16;
export const MAX_SALT_BYTES = 64;
export const IV_BYTES = 12;
export const MAX_FILE_BYTES = 256 * 1024;
export const MIN_PASSPHRASE = 12;
export const MAX_PASSPHRASE = 1024;

const MAX_JSON_DEPTH = 16;
const MAX_SECRET = 8192;
const MAX_MODEL = 200;
const MAX_URL = 2048;
const MAX_PREFERENCES = 64;
const MAX_PREFERENCE_TEXT = 200;
const PROVIDERS = ['gemini', 'claude', 'openai'];

export class VaultError extends Error {
  constructor(reason, message) { super(message); this.reason = reason; }
}
const notAVault = () => new VaultError('NOT_A_VAULT', "This isn't a readable StudCraft settings backup. Nothing was restored.");
const invalid = () => new VaultError('INVALID_CONTENT', 'This backup contains invalid data. Nothing was restored.');
const tooLarge = () => new VaultError('TOO_LARGE', 'This file is too large to be a StudCraft settings backup. Nothing was restored.');
const wrongPassphrase = () => new VaultError('WRONG_PASSPHRASE', 'Wrong passphrase, or this backup file was changed. Nothing was restored.');

const isObject = (v) => typeof v === 'object' && v !== null && !Array.isArray(v);
const normalize = (phrase) => String(phrase ?? '').normalize('NFC');

/** Returns what's wrong with a new passphrase, or null when it can be used. */
export function passphraseProblem(passphrase, confirmation) {
  const clean = normalize(passphrase);
  if (clean.length < MIN_PASSPHRASE) return `Use at least ${MIN_PASSPHRASE} characters.`;
  if (clean.length > MAX_PASSPHRASE) return `Use at most ${MAX_PASSPHRASE} characters.`;
  if (clean !== normalize(confirmation)) return "The passphrases don't match.";
  return null;
}

function toB64(bytes) {
  let text = '';
  for (let i = 0; i < bytes.length; i += 0x6000) text += String.fromCharCode(...bytes.subarray(i, i + 0x6000));
  return btoa(text);
}

/** Strict: only canonical, padded base64 is accepted, so one header has exactly one encoding. */
function fromB64(text) {
  if (typeof text !== 'string' || text.length === 0 || text.length % 4 !== 0 || !/^[A-Za-z0-9+/]+={0,2}$/.test(text)) return null;
  let binary;
  try { binary = atob(text); } catch { return null; }
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return toB64(bytes) === text ? bytes : null;
}

const header = (version, iterations, salt, iv) =>
  new TextEncoder().encode([FORMAT, version, KDF, iterations, salt, CIPHER, iv].join('\n'));

async function deriveKey(phrase, salt, iterations, usage) {
  const material = await crypto.subtle.importKey('raw', new TextEncoder().encode(phrase), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations }, material, { name: 'AES-GCM', length: 256 }, false, [usage]);
}

/** Rejects deep nesting before JSON.parse sees it. */
function jsonDepth(text) {
  let depth = 0;
  let deepest = 0;
  let inString = false;
  let escaped = false;
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

function parseObject(text) {
  if (!text.trimStart().startsWith('{') || jsonDepth(text) > MAX_JSON_DEPTH) return null;
  try {
    const value = JSON.parse(text);
    return isObject(value) ? value : null;
  } catch {
    return null;
  }
}

function parseEnvelope(bytes) {
  if (bytes.length > MAX_FILE_BYTES) throw tooLarge();
  let text;
  try { text = new TextDecoder('utf-8', { fatal: true }).decode(bytes); } catch { throw notAVault(); }
  const root = parseObject(text);
  if (!root || root.format !== FORMAT || !Number.isInteger(root.version)) throw notAVault();
  if (root.version !== VERSION) throw new VaultError('UNSUPPORTED_VERSION', 'This backup was made by a newer version of StudCraft. Update the app, then try again.');
  const { kdf, cipher } = root;
  if (!isObject(kdf) || !isObject(cipher) || kdf.name !== KDF || cipher.name !== CIPHER) throw notAVault();
  if (!Number.isInteger(kdf.iterations) || kdf.iterations < ITERATIONS || kdf.iterations > MAX_ITERATIONS) throw notAVault();
  const salt = fromB64(kdf.salt);
  const iv = fromB64(cipher.iv);
  const ciphertext = fromB64(root.ciphertext);
  if (!salt || !iv || !ciphertext || salt.length < SALT_BYTES || salt.length > MAX_SALT_BYTES || iv.length !== IV_BYTES || ciphertext.length < 16) throw notAVault();
  return { version: root.version, iterations: kdf.iterations, saltText: kdf.salt, salt, ivText: cipher.iv, iv, ciphertext };
}

// eslint-disable-next-line no-control-regex
const hasControl = (s) => /[\u0000-\u001f\u007f-\u009f]/.test(s);

function textField(parent, name, limit) {
  const value = parent?.[name];
  if (value === undefined || value === null) return undefined;
  if (typeof value !== 'string' || value.length > limit || hasControl(value)) throw invalid();
  return value.trim() || undefined;
}

function section(parent, name) {
  const value = parent?.[name];
  if (value === undefined || value === null) return undefined;
  if (!isObject(value)) throw invalid();
  return value;
}

function readPreferences(source) {
  if (!source) return {};
  const names = Object.keys(source);
  if (names.length > MAX_PREFERENCES) throw invalid();
  const out = {};
  for (const name of names) {
    if (name.length > 64 || name === '__proto__') continue;
    const value = source[name];
    if (typeof value === 'string') { if (value.length <= MAX_PREFERENCE_TEXT && !hasControl(value)) out[name] = value; }
    else if (typeof value === 'boolean' || (typeof value === 'number' && Number.isFinite(value))) out[name] = value;
  }
  return out;
}

function readPayload(root) {
  const ai = section(root, 'ai');
  const keys = section(ai, 'keys');
  const models = section(ai, 'models');
  const market = section(root, 'marketplace');
  const brickLink = section(market, 'brickLink');
  const webhook = section(root, 'webhook');
  let enabledProviders;
  if (ai?.enabledProviders !== undefined && ai.enabledProviders !== null) {
    if (!Array.isArray(ai.enabledProviders) || ai.enabledProviders.length > 16 || ai.enabledProviders.some((p) => typeof p !== 'string')) throw invalid();
    enabledProviders = PROVIDERS.filter((p) => ai.enabledProviders.includes(p));
  }
  return {
    createdAt: textField(root, 'createdAt', MAX_MODEL),
    createdBy: textField(root, 'createdBy', MAX_MODEL),
    enabledProviders,
    keys: { gemini: textField(keys, 'gemini', MAX_SECRET), claude: textField(keys, 'claude', MAX_SECRET), openai: textField(keys, 'openai', MAX_SECRET) },
    models: { claude: textField(models, 'claude', MAX_MODEL), openai: textField(models, 'openai', MAX_MODEL) },
    marketplace: {
      rebrickableApiKey: textField(market, 'rebrickableApiKey', MAX_SECRET),
      brickOwlApiKey: textField(market, 'brickOwlApiKey', MAX_SECRET),
      brickLink: {
        consumerKey: textField(brickLink, 'consumerKey', MAX_SECRET),
        consumerSecret: textField(brickLink, 'consumerSecret', MAX_SECRET),
        token: textField(brickLink, 'token', MAX_SECRET),
        tokenSecret: textField(brickLink, 'tokenSecret', MAX_SECRET),
      },
    },
    webhook: { url: textField(webhook, 'url', MAX_URL), token: textField(webhook, 'token', MAX_SECRET) },
    preferences: readPreferences(section(root, 'preferences')),
  };
}

/** Removes empty values, so a missing setting is left alone on restore. */
function compact(value) {
  if (Array.isArray(value) || !isObject(value)) return value;
  const out = {};
  for (const [k, v] of Object.entries(value)) {
    const next = compact(v);
    if (next === undefined || next === null || next === '') continue;
    if (isObject(next) && Object.keys(next).length === 0) continue;
    out[k] = next;
  }
  return out;
}

export async function sealVault(payload, passphrase) {
  const phrase = normalize(passphrase);
  if (phrase.length < MIN_PASSPHRASE || phrase.length > MAX_PASSPHRASE) throw new VaultError('WRONG_PASSPHRASE', 'Passphrase length is out of range.');
  const salt = crypto.getRandomValues(new Uint8Array(SALT_BYTES));
  const iv = crypto.getRandomValues(new Uint8Array(IV_BYTES));
  const saltText = toB64(salt);
  const ivText = toB64(iv);
  const key = await deriveKey(phrase, salt, ITERATIONS, 'encrypt');
  const data = await crypto.subtle.encrypt({ name: 'AES-GCM', iv, additionalData: header(VERSION, ITERATIONS, saltText, ivText), tagLength: 128 }, key, new TextEncoder().encode(JSON.stringify(compact(payload))));
  return JSON.stringify({ format: FORMAT, version: VERSION, kdf: { name: KDF, iterations: ITERATIONS, salt: saltText }, cipher: { name: CIPHER, iv: ivText }, ciphertext: toB64(new Uint8Array(data)) });
}

/** Decrypts and validates a vault. Throws VaultError; nothing is applied here. */
export async function openVault(input, passphrase) {
  const bytes = typeof input === 'string' ? new TextEncoder().encode(input) : input;
  const envelope = parseEnvelope(bytes);
  const phrase = normalize(passphrase);
  if (phrase.length < MIN_PASSPHRASE || phrase.length > MAX_PASSPHRASE) throw wrongPassphrase();
  const key = await deriveKey(phrase, envelope.salt, envelope.iterations, 'decrypt');
  let plain;
  try {
    plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: envelope.iv, additionalData: header(envelope.version, envelope.iterations, envelope.saltText, envelope.ivText), tagLength: 128 }, key, envelope.ciphertext);
  } catch {
    throw wrongPassphrase();
  }
  let text;
  try { text = new TextDecoder('utf-8', { fatal: true }).decode(plain); } catch { throw invalid(); }
  const root = parseObject(text);
  if (!root) throw invalid();
  return readPayload(root);
}

/** Names of what this browser would replace, and of what it can't use. Never contains a value. */
export function describePayload(p) {
  const replaced = [];
  if (p.keys.gemini) replaced.push('Gemini API key');
  if (p.keys.claude) replaced.push('Claude API key');
  if (p.keys.openai) replaced.push('OpenAI API key');
  if (p.models.claude) replaced.push('Claude model');
  if (p.models.openai) replaced.push('OpenAI model');
  if (p.enabledProviders) replaced.push('Enabled AI providers');
  if (webTheme(p.preferences.themeMode)) replaced.push('Theme');
  const ignored = [];
  if (p.marketplace.rebrickableApiKey || p.marketplace.brickOwlApiKey || Object.values(p.marketplace.brickLink).some(Boolean)) ignored.push('marketplace keys');
  if (p.webhook.url || p.webhook.token) ignored.push('webhook');
  return { replaced, ignored };
}

export function webTheme(value) {
  return { SYSTEM: 'auto', LIGHT: 'light', DARK: 'dark' }[value] ?? null;
}

export function vaultTheme(value) {
  return { auto: 'SYSTEM', light: 'LIGHT', dark: 'DARK' }[value] ?? null;
}
