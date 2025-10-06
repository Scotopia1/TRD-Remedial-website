'use client';

import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { CASE_STUDIES } from '@/data/case-studies';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useStore } from '@/stores/useStore';
import { MagneticText } from '@/components/ui/MagneticText';
import { MagneticButton } from '@/components/ui/MagneticButton';

gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin);

export function CaseStudies() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [selectedCase, setSelectedCase] = useState<typeof CASE_STUDIES[0] | null>(null);

  const isMobile = useMediaQuery('(max-width: 1024px)');
  const setCursorVariant = useStore((state) => state.setCursorVariant);

  // Section header reveal animation
  useGSAP(() => {
    if (!titleRef.current || !subtitleRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set([titleRef.current, subtitleRef.current], { opacity: 1, y: 0 });
    } else {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      tl.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out',
      })
      .from(subtitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.4');
    }
  });

  // Drag-to-scroll gallery (desktop only)
  useGSAP(() => {
    if (isMobile || !galleryRef.current || !trackRef.current) return;

    const gallery = galleryRef.current;
    const track = trackRef.current;
    const cards = gsap.utils.toArray('.case-study-card');

    // Calculate bounds
    const maxScroll = -(track.scrollWidth - gallery.offsetWidth);

    // Create draggable instance
    const draggable = Draggable.create(track, {
      type: 'x',
      bounds: {
        minX: maxScroll,
        maxX: 0,
      },
      inertia: true,
      cursor: 'grab',
      activeCursor: 'grabbing',
      onDragStart: () => {
        setIsDragging(true);
        setCursorVariant('drag');
      },
      onDragEnd: () => {
        setIsDragging(false);
        setCursorVariant('default');
      },
    });

    return () => {
      draggable[0].kill();
    };
  }, { dependencies: [isMobile] });

  // Image reveal animations on scroll
  useGSAP(() => {
    const cards = gsap.utils.toArray('.case-study-card');

    cards.forEach((card, index) => {
      const imageContainer = (card as HTMLElement).querySelector('.case-image-container');
      const image = (card as HTMLElement).querySelector('.case-image');

      if (!imageContainer || !image) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        gsap.set([imageContainer, image], { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, opacity: 1 });
      } else {
        // Clip-path reveal animation
        gsap.fromTo(imageContainer,
          {
            clipPath: 'inset(100% 0% 0% 0%)',
          },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: card as HTMLElement,
              start: 'top 80%',
            },
            delay: index * 0.1,
          }
        );

        // Image scale + opacity
        gsap.fromTo(image,
          {
            scale: 1.3,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card as HTMLElement,
              start: 'top 80%',
            },
            delay: index * 0.1 + 0.2,
          }
        );
      }
    });
  }, { dependencies: [isMobile] });

  // Card staggered entrance (mobile)
  useGSAP(() => {
    if (!isMobile) return;

    const cards = gsap.utils.toArray('.case-study-card');

    cards.forEach((card, index) => {
      gsap.fromTo(card as HTMLElement,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card as HTMLElement,
            start: 'top 85%',
          },
          delay: (index % 2) * 0.15,
        }
      );
    });
  }, { dependencies: [isMobile] });

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-32 bg-concrete-50 overflow-hidden">
      {/* Section Header */}
      <div className="container mx-auto px-4 lg:px-8 mb-12 lg:mb-16">
        <div className="text-center">
          <h2
            ref={titleRef}
            className="text-4xl lg:text-6xl font-bold text-concrete-900 mb-6"
          >
            Where Failure <span className="text-trd-accent">Wasn't an Option</span>
          </h2>
          <p
            ref={subtitleRef}
            className="text-xl text-concrete-600 max-w-3xl mx-auto"
          >
            {isMobile
              ? 'Proven track record of solving the structural challenges that others couldn\'t handle'
              : 'Drag to explore our proven track record → solving structural challenges that others couldn\'t handle'}
          </p>
        </div>
      </div>

      {/* Drag-to-Scroll Gallery (Desktop) / Grid (Mobile) */}
      <div
        ref={galleryRef}
        className={isMobile ? 'container mx-auto px-4 lg:px-8' : 'relative overflow-hidden'}
        onMouseEnter={() => !isMobile && !isDragging && setCursorVariant('drag')}
        onMouseLeave={() => !isMobile && setCursorVariant('default')}
      >
        <div
          ref={trackRef}
          className={
            isMobile
              ? 'grid grid-cols-1 md:grid-cols-2 gap-8'
              : 'flex gap-8 pl-8 pr-8 cursor-grab active:cursor-grabbing'
          }
          style={!isMobile ? { width: 'max-content' } : undefined}
        >
          {CASE_STUDIES.map((caseStudy, index) => (
            <CaseStudyCard
              key={caseStudy.id}
              caseStudy={caseStudy}
              index={index}
              onClick={() => setSelectedCase(caseStudy)}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedCase && (
        <div
          onClick={() => setSelectedCase(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4
                     animate-in fade-in duration-300"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto
                       animate-in zoom-in-95 duration-300"
          >
            {/* Modal Content */}
            <div className="relative">
              {/* Close Button */}
              <button
                onClick={() => setSelectedCase(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full
                         flex items-center justify-center hover:bg-white transition-colors z-10
                         hover:scale-110 active:scale-95"
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                <span className="text-2xl">×</span>
              </button>

              {/* Project Image */}
              <div
                className="h-80 bg-gradient-to-br from-industrial-600 to-concrete-700"
                style={{
                  backgroundImage: `url(${selectedCase.images[0].after})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />

              {/* Project Details */}
              <div className="p-8 lg:p-12">
                <span className="inline-block px-4 py-1 bg-trd-accent/10 text-trd-accent rounded-full text-sm font-semibold mb-4">
                  Featured Project
                </span>
                <h3 className="text-3xl lg:text-4xl font-bold text-concrete-900 mb-2">
                  {selectedCase.title}
                </h3>
                <p className="text-lg text-concrete-600 mb-6">{selectedCase.location}</p>

                <div className="mb-6">
                  <h4 className="text-xl font-semibold text-concrete-800 mb-3">The Challenge</h4>
                  <p className="text-concrete-700">{selectedCase.challenge}</p>
                </div>

                <div className="mb-6">
                  <h4 className="text-xl font-semibold text-concrete-800 mb-3">Our Solution</h4>
                  <ul className="space-y-2">
                    {selectedCase.solution.map((sol, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-trd-accent mr-3 text-xl">✓</span>
                        <span className="text-concrete-700">{sol}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-concrete-800 mb-3">The Result</h4>
                  <p className="text-concrete-700 mb-4">{selectedCase.result}</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedCase.metrics.map((metric) => (
                      <div key={metric.label} className="bg-concrete-50 rounded-lg p-4 text-center">
                        <div className="text-2xl lg:text-3xl font-bold text-trd-accent mb-1">
                          {metric.value}
                        </div>
                        <div className="text-sm text-concrete-600">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <MagneticButton
                    href="#contact"
                    onClick={() => setSelectedCase(null)}
                    variant="primary"
                    strength={0.4}
                    onMouseEnter={() => setCursorVariant('cta')}
                    onMouseLeave={() => setCursorVariant('default')}
                  >
                    Discuss Similar Project
                  </MagneticButton>
                  <button
                    onClick={() => setSelectedCase(null)}
                    className="px-6 py-3 border-2 border-concrete-300 text-concrete-700
                             rounded-lg hover:border-concrete-400 transition-all duration-300 font-semibold
                             hover:scale-105 active:scale-95"
                    onMouseEnter={() => setCursorVariant('link')}
                    onMouseLeave={() => setCursorVariant('default')}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// Case Study Card Component
interface CaseStudyCardProps {
  caseStudy: typeof CASE_STUDIES[0];
  index: number;
  onClick: () => void;
  isMobile: boolean;
}

function CaseStudyCard({ caseStudy, index, onClick, isMobile }: CaseStudyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const setCursorVariant = useStore((state) => state.setCursorVariant);

  // Hover animations
  const handleMouseEnter = () => {
    if (isMobile || !imageRef.current || !overlayRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    setCursorVariant('hover');

    if (prefersReducedMotion) {
      gsap.set(imageRef.current, { scale: 1.05 });
      gsap.set(overlayRef.current, { opacity: 1 });
    } else {
      gsap.to(imageRef.current, {
        scale: 1.05,
        duration: 0.6,
        ease: 'power3.out',
      });

      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = () => {
    if (isMobile || !imageRef.current || !overlayRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    setCursorVariant('default');

    if (prefersReducedMotion) {
      gsap.set(imageRef.current, { scale: 1 });
      gsap.set(overlayRef.current, { opacity: 0 });
    } else {
      gsap.to(imageRef.current, {
        scale: 1,
        duration: 0.6,
        ease: 'power3.out',
      });

      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className={`case-study-card group cursor-pointer ${isMobile ? '' : 'flex-shrink-0 w-[500px]'}`}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500">
        {/* Image with Clip-Path Reveal */}
        <div className="case-image-container relative h-[300px] lg:h-[350px] overflow-hidden">
          <div
            ref={imageRef}
            className="case-image h-full w-full"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${caseStudy.images[0].after})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          {/* Hover Overlay */}
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent
                       flex items-end p-6 opacity-0 transition-opacity duration-400"
          >
            <div className="text-white">
              <p className="text-sm mb-2 opacity-90">Click to view full case study</p>
              <div className="flex items-center text-trd-accent font-semibold">
                View Details
                <svg
                  className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Badge */}
          <div className="absolute top-4 right-4 px-3 py-1 bg-trd-accent text-white rounded-full text-sm font-semibold">
            {caseStudy.visual === 'timeline' && 'Multi-Phase'}
            {caseStudy.visual === 'slider' && 'Before/After'}
            {caseStudy.visual === '3d-visualization' && 'Technical'}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-concrete-900 mb-2">
            {isMobile ? (
              caseStudy.title
            ) : (
              <MagneticText strength={0.3}>{caseStudy.title}</MagneticText>
            )}
          </h3>
          <p className="text-concrete-600 mb-4">{caseStudy.location}</p>
          <p className="text-concrete-700 line-clamp-3">{caseStudy.challenge}</p>

          {/* Metrics Preview */}
          <div className="mt-4 flex gap-4">
            {caseStudy.metrics.slice(0, 2).map((metric) => (
              <div key={metric.label} className="flex-1">
                <div className="text-lg font-bold text-trd-accent">{metric.value}</div>
                <div className="text-xs text-concrete-500">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
