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

// Default desktop settings (used during SSR and initial load)
const desktopSettings = {
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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
 * Syncs Lenis scroll position with GSAP ScrollTrigger
 */
function ScrollTriggerSync() {
  const hasInitialized = useRef(false);

  useLenis((lenis) => {
    // Update ScrollTrigger on every Lenis scroll
    ScrollTrigger.update();
  });

  useEffect(() => {
    // Only refresh once after initial mount
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      // Delay refresh to ensure all components are mounted
      const timeoutId = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, []);

  return null;
}

/**
 * Smooth Scroll Provider - CGMWTAUG2025 Pattern
 * Uses ReactLenis with responsive device-specific settings
 * Clean integration without ScrollTrigger conflicts
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const [isMobile, setIsMobile] = useState(false); // Default to desktop (safer for SSR)
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1000);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // ScrollTrigger config (no normalizeScroll - that caused conflicts)
    ScrollTrigger.config({
      ignoreMobileResize: true,
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
    });

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Refresh ScrollTrigger when mobile state changes (after initial load)
  useEffect(() => {
    if (isClient) {
      // Small delay to let Lenis update with new settings
      const timeoutId = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
      return () => clearTimeout(timeoutId);
    }
  }, [isMobile, isClient]);

  // Select settings based on device type
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
