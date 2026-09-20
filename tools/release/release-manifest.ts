/**
 * Keeps `release-manifest.json` in step with whatever APK is in the download folder.
 *
 * This is the choke point for that job: the CLI and the Vite plugin both call
 * `writeReleaseManifest`, so there is no second path that could write a manifest
 * a different way.
 */

import {readdir, writeFile} from 'node:fs/promises';
import path from 'node:path';

import {DOWNLOAD_DIR_NAME, type ReleaseManifest} from '../../shared/release.ts';
import {describeApk} from './apk-descriptor.ts';
import {DOWNLOAD_DIR, MANIFEST_PATH} from './release-paths.ts';

const APK_EXTENSION = '.apk';

/**
 * Describes the APK in the download folder and writes the manifest next to it.
 * Returns what was written so callers can log it.
 */
export async function writeReleaseManifest(): Promise<ReleaseManifest> {
  const manifest = await describeApk(await findSingleApk());
  await writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  return manifest;
}

/**
 * Finds the one APK to publish.
 *
 * Exactly one is required on purpose. With none there is nothing to offer, and
 * with several there is no honest way to pick, so both cases stop with a message
 * that says what to do rather than shipping a stale or arbitrary download.
 */
async function findSingleApk(): Promise<string> {
  const entries = await readdir(DOWNLOAD_DIR).catch(() => {
    throw new Error(`Download folder is missing: public/${DOWNLOAD_DIR_NAME}/`);
  });
  const apks = entries.filter((name) => name.toLowerCase().endsWith(APK_EXTENSION));

  if (apks.length === 0) {
    throw new Error(`No .apk found in public/${DOWNLOAD_DIR_NAME}/. Put the build there.`);
  }
  if (apks.length > 1) {
    throw new Error(
      `public/${DOWNLOAD_DIR_NAME}/ holds ${apks.length} APKs (${apks.join(', ')}). ` +
        'Leave only the one to publish.',
    );
  }

  return path.join(DOWNLOAD_DIR, apks[0]);
}
