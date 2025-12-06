'use client';

import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useStore } from '@/stores/useStore';
import { TEAM_MEMBERS } from '@/data/team';

gsap.registerPlugin(ScrollTrigger);

export function LeadershipTeam() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [activeMember, setActiveMember] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const isMobile = useMediaQuery('(max-width: 1024px)');
  const setCursorVariant = useStore((state) => state.setCursorVariant);

  // Title entrance animation
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
        duration: 1,
        ease: 'power3.out',
      }).from(
        subtitleRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.6'
      );
    }
  });

  // Staggered grid reveal from center
  useGSAP(() => {
    if (!gridRef.current || cardsRef.current.length === 0) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set(cardsRef.current, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    // Calculate center point of grid
    const gridRect = gridRef.current.getBoundingClientRect();
    const centerX = gridRect.width / 2;
    const centerY = gridRect.height / 2;

    // Calculate distance from center for each card
    const cardsWithDistance = cardsRef.current.map((card, index) => {
      if (!card) return { index, distance: 0 };

      const rect = card.getBoundingClientRect();
      const cardCenterX = rect.left - gridRect.left + rect.width / 2;
      const cardCenterY = rect.top - gridRect.top + rect.height / 2;

      const distance = Math.sqrt(
        Math.pow(cardCenterX - centerX, 2) + Math.pow(cardCenterY - centerY, 2)
      );

      return { index, distance, card };
    });

    // Sort by distance from center
    const sortedCards = cardsWithDistance
      .filter((item) => item.card)
      .sort((a, b) => a.distance - b.distance);

    // Animate from center outward
    sortedCards.forEach((item, staggerIndex) => {
      if (!item.card) return;

      gsap.from(item.card, {
        opacity: 0,
        y: 60,
        scale: 0.9,
        rotateX: -15,
        duration: 1,
        ease: 'power3.out',
        delay: staggerIndex * 0.1,
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 75%',
        },
      });
    });
  });

  // CTA reveal
  useGSAP(() => {
    if (!ctaRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set(ctaRef.current, { opacity: 1, y: 0 });
    } else {
      gsap.from(ctaRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 85%',
        },
        delay: 0.4,
      });
    }
  });

  // Magnetic hover effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (isMobile) return;

    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate offset from center (max 15px)
    const offsetX = ((e.clientX - centerX) / rect.width) * 30;
    const offsetY = ((e.clientY - centerY) / rect.height) * 30;

    gsap.to(card, {
      x: offsetX,
      y: offsetY,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  // Image zoom on hover
  const handleImageHover = (index: number, isEntering: boolean) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const imageContainer = card.querySelector('.team-member-image-container');
    if (!imageContainer) return;

    if (isEntering) {
      setHoveredCard(index);
      gsap.to(imageContainer, {
        scale: 1.1,
        duration: 0.6,
        ease: 'power2.out',
      });
    } else {
      setHoveredCard(null);
      gsap.to(imageContainer, {
        scale: 1,
        duration: 0.6,
        ease: 'power2.out',
      });
    }
  };

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-32 bg-concrete-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(255,107,53,0.2) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(255,107,53,0.15) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl lg:text-6xl font-bold text-concrete-900 mb-6"
          >
            Meet The <span className="text-trd-accent">Experts</span>
          </h2>
          <p ref={subtitleRef} className="text-xl text-concrete-600 max-w-3xl mx-auto">
            Industry-leading professionals driving structural innovation and excellence
          </p>
        </div>

        {/* Team Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {TEAM_MEMBERS.map((member, index) => (
            <div
              key={member.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="relative group cursor-pointer"
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseEnter={() => {
                setCursorVariant('hover');
                handleImageHover(index, true);
              }}
              onMouseLeave={() => {
                setCursorVariant('default');
                handleMouseLeave(index);
                handleImageHover(index, false);
                if (activeMember === member.id) {
                  setActiveMember(null);
                }
              }}
              onClick={() => {
                if (isMobile) {
                  setActiveMember(activeMember === member.id ? null : member.id);
                }
              }}
            >
              {/* Card Container */}
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg
                           hover:shadow-2xl transition-shadow duration-500">
                {/* Portrait Image */}
                <div className="relative h-[400px] overflow-hidden">
                  <div
                    className="team-member-image-container absolute inset-0 bg-gradient-to-br
                             from-industrial-600 to-concrete-700"
                    style={{
                      backgroundImage: `url(${member.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Bio Overlay - Desktop */}
                  {!isMobile && hoveredCard === index && (
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-trd-primary/95 to-industrial-800/95
                                 p-6 flex flex-col justify-center animate-in fade-in zoom-in-95 duration-300"
                    >
                      <h4 className="text-white font-bold text-lg mb-3">
                        About {member.name.split(' ')[0]}
                      </h4>
                      <p className="text-white/90 text-sm mb-4 leading-relaxed">{member.bio}</p>
                      {member.linkedIn && (
                        <a
                          href={member.linkedIn}
                          className="inline-flex items-center text-trd-accent hover:text-trd-accent/80
                                   transition-colors duration-200"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                          View LinkedIn
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* Member Info */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-concrete-900 mb-2">{member.name}</h3>
                  <p className="text-trd-accent font-semibold mb-4">{member.title}</p>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-concrete-100 text-concrete-700 text-xs
                                 rounded-full font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                    {member.expertise.length > 3 && (
                      <span
                        className="px-3 py-1 bg-trd-accent/10 text-trd-accent text-xs
                                   rounded-full font-medium"
                      >
                        +{member.expertise.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Mobile Bio Dropdown */}
                {isMobile && activeMember === member.id && (
                  <div className="p-6 pt-0 border-t border-concrete-200">
                    <p className="text-concrete-700 text-sm leading-relaxed mb-4">{member.bio}</p>
                    {member.linkedIn && (
                      <a
                        href={member.linkedIn}
                        className="inline-flex items-center text-trd-accent hover:text-trd-accent/80
                                 transition-colors duration-200"
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                        View LinkedIn
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Decorative Corner Accent */}
              <div
                className="absolute -top-1 -right-1 w-20 h-20 bg-gradient-to-br from-trd-accent to-orange-600
                             opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
                }}
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div ref={ctaRef} className="text-center mt-16">
          <p className="text-lg text-concrete-600 mb-6">
            Our leadership team brings decades of combined experience in structural engineering,
            construction, and architectural design.
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-4 bg-trd-accent text-white font-semibold
                     rounded-lg hover:bg-trd-accent/90 transition-all duration-300
                     hover:scale-105 shadow-lg hover:shadow-xl"
            onMouseEnter={() => setCursorVariant('cta')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            Work With Our Team
          </a>
        </div>
      </div>
    </section>
  );
}
