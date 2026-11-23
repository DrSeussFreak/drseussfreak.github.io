// Backs up the one studcraft-settings.vault in Drive. The vault format itself is in settings-vault.js.
import { FILE_NAME, MAX_FILE_BYTES } from './settings-vault.js';

const SEEN = 'vaultRevision';

export class StaleBackupError extends Error {
  constructor(file) { super('A different backup is in Google Drive.'); this.file = file; }
}

export const revisionOf = (file) => file?.headRevisionId ?? (file?.version === undefined ? null : `v${file.version}`);

/**
 * Updates the single vault in place. If Drive holds a revision this device has not seen, nothing is written
 * unless the person explicitly chose to replace it.
 */
export async function backupVault({ drive, kv, bytes, replace = false }) {
  const existing = await drive.findVault(FILE_NAME);
  if (existing) {
    const seen = await kv.get(SEEN);
    if (!replace && seen !== revisionOf(existing)) throw new StaleBackupError(existing);
  }
  const saved = existing ? await drive.updateVault(existing.id, bytes) : await drive.createVault(FILE_NAME, bytes);
  await kv.set(SEEN, revisionOf(saved));
  return saved;
}

/** Returns null when no backup exists. Nothing is recorded until the restore is confirmed. */
export async function fetchVault({ drive }) {
  const file = await drive.findVault(FILE_NAME);
  if (!file) return null;
  return { file, bytes: await drive.read(file.id, { maxBytes: MAX_FILE_BYTES }) };
}

export const markVaultRestored = (kv, file) => kv.set(SEEN, revisionOf(file));
