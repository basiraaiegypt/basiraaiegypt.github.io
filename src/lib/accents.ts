/**
 * The accent colours a card can carry, as ready-made class pairs.
 *
 * The four colours are the ones the app cycles through on its Topics screen.
 * They are spelled out in full because Tailwind only keeps classes it can find
 * written down — a class built by joining strings would be dropped at build time.
 */

export interface AccentClasses {
  /** Tinted circle behind an icon. */
  readonly badge: string;
  /** The coloured stripe down the side of a card. */
  readonly stripe: string;
}

export const ACCENTS = {
  teal: {badge: 'bg-mint text-teal', stripe: 'bg-teal'},
  amber: {badge: 'bg-amber-50 text-accent-amber', stripe: 'bg-accent-amber'},
  blue: {badge: 'bg-blue-50 text-accent-blue', stripe: 'bg-accent-blue'},
  violet: {badge: 'bg-violet-50 text-accent-violet', stripe: 'bg-accent-violet'},
} as const satisfies Record<string, AccentClasses>;

/** Every accent a content file may ask for. */
export type AccentName = keyof typeof ACCENTS;
