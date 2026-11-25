// StudCraft web UI. All text from files, AI, or the engine is written with textContent.
import * as helpers from './engine.js';
import { PROVIDERS, PROVIDER_IDS, createClients, createCoordinator, createTransport } from './ai.js';
import { LIMITS, UserError, displayName, redact, validateImageBytes } from './security.js';
import { SCENE_LIMITS, paintScene } from './drawing.js';
import { KeyStore, MIN_PASSPHRASE, clearVault, decryptKeys, encryptKeys, readVault, writeVault } from './vault.js';
import { colorMap, drawMosaic, drawStep } from './render.js';
import { FILE_NAME, VaultError, describePayload, openVault, passphraseProblem, sealVault, vaultTheme, webTheme } from './settings-vault.js';
import { SESSION_HINT, createCloud } from './cloud.js';
import { accountView, authMessage, cleanText, cloudMessage } from './cloud-model.js';
import { createEditor, packGrid, readDraft, unpackGrid } from './editor.js';
import { MAX_IMAGE_BYTES, toB64 } from './secure-format.js';
import { createDraftStore } from './secure-sync.js';
import { createBestKv } from './secure-store.js';
import { createSecurePanel } from './secure-ui.js';
import { StaleBackupError, backupVault, fetchVault, markVaultRestored } from './settings-drive.js';
import { createExtras } from './extras.js';

const $ = (id) => document.getElementById(id);

function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k === 'text') node.textContent = v;
    else if (k === 'class') node.className = v;
    else if (k.startsWith('on')) node.addEventListener(k.slice(2), v);
    else node.setAttribute(k, v);
  }
  node.append(...children.filter(Boolean));
  return node;
}

const money = (v) => `$${Number(v).toFixed(2)}`;
const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* blocked storage is fine */ } },
  remove(k) { try { localStorage.removeItem(k); } catch { /* blocked storage is fine */ } },
};
const vaultStorage = { getItem: (k) => localStore()?.getItem(k) ?? null, setItem: (k, v) => localStore()?.setItem(k, v), removeItem: (k) => localStore()?.removeItem(k) };
function localStore() { try { return window.localStorage; } catch { return null; } }

/* ---------- status ---------- */
let statusTimer;
function notify(message, isError = false, ms = isError ? 9000 : 3500) {
  const box = $('status');
  box.textContent = message;
  box.classList.toggle('error', isError);
  box.hidden = false;
  clearTimeout(statusTimer);
  statusTimer = setTimeout(() => { box.hidden = true; }, ms);
}

/* ---------- worker ---------- */
const worker = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' });
const waiting = new Map();
let nextCall = 1;
worker.onmessage = ({ data }) => {
  const entry = waiting.get(data.id);
  if (!entry) return;
  waiting.delete(data.id);
  if (data.ok) entry.resolve(data.value); else entry.reject(new UserError('StudCraft could not finish that.'));
};
worker.onerror = () => {
  for (const entry of waiting.values()) entry.reject(new UserError('The mosaic engine stopped. Reload the page.'));
  waiting.clear();
};
function callWorker(type, payload, transfer = []) {
  return new Promise((resolve, reject) => {
    const id = nextCall++;
    waiting.set(id, { resolve, reject });
    worker.postMessage({ id, type, payload }, transfer);
  });
}

/* ---------- state ---------- */
const state = { catalog: null, colors: new Map(), source: null, result: null, step: 0, name: '', sampleId: null, requested: 0, built: 0, extras: '' };
let extras = null;

const SAMPLES = [
  { id: 'wave', title: 'Sunset Wave' },
  { id: 'toucan', title: 'Jungle Toucan' },
  { id: 'astronaut', title: 'Cosmic Visor' },
];

/* ---------- theme ---------- */
const THEMES = ['auto', 'light', 'dark'];
function applyTheme(theme) {
  if (theme === 'auto') document.documentElement.removeAttribute('data-theme');
  else document.documentElement.setAttribute('data-theme', theme);
  $('themeBtn').textContent = `Theme: ${theme[0].toUpperCase()}${theme.slice(1)}`;
  $('themeBtn').dataset.theme = theme;
}

/* ---------- tabs ---------- */
const TABS = ['studio', 'parts', 'guide', 'export', 'ai', 'library'];
function showTab(name) {
  for (const t of TABS) {
    $(`tab-${t}`).hidden = t !== name;
    $(`tabbtn-${t}`).setAttribute('aria-selected', String(t === name));
  }
  if (name === 'guide') renderStep();
  if (name === 'library' && library.user && !library.loaded) refreshLibrary();
  window.scrollTo({ top: 0 });
}

/* ---------- image intake ---------- */
function fitDimensions(w, h) {
  const longest = Math.max(readInt('gridW', 32), readInt('gridH', 32));
  const even = (v) => Math.min(96, Math.max(16, Math.floor((v + 1) / 2) * 2));
  if (w >= h) return [longest, even(Math.round(longest * (h / w)))];
  return [even(Math.round(longest * (w / h))), longest];
}

function setSource(image, width, height, name, sampleId = null) {
  const scale = Math.min(1, LIMITS.workSide / Math.max(width, height));
  const w = Math.max(1, Math.round(width * scale));
  const h = Math.max(1, Math.round(height * scale));
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, w, h);
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(image, 0, 0, w, h);
  const rgba = ctx.getImageData(0, 0, w, h).data;
  const argb = new Int32Array(w * h);
  for (let i = 0, p = 0; i < argb.length; i++, p += 4) {
    argb[i] = (255 << 24) | (rgba[p] << 16) | (rgba[p + 1] << 8) | rgba[p + 2];
  }
  secure?.newProject();
  state.source = { argb, width: w, height: h };
  state.pristine = { argb: argb.slice(), width: w, height: h };
  clearTimeout(statusTimer);
  $('status').hidden = true;
  state.name = name;
  state.sampleId = sampleId;
  $('sourceName').textContent = name;
  $('renameProject').disabled = false;
  showSourcePreview();
  const [gw, gh] = fitDimensions(w, h);
  $('gridW').value = gw;
  $('gridH').value = gh;
  syncPreset();
  scheduleConvert(true);
}

function showSourcePreview() {
  const { argb, width: w, height: h } = state.source;
  const full = document.createElement('canvas');
  full.width = w;
  full.height = h;
  const data = new ImageData(w, h);
  for (let i = 0, p = 0; i < argb.length; i++, p += 4) {
    data.data[p] = (argb[i] >> 16) & 255;
    data.data[p + 1] = (argb[i] >> 8) & 255;
    data.data[p + 2] = argb[i] & 255;
    data.data[p + 3] = 255;
  }
  full.getContext('2d').putImageData(data, 0, 0);
  const preview = $('sourceCanvas');
  const previewScale = Math.min(1, 480 / Math.max(w, h));
  preview.width = Math.max(1, Math.round(w * previewScale));
  preview.height = Math.max(1, Math.round(h * previewScale));
  preview.getContext('2d').drawImage(full, 0, 0, preview.width, preview.height);
  $('sourceCard').hidden = false;
}

async function loadBytes(bytes, name) {
  if (!await confirmDiscard()) return;
  const info = validateImageBytes(bytes);
  let bitmap;
  try {
    bitmap = await createImageBitmap(new Blob([bytes], { type: info.type }));
  } catch {
    throw new UserError("StudCraft couldn't read that image.");
  }
  try {
    setSource(bitmap, bitmap.width, bitmap.height, name);
  } finally {
    bitmap.close();
  }
}

async function openFile(file) {
  try {
    if (file.size > LIMITS.maxBytes) throw new UserError('That image is larger than 25 MB.');
    await loadBytes(new Uint8Array(await file.arrayBuffer()), displayName(file.name));
    showTab('studio');
  } catch (e) {
    notify(e instanceof UserError ? e.message : "StudCraft couldn't read that image.", true);
  }
}

async function loadSample(sample, then) {
  if (!await confirmDiscard()) return;
  const image = new Image();
  image.onload = () => {
    setSource(image, image.naturalWidth, image.naturalHeight, sample.title, sample.id);
    then?.();
  };
  image.onerror = () => notify("That sample couldn't load.", true);
  image.src = `assets/sample-${sample.id}.jpg`;
}

/* ---------- settings ---------- */
function readInt(id, fallback) {
  const v = Number.parseInt($(id).value, 10);
  return Number.isFinite(v) ? Math.min(96, Math.max(16, v)) : fallback;
}

const readConfig = () => ({
  width: readInt('gridW', 32), height: readInt('gridH', 32),
  style: $('style').value, backing: $('backing').value, palette: $('palette').value, rarity: $('rarity').value,
  tolerance: Number($('tolerance').value), dither: $('dither').checked, legal: $('legal').checked,
  brightness: Number($('brightness').value), contrast: Number($('contrast').value), saturation: Number($('saturation').value),
});

function fillSelect(id, items) {
  $(id).replaceChildren(...items.map((i) => el('option', { value: i.id, text: i.title })));
}

function syncPreset() {
  const v = `${readInt('gridW', 32)}x${readInt('gridH', 32)}`;
  const preset = $('sizePreset');
  preset.value = [...preset.options].some((o) => o.value === v) ? v : 'custom';
}

/** Plate color and show-through for plate backings. Match background is the default. */
function renderPlate() {
  const backing = state.catalog?.backings.find((b) => b.id === $('backing').value);
  const choices = backing?.plateColors ?? [];
  const wall = $('style').value === 'STACKED_BRICK_WALL';
  $('platePanel').hidden = wall || !choices.length || !extras;
  if ($('platePanel').hidden) return;
  const { id: manual, show } = extras.plate();
  const r = state.result;
  const matched = r && r.plateColor !== undefined ? r.plateColor : null;
  // Swatches are drawn on canvas, like the editor's, because the page's CSP blocks inline styles.
  const dot = (id, size, cls) => {
    const face = el('canvas', { width: String(size), height: String(size), class: cls, 'aria-hidden': 'true' });
    const c = state.colors.get(id);
    const g = face.getContext('2d');
    if (c && g) { g.fillStyle = `rgb(${c.r},${c.g},${c.b})`; g.beginPath(); g.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2); g.fill(); }
    return face;
  };
  const swatch = (id) => dot(id, 20, 'swatch');
  const name = (id) => state.colors.get(id)?.name ?? 'plate';
  const isManual = manual !== null && choices.includes(manual);
  const match = el('button', { type: 'button', class: 'plate-match', role: 'radio', 'aria-checked': String(!isManual), onclick: () => { if (isManual) extras.setPlate(null); } },
    !isManual && matched !== null ? swatch(matched) : null,
    el('span', { text: matched !== null && !isManual ? `Match background (recommended): ${name(matched)}` : 'Match background (recommended)' }));
  const buttons = choices.map((id) => {
    const face = dot(id, 24, 'plate-dot');
    return el('button', { type: 'button', class: 'plate-swatch', role: 'radio', title: `${name(id)} plate`, 'aria-label': `${name(id)} plate`, 'aria-checked': String(isManual && manual === id), onclick: () => extras.setPlate(id) }, face);
  });
  $('plateSwatches').replaceChildren(match, ...buttons);
  $('plateShow').checked = show;
  const saved = r?.plateSaved ?? 0;
  $('plateHint').textContent = !show ? 'Every stud gets a piece.' : saved > 0 ? `Saves ${saved.toLocaleString('en-US')} studs. Studs in the plate color are left off.` : 'Studs in the plate color are left off.';
}

function syncLabels() {
  const signed = (v) => `${v > 0 ? '+' : ''}${Math.round(v * 100)}%`;
  $('toleranceOut').textContent = String($('tolerance').value);
  $('brightnessOut').textContent = signed(Number($('brightness').value));
  $('contrastOut').textContent = `${Math.round(Number($('contrast').value) * 100)}%`;
  $('saturationOut').textContent = `${Math.round(Number($('saturation').value) * 100)}%`;
  const wall = $('style').value === 'STACKED_BRICK_WALL';
  $('backing').disabled = wall;
  renderPlate();
  const style = state.catalog?.styles.find((s) => s.id === $('style').value);
  const palette = state.catalog?.palettes.find((s) => s.id === $('palette').value);
  $('settingHint').textContent = [style?.description, palette?.description].filter(Boolean).join('. ');
}

/* ---------- conversion ---------- */
let timer;
let running = false;
let again = false;
function scheduleConvert(now = false) {
  if (editor?.isEdited()) {
    const wanted = readConfig();
    writeConfig(state.applied);
    confirmDiscard().then((ok) => {
      if (!ok) return;
      writeConfig(wanted);
      scheduleConvert(now);
    });
    return;
  }
  state.requested += 1;
  syncLabels();
  clearTimeout(timer);
  timer = setTimeout(runConvert, now ? 0 : 140);
}

async function runConvert() {
  if (!state.source) return;
  if (running) { again = true; return; }
  running = true;
  const building = state.requested;
  $('busy').hidden = false;
  $('editBtn').disabled = true;
  try {
    const copy = state.source.argb.slice();
    const sentConfig = state.extras ? { ...readConfig(), extras: state.extras } : readConfig();
    const json = await callWorker('convert', { argb: copy.buffer, width: state.source.width, height: state.source.height, config: sentConfig }, [copy.buffer]);
    const parsed = JSON.parse(json);
    if (parsed.shortage) {
      // The current mosaic stays as it was: nothing is built with holes or extra pieces.
      state.built = building;
      showShortage(parsed);
      return;
    }
    showShortage(null);
    state.result = parsed;
    state.built = building;
    const settingsChanged = state.lastBuilt?.source === state.source && JSON.stringify(state.lastBuilt.config) !== JSON.stringify(sentConfig);
    state.lastBuilt = { source: state.source, config: sentConfig };
    const appliedConfig = state.result.extras ? { ...sentConfig, extras: state.result.extras } : sentConfig;
    state.applied = appliedConfig;
    state.step = Math.min(state.step, Math.max(0, state.result.steps.length - 1));
    editor?.load(state.result.width, state.result.height, appliedConfig, state.result.grid);
    renderAll();
    if (settingsChanged) secure?.touch();
    offerDraft?.();
    offerDraft = null;
  } catch (e) {
    notify(e instanceof UserError ? e.message : 'StudCraft could not build that mosaic.', true);
  } finally {
    running = false;
    $('busy').hidden = true;
    $('editBtn').disabled = false;
    if (again) { again = false; runConvert(); }
  }
}

function showShortage(info) {
  $('setBanner').hidden = !info;
  if (!info) return;
  const fits = info.fitW > 0;
  $('setBannerText').textContent = fits ? `${info.shortage} The mosaic was not changed.` : `${info.shortage} These sets can't fill a 16×16 mosaic with this buffer. Add sets or reduce the buffer.`;
  $('setBannerFit').hidden = !fits;
  if (fits) {
    $('setBannerFit').textContent = `Use largest size: ${info.fitW}×${info.fitH}`;
    $('setBannerFit').dataset.w = info.fitW;
    $('setBannerFit').dataset.h = info.fitH;
  }
}

function useLargestSize(w, h) {
  $('gridW').value = w;
  $('gridH').value = h;
  syncPreset();
  scheduleConvert(true);
}

async function applyExtras(text) {
  if (text === state.extras) return;
  if (!await confirmDiscard()) { extras.load(state.extras); return; }
  state.extras = text;
  scheduleConvert(true);
}

async function previewExtras(text) {
  if (!state.source) return null;
  const copy = state.source.argb.slice();
  const json = await callWorker('preview', { argb: copy.buffer, width: state.source.width, height: state.source.height, config: { ...readConfig(), extras: text } }, [copy.buffer]);
  return JSON.parse(json);
}

function renderSetParts(r) {
  const s = r.setReport;
  $('setPartsCard').hidden = !s;
  if (!s) return;
  $('setStats').replaceChildren(
    stat(money(s.additionalPab), 'additional parts'),
    stat(s.used.toLocaleString('en-US'), 'pieces used'),
    stat(s.left.toLocaleString('en-US'), 'left over'),
    stat(s.shortage.toLocaleString('en-US'), 'short'),
    stat(money(s.ownedValue), 'value of owned pieces'),
  );
  $('setNotes').replaceChildren(...s.notes.map((n) => el('p', { class: 'hint', text: n.text })));
  $('setContrib').replaceChildren(...s.sets.map((c) => el('div', { class: 'bom-row' }, el('span', {}), el('div', {}, el('span', { text: `${c.number} ${c.name}` }), el('small', { text: `Quantity ${c.qty}` })), el('span', { class: 'num', text: `×${c.used}` }), el('span', {}))));
  $('setLines').replaceChildren(...s.lines.filter((l) => l.used > 0).map((l) => el('div', { class: 'bom-row' }, swatch(l.colorId), el('div', {}, el('span', { text: `${l.partName} (${l.part})` }), el('small', { text: l.colorName })), el('span', { class: 'num', text: `${l.used} of ${l.available}` }), el('span', { class: 'num', text: `${l.available - l.used} left` }))));
}

/* ---------- rendering ---------- */
const stat = (value, label) => el('div', { class: 'stat' }, el('b', { text: value }), el('span', { text: label }));

function swatch(colorId) {
  const c = state.colors.get(colorId);
  const canvas = el('canvas', { class: 'swatch', width: '20', height: '20', 'aria-hidden': 'true' });
  const ctx = canvas.getContext('2d');
  if (c) { ctx.fillStyle = `rgb(${c.r},${c.g},${c.b})`; ctx.fillRect(0, 0, 20, 20); }
  return canvas;
}

function renderAll() {
  const r = state.result;
  drawMosaic($('mosaic'), r, state.colors);
  $('stats').replaceChildren(
    stat(`${r.width}×${r.height}`, 'studs'),
    stat(r.pricing.pieces.toLocaleString('en-US'), 'pieces'),
    stat(money(r.pricing.pab), r.setReport ? 'additional parts' : 'Pick a Brick est.'),
    stat(`${r.validation.score}%`, 'build score'),
  );
  renderSetParts(r);
  renderPlate();
  extras?.refresh();
  $('costStats').replaceChildren(
    stat(money(r.pricing.pab), r.setReport ? 'Additional, Pick a Brick' : 'Pick a Brick'),
    stat(money(r.pricing.bl), r.setReport ? 'Additional, BrickLink' : 'BrickLink'),
    stat(money(r.pricing.backing), 'Backing'),
    stat(money(r.pricing.perStud), 'Per stud'),
    stat(String(r.pricing.pieces), 'Pieces'),
    stat(String(r.pricing.lots), 'Lots'),
  );
  $('checks').replaceChildren(...r.validation.checks.map((c) => el('div', { class: 'check' },
    el('div', { class: 'check-head' }, el('span', { text: c.title }), el('span', { class: `pill ${c.severity.toLowerCase()}`, text: c.severity === 'PASS' ? 'Pass' : c.severity === 'WARNING' ? 'Warning' : 'Error' })),
    el('p', { text: c.detail }))));
  $('bom').replaceChildren(...r.bom.map((l) => el('div', { class: 'bom-row' },
    swatch(l.colorId),
    el('div', {}, el('span', { text: `${l.partName} (${l.part})` }), el('small', { text: `${l.colorName} · ${r.setReport ? `${l.owned} from your sets` : l.rarity}${l.alt ? ` · Swap: ${l.alt}` : ''}` })),
    el('span', { class: 'num', text: `×${l.qty}` }),
    el('span', { class: 'num', text: money(l.pabTotal) }))));
  $('suggestions').replaceChildren(...(r.suggestions.length ? r.suggestions.map((s) => el('div', { class: 'check' },
    el('div', { class: 'check-head' }, el('span', { text: s.title }), el('span', { class: 'pill pass', text: `~${money(s.save)}` })),
    el('p', { text: s.detail }))) : [el('p', { class: 'hint', text: 'This build is already well optimized.' })]));
  renderExports();
  renderStep();
}

function renderStep() {
  const r = state.result;
  if (!r || r.steps.length === 0 || $('tab-guide').hidden) return;
  const step = r.steps[state.step];
  $('stepTitle').textContent = `Step ${step.n}: ${step.title}`;
  $('stepSub').textContent = step.subtitle;
  $('stepCount').textContent = `${state.step + 1} of ${r.steps.length}`;
  const range = $('stepRange');
  range.max = String(r.steps.length);
  range.value = String(state.step + 1);
  $('stepPrev').disabled = state.step === 0;
  $('stepNext').disabled = state.step >= r.steps.length - 1;
  drawStep($('stepCanvas'), r, state.colors, state.step);
  $('stepParts').replaceChildren(...step.parts.map((l) => el('div', { class: 'bom-row' },
    swatch(l.colorId),
    el('div', {}, el('span', { text: l.part }), el('small', { text: l.code ? `${l.colorName} · Color ${l.code}` : l.colorName })),
    el('span', { class: 'num', text: `×${l.qty}` }),
    el('span', {}))));
}

function download(text, name, type) {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const link = el('a', { href: url, download: name });
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}

async function copy(text, message) {
  try {
    await navigator.clipboard.writeText(text);
    notify(message);
  } catch {
    notify('Your browser blocked copying. Use the download button instead.', true);
  }
}

const needResult = () => {
  if (state.result) return true;
  notify('Open an image first.', true);
  return false;
};

const PRO_EXPORTS = [
  { id: 'POSTER_PNG', title: 'Poster PNG', text: 'High-resolution picture of the finished mosaic.', type: 'image/png' },
  { id: 'STUD_MAP_PNG', title: 'Stud map PNG', text: 'Numbered chart with stud coordinates and a color key.', type: 'image/png' },
  { id: 'INSTRUCTIONS_PDF', title: 'Building instructions PDF', text: 'Cover, parts list with color names and IDs, section map, and numbered steps.', type: 'application/pdf' },
  { id: 'STUDIO_IO', title: 'BrickLink Studio (.io)', text: 'Model with parts, colors, backing, and build steps.', type: 'application/octet-stream' },
  { id: 'LDRAW_LDR', title: 'LDraw model (.ldr)', text: 'Plain LDraw with build steps.', type: 'text/plain' },
  { id: 'LDRAW_MPD', title: 'LDraw multi-part (.mpd)', text: 'Separate backing and surface submodels.', type: 'text/plain' },
];

async function downloadPro(item, button) {
  if (!needResult()) return;
  button.disabled = true;
  try {
    await editor.flush();
    const out = await callWorker('pro', { kind: item.id, title: state.name });
    const url = URL.createObjectURL(new Blob([out.bytes], { type: item.type }));
    const link = el('a', { href: url, download: out.name });
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30_000);
  } catch {
    notify('StudCraft could not make that file.', true);
  } finally {
    button.disabled = false;
  }
}

function renderExports() {
  const c = state.catalog;
  if (!$('proList').childElementCount) {
    $('proList').replaceChildren(...PRO_EXPORTS.map((item) => el('div', { class: 'list-item' },
      el('div', {}, el('strong', { text: item.title }), el('p', { text: item.text })),
      el('div', { class: 'list-actions' }, el('button', { class: 'btn ghost', type: 'button', text: 'Download', 'data-pro': item.id, onclick: (e) => downloadPro(item, e.currentTarget) })))));
  }
  $('csvList').replaceChildren(...c.csvFormats.map((f) => el('div', { class: 'list-item' },
    el('div', {}, el('strong', { text: f.title }), el('p', { text: f.description })),
    el('div', { class: 'list-actions' }, el('button', { class: 'btn ghost', type: 'button', text: 'Download CSV', 'data-csv': f.id, onclick: async () => {
      if (!needResult()) return;
      const out = await callWorker('csv', { format: f.id });
      download(out.text, out.name, 'text/csv;charset=utf-8');
    } })))));
  const quotes = new Map((state.result?.quotes ?? []).map((q) => [q.id, q]));
  $('cartList').replaceChildren(...c.marketplaces.map((m) => {
    const q = quotes.get(m.id);
    const link = q && /^https:\/\/[a-z0-9.-]+\//i.test(q.url)
      ? el('a', { class: 'btn ghost', href: q.url, target: '_blank', rel: 'noopener noreferrer', text: 'Open store' }) : null;
    return el('div', { class: 'list-item' },
      el('div', {}, el('strong', { text: q ? `${m.title} · ${money(q.total)}` : m.title }), el('p', { text: m.howTo })),
      el('div', { class: 'list-actions' },
        el('button', { class: 'btn ghost', type: 'button', text: 'Download', onclick: async () => {
          if (!needResult()) return;
          const out = await callWorker('cart', { marketplace: m.id });
          download(out.text, out.name, out.name.endsWith('.xml') ? 'application/xml' : 'text/csv;charset=utf-8');
        } }),
        el('button', { class: 'btn ghost', type: 'button', text: 'Copy', onclick: async () => {
          if (!needResult()) return;
          const out = await callWorker('cart', { marketplace: m.id });
          copy(out.text, 'Copied.');
        } }),
        link));
  }));
}

/* ---------- stud editor ---------- */
let editor = null;
let offerDraft = null;
let draftPending = false;
let discardAnswer = null;

function writeConfig(c) {
  if (!c) return;
  $('gridW').value = c.width;
  $('gridH').value = c.height;
  for (const id of ['style', 'backing', 'palette', 'rarity', 'tolerance', 'brightness', 'contrast', 'saturation']) $(id).value = String(c[id]);
  $('dither').checked = c.dither;
  $('legal').checked = c.legal;
  syncPreset();
  syncLabels();
}

/** Resolves true when nothing would be lost, or the person agreed to lose it. */
function confirmDiscard() {
  if (!editor?.isEdited()) return Promise.resolve(true);
  if (discardAnswer) return discardAnswer.promise;
  const n = editor.editedCount();
  $('discardText').textContent = `This rebuilds the mosaic from the image and discards ${n} edited stud${n === 1 ? '' : 's'}.`;
  let resolve;
  const promise = new Promise((r) => { resolve = r; });
  discardAnswer = { promise, resolve };
  $('discardDialog').showModal();
  return promise;
}

function answerDiscard(yes) {
  const answer = discardAnswer;
  discardAnswer = null;
  if ($('discardDialog').open) $('discardDialog').close();
  if (yes) editor.discard();
  answer?.resolve(yes);
}

async function applyEdited(grid, config) {
  const copy = grid.slice();
  const json = await callWorker('rebuild', { grid: copy.buffer, config }, [copy.buffer]);
  state.result = JSON.parse(json);
  state.step = Math.min(state.step, Math.max(0, state.result.steps.length - 1));
  renderAll();
}

async function tweakSource(op, l, t, r, b) {
  if (!state.source) { notify('Open an image first.', true); return; }
  if (!await confirmDiscard()) return;
  const out = helpers.tweakImage(state.source.argb, state.source.width, state.source.height, op, l, t, r, b);
  state.source = { width: out[0], height: out[1], argb: Int32Array.from(out.subarray(2)) };
  showSourcePreview();
  if (op !== 'flipH' && op !== 'flipV') {
    const [gw, gh] = fitDimensions(state.source.width, state.source.height);
    $('gridW').value = gw;
    $('gridH').value = gh;
    syncPreset();
  }
  scheduleConvert(true);
}

async function resetSource() {
  if (!state.pristine) return;
  if (!await confirmDiscard()) return;
  state.source = { ...state.pristine, argb: state.pristine.argb.slice() };
  showSourcePreview();
  const [gw, gh] = fitDimensions(state.source.width, state.source.height);
  $('gridW').value = gw;
  $('gridH').value = gh;
  syncPreset();
  scheduleConvert(true);
}

async function setupEditor() {
  editor = createEditor({
    engine: helpers, el, drafts, draftProject: () => secure?.project() ?? null, draftLocked: () => draftPending, onEdited: () => secure?.touch(), colors: state.colors, catalog: state.catalog.colors, palettes: state.catalog.palettes,
    rebuild: applyEdited,
    onTweak: tweakSource,
    onResetImage: resetSource,
    onAdjust: (key, value) => { $(key).value = value; scheduleConvert(true); },
    onExtras: () => extras.open('buffer'),
    sliders: () => ({ brightness: $('brightness').value, contrast: $('contrast').value, saturation: $('saturation').value }),
    notify,
    onClose: () => {},
  });
  $('editBtn').addEventListener('click', () => { if (needResult()) editor.open(); });
  $('renameProject').addEventListener('click', () => {
    $('renameInput').value = state.name ?? '';
    $('renameDialog').showModal();
    $('renameInput').select();
  });
  $('renameCancel').addEventListener('click', () => $('renameDialog').close());
  $('renameForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = cleanText($('renameInput').value, 100);
    if (!name) return;
    // Renames only. The image and mosaic stay as they are, and the next encrypted save carries the new name.
    state.name = name;
    $('sourceName').textContent = name;
    $('cloudTitle').value = name;
    secure?.touch();
    $('renameDialog').close();
  });
  $('discardYes').addEventListener('click', () => answerDiscard(true));
  $('discardNo').addEventListener('click', () => answerDiscard(false));
  $('discardDialog').addEventListener('cancel', (e) => { e.preventDefault(); answerDiscard(false); });
  const draft = readDraft(await drafts.load(), state.colors);
  if (!draft) return;
  draftPending = true;
  $('draftText').textContent = `You have unsaved stud edits from ${new Date(draft.at).toLocaleString()} (${draft.w}×${draft.h}). They are encrypted and stored only in this browser. The original image is not stored.`;
  // Offered after the first conversion, so that conversion can't overwrite restored edits.
  offerDraft = () => { $('draftBanner').hidden = false; };
  if (state.result && !running) { offerDraft(); offerDraft = null; }
  $('draftDiscard').addEventListener('click', () => { draftPending = false; drafts.clear(); $('draftBanner').hidden = true; });
  $('draftRestore').addEventListener('click', async () => {
    if (!await confirmDiscard()) return;
    try {
      const base = readConfig();
      const safe = (list, value, fallback) => (state.catalog[list].some((x) => x.id === value) ? value : fallback);
      const num = (v, lo, hi, d) => (Number.isFinite(v) ? Math.min(hi, Math.max(lo, v)) : d);
      const c = draft.config;
      const config = {
        width: draft.w, height: draft.h, style: safe('styles', c.style, base.style), backing: safe('backings', c.backing, base.backing),
        palette: safe('palettes', c.palette, base.palette), rarity: safe('rarities', c.rarity, base.rarity),
        tolerance: num(c.tolerance, 0, 32, base.tolerance), dither: c.dither === true, legal: c.legal !== false,
        brightness: num(c.brightness, -0.35, 0.35, 0), contrast: num(c.contrast, 0.7, 1.5, 1.08), saturation: num(c.saturation, 0.5, 1.6, 1.12),
      };
      if (typeof c.extras === 'string' && c.extras && helpers.extrasValid(c.extras)) config.extras = c.extras;
      state.extras = config.extras ?? '';
      extras.load(state.extras);
      writeConfig(config);
      state.applied = config;
      editor.load(draft.w, draft.h, config, draft.original, draft.grid);
      await applyEdited(draft.grid, config);
      if (draft.project) secure?.setProject(draft.project);
      draftPending = false;
      $('draftBanner').hidden = true;
      editor.open();
    } catch {
      notify('Those saved edits could not be restored.', true);
    }
  });
}

/* ---------- AI ---------- */
const keys = new KeyStore();
const enabled = new Set();
const modelInputs = {};

const settings = {
  keys,
  get claudeModel() { return modelInputs.claude?.value ?? ''; },
  get openAiModel() { return modelInputs.openai?.value ?? ''; },
  active: () => PROVIDER_IDS.filter((p) => enabled.has(p) && keys.has(p)),
  withKeys: () => PROVIDER_IDS.filter((p) => keys.has(p)),
};

const call = createTransport({ fetchImpl: (...args) => window.fetch(...args), keys });
const clients = createClients({ call, helpers });

async function renderScene(scene) {
  const canvas = document.createElement('canvas');
  canvas.width = SCENE_LIMITS.canvas;
  canvas.height = SCENE_LIMITS.canvas;
  paintScene(canvas.getContext('2d'), scene);
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
  if (!blob) throw new UserError('The AI drawing could not be painted.');
  return new Uint8Array(await blob.arrayBuffer());
}

const imageUrls = new Set();
async function verifyImage(bytes) {
  const info = validateImageBytes(bytes);
  const blob = new Blob([bytes], { type: info.type });
  let bitmap;
  try {
    bitmap = await createImageBitmap(blob);
  } catch {
    throw new UserError('The AI returned an unreadable image.');
  }
  bitmap.close();
  const url = URL.createObjectURL(blob);
  imageUrls.add(url);
  return { bytes, url };
}

const coordinator = createCoordinator({ clients, verifyImage, renderScene, onChange: renderChat });

function renderChat({ turns, busy }) {
  $('askBtn').disabled = busy;
  $('createBtn').disabled = busy;
  $('chat').replaceChildren(...turns.map((t) => {
    if (t.isUser) return el('div', { class: 'turn user', text: t.text });
    const node = el('div', { class: `turn${t.isError ? ' error' : ''}` }, el('small', { text: PROVIDERS[t.provider].title }));
    node.append(t.isPending && !t.text ? 'Thinking…' : t.text);
    if (t.image) {
      node.append(el('img', { src: t.image.url, alt: `Image created by ${PROVIDERS[t.provider].title}` }));
      node.append(el('button', { class: 'btn', type: 'button', text: 'Use as mosaic', onclick: async () => {
        try {
          await loadBytes(t.image.bytes, `${PROVIDERS[t.provider].title} image`);
          showTab('studio');
        } catch (e) {
          notify(e instanceof UserError ? e.message : "StudCraft couldn't use that image.", true);
        }
      } }));
    }
    return node;
  }));
}

function contextPrompt() {
  const r = state.result;
  if (!r) return 'No mosaic generated yet.';
  const c = readConfig();
  const title = (list, id) => state.catalog[list].find((x) => x.id === id)?.title ?? id;
  const top = r.bom.filter((l) => !l.structural).sort((a, b) => b.qty - a.qty).slice(0, 6).map((l) => `${l.colorName} (${l.qty}× ${l.part})`).join(', ');
  return [
    `Dimensions: ${r.width}×${r.height} studs`,
    `Build style: ${title('styles', c.style)} | Backing: ${title('backings', c.backing)}`,
    `Palette: ${title('palettes', c.palette)} | Rarity: ${title('rarities', c.rarity)}`,
    `Pieces: ${r.pricing.pieces} | Pick a Brick: ${money(r.pricing.pab)} | BrickLink: ${money(r.pricing.bl)}`,
    `Legal engineering score: ${r.validation.score}%`,
    top ? `Top tile lots: ${top}` : '',
  ].filter(Boolean).join('\n');
}

function refreshKeyField(id) {
  const has = keys.has(id);
  const input = $(`key-${id}`);
  input.value = '';
  input.placeholder = has ? 'Key held in memory' : `Paste ${PROVIDERS[id].title} API key`;
  $(`keystate-${id}`).textContent = has ? 'Key ready' : 'No key';
  $(`keystate-${id}`).className = has ? 'pill pass' : 'pill';
}

function buildProviders() {
  $('providers').replaceChildren(...PROVIDER_IDS.map((id) => {
    const toggle = el('input', { type: 'checkbox', id: `enable-${id}`, onchange: (e) => {
      if (e.target.checked) enabled.add(id); else enabled.delete(id);
    } });
    const input = el('input', { type: 'password', id: `key-${id}`, autocomplete: 'off', spellcheck: 'false', autocapitalize: 'off', 'aria-label': `${PROVIDERS[id].title} API key` });
    const commit = () => {
      if (!input.value) return;
      keys.set(id, input.value);
      clients.forgetModels();
      enabled.add(id);
      toggle.checked = true;
      refreshKeyField(id);
    };
    input.addEventListener('change', commit);
    input.addEventListener('blur', commit);
    const box = el('div', { class: 'provider' },
      el('div', { class: 'row-between' },
        el('label', { class: 'switch' }, toggle, el('span', { text: PROVIDERS[id].title })),
        el('span', { id: `keystate-${id}`, class: 'pill', text: 'No key' })),
      input);
    if (id !== 'gemini') {
      const model = el('input', { type: 'text', id: `model-${id}`, value: helpers.defaultModel(id), spellcheck: 'false', autocapitalize: 'off', maxlength: '80', 'aria-label': `${PROVIDERS[id].title} model` });
      modelInputs[id] = model;
      box.append(el('label', { class: 'field' }, 'Model', model));
    }
    return box;
  }));
  PROVIDER_IDS.forEach(refreshKeyField);
}

function vaultMessage(text) { $('vaultStatus').textContent = text; }

function refreshVaultButtons() {
  $('unlockVault').disabled = !readVault(vaultStorage);
}

async function saveVault() {
  const pass = $('passphrase');
  const phrase = pass.value;
  if (phrase.length < MIN_PASSPHRASE) { vaultMessage(`Use a passphrase of at least ${MIN_PASSPHRASE} characters.`); return; }
  if (keys.providers().length === 0) { vaultMessage('Add a key first.'); return; }
  $('saveVault').disabled = true;
  vaultMessage('Encrypting…');
  try {
    writeVault(vaultStorage, await encryptKeys(keys.snapshot(), phrase));
    pass.value = '';
    vaultMessage('Keys are encrypted and remembered on this device.');
  } catch {
    vaultMessage('This browser could not save encrypted keys.');
  } finally {
    $('saveVault').disabled = false;
    refreshVaultButtons();
  }
}

async function unlockVault() {
  const record = readVault(vaultStorage);
  const pass = $('passphrase');
  if (!record) { vaultMessage('No saved keys on this device.'); return; }
  $('unlockVault').disabled = true;
  vaultMessage('Unlocking…');
  try {
    const saved = await decryptKeys(record, pass.value);
    keys.load(saved);
    clients.forgetModels();
    for (const id of Object.keys(saved)) { enabled.add(id); $(`enable-${id}`).checked = true; }
    PROVIDER_IDS.forEach(refreshKeyField);
    pass.value = '';
    vaultMessage('Keys unlocked for this tab.');
  } catch {
    vaultMessage('Wrong passphrase, or the saved keys were changed.');
  } finally {
    refreshVaultButtons();
  }
}

function forgetKeys() {
  keys.clear();
  clients.forgetModels();
  enabled.clear();
  clearVault(vaultStorage);
  $('passphrase').value = '';
  for (const id of PROVIDER_IDS) { $(`enable-${id}`).checked = false; refreshKeyField(id); }
  refreshVaultButtons();
  vaultMessage('Keys forgotten on this device.');
}

/* ---------- encrypted settings backup ---------- */
let pendingRestore = null;

function backupMessage(text) { $('backupStatus').textContent = text; }

function clearPendingRestore() {
  pendingRestore = null;
  $('restoreReview').hidden = true;
  $('restoreItems').replaceChildren();
  $('restoreIgnored').textContent = '';
  $('restoreRemember').checked = false;
}

function sealSettings(passphrase) {
  const theme = vaultTheme($('themeBtn').dataset.theme);
  return sealVault({
    createdAt: new Date().toISOString().replace(/\.\d+Z$/, 'Z'),
    createdBy: 'web',
    ai: { enabledProviders: [...enabled], keys: keys.snapshot(), models: { claude: settings.claudeModel.trim(), openai: settings.openAiModel.trim() } },
    preferences: theme ? { themeMode: theme } : {},
  }, passphrase);
}

const driveBackupError = (e) => (e?.kind === 'offline' ? 'You appear to be offline. Nothing was changed.' : e?.kind === 'auth' ? 'Google Drive access was not granted. Nothing was changed.' : 'Google Drive could not finish that. Nothing was changed.');
let staleBackup = null;

function clearStaleBackup() {
  staleBackup = null;
  $('backupStale').hidden = true;
}

async function backupToDrive(replace = false) {
  const first = $('backupPassphrase');
  const second = $('backupPassphrase2');
  let bytes = staleBackup?.bytes;
  if (!replace) {
    clearStaleBackup();
    clearPendingRestore();
    const problem = passphraseProblem(first.value, second.value);
    if (problem) { backupMessage(problem); return; }
  }
  $('backupDrive').disabled = true;
  try {
    // The Google window must open from this click, so connect before the slow encryption.
    const session = await secure.settingsDrive();
    if (!bytes) { backupMessage('Encrypting…'); bytes = new TextEncoder().encode(await sealSettings(first.value)); }
    first.value = '';
    second.value = '';
    backupMessage('Uploading encrypted backup…');
    await backupVault({ ...session, bytes, replace });
    clearStaleBackup();
    backupMessage(`Encrypted settings saved to App Backups / StudCraft / ${FILE_NAME}.`);
  } catch (e) {
    if (e instanceof StaleBackupError) {
      first.value = '';
      second.value = '';
      staleBackup = { bytes };
      const when = e.file.modifiedTime ? new Date(e.file.modifiedTime).toLocaleString() : 'another device';
      $('backupStaleText').textContent = `Google Drive has a settings backup this browser hasn't seen (${when}). Restore it first, or replace it with this browser's settings.`;
      $('backupStale').hidden = false;
      backupMessage('Nothing was uploaded.');
    } else backupMessage(driveBackupError(e));
  } finally {
    $('backupDrive').disabled = false;
  }
}

async function restoreFromDrive() {
  clearPendingRestore();
  clearStaleBackup();
  const phrase = $('backupPassphrase');
  if (!phrase.value) { backupMessage('Enter the backup passphrase first.'); return; }
  $('restoreDrive').disabled = true;
  backupMessage('Connecting to Google Drive…');
  try {
    const session = await secure.settingsDrive();
    backupMessage('Downloading encrypted backup…');
    const found = await fetchVault(session);
    if (!found) { backupMessage('No settings backup was found in Google Drive.'); return; }
    backupMessage('Decrypting…');
    const payload = await openVault(found.bytes, phrase.value);
    const { replaced, ignored } = describePayload(payload);
    if (replaced.length === 0) { backupMessage('This backup has nothing this browser can restore.'); return; }
    pendingRestore = { payload, phrase: phrase.value, session, file: found.file };
    phrase.value = '';
    $('backupPassphrase2').value = '';
    $('restoreItems').replaceChildren(...replaced.map((item) => el('li', { text: item })));
    $('restoreIgnored').textContent = ignored.length ? `Not used on the web, so left out: ${ignored.join(', ')}.` : '';
    $('restoreReview').hidden = false;
    backupMessage('Review what will be replaced.');
  } catch (e) {
    backupMessage(e instanceof VaultError ? e.message : driveBackupError(e));
  } finally {
    $('restoreDrive').disabled = false;
  }
}

async function confirmRestore() {
  if (!pendingRestore) return;
  const { payload, phrase, session, file } = pendingRestore;
  $('confirmRestore').disabled = true;
  try {
    const incoming = Object.fromEntries(Object.entries(payload.keys).filter(([, v]) => v));
    if ($('restoreRemember').checked) {
      // Written first: if the browser refuses, the keys in this tab haven't changed either.
      writeVault(vaultStorage, await encryptKeys({ ...keys.snapshot(), ...incoming }, phrase));
    }
    keys.load(incoming);
    clients.forgetModels();
    if (payload.enabledProviders) {
      enabled.clear();
      for (const id of payload.enabledProviders) enabled.add(id);
      for (const id of PROVIDER_IDS) $(`enable-${id}`).checked = enabled.has(id);
    }
    if (payload.models.claude) modelInputs.claude.value = payload.models.claude.slice(0, 80);
    if (payload.models.openai) modelInputs.openai.value = payload.models.openai.slice(0, 80);
    const theme = webTheme(payload.preferences.themeMode);
    if (theme) { applyTheme(theme); store.set('studcraft.theme', theme); }
    PROVIDER_IDS.forEach(refreshKeyField);
    refreshVaultButtons();
    clearPendingRestore();
    await markVaultRestored(session.kv, file).catch(() => {});
    backupMessage('Settings restored to this tab.');
  } catch {
    backupMessage('This browser could not save the keys. Nothing was restored.');
  } finally {
    $('confirmRestore').disabled = false;
  }
}

/* ---------- account and Cloud Library ---------- */
const library = { user: null, items: [], loaded: false, confirming: null, busy: false, epoch: 0 };
const cloud = createCloud({ storage: localStore(), onUser: showAccount });

function libraryMessage(text, isError = false) {
  $('libraryStatus').textContent = text;
  $('libraryStatus').classList.toggle('error', isError);
}

/** Drops every piece of signed-in data from memory and the page. Device-only keys are untouched. */
function clearLibrary() {
  library.epoch += 1;
  library.items = [];
  library.loaded = false;
  library.confirming = null;
  library.busy = false;
  $('libraryList').replaceChildren();
  $('cloudTitle').value = '';
  $('cloudNotes').value = '';
  $('cloudSave').disabled = false;
  $('cloudRefresh').disabled = false;
  libraryMessage('');
}

function showAccount(user) {
  const changed = (library.user?.uid ?? null) !== (user?.uid ?? null);
  if (changed) clearLibrary();
  if (changed && !user) secure?.disconnect();
  library.user = user ?? null;
  const signedIn = Boolean(user);
  const view = signedIn ? accountView(user) : { name: '', email: '', initial: '' };
  $('accountName').textContent = view.name;
  $('accountEmail').textContent = view.email;
  $('accountAvatar').textContent = view.initial;
  $('accountInfo').hidden = !signedIn;
  $('signInBtn').hidden = signedIn;
  $('signInBtn').disabled = false;
  $('signInBtn').textContent = 'Sign in with Google';
  $('libraryGuest').hidden = signedIn;
  $('libraryMember').hidden = !signedIn;
  document.documentElement.dataset.account = signedIn ? 'in' : 'out';
  if (signedIn && changed && !$('tab-library').hidden) refreshLibrary();
}

async function signIn() {
  $('signInBtn').disabled = true;
  $('librarySignIn').disabled = true;
  try {
    await cloud.signIn();
  } catch (e) {
    const message = authMessage(e);
    if (message) notify(message, true);
  } finally {
    $('signInBtn').disabled = false;
    $('librarySignIn').disabled = false;
  }
}

async function signOut() {
  $('signOutBtn').disabled = true;
  clearLibrary();
  try {
    await cloud.signOut();
    notify('Signed out. Keys saved on this device were not changed.');
  } catch {
    notify('StudCraft could not sign out. Try again.', true);
  } finally {
    $('signOutBtn').disabled = false;
  }
}

function friendlyDate(ms) {
  return ms === null ? '' : new Date(ms).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function renderLibrary() {
  $('libraryList').replaceChildren(...library.items.map((m) => {
    const meta = [`${m.width}×${m.height} studs`, `${m.pieces.toLocaleString('en-US')} pieces`, money(m.pab), friendlyDate(m.updatedAt)].filter(Boolean).join(' · ');
    const actions = library.confirming === m.id
      ? [el('span', { class: 'hint', text: 'Delete permanently?' }),
        el('button', { class: 'btn danger', type: 'button', text: 'Delete', 'data-confirm-delete': m.id, onclick: () => deleteSaved(m) }),
        el('button', { class: 'btn ghost', type: 'button', text: 'Keep', onclick: () => { library.confirming = null; renderLibrary(); } })]
      : [el('button', { class: 'btn ghost', type: 'button', text: m.sample ? 'Rebuild' : 'Use settings', 'data-load': m.id, onclick: () => openSaved(m) }),
        el('button', { class: 'btn ghost', type: 'button', text: 'Delete', 'data-delete': m.id, onclick: () => { library.confirming = m.id; renderLibrary(); } })];
    return el('div', { class: 'list-item', 'data-mosaic': m.id },
      el('div', {},
        el('strong', { class: 'saved-title', text: m.title }),
        el('p', { text: meta }),
        el('p', { text: m.sample ? 'Sample image can be rebuilt' : 'Settings only, no image stored' }),
        m.notes ? el('p', { class: 'saved-notes', text: m.notes }) : null),
      el('div', { class: 'list-actions' }, ...actions));
  }));
}

async function refreshLibrary() {
  if (!library.user || library.busy) return;
  const epoch = library.epoch;
  library.busy = true;
  $('cloudRefresh').disabled = true;
  libraryMessage('Loading…');
  try {
    const out = await cloud.list();
    if (epoch !== library.epoch || !out) return;
    library.items = out.items;
    library.loaded = true;
    library.confirming = null;
    renderLibrary();
    const skipped = out.unreadable ? ` ${out.unreadable} saved item${out.unreadable === 1 ? '' : 's'} could not be read.` : '';
    libraryMessage(out.items.length ? `${out.items.length} saved mosaic${out.items.length === 1 ? '' : 's'}.${skipped}` : `Nothing saved yet.${skipped}`);
  } catch (e) {
    if (epoch === library.epoch) libraryMessage(cloudMessage(e), true);
  } finally {
    if (epoch === library.epoch) {
      library.busy = false;
      $('cloudRefresh').disabled = false;
    }
  }
}

async function saveToLibrary() {
  if (!library.user || !needResult()) return;
  if (state.built !== state.requested) { libraryMessage('Wait for the mosaic to finish updating, then save.', true); return; }
  const epoch = library.epoch;
  const sample = SAMPLES.find((s) => s.id === state.sampleId);
  $('cloudSave').disabled = true;
  libraryMessage('Saving…');
  try {
    // A personal file name is not uploaded: only samples keep their name.
    await cloud.save({ title: $('cloudTitle').value, notes: $('cloudNotes').value, sampleId: sample?.id ?? null, sourceLabel: sample?.title ?? 'Custom Photo', config: readConfig(), result: state.result });
    if (epoch !== library.epoch) return;
    $('cloudTitle').value = '';
    $('cloudNotes').value = '';
    $('cloudSave').disabled = false;
    await refreshLibrary();
    if (epoch === library.epoch && library.loaded) libraryMessage(editor?.isEdited() ? 'Saved settings and totals. Your stud edits stay in this browser and are not in the Cloud Library.' : 'Saved to your Cloud Library.');
  } catch (e) {
    if (epoch === library.epoch) libraryMessage(cloudMessage(e), true);
  } finally {
    if (epoch === library.epoch) $('cloudSave').disabled = false;
  }
}

async function deleteSaved(mosaic) {
  if (library.confirming !== mosaic.id) return;
  const epoch = library.epoch;
  library.confirming = null;
  libraryMessage('Deleting…');
  try {
    await cloud.remove(mosaic.id);
    if (epoch !== library.epoch) return;
    library.items = library.items.filter((m) => m.id !== mosaic.id);
    renderLibrary();
    libraryMessage('Deleted.');
  } catch (e) {
    if (epoch === library.epoch) { renderLibrary(); libraryMessage(cloudMessage(e), true); }
  }
}

function selectIfKnown(id, value) {
  const known = [...$(id).options].some((o) => o.value === value);
  if (known) $(id).value = value;
  return known;
}

function applySaved(m) {
  // Cloud Library entries hold no finishing options. The remembered set selection stays available.
  state.extras = '';
  extras.load('');
  $('gridW').value = m.width;
  $('gridH').value = m.height;
  syncPreset();
  const known = [selectIfKnown('style', m.style), selectIfKnown('backing', m.backing), selectIfKnown('palette', m.palette), selectIfKnown('rarity', m.rarity)].every(Boolean);
  $('tolerance').value = String(m.tolerance);
  $('dither').checked = m.dither;
  $('legal').checked = m.legal;
  scheduleConvert(true);
  return known;
}

let openRequest = 0;
function openSaved(m) {
  const request = ++openRequest;
  const finish = () => {
    if (request !== openRequest) return;
    const known = applySaved(m);
    showTab('studio');
    const partial = known ? '' : ' Some saved options are not available here, so the current ones were kept.';
    if (m.sample) notify(`Rebuilt from the sample with the saved settings.${partial}`, false, 9000);
    else notify(`No image is stored with this mosaic, so it can't be fully recreated. Its settings were applied to the image open now.${partial}`, false, 12000);
  };
  const sample = SAMPLES.find((s) => s.id === m.sample);
  if (sample) loadSample(sample, finish); else finish();
}

async function restoreAccount() {
  if (!document.documentElement.classList.contains('unframed')) return; // Never restore a session inside a frame.
  if (!cloud.hasSessionHint()) { showAccount(null); return; }
  $('signInBtn').disabled = true;
  $('signInBtn').textContent = 'Restoring sign-in…';
  try {
    await cloud.prepare();
  } catch {
    showAccount(null);
    notify('StudCraft could not restore your sign-in. You can keep working as a guest.', true);
  }
}

async function runAi(mode) {
  const prompt = $('prompt');
  const text = prompt.value;
  $('aiNotice').textContent = '';
  const useImage = mode === 'image' || (mode === 'auto' && helpers.isImageRequest(text.trim()));
  try {
    const notice = useImage ? await coordinator.createImages(text, settings) : await coordinator.ask(text, settings, contextPrompt());
    if (notice === null) prompt.value = '';
    else if (notice !== 'ignored') $('aiNotice').textContent = notice;
  } catch (e) {
    $('aiNotice').textContent = redact(e instanceof UserError ? e.message : 'The AI request failed.', keys.values());
  }
}

/* ---------- wiring ---------- */
function wire() {
  for (const t of TABS) $(`tabbtn-${t}`).addEventListener('click', () => showTab(t));
  $('themeBtn').addEventListener('click', () => {
    const next = THEMES[(THEMES.indexOf($('themeBtn').dataset.theme) + 1) % THEMES.length];
    applyTheme(next);
    store.set('studcraft.theme', next);
  });

  const drop = $('drop');
  $('file').addEventListener('change', (e) => { const f = e.target.files?.[0]; e.target.value = ''; if (f) openFile(f); });
  for (const type of ['dragenter', 'dragover']) window.addEventListener(type, (e) => { e.preventDefault(); drop.classList.add('over'); });
  for (const type of ['dragleave', 'dragend']) window.addEventListener(type, (e) => { e.preventDefault(); if (!e.relatedTarget) drop.classList.remove('over'); });
  window.addEventListener('drop', (e) => {
    e.preventDefault();
    drop.classList.remove('over');
    const f = e.dataTransfer?.files?.[0];
    if (f) openFile(f);
  });

  $('samples').replaceChildren(...SAMPLES.map((s) => el('button', { type: 'button', 'data-sample': s.id, onclick: () => loadSample(s) },
    el('img', { src: `assets/sample-${s.id}.jpg`, alt: '', loading: 'lazy' }), el('span', { text: s.title }))));

  for (const id of ['style', 'backing', 'palette', 'rarity', 'dither', 'legal']) $(id).addEventListener('change', () => scheduleConvert(true));
  $('plateShow').addEventListener('change', (e) => extras?.setShow(e.target.checked));
  for (const id of ['tolerance', 'brightness', 'contrast', 'saturation']) $(id).addEventListener('input', () => scheduleConvert());
  for (const id of ['gridW', 'gridH']) {
    $(id).addEventListener('change', () => { $(id).value = readInt(id, 32); syncPreset(); scheduleConvert(true); });
  }
  $('sizePreset').addEventListener('change', (e) => {
    if (e.target.value === 'custom') return;
    const [w, h] = e.target.value.split('x');
    $('gridW').value = w;
    $('gridH').value = h;
    scheduleConvert(true);
  });
  $('fitBtn').addEventListener('click', () => {
    if (!state.source) { notify('Open an image first.', true); return; }
    const [w, h] = fitDimensions(state.source.width, state.source.height);
    $('gridW').value = w;
    $('gridH').value = h;
    syncPreset();
    scheduleConvert(true);
  });

  $('stepPrev').addEventListener('click', () => { state.step = Math.max(0, state.step - 1); renderStep(); });
  $('stepNext').addEventListener('click', () => { state.step = Math.min((state.result?.steps.length ?? 1) - 1, state.step + 1); renderStep(); });
  $('stepRange').addEventListener('input', (e) => { state.step = Number(e.target.value) - 1; renderStep(); });

  $('pngBtn').addEventListener('click', () => {
    if (!needResult()) return;
    $('mosaic').toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = el('a', { href: url, download: `studcraft_${state.result.width}x${state.result.height}.png` });
      document.body.append(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 10_000);
    }, 'image/png');
  });
  $('summaryBtn').addEventListener('click', async () => {
    if (!needResult()) return;
    copy(await callWorker('summary'), 'Build summary copied.');
  });

  for (const id of ['signInBtn', 'librarySignIn']) {
    $(id).addEventListener('click', signIn);
    // Loads the SDK just before the click, so browsers keep treating the sign-in window as user-initiated.
    for (const type of ['pointerenter', 'focus', 'touchstart']) $(id).addEventListener(type, () => { cloud.prepare().catch(() => {}); }, { passive: true });
  }
  $('signOutBtn').addEventListener('click', signOut);
  $('cloudSave').addEventListener('click', saveToLibrary);
  $('cloudRefresh').addEventListener('click', refreshLibrary);
  window.addEventListener('storage', (e) => {
    if (e.key === SESSION_HINT && e.newValue === '1') cloud.prepare().catch(() => {});
  });

  $('saveVault').addEventListener('click', saveVault);
  $('unlockVault').addEventListener('click', unlockVault);
  $('forgetKeys').addEventListener('click', forgetKeys);
  // Loads Google's script before the click, so browsers treat the consent window as user-initiated.
  for (const id of ['backupDrive', 'restoreDrive']) for (const type of ['pointerenter', 'focus', 'touchstart']) $(id).addEventListener(type, () => secure?.prepareDrive(), { passive: true });
  $('backupDrive').addEventListener('click', () => backupToDrive());
  $('restoreDrive').addEventListener('click', restoreFromDrive);
  $('backupReplace').addEventListener('click', () => backupToDrive(true));
  $('backupKeep').addEventListener('click', () => { clearStaleBackup(); backupMessage('Kept the backup in Google Drive. Nothing was uploaded.'); });
  $('confirmRestore').addEventListener('click', confirmRestore);
  $('cancelRestore').addEventListener('click', () => { clearPendingRestore(); backupMessage('Restore cancelled. Nothing was changed.'); });
  $('askBtn').addEventListener('click', () => runAi('auto'));
  $('createBtn').addEventListener('click', () => runAi('image'));
  $('clearChat').addEventListener('click', () => {
    if (coordinator.busy) return;
    coordinator.clear();
    for (const url of imageUrls) URL.revokeObjectURL(url);
    imageUrls.clear();
  });
  window.addEventListener('pagehide', () => { clearPendingRestore(); keys.clear(); clients.forgetModels(); enabled.clear(); });
  window.addEventListener('pageshow', (e) => {
    if (!e.persisted) return;
    for (const id of PROVIDER_IDS) { $(`enable-${id}`).checked = false; refreshKeyField(id); }
  });
}

/* ---------- encrypted Drive saves ---------- */
let secure = null;
let drafts = null;

function sourceJpeg() {
  if (!state.source) return Promise.resolve(null);
  const { argb, width, height } = state.source;
  const canvas = document.createElement('canvas');
  canvas.width = width; canvas.height = height;
  const ctx = canvas.getContext('2d');
  const image = ctx.createImageData(width, height);
  for (let i = 0, p = 0; i < argb.length; i++, p += 4) {
    image.data[p] = (argb[i] >> 16) & 255; image.data[p + 1] = (argb[i] >> 8) & 255; image.data[p + 2] = argb[i] & 255; image.data[p + 3] = 255;
  }
  ctx.putImageData(image, 0, 0);
  return new Promise((resolve) => { canvas.toBlob(resolve, 'image/jpeg', 0.85); });
}

async function secureSnapshot({ includeImage }) {
  if (!state.result || state.built !== state.requested) return null;
  const c = state.applied ?? readConfig();
  const sample = SAMPLES.find((x) => x.id === state.sampleId);
  const label = cleanText(sample?.title ?? state.name ?? 'Custom Photo', 80) || 'Custom Photo';
  let image = null;
  if (includeImage && !sample) {
    const blob = await sourceJpeg();
    if (blob && blob.size <= MAX_IMAGE_BYTES) image = { mime: 'image/jpeg', data: toB64(new Uint8Array(await blob.arrayBuffer())) };
  }
  const original = editor.originalGrid();
  return {
    title: cleanText($('cloudTitle').value, 100) || cleanText(`${label} ${state.result.width}x${state.result.height}`, 100),
    notes: cleanText($('cloudNotes').value, 1000),
    width: state.result.width, height: state.result.height,
    settings: { style: c.style, backing: c.backing, palette: c.palette, rarity: c.rarity, tolerance: c.tolerance, dither: c.dither, legal: c.legal, brightness: c.brightness, contrast: c.contrast, saturation: c.saturation, sampleId: sample?.id ?? null, sourceLabel: label, ...(c.extras ? { extras: c.extras } : {}) },
    grid: packGrid(state.result.grid), original: packGrid(original ?? state.result.grid), image,
  };
}

const idle = () => new Promise((resolve) => {
  const check = () => { if (!running && state.built === state.requested) resolve(); else setTimeout(check, 40); };
  check();
});

async function applySecureProject(p) {
  if (!await confirmDiscard()) return false;
  const known = (list, value) => state.catalog[list].some((x) => x.id === value);
  const s = p.settings;
  if (!known('styles', s.style) || !known('backings', s.backing) || !known('palettes', s.palette) || !known('rarities', s.rarity)) throw new Error('unknown settings');
  if (s.extras && !helpers.extrasValid(s.extras)) throw new Error('unknown extras');
  const size = p.meta.width * p.meta.height;
  const grid = p.grid ? unpackGrid(p.grid, size, state.colors) : null;
  const original = p.grid ? unpackGrid(p.original, size, state.colors) : null;
  if (p.grid && (!grid || !original)) throw new Error('unknown colors');
  const sample = SAMPLES.find((x) => x.id === s.sampleId);
  if (p.image) {
    const bytes = Uint8Array.from(atob(p.image.data), (x) => x.charCodeAt(0));
    validateImageBytes(bytes);
    const bitmap = await createImageBitmap(new Blob([bytes], { type: p.image.mime }));
    setSource(bitmap, bitmap.width, bitmap.height, s.sourceLabel || 'Restored image');
    bitmap.close();
  } else if (sample) {
    await new Promise((resolve) => { loadSample(sample, resolve); });
  }
  await idle();
  const config = { width: p.meta.width, height: p.meta.height, style: s.style, backing: s.backing, palette: s.palette, rarity: s.rarity, tolerance: s.tolerance, dither: s.dither, legal: s.legal, brightness: s.brightness, contrast: s.contrast, saturation: s.saturation };
  if (s.extras) config.extras = s.extras;
  state.extras = s.extras ?? '';
  extras.load(state.extras);
  writeConfig(config);
  $('cloudTitle').value = p.meta.title;
  $('cloudNotes').value = p.notes;
  if (grid) {
    state.applied = config;
    state.lastBuilt = { source: state.source, config };
    editor.load(p.meta.width, p.meta.height, config, original, grid);
    await applyEdited(grid, config);
  } else {
    scheduleConvert(true);
    await idle();
  }
  return true;
}

async function libraryForMove() {
  if (!library.user) throw new Error('signed out');
  const out = await cloud.list();
  if (!out) return [];
  const line = (text) => text.replace(/[\t\r\n]+/g, ' ').trim();
  return out.items.map((m) => ({
    sourceId: m.id,
    snapshot: {
      title: line(m.title), notes: m.notes, width: m.width, height: m.height, grid: null, original: null, image: null,
      settings: { style: m.style, backing: m.backing, palette: m.palette, rarity: m.rarity, tolerance: m.tolerance, dither: m.dither, legal: m.legal, brightness: 0, contrast: 1.08, saturation: 1.12, sampleId: m.sample, sourceLabel: line(m.sourceLabel) },
      library: m.details,
    },
  }));
}

async function main() {
  applyTheme(THEMES.includes(store.get('studcraft.theme')) ? store.get('studcraft.theme') : 'auto');
  wire();
  buildProviders();
  refreshVaultButtons();
  state.catalog = JSON.parse(await callWorker('catalog'));
  state.colors = colorMap([...state.catalog.colors, ...state.catalog.setColors]);
  fillSelect('style', state.catalog.styles);
  fillSelect('backing', state.catalog.backings);
  fillSelect('palette', state.catalog.palettes);
  fillSelect('rarity', state.catalog.rarities);
  $('rarity').value = 'PREFER_COMMON';
  $('sizePreset').replaceChildren(
    ...state.catalog.sizes.map((s) => el('option', { value: `${s.w}x${s.h}`, text: `${s.label} · ${s.tag}` })),
    el('option', { value: 'custom', text: 'Custom' }),
  );
  $('sizePreset').value = '32x32';
  syncLabels();
  renderExports();
  const best = await createBestKv();
  drafts = createDraftStore({ kv: best.kv, legacy: store });
  secure = createSecurePanel({
    host: $('securePanel'), el, kv: best.kv, durable: best.durable, prefs: store, notify,
    snapshot: secureSnapshot, applyProject: applySecureProject, library: libraryForMove,
    deleteOriginal: async (id) => { await cloud.remove(id); library.items = library.items.filter((m) => m.id !== id); renderLibrary(); },
  });
  if (!secure.configured) {
    $('backupUnconfigured').hidden = false;
    $('backupDrive').disabled = true;
    $('restoreDrive').disabled = true;
  }
  extras = createExtras({
    el, engine: helpers, store, colors: state.colors, catalog: state.catalog.colors,
    getSize: () => [readInt('gridW', 32), readInt('gridH', 32)],
    getSource: () => state.source, getResult: () => state.result, getStyle: () => $('style').value,
    apply: applyExtras, preview: previewExtras, useSize: useLargestSize,
  });
  $('setBannerFit').addEventListener('click', (e) => useLargestSize(Number(e.target.dataset.w), Number(e.target.dataset.h)));
  await setupEditor();
  document.documentElement.dataset.ready = 'true';
  loadSample(SAMPLES[0]);
  restoreAccount();
}

main().catch(() => notify('StudCraft could not start in this browser.', true));
