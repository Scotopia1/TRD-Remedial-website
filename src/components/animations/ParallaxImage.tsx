'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useLenis } from 'lenis/react';

const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
}

export function ParallaxImage({ src, alt, speed = 0.3, className = '' }: ParallaxImageProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const bounds = useRef<{ top: number; bottom: number; height: number } | null>(null);
  const currentTranslateY = useRef(0);
  const targetTranslateY = useRef(0);
  const rafId = useRef<number | null>(null);
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

  // Setup bounds tracking and animation loop
  useEffect(() => {
    if (!isDesktop) return;

    const updateBounds = () => {
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        bounds.current = {
          top: rect.top + window.scrollY,
          bottom: rect.bottom + window.scrollY,
          height: rect.height,
        };
      }
    };

    updateBounds();
    window.addEventListener('resize', updateBounds);

    // Animation loop using LERP interpolation
    const animate = () => {
      if (imageRef.current && bounds.current) {
        currentTranslateY.current = lerp(
          currentTranslateY.current,
          targetTranslateY.current,
          0.1 // Smoothing factor
        );

        // Only update transform if there's significant change
        if (
          Math.abs(currentTranslateY.current - targetTranslateY.current) > 0.01
        ) {
          imageRef.current.style.transform = `translateY(${currentTranslateY.current}px) scale(1.5)`;
        }
      }
      rafId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateBounds);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [isDesktop]);

  // Update target translateY based on scroll position
  useLenis(({ scroll }: any) => {
    if (!isDesktop || !bounds.current) return;

    const windowHeight = window.innerHeight;
    const elementMiddle = bounds.current.top + bounds.current.height / 2;
    const windowMiddle = scroll + windowHeight / 2;
    const distanceFromCenter = windowMiddle - elementMiddle;

    targetTranslateY.current = distanceFromCenter * speed;
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
