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

// Shared easing function (CGMWTAUG2025 pattern)
const easeOutExpo = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

// Mobile-optimized settings - Keep Lenis running with faster, touch-friendly config
// iOS FIX: Aggressive optimization for truly native-feeling scroll on iOS
const getMobileSettings = (isIOSDevice: boolean) => ({
  duration: isIOSDevice ? 0.5 : 0.8,  // Much faster on iOS for instant feedback
  easing: easeOutExpo,
  direction: 'vertical' as const,
  orientation: 'vertical' as const,
  gestureOrientation: 'vertical' as const,
  smooth: !isIOSDevice,       // CRITICAL: Disable smooth scroll entirely on iOS, use native
  smoothWheel: !isIOSDevice,  // Native wheel behavior on iOS
  smoothTouch: false,         // Always disable touch smoothing for native feel
  touchMultiplier: 1,         // Native multiplier - don't amplify touch
  infinite: false,
  lerp: isIOSDevice ? 0.25 : 0.09,  // Very fast lerp on iOS for instant response
  wheelMultiplier: 1,
  syncTouch: false,           // Never sync touch - let browser handle it
  touchInertiaMultiplier: isIOSDevice ? 1 : 35,  // Minimal inertia on iOS
  eventsTarget: isIOSDevice ? window : undefined,  // Use window for iOS passive listeners
});

// Desktop settings - Slower, more deliberate animations
const desktopSettings = {
  duration: 1.2,              // Slower animations for desktop
  easing: easeOutExpo,
  direction: 'vertical' as const,
  orientation: 'vertical' as const,
  gestureOrientation: 'vertical' as const,
  smooth: true,
  smoothWheel: true,
  smoothTouch: false,         // Native scroll better on desktop
  touchMultiplier: 2,
  infinite: false,
  lerp: 0.1,
  wheelMultiplier: 1,
  syncTouch: true,
};

// NOTE: iOS CSS smooth scroll initialization removed - using Lenis on all devices

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
    // Defer scroller proxy setup to improve initial load performance
    const setupProxy = () => {
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
      scrollTriggerManager.requestRefresh();
    };

    // Use requestIdleCallback when available (better performance)
    // Falls back to requestAnimationFrame on unsupported browsers
    const requestIdleCallbackPolyfill =
      typeof window !== 'undefined' && 'requestIdleCallback' in window
        ? window.requestIdleCallback
        : (cb: IdleRequestCallback) => setTimeout(cb, 1);

    const cancelIdleCallbackPolyfill =
      typeof window !== 'undefined' && 'cancelIdleCallback' in window
        ? window.cancelIdleCallback
        : clearTimeout;

    // Defer setup during idle time for faster initial paint
    const idleId = requestIdleCallbackPolyfill(setupProxy, { timeout: 2000 });

    return () => {
      cancelIdleCallbackPolyfill(idleId);
      ScrollTrigger.clearScrollMemory();
    };
  }, []);

  return null;
}

/**
 * Smooth Scroll Provider
 * Uses ReactLenis with scroller proxy for proper GSAP integration
 * CGMWTAUG2025 PATTERN: Keep Lenis running on ALL devices with optimized settings
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isIOSDevice, setIsIOSDevice] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setIsIOSDevice(isIOS());

    // CGMWTAUG2025 pattern: Use 1000px breakpoint for mobile detection
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1000);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });

    // Defer GSAP/ScrollTrigger setup to idle time for better FCP
    const setupGSAP = () => {
      // ScrollTrigger config - optimized for performance
      ScrollTrigger.config({
        ignoreMobileResize: true,
        autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
        limitCallbacks: true, // Reduce callback frequency
        syncInterval: isIOS() ? 100 : 60, // iOS: sync less frequently for better performance
      });

      // Optimize GSAP ticker for mobile performance
      const isMobileWidth = window.innerWidth <= 1000;
      if (isMobileWidth) {
        // More forgiving on mobile, especially iOS
        gsap.ticker.lagSmoothing(isIOS() ? 1500 : 1000, isIOS() ? 20 : 16);
      } else {
        gsap.ticker.lagSmoothing(500, 33);
      }
    };

    // Defer GSAP setup during idle time
    const requestIdleCallbackPolyfill =
      'requestIdleCallback' in window
        ? window.requestIdleCallback
        : (cb: IdleRequestCallback) => setTimeout(cb, 1);

    requestIdleCallbackPolyfill(setupGSAP, { timeout: 1000 });

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

  // Select settings based on viewport width and device type
  const scrollSettings = isMobile ? getMobileSettings(isIOSDevice) : desktopSettings;

  // CRITICAL: ALWAYS render ReactLenis to maintain ScrollTrigger proxy on all devices
  return (
    <ViewTransitions>
      <ReactLenis root options={scrollSettings}>
        <ScrollTriggerSync />
        {children}
      </ReactLenis>
    </ViewTransitions>
  );
}
