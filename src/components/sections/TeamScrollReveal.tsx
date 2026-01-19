'use client';

import './TeamScrollReveal.css';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { TEAM_MEMBERS } from '@/data/team';

gsap.registerPlugin(ScrollTrigger);

export function TeamScrollReveal() {
  const teamSectionRef = useRef<HTMLDivElement>(null);
  const cardPlaceholderEntranceRef = useRef<ScrollTrigger | null>(null);
  const cardSlideInAnimationRef = useRef<ScrollTrigger | null>(null);

  // Phase 2: Animation Implementation
  useGSAP(
    () => {
      const teamSection = teamSectionRef.current;
      const teamMembers = gsap.utils.toArray('.team-member');
      const teamMemberCards = gsap.utils.toArray('.team-member-card');

      function initTeamAnimations() {
        // Mobile: Disable animations below 1000px
        if (window.innerWidth < 1000) {
          // Kill existing ScrollTriggers
          if (cardPlaceholderEntranceRef.current)
            cardPlaceholderEntranceRef.current.kill();
          if (cardSlideInAnimationRef.current)
            cardSlideInAnimationRef.current.kill();

          // Clear all transforms on team members
          teamMembers.forEach((member: any) => {
            gsap.set(member, { clearProps: 'all' });
            const teamMemberInitial = member.querySelector(
              '.team-member-name-initial h1'
            );
            gsap.set(teamMemberInitial, { clearProps: 'all' });
          });

          // Clear all transforms on cards
          teamMemberCards.forEach((card: any) => {
            gsap.set(card, { clearProps: 'all' });
          });

          return;
        }

        // Desktop: Kill existing animations before creating new ones
        if (cardPlaceholderEntranceRef.current)
          cardPlaceholderEntranceRef.current.kill();
        if (cardSlideInAnimationRef.current)
          cardSlideInAnimationRef.current.kill();

        // Animation 1: Placeholder Entrance Animation
        // Triggered when section enters viewport (40% of scroll progress)
        cardPlaceholderEntranceRef.current = ScrollTrigger.create({
          trigger: teamSection,
          start: 'top bottom', // Start when section enters viewport
          end: 'top top', // End when section reaches top
          scrub: 1, // Smooth sync with scroll
          refreshPriority: 7,
          onUpdate: (self) => {
            const progress = self.progress;

            teamMembers.forEach((member: any, index: number) => {
              // Animation timing parameters
              const entranceDelay = 0.15; // Stagger delay per member
              const entranceDuration = 0.7; // Duration of entrance animation
              const entranceStart = index * entranceDelay;
              const entranceEnd = entranceStart + entranceDuration;

              // Animate during member's entrance window
              if (progress >= entranceStart && progress <= entranceEnd) {
                const memberEntranceProgress =
                  (progress - entranceStart) / entranceDuration;

                // Slide up animation: translateY(125%) -> translateY(0%)
                const entranceY = 125 - memberEntranceProgress * 125;
                gsap.set(member, { y: `${entranceY}%` });

                // Initial letter scale animation (delayed by 0.4)
                const teamMemberInitial = member.querySelector(
                  '.team-member-name-initial h1'
                );
                const initialLetterScaleDelay = 0.4;
                const initialLetterScaleProgress = Math.max(
                  0,
                  (memberEntranceProgress - initialLetterScaleDelay) /
                    (1 - initialLetterScaleDelay)
                );
                gsap.set(teamMemberInitial, {
                  scale: initialLetterScaleProgress,
                });
              } else if (progress > entranceEnd) {
                // Set final state after animation completes
                gsap.set(member, { y: `0%` });
                const teamMemberInitial = member.querySelector(
                  '.team-member-name-initial h1'
                );
                gsap.set(teamMemberInitial, { scale: 1 });
              }
            });
          },
        });

        // Animation 2: Card Slide-In Animation
        // Cards slide from right with rotation (60% of scroll progress)
        cardSlideInAnimationRef.current = ScrollTrigger.create({
          trigger: teamSection,
          start: 'top top', // Start when section is pinned at top
          end: `+=${window.innerHeight * 3}`, // 3x viewport height scroll
          pin: true, // Pin section during scroll
          scrub: 1, // Smooth sync with scroll
          refreshPriority: 7,
          onUpdate: (self) => {
            const progress = self.progress;

            teamMemberCards.forEach((card: any, index: number) => {
              // Phase A: Rotation & Slide Animation (40%-70% progress)
              const slideInStagger = 0.075; // Stagger delay per card
              const xRotationDuration = 0.4; // Duration of slide/rotation
              const xRotationStart = index * slideInStagger;
              const xRotationEnd = xRotationStart + xRotationDuration;

              if (progress >= xRotationStart && progress <= xRotationEnd) {
                const cardProgress =
                  (progress - xRotationStart) / xRotationDuration;

                // Calculate slide-in X position
                // Member 1: 300% -> -50%
                // Member 2: 200% -> -50%
                // Member 3: 100% -> -50%
                const cardInitialX = 300 - index * 100;
                const cardTargetX = -50;
                const cardSlideInX =
                  cardInitialX + cardProgress * (cardTargetX - cardInitialX);

                // Rotation: 20deg -> 0deg
                const cardSlideInRotation = 20 - cardProgress * 20;

                gsap.set(card, {
                  x: `${cardSlideInX}%`,
                  rotation: cardSlideInRotation,
                });
              } else if (progress > xRotationEnd) {
                // Set final position after slide completes
                gsap.set(card, {
                  x: `-50%`,
                  rotation: 0,
                });
              }

              // Phase B: Scale Animation (40%-100% progress)
              const cardScaleStagger = 0.12; // Stagger delay per card
              const cardScaleStart = 0.4 + index * cardScaleStagger;
              const cardScaleEnd = 1;

              if (progress >= cardScaleStart && progress <= cardScaleEnd) {
                const scaleProgress =
                  (progress - cardScaleStart) / (cardScaleEnd - cardScaleStart);
                // Scale: 0.75 -> 1
                const scaleValue = 0.75 + scaleProgress * 0.25;

                gsap.set(card, {
                  scale: scaleValue,
                });
              } else if (progress > cardScaleEnd) {
                // Set final scale after animation completes
                gsap.set(card, {
                  scale: 1,
                });
              }
            });
          },
        });
      }

      // Debounced resize handler
      let resizeTimer: NodeJS.Timeout;
      const handleResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          initTeamAnimations();
          ScrollTrigger.refresh();
        }, 250);
      };

      // Add resize listener
      window.addEventListener('resize', handleResize);

      // Initialize animations on mount
      initTeamAnimations();

      // Cleanup function
      return () => {
        window.removeEventListener('resize', handleResize);
        if (cardPlaceholderEntranceRef.current)
          cardPlaceholderEntranceRef.current.kill();
        if (cardSlideInAnimationRef.current)
          cardSlideInAnimationRef.current.kill();
      };
    },
    { scope: teamSectionRef }
  );

  // Extract first initial from each team member name
  const getInitial = (name: string): string => {
    return name.charAt(0).toUpperCase();
  };

  // Split name into first and last for styling
  const splitName = (name: string): { first: string; last: string } => {
    const parts = name.split(' ');
    return {
      first: parts[0],
      last: parts.slice(1).join(' '),
    };
  };

  // Calculate responsive font size based on name length
  const calculateFontSize = (name: string): { desktop: string; mobile: string } => {
    const totalLength = name.length;

    // Base sizes
    const baseDesktop = 6.5; // rem
    const baseMobile = 5; // rem

    // Character thresholds
    const shortThreshold = 12; // e.g., "Fahed Nassif"
    const longThreshold = 15; // e.g., "Christopher Nassif"

    let desktopSize = baseDesktop;
    let mobileSize = baseMobile;

    if (totalLength > longThreshold) {
      // Long names: scale down proportionally
      const scaleFactor = shortThreshold / totalLength;
      desktopSize = baseDesktop * scaleFactor;
      mobileSize = baseMobile * scaleFactor;
    } else if (totalLength > shortThreshold) {
      // Medium names: slight reduction
      const scaleFactor = 0.85;
      desktopSize = baseDesktop * scaleFactor;
      mobileSize = baseMobile * scaleFactor;
    }
    // Short names keep base size

    return {
      desktop: `${desktopSize.toFixed(2)}rem`,
      mobile: `${mobileSize.toFixed(2)}rem`,
    };
  };

  return (
    <>
      {/* Consolidated Team Section - Prevents team members from splitting apart */}
      <section className="team-scroll-reveal-wrapper">
        {/* Hero Section */}
        <div className="team-hero">
          <h1>Meet The Team</h1>
        </div>

        {/* Team Reveal Section */}
        <div className="team-reveal" ref={teamSectionRef}>
          {TEAM_MEMBERS.map((member, index) => {
            const nameParts = splitName(member.name);
            const fontSize = calculateFontSize(member.name);
            return (
              <div key={member.id} className="team-member">
                {/* Large Initial Letter */}
                <div className="team-member-name-initial">
                  <h1>{getInitial(member.name)}</h1>
                </div>

                {/* Team Member Card */}
                <div className="team-member-card">
                  {/* Member Image */}
                  <div className="team-member-img">
                    <img src={member.image} alt={member.name} />
                  </div>

                  {/* Member Info */}
                  <div className="team-member-info">
                    <p className="team-member-role">( {member.title} )</p>
                    <h1
                      className="team-member-name"
                      style={{
                        '--name-font-size-desktop': fontSize.desktop,
                        '--name-font-size-mobile': fontSize.mobile,
                      } as React.CSSProperties}
                    >
                      {nameParts.first} <span>{nameParts.last}</span>
                    </h1>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Outro Section */}
        <div className="team-outro">
          <h1>Building Tomorrow's Structures</h1>
        </div>
      </section>
    </>
  );
}
