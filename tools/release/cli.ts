/**
 * Regenerates `release-manifest.json` from the command line.
 *
 * Normally the Vite plugin does this on `dev` and `build`, so this entry point
 * is for the times you want it on its own — a CI step, or checking what the page
 * will say after dropping in a new APK. Run it with `npm run release:manifest`.
 */

import {writeReleaseManifest} from './release-manifest.ts';
import {MANIFEST_PATH} from './release-paths.ts';

try {
  const manifest = await writeReleaseManifest();
  const version = manifest.versionName ?? 'unknown version';
  console.log(`Wrote ${MANIFEST_PATH}`);
  console.log(`  ${manifest.fileName} — ${version} (build ${manifest.versionCode ?? '?'})`);
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
