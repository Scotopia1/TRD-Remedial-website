'use client';

import './LeadershipTeamInteractive.css';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/dist/SplitText';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useStore } from '@/stores/useStore';
import { TEAM_MEMBERS } from '@/data/team';

gsap.registerPlugin(ScrollTrigger, SplitText);

export function LeadershipTeamInteractive() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const profileImagesContainerRef = useRef<HTMLDivElement>(null);
  const profileImagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const nameElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const nameHeadingsRef = useRef<(HTMLHeadingElement | null)[]>([]);
  const detailCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const isMobile = useMediaQuery('(max-width: 900px)');
  const setCursorVariant = useStore((state) => state.setCursorVariant);

  // Interactive hover effect - CodeGrid pattern
  useGSAP(
    () => {
      const profileImagesContainer = profileImagesContainerRef.current;
      const profileImages = profileImagesRef.current.filter(Boolean);
      const nameElements = nameElementsRef.current.filter(Boolean);
      const nameHeadings = nameHeadingsRef.current.filter(Boolean);

      // Split text for name headings
      nameHeadings.forEach((heading) => {
        if (!heading) return;
        const split = new SplitText(heading, { type: 'chars' });
        split.chars.forEach((char) => {
          char.classList.add('letter');
        });
      });

      // Set default state (first name element is "The Experts")
      if (nameElements[0]) {
        const defaultLetters = nameElements[0].querySelectorAll('.letter');
        gsap.set(defaultLetters, { y: '100%' });
      }

      // Only enable interactive hover on desktop
      if (window.innerWidth >= 900) {
        profileImages.forEach((img, index) => {
          if (!img) return;

          const correspondingName = nameElements[index + 1];
          if (!correspondingName) return;

          const letters = correspondingName.querySelectorAll('.letter');

          img.addEventListener('mouseenter', () => {
            // Expand image
            gsap.to(img, {
              width: 140,
              height: 140,
              duration: 0.5,
              ease: 'power4.out',
            });

            // Reveal name with character stagger
            gsap.to(letters, {
              y: '-100%',
              ease: 'power4.out',
              duration: 0.75,
              stagger: {
                each: 0.025,
                from: 'center',
              },
            });
          });

          img.addEventListener('mouseleave', () => {
            // Shrink image
            gsap.to(img, {
              width: 70,
              height: 70,
              duration: 0.5,
              ease: 'power4.out',
            });

            // Hide name
            gsap.to(letters, {
              y: '0%',
              ease: 'power4.out',
              duration: 0.75,
              stagger: {
                each: 0.025,
                from: 'center',
              },
            });
          });
        });

        // Container hover - show default "The Experts" text
        if (profileImagesContainer && nameElements[0]) {
          const defaultNameElement = nameElements[0];
          profileImagesContainer.addEventListener('mouseenter', () => {
            const defaultLetters = defaultNameElement.querySelectorAll('.letter');
            gsap.to(defaultLetters, {
              y: '0%',
              ease: 'power4.out',
              duration: 0.75,
              stagger: {
                each: 0.025,
                from: 'center',
              },
            });
          });

          profileImagesContainer.addEventListener('mouseleave', () => {
            const defaultLetters = defaultNameElement.querySelectorAll('.letter');
            gsap.to(defaultLetters, {
              y: '100%',
              ease: 'power4.out',
              duration: 0.75,
              stagger: {
                each: 0.025,
                from: 'center',
              },
            });
          });
        }
      }
    },
    { scope: containerRef }
  );

  // Detail cards reveal animation
  useGSAP(() => {
    if (!detailCardsRef.current || detailCardsRef.current.length === 0) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set(detailCardsRef.current, { opacity: 1, y: 0 });
      return;
    }

    detailCardsRef.current.forEach((card, index) => {
      if (!card) return;

      gsap.from(card, {
        opacity: 0,
        y: 60,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
        },
        delay: index * 0.15,
      });
    });
  });

  return (
    <section ref={sectionRef} className="leadership-team-interactive">
      {/* Hero Section - CodeGrid Interactive Pattern */}
      <div ref={containerRef} className="team-interactive-hero">
        {/* Profile Images Row */}
        <div className="profile-images" ref={profileImagesContainerRef}>
          {TEAM_MEMBERS.map((member, index) => (
            <div
              key={member.id}
              className="img"
              ref={(el) => {
                profileImagesRef.current[index] = el;
              }}
              onMouseEnter={() => !isMobile && setCursorVariant('hover')}
              onMouseLeave={() => !isMobile && setCursorVariant('default')}
            >
              <Image
                src={member.image}
                alt={member.name}
                className="profile-image"
                width={140}
                height={140}
                sizes="140px"
                quality={85}
                priority={false}
                style={{ objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>

        {/* Name Display Area - Massive Typography */}
        <div className="profile-names">
          {/* Default Text */}
          <div
            className="name default"
            ref={(el) => {
              nameElementsRef.current[0] = el;
            }}
          >
            <h1 ref={(el) => {
              nameHeadingsRef.current[0] = el;
            }}>
              The Experts
            </h1>
          </div>

          {/* Individual Names */}
          {TEAM_MEMBERS.map((member, index) => (
            <div
              key={member.id}
              className="name"
              ref={(el) => {
                nameElementsRef.current[index + 1] = el;
              }}
            >
              <h3 ref={(el) => {
                nameHeadingsRef.current[index + 1] = el;
              }}>
                {member.name}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Cards Section */}
      <div className="team-details-section">
        <div className="team-details-container">
          <div className="team-details-grid">
            {TEAM_MEMBERS.map((member, index) => (
              <div
                key={member.id}
                ref={(el) => {
                  detailCardsRef.current[index] = el;
                }}
                className="team-detail-card"
                onMouseEnter={() => !isMobile && setCursorVariant('hover')}
                onMouseLeave={() => !isMobile && setCursorVariant('default')}
              >
                {/* Member Image */}
                <div className="detail-card-image">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    quality={85}
                    priority={false}
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="detail-card-overlay" />
                </div>

                {/* Member Info */}
                <div className="detail-card-content">
                  <h3 className="detail-card-name">{member.name}</h3>
                  <p className="detail-card-title">{member.title}</p>
                  <p className="detail-card-bio">{member.bio}</p>

                  {/* Expertise Tags */}
                  <div className="detail-card-expertise">
                    {member.expertise.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="expertise-tag">
                        {skill}
                      </span>
                    ))}
                    {member.expertise.length > 3 && (
                      <span className="expertise-tag more">
                        +{member.expertise.length - 3}
                      </span>
                    )}
                  </div>

                  {/* LinkedIn Link */}
                  {member.linkedIn && (
                    <a
                      href={member.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="detail-card-linkedin"
                    >
                      <svg className="linkedin-icon" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                      LinkedIn Profile
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
