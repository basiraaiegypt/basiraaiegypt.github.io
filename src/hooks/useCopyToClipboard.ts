/**
 * Copies text and reports, for a moment, that it worked.
 *
 * The brief "copied" flag is what makes a copy button feel like it did
 * something, so it lives with the copying rather than in every button.
 */

import {useCallback, useEffect, useRef, useState} from 'react';

/** How long the button stays in its "copied" state. */
const CONFIRMATION_MS = 2000;

export function useCopyToClipboard(): {copied: boolean; copy: (text: string) => void} {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = useCallback((text: string) => {
    void navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), CONFIRMATION_MS);
    });
  }, []);

  return {copied, copy};
}
