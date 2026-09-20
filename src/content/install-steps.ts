/**
 * The install walkthrough, as data.
 *
 * Android blocks apps from outside the Play Store until the user allows it, so
 * these steps exist to get someone from "downloaded" to "opened" without
 * getting stuck on that warning.
 */

export interface InstallStep {
  readonly id: string;
  readonly title: string;
  readonly detail: string;
}

export const INSTALL_STEPS: readonly InstallStep[] = [
  {
    id: 'download',
    title: 'Download the APK',
    detail:
      'Tap the download button on this page from your Android phone. The file lands '
      + 'in your Downloads folder.',
  },
  {
    id: 'allow',
    title: 'Allow this one install',
    detail:
      'Android will warn you because the app did not come from the Play Store. Choose '
      + 'Settings, then turn on "Allow from this source" for your browser or file manager.',
  },
  {
    id: 'install',
    title: 'Open the file and install',
    detail:
      'Tap the downloaded file and confirm. It takes a few seconds. You can turn the '
      + 'permission from step 2 back off afterwards.',
  },
  {
    id: 'start',
    title: 'Tell Basira what you are learning',
    detail:
      'Open the app and type or say your subject. That first answer is what everything '
      + 'after it adapts around.',
  },
] as const;
