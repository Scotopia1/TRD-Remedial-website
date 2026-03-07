'use client';

import { useRef, useEffect, useState } from 'react';
import { isMobile } from '@/utils/deviceDetect';

interface OptimizedVideoProps {
  src: string; // full URL or path to the .mp4 file
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
  const [isClient, setIsClient] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  const shouldDeferLoad = isClient && isMobileDevice;
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setIsMobileDevice(isMobile());
  }, []);

  useEffect(() => {
    if (!isClient) return;

    if (shouldDeferLoad) {
      const timeoutId = setTimeout(() => {
        setIsLoaded(true);
      }, 1500);

      return () => clearTimeout(timeoutId);
    }

    if (priority || !videoRef.current) {
      setIsLoaded(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsLoaded(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '100px' }
    );

    observer.observe(videoRef.current);

    return () => observer.disconnect();
  }, [priority, isClient, shouldDeferLoad]);

  const preloadStrategy = isClient
    ? shouldDeferLoad
      ? 'none'
      : priority
      ? 'metadata'
      : 'none'
    : 'none';

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay={autoPlay && isLoaded}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      preload={preloadStrategy}
      poster={poster}
      disableRemotePlayback
    >
      {isLoaded && (
        <source src={src} type="video/mp4" />
      )}
      Your browser does not support the video tag.
    </video>
  );
}
