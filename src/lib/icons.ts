/**
 * The icons the page is allowed to use, keyed by a name content files can refer to.
 *
 * Content is data, and data should not import React components, so a feature
 * says `icon: 'waveform'` and this registry turns that into the component.
 * Adding an icon is one line here; nothing that renders icons has to change.
 */

import {
  AudioLines,
  BadgeCheck,
  Check,
  ChevronDown,
  Copy,
  Download,
  Layers,
  Library,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TriangleAlert,
  User,
  type LucideIcon,
} from 'lucide-react';

export const ICONS = {
  waveform: AudioLines,
  sparkles: Sparkles,
  layers: Layers,
  library: Library,
  download: Download,
  copy: Copy,
  check: Check,
  chevronDown: ChevronDown,
  shield: ShieldCheck,
  verified: BadgeCheck,
  phone: Smartphone,
  warning: TriangleAlert,
  user: User,
} satisfies Record<string, LucideIcon>;

/** Every name a content file may use for an icon. */
export type IconName = keyof typeof ICONS;
