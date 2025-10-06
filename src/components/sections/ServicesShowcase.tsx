'use client';

import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SERVICES, Service } from '@/data/services';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useStore } from '@/stores/useStore';
import { MagneticButton } from '@/components/ui/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export function ServicesShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

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

  // Horizontal scroll animation (desktop only)
  useGSAP(() => {
    if (isMobile || !cardsRef.current || !containerRef.current) return;

    const cards = gsap.utils.toArray('.service-card-wrapper');
    const totalWidth = cardsRef.current.scrollWidth;
    const viewportWidth = window.innerWidth;

    // Horizontal scroll with pin
    const scrollTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: () => `+=${totalWidth - viewportWidth + 400}`,
      pin: true,
      scrub: 1,
      snap: {
        snapTo: 1 / (cards.length - 1),
        duration: 0.5,
        ease: 'power2.inOut',
      },
      onUpdate: (self) => {
        setScrollProgress(self.progress * 100);

        // Update progress bar
        if (progressBarRef.current) {
          gsap.to(progressBarRef.current, {
            width: `${self.progress * 100}%`,
            duration: 0.1,
            ease: 'none',
          });
        }
      },
    });

    // Animate cards horizontally
    gsap.to(cards, {
      x: () => -(totalWidth - viewportWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${totalWidth - viewportWidth + 400}`,
        scrub: 1,
      },
    });

    // Individual card reveal animations
    cards.forEach((card, index) => {
      gsap.fromTo(card as HTMLElement,
        {
          opacity: 0,
          scale: 0.9,
          y: 50,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
            end: 'top 20%',
            scrub: false,
          },
          delay: index * 0.1,
        }
      );
    });

    return () => {
      scrollTrigger.kill();
    };
  }, { dependencies: [isMobile] });

  // Mobile: staggered grid reveal
  useGSAP(() => {
    if (!isMobile) return;

    const cards = gsap.utils.toArray('.service-card-wrapper');

    cards.forEach((card, index) => {
      gsap.fromTo(card as HTMLElement,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card as HTMLElement,
            start: 'top 80%',
          },
          delay: (index % 2) * 0.1,
        }
      );
    });
  }, { dependencies: [isMobile] });

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-32 bg-white overflow-hidden">
      {/* Section Header */}
      <div className="container mx-auto px-4 lg:px-8 mb-12 lg:mb-16">
        <div className="text-center">
          <h2
            ref={titleRef}
            className="text-4xl lg:text-6xl font-bold text-concrete-900 mb-6"
          >
            Comprehensive <span className="text-trd-accent">Solutions</span>
          </h2>
          <p
            ref={subtitleRef}
            className="text-xl text-concrete-600 max-w-3xl mx-auto"
          >
            {isMobile
              ? 'Six core services designed to solve your most challenging structural problems'
              : 'Scroll through our six core services → designed to solve your most challenging structural problems'}
          </p>
        </div>

        {/* Progress indicator (desktop only) */}
        {!isMobile && (
          <div className="mt-8 max-w-md mx-auto">
            <div className="h-1 bg-concrete-200 rounded-full overflow-hidden">
              <div
                ref={progressBarRef}
                className="h-full bg-trd-accent rounded-full transition-all"
                style={{ width: 0 }}
              />
            </div>
            <p className="text-sm text-concrete-500 text-center mt-2">
              {Math.round(scrollProgress)}% viewed
            </p>
          </div>
        )}
      </div>

      {/* Horizontal Scroll Container (Desktop) / Grid (Mobile) */}
      <div ref={containerRef} className={isMobile ? '' : 'relative h-screen'}>
        <div
          ref={cardsRef}
          className={
            isMobile
              ? 'container mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6'
              : 'absolute top-1/2 left-0 -translate-y-1/2 flex gap-8 px-8'
          }
          style={!isMobile ? { width: `${SERVICES.length * 400 + 200}px` } : undefined}
        >
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              className={`service-card-wrapper ${isMobile ? '' : 'flex-shrink-0'}`}
              style={!isMobile ? { width: '380px' } : undefined}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              <ServiceCard
                service={service}
                onClick={() => setSelectedService(service)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Call-out Section */}
      <div className="container mx-auto px-4 lg:px-8 mt-20">
        <div className="bg-gradient-to-r from-trd-primary to-industrial-700 rounded-2xl p-8 lg:p-12 text-center">
          <h3 className="text-2xl lg:text-4xl font-bold text-white mb-4">
            Not Limited by Service Lists
          </h3>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-6">
            If there's a structural problem, we're built to solve it.
            Our capabilities extend beyond these core services to meet your unique challenges.
          </p>
          <MagneticButton
            href="#contact"
            variant="cta"
            strength={0.5}
            onMouseEnter={() => setCursorVariant('cta')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            Discuss Your Project
          </MagneticButton>
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div
          onClick={() => setSelectedService(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4
                     animate-in fade-in duration-300"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto
                       animate-in zoom-in-95 duration-300"
          >
            {/* Modal Content */}
            <div className="relative">
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full
                         flex items-center justify-center hover:bg-white transition-colors z-10
                         hover:scale-110 active:scale-95"
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                <span className="text-2xl">×</span>
              </button>

              {/* Service Image */}
              <div
                className="h-64 bg-gradient-to-br from-industrial-600 to-concrete-700"
                style={{
                  backgroundImage: `url(${selectedService.visual})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />

              {/* Service Details */}
              <div className="p-8">
                <h3 className="text-3xl font-bold text-concrete-900 mb-4">
                  {selectedService.title}
                </h3>
                <p className="text-lg text-concrete-600 mb-6">
                  {selectedService.description}
                </p>

                <h4 className="text-xl font-semibold text-concrete-800 mb-4">
                  Key Features:
                </h4>
                <ul className="space-y-3 mb-8">
                  {selectedService.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-trd-accent mr-3 text-xl">✓</span>
                      <span className="text-concrete-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex gap-4">
                  <MagneticButton
                    href="#contact"
                    onClick={() => setSelectedService(null)}
                    variant="primary"
                    strength={0.4}
                    onMouseEnter={() => setCursorVariant('cta')}
                    onMouseLeave={() => setCursorVariant('default')}
                  >
                    Request Quote
                  </MagneticButton>
                  <button
                    onClick={() => setSelectedService(null)}
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
