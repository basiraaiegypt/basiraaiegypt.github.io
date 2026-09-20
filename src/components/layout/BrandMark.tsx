/**
 * The logo lock-up: the Basira icon, the name in English, and the name in Arabic.
 * Used in the header and the footer so both say the brand the same way.
 */

import {SITE} from '../../config/site.ts';
import {siteUrl} from '../../lib/site-url.ts';

/** The brand icon, as a path from the site root. */
const LOGO_PATH = 'logo/basira-icon.png';

/** Icon size in pixels for each variant. */
const ICON_SIZE = {header: 'size-9', footer: 'size-10'} as const;

interface BrandMarkProps {
  readonly variant?: keyof typeof ICON_SIZE;
}

export function BrandMark({variant = 'header'}: BrandMarkProps) {
  return (
    <a href="#top" className="flex items-center gap-3" aria-label={`${SITE.name} home`}>
      <img
        src={siteUrl(LOGO_PATH)}
        alt=""
        width={40}
        height={40}
        className={ICON_SIZE[variant]}
      />
      <span className="flex items-baseline gap-2">
        <span className="text-lg font-bold tracking-tight text-ink">{SITE.name}</span>
        <span className="font-arabic text-sm text-ink-muted" lang="ar" dir="rtl">
          {SITE.nameArabic}
        </span>
      </span>
    </a>
  );
}
