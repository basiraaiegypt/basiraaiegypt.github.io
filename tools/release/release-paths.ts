/**
 * Where the APK and its generated manifest sit on disk.
 *
 * The names of the folder and the file are shared with the browser, so they
 * live in `shared/release.ts`. This file only turns them into absolute paths,
 * which is the part the browser must never see.
 */

import path from 'node:path';
import {fileURLToPath} from 'node:url';

import {DOWNLOAD_DIR_NAME, MANIFEST_FILE_NAME} from '../../shared/release.ts';

/** Repo root, derived from this file's own location rather than the current directory. */
export const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

/** Absolute path of the folder the APK is served from. */
export const DOWNLOAD_DIR = path.join(PROJECT_ROOT, 'public', DOWNLOAD_DIR_NAME);

/** Absolute path of the generated manifest. */
export const MANIFEST_PATH = path.join(DOWNLOAD_DIR, MANIFEST_FILE_NAME);
