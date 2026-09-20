/**
 * A picture of the app, drawn in HTML rather than a screenshot.
 *
 * It copies the app's Learn screen — the mint halo, the prompt, the suggestion
 * chips and the bottom tab bar — using the same colours the Flutter code uses.
 * Built this way it stays sharp at any size and never goes out of date with a
 * stale image file.
 */

import {ICONS} from '../../lib/icons.ts';

/** The suggestion chips on the app's Learn screen, word for word. */
const SUGGESTIONS = [
  'Explain mitochondria simply',
  'Quiz me on cell parts',
  'Summarize my textbook notes',
] as const;

/** The app's four tabs, with the first one active as it is on launch. */
const TABS = ['Learn', 'Topics', 'Library', 'Profile'] as const;

/** Heights of the waveform bars, so the animation reads as a voice, not a pulse. */
const WAVE_BARS = [14, 26, 38, 26, 14] as const;

export function PhonePreview() {
  return (
    <div
      className="mx-auto w-full max-w-[280px] overflow-hidden rounded-[2.5rem] border-8 border-ink bg-canvas shadow-2xl"
      aria-hidden
    >
      <div className="flex h-[560px] flex-col">
        <PreviewTopBar />
        <PreviewStage />
        <PreviewSuggestions />
        <PreviewTabBar />
      </div>
    </div>
  );
}

/** The app's header row: assistant avatar, current topic, profile avatar. */
function PreviewTopBar() {
  return (
    <div className="flex items-center justify-between px-4 pt-5 pb-2">
      <span className="flex size-8 items-center justify-center rounded-full bg-mint text-teal">
        <ICONS.sparkles size={16} />
      </span>
      <span className="rounded-full border border-line bg-surface px-3 py-1 text-[11px] font-bold text-teal">
        Cell Biology
      </span>
      <span className="flex size-8 items-center justify-center rounded-full bg-line-soft text-teal">
        <ICONS.user size={15} />
      </span>
    </div>
  );
}

/** The centre of the screen: the halo, the waveform and the prompt. */
function PreviewStage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6">
      <div className="relative flex size-36 items-center justify-center">
        <div className="halo absolute inset-0 rounded-full" />
        <div className="relative flex items-end gap-1.5">
          {WAVE_BARS.map((height, index) => (
            <span
              key={index}
              className="wave-bar w-2 rounded-full bg-teal"
              style={{height: `${height}px`, animationDelay: `${index * 0.12}s`}}
            />
          ))}
        </div>
      </div>
      <p className="mt-6 text-center text-base font-bold text-ink">
        What would you like to learn?
      </p>
      <p className="mt-1 text-center text-[11px] text-ink-muted">Tap the mic and just ask</p>
    </div>
  );
}

/** The prompts the app offers when you have not said anything yet. */
function PreviewSuggestions() {
  return (
    <div className="space-y-2 px-4 pb-3">
      {SUGGESTIONS.map((suggestion) => (
        <div
          key={suggestion}
          className="rounded-full border border-line bg-surface px-3 py-2 text-[11px] font-semibold text-ink-soft"
        >
          {suggestion}
        </div>
      ))}
    </div>
  );
}

/** The four-tab bar along the bottom of the app. */
function PreviewTabBar() {
  return (
    <div className="flex items-center justify-around border-t border-line bg-surface py-2.5">
      {TABS.map((tab, index) => (
        <span
          key={tab}
          className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
            index === 0 ? 'bg-mint text-teal' : 'text-ink-muted'
          }`}
        >
          {tab}
        </span>
      ))}
    </div>
  );
}
