/**
 * What the site and the build tooling both need to know about the release.
 *
 * The tooling writes `release-manifest.json`; the page reads it. Both import
 * this file, so the writer and the reader cannot drift apart. Nothing here
 * touches the file system, because the browser loads it too.
 *
 * Paths here are written *relative to the site root*, with no leading slash.
 * That is deliberate: the site may be served from a subfolder (GitHub Pages
 * puts a project site at `/<repo>/`), and a leading slash would point outside
 * it. The browser turns these into real URLs with `siteUrl()`.
 */

/** Folder inside `public/` that holds the APK. Drop a new build there to publish it. */
export const DOWNLOAD_DIR_NAME = 'download';

/** Generated file describing the APK. Sits next to it. */
export const MANIFEST_FILE_NAME = 'release-manifest.json';

/**
 * What the published APK is called, whatever the build tool named it.
 *
 * A build straight out of Flutter is `app-release.apk`, which tells a visitor
 * nothing once it is sitting in their downloads folder. The build renames it to
 * this, and the download button hands the same name to the browser, so the file
 * they save and the file on the server agree.
 */
export const PUBLISHED_APK_NAME = 'basira-ai.apk';

/** Where the page finds the manifest, relative to the site root. */
export const MANIFEST_PATH_FROM_ROOT = `${DOWNLOAD_DIR_NAME}/${MANIFEST_FILE_NAME}`;

/** Where an APK of this name sits, relative to the site root. */
export function toDownloadPath(fileName: string): string {
  return `${DOWNLOAD_DIR_NAME}/${encodeURIComponent(fileName)}`;
}

/** Everything the site knows about the APK currently sitting in the download folder. */
export interface ReleaseManifest {
  /** Bumped when the fields below change shape, so an old cached file is spotted. */
  readonly schema: 1;
  /** Path to the APK from the site root, e.g. `download/app-release.apk`. */
  readonly downloadPath: string;
  /** File name as it sits on disk, e.g. `app-release.apk`. */
  readonly fileName: string;
  /** Size in bytes. Formatted for humans on the page, not here. */
  readonly sizeBytes: number;
  /** SHA-256 of the file, lowercase hex, so people can verify what they downloaded. */
  readonly sha256: string;
  /** When the APK file was last written, as an ISO date string. */
  readonly builtAt: string;
  /** `versionName` from the APK manifest, e.g. `1.0.0`. Null if it could not be read. */
  readonly versionName: string | null;
  /** `versionCode` from the APK manifest, e.g. `1`. Null if it could not be read. */
  readonly versionCode: number | null;
  /** Android package id, e.g. `com.basira.ai.basira_ai`. Null if it could not be read. */
  readonly packageId: string | null;
  /** Lowest Android SDK level the APK installs on. Null if it could not be read. */
  readonly minSdkVersion: number | null;
}
