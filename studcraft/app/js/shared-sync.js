// One encrypted file shared by every device (securesync/SharedSync.kt). Change both together.
// Each sync reads the file, merges against the last agreed copy, checks Drive hasn't moved, then writes.
// A file it can't read is never written or trashed.
import {
  IV_BYTES, MAX_SHARED_BYTES, TAG_BYTES, SecureError, buildProjectParts, conflictProjectId, deriveKeys, fromB64, importedProjectId, isId, parseBody,
  parseKeyring, randomId, readJson, toB64, unwrapRoot, validateMeta, wrapRoot,
} from './secure-format.js';
import { SAMPLE_KEYS } from './cloud-model.js';
import { KEYRING_NAME, SecureSync } from './secure-sync.js';

export const SHARED_FILE = 'studcraft-data.enc';
export const SHARED_FORMAT = 'studcraft-shared';
export const SHARED_VERSION = 1;
export const MAX_ATTEMPTS = 6;
export const MAX_TOMBSTONES = 2000;
export const RECOVERY_LENGTH = 25;
export const RECOVERY_ALPHABET = 'ABCDEFGHJKMNPQRSTVWXYZ0123456789';
const ENVELOPE_OVERHEAD = 4096;
const enc = new TextEncoder();
const utf8 = (s) => enc.encode(s);
const bad = () => new SecureError('INVALID', "This isn't a readable StudCraft sync file.");
const locked = () => new SecureError('LOCKED', 'Unlock encrypted storage first.');
const noFile = () => new SecureError('NOT_FOUND', 'The shared sync file is missing from Google Drive.');
const isObject = (v) => typeof v === 'object' && v !== null && !Array.isArray(v);
const tagOf = (f) => f.version ?? f.headRevisionId ?? f.modifiedTime;
const byId = (a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0);

export const emptyState = () => ({ entries: new Map(), tombstones: new Map(), imported: new Set() });

export function newRecoveryCode() {
  const bytes = crypto.getRandomValues(new Uint8Array(RECOVERY_LENGTH));
  const chars = Array.from(bytes, (b) => RECOVERY_ALPHABET[b & 31]);
  const groups = [];
  for (let i = 0; i < chars.length; i += 5) groups.push(chars.slice(i, i + 5).join(''));
  return groups.join('-');
}
export const normalizeRecovery = (text) => Array.from(String(text ?? '').toUpperCase()).filter((c) => RECOVERY_ALPHABET.includes(c)).join('');

export const copyTitle = (title) => `${Array.from(title).slice(0, 83).join('')} (conflict copy)`;

function asCopy(entry, id) {
  const title = copyTitle(entry.snapshot.title);
  return { meta: { ...entry.meta, project: id, title }, snapshot: { ...entry.snapshot, project: id, title } };
}
const newer = (a, b) => a.meta.updatedAt > b.meta.updatedAt || (a.meta.updatedAt === b.meta.updatedAt && a.meta.version > b.meta.version);

export function sameState(a, b) {
  if (a.entries.size !== b.entries.size || a.tombstones.size !== b.tombstones.size || a.imported.size !== b.imported.size) return false;
  for (const [id, e] of a.entries) if (b.entries.get(id)?.meta.version !== e.meta.version) return false;
  for (const [id, t] of a.tombstones) { const o = b.tombstones.get(id); if (!o || o.version !== t.version || o.at !== t.at) return false; }
  for (const v of a.imported) if (!b.imported.has(v)) return false;
  return true;
}

/** Three-way merge by project. It never drops an edit: edits beat deletes, and two different edits both survive. */
export async function mergeStates(base, local, remote, copyId) {
  const out = new Map(); const tombs = new Map(); const losers = []; const conflicted = new Set();
  const ids = [...new Set([...local.entries.keys(), ...remote.entries.keys(), ...local.tombstones.keys(), ...remote.tombstones.keys()])].sort();
  const single = (id, entry, deleted, baseVersion) => {
    if (deleted && (deleted.version === entry.meta.version || baseVersion === entry.meta.version)) tombs.set(id, deleted);
    else out.set(id, entry);
  };
  for (const id of ids) {
    const baseVersion = base?.entries.get(id)?.meta.version;
    const l = local.entries.get(id); const r = remote.entries.get(id);
    if (l && r) {
      if (l.meta.version === r.meta.version) out.set(id, l);
      else if (baseVersion === l.meta.version) out.set(id, r);
      else if (baseVersion === r.meta.version) out.set(id, l);
      else {
        const [winner, loser] = newer(l, r) ? [l, r] : [r, l];
        out.set(id, winner); losers.push(loser); conflicted.add(id);
      }
    } else if (l) single(id, l, remote.tombstones.get(id), baseVersion);
    else if (r) single(id, r, local.tombstones.get(id), baseVersion);
    else {
      const a = local.tombstones.get(id); const b = remote.tombstones.get(id);
      tombs.set(id, a && b ? (a.at >= b.at ? a : b) : a ?? b);
    }
  }
  for (const loser of losers) {
    const id = await copyId(loser.meta.project, loser.meta.version);
    if (out.has(id) || tombs.get(id)?.version === loser.meta.version) continue;
    out.set(id, asCopy(loser, id));
    tombs.delete(id);
  }
  const kept = [...tombs.values()].sort((a, b) => b.at - a.at).slice(0, MAX_TOMBSTONES);
  return { state: { entries: out, tombstones: new Map(kept.map((t) => [t.project, t])), imported: new Set([...local.imported, ...remote.imported]) }, conflicted };
}

export function entryOf(snapshot, version, updatedAt, device) {
  const { meta, body } = buildProjectParts(snapshot, { project: snapshot.project, version, parents: [], updatedAt, device });
  const clean = validateMeta(meta);
  const b = parseBody(body, clean);
  return { meta: clean, snapshot: { project: clean.project, title: clean.title, notes: b.notes, settings: b.settings, width: clean.width, height: clean.height, grid: b.grid, original: b.original, image: b.image, library: b.library } };
}

export function encodeState(state) {
  const projects = [...state.entries.values()].sort((a, b) => (a.meta.project < b.meta.project ? -1 : 1)).map(({ meta, snapshot: s }) => ({
    meta: { v: 1, project: meta.project, version: meta.version, parents: [], title: meta.title, updatedAt: meta.updatedAt, device: meta.device, width: meta.width, height: meta.height, hasGrid: s.grid !== null, hasImage: s.image !== null },
    body: { v: 1, notes: s.notes, settings: s.settings, grid: s.grid, original: s.original, image: s.image, ...(s.library ? { library: s.library } : {}) },
  }));
  const tombstones = [...state.tombstones.values()].sort((a, b) => (a.project < b.project ? -1 : 1)).map(({ project, version, at }) => ({ project, version, at }));
  return utf8(JSON.stringify({ v: 1, projects, tombstones, imported: [...state.imported].sort() }));
}

export function decodeState(bytes) {
  const root = readJson(bytes);
  if (!Number.isInteger(root.v)) throw bad();
  if (root.v > 1) throw new SecureError('UNSUPPORTED_VERSION', 'This sync file was made by a newer version of StudCraft. Update the app.');
  if (root.v !== 1 || !Array.isArray(root.projects) || !Array.isArray(root.tombstones) || !Array.isArray(root.imported)) throw bad();
  const entries = new Map();
  for (const row of root.projects) {
    if (!isObject(row)) throw bad();
    const meta = validateMeta(row.meta);
    if (entries.has(meta.project)) throw bad();
    const b = parseBody(utf8(JSON.stringify(row.body)), meta);
    entries.set(meta.project, { meta, snapshot: { project: meta.project, title: meta.title, notes: b.notes, settings: b.settings, width: meta.width, height: meta.height, grid: b.grid, original: b.original, image: b.image, library: b.library } });
  }
  const tombstones = new Map();
  for (const t of root.tombstones) {
    if (!isObject(t) || !isId(t.project) || !isId(t.version) || !Number.isInteger(t.at) || t.at < 0 || t.at > 8.64e15) throw bad();
    tombstones.set(t.project, { project: t.project, version: t.version, at: t.at });
  }
  if (root.imported.some((v) => !isId(v))) throw bad();
  return { entries, tombstones, imported: new Set(root.imported) };
}

export function parseEnvelope(bytes, maxBytes = MAX_SHARED_BYTES) {
  if (bytes.length > maxBytes) throw new SecureError('TOO_LARGE', 'The sync file is too large to open.');
  const r = readJson(bytes);
  if (r.format !== SHARED_FORMAT || !Number.isInteger(r.version)) throw bad();
  if (r.version !== SHARED_VERSION) throw new SecureError('UNSUPPORTED_VERSION', 'This sync file was made by a newer version of StudCraft. Update the app.');
  if (!isId(r.keyId) || typeof r.passphrase !== 'string' || typeof r.recovery !== 'string') throw bad();
  const iv = fromB64(r.iv); const data = fromB64(r.data);
  if (!iv || !data || iv.length !== IV_BYTES || data.length < TAG_BYTES) throw bad();
  return { keyId: r.keyId, passphrase: r.passphrase, recovery: r.recovery, iv, data };
}

export const encodeEnvelope = (e) => utf8(JSON.stringify({ format: SHARED_FORMAT, version: SHARED_VERSION, keyId: e.keyId, passphrase: e.passphrase, recovery: e.recovery, iv: toB64(e.iv), data: toB64(e.data) }));

const fileAad = (keyId) => utf8(`${SHARED_FORMAT}\n${SHARED_VERSION}\n${keyId}`);
const localAad = (keyId, slot) => utf8(`studcraft-shared-local\n1\n${keyId}\n${slot}`);

async function encrypt(key, iv, aad, plain) {
  return new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv, tagLength: 128, additionalData: aad }, key, plain));
}
async function decrypt(key, iv, aad, sealed) {
  try {
    return new Uint8Array(await crypto.subtle.decrypt({ name: 'AES-GCM', iv, tagLength: 128, additionalData: aad }, key, sealed));
  } catch { throw new SecureError('TAMPERED', 'The sync file was changed or uses a different key.'); }
}

export async function sealEnvelope(keys, envelope, state) {
  const iv = crypto.getRandomValues(new Uint8Array(IV_BYTES));
  return encodeEnvelope({ ...envelope, keyId: keys.keyId, iv, data: await encrypt(keys.content, iv, fileAad(keys.keyId), encodeState(state)) });
}
export async function openEnvelope(keys, envelope) {
  return decodeState(await decrypt(keys.content, envelope.iv, fileAad(keys.keyId), envelope.data));
}

/** Tries the passphrase slot, then the recovery slot. The caller wipes the returned root. */
export async function unwrapEnvelope(envelope, secret) {
  try {
    return await unwrapRoot(utf8(envelope.passphrase), secret);
  } catch (e) { if (e.reason !== 'WRONG_PASSPHRASE') throw e; }
  const code = normalizeRecovery(secret);
  const wrong = () => new SecureError('WRONG_PASSPHRASE', 'Wrong passphrase or recovery code.');
  if (code.length !== RECOVERY_LENGTH) throw wrong();
  try {
    return await unwrapRoot(utf8(envelope.recovery), code);
  } catch (e) { if (e.reason === 'WRONG_PASSPHRASE') throw wrong(); throw e; }
}

export const sameContent = (a, b) => a.title === b.title && (a.notes ?? '') === (b.notes ?? '') && a.width === b.width && a.height === b.height
  && JSON.stringify(a.settings) === JSON.stringify(b.settings) && (a.grid ?? null) === (b.grid ?? null) && (a.original ?? null) === (b.original ?? null)
  && (a.image?.mime ?? null) === (b.image?.mime ?? null) && (a.image?.data ?? null) === (b.image?.data ?? null)
  && JSON.stringify(a.library ?? null) === JSON.stringify(b.library ?? null);

function memoryStore() {
  const map = new Map();
  return {
    get: async (k) => map.get(k), set: async (k, v) => { map.set(k, v); }, del: async (k) => { map.delete(k); },
    keys: async (p) => [...map.keys()].filter((k) => k.startsWith(p)), setIfAbsent: async (k, v) => { if (!map.has(k)) map.set(k, v); return map.get(k); },
  };
}

export class SharedSync {
  #keys = null; #chain = Promise.resolve(); #redirects = new Map(); #conflicts = new Set();

  constructor({ drive, kv, now = () => Date.now(), device = 'web', maxBytes = MAX_SHARED_BYTES, retryMs = 250 }) {
    Object.assign(this, { drive, kv, now, device, maxBytes, retryMs });
    this.unreadableFiles = 0;
  }

  get unlocked() { return this.#keys !== null; }

  #locked(task) {
    const run = this.#chain.then(task, task);
    this.#chain = run.catch(() => {});
    return run;
  }

  #tooLarge() {
    return new SecureError('TOO_LARGE', `Your encrypted sync file is full (${Math.floor(this.maxBytes / (1024 * 1024))} MB). This save stays on this device. Remove saved source images or delete a project, then try again.`);
  }

  async restoreCachedKey() {
    const cached = await this.kv.get('sharedKey');
    if (cached?.content && cached?.names && isId(cached.keyId)) this.#keys = cached;
    return this.unlocked;
  }

  async #remember(keys) {
    const previous = await this.kv.get('shared-keyid');
    this.#keys = keys;
    await this.kv.set('sharedKey', keys);
    if (previous !== keys.keyId) {
      await this.kv.del('shared-base'); await this.kv.del('shared-local'); await this.kv.del('shared-seen');
      await this.kv.set('shared-keyid', keys.keyId);
    }
  }

  async lock() {
    this.#keys = null;
    await this.kv.del('sharedKey');
  }

  async #load(slot) {
    if (!this.#keys) return null;
    const row = await this.kv.get(slot);
    if (!row?.iv || !row?.data) return null;
    try { return decodeState(await decrypt(this.#keys.content, row.iv, localAad(this.#keys.keyId, slot), row.data)); } catch (e) { if (e instanceof SecureError) return null; throw e; }
  }

  async #store(slot, state) {
    const iv = crypto.getRandomValues(new Uint8Array(IV_BYTES));
    await this.kv.set(slot, { iv, data: await encrypt(this.#keys.content, iv, localAad(this.#keys.keyId, slot), encodeState(state)) });
  }

  #checkSize(state) {
    const plain = encodeState(state).length;
    if (Math.floor((plain + TAG_BYTES) * 4 / 3) + ENVELOPE_OVERHEAD > this.maxBytes) throw this.#tooLarge();
  }

  /** Creates the one shared file and returns the recovery code, which is never stored. */
  setup(passphrase) {
    return this.#locked(async () => {
      if ((await this.drive.findAll(SHARED_FILE)).length) throw new SecureError('EXISTS', 'A shared sync file already exists. Enter its passphrase to join it.');
      const carried = (await this.#load('shared-local')) ?? emptyState();
      const root = crypto.getRandomValues(new Uint8Array(32));
      try {
        const keys = await deriveKeys(root);
        const code = newRecoveryCode();
        const text = new TextDecoder();
        const envelope = { keyId: keys.keyId, passphrase: text.decode(await wrapRoot(root, keys.keyId, passphrase, 1)), recovery: text.decode(await wrapRoot(root, keys.keyId, normalizeRecovery(code), 1)) };
        const bytes = await sealEnvelope(keys, envelope, carried);
        if (bytes.length > this.maxBytes) throw this.#tooLarge();
        await this.drive.createVault(SHARED_FILE, bytes);
        await this.#remember(keys);
        await this.#store('shared-local', carried);
        await this.#store('shared-base', carried);
        return code;
      } finally { root.fill(0); }
    });
  }

  /** One-time join with the passphrase or recovery code. A wrong secret changes nothing. */
  join(secret) {
    return this.#locked(async () => {
      const files = [...await this.drive.findAll(SHARED_FILE)].sort(byId);
      if (!files.length) throw noFile();
      let failure = null;
      for (const file of files) {
        let envelope;
        try { envelope = parseEnvelope(await this.drive.read(file.id, { maxBytes: this.maxBytes }), this.maxBytes); } catch (e) { if (!(e instanceof SecureError)) throw e; failure ??= e; continue; }
        let opened;
        try { opened = await unwrapEnvelope(envelope, secret); } catch (e) { if (!(e instanceof SecureError)) throw e; failure = e; continue; }
        try {
          await openEnvelope(opened.keys, envelope);
          await this.#remember(opened.keys);
        } finally { opened.root.fill(0); }
        await this.#sync();
        return;
      }
      throw failure ?? noFile();
    });
  }

  /** The automatic path. It never creates the file and never prompts. */
  autoSync() {
    return this.#locked(async () => {
      if (!(await this.drive.findAll(SHARED_FILE)).length) return 'needs-setup';
      if (!this.#keys) return 'needs-join';
      try { await this.#sync(); return 'synced'; } catch (e) { if (e.reason === 'KEY_MISMATCH') return 'needs-join'; throw e; }
    });
  }

  syncNow() { return this.#locked(() => this.#sync()); }

  async #readAll(files) {
    const readable = []; let otherKey = false;
    for (const file of files) {
      const bytes = await this.drive.read(file.id, { maxBytes: this.maxBytes });
      try {
        const envelope = parseEnvelope(bytes, this.maxBytes);
        if (envelope.keyId !== this.#keys.keyId) { otherKey = true; continue; }
        readable.push({ file, envelope, state: await openEnvelope(this.#keys, envelope) });
      } catch (e) {
        if (!(e instanceof SecureError) || e.reason === 'UNSUPPORTED_VERSION') throw e;
      }
    }
    return { readable, otherKey };
  }

  async #sync() {
    if (!this.#keys) throw locked();
    const keys = this.#keys;
    const copyId = (project, version) => conflictProjectId(keys, project, version);
    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
      if (attempt) await new Promise((r) => setTimeout(r, this.retryMs * attempt));
      const files = [...await this.drive.findAll(SHARED_FILE)].sort(byId);
      if (!files.length) throw noFile();
      const { readable, otherKey } = await this.#readAll(files);
      this.unreadableFiles = files.length - readable.length;
      const target = readable[0];
      if (!target) {
        if (otherKey) throw new SecureError('KEY_MISMATCH', "This device's key doesn't match the sync file. Enter its passphrase to join it.");
        throw new SecureError('TAMPERED', "The sync file in Google Drive can't be read, so it was left alone.");
      }
      const local = (await this.#load('shared-local')) ?? emptyState();
      const first = await mergeStates(await this.#load('shared-base'), local, target.state, copyId);
      this.#conflicts = first.conflicted;
      let merged = first.state;
      const seen = { ...((await this.kv.get('shared-seen')) ?? {}) };
      let extras = false;
      for (const other of readable.slice(1)) {
        if (seen[other.file.id] === tagOf(other.file)) continue;
        merged = (await mergeStates(null, merged, other.state, copyId)).state;
        seen[other.file.id] = tagOf(other.file);
        extras = true;
      }
      if (!sameState(merged, target.state)) {
        const bytes = await sealEnvelope(keys, target.envelope, merged);
        if (bytes.length > this.maxBytes) throw this.#tooLarge();
        const latest = (await this.drive.findAll(SHARED_FILE)).find((f) => f.id === target.file.id);
        if (!latest || tagOf(latest) !== tagOf(target.file)) continue;
        await this.drive.updateVault(target.file.id, bytes);
      }
      await this.#store('shared-local', merged);
      await this.#store('shared-base', merged);
      if (extras) await this.kv.set('shared-seen', seen);
      return merged;
    }
    throw Object.assign(new Error('Drive kept changing'), { kind: 'retry' });
  }

  saveSnapshot(snapshot, versionId = randomId()) {
    return this.#locked(async () => {
      if (!this.#keys) throw locked();
      const project = this.#redirects.get(snapshot.project) ?? snapshot.project;
      const local = (await this.#load('shared-local')) ?? emptyState();
      if (![...local.entries.values()].some((e) => e.meta.version === versionId)) {
        // A re-save never drops preserved details.
        const library = snapshot.library ?? local.entries.get(project)?.snapshot.library ?? null;
        const entry = entryOf({ ...snapshot, project, library }, versionId, this.now(), this.device);
        const entries = new Map(local.entries); entries.set(project, entry);
        const tombstones = new Map(local.tombstones); tombstones.delete(project);
        const next = { entries, tombstones, imported: local.imported };
        this.#checkSize(next);
        await this.#store('shared-local', next);
      }
      const after = await this.#sync();
      if (after.entries.get(project)?.meta.version === versionId) return { project, version: versionId, conflict: this.#conflicts.has(project) };
      const copy = await conflictProjectId(this.#keys, project, versionId);
      if (after.entries.has(copy)) this.#redirects.set(snapshot.project, copy);
      return { project, version: versionId, conflict: true };
    });
  }

  listProjects() {
    return this.#locked(async () => {
      if (!this.#keys) throw locked();
      const state = (await this.#load('shared-local')) ?? emptyState();
      const projects = [...state.entries.values()].map(({ meta, snapshot: s }) => ({ project: meta.project, title: meta.title, updatedAt: meta.updatedAt, width: meta.width, height: meta.height, heads: [meta.version], versions: [meta], details: s.library, hasLayout: s.grid !== null, canRebuild: s.grid === null && Object.hasOwn(SAMPLE_KEYS, s.settings.sampleId ?? '') })).sort((a, b) => b.updatedAt - a.updatedAt);
      return { projects, unreadable: this.unreadableFiles };
    });
  }

  openVersion(project, version) {
    return this.#locked(async () => {
      if (!this.#keys) throw locked();
      const e = (await this.#load('shared-local'))?.entries.get(project);
      if (!e || e.meta.version !== version) throw new SecureError('NOT_FOUND', 'That project is no longer in the sync file.');
      return { meta: e.meta, notes: e.snapshot.notes, settings: e.snapshot.settings, grid: e.snapshot.grid, original: e.snapshot.original, image: e.snapshot.image, library: e.snapshot.library };
    });
  }

  adopt(project) { return this.#locked(async () => { this.#redirects.delete(project); }); }

  /** Removes it from every device on their next sync. A device that edited it first keeps its edit. */
  deleteProject(project) {
    return this.#locked(async () => {
      if (!this.#keys) throw locked();
      const local = (await this.#load('shared-local')) ?? emptyState();
      const entry = local.entries.get(project);
      if (!entry) return;
      const entries = new Map(local.entries); entries.delete(project);
      const tombstones = new Map(local.tombstones); tombstones.set(project, { project, version: entry.meta.version, at: this.now() });
      await this.#store('shared-local', { entries, tombstones, imported: local.imported });
      this.#redirects.delete(project);
      await this.#sync();
    });
  }

  changePassphrase(current, next) {
    return this.#locked(async () => {
      if (!this.#keys) throw locked();
      for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        if (attempt) await new Promise((r) => setTimeout(r, this.retryMs * attempt));
        const files = [...await this.drive.findAll(SHARED_FILE)].sort(byId);
        const { readable } = await this.#readAll(files);
        if (!readable.length) throw noFile();
        const opened = await unwrapEnvelope(readable[0].envelope, current);
        let wrapped;
        try {
          const generation = parseKeyring(utf8(readable[0].envelope.passphrase)).generation;
          wrapped = await wrapRoot(opened.root, this.#keys.keyId, next, generation + 1);
          const check = await unwrapRoot(wrapped, next);
          check.root.fill(0);
          if (check.keys.keyId !== this.#keys.keyId) throw new SecureError('TAMPERED', 'The new passphrase could not be verified.');
        } finally { opened.root.fill(0); }
        const latest = await this.drive.findAll(SHARED_FILE);
        if (readable.some((r) => tagOf(latest.find((f) => f.id === r.file.id) ?? {}) !== tagOf(r.file))) continue;
        const text = new TextDecoder().decode(wrapped);
        for (const r of readable) await this.drive.updateVault(r.file.id, encodeEnvelope({ ...r.envelope, passphrase: text }));
        return;
      }
      throw Object.assign(new Error('Drive kept changing'), { kind: 'retry' });
    });
  }

  async hasLegacy() { return Boolean(await this.drive.findVault(KEYRING_NAME)); }

  /** Merges the latest versions of the older encrypted files. Those files stay in Drive, untouched. */
  async importLegacy(passphrase) {
    if (!this.#keys) throw locked();
    const legacy = new SecureSync({ drive: this.drive, kv: memoryStore(), device: this.device, now: this.now });
    await legacy.unlock(passphrase);
    const heads = [];
    for (const p of (await legacy.listProjects()).projects) for (const h of p.heads) heads.push(await legacy.openVersion(p.project, h));
    await legacy.lock();
    return this.#locked(async () => {
      const base = (await this.#load('shared-local')) ?? emptyState();
      const entries = new Map(base.entries); const imported = new Set(base.imported); const tombstones = new Map(base.tombstones);
      let added = 0;
      for (const h of heads) {
        const m = h.meta;
        if (imported.has(m.version)) continue;
        const id = entries.has(m.project) ? await conflictProjectId(this.#keys, m.project, m.version) : m.project;
        const title = id === m.project ? m.title : copyTitle(m.title);
        entries.set(id, entryOf({ project: id, title, notes: h.notes, settings: h.settings, width: m.width, height: m.height, grid: h.grid, original: h.original, image: h.image, library: h.library }, m.version, m.updatedAt, m.device));
        tombstones.delete(id);
        imported.add(m.version);
        added += 1;
      }
      const next = { entries, tombstones, imported };
      this.#checkSize(next);
      await this.#store('shared-local', next);
      await this.#sync();
      return added;
    });
  }

  /**
   * Copies library items, then re-downloads the file and compares every field. Items without a stored mosaic grid
   * report as details-only and never enter `verified`, so their originals are never offered for deletion.
   */
  moveLibrary(items, onProgress = () => {}) {
    return this.#locked(async () => {
      if (!this.#keys) throw locked();
      const local = (await this.#load('shared-local')) ?? emptyState();
      const entries = new Map(local.entries); const tombstones = new Map(local.tombstones);
      const wanted = []; const failed = [];
      for (const item of items) {
        try {
          const project = await importedProjectId(this.#keys, item.sourceId);
          const fresh = entryOf({ ...item.snapshot, project }, randomId(), this.now(), this.device);
          const existing = entries.get(project);
          // A copy from before details were preserved gains them. Its own content stays as it is.
          const addition = !existing ? fresh : (!existing.snapshot.library && fresh.snapshot.library ? entryOf({ ...existing.snapshot, library: fresh.snapshot.library }, randomId(), this.now(), this.device) : null);
          if (addition) {
            const candidate = new Map(entries); candidate.set(project, addition);
            this.#checkSize({ entries: candidate, tombstones, imported: local.imported });
            entries.set(project, addition);
            tombstones.delete(project);
          }
          wanted.push({ sourceId: item.sourceId, project, want: fresh.snapshot });
        } catch (e) { if (!(e instanceof SecureError)) throw e; failed.push(item.sourceId); }
      }
      await this.#store('shared-local', { entries, tombstones, imported: local.imported });
      await this.#sync();
      const files = [...await this.drive.findAll(SHARED_FILE)].sort(byId);
      const back = (await this.#readAll(files)).readable[0]?.state;
      if (!back) throw noFile();
      const verified = []; const noGrid = [];
      let index = failed.length;
      for (const { sourceId, project, want } of wanted) {
        const got = back.entries.get(project)?.snapshot;
        if (!got || !sameContent(got, want)) failed.push(sourceId);
        else if (want.grid === null) noGrid.push(sourceId); else verified.push(sourceId);
        index += 1;
        onProgress({ index, total: items.length, verified: verified.length, failed: failed.length });
      }
      return { verified, failed, noGrid };
    });
  }
}
