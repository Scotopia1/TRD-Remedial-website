import { useState, useEffect, useRef, RefObject } from 'react';

interface UseInViewOptions extends IntersectionObserverInit {
  triggerOnce?: boolean;
}

/**
 * Hook to detect if an element is in viewport
 * @param options - Intersection Observer options
 * @returns Tuple of [ref, isInView]
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {}
): [RefObject<T | null>, boolean] {
  const { threshold = 0.1, triggerOnce = false, ...restOptions } = options;
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        setIsInView(inView);

        // If triggerOnce is true and element is in view, disconnect observer
        if (triggerOnce && inView && ref.current) {
          observer.unobserve(ref.current);
        }
      },
      {
        threshold,
        ...restOptions,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, triggerOnce, restOptions]);

  return [ref, isInView];
}
