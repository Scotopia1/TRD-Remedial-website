'use client';

import { useState, useEffect, useRef } from 'react';
import { useStore } from '@/stores/useStore';
import { useScrollLock } from '@/hooks/useScrollLock';
import './BlueprintPreloader.css';

interface BlueprintPreloaderProps {
  onComplete: () => void;
}

type Phase = 0 | 1 | 2 | 3 | 4;

const PRELOADER_SESSION_KEY = 'trd-preloader-shown';

export function BlueprintPreloader({ onComplete }: BlueprintPreloaderProps) {
  const [phase, setPhase] = useState<Phase>(0);
  const [isVisible, setIsVisible] = useState(true);
  const [shouldLockScroll, setShouldLockScroll] = useState(false); // Initialize to false
  const { setIsLoading } = useStore();
  const hasStarted = useRef(false);
  const onCompleteRef = useRef(onComplete);

  // TEMP DISABLED - Testing if this is causing issues
  // useScrollLock(shouldLockScroll);

  // Keep ref updated
  onCompleteRef.current = onComplete;

  useEffect(() => {
    // Prevent double execution
    if (hasStarted.current) return;
    hasStarted.current = true;

    // Check if preloader was already shown in this session
    const wasShown = sessionStorage.getItem(PRELOADER_SESSION_KEY);
    if (wasShown) {
      // Skip animation - immediately complete
      setIsVisible(false);
      setIsLoading(false);
      // shouldLockScroll already false, no need to set
      onCompleteRef.current();
      return;
    }

    // Mark as shown for this session
    sessionStorage.setItem(PRELOADER_SESSION_KEY, 'true');

    // Now lock scroll for the animation
    setShouldLockScroll(true);

    // Start phase 1 after a brief delay to let components render
    const startTimer = setTimeout(() => setPhase(1), 300);

    // Phase 2: Letters snap into focus (at 1s)
    const phase2Timer = setTimeout(() => setPhase(2), 1000);

    // Phase 3: The unified zoom reveal (at 3s)
    const phase3Timer = setTimeout(() => setPhase(3), 3000);

    // Trigger hero content to appear as circles expand (at 3.7s)
    const contentTimer = setTimeout(() => {
      setIsLoading(false);
      onCompleteRef.current();
    }, 3700);

    // Phase 4: Complete and fade out (at 5.5s)
    const phase4Timer = setTimeout(() => {
      setPhase(4);
      // Release scroll lock
      setShouldLockScroll(false);
    }, 5500);

    // Hide loader after fade completes (at 6s)
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 6000);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(phase2Timer);
      clearTimeout(phase3Timer);
      clearTimeout(contentTimer);
      clearTimeout(phase4Timer);
      clearTimeout(hideTimer);
    };
  }, [setIsLoading]);

  if (!isVisible) return null;

  const phaseClasses = [
    phase >= 1 ? 'phase-1' : '',
    phase >= 2 ? 'phase-2' : '',
    phase >= 3 ? 'phase-3' : '',
    phase >= 4 ? 'phase-4' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={`blueprint-loader-container ${phaseClasses}`}>
      {/* Layer 1: Blur/Dark overlay with SVG mask for circle cutouts */}
      <svg
        className="overlay-svg"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Filter for blur effect */}
          <filter id="blur-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0" className="blur-amount" />
          </filter>

          {/* Mask with expanding circle cutouts */}
          <mask id="overlay-mask">
            <rect x="-500" y="-500" width="2000" height="2000" fill="white" />
            <circle className="mask-circle" cx="350" cy="500" r="65" fill="black" />
            <circle className="mask-circle" cx="500" cy="500" r="65" fill="black" />
            <circle className="mask-circle" cx="650" cy="500" r="65" fill="black" />
          </mask>

          {/* Mask to clean internal lines from letters T, R, and D */}
          <mask id="clean-outline-mask">
            <rect x="0" y="0" width="1000" height="1000" fill="white" />
            <g
              fontFamily="Inter, sans-serif"
              fontWeight="900"
              fontSize="90"
              fill="black"
              textAnchor="middle"
            >
              <text x="350" y="532">T</text>
              <text x="500" y="532">R</text>
              <text x="650" y="532">D</text>
            </g>
          </mask>

          {/* Mask for background lines to keep them outside the branding circles */}
          <mask id="lines-mask">
            <rect x="-500" y="-500" width="2000" height="2000" fill="white" />
            <circle cx="350" cy="500" r="65" fill="black" />
            <circle cx="500" cy="500" r="65" fill="black" />
            <circle cx="650" cy="500" r="65" fill="black" />
          </mask>
        </defs>

        {/* Dark overlay with circle cutouts */}
        <rect
          x="-500"
          y="-500"
          width="2000"
          height="2000"
          className="dark-overlay"
          mask="url(#overlay-mask)"
        />

        {/* Floor Plan Technical Layer */}
        <g className="floorplan-layer" mask="url(#lines-mask)">
          {/* Exterior Structure */}
          <path className="const-line heavy" d="M100 200 H900 V800 H100 Z" />

          {/* Internal Walls */}
          <path
            className="const-line"
            d="M300 200 V400 M300 600 V800 M100 500 H300 M700 200 V800 M700 500 H900"
          />
          <path className="const-line dashed" d="M400 300 H600 V700 H400 Z" />

          {/* Dimensioning - Horizontal */}
          <line className="const-line" x1="100" y1="150" x2="900" y2="150" />
          <line className="const-line" x1="100" y1="140" x2="100" y2="160" />
          <line className="const-line" x1="900" y1="140" x2="900" y2="160" />
          <text x="500" y="145" textAnchor="middle" className="tick-label">
            REF_DIM_EXT: 80.00m
          </text>

          {/* Dimensioning - Vertical */}
          <line className="const-line" x1="50" y1="200" x2="50" y2="800" />
          <line className="const-line" x1="40" y1="200" x2="60" y2="200" />
          <line className="const-line" x1="40" y1="800" x2="60" y2="800" />
          <text
            x="45"
            y="500"
            textAnchor="middle"
            className="tick-label"
            transform="rotate(-90 45 500)"
          >
            SPAN_Y: 60.00m
          </text>
        </g>

        {/* Main Global Grid Axes */}
        <g className="main-axes" mask="url(#lines-mask)">
          <line className="const-line heavy" x1="0" y1="500" x2="1000" y2="500" />
          <line className="const-line heavy" x1="500" y1="0" x2="500" y2="1000" />
        </g>

        {/* The Branding Units - T R D */}
        <g mask="url(#clean-outline-mask)">
          {/* Unit T */}
          <g className="branding-unit">
            <circle className="unit-circle" cx="350" cy="500" r="65" />
            <text
              x="350"
              y="532"
              textAnchor="middle"
              className="branding-text-stroke"
            >
              T
            </text>
          </g>

          {/* Unit R */}
          <g className="branding-unit">
            <circle className="unit-circle" cx="500" cy="500" r="65" />
            <text
              x="500"
              y="532"
              textAnchor="middle"
              className="branding-text-stroke"
            >
              R
            </text>
          </g>

          {/* Unit D */}
          <g className="branding-unit">
            <circle className="unit-circle" cx="650" cy="500" r="65" />
            <text
              x="650"
              y="532"
              textAnchor="middle"
              className="branding-text-stroke"
            >
              D
            </text>
          </g>
        </g>
      </svg>

      {/* Backdrop blur layer - behind the SVG */}
      <div className="backdrop-blur-layer" />

      {/* Solid black cover - hides everything until components are ready */}
      <div className="initial-black-cover" />
    </div>
  );
}

export default BlueprintPreloader;
