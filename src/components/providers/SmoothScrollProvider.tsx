'use client';

import { ReactNode, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProviderProps {
  children: ReactNode;
}

/**
 * Smooth Scroll Provider - Native CSS Implementation
 * Uses CSS scroll-behavior: smooth with optimized ScrollTrigger configuration
 * Removed Lenis to fix Android touch scrolling and laptop lag issues
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    // Simple ScrollTrigger config - no Lenis
    ScrollTrigger.config({
      ignoreMobileResize: true, // Prevents jumps when address bar appears/disappears
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
    });

    // Debounced refresh on resize
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    };
    window.addEventListener('resize', handleResize);

    // Handle visibility change (tab switching)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        ScrollTrigger.refresh();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return <>{children}</>;
}
