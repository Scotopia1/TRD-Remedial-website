'use client';

import Link from 'next/link';
import { AnimatedH1 } from '@/components/animations/AnimatedH1';
import { AnimatedCopy } from '@/components/animations/AnimatedCopy';
import { ParallaxImage } from '@/components/animations/ParallaxImage';
import { useStore } from '@/stores/useStore';
import type { Service } from '@/data/services';

export function ServiceDetailClient({ service }: { service: Service }) {
  const setCursorVariant = useStore((state) => state.setCursorVariant);

  return (
    <div className="service-detail-page">
      {/* 1. Hero Section - 100svh */}
      <section className="service-hero">
        <div className="service-hero-image">
          <ParallaxImage
            src={service.heroImage || service.visual}
            alt={service.title}
            speed={0.2}
          />
        </div>
        <div className="service-hero-content">
          <div className="service-hero-text">
            <AnimatedH1 delay={1} className="service-hero-title">
              {service.title}
            </AnimatedH1>
            <AnimatedCopy delay={1.25} tag="p" className="service-hero-tagline">
              {service.tagline}
            </AnimatedCopy>
          </div>
        </div>
      </section>

      {/* 2. Overview Section */}
      <section className="service-section service-overview">
        <div className="service-content">
          <AnimatedH1 animateOnScroll={true} className="section-title">
            Overview
          </AnimatedH1>
          <AnimatedCopy delay={0} tag="p" className="section-copy">
            {service.description}
          </AnimatedCopy>
        </div>
      </section>

      {/* 3. Features Section with Image */}
      <section className="service-section service-features-visual">
        <div className="feature-image-container">
          <ParallaxImage
            src={service.featureImage || service.visual}
            alt={`${service.title} features`}
            speed={0.15}
          />
        </div>
      </section>

      {/* 4. Features List */}
      <section className="service-section service-features-list">
        <div className="service-content">
          <AnimatedH1 animateOnScroll={true} className="section-title">
            What We Provide
          </AnimatedH1>
          <ul className="features-grid">
            {service.features.map((feature, i) => (
              <li key={i} className="feature-item">
                <AnimatedCopy delay={i * 0.1} tag="span">
                  {feature}
                </AnimatedCopy>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Benefits Section */}
      <section className="service-section service-benefits">
        <div className="service-content">
          <AnimatedH1 animateOnScroll={true} className="section-title">
            Benefits
          </AnimatedH1>
          <div className="benefits-list">
            {service.benefits.map((benefit, i) => (
              <AnimatedCopy key={i} delay={i * 0.15} tag="p" className="benefit-item">
                → {benefit}
              </AnimatedCopy>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Stats Section */}
      {service.stats && service.stats.length > 0 && (
        <section className="service-section service-stats">
          <div className="service-content-wide">
            <div className="stats-grid">
              {service.stats.map((stat, i) => (
                <div key={i} className="stat">
                  <AnimatedH1
                    animateOnScroll={true}
                    direction="top"
                    className="stat-value"
                  >
                    {stat.value}
                  </AnimatedH1>
                  <p className="stat-label">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. Process Image - 100svh */}
      <section className="service-section service-process-visual">
        <div className="process-image-container">
          <ParallaxImage
            src={service.processImage || service.visual}
            alt={`${service.title} process`}
            speed={0.2}
          />
        </div>
      </section>

      {/* 8. Process Steps */}
      {service.process && service.process.length > 0 && (
        <section className="service-section service-process">
          <div className="service-content">
            <AnimatedH1 animateOnScroll={true} className="section-title">
              Our Process
            </AnimatedH1>
            <div className="process-steps">
              {service.process.map((step, i) => (
                <div key={i} className="process-step">
                  <AnimatedCopy delay={i * 0.1} tag="div" className="step-number">
                    {String(step.step).padStart(2, '0')}
                  </AnimatedCopy>
                  <AnimatedCopy delay={i * 0.1 + 0.05} tag="h3" className="step-title">
                    {step.title}
                  </AnimatedCopy>
                  <AnimatedCopy delay={i * 0.1 + 0.1} tag="p" className="step-description">
                    {step.description}
                  </AnimatedCopy>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9. CTA Section */}
      <section className="service-section service-cta">
        <div className="service-content text-center">
          <AnimatedH1 animateOnScroll={true} className="cta-title">
            Ready to Get Started?
          </AnimatedH1>
          <AnimatedCopy delay={0.15} tag="p" className="cta-description">
            Contact us for a free consultation and site assessment.
          </AnimatedCopy>
          <div className="cta-buttons">
            <Link
              href="/contact"
              className="button-primary"
              onMouseEnter={() => setCursorVariant('cta')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              Get In Touch
            </Link>
            <Link
              href="/services"
              className="button-secondary"
              onMouseEnter={() => setCursorVariant('link')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
