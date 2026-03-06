'use client';

import Link from 'next/link';
import { AnimatedH1 } from '@/components/animations/AnimatedH1';
import { AnimatedCopy } from '@/components/animations/AnimatedCopy';
import { ParallaxImage } from '@/components/animations/ParallaxImage';
import { ImageCarousel } from '@/components/ImageCarousel';
import { ProjectSchema } from '@/components/seo/ProjectSchema';
import { useStore } from '@/stores/useStore';
import type { Project } from '@/types/api';

export function ProjectDetailClient({ project }: { project: Project }) {
  const setCursorVariant = useStore((state) => state.setCursorVariant);

  return (
    <div className="project-detail-page">
      <ProjectSchema project={project} />
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
            {project.timeline && (
              <span className="project-meta-timeline">{project.timeline}</span>
            )}
            {project.budget && (
              <span className="project-meta-budget">{project.budget}</span>
            )}
          </div>
          <AnimatedH1 delay={1} className="project-hero-title">
            {project.name}
          </AnimatedH1>
          <AnimatedCopy delay={1.25} tag="p" className="project-hero-tagline">
            {project.tagline}
          </AnimatedCopy>
        </div>
      </section>

      {/* Back Navigation */}
      <div className="detail-nav-bar">
        <Link
          href="/projects"
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
          Back to Projects
        </Link>
      </div>

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

      {/* Project Gallery Carousel */}
      {project.galleryImages && project.galleryImages.length > 0 && (
        <section className="project-section project-gallery">
          <div className="project-content-wide">
            <AnimatedH1 animateOnScroll={true} className="section-title text-center">
              Project Gallery
            </AnimatedH1>
            <ImageCarousel images={project.galleryImages} projectName={project.name} />
          </div>
        </section>
      )}

      {/* Before & After */}
      {project.beforeImage && project.afterImage && (
        <section className="project-section project-before-after">
          <div className="project-content-wide">
            <AnimatedH1 animateOnScroll={true} className="section-title text-center">
              Before & After
            </AnimatedH1>
            <div className="before-after-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div className="before-image">
                <p className="ba-label" style={{ textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', opacity: 0.6 }}>Before</p>
                <ParallaxImage src={project.beforeImage} alt={`${project.name} - Before`} speed={0.1} />
              </div>
              <div className="after-image">
                <p className="ba-label" style={{ textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', opacity: 0.6 }}>After</p>
                <ParallaxImage src={project.afterImage} alt={`${project.name} - After`} speed={0.1} />
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

      {/* Related Projects */}
      {project.relatedProjects && project.relatedProjects.length > 0 && (
        <section className="project-section project-related">
          <div className="project-content">
            <AnimatedH1 animateOnScroll={true} className="section-title">
              Related Projects
            </AnimatedH1>
            <div className="related-projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {project.relatedProjects.slice(0, 3).map((rp) => (
                <Link key={rp.id} href={`/projects/${rp.slug}`} className="related-project-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                  {(rp.thumbnailImage || rp.featuredImage) && (
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10', overflow: 'hidden', borderRadius: '4px' }}>
                      <img
                        src={rp.thumbnailImage || rp.featuredImage}
                        alt={rp.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  )}
                  <h4 style={{ marginTop: '0.75rem', fontSize: '1.1rem' }}>{rp.name}</h4>
                  {rp.serviceType && <p style={{ opacity: 0.6, fontSize: '0.85rem' }}>{rp.serviceType}</p>}
                </Link>
              ))}
            </div>
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
