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
  videoSrc = '/videos/opening-animation.webm',
  posterSrc = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&h=1080&fit=crop',
}: OpeningAnimationProps) {
  const [hasVisited, setHasVisited] = useState(true); // Start as true to check localStorage
  const [showSkip, setShowSkip] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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

    // Show skip button after 1 second
    const skipTimeout = setTimeout(() => {
      setShowSkip(true);
    }, 1000);

    // Auto-complete after 5 seconds
    const autoCompleteTimeout = setTimeout(() => {
      handleComplete();
    }, 5000);

    timeoutRef.current = autoCompleteTimeout;

    // Cleanup
    return () => {
      clearTimeout(skipTimeout);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleComplete = () => {
    // Mark as seen in localStorage
    localStorage.setItem('trd-opening-animation-seen', 'true');
    setIsPlaying(false);

    // Small delay for smooth transition
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  const handleSkip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    handleComplete();
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

          {/* Skip Button */}
          <AnimatePresence>
            {showSkip && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={handleSkip}
                className="absolute bottom-8 right-8 px-6 py-3 bg-white/10 hover:bg-white/20
                         backdrop-blur-sm border border-white/20 rounded-lg text-white
                         font-medium transition-all duration-300 hover:scale-105
                         focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Skip opening animation"
              >
                Skip
              </motion.button>
            )}
          </AnimatePresence>

          {/* Loading indicator (optional, for slow connections) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="w-12 h-12 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
