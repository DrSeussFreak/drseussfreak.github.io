// The encrypted Drive panel. Passphrases live only in their input fields and are cleared after use.
import { DRIVE_WEB_CLIENT_ID } from './drive-config.js';
import { DriveError, createDriveRest, createGisAuth } from './drive-rest.js';
import { LOST_PASSPHRASE_WARNING, MIN_PASSPHRASE, SecureError, passphraseProblem, randomId, toHex } from './secure-format.js';
import { AutoSaver, SecureSync, createQueue } from './secure-sync.js';

const STATUS = { off: 'Off', saved: 'Saved', saving: 'Saving…', offline: 'Offline', locked: 'Locked', error: 'Error', conflict: 'Conflict' };
const PREF = 'studcraft.secureAutosave';
const IMAGE_PREF = 'studcraft.secureImage';

export function scopedKv(kv, owner) {
  const p = `o:${owner}:`;
  return {
    get: (k) => kv.get(p + k), set: (k, v) => kv.set(p + k, v), del: (k) => kv.del(p + k),
    keys: async (prefix) => (await kv.keys(p + prefix)).map((k) => k.slice(p.length)),
    setIfAbsent: (k, v) => (k === 'deviceKey' ? kv.setIfAbsent(k, v) : kv.setIfAbsent(p + k, v)),
  };
}
// The device key is shared by every account on this browser profile; data keys and queues are per account.
function ownerKv(kv, owner) {
  const scoped = scopedKv(kv, owner);
  return { ...scoped, get: (k) => (k === 'deviceKey' ? kv.get(k) : scoped.get(k)) };
}

async function ownerHash(id) {
  return toHex(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`studcraft-owner:${id}`))).slice(0, 16));
}

const friendly = (e) => {
  if (e instanceof SecureError) return e.message;
  if (e instanceof DriveError) {
    if (e.kind === 'auth') return 'Reconnect Google Drive and try again.';
    if (e.kind === 'offline') return 'You appear to be offline.';
    if (e.kind === 'retry') return 'Google Drive is busy. Try again shortly.';
  }
  return 'That did not finish. Nothing was changed.';
};

export function createSecurePanel({ host, el, kv, durable, prefs, notify, snapshot, applyProject, library, deleteOriginal, clientId = DRIVE_WEB_CLIENT_ID }) {
  const ui = { step: 'intro', message: '', error: false, projects: null, unreadable: 0, confirm: null, verified: [], move: null, status: 'off', detail: '', busy: false, changing: false, versionsFor: null };
  let project = null;
  let sync = null; let saver = null; let drive = null;
  const auth = clientId ? createGisAuth({ clientId }) : null;

  const say = (message, error = false) => { ui.message = message; ui.error = error; render(); };
  const field = (id, label, auto) => el('label', { class: 'field' }, label, el('input', { id, type: 'password', autocomplete: auto, maxlength: '1024', spellcheck: 'false', autocapitalize: 'off' }));
  const button = (text, onclick, cls = 'btn', extra = {}) => el('button', { class: cls, type: 'button', text, onclick, ...(ui.busy ? { disabled: '' } : {}), ...extra });
  const take = (id) => { const n = document.getElementById(id); const v = n?.value ?? ''; if (n) n.value = ''; return v; };

  async function work(text, task) {
    if (ui.busy) return;
    ui.busy = true; say(text);
    try { await task(); } catch (e) { ui.busy = false; say(friendly(e), true); return; }
    ui.busy = false; render();
  }

  function makeSaver() {
    saver?.disable();
    saver = new AutoSaver({
      sync, queue: createQueue(sync.kv),
      snapshot: async () => { const s = await snapshot({ includeImage: prefs.get(IMAGE_PREF) === '1' }); if (!s) return null; project ??= randomId(); return { ...s, project }; },
      online: () => navigator.onLine !== false,
      onStatus: (status, detail) => { ui.status = status; ui.detail = detail; renderStatus(); },
    });
    if (prefs.get(PREF) === '1') saver.enable();
  }

  async function connect() {
    await work('Waiting for Google…', async () => {
      await auth.connect();
      drive = createDriveRest({ getToken: (refresh, stale) => auth.getToken(refresh, stale) });
      const owner = await ownerHash(await drive.ownerId());
      sync = new SecureSync({ drive, kv: ownerKv(kv, owner), device: 'web' });
      await sync.restoreCachedKey();
      ui.step = sync.unlocked ? 'ready' : (await sync.hasKeyring()) ? 'unlock' : 'setup';
      makeSaver();
      ui.message = '';
      if (sync.unlocked) await refresh();
    });
  }

  async function refresh() {
    const out = await sync.listProjects();
    ui.projects = out.projects; ui.unreadable = out.unreadable;
  }

  const reconnect = () => work('Waiting for Google…', async () => { await auth.connect(); ui.message = ''; await saver?.drain(); });

  const afterUnlock = async () => { ui.step = 'ready'; ui.message = ''; await refresh(); await saver?.drain(); };

  function setup() {
    const a = take('securePass'); const b = take('securePass2');
    const problem = passphraseProblem(a, b);
    if (problem) { say(problem, true); return; }
    if (!document.getElementById('secureAck')?.checked) { say('Confirm that you understand a lost passphrase cannot be recovered.', true); return; }
    work('Creating your encrypted keyring…', async () => { await sync.setup(a); await afterUnlock(); });
  }

  function unlock() {
    const a = take('securePass');
    if (!a) return;
    work('Unlocking…', async () => { await sync.unlock(a); await afterUnlock(); });
  }

  function changePass() {
    const old = take('secureOld'); const a = take('securePass'); const b = take('securePass2');
    const problem = passphraseProblem(a, b);
    if (problem) { say(problem, true); return; }
    work('Changing passphrase…', async () => { await sync.changePassphrase(old, a); ui.changing = false; ui.message = 'Passphrase changed.'; });
  }

  function lockDevice() {
    work('Locking…', async () => { await sync.lock(); ui.projects = null; ui.step = 'unlock'; ui.message = 'Locked and forgotten on this device. Encrypted queued saves stay here until you unlock.'; await saver?.drain(); });
  }

  function setAuto(on) {
    prefs.set(PREF, on ? '1' : '0');
    if (on) saver.enable(); else saver.disable();
    render();
  }

  const open = (p, version) => work('Decrypting…', async () => {
    const data = await sync.openVersion(p.project, version);
    if (await applyProject(data)) {
      project = p.project;
      await sync.adopt(p.project, version);
      ui.message = `Opened “${data.meta.title}”.`;
    } else ui.message = 'Nothing was changed.';
  });

  const resolve = (p, version, keepOthers) => work('Resolving…', async () => {
    await sync.resolveConflict(p.project, version, { keepOthers });
    ui.confirm = null;
    await refresh();
    ui.message = keepOthers ? 'Kept this version and saved the other as a copy.' : 'Kept this version. The other stays in version history.';
  });

  const remove = (p) => work('Moving to Drive trash…', async () => {
    await sync.deleteProject(p.project);
    if (project === p.project) project = null;
    ui.confirm = null;
    await refresh();
    ui.message = 'Moved to Google Drive trash.';
  });

  const move = () => work('Encrypting and verifying…', async () => {
    const items = await library();
    const out = await sync.moveLibrary(items, (p) => { ui.message = `Verified ${p.verified} of ${p.total}…`; renderMessage(); });
    ui.verified = out.verified;
    ui.move = { total: items.length, failed: out.failed.length };
    ui.confirm = null;
    await refresh();
    ui.message = `${out.verified.length} of ${items.length} copied and verified.${out.failed.length ? ` ${out.failed.length} could not be verified and were left alone.` : ''} Your Cloud Library originals have not been deleted.`;
  });

  const deleteMoved = () => work('Deleting plaintext originals…', async () => {
    let done = 0;
    const ids = [...ui.verified];
    for (const id of ids) { await deleteOriginal(id); done += 1; ui.verified = ui.verified.filter((x) => x !== id); }
    ui.confirm = null;
    ui.message = `Deleted ${done} plaintext original${done === 1 ? '' : 's'} from the Cloud Library.`;
  });

  function renderStatus() {
    const pill = document.getElementById('secureStatus');
    if (pill) { pill.textContent = STATUS[ui.status]; pill.dataset.state = ui.status; }
    const detail = document.getElementById('secureDetail');
    if (detail) detail.textContent = ui.detail;
  }
  function renderMessage() {
    const n = document.getElementById('secureMessage');
    if (n) { n.textContent = ui.message; n.classList.toggle('secure-error', ui.error); }
  }

  const when = (ms) => new Date(ms).toLocaleString();

  function projectRow(p) {
    const key = `delete:${p.project}`;
    const actions = ui.confirm === key
      ? [el('span', { class: 'hint', text: 'Move all versions to Drive trash?' }), button('Move to trash', () => remove(p), 'btn danger'), button('Keep', () => { ui.confirm = null; render(); }, 'btn ghost')]
      : [button('Open', () => open(p, p.heads[0]), 'btn ghost', { 'data-secure-open': p.project }), button('Versions', () => { ui.versionsFor = ui.versionsFor === p.project ? null : p.project; render(); }, 'btn ghost'), button('Delete', () => { ui.confirm = key; render(); }, 'btn ghost', { 'data-secure-delete': p.project })];
    const conflict = p.conflict ? el('div', { class: 'secure-conflict' },
      el('p', { class: 'hint', text: 'Two devices changed this project. Neither copy was overwritten. Choose which stays current.' }),
      ...p.heads.map((h) => { const m = p.versions.find((v) => v.version === h); return el('div', { class: 'btn-row' }, el('span', { class: 'hint', text: `${when(m.updatedAt)} · ${m.device || 'device'}` }), button('Keep, copy other', () => resolve(p, h, true), 'btn ghost', { 'data-secure-keep': h })); })) : null;
    const versions = ui.versionsFor === p.project ? el('div', { class: 'list' }, ...p.versions.map((v) => el('div', { class: 'btn-row' }, el('span', { class: 'hint', text: `${when(v.updatedAt)} · ${v.device || 'device'}` }), button('Restore', () => open(p, v.version), 'btn ghost')))) : null;
    return el('div', { class: 'list-item', 'data-secure-project': p.project },
      el('div', {}, el('strong', { class: 'saved-title', text: p.title || 'Untitled' }), el('p', { text: `${p.width}×${p.height} studs · ${when(p.updatedAt)} · ${p.versions.length} version${p.versions.length === 1 ? '' : 's'}` }), conflict, versions),
      el('div', { class: 'list-actions' }, ...actions));
  }

  function body() {
    if (!clientId) return [el('p', { id: 'secureUnconfigured', class: 'hint', text: "Drive auto-save isn't configured yet." })];
    if (ui.step === 'intro') {
      return [el('p', { class: 'hint', text: 'Save projects to App Backups / StudCraft in your Google Drive, encrypted on this device first. Google asks for Drive access only when you connect here.' }),
        prefs.get(PREF) === '1' ? el('p', { class: 'hint', text: 'Auto-save is on but paused. Connect to resume. Your edits are kept in an encrypted draft on this device.' }) : null,
        el('div', { class: 'btn-row' }, button('Connect Google Drive', connect, 'btn', { id: 'secureConnect', onpointerenter: () => auth.prepare() }))];
    }
    if (ui.step === 'setup') {
      return [el('p', { class: 'secure-warning', text: LOST_PASSPHRASE_WARNING }),
        field('securePass', `New passphrase (${MIN_PASSPHRASE}+ characters)`, 'new-password'), field('securePass2', 'Enter it again', 'new-password'),
        el('label', { class: 'switch' }, el('input', { id: 'secureAck', type: 'checkbox' }), el('span', { text: 'I understand a lost passphrase means my encrypted projects are gone.' })),
        el('div', { class: 'btn-row' }, button('Create encrypted storage', setup, 'btn', { id: 'secureSetup' }))];
    }
    if (ui.step === 'unlock') {
      return [field('securePass', 'Passphrase', 'current-password'), el('div', { class: 'btn-row' }, button('Unlock', unlock, 'btn', { id: 'secureUnlock' })), el('p', { class: 'hint', text: LOST_PASSPHRASE_WARNING })];
    }
    const auto = el('input', { id: 'secureAuto', type: 'checkbox', onchange: (e) => setAuto(e.target.checked) });
    auto.checked = prefs.get(PREF) === '1';
    const image = el('input', { id: 'secureImage', type: 'checkbox', onchange: (e) => prefs.set(IMAGE_PREF, e.target.checked ? '1' : '0') });
    image.checked = prefs.get(IMAGE_PREF) === '1';
    const change = ui.changing ? el('div', { class: 'secure-form' }, field('secureOld', 'Current passphrase', 'current-password'), field('securePass', 'New passphrase', 'new-password'), field('securePass2', 'Enter it again', 'new-password'), el('p', { class: 'hint', text: LOST_PASSPHRASE_WARNING }),
      el('div', { class: 'btn-row' }, button('Change passphrase', changePass, 'btn', { id: 'secureChange' }), button('Cancel', () => { ui.changing = false; render(); }, 'btn ghost'))) : null;
    const moved = ui.verified.length ? (ui.confirm === 'originals'
      ? el('div', { class: 'secure-conflict' }, el('p', { class: 'secure-warning', text: `Permanently delete ${ui.verified.length} plaintext original${ui.verified.length === 1 ? '' : 's'} from the Cloud Library? The verified encrypted copies stay in Drive. This cannot be undone.` }),
        el('div', { class: 'btn-row' }, button('Delete originals', deleteMoved, 'btn danger', { id: 'secureDeleteOriginalsYes' }), button('Keep originals', () => { ui.confirm = null; render(); }, 'btn ghost')))
      : button(`Delete ${ui.verified.length} plaintext original${ui.verified.length === 1 ? '' : 's'}…`, () => { ui.confirm = 'originals'; render(); }, 'btn ghost', { id: 'secureDeleteOriginals' })) : null;
    return [
      el('label', { class: 'switch' }, auto, el('span', { text: 'Auto-save to Google Drive' })),
      el('label', { class: 'switch' }, image, el('span', { text: 'Include the source image (up to 3 MB)' })),
      el('p', { id: 'secureDetail', class: 'hint', text: ui.detail }),
      auth.connected() ? null : button('Reconnect Google Drive', reconnect, 'btn', { id: 'secureReconnect' }),
      el('div', { class: 'btn-row' }, button('Save now', () => { if (!saver.enabled) { saver.enable().then(() => saver.flush()).then(() => { if (prefs.get(PREF) !== '1') saver.disable(); return refresh(); }).then(render).catch((e) => say(friendly(e), true)); } else saver.flush().then(refresh).then(render).catch((e) => say(friendly(e), true)); }, 'btn', { id: 'secureSaveNow' }),
        button('Refresh', () => work('Loading…', refresh), 'btn ghost', { id: 'secureRefresh' }),
        button('Change passphrase', () => { ui.changing = true; render(); }, 'btn ghost'),
        button('Lock / forget on this device', lockDevice, 'btn ghost', { id: 'secureLock' })),
      change,
      el('h3', { text: 'Encrypted projects' }),
      ui.unreadable ? el('p', { class: 'hint', text: `${ui.unreadable} file${ui.unreadable === 1 ? '' : 's'} could not be read and ${ui.unreadable === 1 ? 'was' : 'were'} skipped.` }) : null,
      el('div', { id: 'secureProjects', class: 'list' }, ...(ui.projects ?? []).map(projectRow)),
      ui.projects?.length === 0 ? el('p', { class: 'hint', text: 'No encrypted projects yet.' }) : null,
      el('h3', { text: 'Cloud Library' }),
      el('p', { class: 'hint', text: 'Cloud Library items in Firestore are not end-to-end encrypted until moved. Moving copies them here and verifies each one. Originals stay until you delete them separately.' }),
      el('div', { class: 'btn-row' }, button('Move to encrypted storage', move, 'btn ghost', { id: 'secureMove' }), moved),
    ];
  }

  function render() {
    host.replaceChildren(
      el('div', { class: 'row-between' }, el('h2', { text: 'Encrypted Drive saves' }), el('span', { id: 'secureStatus', class: 'pill', 'data-state': ui.status, text: STATUS[ui.status] })),
      durable ? null : el('p', { class: 'hint', text: 'This browser is blocking private storage, so drafts and queued saves last only until this tab closes.' }),
      ...body().filter(Boolean),
      el('p', { id: 'secureMessage', class: `hint${ui.error ? ' secure-error' : ''}`, role: 'status', text: ui.message }),
    );
  }

  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') saver?.flush(); });
  window.addEventListener('online', () => saver?.drain());
  window.addEventListener('pagehide', () => { saver?.flush(); });
  render();

  return {
    configured: Boolean(clientId),
    /** Signing out of StudCraft also ends this tab's Drive session. Encrypted data stays. */
    disconnect() {
      saver?.disable(); saver = null; sync = null; drive = null; project = null;
      auth?.forget();
      Object.assign(ui, { step: 'intro', projects: null, verified: [], confirm: null, message: '', status: 'off', detail: '', changing: false });
      render();
    },
    prepareDrive: () => auth?.prepare(),
    /** Connects from a click and returns the Drive client and this account's private store, for the settings backup. */
    async settingsDrive() {
      if (!auth) throw new DriveError('fatal');
      if (!auth.connected()) await auth.connect();
      drive ??= createDriveRest({ getToken: (refresh, stale) => auth.getToken(refresh, stale) });
      return { drive, kv: ownerKv(kv, await ownerHash(await drive.ownerId())) };
    },
    touch: () => saver?.touch(),
    newProject: () => { project = null; },
    setProject: (id) => { project = id; },
    project: () => project,
  };
}
