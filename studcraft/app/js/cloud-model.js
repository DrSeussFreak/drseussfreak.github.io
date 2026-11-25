// Pure rules for Cloud Library documents. Mirrors the Android SavedMosaic shape and firestore.rules.

export const LIBRARY_LIMIT = 200;

/** Android stores the SampleArtwork enum name; the web uses the lowercase asset id. */
export const SAMPLE_KEYS = Object.freeze({ wave: 'WAVE', toucan: 'TOUCAN', astronaut: 'ASTRONAUT' });
const SAMPLE_BY_KEY = Object.freeze({ WAVE: 'wave', TOUCAN: 'toucan', ASTRONAUT: 'astronaut' });

const STYLES = ['ROUND_TILES_ART', 'ROUND_PLATES_STUDS', 'OPTIMIZED_MULTI_PLATE', 'STACKED_BRICK_WALL'];
const BACKINGS = ['PLATES_16X16', 'TECHNIC_FRAMES_16X16', 'BASEPLATES_32X32', 'SELF_SUPPORTING_WALL'];
const ID = /^[A-Za-z0-9_-]{1,128}$/;
const UNSAFE_TEXT = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f​-‏‪-‮⁠-⁩﻿]/g;

/** Removes control and direction-override characters and limits length by whole characters. */
export function cleanText(value, max) {
  if (typeof value !== 'string') return '';
  return Array.from(value.replace(UNSAFE_TEXT, '').trim()).slice(0, max).join('').trim();
}

const clamp = (value, low, high) => Math.min(high, Math.max(low, value));
const finite = (value, fallback = 0) => (typeof value === 'number' && Number.isFinite(value) ? value : fallback);
const whole = (value, low, high) => clamp(Math.round(finite(value, low)), low, high);
const money = (value) => clamp(Math.round(finite(value) * 100) / 100, 0, 100000);

/** Builds exactly the fields firestore.rules allows. Timestamps are the caller's server sentinels. */
export function buildMosaicDoc({ uid, title, notes, sampleId, sourceLabel, config, result, timestamp }) {
  if (typeof uid !== 'string' || uid.length < 1 || uid.length > 128) throw new TypeError('A signed-in user is required.');
  if (!STYLES.includes(config.style) || !BACKINGS.includes(config.backing)) throw new TypeError('Unsupported build settings.');
  const width = whole(result.width, 16, 96);
  const height = whole(result.height, 16, 96);
  const sampleKey = SAMPLE_KEYS[sampleId] ?? null;
  const source = cleanText(sourceLabel, 80) || 'Custom Photo';
  const doc = {
    userId: uid,
    title: cleanText(title, 100) || cleanText(`${source} ${width}x${height}`, 100),
    sourceLabel: source,
    widthStuds: width,
    heightStuds: height,
    buildStyle: config.style,
    backingSystem: config.backing,
    palettePreset: cleanText(config.palette, 40),
    rarityPreference: cleanText(config.rarity, 40),
    colorTolerance: clamp(finite(config.tolerance, 8), 0, 32),
    ditheringEnabled: config.dither === true,
    legalEnforced: config.legal === true,
    totalPieces: whole(result.pricing?.pieces, 0, 100000),
    estimatedPabUsd: money(result.pricing?.pab),
    estimatedBlUsd: money(result.pricing?.bl),
    legalScore: whole(result.validation?.score, 0, 100),
    completedStepsCount: 0,
    notes: cleanText(notes, 1000),
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  if (sampleKey) doc.sampleId = sampleKey;
  return doc;
}

const inRange = (value, low, high) => typeof value === 'number' && Number.isFinite(value) && value >= low && value <= high;
const isWhole = (value, low, high) => Number.isInteger(value) && value >= low && value <= high;

const stampOf = (value) => {
  try {
    const ms = value?.toMillis?.();
    return inRange(ms, 0, 8.64e15) ? ms : null;
  } catch { return null; }
};

/** The record's stored values, unchanged, so an encrypted copy can preserve them exactly. */
export function libraryDetails(data) {
  return {
    totalPieces: data.totalPieces ?? 0, estimatedPabUsd: data.estimatedPabUsd ?? 0, estimatedBlUsd: data.estimatedBlUsd ?? 0,
    legalScore: data.legalScore ?? 100, completedStepsCount: data.completedStepsCount ?? 0,
    createdAt: stampOf(data.createdAt), updatedAt: stampOf(data.updatedAt),
    sourceLabel: typeof data.sourceLabel === 'string' ? data.sourceLabel : '', sampleId: typeof data.sampleId === 'string' ? data.sampleId : null,
  };
}

/** Validates a stored document as untrusted input. Returns null when it cannot be used. */
export function parseMosaic(id, data) {
  if (typeof id !== 'string' || !ID.test(id) || data === null || typeof data !== 'object') return null;
  if (!isWhole(data.widthStuds, 16, 96) || !isWhole(data.heightStuds, 16, 96)) return null;
  if (!STYLES.includes(data.buildStyle) || !BACKINGS.includes(data.backingSystem)) return null;
  if (!inRange(data.colorTolerance, 0, 32) || typeof data.ditheringEnabled !== 'boolean' || typeof data.legalEnforced !== 'boolean') return null;
  const title = cleanText(data.title, 100);
  const sourceLabel = cleanText(data.sourceLabel, 80);
  const palette = cleanText(data.palettePreset, 40);
  const rarity = cleanText(data.rarityPreference, 40);
  if (!title || !sourceLabel || !palette || !rarity) return null;
  const sample = typeof data.sampleId === 'string' ? SAMPLE_BY_KEY[data.sampleId.toUpperCase()] ?? null : null;
  let updatedAt = null;
  try {
    const ms = data.updatedAt?.toMillis?.();
    if (inRange(ms, 0, 8.64e15)) updatedAt = ms;
  } catch { /* an unreadable date is simply not shown */ }
  return {
    id, title, sourceLabel, sample, updatedAt,
    notes: cleanText(data.notes, 1000),
    width: data.widthStuds, height: data.heightStuds,
    style: data.buildStyle, backing: data.backingSystem, palette, rarity,
    tolerance: data.colorTolerance, dither: data.ditheringEnabled, legal: data.legalEnforced,
    pieces: isWhole(data.totalPieces, 0, 100000) ? data.totalPieces : 0,
    pab: inRange(data.estimatedPabUsd, 0, 100000) ? data.estimatedPabUsd : 0,
    bl: inRange(data.estimatedBlUsd, 0, 100000) ? data.estimatedBlUsd : 0,
    score: isWhole(data.legalScore, 0, 100) ? data.legalScore : 0,
    details: libraryDetails(data),
  };
}

/** Only the display fields of a Firebase user, cleaned for textContent. Never includes the user ID. */
export function accountView(user) {
  const email = cleanText(user?.email, 120);
  const name = cleanText(user?.displayName, 60) || email || 'Google account';
  return { name, email: email === name ? '' : email, initial: Array.from(name)[0]?.toUpperCase() ?? 'G' };
}

const AUTH_MESSAGES = {
  'auth/popup-blocked': 'Your browser blocked the Google sign-in window. Allow pop-ups for this site, then try again.',
  'auth/network-request-failed': 'StudCraft could not reach Google. Check your connection and try again.',
  'auth/unauthorized-domain': 'Google sign-in is not enabled for this address.',
  'auth/operation-not-supported-in-this-environment': 'Google sign-in is not available in this browser.',
  'auth/web-storage-unsupported': 'This browser is blocking the storage needed to stay signed in.',
  'auth/too-many-requests': 'Too many sign-in attempts. Wait a moment and try again.',
  'auth/user-disabled': 'This account has been disabled.',
};

/** Returns a fixed message for an auth failure, or null when the user simply closed the window. */
export function authMessage(error) {
  const code = error?.code;
  if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request' || code === 'auth/user-cancelled') return null;
  return AUTH_MESSAGES[code] ?? 'Google sign-in did not finish. Try again.';
}

const CLOUD_MESSAGES = {
  'permission-denied': 'Your account does not have access to that item. Try signing in again.',
  unauthenticated: 'Your sign-in expired. Sign in with Google again.',
  unavailable: 'The Cloud Library is unreachable. Check your connection and try again.',
  'deadline-exceeded': 'The Cloud Library took too long to respond. Try again.',
  'resource-exhausted': 'The Cloud Library is busy. Try again later.',
  'not-found': 'That saved mosaic no longer exists.',
};

/** Returns a fixed message so server text never reaches the page. */
export function cloudMessage(error) {
  const code = String(error?.code ?? '').replace(/^firestore\//, '');
  return CLOUD_MESSAGES[code] ?? 'The Cloud Library could not finish that.';
}
