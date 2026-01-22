'use client';

import { useEffect, useState, ReactNode, useRef } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import { ViewTransitions } from 'next-view-transitions';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollTriggerManager } from '@/utils/scrollTriggerManager';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProviderProps {
  children: ReactNode;
}

import { isIOS, isMobile as detectMobile } from '@/utils/deviceDetect';

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
 * Initialize CSS-based smooth scroll for iOS
 *
 * Uses native CSS scroll-behavior: smooth instead of JavaScript for better performance
 */
const initIOSSmoothScroll = () => {
  if (typeof window === 'undefined' || !isIOS()) return;

  // Apply CSS smooth scroll
  document.documentElement.style.scrollBehavior = 'smooth';
  document.body.style.scrollBehavior = 'smooth';

  // Enable hardware acceleration (TypeScript doesn't recognize webkit prefix)
  (document.documentElement.style as any).webkitOverflowScrolling = 'touch';

  // Prevent overscroll bounce
  document.body.style.overscrollBehavior = 'none';
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

    // Refresh after setup using centralized manager
    const refreshTimeout = setTimeout(() => {
      scrollTriggerManager.requestRefresh();
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
    const isIOSDevice = isIOS();
    setIsIOSDevice(isIOSDevice);

    const checkMobile = () => {
      setIsMobile(detectMobile());
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Initialize iOS smooth scroll if needed
    if (isIOSDevice) {
      initIOSSmoothScroll();
    }

    // ScrollTrigger config - optimized for performance
    ScrollTrigger.config({
      ignoreMobileResize: true,
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
      limitCallbacks: true, // Reduce callback frequency
    });

    // Optimize GSAP ticker for mobile performance
    const isMobileDevice = detectMobile();
    if (isMobileDevice || isIOSDevice) {
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
        scrollTriggerManager.requestRefresh();
      }, 150);
      return () => clearTimeout(timeoutId);
    }
  }, [isMobile, isClient]);

  // Use native scroll on iOS and mobile for better performance
  const scrollSettings = (isMobile || isIOSDevice) ? mobileSettings : desktopSettings;

  return (
    <ViewTransitions>
      {/* Conditionally render ReactLenis only on desktop */}
      {!isIOSDevice && !isMobile ? (
        <ReactLenis root options={scrollSettings}>
          <ScrollTriggerSync />
          {children}
        </ReactLenis>
      ) : (
        // iOS/Mobile: Use native CSS smooth scroll
        <>{children}</>
      )}
    </ViewTransitions>
  );
}
