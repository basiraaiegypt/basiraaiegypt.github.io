/**
 * Copies a value and briefly says so.
 * Used for the checksum, where the text is too long to read but easy to paste.
 */

import {useCopyToClipboard} from '../../hooks/useCopyToClipboard.ts';
import {ICONS} from '../../lib/icons.ts';

interface CopyButtonProps {
  /** The full value placed on the clipboard. */
  readonly value: string;
  /** Describes what is being copied, for screen readers. */
  readonly label: string;
}

export function CopyButton({value, label}: CopyButtonProps) {
  const {copied, copy} = useCopyToClipboard();
  const Icon = copied ? ICONS.check : ICONS.copy;

  return (
    <button
      type="button"
      onClick={() => copy(value)}
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
      className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-bold text-teal transition hover:bg-mint focus-visible:ring-2 focus-visible:ring-teal focus-visible:outline-none"
    >
      <Icon size={14} strokeWidth={2.5} />
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}
