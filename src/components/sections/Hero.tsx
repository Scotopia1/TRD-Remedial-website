'use client';

import { AnimatedCopy } from '@/components/animations/AnimatedCopy';
import { OptimizedVideo } from '@/components/ui/OptimizedVideo';
import Link from 'next/link';
import './Hero.css';

interface HeroProps {
  showContent?: boolean;
  /** Hero taglines — defaults to ["THE", "REMEDIAL", "EXPERTS"] */
  taglines?: string[];
  /** CTA circular button text — defaults to "EXPLORE OUR SERVICES" */
  ctaText?: string;
  /** Video source path (without extension) — defaults to "/videos/hero-video" */
  videoSrc?: string;
  /** Video poster image path — defaults to "/videos/hero-poster.webp" */
  videoPoster?: string;
}

export function Hero({
  showContent = true,
  taglines,
  ctaText,
  videoSrc,
  videoPoster,
}: HeroProps) {
  const heroTaglines = taglines && taglines.length > 0 ? taglines : ['THE', 'REMEDIAL', 'EXPERTS'];
  const heroCtaText = ctaText || 'EXPLORE OUR SERVICES';
  const heroVideoSrc = videoSrc || 'https://ik.imagekit.io/1fovck7sy4/trd-website/videos/hero-video';
  const heroVideoPoster = videoPoster || 'https://ik.imagekit.io/1fovck7sy4/trd-website/videos/hero-poster.webp';

  return (
    <section className="hero">
      <div className="hero-img">
        <OptimizedVideo
          src={heroVideoSrc}
          poster={heroVideoPoster}
          className="hero-video"
          priority={true}
          autoPlay={true}
          loop={true}
          muted={true}
          playsInline={true}
        />
      </div>

      <div className={`hero-header${!showContent ? ' hero-header--hidden' : ''}`}>
        {heroTaglines.map((line, index) => (
          <AnimatedCopy
            key={index}
            tag="h1"
            animateOnScroll={false}
            delay={0.2 + index * 0.15}
            trigger={showContent}
            instantVisible={false}
          >
            {line}
          </AnimatedCopy>
        ))}
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
