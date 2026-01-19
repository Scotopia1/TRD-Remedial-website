'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useLenis } from 'lenis/react';
import { gsap } from 'gsap';

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
}

export function ParallaxImage({ src, alt, speed = 0.3, className = '' }: ParallaxImageProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const bounds = useRef<{ top: number; height: number } | null>(null);
  const quickToY = useRef<gsap.QuickToFunc | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // Check if desktop (disable parallax on mobile < 900px)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 900);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Setup GSAP quickTo for smooth interpolation (uses GSAP's unified ticker)
  useEffect(() => {
    if (!isDesktop || !imageRef.current) return;

    // Create quickTo for smooth Y translation
    quickToY.current = gsap.quickTo(imageRef.current, 'y', {
      duration: 0.6,
      ease: 'power2.out',
    });

    // Set initial scale
    gsap.set(imageRef.current, { scale: 1.5 });

    const updateBounds = () => {
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        bounds.current = {
          top: rect.top + window.scrollY,
          height: rect.height,
        };
      }
    };

    updateBounds();
    window.addEventListener('resize', updateBounds);

    return () => {
      window.removeEventListener('resize', updateBounds);
      quickToY.current = null;
    };
  }, [isDesktop]);

  // Use Lenis scroll position for parallax calculation
  useLenis(({ scroll }: { scroll: number }) => {
    if (!isDesktop || !bounds.current || !quickToY.current) return;

    const windowHeight = window.innerHeight;
    const elementMiddle = bounds.current.top + bounds.current.height / 2;
    const windowMiddle = scroll + windowHeight / 2;
    const distanceFromCenter = windowMiddle - elementMiddle;

    // Use GSAP quickTo for smooth interpolation
    quickToY.current(distanceFromCenter * speed);
  });

  return (
    <img
      ref={imageRef}
      src={src}
      alt={alt}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        willChange: isDesktop ? 'transform' : 'auto',
        transform: isDesktop ? 'translateY(0) scale(1.5)' : 'none',
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    />
  );
}
