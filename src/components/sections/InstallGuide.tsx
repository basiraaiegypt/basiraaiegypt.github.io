/**
 * The numbered walkthrough from downloaded file to opened app, read from
 * `INSTALL_STEPS`.
 */

import {SECTION_IDS} from '../../config/site.ts';
import {INSTALL_STEPS} from '../../content/install-steps.ts';
import {Section} from '../ui/Section.tsx';

export function InstallGuide() {
  return (
    <Section
      id={SECTION_IDS.install}
      eyebrow="Installing"
      title="Four steps, about a minute"
      subtitle="Android asks for one extra permission when an app does not come from the Play Store. Here is where it asks and what to tap."
    >
      <ol className="card divide-y divide-line">
        {INSTALL_STEPS.map((step, index) => (
          <li key={step.id} className="flex gap-4 p-6">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-mint text-sm font-bold text-teal">
              {index + 1}
            </span>
            <div>
              <h3 className="font-bold text-ink">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">{step.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
