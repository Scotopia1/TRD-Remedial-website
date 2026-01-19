'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import './ScrollTextReveal.css';

gsap.registerPlugin(ScrollTrigger);

interface ScrollTextRevealProps {
  children: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p';
  start?: string;
  end?: string;
}

export function ScrollTextReveal({
  children,
  className = '',
  tag = 'h2',
  start = 'top 25%',
  end = 'bottom 100%',
}: ScrollTextRevealProps) {
  const textRef = useRef<HTMLElement>(null);
  const splitRef = useRef<SplitType | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Handle SSR
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !textRef.current) return;

    let scrollTrigger: ScrollTrigger | null = null;

    // Wait for fonts to load before splitting
    document.fonts.ready.then(() => {
      if (!textRef.current) return;

      // Split text into words using split-type
      splitRef.current = new SplitType(textRef.current, {
        types: 'words',
        tagName: 'span',
      });

      const words = splitRef.current.words || [];
      if (words.length === 0) return;

      // Set initial state - all words invisible
      gsap.set(words, { opacity: 0 });

      // Create scroll-driven animation
      scrollTrigger = ScrollTrigger.create({
        trigger: textRef.current,
        start,
        end,
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const totalWords = words.length;

          words.forEach((word, index) => {
            const wordProgress = index / totalWords;
            const nextWordProgress = (index + 1) / totalWords;

            let opacity = 0;

            // Word fully revealed
            if (progress >= nextWordProgress) {
              opacity = 1;
            }
            // Word currently fading in
            else if (progress >= wordProgress) {
              const fadeProgress =
                (progress - wordProgress) / (nextWordProgress - wordProgress);
              opacity = fadeProgress;
            }

            gsap.to(word, {
              opacity,
              duration: 0.1,
              overwrite: true,
            });
          });
        },
      });
    });

    // Cleanup
    return () => {
      if (scrollTrigger) {
        scrollTrigger.kill();
      }
      if (splitRef.current) {
        splitRef.current.revert();
        splitRef.current = null;
      }
    };
  }, [isMounted, start, end]);

  const Tag = tag;

  return (
    <Tag
      ref={textRef as React.RefObject<HTMLHeadingElement>}
      className={`scroll-text-reveal ${className}`}
    >
      {children}
    </Tag>
  );
}
