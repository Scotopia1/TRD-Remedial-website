'use client';

import { AnimatedCopy } from '@/components/animations/AnimatedCopy';
import Link from 'next/link';
import './Hero.css';

interface HeroProps {
  showContent?: boolean;
  /** Hero taglines — defaults to ["THE", "REMEDIAL", "EXPERTS"] */
  taglines?: string[];
  /** CTA circular button text — defaults to "EXPLORE OUR SERVICES" */
  ctaText?: string;
}

export function Hero({
  showContent = true,
  taglines,
  ctaText,
}: HeroProps) {
  const heroTaglines = taglines && taglines.length > 0 ? taglines : ['THE', 'REMEDIAL', 'EXPERTS'];
  const heroCtaText = ctaText || 'EXPLORE OUR SERVICES';

  return (
    <section className="hero">
      <div className="hero-img">
        <video
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="/video/hero-video.mp4" type="video/mp4" />
        </video>
      </div>

      <div className={`hero-header${!showContent ? ' hero-header--hidden' : ''}`}>
        <h1 className="hero-h1">
          <span className="sr-only">TRD Remedial - The Remedial Experts | Structural Remediation Sydney</span>
          {heroTaglines.map((line, index) => (
            <AnimatedCopy
              key={index}
              tag="span"
              animateOnScroll={false}
              delay={0.2 + index * 0.15}
              trigger={showContent}
              instantVisible={false}
            >
              {line}
            </AnimatedCopy>
          ))}
        </h1>
      </div>

      {showContent && (
        <div className="hero-cta">
          <Link href="/services" className="circular-btn-wrapper">
            <div className="circular-btn">
              <svg viewBox="0 0 200 200" className="circular-btn-svg">
                <defs>
                  <path
                    id="circlePath"
                    d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                  />
                </defs>
                <text className="circular-btn-text">
                  <textPath href="#circlePath" startOffset="0%">
                    {heroCtaText} &bull; {heroCtaText} &bull;
                  </textPath>
                </text>
              </svg>
              <div className="circular-btn-arrow">&rarr;</div>
            </div>
          </Link>
        </div>
      )}
    </section>
  );
}
