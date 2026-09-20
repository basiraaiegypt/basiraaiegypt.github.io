import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

import {releaseManifestPlugin} from './tools/vite/release-manifest-plugin.ts';

/**
 * The URL prefix the site is served under.
 *
 * It is `/` on a custom domain or a user site, but a GitHub Pages *project*
 * site lives at `https://<user>.github.io/<repo>/`, so it has to be `/<repo>/`
 * there. The deploy workflow sets `BASE_PATH` to the repository name; locally
 * it is unset and the site is served from the root as usual.
 */
const basePath = process.env.BASE_PATH ?? '/';

export default defineConfig({
  base: basePath,
  // Regenerates the APK details before anything is served or bundled, so the
  // page always describes the file that is actually in public/download/.
  plugins: [releaseManifestPlugin(), react(), tailwindcss()],
});
