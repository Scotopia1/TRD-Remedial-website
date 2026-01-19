'use client';

import { ReactNode, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface SmoothScrollProviderProps {
  children: ReactNode;
}

/**
 * Enhanced Smooth Scroll Provider using Lenis
 * Supports desktop, iOS, and Android with device-specific optimizations
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Detect device type
    const userAgent = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isAndroid = /android/.test(userAgent);
    const isMobile = isIOS || isAndroid;
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    // Configure ScrollTrigger for all devices
    ScrollTrigger.config({
      ignoreMobileResize: true, // Prevents jumps when address bar appears/disappears
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
    });

    // Normalize wheel events across browsers
    ScrollTrigger.normalizeScroll({
      allowNestedScroll: true,
      lockAxis: false,
      momentum: (self) => Math.min(3, self.velocityY / 1000), // Smooth momentum
      type: 'wheel,touch,pointer',
      // Disable on iOS Safari due to known issues
      ...(isIOS && isSafari ? { type: 'wheel' } : {}),
    });

    // Device-specific Lenis configuration
    const getLenisConfig = () => {
      if (isIOS) {
        // iOS-specific config - lighter touch for native feel
        return {
          duration: 1.0,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical' as const,
          gestureOrientation: 'vertical' as const,
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 2,
          infinite: false,
          autoResize: true,
          syncTouch: true,
          syncTouchLerp: 0.075, // Lower lerp for iOS smoothness
          touchInertiaMultiplier: 35, // More natural iOS momentum
          prevent: (node: Element) => {
            // Prevent Lenis on elements that need native scroll
            return node.hasAttribute('data-lenis-prevent') ||
                   node.classList.contains('lenis-prevent') ||
                   node.tagName === 'INPUT' ||
                   node.tagName === 'TEXTAREA';
          },
        };
      }

      if (isAndroid) {
        // Android-specific config - handle various browser engines
        return {
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical' as const,
          gestureOrientation: 'vertical' as const,
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 1.8,
          infinite: false,
          autoResize: true,
          syncTouch: true,
          syncTouchLerp: 0.1,
          touchInertiaMultiplier: 30,
          prevent: (node: Element) => {
            return node.hasAttribute('data-lenis-prevent') ||
                   node.classList.contains('lenis-prevent') ||
                   node.tagName === 'INPUT' ||
                   node.tagName === 'TEXTAREA';
          },
        };
      }

      // Desktop config - silky smooth
      return {
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical' as const,
        gestureOrientation: 'vertical' as const,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.5,
        infinite: false,
        autoResize: true,
        syncTouch: true,
        syncTouchLerp: 0.1,
      };
    };

    // Initialize Lenis
    const lenis = new Lenis(getLenisConfig());
    lenisRef.current = lenis;

    // Integrate with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // RAF loop with GSAP ticker
    const rafCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    // Handle visibility change (tab switching)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        lenis.stop();
      } else {
        lenis.start();
        ScrollTrigger.refresh();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Handle resize with debounce
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        lenis.resize();
        ScrollTrigger.refresh();
      }, 150);
    };
    window.addEventListener('resize', handleResize);

    // iOS-specific: Handle orientation change
    if (isIOS) {
      const handleOrientationChange = () => {
        setTimeout(() => {
          lenis.resize();
          ScrollTrigger.refresh();
        }, 300); // Delay for iOS layout recalculation
      };
      window.addEventListener('orientationchange', handleOrientationChange);
    }

    // Android-specific: Handle virtual keyboard
    if (isAndroid) {
      const originalHeight = window.innerHeight;
      const handleAndroidResize = () => {
        if (window.innerHeight < originalHeight * 0.75) {
          // Keyboard likely open - pause smooth scroll
          lenis.stop();
        } else {
          lenis.start();
        }
      };
      window.addEventListener('resize', handleAndroidResize);
    }

    // Prevent overscroll/bounce on mobile
    if (isMobile) {
      document.body.style.overscrollBehavior = 'none';
      document.documentElement.style.overscrollBehavior = 'none';
    }

    // Cleanup
    return () => {
      lenis.destroy();
      gsap.ticker.remove(rafCallback);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.normalizeScroll(false);
    };
  }, []);

  return <>{children}</>;
}
