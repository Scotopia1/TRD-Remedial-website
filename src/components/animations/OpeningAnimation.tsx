'use client';

import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface OpeningAnimationProps {
  onComplete: () => void;
  videoSrc?: string;
  posterSrc?: string;
}

export function OpeningAnimation({
  onComplete,
  videoSrc = '/videos/opening-animation.mp4',
  posterSrc = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&h=1080&fit=crop',
}: OpeningAnimationProps) {
  const [hasVisited, setHasVisited] = useState(true); // Start as true to check localStorage
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if user has visited before
    const visited = localStorage.getItem('trd-opening-animation-seen');

    if (visited === 'true') {
      // Skip animation if already seen
      onComplete();
      return;
    }

    // Show animation for first-time visitors
    setHasVisited(false);
    setIsPlaying(true);
  }, [onComplete]);

  const handleComplete = () => {
    // Mark as seen in localStorage
    localStorage.setItem('trd-opening-animation-seen', 'true');
    setIsPlaying(false);

    // Small delay for smooth transition
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  const handleVideoEnd = () => {
    handleComplete();
  };

  // Don't render if already visited
  if (hasVisited) {
    return null;
  }

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
