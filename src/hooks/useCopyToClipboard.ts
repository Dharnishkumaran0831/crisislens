import { useState, useCallback } from 'react';

interface CopyToClipboardResult {
  copiedText: string | null;
  isCopied: boolean;
  copy: (text: string) => Promise<boolean>;
}

/**
 * Custom React hook for copying text snippets or URLs to the clipboard.
 */
export function useCopyToClipboard(resetInterval: number = 2000): CopyToClipboardResult {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      if (!navigator?.clipboard) {
        console.warn('Clipboard API not supported');
        return false;
      }

      try {
        await navigator.clipboard.writeText(text);
        setCopiedText(text);
        setIsCopied(true);

        setTimeout(() => {
          setIsCopied(false);
        }, resetInterval);

        return true;
      } catch (error) {
        console.warn('Copy failed:', error);
        setCopiedText(null);
        setIsCopied(false);
        return false;
      }
    },
    [resetInterval]
  );

  return { copiedText, isCopied, copy };
}
