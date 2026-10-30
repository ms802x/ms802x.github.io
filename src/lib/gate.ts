import { createHash } from 'node:crypto';

const password =
  (import.meta.env.SITE_PASSWORD as string | undefined) ||
  process.env.SITE_PASSWORD ||
  'aalhejab';

export const SITE_GATE_ENABLED = (import.meta.env.SITE_GATE as string | undefined) !== 'false';

/** Only the hash is sent to the browser. The password itself stays at build time. */
export const SITE_GATE_HASH = createHash('sha256').update(password).digest('hex');
export const SITE_GATE_KEY = 'aalhejab-gate';
