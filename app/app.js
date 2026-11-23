import { GOOGLE_CLIENT_ID } from "./config.js";
import { NeedsUnlock, canon, decodeFile, drainInbox, encodeFile, merge, rebaseBases, recordBases, sameContent, unlockKey, verifyOff } from "./sync.js";

const SCOPES = "openid email profile https://www.googleapis.com/auth/drive.file";
const FILE_NAME = "recipebox-data.json";
const MEAL_TYPES = ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"];
const DRIVE = "https://www.googleapis.com/drive/v3/files";
const HINT = "recipebox.web.email";

// Recipes and the encryption key live only in this tab's memory. Nothing is saved in the browser except the email hint.
const S = { email: null, name: "", token: null, tokenExp: 0, data: null, fileId: null, vault: { key: null, header: null }, bases: {},
  status: "", error: "", running: false, again: false, lastSync: 0, unlock: null, noFile: false, screen: "signin", tab: "cookbook",
  recipe: null, editing: null, q: "", book: "", cat: "", fav: false, weekStart: mondayOf(new Date()), scale: 1 };

// ---------- small helpers ----------
function h(tag, props, ...kids) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(props || {})) {
    if (v == null || v === false) continue;
    if (k.startsWith("on")) e.addEventListener(k.slice(2), v);
    else if (k === "class") e.className = v;
    else if (k === "value") e.value = v;
    else if (k === "checked" || k === "disabled" || k === "selected" || k === "required") e[k] = !!v;
    else e.setAttribute(k, v === true ? "" : v);
  }
  for (const c of kids.flat(Infinity)) if (c != null && c !== false) e.append(c.nodeType ? c : String(c));
  return e;
}
const uid = () => crypto.randomUUID();
const now = () => Date.now();
const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const fromIso = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
function mondayOf(d) { const x = new Date(d.getFullYear(), d.getMonth(), d.getDate()); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return x; }
const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const safeUrl = (u) => { try { const x = new URL(u); return x.protocol === "https:" || x.protocol === "http:" ? x.href : null; } catch { return null; } };
const httpsImage = (u) => { const x = safeUrl(u); return x?.startsWith("https:") ? x : null; };
const lines = (s) => s.split("\n").map((l) => l.trim()).filter(Boolean);
const num = (s) => { const n = parseInt(s, 10); return Number.isFinite(n) && n >= 0 ? n : null; };
let toastTimer;
function toast(msg) { const t = document.getElementById("toast"); t.textContent = msg; t.classList.add("on"); clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("on"), 3200); }
const recipeOf = (id) => S.data.recipes.find((r) => r.uid === id);
const byTitle = (a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: "base" });
const catsOf = (book) => S.data.categories.filter((c) => !book || c.cookbookUid === book).sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));
const tomb = (id, kind) => ({ uid: id, kind, deletedAt: now() });

// ---------- ingredient amounts ----------
const FRAC = { "½": .5, "⅓": 1 / 3, "⅔": 2 / 3, "¼": .25, "¾": .75, "⅛": .125, "⅜": .375, "⅝": .625, "⅞": .875 };
const AMOUNT = "(?:\\d+\\s+\\d+/\\d+|\\d+/\\d+|\\d+\\s*[½⅓⅔¼¾⅛⅜⅝⅞]|[½⅓⅔¼¾⅛⅜⅝⅞]|\\d*\\.\\d+|\\d+)";
const AMOUNT_RE = new RegExp(`^(${AMOUNT})(?:\\s*(?:-|–|to)\\s*(${AMOUNT}))?`);
const UNIT_RE = /^\s*(cups?|c\.|tablespoons?|tbsps?\.?|tbs\.?|teaspoons?|tsps?\.?|ounces?|oz\.?|pounds?|lbs?\.?|grams?|g|kilograms?|kg|milliliters?|ml|liters?|l|pints?|quarts?|gallons?|cloves?|cans?|packages?|pkgs?\.?|sticks?|pinch(?:es)?|dash(?:es)?|slices?|bunch(?:es)?)\b\.?/i;
function amountValue(t) {
  t = t.trim();
  let m;
  if ((m = t.match(/^(\d+)\s+(\d+)\/(\d+)$/))) return +m[1] + +m[2] / +m[3];
  if ((m = t.match(/^(\d+)\/(\d+)$/))) return +m[1] / +m[2];
  if ((m = t.match(/^(\d*)\s*([½⅓⅔¼¾⅛⅜⅝⅞])$/))) return (+m[1] || 0) + FRAC[m[2]];
  return parseFloat(t);
}
function fmtAmount(v) {
  const whole = Math.floor(v + 1e-6), rest = v - whole;
  if (rest < .02) return String(whole);
  for (const [g, f] of Object.entries(FRAC)) if (Math.abs(rest - f) < .02) return (whole ? whole + " " : "") + g;
  return String(Math.round(v * 100) / 100);
}
function scaleLine(line, k) {
  if (k === 1) return line;
  const m = line.match(AMOUNT_RE);
  if (!m) return line;
  const a = fmtAmount(amountValue(m[1]) * k);
  return a + (m[2] ? "–" + fmtAmount(amountValue(m[2]) * k) : "") + line.slice(m[0].length);
}
function groceryFrom(line, recipe) {
  const m = line.match(AMOUNT_RE);
  let qty = "", name = line;
  if (m) {
    qty = m[0].trim(); name = line.slice(m[0].length);
    const u = name.match(UNIT_RE);
    if (u) { qty += " " + u[1]; name = name.slice(u[0].length); }
    name = name.replace(/^\s*of\s+/i, "").trim();
  }
  const t = now();
  return { uid: uid(), name: name || line, quantity: qty, recipe, checked: false, source: "web", createdAt: t, updatedAt: t };
}

// ---------- Google sign-in ----------
let tokenClient, tokenWait;
function gisReady() {
  return new Promise((res, rej) => {
    const start = now();
    (function poll() {
      if (window.google?.accounts?.oauth2) return res();
      if (now() - start > 10000) return rej(new Error("Google sign-in didn't load. Check for a content blocker."));
      setTimeout(poll, 100);
    })();
  });
}
async function requestToken(prompt) {
  await gisReady();
  if (!tokenClient) {
    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID, scope: SCOPES,
      callback: (r) => {
        const w = tokenWait; tokenWait = null;
        if (r.error || !google.accounts.oauth2.hasGrantedAllScopes(r, "https://www.googleapis.com/auth/drive.file")) return w?.rej(new Error("Recipe Box needs Google Drive access to open your recipes."));
        S.token = r.access_token; S.tokenExp = now() + (r.expires_in - 60) * 1000; w?.res();
      },
      error_callback: (e) => { const w = tokenWait; tokenWait = null; w?.rej(new Error(e.type === "popup_closed" ? "Sign-in was closed" : "Sign-in didn't finish")); },
    });
  }
  return new Promise((res, rej) => { tokenWait = { res, rej }; tokenClient.requestAccessToken({ prompt, hint: S.email || localHint() || undefined }); });
}
function localHint() { try { return localStorage.getItem(HINT); } catch { return null; } }
function saveHint(v) { try { if (v) localStorage.setItem(HINT, v); else localStorage.removeItem(HINT); } catch { /* optional */ } }
async function token() { if (!S.token || now() > S.tokenExp) await requestToken(""); return S.token; }
async function api(url, init = {}, retried = false) {
  const r = await fetch(url, { ...init, headers: { ...(init.headers || {}), Authorization: "Bearer " + await token() } });
  if (r.status === 401 && !retried) { S.token = null; return api(url, init, true); }
  if (!r.ok) throw new Error(`Google Drive error ${r.status}`);
  return r;
}
async function signIn() {
  try {
    await requestToken(localHint() ? "" : "select_account");
    const u = await (await api("https://www.googleapis.com/oauth2/v3/userinfo")).json();
    S.email = u.email; S.name = u.name || ""; saveHint(u.email);
    S.screen = "loading"; render();
    await sync();
    afterFirstSync();
  } catch (e) { S.screen = "signin"; S.error = e.message; render(); }
}
function afterFirstSync() {
  if (S.unlock) S.screen = "unlock";
  else if (S.data) S.screen = "app";
  else if (S.noFile) S.screen = "nofile";
  else S.screen = "signin"; // keeps S.error for the sign-in screen
  render();
}
function signOut() {
  if (Object.keys(S.bases).length && !confirm("Some changes haven't reached Google Drive yet. Sign out anyway?")) return;
  if (S.token) google.accounts.oauth2.revoke(S.token, () => {});
  saveHint(null); location.reload();
}

// ---------- sync ----------
async function findFile() {
  const q = `name = '${FILE_NAME}' and mimeType = 'application/json' and trashed = false`;
  const r = await (await api(`${DRIVE}?${new URLSearchParams({ q, spaces: "drive", orderBy: "modifiedTime desc", fields: "files(id,version)" })}`)).json();
  return r.files?.[0] || null;
}
async function sync() {
  if (S.running) { S.again = true; return; }
  S.running = true; S.error = ""; paintSync();
  try {
    let combinedTotal = 0;
    const startKeys = Object.keys(S.bases);
    let used = S.bases;
    for (let attempt = 0; ; attempt++) {
      const meta = await findFile();
      // This app never creates the sync file: an empty search must not start a second copy next to the real one.
      if (!meta) { S.noFile = true; return; }
      S.fileId = meta.id; S.noFile = false;
      const text = await (await api(`${DRIVE}/${meta.id}?alt=media`, { cache: "no-store" })).text();
      const decoded = await decodeFile(text, S.vault);
      S.unlock = null;
      if (!decoded.encrypted && S.vault.key && await verifyOff(decoded.data.encryptionOff, S.vault)) S.vault = { key: null, header: null };
      const remote = decoded.data;
      if (!S.data) S.data = remote;
      const report = merge(S.data, remote, used);
      combinedTotal += report.combined;
      const merged = drainInbox(report.data);
      used = rebaseBases(used, remote);
      S.data = { ...merge(S.data, merged).data, inbox: merged.inbox };
      if (sameContent(S.data, remote) && decoded.encrypted === !!S.vault.key) break;
      const check = await (await api(`${DRIVE}/${meta.id}?fields=version`)).json();
      if (check.version !== meta.version) { if (attempt >= 2) throw new Error("The file kept changing. Try again."); continue; }
      const body = await encodeFile({ ...S.data, updatedAt: now() }, S.vault);
      await api(`https://www.googleapis.com/upload/drive/v3/files/${meta.id}?uploadType=media`, { method: "PATCH", headers: { "Content-Type": "application/json; charset=utf-8" }, body });
      break;
    }
    const left = { ...S.bases };
    for (const k of startKeys) if (canon(left[k]) === canon(S.bases[k])) delete left[k];
    S.bases = left;
    S.lastSync = now();
    if (combinedTotal) toast(`Combined your edits with another device (${combinedTotal})`);
  } catch (e) {
    if (e instanceof NeedsUnlock) { S.unlock = e.header; S.screen = "unlock"; }
    else S.error = e.message || "Sync failed";
  } finally {
    S.running = false;
    // Don't redraw under someone typing or using a dialog.
    const typing = ["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName);
    if (S.screen === "app" && !typing && !document.querySelector("dialog[open]") && !S.editing) render(); else paintSync();
    if (S.again) { S.again = false; sync(); }
  }
}
let saveTimer;
function update(fn) {
  const before = S.data, next = fn(before);
  if (next === before) return;
  S.bases = recordBases(S.bases, before, next);
  S.data = next;
  clearTimeout(saveTimer); saveTimer = setTimeout(sync, 1500);
  render();
}
addEventListener("beforeunload", (e) => { if (Object.keys(S.bases).length) e.preventDefault(); });
setInterval(() => { if (S.screen === "app" && document.visibilityState === "visible" && S.token && now() < S.tokenExp) sync(); }, 5 * 60000);
document.addEventListener("visibilitychange", () => { if (S.screen === "app" && document.visibilityState === "visible" && S.token && now() < S.tokenExp && now() - S.lastSync > 60000) sync(); });

// ---------- edits ----------
const setRecipe = (r) => update((d) => {
  const t = now(), x = { ...r, updatedAt: t, createdAt: r.createdAt || t };
  return { ...d, recipes: d.recipes.some((i) => i.uid === r.uid) ? d.recipes.map((i) => (i.uid === r.uid ? x : i)) : [...d.recipes, x] };
});
const deleteRecipe = (id) => update((d) => ({ ...d, recipes: d.recipes.filter((r) => r.uid !== id),
  meals: d.meals.map((m) => (m.recipeUid === id ? { ...m, recipeUid: null, updatedAt: now() } : m)),
  freezer: d.freezer.map((f) => (f.recipeUid === id ? { ...f, recipeUid: null, updatedAt: now() } : f)),
  tombstones: [...d.tombstones, tomb(id, "recipe")] }));
const addGrocery = (items) => update((d) => ({ ...d, grocery: [...d.grocery, ...items] }));
const patch = (list, id, fields) => update((d) => ({ ...d, [list]: d[list].map((i) => (i.uid === id ? { ...i, ...fields, updatedAt: now() } : i)) }));
const remove = (list, kind, ids) => update((d) => ({ ...d, [list]: d[list].filter((i) => !ids.includes(i.uid)), tombstones: [...d.tombstones, ...ids.map((i) => tomb(i, kind))] }));
function addMeal(date, meal, recipeUid, title, servings) {
  update((d) => ({ ...d, meals: [...d.meals, { uid: uid(), date, meal, recipeUid: recipeUid || null, title: (title || "").trim(), servings: servings ?? null,
    sortOrder: d.meals.filter((m) => m.date === date).length, made: false, updatedAt: now() }] }));
}
function changeFreezer(item, delta) {
  const n = item.portions + delta;
  if (n <= 0) { if (confirm(`Remove ${item.name} from the freezer?`)) remove("freezer", "freezer", [item.uid]); }
  else patch("freezer", item.uid, { portions: n });
}

// ---------- screens ----------
const root = () => document.getElementById("root");
function render() {
  const r = root(); const y = scrollY;
  r.replaceChildren(({ signin: signinView, loading: loadingView, unlock: unlockView, nofile: noFileView, app: shellView })[S.screen]());
  if (S.screen === "app") scrollTo(0, y);
}
const logo = () => h("img", { src: "../icon.png", alt: "" });
function signinView() {
  return h("div", { class: "center" }, h("div", { class: "box" }, logo(), h("h1", {}, "Recipe Box"),
    h("p", { class: "muted" }, "Your recipes, meal plan, grocery list and freezer, from your own Google Drive."),
    S.error && h("p", { class: "err", role: "alert" }, S.error),
    GOOGLE_CLIENT_ID ? h("button", { class: "primary", onclick: signIn }, "Sign in with Google") : h("p", { class: "err" }, "Google sign-in isn't set up yet."),
    h("p", { class: "muted" }, h("small", {}, "Your data goes only between this browser and your Drive. "), h("a", { href: "../privacy/" }, h("small", {}, "Privacy")))));
}
const loadingView = () => h("div", { class: "center" }, h("div", { class: "box" }, logo(), h("p", {}, "Opening your recipes…")));
function noFileView() {
  return h("div", { class: "center" }, h("div", { class: "box" }, logo(), h("h1", {}, "No recipes found"),
    h("p", { class: "muted" }, `There's no Recipe Box file in ${S.email}'s Google Drive. Sign in on the Android or Mac app first, then come back.`),
    h("button", { class: "primary", onclick: signIn }, "Check again"), h("button", { class: "link", onclick: signOut }, "Use a different account")));
}
function unlockView() {
  let recovery = false, err = "";
  const input = h("input", { type: "password", autocomplete: "current-password", "aria-label": "Passphrase", placeholder: "Passphrase" });
  const msg = h("p", { class: "err", role: "alert" });
  const go = h("button", { class: "primary", onclick: submit }, "Unlock");
  const sw = h("button", { class: "link", onclick: () => { recovery = !recovery; input.type = recovery ? "text" : "password"; input.placeholder = recovery ? "Recovery key" : "Passphrase"; input.setAttribute("aria-label", input.placeholder); sw.textContent = recovery ? "Use my passphrase" : "Use my recovery key"; input.value = ""; input.focus(); } }, "Use my recovery key");
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") submit(); });
  async function submit() {
    if (!input.value) return;
    go.disabled = true; go.textContent = "Unlocking…"; msg.textContent = err;
    const key = await unlockKey(S.unlock, input.value, recovery);
    if (!key) { go.disabled = false; go.textContent = "Unlock"; msg.textContent = recovery ? "That recovery key didn't work." : "That passphrase didn't work."; return; }
    S.vault = { key, header: S.unlock }; S.unlock = null; S.screen = "loading"; render();
    await sync();
    afterFirstSync();
  }
  setTimeout(() => input.focus());
  return h("div", { class: "center" }, h("div", { class: "box" }, logo(), h("h1", {}, "Unlock your recipes"),
    h("p", { class: "muted" }, "Your data is encrypted. It's decrypted here in your browser and the key is forgotten when you close this tab."),
    input, msg, go, sw, h("button", { class: "link", onclick: signOut }, "Sign out")));
}
function syncText() {
  if (S.running) return "Syncing…";
  if (S.error) return S.error;
  if (Object.keys(S.bases).length) return "Saving…";
  return S.lastSync ? "Synced at " + new Date(S.lastSync).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) : "";
}
function paintSync() { const e = document.querySelector(".syncline"); if (e) { e.textContent = syncText(); e.classList.toggle("err", !!S.error && !S.running); } }
function shellView() {
  const tabs = [["cookbook", "Cookbook"], ["meals", "Meals"], ["grocery", "Grocery"], ["freezer", "Freezer"], ["settings", "Settings"]];
  const view = S.editing ? editorView() : S.tab === "cookbook" ? (S.recipe && recipeOf(S.recipe) ? recipeView(recipeOf(S.recipe)) : cookbookView())
    : ({ meals: mealsView, grocery: groceryView, freezer: freezerView, settings: settingsView })[S.tab]();
  return h("div", { class: "shell" },
    h("nav", { "aria-label": "Sections" }, h("div", { class: "brand" }, logo(), "Recipe Box"),
      tabs.map(([k, t]) => h("button", { "aria-current": S.tab === k ? "page" : null, onclick: () => { if (S.editing && !confirm("Discard this recipe's changes?")) return; S.editing = null; S.tab = k; S.recipe = null; render(); scrollTo(0, 0); } }, t)),
      h("div", { class: "syncline" + (S.error ? " err" : "") }, syncText())),
    h("main", {}, view));
}

function filtered() {
  const q = S.q.trim().toLowerCase();
  return S.data.recipes.filter((r) => (!S.book || r.cookbookUid === S.book) && (!S.cat || r.categoryUids?.includes(S.cat)) && (!S.fav || r.favorite)
    && (!q || r.title.toLowerCase().includes(q) || r.ingredients?.some((i) => i.toLowerCase().includes(q)))).sort(byTitle);
}
const PAGE = 60;
function cookbookView() {
  let shown = PAGE;
  const grid = h("div", { class: "grid" }), info = h("p", { class: "muted" }), more = h("button", { onclick: () => { shown += PAGE; fill(); } }, "Show more");
  const fill = () => {
    const all = filtered();
    grid.replaceChildren(...all.slice(0, shown).map(card));
    info.textContent = `${all.length} recipe${all.length === 1 ? "" : "s"}`;
    more.hidden = all.length <= shown;
  };
  const bookSel = h("select", { "aria-label": "Cookbook", onchange: (e) => { S.book = e.target.value; S.cat = ""; render(); } }, h("option", { value: "" }, "All cookbooks"),
    S.data.cookbooks.map((b) => h("option", { value: b.uid, selected: b.uid === S.book }, b.name)));
  const catSel = h("select", { "aria-label": "Category", onchange: (e) => { S.cat = e.target.value; shown = PAGE; fill(); } }, h("option", { value: "" }, "All categories"),
    catsOf(S.book).map((c) => h("option", { value: c.uid, selected: c.uid === S.cat }, c.name)));
  const view = h("div", {},
    h("div", { class: "head" }, h("h1", {}, "Cookbook"), h("button", { class: "primary", onclick: () => edit(null) }, "Add recipe")),
    h("div", { class: "filters" },
      h("input", { type: "search", placeholder: "Search recipes or ingredients", "aria-label": "Search", value: S.q, oninput: (e) => { S.q = e.target.value; shown = PAGE; fill(); } }),
      bookSel, catSel,
      h("label", { class: "chip" }, h("input", { type: "checkbox", checked: S.fav, onchange: (e) => { S.fav = e.target.checked; shown = PAGE; fill(); } }), "Favorites")),
    info, grid, h("p", {}, more));
  fill();
  return view;
}
function card(r) {
  const img = httpsImage(r.imageUrl);
  const mins = r.totalMinutes || ((r.prepMinutes || 0) + (r.cookMinutes || 0));
  const pic = img ? h("img", { src: img, alt: "", loading: "lazy", onerror: (e) => e.target.replaceWith(h("div", { class: "thumb" })) }) : h("div", { class: "thumb" });
  return h("button", { class: "card", onclick: () => { S.recipe = r.uid; S.scale = 1; render(); scrollTo(0, 0); } }, pic,
    h("div", { class: "t" }, (r.favorite ? "★ " : "") + r.title, mins ? h("small", {}, `${mins} min`) : null));
}
function recipeView(r) {
  const hidden = S.data.customization.hiddenFields || [];
  const img = httpsImage(r.imageUrl), src = safeUrl(r.sourceUrl);
  const scaled = (r.ingredients || []).map((l) => (l.startsWith("#") ? l : scaleLine(l, S.scale)));
  const cats = (r.categoryUids || []).map((c) => S.data.categories.find((x) => x.uid === c)?.name).filter(Boolean);
  const times = [["Prep", r.prepMinutes], ["Cook", r.cookMinutes], ["Total", r.totalMinutes]].filter(([, v]) => v).map(([k, v]) => `${k} ${v} min`).join(" · ");
  const fields = (S.data.customization.customFields || []).map((f) => [f, r.custom?.[f.id]]).filter(([, v]) => v?.trim());
  const showVal = (f, v) => (f.type === "yesno" ? (["yes", "y", "true", "1", "x", "✓", "✔"].includes(v.toLowerCase()) ? "Yes" : "No") : f.type === "number" && f.unit ? `${v} ${f.unit}` : v);
  return h("div", {},
    h("div", { class: "head noprint" }, h("button", { onclick: () => { S.recipe = null; render(); } }, "← Cookbook"),
      h("div", { class: "row" },
        h("button", { "aria-pressed": String(!!r.favorite), onclick: () => setRecipe({ ...r, favorite: !r.favorite }) }, r.favorite ? "★ Favorite" : "☆ Favorite"),
        h("button", { onclick: () => planDialog(r) }, "Plan"),
        h("button", { onclick: () => freezeDialog(r) }, "Freeze"),
        h("button", { onclick: () => print() }, "Print"),
        h("button", { onclick: () => edit(r) }, "Edit"),
        h("button", { class: "danger", onclick: () => { if (confirm(`Delete "${r.title}" on all your devices?`)) { S.recipe = null; deleteRecipe(r.uid); toast("Recipe deleted"); } } }, "Delete"))),
    img && !hidden.includes("photo") && h("img", { class: "hero", src: img, alt: "", onerror: (e) => e.target.remove() }),
    h("h1", {}, r.title),
    cats.length ? h("p", { class: "muted" }, cats.join(" · ")) : null,
    !hidden.includes("times") && times && h("p", { class: "muted" }, times),
    !hidden.includes("description") && r.description && h("p", { class: "pre" }, r.description),
    h("div", { class: "two" },
      h("section", { class: "panel" },
        h("div", { class: "row noprint" }, h("label", { class: "grow" }, "Scale", h("select", { onchange: (e) => { S.scale = +e.target.value; render(); } },
          [.5, 1, 1.5, 2, 3, 4].map((k) => h("option", { value: k, selected: k === S.scale }, `${k}× (${Math.round(r.servings * k * 10) / 10} servings)`))))),
        h("h2", {}, "Ingredients"),
        h("ul", { class: "plain" }, scaled.map((l) => (l.startsWith("#") ? h("li", { class: "sect" }, l.replace(/^#+\s*/, "")) : h("li", {}, l)))),
        h("p", { class: "noprint" }, h("button", { onclick: () => { addGrocery(scaled.filter((l) => !l.startsWith("#")).map((l) => groceryFrom(l, r.title))); toast("Added to grocery list"); } }, "Add to grocery list"))),
      h("section", { class: "panel" }, h("h2", {}, "Directions"),
        h("ol", {}, (r.directions || []).map((l) => (l.startsWith("#") ? h("li", { class: "sect" }, l.replace(/^#+\s*/, "")) : h("li", { class: "pre" }, l)))))),
    fields.length ? h("section", { class: "panel" }, fields.map(([f, v]) => h("p", {}, h("strong", {}, f.name + ": "), showVal(f, v)))) : null,
    !hidden.includes("notes") && r.notes && h("section", { class: "panel" }, h("h2", {}, "Notes"), h("p", { class: "pre" }, r.notes)),
    !hidden.includes("source") && src && h("p", { class: "noprint" }, h("a", { href: src, target: "_blank", rel: "noopener noreferrer" }, "Original recipe")));
}
function edit(r) {
  const book = S.book || S.data.cookbooks[0]?.uid;
  S.editing = r ? { ...r } : { uid: uid(), cookbookUid: book, title: "", description: "", sourceUrl: "", imageUrl: "", prepMinutes: null, cookMinutes: null, totalMinutes: null,
    servings: 4, ingredients: [], directions: [], notes: "", favorite: false, categoryUids: [], createdAt: 0, updatedAt: 0, isNew: true };
  render(); scrollTo(0, 0);
}
function editorView() {
  const r = S.editing, hide = S.data.customization.hiddenFields || [];
  const f = (label, el) => h("label", {}, label, el);
  const title = h("input", { value: r.title, required: true, maxlength: 300 });
  const desc = h("textarea", { value: r.description }), ing = h("textarea", { value: (r.ingredients || []).join("\n"), rows: 10 }), dir = h("textarea", { value: (r.directions || []).join("\n"), rows: 10 });
  const notes = h("textarea", { value: r.notes }), src = h("input", { type: "url", value: r.sourceUrl }), img = h("input", { type: "url", value: r.imageUrl });
  const prep = h("input", { type: "number", min: 0, value: r.prepMinutes ?? "" }), cook = h("input", { type: "number", min: 0, value: r.cookMinutes ?? "" }), total = h("input", { type: "number", min: 0, value: r.totalMinutes ?? "" });
  const servings = h("input", { type: "number", min: .25, step: .25, value: r.servings });
  const picked = new Set(r.categoryUids || []);
  const chipBox = h("div", { class: "chips" });
  const fillCats = (bookId) => chipBox.replaceChildren(...catsOf(bookId).map((c) => h("label", { class: "chip" },
    h("input", { type: "checkbox", checked: picked.has(c.uid), onchange: (e) => (e.target.checked ? picked.add(c.uid) : picked.delete(c.uid)) }), c.name)));
  const book = h("select", { onchange: (e) => { picked.clear(); fillCats(e.target.value); } }, S.data.cookbooks.map((b) => h("option", { value: b.uid, selected: b.uid === r.cookbookUid }, b.name)));
  fillCats(r.cookbookUid);
  const defs = S.data.customization.customFields || [];
  const customInputs = defs.map((d) => {
    const v = r.custom?.[d.id] || "";
    const el = d.type === "yesno" ? h("select", {}, h("option", { value: "" }, "—"), h("option", { value: "yes", selected: !!v }, "Yes"))
      : d.type === "choice" ? h("select", {}, h("option", { value: "" }, "—"), [...new Set([...d.options, ...(v ? [v] : [])])].map((o) => h("option", { value: o, selected: o === v }, o)))
      : h("input", { type: d.type === "number" ? "number" : "text", step: "any", value: v });
    return [d, el];
  });
  const err = h("p", { class: "err", role: "alert" });
  const save = () => {
    const t = title.value.trim();
    if (!t) { err.textContent = "Give the recipe a title."; title.focus(); return; }
    const s = parseFloat(servings.value);
    const { isNew, ...base } = r;
    const values = { ...(r.custom || {}) };
    for (const [d, el] of customInputs) { if (el.value.trim()) values[d.id] = el.value.trim(); else delete values[d.id]; }
    const custom = Object.keys(values).length || r.custom != null ? values : r.custom;
    const next = { ...base, cookbookUid: book.value, title: t, description: desc.value.trim(), sourceUrl: src.value.trim(), imageUrl: img.value.trim(),
      prepMinutes: num(prep.value), cookMinutes: num(cook.value), totalMinutes: num(total.value), servings: s > 0 ? s : 4,
      ingredients: lines(ing.value), directions: lines(dir.value), notes: notes.value.trim(), categoryUids: [...picked] };
    if (custom !== undefined) next.custom = custom;
    S.editing = null; S.recipe = next.uid; S.scale = 1; S.tab = "cookbook";
    setRecipe(next); toast("Recipe saved");
  };
  return h("div", {},
    h("div", { class: "head" }, h("h1", {}, r.isNew ? "Add recipe" : "Edit recipe"),
      h("div", { class: "row" }, h("button", { onclick: () => { S.editing = null; render(); } }, "Cancel"), h("button", { class: "primary", onclick: save }, "Save"))),
    err,
    h("section", { class: "panel" }, f("Title", title),
      h("div", { class: "formgrid" }, f("Cookbook", book), f("Servings", servings),
        !hide.includes("times") && [f("Prep (min)", prep), f("Cook (min)", cook), f("Total (min)", total)]),
      h("label", {}, "Categories"), chipBox,
      !hide.includes("description") && f("Description", desc),
      f("Ingredients (one per line)", ing), f("Directions (one step per line)", dir),
      !hide.includes("notes") && f("Notes", notes), !hide.includes("source") && f("Source link", src), !hide.includes("photo") && f("Photo link", img),
      customInputs.map(([d, el]) => f(d.name + (d.unit ? ` (${d.unit})` : ""), el))));
}

function dialog(title, body, okText, onOk) {
  const d = h("dialog", {});
  const close = () => { d.close(); d.remove(); if (S.screen === "app") render(); };
  d.append(h("h2", {}, title), ...[body].flat(), h("div", { class: "actions" }, h("button", { onclick: close }, "Cancel"),
    h("button", { class: "primary", onclick: () => { if (onOk() !== false) close(); } }, okText)));
  d.addEventListener("cancel", (e) => { e.preventDefault(); close(); });
  document.body.append(d); d.showModal();
}
function recipePicker(initial) {
  const cat = h("select", { onchange: fill }, h("option", { value: "" }, "All categories"), catsOf("").map((c) => h("option", { value: c.uid }, c.name)));
  const search = h("input", { type: "search", placeholder: "Filter recipes", oninput: fill });
  const sel = h("select", {});
  function fill() {
    const q = search.value.trim().toLowerCase(), cur = sel.value || initial || "";
    const list = S.data.recipes.filter((r) => (!cat.value || r.categoryUids?.includes(cat.value)) && (!q || r.title.toLowerCase().includes(q))).sort(byTitle);
    sel.replaceChildren(h("option", { value: "" }, "No recipe (type a title below)"), ...list.map((r) => h("option", { value: r.uid, selected: r.uid === cur }, r.title)));
  }
  fill();
  return { sel, els: [h("label", {}, "Category", cat), h("label", {}, "Find a recipe", search), h("label", {}, "Recipe", sel)] };
}
function planDialog(r, date) {
  const dt = h("input", { type: "date", value: date || iso(new Date()) });
  const type = h("select", {}, MEAL_TYPES.map((m) => h("option", { selected: m === "Dinner" }, m)));
  const pick = r ? null : recipePicker();
  const title = h("input", { placeholder: "e.g. Leftovers" });
  const err = h("p", { class: "err", role: "alert" });
  dialog(r ? `Plan ${r.title}` : "Plan a meal", [h("div", { class: "formgrid" }, h("label", {}, "Date", dt), h("label", {}, "Meal", type)), pick?.els, !r && h("label", {}, "Or a title", title), err].flat().filter(Boolean), "Add", () => {
    const id = r?.uid || pick.sel.value;
    if (!dt.value) { err.textContent = "Pick a date."; return false; }
    if (!id && !title.value.trim()) { err.textContent = "Pick a recipe or type a title."; return false; }
    addMeal(dt.value, type.value, id, id ? "" : title.value, id ? recipeOf(id).servings : null);
    toast("Added to meal plan");
  });
}
function freezeDialog(r) {
  const name = h("input", { value: r?.title || "" }), portions = h("input", { type: "number", min: 1, value: 2 }), made = h("input", { type: "date", value: iso(new Date()) });
  const err = h("p", { class: "err", role: "alert" });
  dialog("Add to freezer", [h("label", {}, "What is it?", name), h("div", { class: "formgrid" }, h("label", {}, "Portions", portions), h("label", {}, "Made on", made)), err], "Add", () => {
    const n = parseInt(portions.value, 10), nm = name.value.trim();
    if (!nm || !(n > 0) || !made.value) { err.textContent = "Add a name, portions and date."; return false; }
    const madeOn = fromIso(made.value).getTime();
    const same = S.data.freezer.find((f) => f.name.toLowerCase() === nm.toLowerCase() && (f.recipeUid ?? null) === (r?.uid ?? null) && iso(new Date(f.madeOn)) === made.value);
    if (same) patch("freezer", same.uid, { portions: same.portions + n });
    else update((d) => ({ ...d, freezer: [...d.freezer, { uid: uid(), name: nm, recipeUid: r?.uid ?? null, portions: n, madeOn, notes: "", updatedAt: now() }] }));
    toast("Added to freezer");
  });
}

function mealsView() {
  const days = Array.from({ length: 7 }, (_, i) => addDays(S.weekStart, i)), today = iso(new Date());
  const week = S.data.meals.filter((m) => m.date >= iso(days[0]) && m.date <= iso(days[6]));
  const label = `${days[0].toLocaleDateString([], { month: "short", day: "numeric" })} – ${days[6].toLocaleDateString([], { month: "short", day: "numeric" })}`;
  const toGrocery = () => {
    const items = week.filter((m) => m.recipeUid && !m.made).flatMap((m) => {
      const x = recipeOf(m.recipeUid); if (!x) return [];
      const k = m.servings && x.servings ? m.servings / x.servings : 1;
      return (x.ingredients || []).filter((l) => !l.startsWith("#")).map((l) => groceryFrom(scaleLine(l, k), x.title));
    });
    if (!items.length) return toast("No planned recipes this week");
    addGrocery(items); toast(`Added ${items.length} items to grocery list`);
  };
  return h("div", {},
    h("div", { class: "head" }, h("h1", {}, "Meals"),
      h("div", { class: "row" }, h("button", { onclick: toGrocery }, "Week to grocery list"), h("button", { class: "primary", onclick: () => planDialog() }, "Plan a meal"))),
    h("div", { class: "row", style: null }, h("button", { "aria-label": "Previous week", onclick: () => { S.weekStart = addDays(S.weekStart, -7); render(); } }, "←"),
      h("strong", {}, label), h("button", { "aria-label": "Next week", onclick: () => { S.weekStart = addDays(S.weekStart, 7); render(); } }, "→"),
      h("button", { onclick: () => { S.weekStart = mondayOf(new Date()); render(); } }, "This week")),
    h("p", {}),
    h("div", { class: "week" }, days.map((d) => {
      const key = iso(d), list = week.filter((m) => m.date === key).sort((a, b) => MEAL_TYPES.indexOf(a.meal) - MEAL_TYPES.indexOf(b.meal) || a.sortOrder - b.sortOrder);
      return h("section", { class: "day" + (key === today ? " today" : "") },
        h("h3", {}, d.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" }), h("button", { class: "icon", "aria-label": `Plan a meal on ${key}`, onclick: () => planDialog(null, key) }, "+")),
        list.length ? list.map((m) => {
          const x = m.recipeUid && recipeOf(m.recipeUid), name = x?.title || m.title || "Meal";
          return h("div", { class: "item" + (m.made ? " done" : "") },
            h("input", { type: "checkbox", checked: m.made, "aria-label": `Made ${name}`, onchange: (e) => patch("meals", m.uid, { made: e.target.checked }) }),
            h("div", { class: "body" }, h("small", { class: "muted" }, m.meal), h("div", { class: "name" }, x ? h("a", { href: "#", onclick: (e) => { e.preventDefault(); S.tab = "cookbook"; S.recipe = x.uid; S.scale = 1; render(); scrollTo(0, 0); } }, name) : name)),
            h("button", { class: "icon danger", "aria-label": `Remove ${name}`, onclick: () => remove("meals", "meal", [m.uid]) }, "×"));
        }) : h("p", { class: "muted" }, "Nothing planned"));
    })));
}
function groceryView() {
  const input = h("input", { placeholder: "Add items, separated by commas", "aria-label": "Add grocery items" });
  const add = () => {
    const parts = input.value.split(/[\n,]/).map((s) => s.trim()).filter(Boolean);
    if (parts.length) { addGrocery(parts.map((p) => groceryFrom(p, ""))); setTimeout(() => document.querySelector('[aria-label="Add grocery items"]')?.focus()); }
  };
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") add(); });
  const items = [...S.data.grocery].sort((a, b) => a.checked - b.checked || a.name.localeCompare(b.name));
  const done = items.filter((i) => i.checked);
  return h("div", {},
    h("div", { class: "head" }, h("h1", {}, "Grocery"), done.length ? h("button", { onclick: () => remove("grocery", "grocery", done.map((i) => i.uid)) }, `Clear ${done.length} checked`) : null),
    h("div", { class: "row" }, h("div", { class: "grow" }, input), h("button", { class: "primary", onclick: add }, "Add")), h("p", {}),
    h("section", { class: "panel" }, items.length ? items.map((i) => h("div", { class: "item" + (i.checked ? " done" : "") },
      h("input", { type: "checkbox", checked: i.checked, "aria-label": i.name, onchange: (e) => patch("grocery", i.uid, { checked: e.target.checked }) }),
      h("div", { class: "body" }, h("span", { class: "name" }, (i.quantity ? i.quantity + " " : "") + i.name), i.recipe ? h("div", {}, h("small", { class: "muted" }, i.recipe)) : null),
      h("button", { class: "icon danger", "aria-label": `Remove ${i.name}`, onclick: () => remove("grocery", "grocery", [i.uid]) }, "×"))) : h("p", { class: "muted" }, "Your grocery list is empty.")));
}
function freezerView() {
  const items = [...S.data.freezer].sort((a, b) => a.madeOn - b.madeOn);
  return h("div", {},
    h("div", { class: "head" }, h("h1", {}, "Freezer"), h("button", { class: "primary", onclick: () => freezeDialog(null) }, "Add leftovers")),
    h("section", { class: "panel" }, items.length ? items.map((f) => h("div", { class: "item" },
      h("div", { class: "body" }, h("strong", {}, f.name), h("div", {}, h("small", { class: "muted" }, "Made " + new Date(f.madeOn).toLocaleDateString()))),
      h("button", { class: "icon", "aria-label": `One less ${f.name}`, onclick: () => changeFreezer(f, -1) }, "−"), h("strong", {}, f.portions),
      h("button", { class: "icon", "aria-label": `One more ${f.name}`, onclick: () => changeFreezer(f, 1) }, "+"))) : h("p", { class: "muted" }, "Nothing in the freezer.")));
}
function settingsView() {
  return h("div", {}, h("div", { class: "head" }, h("h1", {}, "Settings")),
    h("section", { class: "panel" }, h("h2", {}, "Account"), S.name && h("p", {}, S.name), h("p", { class: "muted" }, S.email), h("button", { onclick: signOut }, "Sign out")),
    h("section", { class: "panel" }, h("h2", {}, "Sync"), h("p", {}, syncText()), h("p", { class: "muted" }, "Google Drive › Recipe Box › " + FILE_NAME), h("button", { onclick: sync }, "Sync now")),
    h("section", { class: "panel" }, h("h2", {}, "Privacy"),
      h("p", {}, S.vault.key ? "End-to-end encryption is on. Your data is decrypted only in this tab, and the key is forgotten when you close it." : "End-to-end encryption is off. Turn it on in the Android or Mac app."),
      h("p", { class: "muted" }, "Recipes aren't stored in this browser. Imports, categories, custom fields and encryption settings are managed in the Android and Mac apps.")));
}

render();
