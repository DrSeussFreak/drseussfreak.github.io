// Firebase sign-in and the Cloud Library. Guests never load this SDK or contact Google.
import { LIBRARY_LIMIT, buildMosaicDoc, parseMosaic } from './cloud-model.js';

// Public client identifiers. Access is enforced by Firebase Auth and firestore.rules.
const FIREBASE_CONFIG = Object.freeze({
  apiKey: 'AIzaSyBnLxOPdFt0tYBMDWytpljHoQoG11x8spo',
  authDomain: 'studcraft-cf85b.firebaseapp.com',
  projectId: 'studcraft-cf85b',
  storageBucket: 'studcraft-cf85b.firebasestorage.app',
  messagingSenderId: '75791561600',
  appId: '1:75791561600:web:891f829c8e42d8ebc50765',
});

/** Holds no identity: it only tells the next page load to restore a saved Firebase session. */
export const SESSION_HINT = 'studcraft.hasAccount';

export function createCloud({ storage, onUser }) {
  let ready = null;
  let sdk = null;
  let auth = null;
  let db = null;

  const hint = {
    read() { try { return storage?.getItem(SESSION_HINT) === '1'; } catch { return false; } },
    write(on) {
      try {
        if (on) storage?.setItem(SESSION_HINT, '1');
        else storage?.removeItem(SESSION_HINT);
      } catch { /* blocked storage only means the session is restored on the next click */ }
    },
  };

  function load() {
    ready ??= (async () => {
      sdk = await import('./firebase.js');
      sdk.setLogLevel('silent');
      const app = sdk.initializeApp(FIREBASE_CONFIG);
      auth = sdk.initializeAuth(app, {
        persistence: [sdk.indexedDBLocalPersistence, sdk.browserLocalPersistence],
        popupRedirectResolver: sdk.browserPopupRedirectResolver,
      });
      db = sdk.getFirestore(app);
      await auth.authStateReady();
      sdk.onAuthStateChanged(auth, (user) => {
        hint.write(Boolean(user));
        onUser(user);
      });
    })().catch((error) => { ready = null; throw error; });
    return ready;
  }

  const currentUid = () => auth?.currentUser?.uid ?? null;

  function requireUid() {
    const uid = currentUid();
    if (!uid) throw Object.assign(new Error('signed out'), { code: 'unauthenticated' });
    return uid;
  }

  const mosaics = (uid) => sdk.collection(db, 'users', uid, 'mosaics');

  return {
    hasSessionHint: () => hint.read(),
    /** Restores a remembered session, or prepares the SDK so the sign-in window opens promptly. */
    prepare: load,

    async signIn() {
      await load();
      if (auth.currentUser) return;
      // Basic identity only: no addScope call, so Google is asked for name, email, and profile alone.
      const provider = new sdk.GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      await sdk.signInWithPopup(auth, provider, sdk.browserPopupRedirectResolver);
    },

    async signOut() {
      if (auth) await sdk.signOut(auth);
      hint.write(false);
    },

    /** Returns usable items plus a count of stored documents that failed validation. */
    async list() {
      const uid = requireUid();
      const snap = await sdk.getDocs(sdk.query(mosaics(uid), sdk.orderBy('updatedAt', 'desc'), sdk.limit(LIBRARY_LIMIT)));
      if (currentUid() !== uid) return null;
      const items = [];
      let unreadable = 0;
      snap.forEach((entry) => {
        const item = parseMosaic(entry.id, entry.data());
        if (item) items.push(item); else unreadable += 1;
      });
      return { items, unreadable };
    },

    async save(fields) {
      const uid = requireUid();
      const ref = sdk.doc(mosaics(uid));
      await sdk.setDoc(ref, buildMosaicDoc({ ...fields, uid, timestamp: sdk.serverTimestamp() }));
    },

    async remove(id) {
      const uid = requireUid();
      await sdk.deleteDoc(sdk.doc(db, 'users', uid, 'mosaics', id));
    },
  };
}
