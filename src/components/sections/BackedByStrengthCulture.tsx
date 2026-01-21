'use client';

import './BackedByStrengthCulture.css';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useStore } from '@/stores/useStore';

gsap.registerPlugin(ScrollTrigger);

// Grid layout pattern (10 rows × 4 columns) - CGMWTSEPT2025 Culture Pattern
const gridLayout = [
  [0, null, 1, null],
  [null, 2, null, null],
  [3, null, null, 4],
  [null, 5, 6, null],
  [7, null, null, 8],
  [null, null, 9, null],
  [null, 10, null, 11],
  [12, null, 13, null],
  [null, 14, null, null],
  [15, null, null, 16],
];

// Transform origins for visual interest
const origins = [
  'right', 'left', 'left', 'right', 'left',
  'left', 'right', 'left', 'left', 'left',
  'left', 'left', 'right', 'left', 'left',
  'right', 'left',
];

// Capability images (Unsplash photo IDs)
const capabilityImages = [
  '1541888946425-d81bb19240f5', // 1 - Construction site
  '1504307651254-35680f356dfd', // 2 - Modern building
  '1503387762-592deb58ef4e', // 3 - Steel structure
  '1590856029826-c7a73142bbf1', // 4 - Concrete work
  '1503328427499-d92d414d0f41', // 5 - Industrial
  '1541976590-713941681591', // 6 - Architecture
  '1486406146456-8edd19c34d82', // 7 - Construction equipment
  '1581092918484-8313e01f50e2', // 8 - Building facade
  '1504307651254-35680f356dfd', // 9 - Urban development
  '1503387762-592deb58ef4e', // 10 - Engineering
  '1590856029826-c7a73142bbf1', // 11 - Infrastructure
  '1503328427499-d92d414d0f41', // 12 - Construction detail
  '1541976590-713941681591', // 13 - Architectural detail
  '1486406146456-8edd19c34d82', // 14 - Heavy machinery
  '1581092918484-8313e01f50e2', // 15 - Modern construction
  '1504307651254-35680f356dfd', // 16 - Building project
  '1541888946425-d81bb19240f5', // 17 - Construction team
];

// Company values for split element
const companyValues = [
  'Accountability',
  'Innovation',
  'Excellence',
  'Discipline',
  'Results',
];

export function BackedByStrengthCulture() {
  const sectionRef = useRef<HTMLElement>(null);
  const strengthHeroRef = useRef<HTMLDivElement>(null);
  const capabilitiesRef = useRef<HTMLDivElement>(null);
  const capabilitiesHeaderRef = useRef<HTMLDivElement>(null);

  const isMobile = useMediaQuery('(max-width: 1000px)');
  const setCursorVariant = useStore((state) => state.setCursorVariant);

  // Scramble text animation for hero title
  useGSAP(() => {
    if (!strengthHeroRef.current) return;

    const heroHeading = strengthHeroRef.current.querySelector('.strength-hero-header h1');
    if (!heroHeading) return;

    const text = heroHeading.textContent || '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';

    // Simple scramble effect
    const scramble = () => {
      const letters = text.split('');
      let iteration = 0;

      const interval = setInterval(() => {
        heroHeading.textContent = letters
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');

        if (iteration >= text.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3;
      }, 40);
    };

    // Delay start
    gsap.delayedCall(0.75, scramble);
  }, { scope: strengthHeroRef });

  // Capabilities grid animations - CGMWTSEPT2025 pattern
  useGSAP(() => {
    if (!capabilitiesRef.current || isMobile) {
      // Mobile: Set all images to final state
      gsap.set('.capability-img', { scale: 1, force3D: true });
      return;
    }

    // Desktop: Initialize scroll animations
    gsap.set('.capability-img', { scale: 0, force3D: true });

    const rows = capabilitiesRef.current.querySelectorAll('.capability-row');

    rows.forEach((row, index) => {
      const rowImages = row.querySelectorAll('.capability-img');

      if (rowImages.length > 0) {
        // Scale in animation
        ScrollTrigger.create({
          id: `scaleIn-${index}`,
          trigger: row,
          start: 'top bottom',
          end: 'bottom bottom-=10%',
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (self.isActive) {
              const progress = self.progress;
              const easedProgress = Math.min(1, progress * 1.2);
              const scaleValue = gsap.utils.interpolate(0, 1, easedProgress);

              rowImages.forEach((img) => {
                gsap.set(img, { scale: scaleValue, force3D: true });
              });

              if (progress > 0.95) {
                gsap.set(rowImages, { scale: 1, force3D: true });
              }
            }
          },
          onLeave: () => {
            gsap.set(rowImages, { scale: 1, force3D: true });
          },
        });

        // Scale out animation (pin & scale down)
        ScrollTrigger.create({
          id: `scaleOut-${index}`,
          trigger: row,
          start: 'top top',
          end: 'bottom top',
          pin: true,
          pinSpacing: false,
          scrub: 1,
          invalidateOnRefresh: true,
          onEnter: () => {
            gsap.set(rowImages, { scale: 1, force3D: true });
          },
          onUpdate: (self) => {
            if (self.isActive) {
              const scale = gsap.utils.interpolate(1, 0, self.progress);

              rowImages.forEach((img) => {
                gsap.set(img, {
                  scale: scale,
                  force3D: true,
                  clearProps: self.progress === 1 ? 'scale' : '',
                });
              });
            } else {
              const isAbove = self.scroll() < self.start;
              if (isAbove) {
                gsap.set(rowImages, { scale: 1, force3D: true });
              }
            }
          },
        });

        // Marker triggers
        ScrollTrigger.create({
          id: `marker-${index}`,
          trigger: row,
          start: 'bottom bottom',
          end: 'top top',
          onEnter: () => {
            const scaleOut = ScrollTrigger.getById(`scaleOut-${index}`);
            if (scaleOut && scaleOut.progress === 0) {
              gsap.set(rowImages, { scale: 1, force3D: true });
            }
          },
          onLeave: () => {
            const scaleOut = ScrollTrigger.getById(`scaleOut-${index}`);
            if (scaleOut && scaleOut.progress === 0) {
              gsap.set(rowImages, { scale: 1, force3D: true });
            }
          },
          onEnterBack: () => {
            const scaleOut = ScrollTrigger.getById(`scaleOut-${index}`);
            if (scaleOut && scaleOut.progress === 0) {
              gsap.set(rowImages, { scale: 1, force3D: true });
            }
          },
        });
      }
    });
  }, { dependencies: [isMobile], scope: capabilitiesRef });

  // Header pinning
  useGSAP(() => {
    if (!capabilitiesRef.current || !capabilitiesHeaderRef.current) return;

    ScrollTrigger.create({
      trigger: capabilitiesRef.current,
      start: 'top top',
      end: 'bottom bottom',
      pin: capabilitiesHeaderRef.current,
      pinSpacing: false,
    });
  }, { scope: capabilitiesRef });

  return (
    <section ref={sectionRef} className="backed-by-strength-culture">
      {/* Hero Section */}
      <div ref={strengthHeroRef} className="strength-hero">
        <div className="strength-hero-img">
          <Image
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&h=1080&fit=crop"
            alt="TRD Strength"
            fill
            sizes="100vw"
            quality={85}
            priority={true}
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div className="strength-hero-header">
          <div className="container">
            <h1>Backed by Strength</h1>
          </div>
        </div>

        <div className="strength-hero-footer">
          <div className="container">
            <p>Parent Company</p>
            <p>[ &nbsp;Continue Reading&nbsp; ]</p>
          </div>
        </div>
      </div>

      {/* Capabilities Grid Section */}
      <div ref={capabilitiesRef} className="capabilities-grid">
        {/* Pinned Header */}
        <div ref={capabilitiesHeaderRef} className="capabilities-header">
          <h2>Our Capabilities</h2>
        </div>

        {/* Grid Rows */}
        {gridLayout.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="capability-row">
            {row.map((imageIndex, colIndex) => (
              <div key={`col-${colIndex}`} className="capability-col">
                {imageIndex !== null && (
                  <div
                    className="capability-img"
                    data-origin={origins[imageIndex]}
                  >
                    <Image
                      src={`https://images.unsplash.com/photo-${capabilityImages[imageIndex]}?w=800&h=800&fit=crop`}
                      alt={`Capability ${imageIndex + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      quality={80}
                      priority={false}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Split Element Divider */}
      <div className="split-element">
        <div className="container">
          <div className="split-img split-top">
            <img src="/trd-logo.svg" alt="TRD" />
          </div>

          <div className="split-img split-bottom">
            <img src="/trd-logo.svg" alt="TRD" />
          </div>
        </div>

        <div className="split-copy">
          <div className="container">
            <p>
              {companyValues.map((value, index) => (
                <span key={value}>
                  {value}
                  {index < companyValues.length - 1 && ' • '}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>

      {/* Company Mission Section */}
      <div className="company-mission">
        <div className="container">
          <div className="mission-header">
            <p>[ &nbsp;Operating Field&nbsp; ]</p>
            <h3>Our Foundation</h3>
          </div>

          <div className="mission-copy">
            <p>
              Tension Reinforced Developments operates as both specialist and partner.
              Since 2017, every project has been approached with precision, tested through
              rigorous process, and built layer by layer. We believe that structural
              integrity gains strength when exposed to demanding standards, when solutions
              are forced to survive scrutiny and resist failure.
            </p>
            <p>
              The culture here is one of disciplined execution rather than quick fixes,
              a constant cycle of planning, implementing, and refining until only the
              optimal solution remains. Collaboration is treated as essential infrastructure,
              not optional enhancement. Teams are organized like engineered systems, each
              role carrying critical weight, each voice contributing to the final outcome.
              Challenge is not avoided but embraced as essential material, because resistance
              generates clarity. The rhythm of work is set by professional standards,
              balancing thorough analysis, decisive action, and meticulous quality control.
              This is how our company functions—not as loose collection but as integrated
              organization. What emerges from this approach is not merely completed projects
              but an environment defined by accountability.
            </p>
            <p>
              We aim to deliver work that stands the test of time, that performs reliably
              when conditions change. The culture of our company is built on discipline,
              persistence, and the conviction that every solution should outlast its
              installation. What binds us together is not just the act of building, but
              the responsibility to leave behind work that endures.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
