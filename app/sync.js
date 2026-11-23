// Recipe Box file format, encryption and merge for the web app.
// Mirrors core/.../sync/{SyncData,Vault,SyncMerge}.kt; tools/web-compat checks both sides agree.

export const ENCRYPTED_PREFIX = "RECIPEBOX-ENCRYPTED-v1:";
const RECOVERY_ITERATIONS = 100000;
const RECOVERY_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
export const TOMBSTONE_TTL_MS = 120 * 24 * 3600 * 1000;
const LISTS = ["cookbooks", "categories", "recipes", "grocery", "freezer", "meals"];

const enc = new TextEncoder();
const dec = new TextDecoder("utf-8", { fatal: true });

export function b64encode(bytes) {
  let s = "";
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(s);
}
export function b64decode(text) {
  const s = atob(text);
  const out = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) out[i] = s.charCodeAt(i);
  return out;
}

async function pbkdf2(secret, salt, iterations) {
  const base = await crypto.subtle.importKey("raw", enc.encode(secret), "PBKDF2", false, ["deriveBits"]);
  return new Uint8Array(await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt, iterations }, base, 256));
}
const aesKey = (raw, use) => crypto.subtle.importKey("raw", raw, "AES-GCM", false, [use]);

/** iv (12 bytes) + ciphertext + tag, as in Vault.kt. */
export async function seal(rawKey, plain) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const body = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, await aesKey(rawKey, "encrypt"), plain));
  const out = new Uint8Array(12 + body.length);
  out.set(iv); out.set(body, 12);
  return out;
}
export async function open(rawKey, sealed) {
  if (sealed.length <= 28) throw new Error("Encrypted data is too short");
  return new Uint8Array(await crypto.subtle.decrypt({ name: "AES-GCM", iv: sealed.subarray(0, 12) }, await aesKey(rawKey, "decrypt"), sealed.subarray(12)));
}

export const normalizeRecovery = (s) => [...s.toUpperCase()].filter((c) => RECOVERY_ALPHABET.includes(c)).join("");

/** The data key from the passphrase or recovery key, or null if it's wrong. */
export async function unlockKey(header, secret, recovery = false) {
  try {
    const kek = recovery
      ? await pbkdf2(normalizeRecovery(secret), b64decode(header.recoverySalt), RECOVERY_ITERATIONS)
      : await pbkdf2(secret, b64decode(header.passSalt), header.iterations ?? 600000);
    return await open(kek, b64decode(recovery ? header.recoveryWrap : header.passWrap));
  } catch { return null; }
}

export class NeedsUnlock extends Error {
  constructor(header) { super("Your recipes are encrypted. Enter your passphrase."); this.header = header; }
}
export class Unreadable extends Error {}

/** vault: { key: Uint8Array|null, header: object|null }. Adopts a newer header (passphrase changed elsewhere). */
export async function decodeFile(text, vault) {
  const t = text.trimStart();
  if (!t) return { data: emptyData(), encrypted: false };
  if (t.startsWith(ENCRYPTED_PREFIX)) {
    let file;
    try { file = JSON.parse(t.slice(ENCRYPTED_PREFIX.length)); } catch { throw new Unreadable("The encrypted file in Google Drive is damaged. Nothing was overwritten."); }
    if (!vault.key || vault.header?.keyId !== file.header.keyId) throw new NeedsUnlock(file.header);
    let data;
    try { data = JSON.parse(dec.decode(await open(vault.key, b64decode(file.data)))); }
    catch { throw new Unreadable("The encrypted file in Google Drive couldn't be decrypted. Nothing was overwritten."); }
    vault.header = file.header;
    data = normalize(data);
    if (file.inbox?.length) data.inbox = distinctBy([...data.inbox, ...file.inbox], (i) => i.id);
    return { data, encrypted: true };
  }
  if (t.startsWith("RECIPEBOX-")) throw new Unreadable("Your data needs a newer version of Recipe Box.");
  try {
    const parsed = JSON.parse(t);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) throw new Error();
    return { data: normalize(parsed), encrypted: false };
  } catch { throw new Unreadable("The file in Google Drive couldn't be read. Nothing was overwritten."); }
}

export async function encodeFile(data, vault) {
  const plain = JSON.stringify(data, null, 1);
  if (!vault.key || !vault.header) return plain;
  const sealed = await seal(vault.key, enc.encode(plain));
  return ENCRYPTED_PREFIX + JSON.stringify({ header: vault.header, data: b64encode(sealed) });
}

/** A plain Drive file only turns encryption off here with proof made with our data key. */
export async function verifyOff(marker, vault) {
  const id = vault.header?.keyId;
  if (!vault.key || !id || !marker?.startsWith(id + ":")) return false;
  try { return dec.decode(await open(vault.key, b64decode(marker.slice(id.length + 1)))) === "off:" + id; }
  catch { return false; }
}

export function emptyData() {
  return { format: "recipebox/1", updatedAt: 0, cookbooks: [], categories: [], recipes: [], grocery: [], freezer: [], meals: [],
    tombstones: [], inbox: [], customization: { hiddenFields: [], updatedAt: 0, customFields: null }, encryptionOff: "" };
}
export function normalize(d) {
  const e = emptyData();
  return { ...e, ...d, customization: { ...e.customization, ...(d.customization || {}) } };
}

function distinctBy(list, key) {
  const seen = new Set();
  return list.filter((x) => { const k = key(x); if (seen.has(k)) return false; seen.add(k); return true; });
}

/** JSON with sorted keys, so two copies compare equal whatever order their fields are in. */
export function canon(v) {
  if (Array.isArray(v)) return "[" + v.map(canon).join(",") + "]";
  if (v && typeof v === "object") return "{" + Object.keys(v).filter((k) => v[k] !== undefined).sort().map((k) => JSON.stringify(k) + ":" + canon(v[k])).join(",") + "}";
  return JSON.stringify(v ?? null);
}
const same = (a, b) => canon(a) === canon(b);
const byUid = (a, b) => (a.uid < b.uid ? -1 : a.uid > b.uid ? 1 : 0);
const isObj = (v) => v && typeof v === "object" && !Array.isArray(v);

function threeWay(b, l, r) {
  const out = {};
  for (const k of new Set([...Object.keys(b), ...Object.keys(l), ...Object.keys(r)])) {
    let v;
    if (isObj(l[k]) && isObj(r[k])) v = threeWay(isObj(b[k]) ? b[k] : {}, l[k], r[k]);
    else v = same(l[k], b[k]) ? r[k] : l[k];
    if (v !== undefined) out[k] = v;
  }
  return out;
}

/** bases: uid -> copy before this browser's edits (null = created here). Same rules as SyncMerge.mergeReport. */
export function merge(local, remote, bases = {}, now = Date.now()) {
  const a = local, b = remote;
  let combined = 0;
  const newest = new Map();
  for (const t of [...a.tombstones, ...b.tombstones]) {
    const c = newest.get(t.uid);
    if (!c || t.deletedAt > c.deletedAt) newest.set(t.uid, t);
  }
  const tombs = [...newest.values()].filter((t) => now - t.deletedAt < TOMBSTONE_TTL_MS);
  const deletedAt = new Map(tombs.map((t) => [t.uid, t.deletedAt]));

  const pick = (x, y) => {
    const out = new Map();
    for (const item of [...x, ...y]) { const c = out.get(item.uid); if (!c || item.updatedAt > c.updatedAt) out.set(item.uid, item); }
    const lx = new Map(x.map((i) => [i.uid, i])), ry = new Map(y.map((i) => [i.uid, i]));
    for (const [k, base] of Object.entries(bases)) {
      const l = lx.get(k), r = ry.get(k);
      if (!l || !r || !base || same(l, r)) continue;
      if (l.updatedAt > base.updatedAt && r.updatedAt > base.updatedAt && !same(r, base) && !same(l, base)) {
        out.set(k, { ...threeWay(base, l, r), updatedAt: Math.max(l.updatedAt, r.updatedAt) + 1 });
        combined++;
      }
    }
    return [...out.values()].filter((i) => (deletedAt.get(i.uid) ?? -Infinity) < i.updatedAt).sort(byUid);
  };

  const cookbooks = pick(a.cookbooks, b.cookbooks);
  const bookUids = new Set(cookbooks.map((c) => c.uid));
  const categories = pick(a.categories, b.categories).filter((c) => bookUids.has(c.cookbookUid));
  const catUids = new Set(categories.map((c) => c.uid));
  const customOf = new Map();
  for (const r of [...a.recipes, ...b.recipes]) {
    if (r.custom == null) continue;
    const c = customOf.get(r.uid);
    if (!c || r.updatedAt > c.updatedAt) customOf.set(r.uid, r);
  }
  const recipes = pick(a.recipes, b.recipes).filter((r) => bookUids.has(r.cookbookUid)).map((r) => ({
    ...r,
    custom: r.custom ?? customOf.get(r.uid)?.custom ?? r.custom,
    categoryUids: (r.categoryUids || []).filter((c) => catUids.has(c)),
  }));
  const recipeUids = new Set(recipes.map((r) => r.uid));
  const unlink = (i) => (i.recipeUid != null && !recipeUids.has(i.recipeUid) ? { ...i, recipeUid: null } : i);
  const grocery = pick(a.grocery, b.grocery);
  const freezer = pick(a.freezer, b.freezer).map(unlink);
  const meals = pick(a.meals, b.meals).map(unlink);
  const live = new Set([...cookbooks, ...categories, ...recipes, ...grocery, ...freezer, ...meals].map((i) => i.uid));

  const bNewer = b.customization.updatedAt > a.customization.updatedAt;
  const newer = bNewer ? b.customization : a.customization, older = bNewer ? a.customization : b.customization;
  const customization = newer.customFields == null && older.customFields != null ? { ...newer, customFields: older.customFields } : newer;

  return {
    data: {
      format: "recipebox/1", updatedAt: Math.max(a.updatedAt, b.updatedAt), cookbooks, categories, recipes, grocery, freezer, meals,
      tombstones: tombs.filter((t) => !live.has(t.uid)).sort(byUid),
      inbox: distinctBy([...a.inbox, ...b.inbox], (i) => i.id),
      customization, encryptionOff: b.encryptionOff || a.encryptionOff || "",
    },
    combined,
  };
}

export function drainInbox(d, now = Date.now()) {
  if (!d.inbox.length) return d;
  const existing = new Set([...d.grocery.map((g) => g.uid), ...d.tombstones.map((t) => t.uid)]);
  const added = d.inbox.filter((i) => i.item?.trim()).map((i) => ({
    uid: "inbox-" + i.id, name: i.item.trim(), quantity: (i.qty || "").trim(), recipe: "", checked: false,
    source: "assistant:" + (i.source?.trim() ? i.source : "api"), createdAt: now, updatedAt: now,
  })).filter((g) => !existing.has(g.uid));
  return { ...d, grocery: [...d.grocery, ...added].sort(byUid), inbox: [] };
}

export const sameContent = (a, b) => same({ ...a, updatedAt: 0 }, { ...b, updatedAt: 0 });

/** Pre-edit copies of everything that differs between two versions, keeping earlier entries. */
export function recordBases(bases, before, after) {
  const out = { ...bases };
  for (const list of LISTS) {
    const bm = new Map(before[list].map((i) => [i.uid, i])), am = new Map(after[list].map((i) => [i.uid, i]));
    for (const k of new Set([...bm.keys(), ...am.keys()])) {
      if (!(k in out) && !same(bm.get(k), am.get(k))) out[k] = bm.get(k) ?? null;
    }
  }
  return out;
}
export function rebaseBases(bases, remote) {
  const out = { ...bases };
  for (const list of LISTS) for (const i of remote[list]) if (i.uid in out) out[i.uid] = i;
  return out;
}
