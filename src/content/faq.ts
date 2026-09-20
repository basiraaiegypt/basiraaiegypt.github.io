/**
 * Questions people ask before installing an app from outside the Play Store.
 * Add an entry here and it appears in the FAQ section.
 */

export interface FaqEntry {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
}

export const FAQ: readonly FaqEntry[] = [
  {
    id: 'why-apk',
    question: 'Why is this not on the Play Store?',
    answer:
      'Basira AI is still in early access, so the build is handed out directly. '
      + 'Installing the APK gives you the same app, just without the store in between.',
  },
  {
    id: 'safe',
    question: 'How do I know the file is the real one?',
    answer:
      'Every build on this page lists its SHA-256 checksum. Run it against the file you '
      + 'downloaded, and if the two strings match, nothing changed on the way to you.',
  },
  {
    id: 'ios',
    question: 'Is there an iPhone version?',
    answer:
      'Not yet. Android is where the app is being tested first; an iOS build follows once '
      + 'the experience settles.',
  },
  {
    id: 'updates',
    question: 'How do I get updates?',
    answer:
      'Come back to this page and download again. Installing the new file over the old one '
      + 'keeps your topics and library as they are.',
  },
  {
    id: 'mic',
    question: 'Why does it ask for the microphone?',
    answer:
      'Talking to Basira is the main way to use it, so the app needs to hear you. You can '
      + 'decline and type instead; every voice step has a typed equivalent.',
  },
] as const;
