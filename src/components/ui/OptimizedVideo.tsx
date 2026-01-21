'use client';

import { useRef, useEffect, useState } from 'react';

interface OptimizedVideoProps {
  src: string; // base path without extension (e.g., "/videos/hero-video")
  poster?: string;
  className?: string;
  priority?: boolean; // Load immediately vs lazy
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
}

export function OptimizedVideo({
  src,
  poster,
  className = '',
  priority = false,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
}: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(priority);

  useEffect(() => {
    if (priority || !videoRef.current) return;

    // Lazy load video using Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsLoaded(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '100px' } // Start loading 100px before entering viewport
    );

    observer.observe(videoRef.current);

    return () => observer.disconnect();
  }, [priority]);

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay={autoPlay && isLoaded}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      preload={priority ? 'auto' : 'metadata'}
      poster={poster}
    >
      {isLoaded && (
        <>
          {/* WebM for modern browsers (Chrome, Firefox, Edge) */}
          <source src={`${src}.webm`} type="video/webm" />
          {/* MP4 fallback for Safari and older browsers */}
          <source src={`${src}-optimized.mp4`} type="video/mp4" />
        </>
      )}
      Your browser does not support the video tag.
    </video>
  );
}
