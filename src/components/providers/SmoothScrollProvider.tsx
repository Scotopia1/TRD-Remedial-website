'use client';

import { useEffect, useState, ReactNode, useRef } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import { ViewTransitions } from 'next-view-transitions';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProviderProps {
  children: ReactNode;
}

// Detect iOS devices (including iPadOS 13+ which reports as desktop)
const isIOS = () => {
  if (typeof window === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
};

// Shared easing function
const easeOutExpo = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

// Default desktop settings - optimized for performance
const desktopSettings = {
  duration: 1.0,
  easing: easeOutExpo,
  direction: 'vertical' as const,
  orientation: 'vertical' as const,
  gestureOrientation: 'vertical' as const,
  smoothWheel: true,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
  lerp: 0.08,
  wheelMultiplier: 1,
  syncTouch: false,
};

// iOS/Mobile settings - NATIVE SCROLL ONLY (smooth scroll disabled for performance)
const mobileSettings = {
  duration: 0,
  easing: (t: number) => t,
  direction: 'vertical' as const,
  orientation: 'vertical' as const,
  gestureOrientation: 'vertical' as const,
  smoothWheel: false,
  smoothTouch: false,
  touchMultiplier: 1,
  infinite: false,
  lerp: 1,
  wheelMultiplier: 1,
  syncTouch: false,
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

  // Listen for instant scroll reset events (from page transitions)
  useEffect(() => {
    const handleInstantScrollReset = () => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }
    };

    window.addEventListener('instantScrollReset', handleInstantScrollReset);
    return () => window.removeEventListener('instantScrollReset', handleInstantScrollReset);
  }, []);

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
 * PERFORMANCE OPTIMIZED: Disables smooth scroll on iOS/mobile for native performance
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isIOSDevice, setIsIOSDevice] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setIsIOSDevice(isIOS());

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1000 || isIOS());
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // ScrollTrigger config - optimized for performance
    ScrollTrigger.config({
      ignoreMobileResize: true,
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
      limitCallbacks: true, // Reduce callback frequency
    });

    // Optimize GSAP ticker for mobile performance
    if (isMobile || isIOS()) {
      gsap.ticker.lagSmoothing(1000, 16); // More forgiving on mobile
    } else {
      gsap.ticker.lagSmoothing(500, 33);
    }

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

  // Use native scroll on iOS and mobile for better performance
  const scrollSettings = (isMobile || isIOSDevice) ? mobileSettings : desktopSettings;

  return (
    <ViewTransitions>
      <ReactLenis root options={scrollSettings}>
        <ScrollTriggerSync />
        {children}
      </ReactLenis>
    </ViewTransitions>
  );
}
