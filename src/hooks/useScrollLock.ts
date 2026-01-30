'use client';

import { useEffect, useRef } from 'react';

// Global state for scroll lock management
let lockCount = 0;
let originalOverflow: string | null = null;
let originalPaddingRight: string | null = null;

/**
 * Centralized scroll lock management with reference counting.
 * Prevents conflicts between multiple components trying to lock scroll.
 *
 * @param isLocked - Whether scroll should be locked
 *
 * @example
 * ```tsx
 * // In a modal component
 * useScrollLock(isOpen);
 *
 * // In a menu component
 * useScrollLock(isMenuOpen);
 * ```
 *
 * Multiple components can use this hook simultaneously. The scroll will only
 * be unlocked when all components have released their locks.
 */
export function useScrollLock(isLocked: boolean) {
  const isLockedRef = useRef(false);

  useEffect(() => {
    // If lock state hasn't changed, do nothing
    if (isLockedRef.current === isLocked) return;

    if (isLocked) {
      // Increment lock count
      lockCount++;

      // On first lock, save original state and lock scroll
      if (lockCount === 1) {
        originalOverflow = document.body.style.overflow || null;
        originalPaddingRight = document.body.style.paddingRight || null;

        // Lock scroll
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        // Prevent layout shift from scrollbar removal
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        if (scrollbarWidth > 0) {
          document.body.style.paddingRight = `${scrollbarWidth}px`;
        }
      }

      isLockedRef.current = true;
    } else {
      // Decrement lock count
      if (lockCount > 0) {
        lockCount--;
      }

      // Only unlock when all locks are released
      if (lockCount === 0) {
        // Restore original overflow values
        if (originalOverflow !== null) {
          document.body.style.overflow = originalOverflow;
        } else {
          document.body.style.removeProperty('overflow');
        }

        if (originalPaddingRight !== null) {
          document.body.style.paddingRight = originalPaddingRight;
        } else {
          document.body.style.removeProperty('padding-right');
        }

        document.documentElement.style.removeProperty('overflow');

        // Reset saved values
        originalOverflow = null;
        originalPaddingRight = null;
      }

      isLockedRef.current = false;
    }

    // Cleanup on unmount
    return () => {
      if (isLockedRef.current) {
        if (lockCount > 0) {
          lockCount--;
        }

        if (lockCount === 0) {
          document.body.style.removeProperty('overflow');
          document.body.style.removeProperty('padding-right');
          document.documentElement.style.removeProperty('overflow');
          originalOverflow = null;
          originalPaddingRight = null;
        }
      }
    };
  }, [isLocked]);
}
