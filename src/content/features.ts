/**
 * The feature cards, as data.
 *
 * Each entry mirrors one screen of the mobile app. Adding or reordering a
 * feature means editing this list only — `FeatureGrid` reads whatever is here.
 */

import type {AccentName} from '../lib/accents.ts';
import type {IconName} from '../lib/icons.ts';

export interface Feature {
  readonly id: string;
  readonly icon: IconName;
  readonly accent: AccentName;
  readonly title: string;
  readonly description: string;
}

export const FEATURES: readonly Feature[] = [
  {
    id: 'voice',
    icon: 'waveform',
    accent: 'teal',
    title: 'Learn by talking',
    description:
      'Ask out loud and hear the answer back. Basira listens, thinks and speaks, '
      + 'so studying feels like a conversation instead of reading another page.',
  },
  {
    id: 'adaptive',
    icon: 'sparkles',
    accent: 'violet',
    title: 'It adapts to you',
    description:
      'Basira builds a picture of your language, level and preferred formats, then '
      + 'pitches every explanation to it. The more you use it, the closer the fit.',
  },
  {
    id: 'topics',
    icon: 'layers',
    accent: 'amber',
    title: 'One place per subject',
    description:
      'Keep each subject as its own topic with its own sources, and watch how much '
      + 'of it you have actually mastered.',
  },
  {
    id: 'library',
    icon: 'library',
    accent: 'blue',
    title: 'Your sources, your notes',
    description:
      'Upload the documents you study from, and keep the summaries and quizzes '
      + 'Basira generates from them side by side in your library.',
  },
] as const;
