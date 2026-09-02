import { useEffect } from 'react';

/**
 * Custom hook to smoothly scroll to top of page on component mount or route change.
 */
export function useScrollToTop(): void {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);
}

/**
 * Utility function to scroll to a specific section ID with smooth animation.
 */
export function scrollToSection(sectionId: string): void {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}
