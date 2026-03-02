'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useStore } from '@/stores/useStore';
import { useScrollLock } from '@/hooks/useScrollLock';
import { scrollTriggerManager } from '@/utils/scrollTriggerManager';
import './TRDLoader.css';

interface TRDLoaderProps {
  onComplete: () => void;
}

const LOADER_SESSION_KEY = 'trd-preloader-shown';
const MIN_DISPLAY_MS = 1500;
const FONT_TIMEOUT_MS = 3000;
const LOAD_TIMEOUT_MS = 8000;
const EXIT_DURATION_MS = 800;

export function TRDLoader({ onComplete }: TRDLoaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [shouldLockScroll, setShouldLockScroll] = useState(false);
  const { setIsLoading } = useStore();
  const hasStarted = useRef(false);
  const onCompleteRef = useRef(onComplete);
  const mountTime = useRef(Date.now());

  useScrollLock(shouldLockScroll);
  onCompleteRef.current = onComplete;

  const triggerExit = useCallback(() => {
    const elapsed = Date.now() - mountTime.current;
    const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);

    setTimeout(() => {
      setIsExiting(true);
      setIsLoading(false);
      onCompleteRef.current();

      setTimeout(() => {
        setShouldLockScroll(false);
        setIsVisible(false);
      }, EXIT_DURATION_MS);
    }, remaining);
  }, [setIsLoading]);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    // Session check: skip on revisit
    try {
      const wasShown = sessionStorage.getItem(LOADER_SESSION_KEY);
      if (wasShown) {
        setIsVisible(false);
        setIsLoading(false);
        onCompleteRef.current();
        return;
      }
      sessionStorage.setItem(LOADER_SESSION_KEY, 'true');
    } catch {
      // sessionStorage unavailable (private browsing, etc.)
    }

    setShouldLockScroll(true);

    let fontsReady = false;
    let pageLoaded = false;
    let scrollTriggerReady = false;
    let hasExited = false;

    const checkAllReady = () => {
      if (hasExited) return;
      if (fontsReady && pageLoaded && scrollTriggerReady) {
        hasExited = true;
        triggerExit();
      }
    };

    // 1. Font readiness
    Promise.race([
      document.fonts.ready,
      new Promise<void>(resolve => setTimeout(resolve, FONT_TIMEOUT_MS)),
    ]).then(() => {
      fontsReady = true;
      checkAllReady();
    }).catch(() => {
      fontsReady = true;
      checkAllReady();
    });

    // 2. Page load
    if (document.readyState === 'complete') {
      pageLoaded = true;
    } else {
      const onLoad = () => {
        pageLoaded = true;
        checkAllReady();
      };
      window.addEventListener('load', onLoad);
      setTimeout(() => {
        if (!pageLoaded) {
          window.removeEventListener('load', onLoad);
          pageLoaded = true;
          checkAllReady();
        }
      }, LOAD_TIMEOUT_MS);
    }

    // 3. ScrollTrigger readiness
    scrollTriggerManager.onReady(() => {
      scrollTriggerReady = true;
      checkAllReady();
    });

    // Check if already ready
    if (scrollTriggerManager.ready) {
      scrollTriggerReady = true;
    }

    checkAllReady();
  }, [setIsLoading, triggerExit]);

  if (!isVisible) return null;

  return (
    <div
      className={`trd-loader ${isExiting ? 'trd-loader--exiting' : ''}`}
      aria-hidden="true"
      role="presentation"
    >
      <div className="trd-loader__letters">
        <span className="trd-loader__letter trd-loader__letter--t">T</span>
        <span className="trd-loader__letter trd-loader__letter--r">R</span>
        <span className="trd-loader__letter trd-loader__letter--d">D</span>
      </div>
    </div>
  );
}

export default TRDLoader;
