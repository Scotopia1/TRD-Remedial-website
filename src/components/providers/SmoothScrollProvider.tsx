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
// CRITICAL: smoothTouch: true enables smooth scrolling on mobile while maintaining ScrollTrigger proxy
const mobileSettings = {
  duration: 0.8,              // Faster animations for mobile
  easing: easeOutExpo,
  direction: 'vertical' as const,
  orientation: 'vertical' as const,
  gestureOrientation: 'vertical' as const,
  smooth: true,               // Keep smooth scroll enabled
  smoothWheel: true,
  smoothTouch: true,          // CRITICAL: Enable touch scrolling (CGMWTAUG2025 pattern)
  touchMultiplier: 1.5,       // More responsive to swipes
  infinite: false,
  lerp: 0.09,                 // Faster interpolation for mobile
  wheelMultiplier: 1,
  syncTouch: true,
};

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
 * CGMWTAUG2025 PATTERN: Keep Lenis running on ALL devices with optimized settings
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // CGMWTAUG2025 pattern: Use 1000px breakpoint for mobile detection
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1000);
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
    if (window.innerWidth <= 1000) {
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

  // Select settings based on viewport width (CGMWTAUG2025 pattern)
  const scrollSettings = isMobile ? mobileSettings : desktopSettings;

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
