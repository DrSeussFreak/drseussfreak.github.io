// StudCraft web UI. All text from files, AI, or the engine is written with textContent.
import * as helpers from './engine.js';
import { PROVIDERS, PROVIDER_IDS, createClients, createCoordinator, createTransport } from './ai.js';
import { LIMITS, UserError, displayName, redact, validateImageBytes } from './security.js';
import { SCENE_LIMITS, paintScene } from './drawing.js';
import { KeyStore, MIN_PASSPHRASE, clearVault, decryptKeys, encryptKeys, readVault, writeVault } from './vault.js';
import { colorMap, drawMosaic, drawStep } from './render.js';

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
};
const vaultStorage = { getItem: (k) => localStore()?.getItem(k) ?? null, setItem: (k, v) => localStore()?.setItem(k, v), removeItem: (k) => localStore()?.removeItem(k) };
function localStore() { try { return window.localStorage; } catch { return null; } }

/* ---------- status ---------- */
let statusTimer;
function notify(message, isError = false) {
  const box = $('status');
  box.textContent = message;
  box.classList.toggle('error', isError);
  box.hidden = false;
  clearTimeout(statusTimer);
  statusTimer = setTimeout(() => { box.hidden = true; }, isError ? 9000 : 3500);
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
const state = { catalog: null, colors: new Map(), source: null, result: null, step: 0, name: '' };

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
const TABS = ['studio', 'parts', 'guide', 'export', 'ai'];
function showTab(name) {
  for (const t of TABS) {
    $(`tab-${t}`).hidden = t !== name;
    $(`tabbtn-${t}`).setAttribute('aria-selected', String(t === name));
  }
  if (name === 'guide') renderStep();
  window.scrollTo({ top: 0 });
}

/* ---------- image intake ---------- */
function fitDimensions(w, h) {
  const longest = Math.max(readInt('gridW', 32), readInt('gridH', 32));
  const even = (v) => Math.min(96, Math.max(16, Math.floor((v + 1) / 2) * 2));
  if (w >= h) return [longest, even(Math.round(longest * (h / w)))];
  return [even(Math.round(longest * (w / h))), longest];
}

function setSource(image, width, height, name) {
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
  state.source = { argb, width: w, height: h };
  clearTimeout(statusTimer);
  $('status').hidden = true;
  state.name = name;
  $('sourceName').textContent = name;
  const preview = $('sourceCanvas');
  const previewScale = Math.min(1, 480 / Math.max(w, h));
  preview.width = Math.round(w * previewScale);
  preview.height = Math.round(h * previewScale);
  preview.getContext('2d').drawImage(canvas, 0, 0, preview.width, preview.height);
  $('sourceCard').hidden = false;
  const [gw, gh] = fitDimensions(w, h);
  $('gridW').value = gw;
  $('gridH').value = gh;
  syncPreset();
  scheduleConvert(true);
}

async function loadBytes(bytes, name) {
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

function loadSample(sample) {
  const image = new Image();
  image.onload = () => setSource(image, image.naturalWidth, image.naturalHeight, sample.title);
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

function syncLabels() {
  const signed = (v) => `${v > 0 ? '+' : ''}${Math.round(v * 100)}%`;
  $('toleranceOut').textContent = String($('tolerance').value);
  $('brightnessOut').textContent = signed(Number($('brightness').value));
  $('contrastOut').textContent = `${Math.round(Number($('contrast').value) * 100)}%`;
  $('saturationOut').textContent = `${Math.round(Number($('saturation').value) * 100)}%`;
  const wall = $('style').value === 'STACKED_BRICK_WALL';
  $('backing').disabled = wall;
  const style = state.catalog?.styles.find((s) => s.id === $('style').value);
  const palette = state.catalog?.palettes.find((s) => s.id === $('palette').value);
  $('settingHint').textContent = [style?.description, palette?.description].filter(Boolean).join('. ');
}

/* ---------- conversion ---------- */
let timer;
let running = false;
let again = false;
function scheduleConvert(now = false) {
  syncLabels();
  clearTimeout(timer);
  timer = setTimeout(runConvert, now ? 0 : 140);
}

async function runConvert() {
  if (!state.source) return;
  if (running) { again = true; return; }
  running = true;
  $('busy').hidden = false;
  try {
    const copy = state.source.argb.slice();
    const json = await callWorker('convert', { argb: copy.buffer, width: state.source.width, height: state.source.height, config: readConfig() }, [copy.buffer]);
    state.result = JSON.parse(json);
    state.step = Math.min(state.step, Math.max(0, state.result.steps.length - 1));
    renderAll();
  } catch (e) {
    notify(e instanceof UserError ? e.message : 'StudCraft could not build that mosaic.', true);
  } finally {
    running = false;
    $('busy').hidden = true;
    if (again) { again = false; runConvert(); }
  }
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
    stat(money(r.pricing.pab), 'Pick a Brick est.'),
    stat(`${r.validation.score}%`, 'build score'),
  );
  $('costStats').replaceChildren(
    stat(money(r.pricing.pab), 'Pick a Brick'),
    stat(money(r.pricing.bl), 'BrickLink'),
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
    el('div', {}, el('span', { text: `${l.partName} (${l.part})` }), el('small', { text: `${l.colorName} · ${l.rarity}${l.alt ? ` · Swap: ${l.alt}` : ''}` })),
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

function renderExports() {
  const c = state.catalog;
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

  $('saveVault').addEventListener('click', saveVault);
  $('unlockVault').addEventListener('click', unlockVault);
  $('forgetKeys').addEventListener('click', forgetKeys);
  $('askBtn').addEventListener('click', () => runAi('auto'));
  $('createBtn').addEventListener('click', () => runAi('image'));
  $('clearChat').addEventListener('click', () => {
    if (coordinator.busy) return;
    coordinator.clear();
    for (const url of imageUrls) URL.revokeObjectURL(url);
    imageUrls.clear();
  });
  window.addEventListener('pagehide', () => { keys.clear(); clients.forgetModels(); enabled.clear(); });
  window.addEventListener('pageshow', (e) => {
    if (!e.persisted) return;
    for (const id of PROVIDER_IDS) { $(`enable-${id}`).checked = false; refreshKeyField(id); }
  });
}

async function main() {
  applyTheme(THEMES.includes(store.get('studcraft.theme')) ? store.get('studcraft.theme') : 'auto');
  wire();
  buildProviders();
  refreshVaultButtons();
  state.catalog = JSON.parse(await callWorker('catalog'));
  state.colors = colorMap(state.catalog.colors);
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
  document.documentElement.dataset.ready = 'true';
  loadSample(SAMPLES[0]);
}

main().catch(() => notify('StudCraft could not start in this browser.', true));
