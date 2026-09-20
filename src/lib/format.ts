/** Turns raw manifest values into the strings a person reads. */

const BYTES_PER_MB = 1024 * 1024;

/** File size as megabytes, e.g. `46.7 MB`. APKs are always in this range. */
export function formatFileSize(bytes: number): string {
  return `${(bytes / BYTES_PER_MB).toFixed(1)} MB`;
}

/** Build date as e.g. `20 September 2026`. */
export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/** A checksum shortened for display; the full value is still what gets copied. */
export function shortenHash(hash: string): string {
  return `${hash.slice(0, 8)}…${hash.slice(-8)}`;
}

/** Android's marketing name for an API level, so `24` reads as `Android 7.0`. */
export function formatAndroidVersion(sdkVersion: number): string {
  return ANDROID_RELEASE_NAMES[sdkVersion] ?? `API level ${sdkVersion}`;
}

/**
 * API level to Android version. Only levels a current app would target are
 * listed; anything else falls back to showing the raw level.
 */
const ANDROID_RELEASE_NAMES: Readonly<Record<number, string>> = {
  21: 'Android 5.0',
  22: 'Android 5.1',
  23: 'Android 6.0',
  24: 'Android 7.0',
  25: 'Android 7.1',
  26: 'Android 8.0',
  27: 'Android 8.1',
  28: 'Android 9',
  29: 'Android 10',
  30: 'Android 11',
  31: 'Android 12',
  32: 'Android 12L',
  33: 'Android 13',
  34: 'Android 14',
  35: 'Android 15',
  36: 'Android 16',
};
