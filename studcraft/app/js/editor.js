// Stud editor. Grid changes run through the shared Kotlin edit session; this file handles input and drawing only.
const TOOLS = { b: 'brush', e: 'erase', f: 'fill', i: 'pick', r: 'replace', s: 'rect', h: 'pan' };
const MIRRORS = ['NONE', 'HORIZONTAL', 'VERTICAL', 'BOTH'];
const MAX_ZOOM = 16;

/** Run-length text for a grid of catalog color IDs. */
export function packGrid(grid) {
  const out = [];
  for (let i = 0; i < grid.length;) {
    let n = 1;
    while (i + n < grid.length && grid[i + n] === grid[i]) n++;
    out.push(`${grid[i].toString(36)}*${n.toString(36)}`);
    i += n;
  }
  return out.join(',');
}

export function unpackGrid(text, size, known) {
  if (typeof text !== 'string' || text.length > 400000) return null;
  const out = new Int32Array(size);
  let at = 0;
  for (const part of text.split(',')) {
    const m = /^([0-9a-z]{1,4})\*([0-9a-z]{1,4})$/.exec(part);
    if (!m) return null;
    const id = parseInt(m[1], 36);
    const n = parseInt(m[2], 36);
    if (!known.has(id) || n < 1 || at + n > size) return null;
    out.fill(id, at, at + n);
    at += n;
  }
  return at === size ? out : null;
}

/** Validates a decrypted draft as untrusted input. */
export function readDraft(d, known) {
  try {
    if (!d || d.v !== 1 || !Number.isInteger(d.w) || !Number.isInteger(d.h) || d.w < 16 || d.w > 96 || d.h < 16 || d.h > 96 || typeof d.config !== 'object' || d.config === null) return null;
    const grid = unpackGrid(d.grid, d.w * d.h, known);
    const original = unpackGrid(d.original, d.w * d.h, known);
    const project = typeof d.project === 'string' && /^[0-9a-f]{32}$/.test(d.project) ? d.project : null;
    return grid && original ? { w: d.w, h: d.h, config: d.config, grid, original, at: Number(d.at) || 0, project } : null;
  } catch { return null; }
}

export function createEditor({ engine, el, drafts, draftProject = () => null, draftLocked = () => false, onEdited = () => {}, colors, catalog, palettes, rebuild, onTweak, onResetImage, onAdjust, onExtras = () => {}, sliders, notify, onClose }) {
  const $ = (id) => document.getElementById(id);
  const canvas = $('edCanvas');
  const ctx = canvas.getContext('2d');
  const s = {
    open: false, w: 0, h: 0, config: null, tool: 'brush', size: 1, mirror: 'NONE', grid: true, color: catalog[0].id,
    zoom: 1, panX: 0, panY: 0, hover: null, rect: null, recent: [], cells: null, original: null, dirty: false, timer: 0, pending: null, frame: 0,
    limited: null, locked: null,
  };
  const pointers = new Map();
  let gesture = null;

  const flags = () => engine.editFlags();
  const isEdited = () => s.cells !== null && flags()[2] === 1;

  function metrics() {
    const dpr = window.devicePixelRatio || 1;
    const rail = 22 * dpr;
    const cell = Math.min((canvas.width - rail - 8) / s.w, (canvas.height - rail - 8) / s.h) * s.zoom;
    return { dpr, rail, cell, x: rail + (canvas.width - rail - cell * s.w) / 2 + s.panX, y: rail + (canvas.height - rail - cell * s.h) / 2 + s.panY };
  }

  function studAt(e) {
    const box = canvas.getBoundingClientRect();
    const m = metrics();
    const px = (e.clientX - box.left) * (canvas.width / box.width);
    const py = (e.clientY - box.top) * (canvas.height / box.height);
    const x = Math.floor((px - m.x) / m.cell);
    const y = Math.floor((py - m.y) / m.cell);
    return { x, y, px, py, inside: x >= 0 && y >= 0 && x < s.w && y < s.h };
  }

  function draw() {
    s.frame = 0;
    if (!s.open) return;
    const m = metrics();
    ctx.fillStyle = '#14181f';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const x0 = Math.max(0, Math.floor(-m.x / m.cell));
    const x1 = Math.min(s.w - 1, Math.floor((canvas.width - m.x) / m.cell));
    const y0 = Math.max(0, Math.floor(-m.y / m.cell));
    const y1 = Math.min(s.h - 1, Math.floor((canvas.height - m.y) / m.cell));
    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1;) {
        const at = (cx) => (s.locked?.[y * s.w + cx] ? -1 : s.cells[y * s.w + cx]);
        const id = at(x);
        let run = 1;
        while (x + run <= x1 && at(x + run) === id) run++;
        const c = id < 0 ? { r: 34, g: 38, b: 46 } : colors.get(id);
        ctx.fillStyle = `rgb(${c.r},${c.g},${c.b})`;
        ctx.fillRect(m.x + x * m.cell, m.y + y * m.cell, run * m.cell + 0.5, m.cell + 0.5);
        x += run;
      }
    }
    const vline = (x, a, b) => { ctx.beginPath(); ctx.moveTo(m.x + x * m.cell, m.y + a * m.cell); ctx.lineTo(m.x + x * m.cell, m.y + b * m.cell); ctx.stroke(); };
    const hline = (y, a, b) => { ctx.beginPath(); ctx.moveTo(m.x + a * m.cell, m.y + y * m.cell); ctx.lineTo(m.x + b * m.cell, m.y + y * m.cell); ctx.stroke(); };
    if (s.grid && m.cell >= 5) {
      ctx.strokeStyle = 'rgba(0,0,0,.28)';
      ctx.lineWidth = 1;
      for (let x = x0; x <= x1 + 1; x++) vline(x, y0, y1 + 1);
      for (let y = y0; y <= y1 + 1; y++) hline(y, x0, x1 + 1);
    }
    ctx.strokeStyle = 'rgba(255,212,0,.85)';
    ctx.lineWidth = 1.5 * m.dpr;
    for (let x = 0; x <= s.w; x += 16) vline(x, 0, s.h);
    for (let y = 0; y <= s.h; y += 16) hline(y, 0, s.w);
    ctx.strokeStyle = '#60a5fa';
    if (s.mirror === 'HORIZONTAL' || s.mirror === 'BOTH') vline(s.w / 2, 0, s.h);
    if (s.mirror === 'VERTICAL' || s.mirror === 'BOTH') hline(s.h / 2, 0, s.w);
    if (s.rect) {
      const l = Math.min(s.rect.x0, s.rect.x1), t = Math.min(s.rect.y0, s.rect.y1);
      const rw = Math.abs(s.rect.x1 - s.rect.x0) + 1, rh = Math.abs(s.rect.y1 - s.rect.y0) + 1;
      const c = colors.get(s.color);
      ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},.6)`;
      ctx.fillRect(m.x + l * m.cell, m.y + t * m.cell, rw * m.cell, rh * m.cell);
      ctx.strokeStyle = '#fff';
      ctx.strokeRect(m.x + l * m.cell, m.y + t * m.cell, rw * m.cell, rh * m.cell);
    }
    if (s.hover) {
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1.5 * m.dpr;
      ctx.strokeRect(m.x + s.hover.x * m.cell, m.y + s.hover.y * m.cell, m.cell, m.cell);
    }
    ctx.fillStyle = '#14181f';
    ctx.fillRect(0, 0, canvas.width, m.rail);
    ctx.fillRect(0, 0, m.rail, canvas.height);
    ctx.fillStyle = '#d1d5db';
    ctx.font = `${9 * m.dpr}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const every = m.cell >= 22 * m.dpr ? 1 : m.cell >= 10 * m.dpr ? 4 : 8;
    for (let x = x0; x <= x1; x++) if (x === 0 || (x + 1) % every === 0) { const p = m.x + (x + 0.5) * m.cell; if (p > m.rail) ctx.fillText(String(x + 1), p, m.rail / 2); }
    for (let y = y0; y <= y1; y++) if (y === 0 || (y + 1) % every === 0) { const p = m.y + (y + 0.5) * m.cell; if (p > m.rail) ctx.fillText(String(y + 1), m.rail / 2, p); }
  }
  const paint = () => { if (!s.frame) s.frame = requestAnimationFrame(draw); };

  function resize() {
    if (!s.open) return;
    const box = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const w = Math.max(1, Math.round(box.width * dpr));
    const h = Math.max(1, Math.round(box.height * dpr));
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
    draw();
  }

  function swatch(id, count) {
    const c = colors.get(id);
    const face = el('canvas', { width: '26', height: '26', 'aria-hidden': 'true' });
    const g = face.getContext('2d');
    g.fillStyle = `rgb(${c.r},${c.g},${c.b})`;
    g.fillRect(0, 0, 26, 26);
    const left = s.limited ? Math.max(0, engine.editRemaining(id)) : null;
    const label = `${c.blName}, BrickLink ${c.id}${count ? `, ${count} studs` : ''}${left === null ? '' : `, ${left} left`}`;
    if (left !== null && !count) count = left;
    return el('button', { type: 'button', class: `ed-swatch${id === s.color ? ' on' : ''}${left === 0 ? ' out' : ''}`, title: label, 'aria-label': label, 'aria-pressed': String(id === s.color), 'data-color': String(id), onclick: () => choose(id) },
      face, count ? el('small', { text: String(count) }) : null);
  }

  function renderColors() {
    const query = $('edSearch').value.trim().toLowerCase();
    const ids = s.limited
      ? s.limited.filter((id) => { const c = colors.get(id); return !query || c.name.toLowerCase().includes(query) || c.blName.toLowerCase().includes(query) || String(id) === query; })
      : Array.from(engine.searchColors($('edSearch').value, $('edPalette').value, $('edTier').value));
    $('edCatalogCount').textContent = String(ids.length);
    $('edCatalog').replaceChildren(...ids.map((id) => swatch(id)));
    $('edRecent').replaceChildren(...s.recent.map((id) => swatch(id)));
    $('edRecentWrap').hidden = s.recent.length === 0;
    renderUsed();
    const c = colors.get(s.color);
    $('edCurrent').textContent = `${c.blName} · BrickLink ${c.id} · LDraw ${c.ldraw}`;
  }

  function renderUsed() {
    const counts = new Map();
    s.cells.forEach((id, i) => { if (!s.locked?.[i]) counts.set(id, (counts.get(id) ?? 0) + 1); });
    $('edUsed').replaceChildren(...[...counts.entries()].sort((a, b) => b[1] - a[1]).map(([id, n]) => swatch(id, n)));
  }

  function choose(id) {
    s.color = id;
    s.recent = [id, ...s.recent.filter((x) => x !== id)].slice(0, 10);
    renderColors();
    paint();
  }

  function renderTools() {
    for (const b of document.querySelectorAll('[data-tool]')) b.setAttribute('aria-pressed', String(b.dataset.tool === s.tool));
    for (const b of document.querySelectorAll('[data-mirror]')) b.setAttribute('aria-pressed', String(b.dataset.mirror === s.mirror));
    $('edSize').value = String(s.size);
    $('edSizeOut').textContent = `${s.size} × ${s.size}`;
    $('edGrid').checked = s.grid;
    const f = s.cells ? flags() : [0, 0, 0, 0];
    $('edUndo').disabled = f[0] !== 1;
    $('edRedo').disabled = f[1] !== 1;
    $('edRevert').disabled = f[2] !== 1;
    $('edEdited').textContent = `${f[3]} edited`;
    canvas.dataset.activeTool = s.tool;
  }

  function status() {
    $('edCoord').textContent = s.hover ? `Column ${s.hover.x + 1}, row ${s.hover.y + 1}` : `${s.w} × ${s.h} studs`;
  }

  function saveDraft() {
    // An offered draft stays until the person restores or discards it, even if they open another image.
    if (draftLocked()) return;
    if (!isEdited()) { drafts.clear(); return; }
    drafts.save({ v: 1, w: s.w, h: s.h, config: s.config, grid: packGrid(s.cells), original: packGrid(s.original), at: Date.now(), project: draftProject() });
  }

  async function pushNow() {
    clearTimeout(s.timer);
    s.timer = 0;
    if (!s.dirty) return s.pending;
    s.dirty = false;
    const grid = s.cells.slice();
    const job = (s.pending ?? Promise.resolve()).catch(() => {}).then(() => rebuild(grid, s.config, isEdited()));
    s.pending = job;
    return job;
  }

  function warnRefused() {
    const n = engine.editRefused();
    if (n > 0) notify(`Your sets ran out of ${colors.get(s.color).blName}. ${n} stud${n === 1 ? ' was' : 's were'} left unchanged.`, true);
  }

  function changed() {
    warnRefused();
    s.cells = Int32Array.from(engine.editGrid());
    s.dirty = true;
    renderTools();
    if (s.limited && s.open) renderColors(); else renderUsed();
    paint();
    saveDraft();
    onEdited();
    clearTimeout(s.timer);
    s.timer = setTimeout(pushNow, 160);
  }

  const paintColor = () => (s.tool === 'erase' ? -1 : s.color);

  function pointerDown(e) {
    canvas.setPointerCapture?.(e.pointerId);
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    e.preventDefault();
    if (pointers.size >= 2) {
      if (gesture?.kind === 'paint') { if (engine.editEnd()) { engine.editUndo(); s.cells = Int32Array.from(engine.editGrid()); } }
      s.rect = null;
      const [a, b] = [...pointers.values()];
      gesture = { kind: 'pinch', dist: Math.hypot(a.x - b.x, a.y - b.y), mx: (a.x + b.x) / 2, my: (a.y + b.y) / 2 };
      paint();
      return;
    }
    if (e.button === 1 || e.button === 2 || s.tool === 'pan') { gesture = { kind: 'pan', x: e.clientX, y: e.clientY }; return; }
    const at = studAt(e);
    if (s.tool === 'brush' || s.tool === 'erase') {
      engine.editBegin();
      if (at.inside) engine.editLine(at.x, at.y, at.x, at.y, paintColor(), s.size, s.mirror);
      gesture = { kind: 'paint', last: at.inside ? at : null };
      s.cells = Int32Array.from(engine.editGrid());
      paint();
    } else if (s.tool === 'rect') {
      if (at.inside) s.rect = { x0: at.x, y0: at.y, x1: at.x, y1: at.y };
      gesture = { kind: 'rect' };
      paint();
    } else {
      gesture = { kind: 'tap', at };
    }
  }

  function pointerMove(e) {
    if (pointers.has(e.pointerId)) pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const at = studAt(e);
    const nextHover = at.inside ? { x: at.x, y: at.y } : null;
    if (nextHover?.x !== s.hover?.x || nextHover?.y !== s.hover?.y) { s.hover = nextHover; status(); paint(); }
    if (!gesture) return;
    e.preventDefault();
    const dpr = window.devicePixelRatio || 1;
    if (gesture.kind === 'pinch' && pointers.size >= 2) {
      const [a, b] = [...pointers.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
      zoomAt(dist / (gesture.dist || 1), mx, my);
      s.panX += (mx - gesture.mx) * dpr;
      s.panY += (my - gesture.my) * dpr;
      Object.assign(gesture, { dist, mx, my });
      paint();
    } else if (gesture.kind === 'pan') {
      s.panX += (e.clientX - gesture.x) * dpr;
      s.panY += (e.clientY - gesture.y) * dpr;
      gesture.x = e.clientX;
      gesture.y = e.clientY;
      paint();
    } else if (gesture.kind === 'paint' && at.inside) {
      const from = gesture.last ?? at;
      if (from.x !== at.x || from.y !== at.y || !gesture.last) {
        engine.editLine(from.x, from.y, at.x, at.y, paintColor(), s.size, s.mirror);
        gesture.last = at;
        s.cells = Int32Array.from(engine.editGrid());
        paint();
      }
    } else if (gesture.kind === 'rect' && s.rect && at.inside) {
      s.rect.x1 = at.x;
      s.rect.y1 = at.y;
      paint();
    }
  }

  function pointerUp(e) {
    pointers.delete(e.pointerId);
    const g = gesture;
    if (pointers.size > 0) return;
    gesture = null;
    if (!g) return;
    if (e.type === 'pointercancel') {
      if (g.kind === 'paint' && engine.editEnd()) { engine.editUndo(); s.cells = Int32Array.from(engine.editGrid()); renderTools(); }
      s.rect = null;
      paint();
      return;
    }
    if (g.kind === 'paint') { if (engine.editEnd()) changed(); } else if (g.kind === 'rect' && s.rect) {
      const r = s.rect;
      s.rect = null;
      if (engine.editRect(r.x0, r.y0, r.x1, r.y1, s.color, s.mirror)) changed(); else { warnRefused(); paint(); }
    } else if (g.kind === 'tap' && g.at.inside) {
      const id = s.cells[g.at.y * s.w + g.at.x];
      if (s.tool === 'pick') { choose(id); setTool('brush'); }
      if (s.tool === 'fill') { if (engine.editFill(g.at.x, g.at.y, s.color, s.mirror)) changed(); else warnRefused(); }
      if (s.tool === 'replace') {
        if (engine.editReplace(id, s.color)) {
          changed();
          notify(`Replaced ${colors.get(id).blName} with ${colors.get(s.color).blName}.`);
        } else warnRefused();
      }
    }
  }

  function zoomAt(factor, clientX, clientY) {
    const box = canvas.getBoundingClientRect();
    const before = metrics();
    const px = (clientX - box.left) * (canvas.width / box.width);
    const py = (clientY - box.top) * (canvas.height / box.height);
    const sx = (px - before.x) / before.cell, sy = (py - before.y) / before.cell;
    s.zoom = Math.min(MAX_ZOOM, Math.max(1, s.zoom * factor));
    if (s.zoom === 1) { s.panX = 0; s.panY = 0; return; }
    const after = metrics();
    s.panX += px - (after.x + sx * after.cell);
    s.panY += py - (after.y + sy * after.cell);
  }

  const centerZoom = (f) => { const b = canvas.getBoundingClientRect(); zoomAt(f, b.left + b.width / 2, b.top + b.height / 2); paint(); };
  const fit = () => { s.zoom = 1; s.panX = 0; s.panY = 0; paint(); };
  function setTool(t) { s.tool = t; renderTools(); }
  const undo = () => { if (engine.editUndo()) changed(); };
  const redo = () => { if (engine.editRedo()) changed(); };

  function onKey(e) {
    if (!s.open) return;
    if (document.querySelector('dialog[open]')) return;
    const tag = e.target?.tagName;
    const typing = tag === 'TEXTAREA' || tag === 'SELECT' || (tag === 'INPUT' && !['range', 'checkbox', 'color'].includes(e.target.type));
    const k = e.key.toLowerCase();
    if ((e.metaKey || e.ctrlKey) && !typing) {
      if (k === 'z') { e.preventDefault(); if (e.shiftKey) redo(); else undo(); } else if (k === 'y') { e.preventDefault(); redo(); }
      return;
    }
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (typing || e.metaKey || e.ctrlKey || e.altKey) return;
    if (TOOLS[k]) { setTool(TOOLS[k]); e.preventDefault(); } else if (k === 'g') { s.grid = !s.grid; renderTools(); paint(); } else if (k === 'm') {
      s.mirror = MIRRORS[(MIRRORS.indexOf(s.mirror) + 1) % MIRRORS.length]; renderTools(); paint();
    } else if (k === '[') { s.size = Math.max(1, s.size - 1); renderTools(); } else if (k === ']') { s.size = Math.min(8, s.size + 1); renderTools(); } else if (k === '=' || k === '+') centerZoom(1.25);
    else if (k === '-') centerZoom(0.8);
    else if (k === '0') fit();
  }

  function useHex() {
    const raw = $('edHex').value.trim().replace(/^#/, '');
    const full = raw.length === 3 ? raw.replace(/./g, '$&$&') : raw;
    if (!/^[0-9a-f]{6}$/i.test(full)) { $('edNearest').textContent = 'Enter a color like #3366CC.'; $('edNearestUse').hidden = true; return; }
    $('edColorInput').value = `#${full.toLowerCase()}`;
    const id = engine.nearestColor(parseInt(full, 16), $('edPalette').value);
    const c = colors.get(id);
    $('edNearest').textContent = `Nearest: ${c.blName} (BrickLink ${c.id})`;
    $('edNearestUse').hidden = false;
    $('edNearestUse').dataset.id = String(id);
  }

  function showPanel(name) {
    for (const p of ['tools', 'colors', 'image']) {
      $(`edPanel-${p}`).hidden = p !== name;
      $(`edTab-${p}`).setAttribute('aria-selected', String(p === name));
    }
  }

  function wire() {
    canvas.addEventListener('pointerdown', pointerDown);
    canvas.addEventListener('pointermove', pointerMove);
    canvas.addEventListener('pointerup', pointerUp);
    canvas.addEventListener('pointercancel', pointerUp);
    canvas.addEventListener('pointerleave', () => { if (!gesture) { s.hover = null; status(); paint(); } });
    canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    canvas.addEventListener('wheel', (e) => { e.preventDefault(); zoomAt(e.deltaY < 0 ? 1.12 : 0.89, e.clientX, e.clientY); paint(); }, { passive: false });
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', resize);
    new ResizeObserver(resize).observe(canvas);
    for (const b of document.querySelectorAll('[data-tool]')) b.addEventListener('click', () => setTool(b.dataset.tool));
    for (const b of document.querySelectorAll('[data-mirror]')) b.addEventListener('click', () => { s.mirror = b.dataset.mirror; renderTools(); paint(); });
    for (const p of ['tools', 'colors', 'image']) $(`edTab-${p}`).addEventListener('click', () => showPanel(p));
    $('edSize').addEventListener('input', (e) => { s.size = Number(e.target.value); renderTools(); });
    $('edGrid').addEventListener('change', (e) => { s.grid = e.target.checked; paint(); });
    $('edUndo').addEventListener('click', undo);
    $('edRedo').addEventListener('click', redo);
    $('edRevert').addEventListener('click', () => { if (engine.editRevert()) changed(); });
    $('edZoomIn').addEventListener('click', () => centerZoom(1.25));
    $('edZoomOut').addEventListener('click', () => centerZoom(0.8));
    $('edFit').addEventListener('click', fit);
    $('edDone').addEventListener('click', close);
    $('edPalette').replaceChildren(el('option', { value: '', text: 'All palettes' }), ...palettes.map((p) => el('option', { value: p.id, text: p.title })));
    for (const id of ['edSearch', 'edPalette', 'edTier']) $(id).addEventListener(id === 'edSearch' ? 'input' : 'change', renderColors);
    $('edHex').addEventListener('input', useHex);
    $('edColorInput').addEventListener('input', (e) => { $('edHex').value = e.target.value.toUpperCase(); useHex(); });
    $('edNearestUse').addEventListener('click', (e) => choose(Number(e.target.dataset.id)));
    for (const b of document.querySelectorAll('[data-tweak]')) b.addEventListener('click', () => onTweak(b.dataset.tweak, 0, 0, 0, 0));
    const crops = ['edCropL', 'edCropT', 'edCropR', 'edCropB'];
    for (const id of crops) $(id).addEventListener('input', () => { $(`${id}Out`).textContent = `${$(id).value}%`; });
    $('edCropApply').addEventListener('click', () => {
      const [l, t, r, b] = crops.map((id) => Number($(id).value));
      if (l + t + r + b === 0) { notify('Move a crop slider first.'); return; }
      onTweak('crop', l, t, r, b);
      for (const id of crops) { $(id).value = '0'; $(`${id}Out`).textContent = '0%'; }
    });
    $('edImageReset').addEventListener('click', onResetImage);
    $('edExtras').addEventListener('click', onExtras);
    for (const name of ['Brightness', 'Contrast', 'Saturation']) {
      const key = name.toLowerCase();
      $(`ed${name}`).addEventListener('change', (e) => onAdjust(key, e.target.value));
    }
  }
  wire();

  function syncSliders() {
    for (const name of ['Brightness', 'Contrast', 'Saturation']) $(`ed${name}`).value = sliders()[name.toLowerCase()];
  }

  /** Starts a session. Without saved cells, the current grid is the original. */
  function load(w, h, config, original, current) {
    clearTimeout(s.timer);
    Object.assign(s, { w, h, config: { ...config }, original: Int32Array.from(original), cells: Int32Array.from(current ?? original), dirty: false, timer: 0, pending: null, rect: null, hover: null });
    if (config.extras) {
      engine.editOpenExtras(w, h, s.original, s.cells, config.extras, config.style);
      const limited = Array.from(engine.editLimited());
      s.limited = limited.length ? limited : null;
      const mask = engine.editLockedMask();
      s.locked = mask.some((v) => v === 1) ? Uint8Array.from(mask) : null;
    } else {
      engine.editOpen(w, h, s.original, s.cells);
      s.limited = null;
      s.locked = null;
    }
    if (!colors.has(s.color) || (s.limited && !s.limited.includes(s.color))) s.color = s.limited?.[0] ?? catalog[0].id;
    if (s.open) { renderTools(); renderColors(); syncSliders(); paint(); }
  }

  function open() {
    s.open = true;
    $('editor').hidden = false;
    document.documentElement.classList.add('editing');
    showPanel('tools');
    renderTools();
    renderColors();
    syncSliders();
    status();
    resize();
    canvas.focus();
  }

  async function close() {
    s.open = false;
    $('editor').hidden = true;
    document.documentElement.classList.remove('editing');
    await pushNow();
    onClose();
  }

  async function flush() {
    await pushNow();
    await s.pending;
  }

  function discard() {
    if (!draftLocked()) drafts.clear();
    if (s.original) load(s.w, s.h, s.config, s.original);
  }

  return { load, open, close, flush, discard, isEdited, isOpen: () => s.open, originalGrid: () => s.original, editedCount: () => (s.cells ? flags()[3] : 0) };
}
