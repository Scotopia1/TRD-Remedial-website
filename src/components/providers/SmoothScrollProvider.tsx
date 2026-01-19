'use client';

import { useEffect, useState, ReactNode, useRef, useCallback } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import { ViewTransitions } from 'next-view-transitions';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProviderProps {
  children: ReactNode;
}

// Shared easing function
const easeOutExpo = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

// Default desktop settings
const desktopSettings = {
  duration: 1.2,
  easing: easeOutExpo,
  direction: 'vertical' as const,
  orientation: 'vertical' as const,
  gestureOrientation: 'vertical' as const,
  smoothWheel: true,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
  lerp: 0.1,
  wheelMultiplier: 1,
  syncTouch: true,
};

// Mobile settings
const mobileSettings = {
  duration: 0.8,
  easing: easeOutExpo,
  direction: 'vertical' as const,
  orientation: 'vertical' as const,
  gestureOrientation: 'vertical' as const,
  smoothWheel: true,
  smoothTouch: true,
  touchMultiplier: 1.5,
  infinite: false,
  lerp: 0.09,
  wheelMultiplier: 1,
  syncTouch: true,
};

/**
 * ScrollTrigger Integration Component
 * Properly syncs Lenis with GSAP using scroller proxy pattern
 */
function ScrollTriggerSync() {
  const lenisRef = useRef<any>(null);
  const scrollRef = useRef(0);

  // Store lenis instance and track scroll position
  useLenis((lenis) => {
    lenisRef.current = lenis;
    scrollRef.current = lenis.scroll;
    // Update ScrollTrigger with current scroll position
    ScrollTrigger.update();
  });

  useEffect(() => {
    // Set up scroller proxy to tell ScrollTrigger about Lenis scroll position
    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value?: number) {
        if (arguments.length && lenisRef.current) {
          lenisRef.current.scrollTo(value, { immediate: true });
        }
        return scrollRef.current;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: 'transform',
    });

    // Refresh after setup
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(refreshTimeout);
      ScrollTrigger.clearScrollMemory();
    };
  }, []);

  return null;
}

/**
 * Smooth Scroll Provider
 * Uses ReactLenis with scroller proxy for proper GSAP integration
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1000);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // ScrollTrigger config
    ScrollTrigger.config({
      ignoreMobileResize: true,
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
    });

    // Disable GSAP's lag smoothing for consistent frame delivery
    gsap.ticker.lagSmoothing(0);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Refresh ScrollTrigger when mobile state changes
  useEffect(() => {
    if (isClient) {
      const timeoutId = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
      return () => clearTimeout(timeoutId);
    }
  }, [isMobile, isClient]);

  const scrollSettings = isMobile ? mobileSettings : desktopSettings;

  return (
    <ViewTransitions>
      <ReactLenis root options={scrollSettings}>
        <ScrollTriggerSync />
        {children}
      </ReactLenis>
    </ViewTransitions>
  );
}
