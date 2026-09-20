/**
 * The first screen a visitor sees: what the app is, the download button, and a
 * preview of the app beside it.
 */

import {SECTION_IDS, SITE} from '../../config/site.ts';
import type {ReleaseState} from '../../hooks/useRelease.ts';
import {ICONS} from '../../lib/icons.ts';
import {DownloadButton} from '../download/DownloadButton.tsx';
import {Pill} from '../ui/Pill.tsx';
import {PhonePreview} from './PhonePreview.tsx';

interface HeroProps {
  readonly state: ReleaseState;
}

export function Hero({state}: HeroProps) {
  return (
    <section id="top" className="mx-auto w-full max-w-5xl px-4 pt-14 pb-8 sm:px-6 sm:pt-20">
      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <Pill>
            <ICONS.phone size={14} strokeWidth={2.5} aria-hidden />
            {SITE.platform} · Early access
          </Pill>

          <h1 className="mt-6 text-4xl leading-[1.1] font-bold tracking-tight text-ink sm:text-5xl">
            {SITE.tagline}
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
            {SITE.description}
          </p>

          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <DownloadButton state={state} />
            <a
              href={`#${SECTION_IDS.install}`}
              className="px-2 text-sm font-bold text-teal hover:underline"
            >
              How to install it
            </a>
          </div>

          <p className="mt-4 flex items-center gap-2 text-xs text-ink-muted">
            <ICONS.shield size={14} strokeWidth={2.5} aria-hidden />
            Direct download from us. Checksum published below.
          </p>
        </div>

        <div className="relative">
          {/* A soft wash of the logo's gradient behind the phone. */}
          <div className="brand-gradient absolute inset-8 rounded-full opacity-15 blur-3xl" aria-hidden />
          <div className="relative">
            <PhonePreview />
          </div>
        </div>
      </div>
    </section>
  );
}
