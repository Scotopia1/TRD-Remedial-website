'use client';

import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useStore } from '@/stores/useStore';
import dynamic from 'next/dynamic';

gsap.registerPlugin(ScrollTrigger);

// Dynamically import 3D Scene to avoid SSR issues
const Scene = dynamic(() => import('@/components/3d/Scene').then(mod => ({ default: mod.Scene })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-industrial-700 to-concrete-800">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-trd-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white">Loading 3D Experience...</p>
      </div>
    </div>
  ),
});

const TechnicalDiagram = dynamic(() => import('@/components/3d/TechnicalDiagram').then(mod => ({ default: mod.TechnicalDiagram })), {
  ssr: false,
});

type ViewMode = '3d' | '2d';
type ServiceOverlay = 'none' | 'carbon-fiber' | 'crack-injection' | 'cutting' | 'scanning';

export function ThreeDShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const isMobile = useMediaQuery('(max-width: 768px)');
  const setCursorVariant = useStore((state) => state.setCursorVariant);

  const [viewMode, setViewMode] = useState<ViewMode>('3d');
  const [activeService, setActiveService] = useState<ServiceOverlay>('none');
  const [tourActive, setTourActive] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const services = [
    { id: 'carbon-fiber' as const, label: 'Carbon Fiber', color: 'from-blue-500 to-cyan-500' },
    { id: 'crack-injection' as const, label: 'Crack Injection', color: 'from-red-500 to-orange-500' },
    { id: 'cutting' as const, label: 'Cutting & Coring', color: 'from-yellow-500 to-amber-500' },
    { id: 'scanning' as const, label: 'Slab Scanning', color: 'from-green-500 to-emerald-500' },
  ];

  // Section header reveal animation
  useGSAP(() => {
    if (!titleRef.current || !subtitleRef.current || !badgeRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set([badgeRef.current, titleRef.current, subtitleRef.current], { opacity: 1, y: 0 });
    } else {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      tl.from(badgeRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        ease: 'back.out(1.7)',
      })
      .from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.3')
      .from(subtitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.4');
    }
  });

  // Controls reveal animation
  useGSAP(() => {
    if (!controlsRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set(controlsRef.current, { opacity: 1, y: 0 });
    } else {
      gsap.from(controlsRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        delay: 0.4,
      });
    }
  });

  // 3D Viewer scroll-triggered entrance
  useGSAP(() => {
    if (!viewerRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set(viewerRef.current, { opacity: 1, scale: 1 });
    } else {
      gsap.fromTo(viewerRef.current,
        {
          opacity: 0,
          scale: 0.95,
          rotateX: -10,
        },
        {
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
          delay: 0.6,
        }
      );
    }
  });

  // Info cards staggered reveal
  useGSAP(() => {
    if (!cardsRef.current) return;

    const cards = cardsRef.current.children;
    if (cards.length === 0) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set(cards, { opacity: 1, y: 0 });
    } else {
      gsap.from(cards, {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 85%',
        },
      });
    }
  });

  // Scroll progress tracking for 3D rotation
  useGSAP(() => {
    if (!sectionRef.current) return;

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
    });
  });

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-32 bg-concrete-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(255,107,53,0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255,107,53,0.2) 0%, transparent 50%)
          `,
        }} />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span
            ref={badgeRef}
            className="inline-block px-4 py-2 bg-trd-accent/20 text-trd-accent rounded-full text-sm font-semibold mb-6"
          >
            Interactive 3D Experience
          </span>
          <h2
            ref={titleRef}
            className="text-4xl lg:text-6xl font-bold text-white mb-6"
          >
            See Our Solutions <span className="text-trd-accent">In Action</span>
          </h2>
          <p
            ref={subtitleRef}
            className="text-xl text-white/80 max-w-3xl mx-auto"
          >
            {isMobile
              ? 'Explore our structural remediation techniques through an interactive 3D visualization'
              : 'Scroll to rotate and explore our structural remediation techniques in 3D'}
          </p>
        </div>

        {/* Controls */}
        <div ref={controlsRef} className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('3d')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  viewMode === '3d'
                    ? 'bg-trd-accent text-white shadow-lg scale-105'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                3D View
              </button>
              <button
                onClick={() => setViewMode('2d')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  viewMode === '2d'
                    ? 'bg-trd-accent text-white shadow-lg scale-105'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                2D Diagram
              </button>
            </div>

            {/* Service Overlays */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveService('none')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  activeService === 'none'
                    ? 'bg-white/20 text-white'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                Clear
              </button>
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setActiveService(service.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    activeService === service.id
                      ? `bg-gradient-to-r ${service.color} text-white shadow-lg`
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  {service.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3D/2D Viewer */}
        <div
          ref={viewerRef}
          className="relative h-[500px] lg:h-[700px] rounded-2xl overflow-hidden shadow-2xl bg-concrete-800"
        >
          <div className="w-full h-full">
            {viewMode === '3d' ? (
              <Scene
                activeService={activeService}
                tourActive={tourActive}
                isMobile={isMobile}
                scrollProgress={scrollProgress}
              />
            ) : (
              <TechnicalDiagram
                activeService={activeService}
              />
            )}
          </div>

          {/* Guided Tour Button */}
          {viewMode === '3d' && (
            <button
              onClick={() => setTourActive(!tourActive)}
              className="absolute bottom-6 right-6 px-6 py-3 bg-trd-accent text-white font-semibold
                       rounded-lg hover:bg-trd-accent/90 transition-all duration-300
                       shadow-lg hover:shadow-xl hover:scale-105"
              onMouseEnter={() => setCursorVariant('cta')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              {tourActive ? 'Stop Tour' : 'Start Guided Tour'}
            </button>
          )}

          {/* Scroll Progress Indicator (Desktop Only) */}
          {!isMobile && viewMode === '3d' && (
            <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm">
              <div className="flex items-center gap-2">
                <span className="opacity-70">Scroll to rotate</span>
                <div className="w-24 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-trd-accent rounded-full transition-all duration-150"
                    style={{ width: `${scrollProgress * 100}%` }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Info Cards */}
        <div ref={cardsRef} className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6
                         hover:bg-white/10 transition-all duration-300">
            <div className="text-3xl mb-3">🔄</div>
            <h4 className="text-white font-bold text-lg mb-2">Interactive</h4>
            <p className="text-white/70 text-sm">
              Rotate, zoom, and explore the building structure from any angle
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6
                         hover:bg-white/10 transition-all duration-300">
            <div className="text-3xl mb-3">🎯</div>
            <h4 className="text-white font-bold text-lg mb-2">Service Highlights</h4>
            <p className="text-white/70 text-sm">
              Click service buttons to see where each technique is applied
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6
                         hover:bg-white/10 transition-all duration-300">
            <div className="text-3xl mb-3">📱</div>
            <h4 className="text-white font-bold text-lg mb-2">All Devices</h4>
            <p className="text-white/70 text-sm">
              Optimized experience on desktop, tablet, and mobile
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
