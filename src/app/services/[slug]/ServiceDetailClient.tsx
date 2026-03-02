'use client';

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatedH1 } from '@/components/animations/AnimatedH1';
import { AnimatedCopy } from '@/components/animations/AnimatedCopy';
import { ParallaxImage } from '@/components/animations/ParallaxImage';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { FAQItem } from '@/components/ui/FAQItem';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { useStore } from '@/stores/useStore';
import type { Service } from '@/data/services';
import { PROJECTS } from '@/data/projects';
import { scrollTriggerManager } from '@/utils/scrollTriggerManager';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function ServiceDetailClient({ service }: { service: Service }) {
  const setCursorVariant = useStore((state) => state.setCursorVariant);

  // Process section refs
  const processSectionRef = useRef<HTMLElement>(null);
  const layoutRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<HTMLImageElement[]>([]);

  // Build image array from available service images (3 unique images, cycled for N steps)
  const processImages = [
    service.visual,
    service.featureImage,
    service.processImage,
  ].filter(Boolean) as string[];

  // GSAP: pin entire grid layout, timeline-drive steps translateY + image cross-fade
  // Fixes: pinning grid child caused image drift and overlap issues
  useGSAP(() => {
    if (!layoutRef.current || !stepsRef.current) return;
    if (!service.process || service.process.length === 0) return;

    const mm = gsap.matchMedia();

    // Desktop only (>=901px)
    mm.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
      const imgs = imageRefs.current;
      const numSteps = service.process!.length;
      const numImages = imgs.length;
      const viewportH = window.innerHeight;
      const moveDistance = viewportH * (numSteps - 1);

      // Initial state: first image visible, rest hidden + slightly zoomed
      if (imgs[0]) gsap.set(imgs[0], { opacity: 1, scale: 1 });
      if (imgs.length > 1) gsap.set(imgs.slice(1), { opacity: 0, scale: 1.05 });

      // Single timeline: pin the grid, scroll steps, cross-fade images
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: layoutRef.current,
          start: 'top top',
          end: `+=${moveDistance}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Translate steps column upward (each step = 100vh, moves N-1 steps)
      tl.to(stepsRef.current, {
        y: -moveDistance,
        ease: 'none',
        duration: numSteps - 1,
      }, 0);

      // Cross-fade images at step transitions
      for (let i = 1; i < numSteps; i++) {
        const prevImgIdx = (i - 1) % numImages;
        const currImgIdx = i % numImages;
        if (prevImgIdx === currImgIdx) continue;

        // Position the fade at 35% into each step transition
        const fadePos = (i - 1) + 0.35;

        tl.to(imgs[prevImgIdx], {
          opacity: 0, scale: 0.98, ease: 'none', force3D: true, duration: 0.3,
        }, fadePos);

        tl.fromTo(imgs[currImgIdx],
          { opacity: 0, scale: 1.05 },
          { opacity: 1, scale: 1, ease: 'none', force3D: true, duration: 0.3 },
          fadePos,
        );
      }

      scrollTriggerManager.requestRefresh();
    });

    // Desktop with reduced motion — pin only, no animations
    mm.add('(min-width: 901px) and (prefers-reduced-motion: reduce)', () => {
      const numSteps = service.process!.length;
      const viewportH = window.innerHeight;
      const moveDistance = viewportH * (numSteps - 1);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: layoutRef.current,
          start: 'top top',
          end: `+=${moveDistance}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(stepsRef.current, {
        y: -moveDistance,
        ease: 'none',
        duration: numSteps - 1,
      }, 0);

      scrollTriggerManager.requestRefresh();
    });

    // Mobile (<=900px) — no pinning, static layout
    mm.add('(max-width: 900px)', () => {
      // Static image, no animations
    });

  }, { scope: processSectionRef });

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

      {/* Back Navigation */}
      <div className="detail-nav-bar">
        <Link
          href="/services"
          className="back-link"
          onMouseEnter={() => setCursorVariant('link')}
          onMouseLeave={() => setCursorVariant('default')}
        >
          <svg
            className="back-link-arrow"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
          Back to Services
        </Link>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services' },
            { label: service.title }
          ]}
        />
      </div>

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

      {/* 8. Process Steps — Two-Column Sticky Image + Scrolling Steps */}
      {service.process && service.process.length > 0 && (
        <section ref={processSectionRef} className="service-section service-process">
          <div className="service-content">
            <AnimatedH1 animateOnScroll={true} className="section-title">
              Our Process
            </AnimatedH1>

            <div ref={layoutRef} className="process-layout">
              {/* LEFT: Image panel (centered within pinned grid) */}
              <div className="process-sticky-panel">
                <div className="process-image-viewer">
                  {processImages.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${service.title} process step ${idx + 1}`}
                      ref={(el) => { if (el) imageRefs.current[idx] = el; }}
                    />
                  ))}
                </div>
              </div>

              {/* RIGHT: Scrolling step panels */}
              <div ref={stepsRef} className="process-steps-scroll">
                {service.process.map((step, i) => (
                  <div key={i} className="process-step-panel">
                    <div className="step-ghost-number" aria-hidden="true">
                      {String(step.step).padStart(2, '0')}
                    </div>
                    <div className="step-content">
                      <AnimatedCopy delay={0.05} tag="div" className="step-number" animateOnScroll={true}>
                        STEP {String(step.step).padStart(2, '0')}
                      </AnimatedCopy>
                      <AnimatedCopy delay={0.1} tag="h3" className="step-title" animateOnScroll={true}>
                        {step.title}
                      </AnimatedCopy>
                      <AnimatedCopy delay={0.15} tag="p" className="step-description" animateOnScroll={true}>
                        {step.description}
                      </AnimatedCopy>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related Case Studies */}
      {service.relatedProjects && service.relatedProjects.length > 0 && (
        <section className="service-section service-case-studies">
          <div className="service-content">
            <AnimatedH1 animateOnScroll={true} className="section-title">
              Featured Case Studies
            </AnimatedH1>
            <div className="case-studies-grid">
              {service.relatedProjects.slice(0, 3).map((projectId, i) => {
                const project = PROJECTS.find(p => p.id === projectId);
                if (!project) return null;

                return (
                  <ProjectCard
                    key={projectId}
                    project={project}
                    index={i}
                  />
                );
              })}
            </div>
            <Link
              href="/projects"
              className="button-secondary"
              style={{ marginTop: '2rem', display: 'inline-block' }}
              onMouseEnter={() => setCursorVariant('link')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              View All Projects
            </Link>
          </div>
        </section>
      )}

      {/* FAQs */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="service-section service-faqs">
          <div className="service-content">
            <AnimatedH1 animateOnScroll={true} className="section-title">
              Frequently Asked Questions
            </AnimatedH1>
            <div className="faq-list">
              {service.faqs.map((faq, i) => (
                <FAQItem
                  key={i}
                  question={faq.question}
                  answer={faq.answer}
                  index={i}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Client Testimonials */}
      {service.testimonials && service.testimonials.length > 0 && (
        <section className="service-section service-testimonials">
          <div className="service-content">
            <AnimatedH1 animateOnScroll={true} className="section-title">
              What Our Clients Say
            </AnimatedH1>
            <div className="testimonials-carousel">
              {service.testimonials.map((testimonial, i) => (
                <div key={i} className="testimonial-card">
                  <div className="testimonial-quote">
                    <span className="quote-mark">"</span>
                    <AnimatedCopy delay={i * 0.1} tag="p" className="testimonial-text">
                      {testimonial.quote}
                    </AnimatedCopy>
                    <span className="quote-mark">"</span>
                  </div>
                  <div className="testimonial-author">
                    <AnimatedCopy delay={i * 0.1 + 0.1} tag="p" className="author-role">
                      {testimonial.role} - {testimonial.company}
                    </AnimatedCopy>
                    {testimonial.projectType && (
                      <AnimatedCopy delay={i * 0.1 + 0.15} tag="p" className="author-project">
                        {testimonial.projectType}
                      </AnimatedCopy>
                    )}
                  </div>
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
