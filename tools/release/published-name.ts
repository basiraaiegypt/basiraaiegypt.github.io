/**
 * Gives the APK in the download folder its published name.
 *
 * Renaming it here, rather than by hand while copying the build in, is what
 * makes the name a rule instead of something to remember. Drop in whatever
 * `flutter build apk` produced and the published file still comes out the same.
 */

import {rename} from 'node:fs/promises';
import path from 'node:path';

import {PUBLISHED_APK_NAME} from '../../shared/release.ts';

/**
 * Renames the APK if it is not already called the published name, and says
 * where it ended up. A file that is already named right is left alone, so
 * building twice in a row does nothing the second time.
 */
export async function usePublishedName(apkPath: string): Promise<string> {
  if (path.basename(apkPath) === PUBLISHED_APK_NAME) {
    return apkPath;
  }

  const published = path.join(path.dirname(apkPath), PUBLISHED_APK_NAME);
  await rename(apkPath, published);
  return published;
}
