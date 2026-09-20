/**
 * A small rounded label, like the chips the app puts above a card.
 */

import type {ReactNode} from 'react';

interface PillProps {
  readonly children: ReactNode;
  readonly className?: string;
}

export function Pill({children, className = ''}: PillProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-bold text-teal ${className}`}
    >
      {children}
    </span>
  );
}
