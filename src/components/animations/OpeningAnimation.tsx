'use client';

import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useStore } from '@/stores/useStore';

interface OpeningAnimationProps {
  onComplete: () => void;
  videoSrc?: string;
  posterSrc?: string;
}

// TRD Project Images to preload
const projectImages = [
  'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
  '/images/team/christopher-nassif.png',
  '/images/team/charly-nassif.png',
];

export function OpeningAnimation({
  onComplete,
  videoSrc = '/videos/opening-animation.mp4',
  posterSrc = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&h=1080&fit=crop',
}: OpeningAnimationProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { setIsLoading } = useStore();

  useEffect(() => {
    // Always show opener on every visit
    setIsLoading(true);
    setIsPlaying(true);

    // Start preloading assets
    preloadAssets();
  }, [setIsLoading]);

  const preloadAssets = async () => {
    try {
      // Preload all images
      const imagePromises = projectImages.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve; // Resolve even on error to not block
          img.src = src;
        });
      });

      await Promise.all(imagePromises);
      setAssetsLoaded(true);
    } catch (error) {
      console.error('Error preloading assets:', error);
      setAssetsLoaded(true); // Continue even if preloading fails
    }
  };

  useEffect(() => {
    // Only complete when BOTH video ended AND assets loaded
    if (videoEnded && assetsLoaded) {
      handleComplete();
    } else if (videoEnded && !assetsLoaded) {
      // Video ended but assets not loaded - pause on last frame
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
  }, [videoEnded, assetsLoaded]);

  const handleComplete = () => {
    setIsLoading(false);
    setIsPlaying(false);

    // Small delay for smooth transition
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  const handleVideoEnd = () => {
    setVideoEnded(true);
    // Don't call handleComplete here - let useEffect handle it
  };

  return (
    <AnimatePresence>
      {isPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        >
          {/* Video Element */}
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            poster={posterSrc}
            className="w-full h-full object-cover"
          >
            <source src={videoSrc} type="video/webm" />
            <source src={videoSrc.replace('.webm', '.mp4')} type="video/mp4" />
            {/* Fallback for browsers that don't support video */}
            <img
              src={posterSrc}
              alt="TRD Remedial - The Remedial Experts"
              className="w-full h-full object-cover"
            />
          </video>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
