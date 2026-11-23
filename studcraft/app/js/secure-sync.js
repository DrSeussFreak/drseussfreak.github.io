// End-to-end encrypted Drive saves. Every save is a new immutable file naming its parent, so two devices can never overwrite each other.
import {
  KIND, META_RANGE_BYTES, MAX_FILE_BYTES, MAX_KEYRING_BYTES, SecureError, buildProjectParts, deriveKeys, groupTag, importedProjectId, jsonBytes,
  newRoot, openContainer, openMeta, parseBody, parseKeyring, randomId, readJson, sealContainer, unwrapRoot, validateMeta, validateSettings, wrapRoot,
} from './secure-format.js';

export const HISTORY_LIMIT = 10;
export const KEYRING_NAME = 'sc1-keyring.enc';
export const versionFileName = (version) => `sc1-${version}.enc`;
const VERSION_FILE = /^sc1-([0-9a-f]{32})\.enc$/;
const SAVE_STATES = ['off', 'saved', 'saving', 'offline', 'locked', 'error', 'conflict'];

const locked = () => new SecureError('LOCKED', 'Unlock encrypted storage first.');

async function mapLimited(items, limit, task) {
  const out = new Array(items.length);
  let next = 0;
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) { const i = next++; out[i] = await task(items[i], i); }
  }));
  return out;
}

export function headsOf(metas) {
  const referenced = new Set(metas.flatMap((m) => m.parents));
  return metas.filter((m) => !referenced.has(m.version)).sort((a, b) => b.updatedAt - a.updatedAt || (a.version < b.version ? 1 : -1));
}

export class SecureSync {
  #keys = null;
  #metaCache = new Map();

  constructor({ drive, kv, now = () => Date.now(), device = 'web' }) {
    this.drive = drive; this.kv = kv; this.now = now; this.device = device;
  }

  get unlocked() { return this.#keys !== null; }

  async restoreCachedKey() {
    const cached = await this.kv.get('dataKey');
    if (cached?.content && cached?.names && /^[0-9a-f]{32}$/.test(cached.keyId ?? '')) this.#keys = cached;
    return this.unlocked;
  }

  async #remember(keys) {
    this.#keys = keys;
    await this.kv.set('dataKey', keys);
  }

  async lock() {
    this.#keys = null;
    this.#metaCache.clear();
    await this.kv.del('dataKey');
  }

  async #keyrings() {
    const files = await this.drive.list({ sc: 'k' });
    const rings = [];
    for (const f of files) {
      if (f.name !== KEYRING_NAME || Number(f.size ?? 0) > MAX_KEYRING_BYTES) continue;
      try {
        const bytes = await this.drive.read(f.id, { maxBytes: MAX_KEYRING_BYTES });
        rings.push({ file: f, bytes, generation: parseKeyring(bytes).generation });
      } catch (e) { if (!(e instanceof SecureError)) throw e; }
    }
    return rings.sort((a, b) => b.generation - a.generation || String(a.file.createdTime).localeCompare(String(b.file.createdTime)));
  }

  async hasKeyring() { return (await this.#keyrings()).length > 0; }

  async setup(passphrase) {
    if ((await this.#keyrings()).length) throw new SecureError('EXISTS', 'Encrypted storage is already set up. Unlock it with your passphrase.');
    const { root, keys } = await newRoot();
    try {
      await this.drive.create(KEYRING_NAME, { sc: 'k' }, await wrapRoot(root, keys.keyId, passphrase, 1));
    } finally { root.fill(0); }
    await this.#remember(keys);
  }

  async #unwrapBest(passphrase) {
    const rings = await this.#keyrings();
    if (!rings.length) throw new SecureError('NO_KEYRING', 'Encrypted storage is not set up yet.');
    let failure = null;
    for (const ring of rings) {
      try { return { ring, rings, ...(await unwrapRoot(ring.bytes, passphrase)) }; } catch (e) { failure = e; }
    }
    throw failure;
  }

  async unlock(passphrase) {
    const { root, keys } = await this.#unwrapBest(passphrase);
    root.fill(0);
    await this.#remember(keys);
  }

  /** Rewraps the same data key. Projects are not re-encrypted. The old keyring goes only after the new one is verified. */
  async changePassphrase(current, next) {
    const { root, keys, rings } = await this.#unwrapBest(current);
    try {
      const generation = Math.max(...rings.map((r) => r.generation)) + 1;
      const bytes = await wrapRoot(root, keys.keyId, next, generation);
      const created = await this.drive.create(KEYRING_NAME, { sc: 'k' }, bytes);
      const stored = await this.drive.read(created.id, { maxBytes: MAX_KEYRING_BYTES });
      const check = await unwrapRoot(stored, next);
      check.root.fill(0);
      if (check.keys.keyId !== keys.keyId) throw new SecureError('TAMPERED', 'The new keyring could not be verified.');
      for (const ring of rings) await this.drive.trash(ring.file.id);
      await this.#remember(keys);
    } finally { root.fill(0); }
  }

  async #meta(file, project) {
    const hit = this.#metaCache.get(file.id);
    if (hit) return hit;
    const match = VERSION_FILE.exec(file.name ?? '');
    if (!match || Number(file.size ?? 0) > MAX_FILE_BYTES) return null;
    try {
      const bytes = await this.drive.read(file.id, { rangeEnd: META_RANGE_BYTES - 1, maxBytes: META_RANGE_BYTES });
      const { meta } = await openMeta({ key: this.#keys.content, keyId: this.#keys.keyId, bytes, kind: KIND.PROJECT, objectId: match[1] });
      const clean = validateMeta(meta, { version: match[1], project });
      if (await groupTag(this.#keys, clean.project) !== file.appProperties?.g) return null;
      const entry = { ...clean, fileId: file.id };
      this.#metaCache.set(file.id, entry);
      return entry;
    } catch (e) {
      if (e instanceof SecureError) return null;
      throw e;
    }
  }

  async #versions(project) {
    const files = await this.drive.list({ sc: 'v', g: await groupTag(this.#keys, project) });
    return (await mapLimited(files, 4, (f) => this.#meta(f, project))).filter(Boolean);
  }

  /** Uploads one version. A retry with the same version id is recognized, so a lost response can't create a false conflict. */
  async saveSnapshot(snapshot, versionId = randomId()) {
    if (!this.#keys) throw locked();
    const project = snapshot.project;
    const versions = await this.#versions(project);
    const already = versions.find((m) => m.version === versionId);
    const base = (await this.kv.get(`base:${project}`)) ?? null;
    if (already) {
      await this.kv.set(`base:${project}`, versionId);
      const others = headsOf(versions).filter((m) => m.version !== versionId);
      return { project, version: versionId, conflict: others.length > 0 };
    }
    const parents = base && versions.some((m) => m.version === base) ? [base] : [];
    const othersAfter = headsOf(versions).filter((m) => m.version !== base);
    const { meta, body } = buildProjectParts(snapshot, { project, version: versionId, parents, updatedAt: this.now(), device: this.device });
    const bytes = await sealContainer({ key: this.#keys.content, keyId: this.#keys.keyId, kind: KIND.PROJECT, objectId: versionId, meta, body });
    const file = await this.drive.create(versionFileName(versionId), { sc: 'v', g: await groupTag(this.#keys, project) }, bytes);
    this.#metaCache.set(file.id, { ...validateMeta(meta), fileId: file.id });
    await this.kv.set(`base:${project}`, versionId);
    await this.#prune(project).catch(() => {});
    return { project, version: versionId, conflict: othersAfter.length > 0 };
  }

  async #prune(project) {
    const versions = await this.#versions(project);
    const heads = new Set(headsOf(versions).map((m) => m.version));
    const base = await this.kv.get(`base:${project}`);
    const sorted = [...versions].sort((a, b) => b.updatedAt - a.updatedAt);
    const keep = new Set(sorted.slice(0, HISTORY_LIMIT).map((m) => m.version));
    for (const m of sorted) {
      if (keep.has(m.version) || heads.has(m.version) || m.version === base) continue;
      await this.drive.trash(m.fileId);
      this.#metaCache.delete(m.fileId);
    }
  }

  async listProjects() {
    if (!this.#keys) throw locked();
    const files = await this.drive.list({ sc: 'v' });
    const metas = (await mapLimited(files, 4, (f) => this.#meta(f))).filter(Boolean);
    const byProject = new Map();
    for (const m of metas) (byProject.get(m.project) ?? byProject.set(m.project, []).get(m.project)).push(m);
    const unreadable = files.length - metas.length;
    const projects = [...byProject.entries()].map(([project, versions]) => {
      const heads = headsOf(versions);
      return { project, title: heads[0].title, updatedAt: heads[0].updatedAt, width: heads[0].width, height: heads[0].height, conflict: heads.length > 1, heads: heads.map((h) => h.version), versions: [...versions].sort((a, b) => b.updatedAt - a.updatedAt) };
    }).sort((a, b) => b.updatedAt - a.updatedAt);
    return { projects, unreadable };
  }

  async openVersion(project, version) {
    if (!this.#keys) throw locked();
    const entry = (await this.#versions(project)).find((m) => m.version === version);
    if (!entry) throw new SecureError('NOT_FOUND', 'That saved version no longer exists.');
    const bytes = await this.drive.read(entry.fileId, { maxBytes: MAX_FILE_BYTES });
    const { meta, body } = await openContainer({ key: this.#keys.content, keyId: this.#keys.keyId, bytes, kind: KIND.PROJECT, objectId: version });
    const clean = validateMeta(meta, { project, version });
    return { meta: clean, ...parseBody(body, clean) };
  }

  /** Continue editing from this version. */
  async adopt(project, version) { await this.kv.set(`base:${project}`, version); }

  /** Ends a conflict: the chosen version becomes current. With keepOthers, every other head is first copied to its own new project. */
  async resolveConflict(project, keepVersion, { keepOthers = true } = {}) {
    if (!this.#keys) throw locked();
    const versions = await this.#versions(project);
    const heads = headsOf(versions);
    if (!heads.some((h) => h.version === keepVersion)) throw new SecureError('NOT_FOUND', 'That version is no longer current.');
    const copies = [];
    if (keepOthers) {
      for (const head of heads) {
        if (head.version === keepVersion) continue;
        const other = await this.openVersion(project, head.version);
        const copyId = randomId();
        const title = `${other.meta.title} (conflict copy)`.slice(0, 100);
        await this.saveSnapshot({ project: copyId, title, notes: other.notes, settings: other.settings, width: other.meta.width, height: other.meta.height, grid: other.grid, original: other.original, image: other.image });
        copies.push(copyId);
      }
    }
    const chosen = await this.openVersion(project, keepVersion);
    const versionId = randomId();
    const { meta, body } = buildProjectParts({ project, title: chosen.meta.title, notes: chosen.notes, settings: chosen.settings, width: chosen.meta.width, height: chosen.meta.height, grid: chosen.grid, original: chosen.original, image: chosen.image }, { project, version: versionId, parents: heads.slice(0, 8).map((h) => h.version), updatedAt: this.now(), device: this.device });
    const bytes = await sealContainer({ key: this.#keys.content, keyId: this.#keys.keyId, kind: KIND.PROJECT, objectId: versionId, meta, body });
    await this.drive.create(versionFileName(versionId), { sc: 'v', g: await groupTag(this.#keys, project) }, bytes);
    await this.kv.set(`base:${project}`, versionId);
    return { version: versionId, copies };
  }

  /** Moves every version to Drive's trash, where Google keeps it for about 30 days. */
  async deleteProject(project) {
    if (!this.#keys) throw locked();
    for (const m of await this.#versions(project)) { await this.drive.trash(m.fileId); this.#metaCache.delete(m.fileId); }
    await this.kv.del(`base:${project}`);
  }

  /**
   * Copies Cloud Library items into encrypted projects and verifies each by decrypting it from Drive.
   * This never deletes anything. Returns the source ids that verified, for a separate, confirmed delete.
   */
  async moveLibrary(items, onProgress = () => {}) {
    if (!this.#keys) throw locked();
    const verified = []; const failed = [];
    let index = 0;
    for (const item of items) {
      index += 1;
      try {
        const project = await importedProjectId(this.#keys, item.sourceId);
        let versions = await this.#versions(project);
        if (!versions.length) { await this.saveSnapshot({ ...item.snapshot, project }); versions = await this.#versions(project); }
        const newest = headsOf(versions)[0];
        const back = await this.openVersion(project, newest.version);
        if (back.meta.title !== item.snapshot.title || back.notes !== (item.snapshot.notes ?? '') || back.meta.width !== item.snapshot.width || back.meta.height !== item.snapshot.height || JSON.stringify(back.settings) !== JSON.stringify(validateSettings(item.snapshot.settings))) throw new SecureError('TAMPERED', 'Verification failed.');
        verified.push(item.sourceId);
      } catch (e) {
        if (!(e instanceof SecureError)) { failed.push(item.sourceId); onProgress({ index, total: items.length, verified: verified.length, failed: failed.length }); continue; }
        failed.push(item.sourceId);
      }
      onProgress({ index, total: items.length, verified: verified.length, failed: failed.length });
    }
    return { verified, failed };
  }
}

/* ---------- encrypted local storage ---------- */

/** One non-extractable device key encrypts drafts and queued saves, so they stay protected while storage is locked. */
export async function deviceKey(kv) {
  const existing = await kv.get('deviceKey');
  if (existing?.key) return existing;
  const key = await crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
  const record = { key, keyId: randomId() };
  return kv.setIfAbsent('deviceKey', record);
}

async function sealLocal(kv, kind, objectId, value) {
  const { key, keyId } = await deviceKey(kv);
  return sealContainer({ key, keyId, kind, objectId, meta: { v: 1 }, body: jsonBytes(value) });
}

async function openLocal(kv, kind, objectId, bytes) {
  const { key, keyId } = await deviceKey(kv);
  const { body } = await openContainer({ key, keyId, bytes, kind, objectId });
  return readJson(body);
}

const DRAFT_OBJECT = '00000000000000000000000000000001';
export const LEGACY_DRAFT_KEY = 'studcraft.editDraft.v1';

export function createDraftStore({ kv, legacy }) {
  let latest; let writing = Promise.resolve();
  const enqueue = (work) => { writing = writing.then(work, work).catch(() => {}); return writing; };
  return {
    /** Encrypts any old plaintext draft and removes the plaintext only after reading the encrypted copy back. */
    async load() {
      await writing;
      const old = legacy?.get(LEGACY_DRAFT_KEY);
      if (old) {
        try {
          const value = JSON.parse(old);
          if (typeof value === 'object' && value !== null) {
            const sealed = await sealLocal(kv, KIND.DRAFT, DRAFT_OBJECT, value);
            await kv.set('draft', sealed);
            const back = await openLocal(kv, KIND.DRAFT, DRAFT_OBJECT, await kv.get('draft'));
            if (JSON.stringify(back) === JSON.stringify(value)) legacy.remove(LEGACY_DRAFT_KEY);
            return back;
          }
          legacy.remove(LEGACY_DRAFT_KEY);
        } catch { return null; }
      }
      try {
        const stored = await kv.get('draft');
        return stored ? await openLocal(kv, KIND.DRAFT, DRAFT_OBJECT, stored) : null;
      } catch { return null; }
    },
    save(record) {
      latest = record;
      return enqueue(async () => {
        if (latest === undefined) return;
        const value = latest; latest = undefined;
        await kv.set('draft', await sealLocal(kv, KIND.DRAFT, DRAFT_OBJECT, value));
      });
    },
    clear() {
      latest = undefined;
      legacy?.remove(LEGACY_DRAFT_KEY);
      return enqueue(() => kv.del('draft'));
    },
  };
}

export function createQueue(kv) {
  const keyOf = (project) => `queue:${project}`;
  return {
    async put(project, versionId, snapshot) {
      await kv.set(keyOf(project), { versionId, sealed: await sealLocal(kv, KIND.QUEUE, versionId, snapshot) });
    },
    async all() {
      const out = [];
      for (const name of await kv.keys('queue:')) {
        const row = await kv.get(name);
        try { out.push({ project: name.slice(6), versionId: row.versionId, snapshot: await openLocal(kv, KIND.QUEUE, row.versionId, row.sealed) }); } catch { await kv.del(name); }
      }
      return out;
    },
    async remove(project, versionId) {
      const row = await kv.get(keyOf(project));
      if (row?.versionId === versionId) await kv.del(keyOf(project));
    },
  };
}

/* ---------- auto-save ---------- */
export class AutoSaver {
  #timer = null; #first = 0; #retry = null; #attempt = 0; #draining = false; #again = false; #status = 'off';

  constructor({ sync, queue, snapshot, onStatus = () => {}, online = () => true, debounceMs = 2500, maxWaitMs = 30000, baseRetryMs = 2000, maxRetryMs = 60000, now = () => Date.now(), timers = { set: (f, ms) => setTimeout(f, ms), clear: (t) => clearTimeout(t) } }) {
    Object.assign(this, { sync, queue, snapshot, onStatus, online, debounceMs, maxWaitMs, baseRetryMs, maxRetryMs, now, timers });
    this.enabled = false;
  }

  get status() { return this.#status; }

  #set(status, detail = '') {
    if (!SAVE_STATES.includes(status)) return;
    this.#status = status;
    this.onStatus(status, detail);
  }

  async enable() {
    this.enabled = true;
    await this.drain();
    if (this.#status === 'off') this.#set('saved');
  }

  disable() {
    this.enabled = false;
    if (this.#timer !== null) this.timers.clear(this.#timer);
    if (this.#retry !== null) this.timers.clear(this.#retry);
    this.#timer = null; this.#retry = null; this.#first = 0; this.#attempt = 0;
    this.#set('off');
  }

  /** Call on every edit. Waits for a pause, but never longer than maxWaitMs. */
  touch() {
    if (!this.enabled) return;
    const t = this.now();
    if (!this.#first) this.#first = t;
    if (this.#timer !== null) this.timers.clear(this.#timer);
    const wait = Math.min(this.debounceMs, Math.max(0, this.#first + this.maxWaitMs - t));
    this.#timer = this.timers.set(() => { this.#timer = null; return this.flush(); }, wait);
  }

  /** Encrypts the current project into the local queue, then uploads whatever can be uploaded. */
  async flush() {
    if (!this.enabled) return;
    if (this.#timer !== null) { this.timers.clear(this.#timer); this.#timer = null; }
    this.#first = 0;
    try {
      const snap = await this.snapshot();
      if (snap) await this.queue.put(snap.project, randomId(), snap);
    } catch {
      this.#set('error', 'This project could not be prepared for saving.');
      return;
    }
    await this.drain();
  }

  async drain() {
    if (!this.enabled) return;
    if (this.#draining) { this.#again = true; return; }
    this.#draining = true;
    try {
      do {
        this.#again = false;
        await this.#drainOnce();
      } while (this.#again && this.enabled);
    } finally { this.#draining = false; }
  }

  async #drainOnce() {
    if (!this.sync.unlocked) { this.#set('locked'); return; }
    const items = await this.queue.all();
    if (!items.length) { if (!['conflict', 'error'].includes(this.#status)) this.#set('saved'); return; }
    if (!this.online()) { this.#set('offline'); return; }
    this.#set('saving');
    let conflict = false;
    let tooLarge = null;
    for (const item of items) {
      try {
        const out = await this.sync.saveSnapshot({ ...item.snapshot, project: item.project }, item.versionId);
        await this.queue.remove(item.project, item.versionId);
        conflict ||= out.conflict;
      } catch (e) {
        if (e?.reason !== 'TOO_LARGE') { this.#failed(e); return; }
        tooLarge = e.message; // This one stays queued. Smaller saves can still go through.
      }
    }
    this.#attempt = 0;
    if (tooLarge) { this.#set('error', tooLarge); return; }
    this.#set(conflict ? 'conflict' : 'saved', conflict ? 'Another device changed this project. Both copies are kept.' : '');
  }

  #failed(e) {
    if (e?.reason === 'LOCKED') { this.#set('locked'); return; }
    if (e?.reason === 'NOT_FOUND' || e?.reason === 'KEY_MISMATCH') { this.#set('error', e.message); return; }
    if (e?.kind === 'auth') { this.#set('error', 'Reconnect Google Drive to keep saving.'); return; }
    if (e?.kind === 'fatal' || e instanceof SecureError) { this.#set('error', 'This save was rejected. It stays encrypted on this device.'); return; }
    this.#set(e?.kind === 'offline' || !this.online() ? 'offline' : 'error', e?.kind === 'offline' ? '' : 'Google Drive is unavailable. Retrying.');
    const wait = Math.min(this.maxRetryMs, this.baseRetryMs * 2 ** this.#attempt);
    this.#attempt += 1;
    if (this.#retry !== null) this.timers.clear(this.#retry);
    this.#retry = this.timers.set(() => { this.#retry = null; return this.drain(); }, wait);
  }
}

export { deriveKeys };
