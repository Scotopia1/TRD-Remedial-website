'use client';

import { AnimatedCopy } from '@/components/animations/AnimatedCopy';
import { OptimizedVideo } from '@/components/ui/OptimizedVideo';
import Link from 'next/link';
import './Hero.css';

interface HeroProps {
  showContent?: boolean;
}

export function Hero({ showContent = true }: HeroProps) {
  return (
    <section className="hero">
      <div className="hero-img">
        <OptimizedVideo
          src="/videos/hero-video"
          className="hero-video"
          priority={true}
          autoPlay={true}
          loop={true}
          muted={true}
          playsInline={true}
        />
      </div>

      <div className="hero-header">
        <AnimatedCopy
          tag="h1"
          animateOnScroll={false}
          delay={0.5}
          trigger={showContent}
          instantVisible={true}
        >
          THE
        </AnimatedCopy>
        <AnimatedCopy
          tag="h1"
          animateOnScroll={false}
          delay={0.6}
          trigger={showContent}
          instantVisible={true}
        >
          REMEDIAL
        </AnimatedCopy>
        <AnimatedCopy
          tag="h1"
          animateOnScroll={false}
          delay={0.7}
          trigger={showContent}
          instantVisible={true}
        >
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
