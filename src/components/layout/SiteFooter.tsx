/**
 * The closing strip: the brand, the app's own sign-off line, and a support address.
 */

import {SITE} from '../../config/site.ts';
import {BrandMark} from './BrandMark.tsx';

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="space-y-2">
          <BrandMark variant="footer" />
          <p className="font-arabic text-sm text-ink-muted">{SITE.signature}</p>
        </div>

        <div className="text-sm text-ink-soft sm:text-right">
          <a href={`mailto:${SITE.supportEmail}`} className="font-semibold text-teal hover:underline">
            {SITE.supportEmail}
          </a>
          <p className="mt-1 text-ink-muted">
            © {new Date().getFullYear()} {SITE.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
