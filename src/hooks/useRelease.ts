/**
 * Loads the details of the APK currently published on this site.
 *
 * The details live in a JSON file the build regenerates from whatever APK sits
 * in `public/download/`, so the page never hard-codes a version number. This
 * hook is the single place that file is read.
 */

import {useEffect, useState} from 'react';

import type {ReleaseManifest} from '../../shared/release.ts';
import {RELEASE_MANIFEST_PATH} from '../config/site.ts';
import {siteUrl} from '../lib/site-url.ts';

/** What the page knows about the release at any moment. */
export type ReleaseState =
  | {readonly status: 'loading'}
  | {readonly status: 'ready'; readonly release: ReleaseManifest}
  | {readonly status: 'error'; readonly message: string};

const UNAVAILABLE_MESSAGE = 'The download is temporarily unavailable. Please try again shortly.';

export function useRelease(): ReleaseState {
  const [state, setState] = useState<ReleaseState>({status: 'loading'});

  useEffect(() => {
    // Guards against a slow response landing after the component is gone.
    let active = true;

    fetchRelease()
      .then((release) => active && setState({status: 'ready', release}))
      .catch(() => active && setState({status: 'error', message: UNAVAILABLE_MESSAGE}));

    return () => {
      active = false;
    };
  }, []);

  return state;
}

async function fetchRelease(): Promise<ReleaseManifest> {
  const response = await fetch(siteUrl(RELEASE_MANIFEST_PATH), {cache: 'no-cache'});
  if (!response.ok) throw new Error(`Release manifest returned ${response.status}.`);
  return (await response.json()) as ReleaseManifest;
}
