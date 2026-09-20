/**
 * An icon in a tinted circle — the app's way of marking a section or a card.
 */

import {ACCENTS, type AccentName} from '../../lib/accents.ts';
import {ICONS, type IconName} from '../../lib/icons.ts';

/** Circle diameter and icon size for each size option. */
const SIZES = {
  sm: {box: 'size-10', icon: 18},
  md: {box: 'size-12', icon: 22},
  lg: {box: 'size-20', icon: 36},
} as const;

interface IconBadgeProps {
  readonly icon: IconName;
  readonly accent?: AccentName;
  readonly size?: keyof typeof SIZES;
}

export function IconBadge({icon, accent = 'teal', size = 'md'}: IconBadgeProps) {
  const Icon = ICONS[icon];
  const {box, icon: iconSize} = SIZES[size];

  return (
    <span
      className={`inline-flex ${box} shrink-0 items-center justify-center rounded-full ${ACCENTS[accent].badge}`}
      aria-hidden
    >
      <Icon size={iconSize} strokeWidth={2} />
    </span>
  );
}
