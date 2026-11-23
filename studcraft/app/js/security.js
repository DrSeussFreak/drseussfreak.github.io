// Validation for everything that enters the app: files, AI output, and export cells.

export const LIMITS = Object.freeze({
  maxBytes: 25 * 1024 * 1024,
  maxSide: 12000,
  maxPixels: 48_000_000,
  workSide: 2048,
  maxAiResponseBytes: 40 * 1024 * 1024,
  maxPromptChars: 4000,
});

export class UserError extends Error {}

export const ALLOWED_TYPES = Object.freeze(['image/png', 'image/jpeg', 'image/webp']);

/** Identifies an image by its content, so a renamed SVG or HTML file is never accepted. */
export function sniffImage(b) {
  if (b.length >= 8 && b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47 && b[4] === 0x0d && b[5] === 0x0a && b[6] === 0x1a && b[7] === 0x0a) return 'image/png';
  if (b.length >= 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return 'image/jpeg';
  if (b.length >= 16 && ascii(b, 0, 4) === 'RIFF' && ascii(b, 8, 4) === 'WEBP' && ascii(b, 12, 3) === 'VP8') return 'image/webp';
  return null;
}

function ascii(b, at, n) {
  let s = '';
  for (let i = at; i < at + n && i < b.length; i++) s += String.fromCharCode(b[i]);
  return s;
}

/** Reads pixel dimensions from the file header, before any decoding can allocate memory. */
export function readDimensions(b, type) {
  if (type === 'image/png') {
    if (b.length < 24 || ascii(b, 12, 4) !== 'IHDR') return null;
    return size(u32be(b, 16), u32be(b, 20));
  }
  if (type === 'image/jpeg') return jpegDimensions(b);
  if (type === 'image/webp') return webpDimensions(b);
  return null;
}

const size = (width, height) => (width > 0 && height > 0 ? { width, height } : null);
const u32be = (b, i) => ((b[i] << 24) | (b[i + 1] << 16) | (b[i + 2] << 8) | b[i + 3]) >>> 0;

function jpegDimensions(b) {
  let i = 2;
  while (i + 9 < b.length) {
    if (b[i] !== 0xff) return null;
    while (i < b.length && b[i] === 0xff) i++;
    const marker = b[i++];
    if (marker === 0xd9 || marker === 0xda) return null;
    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) continue;
    const length = (b[i] << 8) | b[i + 1];
    if (length < 2) return null;
    const isFrame = marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
    if (isFrame) return i + 7 <= b.length ? size((b[i + 5] << 8) | b[i + 6], (b[i + 3] << 8) | b[i + 4]) : null;
    i += length;
  }
  return null;
}

function webpDimensions(b) {
  if (b.length < 30) return null;
  const chunk = ascii(b, 12, 4);
  if (chunk === 'VP8 ') {
    if (b[23] !== 0x9d || b[24] !== 0x01 || b[25] !== 0x2a) return null;
    return size(((b[27] << 8) | b[26]) & 0x3fff, ((b[29] << 8) | b[28]) & 0x3fff);
  }
  if (chunk === 'VP8L') {
    if (b[20] !== 0x2f) return null;
    const bits = (b[21] | (b[22] << 8) | (b[23] << 16) | (b[24] << 24)) >>> 0;
    return size((bits & 0x3fff) + 1, ((bits >>> 14) & 0x3fff) + 1);
  }
  if (chunk === 'VP8X') {
    return size((b[24] | (b[25] << 8) | (b[26] << 16)) + 1, (b[27] | (b[28] << 8) | (b[29] << 16)) + 1);
  }
  return null;
}

/** Throws a friendly error unless the bytes are a PNG, JPEG, or WebP within the limits. */
export function validateImageBytes(bytes) {
  if (bytes.length === 0) throw new UserError('That file is empty.');
  if (bytes.length > LIMITS.maxBytes) throw new UserError('That image is larger than 25 MB.');
  const type = sniffImage(bytes);
  if (!type) throw new UserError('Use a PNG, JPEG, or WebP image. Other formats, including SVG, are not accepted.');
  const dims = readDimensions(bytes, type);
  if (!dims) throw new UserError("StudCraft couldn't read that image.");
  if (dims.width > LIMITS.maxSide || dims.height > LIMITS.maxSide || dims.width * dims.height > LIMITS.maxPixels) {
    throw new UserError('That image has too many pixels. The limit is 48 megapixels and 12,000 pixels per side.');
  }
  return { type, ...dims };
}

/** Strictly decodes base64 from an AI response and returns only a validated image. */
export function decodeBase64Image(encoded) {
  if (typeof encoded !== 'string' || encoded.length === 0) throw new UserError("The AI didn't return an image.");
  const clean = encoded.replace(/[\r\n]/g, '');
  if (clean.length > Math.ceil((LIMITS.maxBytes * 4) / 3) + 4) throw new UserError('The AI image is too large.');
  if (clean.length % 4 !== 0 || !/^[A-Za-z0-9+/]+={0,2}$/.test(clean)) throw new UserError('The AI returned an unreadable image.');
  let binary;
  try {
    binary = atob(clean);
  } catch {
    throw new UserError('The AI returned an unreadable image.');
  }
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  const info = validateImageBytes(bytes);
  return { bytes, type: info.type };
}

/** Removes control characters from a filename and keeps it short. It is only ever shown as text. */
export function displayName(name) {
  const base = String(name ?? '').replace(/\.[^.]*$/, '').replace(/[\u0000-\u001f\u007f-\u009f​-‏‪-‮⁦-⁩]/g, '').replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
  return base.slice(0, 42) || 'Your image';
}

const FORMULA_START = /^[\s 　]*[=+\-@＝＋－＠]/;
const PLAIN_NUMBER = /^-?\d+(\.\d+)?$/;

/** Makes one CSV cell safe: spreadsheet formulas are neutralized and quoting is applied. */
export function csvCell(value) {
  let text = String(value ?? '');
  if ((FORMULA_START.test(text) || /^[\t\r\n]/.test(text)) && !PLAIN_NUMBER.test(text)) text = `'${text}`;
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

/** Parses CSV text and rewrites every cell through csvCell. */
export function sanitizeCsv(csv) {
  const rows = [];
  let row = [];
  let cell = '';
  let quoted = false;
  for (let i = 0; i < csv.length; i++) {
    const ch = csv[i];
    if (quoted) {
      if (ch === '"' && csv[i + 1] === '"') { cell += '"'; i++; }
      else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"' && cell === '') quoted = true;
    else if (ch === ',') { row.push(cell); cell = ''; }
    else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && csv[i + 1] === '\n') i++;
      row.push(cell); rows.push(row); row = []; cell = '';
    } else cell += ch;
  }
  if (cell !== '' || row.length > 0) { row.push(cell); rows.push(row); }
  return rows.map((r) => r.map(csvCell).join(',')).join('\n') + '\n';
}

/** Removes every known key, and anything shaped like a key, from text that will be displayed. */
export function redact(text, secrets = []) {
  let out = String(text ?? '');
  for (const secret of secrets) {
    const value = String(secret ?? '').trim();
    if (value) out = out.split(value).join('[key]');
  }
  return out
    .replace(/(api key provided:\s*)\S+/gi, '$1[key]')
    .replace(/\S*\*{3,}\S*/g, '[key]')
    .replace(/\bsk-[A-Za-z0-9_-]{8,}/g, '[key]')
    .replace(/\bAIza[0-9A-Za-z_-]{10,}/g, '[key]')
    .replace(/([?&](?:key|api_key|apikey)=)[^&\s]+/gi, '$1[key]');
}
