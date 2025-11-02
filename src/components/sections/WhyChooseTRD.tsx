'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './WhyChooseTRD.css';

export function WhyChooseTRD() {
  const sectionRef = useRef<HTMLElement>(null);
  const header1Ref = useRef<HTMLDivElement>(null);
  const header2Ref = useRef<HTMLDivElement>(null);
  const header3Ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const textContainerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  // Split text into words
  useEffect(() => {
    if (!textRef.current) return;

    const text = textRef.current.textContent || '';
    const words = text.split(/\s+/);
    textRef.current.innerHTML = '';

    words.forEach((word) => {
      if (word.trim()) {
        const wordContainer = document.createElement('div');
        wordContainer.className = 'word';

        const wordText = document.createElement('span');
        wordText.textContent = word;

        wordContainer.appendChild(wordText);
        textRef.current!.appendChild(wordContainer);
      }
    });
  }, []);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const headers = [header1Ref.current, header2Ref.current, header3Ref.current];

    // Animation 1: Slide in from sides as section comes into view
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top bottom',
      end: 'top top',
      scrub: 1,
      onUpdate: (self) => {
        if (headers[0] && headers[1] && headers[2]) {
          gsap.set(headers[0], { x: `${100 - self.progress * 100}%` });
          gsap.set(headers[1], { x: `${-100 + self.progress * 100}%` });
          gsap.set(headers[2], { x: `${100 - self.progress * 100}%` });
        }
      },
    });

    // Animation 2: Pin section + vertical movement + scale down
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: `+=${window.innerHeight * 2}`,
      pin: true,
      scrub: 1,
      pinSpacing: false,
      onUpdate: (self) => {
        if (!headers[0] || !headers[1] || !headers[2]) return;

        // First half: vertical movement
        if (self.progress <= 0.5) {
          const yProgress = self.progress / 0.5;
          gsap.set(headers[0], { y: `${yProgress * 100}%` });
          gsap.set(headers[2], { y: `${yProgress * -100}%` });
        } else {
          // Lock vertical position
          gsap.set(headers[0], { y: '100%' });
          gsap.set(headers[2], { y: '-100%' });

          // Second half: scale down
          const scaleProgress = (self.progress - 0.5) / 0.5;
          const minScale = window.innerWidth <= 1000 ? 0.3 : 0.1;
          const scale = 1 - scaleProgress * (1 - minScale);

          headers.forEach((header) => {
            if (header) gsap.set(header, { scale });
          });
        }
      },
    });

    // Animation 3: Word-by-word reveal with background highlight (from anime-text-container)
    if (textContainerRef.current && textRef.current) {
      const wordHighlightBgColor = '191, 188, 180'; // Beige/tan color

      ScrollTrigger.create({
        trigger: textContainerRef.current,
        pin: textContainerRef.current,
        start: 'top top',
        end: `+=${window.innerHeight * 4}`,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const words = Array.from(textRef.current!.querySelectorAll('.word'));
          const totalWords = words.length;

          words.forEach((word, index) => {
            const wordText = word.querySelector('span');
            if (!wordText) return;

            if (progress <= 0.7) {
              // Phase 1: Reveal animation (0-70%)
              const progressTarget = 0.7;
              const revealProgress = Math.min(1, progress / progressTarget);

              const overlapWords = 15;
              const totalAnimationLength = 1 + overlapWords / totalWords;

              const wordStart = index / totalWords;
              const wordEnd = wordStart + overlapWords / totalWords;

              const timelineScale =
                1 /
                Math.min(
                  totalAnimationLength,
                  1 + (totalWords - 1) / totalWords + overlapWords / totalWords
                );

              const adjustedStart = wordStart * timelineScale;
              const adjustedEnd = wordEnd * timelineScale;
              const duration = adjustedEnd - adjustedStart;

              const wordProgress =
                revealProgress <= adjustedStart
                  ? 0
                  : revealProgress >= adjustedEnd
                  ? 1
                  : (revealProgress - adjustedStart) / duration;

              // Word opacity
              (word as HTMLElement).style.opacity = String(wordProgress);

              // Background fade
              const backgroundFadeStart = wordProgress >= 0.9 ? (wordProgress - 0.9) / 0.1 : 0;
              const backgroundOpacity = Math.max(0, 1 - backgroundFadeStart);
              (word as HTMLElement).style.backgroundColor = `rgba(${wordHighlightBgColor}, ${backgroundOpacity})`;

              // Text reveal
              const textRevealThreshold = 0.9;
              const textRevealProgress =
                wordProgress >= textRevealThreshold
                  ? (wordProgress - textRevealThreshold) / (1 - textRevealThreshold)
                  : 0;
              (wordText as HTMLElement).style.opacity = String(Math.pow(textRevealProgress, 0.5));
            } else {
              // Phase 2: Reverse animation (70-100%)
              const reverseProgress = (progress - 0.7) / 0.3;
              (word as HTMLElement).style.opacity = '1';
              const targetTextOpacity = 1;

              const reverseOverlapWords = 5;
              const reverseWordStart = index / totalWords;
              const reverseWordEnd = reverseWordStart + reverseOverlapWords / totalWords;

              const reverseTimelineScale =
                1 /
                Math.max(
                  1,
                  (totalWords - 1) / totalWords + reverseOverlapWords / totalWords
                );

              const reverseAdjustedStart = reverseWordStart * reverseTimelineScale;
              const reverseAdjustedEnd = reverseWordEnd * reverseTimelineScale;
              const reverseDuration = reverseAdjustedEnd - reverseAdjustedStart;

              const reverseWordProgress =
                reverseProgress <= reverseAdjustedStart
                  ? 0
                  : reverseProgress >= reverseAdjustedEnd
                  ? 1
                  : (reverseProgress - reverseAdjustedStart) / reverseDuration;

              if (reverseWordProgress > 0) {
                (wordText as HTMLElement).style.opacity = String(
                  targetTextOpacity * (1 - reverseWordProgress)
                );
                (word as HTMLElement).style.backgroundColor = `rgba(${wordHighlightBgColor}, ${reverseWordProgress})`;
              } else {
                (wordText as HTMLElement).style.opacity = String(targetTextOpacity);
                (word as HTMLElement).style.backgroundColor = `rgba(${wordHighlightBgColor}, 0)`;
              }
            }
          });
        },
      });
    }
  }, []);

  return (
    <>
      <section ref={sectionRef} className="why-choose-trd">
        <div ref={header1Ref} className="why-header">
          <h2>Why TRD Remedial?</h2>
        </div>
        <div ref={header2Ref} className="why-header why-header-center">
          <h2>Why TRD Remedial?</h2>
        </div>
        <div ref={header3Ref} className="why-header">
          <h2>Why TRD Remedial?</h2>
        </div>
      </section>

      <section ref={textContainerRef} className="why-copy">
        <div className="copy-container">
          <div className="anime-text">
            <h1 ref={textRef}>
              We solve structural challenges others can't handle. With 8 years of precision remedial expertise, 24/7 emergency response, and unwavering commitment to building compliance, TRD delivers solutions that last.
            </h1>
          </div>
        </div>
      </section>
    </>
  );
}
