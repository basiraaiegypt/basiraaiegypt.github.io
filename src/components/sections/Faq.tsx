/**
 * The questions people ask before installing, as native disclosure widgets so
 * they open and close without any JavaScript.
 */

import {SECTION_IDS} from '../../config/site.ts';
import {FAQ} from '../../content/faq.ts';
import {ICONS} from '../../lib/icons.ts';
import {Section} from '../ui/Section.tsx';

export function Faq() {
  return (
    <Section id={SECTION_IDS.faq} eyebrow="Questions" title="Before you install">
      <div className="space-y-3">
        {FAQ.map((entry) => (
          <details key={entry.id} className="card group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-bold text-ink [&::-webkit-details-marker]:hidden">
              {entry.question}
              <ICONS.chevronDown
                size={18}
                className="shrink-0 text-ink-muted transition group-open:rotate-180"
                aria-hidden
              />
            </summary>
            <p className="border-t border-line px-5 py-4 text-sm leading-relaxed text-ink-soft">
              {entry.answer}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}
