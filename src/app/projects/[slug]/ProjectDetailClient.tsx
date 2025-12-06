'use client';

import Link from 'next/link';
import { AnimatedH1 } from '@/components/animations/AnimatedH1';
import { AnimatedCopy } from '@/components/animations/AnimatedCopy';
import { ParallaxImage } from '@/components/animations/ParallaxImage';
import { useStore } from '@/stores/useStore';
import type { Project } from '@/data/projects';

export function ProjectDetailClient({ project }: { project: Project }) {
  const setCursorVariant = useStore((state) => state.setCursorVariant);

  return (
    <div className="project-detail-page">
      {/* Hero Section */}
      <section className="project-hero">
        <div className="project-hero-image">
          <ParallaxImage src={project.heroImage} alt={project.name} speed={0.2} />
        </div>
        <div className="project-hero-content">
          <div className="project-meta">
            <span className="project-meta-date">{project.date}</span>
            <span className="project-meta-service">{project.serviceType}</span>
            <span className="project-meta-location">{project.location}</span>
          </div>
          <AnimatedH1 delay={1} className="project-hero-title">
            {project.name}
          </AnimatedH1>
          <AnimatedCopy delay={1.25} tag="p" className="project-hero-tagline">
            {project.tagline}
          </AnimatedCopy>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="project-section">
        <div className="project-content">
          <AnimatedH1 animateOnScroll={true} className="section-title">
            The Challenge
          </AnimatedH1>
          <AnimatedCopy delay={0} tag="p" className="section-copy">
            {project.challenge}
          </AnimatedCopy>
        </div>
      </section>

      {/* Solution Section */}
      <section className="project-section">
        <div className="project-content">
          <AnimatedH1 animateOnScroll={true} className="section-title">
            Our Solution
          </AnimatedH1>
          <AnimatedCopy delay={0} tag="p" className="section-copy">
            {project.solution}
          </AnimatedCopy>
        </div>
      </section>

      {/* Results & Stats */}
      <section className="project-section project-results">
        <div className="project-content">
          <AnimatedH1 animateOnScroll={true} className="section-title">
            Results
          </AnimatedH1>
          <AnimatedCopy delay={0} tag="p" className="section-copy">
            {project.results}
          </AnimatedCopy>
        </div>

        {project.stats && project.stats.length > 0 && (
          <div className="project-stats">
            {project.stats.map((stat, i) => (
              <div key={i} className="stat">
                <AnimatedH1 animateOnScroll={true} direction="top" className="stat-value">
                  {stat.value}
                </AnimatedH1>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Before/After Comparison */}
      {project.beforeImage && project.afterImage && (
        <section className="project-section project-comparison">
          <div className="project-content-wide">
            <AnimatedH1 animateOnScroll={true} className="section-title text-center">
              Before & After
            </AnimatedH1>
            <div className="comparison-grid">
              <div className="comparison-image">
                <img src={project.beforeImage.url} alt={project.beforeImage.alt} />
                <p className="comparison-caption">Before</p>
              </div>
              <div className="comparison-image">
                <img src={project.afterImage.url} alt={project.afterImage.alt} />
                <p className="comparison-caption">After</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Testimonial */}
      {project.testimonial && (
        <section className="project-section project-testimonial">
          <div className="project-content">
            <AnimatedCopy animateOnScroll={true} tag="p" className="testimonial-quote">
              "{project.testimonial.quote}"
            </AnimatedCopy>
            <AnimatedCopy animateOnScroll={true} delay={0.15} tag="div" className="testimonial-author">
              <strong>{project.testimonial.author}</strong>
              <span>{project.testimonial.role}, {project.testimonial.company}</span>
            </AnimatedCopy>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="project-cta">
        <div className="project-content text-center">
          <AnimatedH1 animateOnScroll={true} className="cta-title">
            Ready to Start Your Project?
          </AnimatedH1>
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
              href="/projects"
              className="button-secondary"
              onMouseEnter={() => setCursorVariant('link')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
