// The smallest Drive v3 client for encrypted saves. It only uses files this app created (drive.file).
const API = 'https://www.googleapis.com/drive/v3/files';
const UPLOAD = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,size,createdTime,appProperties';
const FOLDER = 'application/vnd.google-apps.folder';
const SAFE_ID = /^[A-Za-z0-9_-]{1,200}$/;
const SAFE_PROP = /^[a-z0-9]{1,64}$/;

export class DriveError extends Error {
  constructor(kind, status = 0) { super(`Drive ${kind}`); this.kind = kind; this.status = status; }
}

function classify(status, body) {
  if (status === 401) return new DriveError('auth', status);
  if (status === 404) return new DriveError('notfound', status);
  if (status === 429 || status >= 500) return new DriveError('retry', status);
  if (status === 403 && /rateLimit|userRateLimit|backendError/.test(body)) return new DriveError('retry', status);
  return new DriveError('fatal', status);
}

export function createDriveRest({ getToken, fetchFn = (...a) => globalThis.fetch(...a) }) {
  let folder = null;

  async function call(url, init = {}, retried = false) {
    const token = await getToken(false);
    if (!token) throw new DriveError('auth');
    let res;
    try {
      res = await fetchFn(url, { ...init, cache: 'no-store', credentials: 'omit', referrerPolicy: 'no-referrer', headers: { ...(init.headers ?? {}), Authorization: `Bearer ${token}` } });
    } catch { throw new DriveError('offline'); }
    if (res.status === 401 && !retried) { await getToken(true, token); return call(url, init, true); }
    if (!res.ok) throw classify(res.status, await res.text().catch(() => ''));
    return res;
  }
  const json = async (url, init) => (await call(url, init)).json();

  async function findFolder(name, parent) {
    const q = `name='${name}' and mimeType='${FOLDER}' and '${parent}' in parents and trashed=false`;
    const out = await json(`${API}?q=${encodeURIComponent(q)}&pageSize=1&orderBy=createdTime&fields=files(id)`);
    const id = out.files?.[0]?.id;
    if (id !== undefined && !SAFE_ID.test(id)) throw new DriveError('fatal');
    return id ?? null;
  }
  async function makeFolder(name, parent) {
    const out = await json(`${API}?fields=id`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, mimeType: FOLDER, parents: [parent] }) });
    if (!SAFE_ID.test(out.id ?? '')) throw new DriveError('fatal');
    return out.id;
  }
  async function ensureFolder() {
    if (folder) return folder;
    const top = (await findFolder('App Backups', 'root')) ?? await makeFolder('App Backups', 'root');
    folder = (await findFolder('StudCraft', top)) ?? await makeFolder('StudCraft', top);
    return folder;
  }

  const VAULT_FIELDS = 'id,name,modifiedTime,version,headRevisionId';

  return {
    /** Looks without creating folders, so checking for a backup changes nothing in Drive. */
    async findVault(name) {
      const top = await findFolder('App Backups', 'root');
      const parent = top && await findFolder('StudCraft', top);
      if (!parent) return null;
      const q = `name='${name}' and '${parent}' in parents and trashed=false`;
      const out = await json(`${API}?q=${encodeURIComponent(q)}&orderBy=modifiedTime desc&pageSize=1&fields=files(${VAULT_FIELDS})`);
      const file = out.files?.[0];
      if (!file) return null;
      if (!SAFE_ID.test(file.id ?? '')) throw new DriveError('fatal');
      return file;
    },
    async createVault(name, bytes) {
      const parent = await ensureFolder();
      const boundary = `sc${crypto.randomUUID().replaceAll('-', '')}`;
      const encoder = new TextEncoder();
      const start = encoder.encode(`--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify({ name, parents: [parent], mimeType: 'application/json' })}\r\n--${boundary}\r\nContent-Type: application/json\r\n\r\n`);
      const end = encoder.encode(`\r\n--${boundary}--`);
      const body = new Uint8Array(start.length + bytes.length + end.length);
      body.set(start); body.set(bytes, start.length); body.set(end, start.length + bytes.length);
      return json(`https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=${VAULT_FIELDS}`, { method: 'POST', headers: { 'Content-Type': `multipart/related; boundary=${boundary}` }, body });
    },
    async updateVault(id, bytes) {
      if (!SAFE_ID.test(id)) throw new DriveError('fatal');
      return json(`https://www.googleapis.com/upload/drive/v3/files/${id}?uploadType=media&fields=${VAULT_FIELDS}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: bytes });
    },
    async list(props) {
      const parent = await ensureFolder();
      const filters = Object.entries(props).map(([k, v]) => {
        if (!SAFE_PROP.test(k) || !SAFE_PROP.test(v)) throw new DriveError('fatal');
        return `appProperties has { key='${k}' and value='${v}' }`;
      });
      const q = [`'${parent}' in parents`, 'trashed=false', ...filters].join(' and ');
      const files = [];
      let page = '';
      for (let i = 0; i < 25; i++) {
        const out = await json(`${API}?q=${encodeURIComponent(q)}&pageSize=200&fields=nextPageToken,files(id,name,size,createdTime,appProperties)${page ? `&pageToken=${encodeURIComponent(page)}` : ''}`);
        for (const f of out.files ?? []) if (SAFE_ID.test(f.id ?? '')) files.push(f);
        page = out.nextPageToken ?? '';
        if (!page) break;
      }
      return files;
    },
    async read(id, { rangeEnd, maxBytes }) {
      if (!SAFE_ID.test(id)) throw new DriveError('fatal');
      const headers = rangeEnd === undefined ? {} : { Range: `bytes=0-${rangeEnd}` };
      const res = await call(`${API}/${id}?alt=media`, { headers });
      const declared = Number(res.headers.get('content-length') ?? 0);
      if (declared > maxBytes) throw new DriveError('fatal');
      const bytes = new Uint8Array(await res.arrayBuffer());
      if (bytes.length > maxBytes) throw new DriveError('fatal');
      return bytes;
    },
    async create(name, appProperties, bytes) {
      const parent = await ensureFolder();
      const boundary = `sc${crypto.randomUUID().replaceAll('-', '')}`;
      const head = `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify({ name, parents: [parent], mimeType: 'application/octet-stream', appProperties })}\r\n--${boundary}\r\nContent-Type: application/octet-stream\r\n\r\n`;
      const encoder = new TextEncoder();
      const start = encoder.encode(head);
      const end = encoder.encode(`\r\n--${boundary}--`);
      const body = new Uint8Array(start.length + bytes.length + end.length);
      body.set(start); body.set(bytes, start.length); body.set(end, start.length + bytes.length);
      return json(UPLOAD, { method: 'POST', headers: { 'Content-Type': `multipart/related; boundary=${boundary}` }, body });
    },
    async trash(id) {
      if (!SAFE_ID.test(id)) throw new DriveError('fatal');
      await call(`${API}/${id}?fields=id`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ trashed: true }) });
    },
    /** A stable, non-personal account id, so one browser profile never mixes two Google accounts' keys. */
    async ownerId() {
      const out = await json('https://www.googleapis.com/drive/v3/about?fields=user(permissionId)');
      const id = out?.user?.permissionId;
      if (typeof id !== 'string' || !id || id.length > 200) throw new DriveError('fatal');
      return id;
    },
    forgetFolder() { folder = null; },
  };
}

/** Google Identity Services token flow. The token stays in this closure and is never stored. */
export function createGisAuth({ clientId, documentRef = document }) {
  let token = null; let expires = 0; let client = null; let loading = null; let pending = null;
  const load = () => {
    loading ??= new Promise((resolve, reject) => {
      if (globalThis.google?.accounts?.oauth2) { resolve(); return; }
      const script = documentRef.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.onload = resolve;
      script.onerror = () => { loading = null; reject(new DriveError('offline')); };
      documentRef.head.append(script);
    });
    return loading;
  };
  const ensureClient = async () => {
    await load();
    client ??= globalThis.google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: 'https://www.googleapis.com/auth/drive.file',
      include_granted_scopes: false,
      callback: (r) => {
        const done = pending; pending = null;
        if (r?.access_token && globalThis.google.accounts.oauth2.hasGrantedAllScopes(r, 'https://www.googleapis.com/auth/drive.file')) {
          token = r.access_token;
          expires = Date.now() + Math.max(0, (Number(r.expires_in) || 3600) - 60) * 1000;
          done?.resolve(token);
        } else done?.reject(new DriveError('auth'));
      },
      error_callback: () => { const done = pending; pending = null; done?.reject(new DriveError('auth')); },
    });
    return client;
  };
  return {
    prepare: () => load().catch(() => {}),
    /** Must run from a click, because it can open Google's consent window. */
    async connect() {
      const c = await ensureClient();
      return new Promise((resolve, reject) => { pending = { resolve, reject }; c.requestAccessToken({ prompt: token ? '' : 'consent' }); });
    },
    /** Background saves never open a window. An expired token shows Reconnect instead. */
    async getToken(refresh, stale) {
      if (refresh && token === stale) { token = null; expires = 0; }
      return token && Date.now() < expires ? token : null;
    },
    connected: () => Boolean(token) && Date.now() < expires,
    /** Drops the token from memory. The Google grant itself stays until the person removes it. */
    forget() { token = null; expires = 0; },
  };
}
