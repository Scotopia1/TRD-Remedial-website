'use client';

import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useStore } from '@/stores/useStore';
import { getStableHeight } from '@/utils/deviceDetect';

gsap.registerPlugin(ScrollTrigger);

export function WhyTRD() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const reasonsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const setCursorVariant = useStore((state) => state.setCursorVariant);

  const differentiators = [
    {
      number: '01',
      title: 'Solution-Oriented Mindset',
      description: 'We don\'t just provide services — we solve problems. Every challenge is an opportunity for innovation.',
      color: 'from-orange-500 to-red-500',
      bgColor: 'rgba(255, 107, 53, 0.05)',
    },
    {
      number: '02',
      title: 'Technical Versatility',
      description: 'Multi-skilled crew with full-spectrum capabilities. From scanning to carbon fiber, we handle it all.',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'rgba(59, 130, 246, 0.05)',
    },
    {
      number: '03',
      title: 'Real-World Impact',
      description: 'Unlocking unexpected returns for clients. Our solutions transform challenges into opportunities.',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'rgba(16, 185, 129, 0.05)',
    },
    {
      number: '04',
      title: 'Adaptable & Forward-Thinking',
      description: 'Services evolve with client needs. We stay ahead of industry challenges and regulations.',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'rgba(168, 85, 247, 0.05)',
    },
    {
      number: '05',
      title: 'Client-First Approach',
      description: 'Easy to deal with, responsive, solutions-focused. Your success is our priority.',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'rgba(245, 158, 11, 0.05)',
    },
  ];

  // Title entrance animation
  useGSAP(() => {
    if (!titleRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set(titleRef.current, { opacity: 1, y: 0 });
    } else {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
    }
  });

  // Pinned scroll-through effect (desktop only)
  useGSAP(() => {
    if (isMobile || !containerRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Pin the section
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: () => `+=${(differentiators.length - 1) * getStableHeight()}`,
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        const index = Math.min(
          Math.floor(self.progress * differentiators.length),
          differentiators.length - 1
        );
        setActiveIndex(index);
      },
    });

    // Animate each reason
    reasonsRef.current.forEach((reason, index) => {
      if (!reason) return;

      const start = index / differentiators.length;
      const end = (index + 1) / differentiators.length;

      if (prefersReducedMotion) {
        // Simplified animation for reduced motion
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${(differentiators.length - 1) * getStableHeight()}`,
          scrub: true,
          onUpdate: (self) => {
            if (self.progress >= start && self.progress < end) {
              gsap.set(reason, { opacity: 1, y: 0 });
            } else {
              gsap.set(reason, { opacity: 0, y: 0 });
            }
          },
        });
      } else {
        // Full animation
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${(differentiators.length - 1) * getStableHeight()}`,
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;

            if (progress >= start && progress < end) {
              // Fade in and move up
              const localProgress = (progress - start) / (end - start);
              const opacity = Math.min(localProgress * 3, 1);
              const y = (1 - Math.min(localProgress * 2, 1)) * 50;

              gsap.to(reason, {
                opacity,
                y,
                duration: 0.1,
                overwrite: true,
              });
            } else if (progress < start) {
              // Before this reason
              gsap.to(reason, {
                opacity: 0,
                y: 50,
                duration: 0.1,
                overwrite: true,
              });
            } else {
              // After this reason
              gsap.to(reason, {
                opacity: 0,
                y: -50,
                duration: 0.1,
                overwrite: true,
              });
            }
          },
        });
      }
    });
  }, { dependencies: [isMobile] });

  // Mobile: standard scroll reveal
  useGSAP(() => {
    if (!isMobile) return;

    reasonsRef.current.forEach((reason, index) => {
      if (!reason) return;

      gsap.from(reason, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: reason,
          start: 'top 80%',
        },
        delay: index * 0.1,
      });
    });
  }, { dependencies: [isMobile] });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        backgroundColor: isMobile ? '#ffffff' : differentiators[activeIndex]?.bgColor || '#ffffff',
        transition: 'background-color 0.5s ease',
      }}
    >
      <div
        ref={containerRef}
        className={isMobile ? 'py-20 lg:py-32' : 'h-screen flex items-center justify-center'}
      >
        <div className="container mx-auto px-4 lg:px-8">
          {/* Title - Stays fixed on desktop */}
          <div className="text-center mb-12 lg:mb-20">
            <h2
              ref={titleRef}
              className="text-4xl lg:text-6xl font-bold text-concrete-900 mb-4"
            >
              Why Choose <span className="text-trd-accent">TRD?</span>
            </h2>
            {isMobile && (
              <p className="text-xl text-concrete-600">
                Five key differentiators that set us apart
              </p>
            )}
          </div>

          {/* Reasons Container */}
          <div className={isMobile ? 'space-y-8' : 'relative'}>
            {differentiators.map((item, index) => (
              <div
                key={item.number}
                ref={(el) => {
                  reasonsRef.current[index] = el;
                }}
                className={
                  isMobile
                    ? 'bg-white border-2 border-concrete-200 rounded-2xl p-8 hover:border-trd-accent hover:shadow-xl transition-all duration-300'
                    : 'absolute inset-0 flex items-center justify-center opacity-0'
                }
                onMouseEnter={() => !isMobile && setCursorVariant('hover')}
                onMouseLeave={() => !isMobile && setCursorVariant('default')}
              >
                <div className="max-w-4xl mx-auto text-center">
                  {/* Number Counter */}
                  <div
                    className={`inline-block mb-6 text-8xl lg:text-9xl font-bold bg-gradient-to-br ${item.color}
                               bg-clip-text text-transparent`}
                  >
                    <ShuffleText text={item.number} active={!isMobile && activeIndex === index} />
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl lg:text-5xl font-bold text-concrete-900 mb-6">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xl lg:text-2xl text-concrete-700 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Progress indicator (desktop only) */}
                  {!isMobile && index === activeIndex && (
                    <div className="mt-8 text-sm text-concrete-500">
                      {index + 1} of {differentiators.length}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Scroll hint (desktop only) */}
          {!isMobile && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-concrete-500 text-sm
                           animate-bounce opacity-50">
              Scroll to explore
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Shuffle text effect component
interface ShuffleTextProps {
  text: string;
  active: boolean;
}

function ShuffleText({ text, active }: ShuffleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const frameRef = useRef(0);

  useEffect(() => {
    if (!active) {
      setDisplayText(text);
      return;
    }

    const characters = '0123456789';
    let iterations = 0;
    const maxIterations = 10;

    const interval = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split('')
          .map((char, index) => {
            if (iterations >= maxIterations) {
              return text[index];
            }

            if (index < iterations) {
              return text[index];
            }

            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('')
      );

      iterations += 0.5;

      if (iterations >= maxIterations + 2) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [text, active]);

  return <span>{displayText}</span>;
}
