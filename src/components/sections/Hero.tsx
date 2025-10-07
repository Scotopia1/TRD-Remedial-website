'use client';

import { AnimatedCopy } from '@/components/animations/AnimatedCopy';
import './Hero.css';

export function Hero() {
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
        <AnimatedCopy tag="h1" animateOnScroll={false} delay={0.7}>
          TRD
        </AnimatedCopy>
        <AnimatedCopy tag="h1" animateOnScroll={false} delay={0.8}>
          REMEDIAL
        </AnimatedCopy>
      </div>
    </section>
  );
}
