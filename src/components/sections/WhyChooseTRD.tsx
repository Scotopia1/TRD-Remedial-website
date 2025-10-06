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

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  // Set data-text attribute for clip-path animation
  useEffect(() => {
    if (textRef.current) {
      textRef.current.setAttribute('data-text', textRef.current.textContent?.trim() || '');
    }
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

    // Animation 3: Text reveal with clip-path
    if (textRef.current) {
      ScrollTrigger.create({
        trigger: textRef.current,
        start: 'top 50%',
        end: 'bottom 50%',
        scrub: 1,
        onUpdate: (self) => {
          if (textRef.current) {
            const clipValue = Math.max(0, 100 - self.progress * 100);
            textRef.current.style.setProperty('--clip-value', `${clipValue}%`);
          }
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

      <section className="why-copy">
        <h1 ref={textRef} className="animate-text">
          We solve structural challenges others can't handle. With 8 years of precision remedial expertise, 24/7 emergency response, and unwavering commitment to building compliance, TRD delivers solutions that last.
        </h1>
      </section>
    </>
  );
}
