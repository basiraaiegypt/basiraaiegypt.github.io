/**
 * What the app does, one card per feature, read from `FEATURES`.
 */

import {SECTION_IDS} from '../../config/site.ts';
import {FEATURES} from '../../content/features.ts';
import {Card} from '../ui/Card.tsx';
import {IconBadge} from '../ui/IconBadge.tsx';
import {Section} from '../ui/Section.tsx';

export function FeatureGrid() {
  return (
    <Section
      id={SECTION_IDS.features}
      eyebrow="Inside the app"
      title="Built around how you study, not how an app wants you to"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {FEATURES.map((feature, index) => (
          <Card
            key={feature.id}
            stripe={feature.accent}
            // With an odd number of cards, the last one takes the whole row
            // instead of sitting alone in half of it.
            className={isLoneLastCard(index) ? 'sm:col-span-2' : ''}
          >
            <div className="p-6">
              <IconBadge icon={feature.icon} accent={feature.accent} />
              <h3 className="mt-4 text-lg font-bold text-ink">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{feature.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function isLoneLastCard(index: number): boolean {
  return FEATURES.length % 2 === 1 && index === FEATURES.length - 1;
}
