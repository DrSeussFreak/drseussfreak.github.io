// Runs the Kotlin mosaic engine off the main thread. Messages carry no filenames or keys.
import * as engine from './engine.js';
import { sanitizeCsv } from './security.js';

const ALLOWED = {
  catalog: () => engine.catalogJson(),
  convert: ({ argb, width, height, config: c }) => engine.convertMosaic(
    new Int32Array(argb), width, height, c.width, c.height, c.style, c.backing, c.palette, c.rarity,
    c.tolerance, c.dither, c.legal, c.brightness, c.contrast, c.saturation,
  ),
  csv: ({ format }) => ({ text: sanitizeCsv(engine.exportCsv(format)), name: engine.exportCsvName(format) }),
  cart: ({ marketplace }) => {
    const text = engine.exportCart(marketplace);
    const name = engine.exportCartName(marketplace);
    return { text: name.endsWith('.csv') ? sanitizeCsv(text) : text, name };
  },
  summary: () => engine.exportSummary(),
  rebuild: ({ grid, config: c }) => engine.rebuildMosaic(
    new Int32Array(grid), c.width, c.height, c.style, c.backing, c.palette, c.rarity,
    c.tolerance, c.dither, c.legal, c.brightness, c.contrast, c.saturation,
  ),
  pro: ({ kind, title }) => {
    const label = String(title ?? '').slice(0, 200);
    const data = engine.exportProBytes(String(kind), label);
    return { name: engine.exportProName(String(kind), label), bytes: new Uint8Array(data.buffer, data.byteOffset, data.byteLength).slice() };
  },
};

self.onmessage = ({ data }) => {
  const { id, type, payload } = data ?? {};
  const handler = Object.hasOwn(ALLOWED, type) ? ALLOWED[type] : null;
  try {
    if (!handler) throw new Error('Unknown request');
    self.postMessage({ id, ok: true, value: handler(payload ?? {}) });
  } catch {
    self.postMessage({ id, ok: false });
  }
};
