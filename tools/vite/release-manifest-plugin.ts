/**
 * Regenerates the release manifest whenever the site is built or served.
 *
 * The point is that swapping the APK is the only step: drop a new file into
 * `public/download/`, and the version, size, date and checksum on the page
 * follow it. During `npm run dev` the folder is watched, so the page reloads
 * with the new numbers as soon as the file lands.
 */

import type {Plugin, ViteDevServer} from 'vite';

import {writeReleaseManifest} from '../release/release-manifest.ts';
import {DOWNLOAD_DIR} from '../release/release-paths.ts';

const PLUGIN_NAME = 'basira:release-manifest';

export function releaseManifestPlugin(): Plugin {
  return {
    name: PLUGIN_NAME,
    // Runs for both `vite build` and `vite dev`, so the manifest is never stale.
    async buildStart() {
      await regenerate();
    },
    configureServer(server) {
      watchDownloadFolder(server);
    },
  };
}

/** Rebuilds the manifest, reporting problems without killing the dev server. */
async function regenerate(): Promise<void> {
  try {
    const manifest = await writeReleaseManifest();
    console.log(`[${PLUGIN_NAME}] ${manifest.fileName} (${manifest.versionName ?? 'unknown'})`);
  } catch (error) {
    console.warn(`[${PLUGIN_NAME}] ${error instanceof Error ? error.message : error}`);
  }
}

/** Reloads the open page when an APK is added, replaced or removed while developing. */
function watchDownloadFolder(server: ViteDevServer): void {
  server.watcher.add(DOWNLOAD_DIR);

  const onChange = async (changedPath: string) => {
    if (!changedPath.toLowerCase().endsWith('.apk')) return;
    await regenerate();
    server.ws.send({type: 'full-reload'});
  };

  server.watcher.on('add', onChange);
  server.watcher.on('change', onChange);
  server.watcher.on('unlink', onChange);
}
