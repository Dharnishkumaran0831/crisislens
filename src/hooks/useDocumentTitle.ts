import { useEffect } from 'react';

/**
 * Custom React hook to dynamically update document title on component mount.
 */
export function useDocumentTitle(title: string, restoreOnUnmount: boolean = false): void {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = title;

    return () => {
      if (restoreOnUnmount) {
        document.title = originalTitle;
      }
    };
  }, [title, restoreOnUnmount]);
}
