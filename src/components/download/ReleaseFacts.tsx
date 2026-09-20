/**
 * The details of the build being offered: version, size, date, checksum.
 * Which rows exist is decided by `RELEASE_FACTS`, not by this component.
 */

import type {ReleaseManifest} from '../../../shared/release.ts';
import {RELEASE_FACTS} from '../../content/release-facts.ts';
import {CopyButton} from '../ui/CopyButton.tsx';

interface ReleaseFactsProps {
  readonly release: ReleaseManifest;
}

export function ReleaseFacts({release}: ReleaseFactsProps) {
  return (
    <dl className="divide-y divide-line text-sm">
      {RELEASE_FACTS.map((fact) => {
        const value = fact.value(release);
        if (value === null) return null;

        return (
          <div key={fact.id} className="flex items-center justify-between gap-4 py-2.5">
            <dt className="shrink-0 text-ink-muted">{fact.label}</dt>
            <dd className="flex min-w-0 items-center gap-1">
              <span
                className={`truncate font-semibold text-ink ${fact.monospace ? 'font-mono text-xs' : ''}`}
                title={value}
              >
                {value}
              </span>
              {fact.copyValue && <CopyButton value={fact.copyValue(release)} label={fact.label} />}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
