import { useState, useEffect, RefObject } from 'react';

interface UseIntersectionObserverProps {
  threshold?: number;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

/**
 * Custom React hook to detect element visibility in viewport using Intersection Observer.
 */
export function useIntersectionObserver(
  elementRef: RefObject<Element | null>,
  { threshold = 0.1, rootMargin = '0px', freezeOnceVisible = true }: UseIntersectionObserverProps = {}
): boolean {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = elementRef?.current;
    if (!node || (freezeOnceVisible && isVisible)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (freezeOnceVisible) {
            observer.disconnect();
          }
        } else if (!freezeOnceVisible) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [elementRef, threshold, rootMargin, freezeOnceVisible, isVisible]);

  return isVisible;
}
