// Browser services for the Kotlin app: Google sign-in, HTTP, files, and the screen wake lock.
window.ctWeb = (() => {
  // Public OAuth "Web application" client id (not a secret); only works from the GitHub Pages origin.
  const CLIENT_ID = '759520526790-bd4mtclilpfrugeb8lpg267kb068lc51.apps.googleusercontent.com';
  const SCOPES = 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';
  let unsaved = false;
  let wantWake = false;
  let wakeLock = null;

  addEventListener('beforeunload', e => { if (unsaved) { e.preventDefault(); e.returnValue = ''; } });

  async function acquireWake() {
    if (!wantWake || wakeLock || !navigator.wakeLock || document.visibilityState !== 'visible') return;
    try {
      wakeLock = await navigator.wakeLock.request('screen');
      wakeLock.addEventListener('release', () => { wakeLock = null; });
    } catch (_) { /* not allowed right now */ }
  }
  document.addEventListener('visibilitychange', acquireWake);

  // Google only opens its token window from a click or key press, so wait for the next one.
  let pending = null;
  function stopWaiting() {
    if (!pending) return null;
    const p = pending;
    pending = null;
    removeEventListener('pointerup', p.onGesture, true);
    removeEventListener('keydown', p.onGesture, true);
    p.banner.remove();
    return p;
  }

  const api = {
    waitForGesture(hint) {
      stopWaiting()?.resolve(null);
      return new Promise(resolve => {
        const banner = document.createElement('button');
        banner.textContent = 'Click to reconnect to Google';
        banner.style.cssText = 'position:fixed;z-index:10;left:50%;transform:translateX(-50%);bottom:calc(92px + env(safe-area-inset-bottom));' +
          'max-width:calc(100vw - 32px);padding:12px 20px;border:0;border-radius:24px;background:#8fd6a0;color:#10301c;font:600 15px system-ui,sans-serif;cursor:pointer;box-shadow:0 2px 10px #0008';
        const onGesture = () => {
          stopWaiting();
          api.requestToken(hint).then(resolve, () => resolve(null));
        };
        pending = { resolve, onGesture, banner };
        addEventListener('pointerup', onGesture, true);
        addEventListener('keydown', onGesture, true);
        document.body.appendChild(banner);
      });
    },
    cancelWait() { stopWaiting()?.resolve(null); },
    ready() { document.getElementById('loading')?.remove(); },
    isDemo() { return new URLSearchParams(location.search).has('demo'); },
    today() {
      const d = new Date();
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    },
    nowTime() {
      const d = new Date();
      return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    },
    getItem(k) { try { return localStorage.getItem('cannatrack.' + k); } catch (_) { return null; } },
    setItem(k, v) {
      try { v == null ? localStorage.removeItem('cannatrack.' + k) : localStorage.setItem('cannatrack.' + k, v); } catch (_) {}
    },
    setUnsaved(v) { unsaved = v; },
    openUrl(u) { window.open(u, '_blank', 'noopener'); },
    setWake(on) {
      wantWake = on;
      if (on) acquireWake(); else if (wakeLock) wakeLock.release();
    },

    requestToken(hint) {
      return new Promise((resolve, reject) => {
        if (!CLIENT_ID) return reject(new Error('Google sign-in is not set up for the web version yet'));
        if (!window.google?.accounts?.oauth2) return reject(new Error('Could not load Google sign-in. Check for a blocker and reload.'));
        const client = google.accounts.oauth2.initTokenClient({
          client_id: CLIENT_ID, scope: SCOPES, hint: hint || undefined,
          callback: r => {
            if (r.error) return reject(new Error(r.error_description || r.error));
            if (!google.accounts.oauth2.hasGrantedAllScopes(r, 'https://www.googleapis.com/auth/drive.file'))
              return reject(new Error('CannaTrack needs Drive access to sync. Sign in again and allow it.'));
            resolve({ token: r.access_token, expiresIn: Number(r.expires_in) || 3600 });
          },
          error_callback: e => e.type === 'popup_closed' ? resolve(null)
            : reject(new Error(e.type === 'popup_failed_to_open' ? 'Your browser blocked the Google sign-in window. Allow pop-ups and try again.' : (e.message || e.type))),
        });
        client.requestAccessToken({ prompt: hint ? '' : 'select_account' });
      });
    },

    async http(method, url, headersJson, body) {
      const r = await fetch(url, { method, headers: JSON.parse(headersJson), body: body ?? undefined, cache: 'no-store' });
      return { status: r.status, text: await r.text() };
    },

    download(name, contents, mime) {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([contents], { type: mime || 'application/octet-stream' }));
      a.download = name;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 30000);
    },

    downloadBytes(name, bytes, mime) { api.download(name, bytes, mime); },

    pickFile() {
      return new Promise((resolve, reject) => {
        const i = document.createElement('input');
        i.type = 'file';
        i.addEventListener('cancel', () => resolve(null));
        i.addEventListener('change', async () => {
          const f = i.files?.[0];
          if (!f) return resolve(null);
          try { resolve({ name: f.name, bytes: new Uint8Array(await f.arrayBuffer()) }); } catch (e) { reject(e); }
        });
        i.click();
      });
    },

    // The .xml parts of an Office/OpenDocument file, as a JSON object of name → text.
    async unzipXml(bytes) {
      const v = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
      let end = -1;
      for (let i = bytes.length - 22; i >= Math.max(0, bytes.length - 65557); i--) if (v.getUint32(i, true) === 0x06054b50) { end = i; break; }
      if (end < 0) throw new Error('Not a readable zip file');
      const count = v.getUint16(end + 10, true);
      let p = v.getUint32(end + 16, true);
      const utf8 = new TextDecoder();
      const out = {};
      for (let n = 0; n < count; n++) {
        if (v.getUint32(p, true) !== 0x02014b50) throw new Error('Damaged zip file');
        const method = v.getUint16(p + 10, true), size = v.getUint32(p + 20, true);
        const nameLen = v.getUint16(p + 28, true), extra = v.getUint16(p + 30, true), comment = v.getUint16(p + 32, true);
        const local = v.getUint32(p + 42, true);
        const name = utf8.decode(bytes.subarray(p + 46, p + 46 + nameLen));
        p += 46 + nameLen + extra + comment;
        if (!name.endsWith('.xml')) continue;
        const start = local + 30 + v.getUint16(local + 26, true) + v.getUint16(local + 28, true);
        const part = bytes.subarray(start, start + size);
        if (method === 0) out[name] = utf8.decode(part);
        else if (method === 8) out[name] = await new Response(new Blob([part]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).text();
      }
      return JSON.stringify(out);
    },
  };
  return api;
})();
