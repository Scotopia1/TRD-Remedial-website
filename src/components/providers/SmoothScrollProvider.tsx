'use client';

import { ReactNode, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface SmoothScrollProviderProps {
  children: ReactNode;
}

/**
 * Smooth scroll provider using Lenis
 * Disabled on mobile for better performance
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Check if on mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // Only enable smooth scroll on desktop
    if (isMobile) return;

    // Initialize Lenis with enhanced smooth scrolling settings
    const lenis = new Lenis({
      duration: 1.5, // Increased for silky smooth scrolling
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8, // Reduced for more controlled scrolling
      touchMultiplier: 1.5,
      infinite: false,
      autoResize: true, // Auto-adjust on window resize
      syncTouch: true, // Better touch device support
      syncTouchLerp: 0.1, // Smooth touch interpolation
    });

    lenisRef.current = lenis;

    // Integrate Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Cleanup
    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  return <>{children}</>;
}
