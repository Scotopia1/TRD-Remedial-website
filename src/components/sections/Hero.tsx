'use client';

import { AnimatedCopy } from '@/components/animations/AnimatedCopy';
import Link from 'next/link';
import './Hero.css';

interface HeroProps {
  showContent?: boolean;
}

export function Hero({ showContent = true }: HeroProps) {
  return (
    <section className="hero">
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

      {showContent && (
        <div className="hero-cta">
          <Link href="/services" className="btn btn-primary">
            Explore Our Services
          </Link>
          <Link href="/contact" className="btn btn-secondary">
            Get Emergency Help
          </Link>
        </div>
      )}
    </section>
  );
}
