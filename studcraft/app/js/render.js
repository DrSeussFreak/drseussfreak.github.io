// Draws mosaics and build steps onto canvas. Works from the numeric piece table only.
const STRIDE = 9;

export function colorMap(colors) {
  const map = new Map();
  for (const c of colors) map.set(c.id, c);
  return map;
}

const rgb = (c, f = 1) => `rgb(${Math.min(255, Math.round(c.r * f))},${Math.min(255, Math.round(c.g * f))},${Math.min(255, Math.round(c.b * f))})`;

function drawPiece(ctx, p, i, cell, colors) {
  const x = p[i + 1] * cell, y = p[i + 2] * cell, w = p[i + 3] * cell, h = p[i + 4] * cell;
  const c = colors.get(p[i + 5]) ?? { r: 27, g: 42, b: 52 };
  const round = p[i + 7] === 1, studs = p[i + 8] === 1;
  ctx.fillStyle = rgb(c);
  ctx.beginPath();
  if (round) ctx.arc(x + w / 2, y + h / 2, w / 2 - Math.max(0.4, cell * 0.04), 0, Math.PI * 2);
  else ctx.roundRect(x + 0.5, y + 0.5, w - 1, h - 1, Math.min(2, cell * 0.12));
  ctx.fill();
  if (cell < 5) return;
  if (studs) {
    ctx.fillStyle = rgb(c, 1.14);
    for (let sy = 0; sy < p[i + 4]; sy++) {
      for (let sx = 0; sx < p[i + 3]; sx++) {
        ctx.beginPath();
        ctx.arc(x + (sx + 0.5) * cell, y + (sy + 0.5) * cell, cell * 0.28, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  } else if (round) {
    ctx.strokeStyle = 'rgba(255,255,255,0.22)';
    ctx.lineWidth = Math.max(1, cell * 0.07);
    ctx.beginPath();
    ctx.arc(x + w / 2, y + h / 2, w * 0.3, Math.PI * 1.05, Math.PI * 1.6);
    ctx.stroke();
  }
}

export function cellFor(res, maxPixels = 1280) {
  return Math.max(4, Math.min(20, Math.floor(maxPixels / Math.max(res.width, res.height))));
}

export function drawMosaic(canvas, res, colors) {
  const cell = cellFor(res);
  canvas.width = res.width * cell;
  canvas.height = res.height * cell;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#14181f';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const p = res.pieces;
  // A colored plate backing shows wherever a stud was left off.
  if (res.plateColor !== undefined) for (let i = 0; i < p.length; i += STRIDE) if (p[i + 6] === 0) drawPiece(ctx, p, i, cell, colors);
  for (let i = 0; i < p.length; i += STRIDE) if (p[i + 6] === 1) drawPiece(ctx, p, i, cell, colors);
}

export function drawStep(canvas, res, colors, index) {
  const cell = cellFor(res);
  canvas.width = res.width * cell;
  canvas.height = res.height * cell;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#14181f';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const step = res.steps[index];
  const fresh = new Set(step.ids);
  const done = new Set();
  for (let s = 0; s < index; s++) for (const id of res.steps[s].ids) done.add(id);
  const p = res.pieces;
  for (const layer of [0, 1]) {
    for (let i = 0; i < p.length; i += STRIDE) {
      if (p[i + 6] !== layer) continue;
      const id = p[i];
      if (fresh.has(id)) { ctx.globalAlpha = 1; drawPiece(ctx, p, i, cell, colors); }
      else if (done.has(id)) { ctx.globalAlpha = layer === 0 ? 0.6 : 0.32; drawPiece(ctx, p, i, cell, colors); }
    }
  }
  ctx.globalAlpha = 1;
  if (step.structural) {
    ctx.fillStyle = '#ffd400';
    for (const pin of res.pins) {
      ctx.beginPath();
      ctx.arc(pin.x * cell, pin.y * cell, Math.max(3, cell * 0.35), 0, Math.PI * 2);
      ctx.fill();
    }
  }
  const [fx, fy, fw, fh] = step.focus;
  ctx.strokeStyle = '#ffd400';
  ctx.lineWidth = Math.max(2, cell * 0.2);
  ctx.strokeRect(fx * cell + 1, fy * cell + 1, fw * cell - 2, fh * cell - 2);
}
