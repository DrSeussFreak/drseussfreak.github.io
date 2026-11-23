// Validates an AI drawing (the JSON format from DrawingSceneRenderer.kt) and paints it.
import { UserError } from './security.js';

export const SCENE_LIMITS = Object.freeze({
  canvas: 1024, scene: 512, maxText: 2_000_000, maxShapes: 600, maxPolygonPoints: 256, maxTotalPoints: 20_000,
  minCoord: -1024, maxCoord: 1536, maxLength: 2048, maxRadius: 1024, minLine: 1, maxLine: 64,
});

const HEX = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

function color(value) {
  if (typeof value !== 'string') return null;
  const text = value.trim();
  return HEX.test(text) ? text.toLowerCase() : null;
}

const finite = (v) => typeof v === 'number' && Number.isFinite(v);
const coord = (v) => finite(v) && v >= SCENE_LIMITS.minCoord && v <= SCENE_LIMITS.maxCoord;
const length = (v) => finite(v) && v >= 0 && v <= SCENE_LIMITS.maxLength;
const radius = (v) => finite(v) && v >= 0 && v <= SCENE_LIMITS.maxRadius;

function cleanShape(raw, budget) {
  if (raw === null || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const type = typeof raw.type === 'string' ? raw.type.toLowerCase() : '';
  if (type === 'rect') {
    const fill = color(raw.fill);
    const r = raw.r === undefined ? 0 : raw.r;
    if (!fill || !coord(raw.x) || !coord(raw.y) || !length(raw.w) || !length(raw.h) || !radius(r)) return null;
    return { type, x: raw.x, y: raw.y, w: raw.w, h: raw.h, r: Math.min(r, raw.w / 2, raw.h / 2), fill };
  }
  if (type === 'ellipse' || type === 'circle') {
    const fill = color(raw.fill);
    const rx = raw.rx !== undefined ? raw.rx : raw.r;
    const ry = raw.ry !== undefined ? raw.ry : rx;
    if (!fill || !coord(raw.cx) || !coord(raw.cy) || !radius(rx) || !radius(ry)) return null;
    return { type: 'ellipse', cx: raw.cx, cy: raw.cy, rx, ry, fill };
  }
  if (type === 'polygon') {
    const fill = color(raw.fill);
    if (!fill || !Array.isArray(raw.points) || raw.points.length < 3 || raw.points.length > SCENE_LIMITS.maxPolygonPoints) return null;
    if (raw.points.length > budget.points) return null;
    const points = [];
    for (const p of raw.points) {
      if (!Array.isArray(p) || p.length < 2 || !coord(p[0]) || !coord(p[1])) return null;
      points.push([p[0], p[1]]);
    }
    budget.points -= points.length;
    return { type, points, fill };
  }
  if (type === 'line') {
    const lineColor = color(raw.color);
    if (!lineColor || !coord(raw.x1) || !coord(raw.y1) || !coord(raw.x2) || !coord(raw.y2) || !finite(raw.width)) return null;
    return { type, x1: raw.x1, y1: raw.y1, x2: raw.x2, y2: raw.y2, width: Math.min(SCENE_LIMITS.maxLine, Math.max(SCENE_LIMITS.minLine, raw.width)), color: lineColor };
  }
  return null;
}

/** Returns a clean scene holding only known fields, or throws a readable error. */
export function parseDrawing(rawText) {
  if (typeof rawText !== 'string' || rawText.length > SCENE_LIMITS.maxText) throw new UserError('The AI drawing is too large.');
  const start = rawText.indexOf('{');
  const end = rawText.lastIndexOf('}');
  if (start < 0 || end <= start) throw new UserError("The AI didn't return a drawing.");
  let scene;
  try {
    scene = JSON.parse(rawText.slice(start, end + 1));
  } catch {
    throw new UserError("The AI returned a drawing StudCraft couldn't read.");
  }
  if (scene === null || typeof scene !== 'object' || !Array.isArray(scene.shapes) || scene.shapes.length === 0) {
    throw new UserError('The AI returned an empty drawing.');
  }
  const budget = { points: SCENE_LIMITS.maxTotalPoints };
  const shapes = [];
  for (const raw of scene.shapes.slice(0, SCENE_LIMITS.maxShapes)) {
    const shape = cleanShape(raw, budget);
    if (shape) shapes.push(shape);
  }
  if (shapes.length === 0) throw new UserError("The AI returned a drawing StudCraft couldn't read.");
  return { background: color(scene.background) ?? '#ffffff', shapes };
}

/** Paints a clean scene onto a 2D context sized to SCENE_LIMITS.canvas. */
export function paintScene(ctx, scene) {
  const { canvas, scene: size } = SCENE_LIMITS;
  ctx.save();
  ctx.fillStyle = scene.background;
  ctx.fillRect(0, 0, canvas, canvas);
  ctx.scale(canvas / size, canvas / size);
  for (const s of scene.shapes) {
    ctx.beginPath();
    if (s.type === 'rect') {
      ctx.fillStyle = s.fill;
      ctx.roundRect(s.x, s.y, s.w, s.h, s.r);
      ctx.fill();
    } else if (s.type === 'ellipse') {
      ctx.fillStyle = s.fill;
      ctx.ellipse(s.cx, s.cy, s.rx, s.ry, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (s.type === 'polygon') {
      ctx.fillStyle = s.fill;
      s.points.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.strokeStyle = s.color;
      ctx.lineWidth = s.width;
      ctx.lineCap = 'round';
      ctx.moveTo(s.x1, s.y1);
      ctx.lineTo(s.x2, s.y2);
      ctx.stroke();
    }
  }
  ctx.restore();
}
