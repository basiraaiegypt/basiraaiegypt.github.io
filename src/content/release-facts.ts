/**
 * The rows of the "what you are downloading" table, as data.
 *
 * Each row says how to read one value out of the release manifest. A row whose
 * value comes back null is dropped, which is how an APK that does not declare,
 * say, a minimum Android version simply shows one row fewer instead of a blank.
 * Adding a row is an entry here; `ReleaseFacts` renders whatever it finds.
 */

import type {ReleaseManifest} from '../../shared/release.ts';
import {formatAndroidVersion, formatDate, formatFileSize, shortenHash} from '../lib/format.ts';

export interface ReleaseFact {
  readonly id: string;
  readonly label: string;
  /** The text to show, or null to leave this row out. */
  readonly value: (release: ReleaseManifest) => string | null;
  /** The untruncated value for the copy button. Omit for rows with nothing to copy. */
  readonly copyValue?: (release: ReleaseManifest) => string;
  /** True for values read character by character, such as a checksum. */
  readonly monospace?: boolean;
}

export const RELEASE_FACTS: readonly ReleaseFact[] = [
  {
    id: 'version',
    label: 'Version',
    value: (release) =>
      release.versionName === null
        ? null
        : `${release.versionName} (build ${release.versionCode ?? '—'})`,
  },
  {
    id: 'size',
    label: 'Size',
    value: (release) => formatFileSize(release.sizeBytes),
  },
  {
    id: 'requires',
    label: 'Requires',
    value: (release) =>
      release.minSdkVersion === null
        ? null
        : `${formatAndroidVersion(release.minSdkVersion)} or newer`,
  },
  {
    id: 'built',
    label: 'Released',
    value: (release) => formatDate(release.builtAt),
  },
  {
    id: 'package',
    label: 'Package',
    value: (release) => release.packageId,
    monospace: true,
  },
  {
    id: 'sha256',
    label: 'SHA-256',
    value: (release) => shortenHash(release.sha256),
    copyValue: (release) => release.sha256,
    monospace: true,
  },
] as const;
