/**
 * The download block: the button again, plus exactly what the file is.
 *
 * Showing the size, date and checksum next to the button is the point of this
 * section — someone installing outside the Play Store has no store to trust,
 * so the page has to give them something to check.
 */

import {SECTION_IDS} from '../../config/site.ts';
import type {ReleaseState} from '../../hooks/useRelease.ts';
import {DownloadButton} from '../download/DownloadButton.tsx';
import {ReleaseFacts} from '../download/ReleaseFacts.tsx';
import {IconBadge} from '../ui/IconBadge.tsx';
import {Section} from '../ui/Section.tsx';

interface DownloadSectionProps {
  readonly state: ReleaseState;
}

export function DownloadSection({state}: DownloadSectionProps) {
  return (
    <Section
      id={SECTION_IDS.download}
      eyebrow="Download"
      title="Get the latest build"
      subtitle="One file, straight from us. Here is everything that is in it."
    >
      <div className="card p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <IconBadge icon="verified" size="lg" />
            <div>
              <p className="text-lg font-bold text-ink">Basira AI for Android</p>
              <p className="text-sm text-ink-soft">
                {state.status === 'ready' ? state.release.fileName : 'Loading build details…'}
              </p>
            </div>
          </div>
          <DownloadButton state={state} />
        </div>

        {state.status === 'ready' && (
          <div className="mt-8 border-t border-line pt-4">
            <ReleaseFacts release={state.release} />
          </div>
        )}
      </div>
    </Section>
  );
}
