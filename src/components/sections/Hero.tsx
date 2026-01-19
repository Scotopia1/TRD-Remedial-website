'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { AnimatedCopy } from '@/components/animations/AnimatedCopy';
import { DissolveCanvas } from '@/components/animations/DissolveCanvas';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  showContent?: boolean;
}

export function Hero({ showContent = true }: HeroProps) {
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroH2Ref = useRef<HTMLHeadingElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Handle SSR
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Word-by-word text reveal animation - exact copy from inspiration
  useEffect(() => {
    if (!isMounted || !heroH2Ref.current || !heroContentRef.current) return;

    let split: SplitType | null = null;
    let scrollTrigger: ScrollTrigger | null = null;

    // Wait for fonts to load before splitting
    document.fonts.ready.then(() => {
      if (!heroH2Ref.current || !heroContentRef.current) return;

      // Split text into words
      split = new SplitType(heroH2Ref.current, { types: 'words' });
      const words = split.words || [];

      if (words.length === 0) return;

      // Set initial state - all words invisible
      gsap.set(words, { opacity: 0 });

      // Create scroll-driven animation - exact match to inspiration
      scrollTrigger = ScrollTrigger.create({
        trigger: heroContentRef.current,
        start: 'top 25%',
        end: 'bottom 100%',
        onUpdate: (self) => {
          const progress = self.progress;
          const totalWords = words.length;

          words.forEach((word, index) => {
            const wordProgress = index / totalWords;
            const nextWordProgress = (index + 1) / totalWords;

            let opacity = 0;

            if (progress >= nextWordProgress) {
              opacity = 1;
            } else if (progress >= wordProgress) {
              const fadeProgress =
                (progress - wordProgress) / (nextWordProgress - wordProgress);
              opacity = fadeProgress;
            }

            gsap.to(word, {
              opacity: opacity,
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
      if (split) {
        split.revert();
      }
    };
  }, [isMounted]);

  return (
    <section className="hero hero-extended">
      {/* Video Background */}
      <div className="hero-img">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="hero-video"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Main Title - stays in initial viewport */}
      <div className="hero-header">
        <AnimatedCopy tag="h1" animateOnScroll={false} delay={0.1} trigger={showContent}>
          THE
        </AnimatedCopy>
        <AnimatedCopy tag="h1" animateOnScroll={false} delay={0.2} trigger={showContent}>
          REMEDIAL
        </AnimatedCopy>
        <AnimatedCopy tag="h1" animateOnScroll={false} delay={0.3} trigger={showContent}>
          EXPERTS
        </AnimatedCopy>
      </div>

      {/* WebGL Dissolve Effect Canvas */}
      <DissolveCanvas color="#ffffff" spread={0.5} speed={2} />

      {/* Content that reveals on scroll - exact match to inspiration structure */}
      <div ref={heroContentRef} className="hero-content">
        <h2 ref={heroH2Ref} className="hero-tagline">
          We solve structural challenges others can't handle. With 8 years of precision remedial expertise, 24/7 emergency response, and unwavering commitment to building compliance, TRD delivers solutions that last.
        </h2>
      </div>
    </section>
  );
}
