/**
 * One band of the page: an anchor, a heading, and whatever is inside it.
 * Every section uses this so the width, spacing and heading style stay equal.
 */

import type {ReactNode} from 'react';

interface SectionProps {
  /** Anchor target, so the header links can jump here. */
  readonly id: string;
  /** Small label above the heading, e.g. "Installing". */
  readonly eyebrow?: string;
  readonly title: string;
  readonly subtitle?: string;
  readonly children: ReactNode;
}

export function Section({id, eyebrow, title, subtitle, children}: SectionProps) {
  return (
    <section id={id} className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
      <header className="mb-10 max-w-2xl">
        {eyebrow && (
          <p className="mb-3 text-xs font-bold tracking-[0.18em] text-ink-muted uppercase">
            {eyebrow}
          </p>
        )}
        <h2 className="text-2xl font-bold text-ink sm:text-3xl">{title}</h2>
        {subtitle && <p className="mt-3 text-base leading-relaxed text-ink-soft">{subtitle}</p>}
      </header>
      {children}
    </section>
  );
}
