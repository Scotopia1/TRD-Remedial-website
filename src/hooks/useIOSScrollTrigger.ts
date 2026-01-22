import { useEffect, RefObject } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isIOS } from '@/utils/deviceDetect';
import { scrollTriggerManager } from '@/utils/scrollTriggerManager';

/**
 * iOS ScrollTrigger Configuration
 *
 * ScrollTrigger can be unreliable on iOS Safari due to:
 * - Dynamic address bar showing/hiding
 * - Momentum scrolling
 * - Viewport height changes
 *
 * This hook provides iOS-specific adjustments and IntersectionObserver fallback
 */

interface IOSScrollTriggerConfig {
  trigger: RefObject<Element> | Element | string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  markers?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
  toggleActions?: string;
}

export function useIOSScrollTrigger(config: IOSScrollTriggerConfig) {
  useEffect(() => {
    const isIOSDevice = isIOS();

    // Resolve RefObject to actual element
    const resolvedTrigger =
      typeof config.trigger === 'string'
        ? config.trigger
        : 'current' in config.trigger
        ? config.trigger.current
        : config.trigger;

    const adjustedConfig = {
      ...config,
      trigger: resolvedTrigger,
    };

    // Adjust trigger positions for iOS (trigger 10% earlier to compensate for momentum)
    if (isIOSDevice && config.start) {
      adjustedConfig.start = adjustStartForIOS(config.start);
    }

    let instance: ScrollTrigger | null = null;
    let observer: IntersectionObserver | null = null;

    scrollTriggerManager.onReady(() => {
      // Create ScrollTrigger instance only if trigger is resolved
      if (!adjustedConfig.trigger) return;

      instance = ScrollTrigger.create(adjustedConfig);

      // Add IntersectionObserver fallback for iOS reliability
      if (isIOSDevice && config.onEnter && resolvedTrigger) {
        const element =
          typeof resolvedTrigger === 'string'
            ? document.querySelector(resolvedTrigger)
            : resolvedTrigger;

        if (element) {
          observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting && config.onEnter) {
                config.onEnter();
              }
            },
            {
              threshold: 0.1,
              rootMargin: '0px 0px -10% 0px', // Trigger slightly earlier
            }
          );
          observer.observe(element);
        }
      }

      scrollTriggerManager.requestRefresh();
    });

    return () => {
      instance?.kill();
      observer?.disconnect();
    };
  }, [config]);
}

/**
 * Adjust ScrollTrigger start position for iOS
 *
 * iOS momentum scrolling can cause triggers to fire late.
 * This function adjusts start positions to trigger 10% earlier.
 */
function adjustStartForIOS(start: string): string {
  // Parse patterns like "top 70%" or "center center"
  const percentageMatch = start.match(/(\w+)\s+(\d+)%/);

  if (percentageMatch) {
    const position = percentageMatch[1]; // "top", "center", "bottom"
    const percentage = parseInt(percentageMatch[2]);
    const adjusted = Math.min(percentage + 10, 100); // Add 10%, cap at 100%
    return `${position} ${adjusted}%`;
  }

  // Return unchanged for non-percentage values
  return start;
}
