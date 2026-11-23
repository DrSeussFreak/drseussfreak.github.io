// Edge buffer, sharpen, and Build from Sets controls. The shared Kotlin engine does all of the real work.
import setData from './set-data.js';
import { drawMosaic } from './render.js';

export const CREDIT = 'Set inventory data derived from the Rebrickable database (rebrickable.com). LEGO is a trademark of the LEGO Group, which does not sponsor or endorse this app.';
const KEY = 'studcraft.sets';
const blank = () => ({ mode: 'B', top: 0, right: 0, bottom: 0, left: 0, color: 1, fit: 'F', sets: {}, on: false, spares: false, stud: 'PREFER_ROUND', sharpen: 0, clarity: 0, separate: false });

export function encodeExtras(x) {
  const out = [];
  if (x.top || x.right || x.bottom || x.left) out.push(`e=${x.mode},${x.top},${x.right},${x.bottom},${x.left},${x.color},${x.fit}`);
  if (x.on) out.push('o=1');
  const nums = Object.keys(x.sets).sort();
  if (nums.length) out.push(`s=${nums.map((n) => `${n}:${x.sets[n]}`).join('+')}`);
  if (x.spares) out.push('p=1');
  if (x.stud !== 'PREFER_ROUND') out.push(`t=${x.stud}`);
  if (x.sharpen) out.push(`h=${x.sharpen}`);
  if (x.clarity) out.push(`c=${x.clarity}`);
  return out.join(';');
}

export function decodeExtras(text) {
  const x = blank();
  for (const part of String(text ?? '').split(';')) {
    const value = part.slice(2);
    if (part[0] === 'e') {
      const f = value.split(',');
      Object.assign(x, { mode: f[0], top: +f[1], right: +f[2], bottom: +f[3], left: +f[4], color: +f[5], fit: f[6] });
      x.separate = !(x.top === x.right && x.right === x.bottom && x.bottom === x.left);
    } else if (part[0] === 'o') x.on = true;
    else if (part[0] === 's') for (const item of value.split('+')) { const at = item.lastIndexOf(':'); x.sets[item.slice(0, at)] = +item.slice(at + 1); }
    else if (part[0] === 'p') x.spares = true;
    else if (part[0] === 't') x.stud = value;
    else if (part[0] === 'h') x.sharpen = +value;
    else if (part[0] === 'c') x.clarity = +value;
  }
  return x;
}

export function createExtras({ el, engine, store, colors, catalog, getSize, getSource, getResult, getStyle, apply, preview, useSize }) {
  const $ = (id) => document.getElementById(id);
  engine.loadSets(setData);
  const list = JSON.parse(engine.setListJson());
  const x = blank();
  try {
    const saved = decodeExtras(store.get(KEY) ?? '');
    const known = new Set(list.sets.map((s) => s.num));
    for (const [num, qty] of Object.entries(saved.sets)) if (known.has(num) && Number.isInteger(qty) && qty >= 1 && qty <= 99) x.sets[num] = qty;
    x.spares = saved.spares;
    if (list.styles.some((s) => s.id === saved.stud)) x.stud = saved.stud;
  } catch { /* a damaged saved selection is ignored */ }

  let timer = 0;
  const text = () => encodeExtras(x);
  const remember = () => store.set(KEY, encodeExtras({ ...blank(), sets: x.sets, spares: x.spares, stud: x.stud }));
  const commit = (delay = 160) => {
    remember();
    renderSummary();
    clearTimeout(timer);
    timer = setTimeout(() => apply(text()), delay);
  };
  const clampMargin = (v) => Math.min(40, Math.max(0, Number.parseInt(v, 10) || 0));
  const hasEdge = () => x.top || x.right || x.bottom || x.left;

  function renderSummary() {
    const bits = [];
    if (hasEdge()) bits.push(`${x.mode === 'B' ? 'Border' : 'Reduced image'} ${x.top}/${x.right}/${x.bottom}/${x.left} studs`);
    if (x.sharpen || x.clarity) bits.push(`Sharpen ${x.sharpen}, clarity ${x.clarity}`);
    const count = Object.values(x.sets).reduce((a, b) => a + b, 0);
    if (x.on && count) bits.push(`Building from ${count} set${count === 1 ? '' : 's'}`);
    $('xSummary').textContent = bits.length ? bits.join(' · ') : 'No edge buffer, no sharpening, using any parts.';
  }

  function renderEdge() {
    for (const b of document.querySelectorAll('[data-xmode]')) b.setAttribute('aria-pressed', String(b.dataset.xmode === x.mode));
    const wall = getStyle() === 'STACKED_BRICK_WALL';
    $('xModeHint').textContent = x.mode === 'B'
      ? 'Keeps the overall size and fills the margin with one brick color.'
      : wall ? 'A brick wall needs every stud to stand, so this style uses a border instead.' : 'Keeps the overall size and leaves the margin unplaced, so the black backing shows. No parts are used there.';
    $('xAll').value = String(Math.max(x.top, x.right, x.bottom, x.left));
    $('xSeparate').checked = x.separate;
    $('xSides').hidden = !x.separate;
    $('xAll').disabled = x.separate;
    for (const [id, k] of [['xTop', 'top'], ['xRight', 'right'], ['xBottom', 'bottom'], ['xLeft', 'left']]) $(id).value = String(x[k]);
    $('xFit').value = x.fit;
    $('xColorWrap').hidden = x.mode !== 'B' && !wall;
    const c = colors.get(x.color);
    $('xColorName').textContent = c ? c.blName : '';
    renderBorderColors();
  }

  function renderBorderColors() {
    let ids = catalog.map((c) => c.id);
    let left = null;
    if (x.on && Object.keys(x.sets).length) {
      const pool = JSON.parse(engine.poolJson(encodeExtras({ ...x, top: 0, right: 0, bottom: 0, left: 0 }), ...getSize(), ...sourceSize()));
      left = new Map(pool.colors.map((p) => [p.id, p.qty]));
      ids = pool.colors.map((p) => p.id);
    }
    $('xColors').replaceChildren(...ids.map((id) => {
      const c = colors.get(id);
      const face = el('canvas', { width: '26', height: '26', 'aria-hidden': 'true' });
      const g = face.getContext('2d');
      g.fillStyle = `rgb(${c.r},${c.g},${c.b})`;
      g.fillRect(0, 0, 26, 26);
      const label = `${c.blName}, BrickLink ${c.id}${left ? `, ${left.get(id)} in your sets` : ''}`;
      return el('button', { type: 'button', class: `ed-swatch${id === x.color ? ' on' : ''}`, title: label, 'aria-label': label, 'aria-pressed': String(id === x.color), 'data-xcolor': String(id), onclick: () => { x.color = id; renderEdge(); if (hasEdge()) commit(0); } },
        face, left ? el('small', { text: String(left.get(id)) }) : null);
    }));
  }

  const sourceSize = () => { const s = getSource(); return s ? [s.width, s.height] : [1, 1]; };

  function renderPool() {
    const count = Object.values(x.sets).reduce((a, b) => a + b, 0);
    $('xSetsOn').checked = x.on;
    $('xSpares').checked = x.spares;
    $('xStud').value = x.stud;
    $('xSelected').textContent = `${Object.keys(x.sets).length} sets, ${count} total`;
    const [w, h] = getSize();
    const pool = JSON.parse(engine.poolJson(text(), w, h, ...sourceSize()));
    const stat = (v, l) => el('div', { class: 'stat' }, el('b', { text: v }), el('span', { text: l }));
    $('xPoolSummary').replaceChildren(stat(Number(pool.capacity).toLocaleString('en-US'), 'usable 1x1 pieces'), stat(String(pool.colors.length), 'colors'), stat(`${w}×${h}`, 'current size'));
    const showFit = !pool.fits && count > 0 && pool.fitW > 0;
    $('xFitBtn').hidden = !showFit;
    if (showFit) { $('xFitBtn').textContent = `Use largest size: ${pool.fitW}×${pool.fitH}`; $('xFitBtn').dataset.w = pool.fitW; $('xFitBtn').dataset.h = pool.fitH; }
    $('xPoolHint').textContent = !count ? 'Choose one or more sets.' : pool.message ?? (pool.fitW === 0 ? 'These sets can’t fill even a 16×16 mosaic.' : `Fits ${w}×${h}. The largest at this shape is ${pool.fitW}×${pool.fitH}.`);
  }

  function renderSets() {
    const q = $('xSearch').value.trim().toLowerCase();
    const cat = $('xCategory').value;
    const showAll = $('xShowAll').checked;
    const rows = list.sets.filter((s) => (showAll || !s.lowYield || x.sets[s.num]) && (!cat || s.category === cat) && (!q || s.number.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)));
    $('xSetList').replaceChildren(...rows.map((s) => {
      const qty = x.sets[s.num] ?? 0;
      const step = (d) => {
        const next = Math.min(99, Math.max(0, (x.sets[s.num] ?? 0) + d));
        if (next) x.sets[s.num] = next; else delete x.sets[s.num];
        if (d > 0 && !x.on) x.on = true;
        if (!Object.keys(x.sets).length) x.on = false;
        renderSets(); renderPool(); renderEdge();
        commit(350);
      };
      return el('div', { class: `x-set${qty ? ' on' : ''}`, 'data-set': s.number },
        el('div', {}, el('strong', { text: `${s.number} ${s.name}` }), el('small', { text: `${s.category} · ${s.year} · ${s.studs.toLocaleString('en-US')} 1x1 pieces${s.lowYield ? ' · few 1x1' : ''}` })),
        el('div', { class: 'x-step' },
          el('button', { class: 'btn ghost', type: 'button', text: '−', 'aria-label': `Remove one ${s.number}`, onclick: () => step(-1) }),
          el('output', { text: String(qty), 'aria-label': `Quantity of ${s.number}` }),
          el('button', { class: 'btn ghost', type: 'button', text: '+', 'aria-label': `Add one ${s.number}`, onclick: () => step(1) })));
    }));
  }

  function renderSharpen() {
    $('xSharpen').value = String(x.sharpen);
    $('xClarity').value = String(x.clarity);
    $('xSharpenOut').textContent = x.sharpen ? String(x.sharpen) : 'Off';
    $('xClarityOut').textContent = x.clarity ? String(x.clarity) : 'Off';
  }

  function showTab(name) {
    for (const t of ['buffer', 'sharpen', 'sets']) {
      $(`xPanel-${t}`).hidden = t !== name;
      $(`xTab-${t}`).setAttribute('aria-selected', String(t === name));
    }
    if (name !== 'sharpen') { $('xCompare').checked = false; $('xBefore').hidden = true; }
  }

  function renderAll() { renderSummary(); renderEdge(); renderPool(); renderSets(); renderSharpen(); drawPreview(); }

  function drawPreview() {
    const r = getResult();
    if (r && $('xDialog').open) drawMosaic($('xPreview'), r, colors);
    if ($('xCompare').checked) refreshBefore();
  }

  let beforeCall = 0;
  async function refreshBefore() {
    const call = ++beforeCall;
    const out = await preview(encodeExtras({ ...x, sharpen: 0, clarity: 0 })).catch(() => null);
    if (call !== beforeCall || !out || out.shortage || !$('xCompare').checked) return;
    drawMosaic($('xBefore'), out, colors);
    $('xBefore').hidden = false;
  }

  function open(tab = 'buffer') { showTab(tab); if (!$('xDialog').open) $('xDialog').showModal(); renderAll(); }

  for (const t of ['buffer', 'sharpen', 'sets']) $(`xTab-${t}`).addEventListener('click', () => showTab(t));
  $('xOpenBuffer').addEventListener('click', () => open('buffer'));
  $('xOpenSharpen').addEventListener('click', () => open('sharpen'));
  $('xOpenSets').addEventListener('click', () => open('sets'));
  $('setBannerOpen').addEventListener('click', () => open('sets'));
  $('xClose').addEventListener('click', () => $('xDialog').close());
  for (const b of document.querySelectorAll('[data-xmode]')) b.addEventListener('click', () => { x.mode = b.dataset.xmode; renderEdge(); if (hasEdge()) commit(0); });
  $('xAll').addEventListener('input', () => { const v = clampMargin($('xAll').value); Object.assign(x, { top: v, right: v, bottom: v, left: v }); for (const id of ['xTop', 'xRight', 'xBottom', 'xLeft']) $(id).value = String(v); commit(); });
  $('xSeparate').addEventListener('change', (e) => { x.separate = e.target.checked; if (!x.separate) { const v = Math.max(x.top, x.right, x.bottom, x.left); Object.assign(x, { top: v, right: v, bottom: v, left: v }); commit(0); } renderEdge(); });
  for (const [id, k] of [['xTop', 'top'], ['xRight', 'right'], ['xBottom', 'bottom'], ['xLeft', 'left']]) $(id).addEventListener('input', () => { x[k] = clampMargin($(id).value); commit(); });
  $('xFit').addEventListener('change', (e) => { x.fit = e.target.value; if (hasEdge()) commit(0); });
  $('xResetEdge').addEventListener('click', () => { Object.assign(x, { mode: 'B', top: 0, right: 0, bottom: 0, left: 0, fit: 'F', separate: false }); renderEdge(); commit(0); });
  $('xSharpen').addEventListener('input', (e) => { x.sharpen = Number(e.target.value); renderSharpen(); commit(220); });
  $('xClarity').addEventListener('input', (e) => { x.clarity = Number(e.target.value); renderSharpen(); commit(220); });
  $('xResetSharpen').addEventListener('click', () => { x.sharpen = 0; x.clarity = 0; renderSharpen(); commit(0); });
  $('xAuto').addEventListener('click', () => {
    const s = getSource();
    if (!s) return;
    const [w, h] = getSize();
    x.sharpen = engine.autoSharpen(s.argb, s.width, s.height, Math.max(w, h));
    renderSharpen();
    $('xNotice').textContent = x.sharpen ? `Auto sharpen chose ${x.sharpen}.` : 'This image is flat, so it needs no sharpening.';
    commit(0);
  });
  $('xCompare').addEventListener('change', (e) => { if (e.target.checked) refreshBefore(); else { beforeCall++; $('xBefore').hidden = true; } });
  $('xSetsOn').addEventListener('change', (e) => { x.on = e.target.checked && Object.keys(x.sets).length > 0; e.target.checked = x.on; renderPool(); renderEdge(); commit(0); });
  $('xSpares').addEventListener('change', (e) => { x.spares = e.target.checked; renderPool(); renderEdge(); commit(0); });
  $('xStud').replaceChildren(...list.styles.map((s) => el('option', { value: s.id, text: `${s.title}: ${s.detail}` })));
  $('xStud').addEventListener('change', (e) => { x.stud = e.target.value; renderPool(); renderEdge(); commit(0); });
  $('xCategory').replaceChildren(el('option', { value: '', text: 'All categories' }), ...list.categories.map((c) => el('option', { value: c.name, text: c.name })));
  for (const id of ['xSearch', 'xCategory', 'xShowAll']) $(id).addEventListener(id === 'xSearch' ? 'input' : 'change', renderSets);
  $('xClear').addEventListener('click', () => { for (const k of Object.keys(x.sets)) delete x.sets[k]; x.on = false; renderSets(); renderPool(); renderEdge(); commit(0); });
  $('xFitBtn').addEventListener('click', () => useSize(Number($('xFitBtn').dataset.w), Number($('xFitBtn').dataset.h)));
  for (const node of document.querySelectorAll('[data-credit]')) node.textContent = CREDIT;
  renderSummary();

  return {
    open,
    text,
    /** Shows saved extras. The set selection on this device is replaced only when the project has one. */
    load(saved) {
      const next = decodeExtras(saved);
      const keepSets = Object.keys(next.sets).length ? next.sets : x.sets;
      const spares = Object.keys(next.sets).length ? next.spares : x.spares;
      Object.assign(x, next, { sets: { ...keepSets }, spares });
      renderSummary();
      if ($('xDialog').open) renderAll();
    },
    refresh() { if ($('xDialog').open) { renderPool(); drawPreview(); } renderSummary(); },
    cancelPending() { clearTimeout(timer); },
  };
}
