'use client';

import './ThreeDShowcasePinned.css';

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

interface ServicePhase {
  id: string;
  serviceId: ServiceOverlay;
  title: string;
  description: string;
  startProgress: number;
  endProgress: number;
}

export function ThreeDShowcasePinned() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);

  const isMobile = useMediaQuery('(max-width: 768px)');
  const setCursorVariant = useStore((state) => state.setCursorVariant);

  const [viewMode, setViewMode] = useState<ViewMode>('3d');
  const [activeService, setActiveService] = useState<ServiceOverlay>('none');
  const [scrollProgress, setScrollProgress] = useState(0);

  const servicePhases: ServicePhase[] = [
    {
      id: 'intro',
      serviceId: 'none',
      title: 'Innovation in Action',
      description: 'Explore our structural remediation techniques through interactive 3D visualization',
      startProgress: 0,
      endProgress: 0.2,
    },
    {
      id: 'carbon',
      serviceId: 'carbon-fiber',
      title: 'Carbon Fibre Reinforcement',
      description: 'High-strength composite systems for structural strengthening without adding weight or bulk',
      startProgress: 0.2,
      endProgress: 0.4,
    },
    {
      id: 'injection',
      serviceId: 'crack-injection',
      title: 'Crack Injection',
      description: 'Specialized epoxy and polyurethane injection to restore structural integrity',
      startProgress: 0.4,
      endProgress: 0.6,
    },
    {
      id: 'cutting',
      serviceId: 'cutting',
      title: 'Concrete Cutting & Coring',
      description: 'Diamond blade precision cutting with minimal disruption and dust',
      startProgress: 0.6,
      endProgress: 0.8,
    },
    {
      id: 'scanning',
      serviceId: 'scanning',
      title: 'GPR Scanning',
      description: 'Non-destructive Ground Penetrating Radar technology for safe drilling operations',
      startProgress: 0.8,
      endProgress: 1.0,
    },
  ];

  // Main pinning ScrollTrigger with scroll phases
  useGSAP(() => {
    if (!sectionRef.current || isMobile) return; // Skip pinning on mobile

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: `+=${window.innerHeight * 3}`, // 3x viewport for 5 phases
      pin: true,
      scrub: 0.5, // Smooth scroll sync
      pinSpacing: true,
      anticipatePin: 1, // Smooth pin anticipation
      onUpdate: (self) => {
        const progress = self.progress;
        setScrollProgress(progress);

        // Handle service phase transitions
        servicePhases.forEach((phase) => {
          const overlay = document.querySelector(
            `.service-text-overlay[data-service="${phase.id}"]`
          );
          if (!overlay) return;

          const phaseStart = phase.startProgress;
          const phaseEnd = phase.endProgress;
          const phaseDuration = phaseEnd - phaseStart;

          if (progress >= phaseStart && progress < phaseEnd) {
            // Active phase - fade in
            const phaseProgress = (progress - phaseStart) / phaseDuration;

            if (phaseProgress < 0.3) {
              // Fade in (0-30% of phase)
              const fadeInProgress = phaseProgress / 0.3;
              gsap.set(overlay, {
                opacity: fadeInProgress,
                x: `${(1 - fadeInProgress) * 100}%`,
                scale: 0.9 + fadeInProgress * 0.1,
              });
            } else if (phaseProgress > 0.7) {
              // Fade out (70-100% of phase)
              const fadeOutProgress = (phaseProgress - 0.7) / 0.3;
              gsap.set(overlay, {
                opacity: 1 - fadeOutProgress,
                x: `${-fadeOutProgress * 100}%`,
                scale: 1 - fadeOutProgress * 0.1,
              });
            } else {
              // Hold (30-70% of phase)
              gsap.set(overlay, {
                opacity: 1,
                x: '0%',
                scale: 1,
              });
            }

            // Update active service for 3D highlighting
            if (phase.serviceId !== activeService) {
              setActiveService(phase.serviceId);
            }
          } else {
            // Inactive phase - hidden
            gsap.set(overlay, {
              opacity: 0,
            });
          }
        });
      },
    });
  }, { dependencies: [isMobile], scope: sectionRef });

  // Simple scroll progress tracking for mobile (no pinning)
  useGSAP(() => {
    if (!sectionRef.current || !isMobile) return;

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
    });
  }, { dependencies: [isMobile], scope: sectionRef });

  return (
    <section ref={sectionRef} className="three-d-showcase-pinned">
      {/* Background Pattern */}
      <div className="showcase-bg-pattern" />

      <div className="showcase-container">
        {/* 3D/2D Viewer */}
        <div ref={viewerRef} className="showcase-viewer">
          <div className="w-full h-full">
            {viewMode === '3d' ? (
              <Scene
                activeService={activeService}
                tourActive={false}
                isMobile={isMobile}
                scrollProgress={scrollProgress}
              />
            ) : (
              <TechnicalDiagram activeService={activeService} />
            )}
          </div>

          {/* Service Text Overlays - WonJyou Style */}
          {!isMobile && servicePhases.map((phase) => (
            <div
              key={phase.id}
              className="service-text-overlay"
              data-service={phase.id}
            >
              <div className="service-text-content">
                <h2 className="service-text-title">{phase.title}</h2>
                <p className="service-text-description">{phase.description}</p>
              </div>
            </div>
          ))}

          {/* View Mode Toggle (Bottom Right) */}
          <div className="showcase-toggle-wrapper">
            <div className="showcase-toggle-buttons">
              <button
                onClick={() => setViewMode('3d')}
                className={`showcase-toggle-btn ${viewMode === '3d' ? 'active' : ''}`}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                3D View
              </button>
              <button
                onClick={() => setViewMode('2d')}
                className={`showcase-toggle-btn ${viewMode === '2d' ? 'active' : ''}`}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                2D Diagram
              </button>
            </div>
          </div>

          {/* Scroll Progress Indicator (Top Left, Desktop Only) */}
          {!isMobile && viewMode === '3d' && (
            <div className="showcase-scroll-indicator">
              <div className="showcase-scroll-content">
                <span className="showcase-scroll-text">Scroll to explore</span>
                <div className="showcase-scroll-bar">
                  <div
                    className="showcase-scroll-progress"
                    style={{ width: `${scrollProgress * 100}%` }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile: Simple Service List (No Pinning) */}
        {isMobile && (
          <div className="mobile-services-list">
            {servicePhases.slice(1).map((phase) => (
              <div key={phase.id} className="mobile-service-item">
                <h3 className="mobile-service-title">{phase.title}</h3>
                <p className="mobile-service-description">{phase.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
