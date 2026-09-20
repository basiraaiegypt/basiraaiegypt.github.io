/**
 * The bar at the top: the logo, the section links, and a shortcut back to the
 * download button. The links come from `NAV_LINKS`, so adding a section does
 * not mean editing this file.
 */

import {NAV_LINKS, SECTION_IDS} from '../../config/site.ts';
import {ICONS} from '../../lib/icons.ts';
import {BrandMark} from './BrandMark.tsx';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/85 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <BrandMark />

        <nav className="hidden items-center gap-1 sm:flex" aria-label="Sections">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm font-semibold text-ink-soft transition hover:bg-line-soft hover:text-teal"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={`#${SECTION_IDS.download}`}
          className="inline-flex items-center gap-2 rounded-full bg-mint px-4 py-2 text-sm font-bold text-teal transition hover:bg-mint-strong"
        >
          <ICONS.download size={16} strokeWidth={2.5} aria-hidden />
          Get the app
        </a>
      </div>
    </header>
  );
}
