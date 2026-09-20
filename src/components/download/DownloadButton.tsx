/**
 * The button that actually downloads the APK.
 *
 * It renders in three states because the release details are fetched: waiting,
 * ready, and unavailable. Keeping all three here means no caller has to think
 * about which one applies.
 */

import type {ReleaseState} from '../../hooks/useRelease.ts';
import {formatFileSize} from '../../lib/format.ts';
import {ICONS} from '../../lib/icons.ts';
import {siteUrl} from '../../lib/site-url.ts';

/** Shared shape so the three states line up instead of jumping as they swap. */
const BUTTON_BASE =
  'inline-flex w-full items-center justify-center gap-3 rounded-full px-8 py-4 '
  + 'text-base font-bold transition sm:w-auto';

interface DownloadButtonProps {
  readonly state: ReleaseState;
}

export function DownloadButton({state}: DownloadButtonProps) {
  if (state.status === 'loading') {
    return (
      <span className={`${BUTTON_BASE} bg-line-soft text-ink-muted`} aria-busy>
        Checking latest build…
      </span>
    );
  }

  if (state.status === 'error') {
    return (
      <span className={`${BUTTON_BASE} bg-line-soft text-ink-soft`} role="status">
        <ICONS.warning size={20} strokeWidth={2.5} aria-hidden />
        {state.message}
      </span>
    );
  }

  const {release} = state;

  return (
    <a
      href={siteUrl(release.downloadPath)}
      download={release.fileName}
      className={`${BUTTON_BASE} bg-teal text-white shadow-sm hover:bg-teal-hover focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:outline-none`}
    >
      <ICONS.download size={20} strokeWidth={2.5} aria-hidden />
      Download for Android
      <span className="font-semibold text-mint-strong">{formatFileSize(release.sizeBytes)}</span>
    </a>
  );
}
