/**
 * Turns one APK file into the record the website displays.
 *
 * Two kinds of fact go in: what the file system knows (name, size, date, hash)
 * and what the APK's own manifest declares (version, package, min Android).
 * The manifest part is best-effort — if an APK is built in some way this decoder
 * cannot read, those fields come back null and the page just shows less.
 */

import {createHash} from 'node:crypto';
import {readFile, stat} from 'node:fs/promises';
import path from 'node:path';

import {toDownloadPath, type ReleaseManifest} from '../../shared/release.ts';
import {readAndroidManifest, type AndroidManifestInfo} from './android-manifest.ts';
import {readZipEntry} from './zip-archive.ts';

/** Path of the manifest inside every APK. */
const MANIFEST_ENTRY = 'AndroidManifest.xml';

/** Used when the APK's manifest cannot be read, so callers get the same shape either way. */
const UNKNOWN_MANIFEST: AndroidManifestInfo = {
  packageId: null,
  versionName: null,
  versionCode: null,
  minSdkVersion: null,
};

/** Reads an APK from disk and describes it for the download page. */
export async function describeApk(apkPath: string): Promise<ReleaseManifest> {
  const [contents, stats] = await Promise.all([readFile(apkPath), stat(apkPath)]);
  const fileName = path.basename(apkPath);

  return {
    schema: 1,
    downloadPath: toDownloadPath(fileName),
    fileName,
    sizeBytes: stats.size,
    sha256: createHash('sha256').update(contents).digest('hex'),
    builtAt: stats.mtime.toISOString(),
    ...tryReadManifest(contents),
  };
}

/**
 * Pulls the version fields out of the APK, returning blanks instead of throwing.
 * A download page that shows no version number is still useful; one that fails
 * the whole build over an odd APK is not.
 */
function tryReadManifest(apkContents: Buffer): AndroidManifestInfo {
  try {
    const binaryXml = readZipEntry(apkContents, MANIFEST_ENTRY);
    return binaryXml === null ? UNKNOWN_MANIFEST : readAndroidManifest(binaryXml);
  } catch {
    return UNKNOWN_MANIFEST;
  }
}
