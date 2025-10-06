'use client';

import { useEffect, useState, RefObject } from 'react';

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Custom hook to detect when an element enters the viewport
 * @param ref - React ref to the element to observe
 * @param options - Intersection Observer options
 * @returns boolean indicating if element is in view
 */
export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  { threshold = 0.1, rootMargin = '0px', triggerOnce = false }: UseInViewOptions = {}
): boolean {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;

        setIsInView(inView);

        // If triggerOnce is true, unobserve after first trigger
        if (inView && triggerOnce && element) {
          observer.unobserve(element);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [ref, threshold, rootMargin, triggerOnce]);

  return isInView;
}
