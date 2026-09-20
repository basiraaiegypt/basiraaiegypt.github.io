/**
 * Facts about the product that appear in more than one place on the page.
 *
 * Anything a visitor reads and that repeats — the name, the tagline, the
 * support address — is written here once and imported, so the site cannot end
 * up saying two different things.
 */

/** Where the page reads the generated APK details from. */
export {MANIFEST_PATH_FROM_ROOT as RELEASE_MANIFEST_PATH} from '../../shared/release.ts';

export const SITE = {
  name: 'Basira AI',
  /** Arabic name, shown next to the English one the way the app does. */
  nameArabic: 'بصيرة',
  tagline: 'Adaptive learning that changes with the learner.',
  /** The app's own sign-off line, reused verbatim in the footer. */
  signature: 'بصيرة AI • Adaptive & Conscious',
  description:
    'A voice-first study companion. Talk through what you are learning, and Basira '
    + 'adapts the explanation to how you actually understand it.',
  platform: 'Android',
  supportEmail: 'support@basira.ai',
} as const;

/** Anchor targets used by both the header links and the sections themselves. */
export const SECTION_IDS = {
  download: 'download',
  features: 'features',
  install: 'install',
  faq: 'faq',
} as const;

/** Header navigation. Add an entry here and the link appears; no component edit. */
export const NAV_LINKS = [
  {label: 'Features', href: `#${SECTION_IDS.features}`},
  {label: 'Install', href: `#${SECTION_IDS.install}`},
  {label: 'FAQ', href: `#${SECTION_IDS.faq}`},
] as const;
