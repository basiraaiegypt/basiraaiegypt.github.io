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
        {FEATURES.map((feature) => (
          <Card key={feature.id} stripe={feature.accent}>
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
