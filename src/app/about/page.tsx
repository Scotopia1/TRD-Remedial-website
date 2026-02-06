'use client';

import './about.css';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { AnimatedH1 } from '@/components/animations/AnimatedH1';
import { AnimatedCopy } from '@/components/animations/AnimatedCopy';
import Link from 'next/link';

const TeamCardsSticky = dynamic(
  () => import('@/components/sections/TeamCardsSticky').then(mod => mod.TeamCardsSticky),
  { ssr: false }
);

const ValuesSpotlight = dynamic(
  () => import('@/components/sections/ValuesSpotlight').then(mod => mod.ValuesSpotlight),
  { ssr: false }
);

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <div className="about-hero-row">
            <AnimatedH1 direction="top" delay={0.8} className="about-hero-title">
              We Build
            </AnimatedH1>
          </div>
          <div className="about-hero-row about-hero-row-right">
            <AnimatedH1 direction="top" delay={0.95} className="about-hero-title">
              Strength
            </AnimatedH1>
          </div>
        </div>
      </section>

      {/* Company Description */}
      <section className="about-description">
        <div className="about-description-content">
          <div className="about-description-image">
            <Image
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop"
              alt="TRD Remedial at work"
              width={800}
              height={600}
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <div className="about-description-text">
            <AnimatedCopy tag="p" className="about-description-paragraph">
              TRD Remedial is Sydney's trusted partner for structural remediation and
              concrete repair. With decades of combined experience, we specialize in
              post-tension repairs, carbon fibre reinforcement, and advanced diagnostic
              services that keep buildings safe and structurally sound.
            </AnimatedCopy>

            <AnimatedCopy tag="p" className="about-description-paragraph">
              Our team combines technical expertise with a commitment to safety and
              precision. From emergency repairs to planned maintenance, we deliver
              solutions that protect your investment and ensure long-term structural
              integrity.
            </AnimatedCopy>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <TeamCardsSticky />

      {/* Values Spotlight */}
      <ValuesSpotlight />

      {/* CTA Section */}
      <section className="about-cta">
        <div className="about-cta-content">
          <div className="about-cta-left">
            <AnimatedCopy tag="p" className="about-cta-label">
              Part of the team
            </AnimatedCopy>
            <AnimatedCopy tag="p" className="about-cta-intro">
              We're always looking for talented professionals who share our commitment
              to excellence and safety.
            </AnimatedCopy>
          </div>

          <div className="about-cta-right">
            <AnimatedH1 className="about-cta-heading">
              Build Your Career With Us
            </AnimatedH1>

            <div className="about-cta-buttons">
              <Link href="/contact" className="about-cta-button">
                Get In Touch
              </Link>
              <Link href="/projects" className="about-cta-button about-cta-button-secondary">
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
