/**
 * The app's card: white, thin border, 16px corners, no drop shadow.
 * Optionally carries the coloured stripe the app draws down the side of a
 * topic card.
 */

import type {ReactNode} from 'react';

import {ACCENTS, type AccentName} from '../../lib/accents.ts';

interface CardProps {
  /** Adds the coloured edge stripe in this accent. Omit for a plain card. */
  readonly stripe?: AccentName;
  readonly className?: string;
  readonly children: ReactNode;
}

export function Card({stripe, className = '', children}: CardProps) {
  return (
    <div className={`card flex overflow-hidden ${className}`}>
      {stripe && <div className={`w-1.5 shrink-0 ${ACCENTS[stripe].stripe}`} aria-hidden />}
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
