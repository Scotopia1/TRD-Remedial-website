'use client';

import './TeamCardsSticky.css';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { TEAM_MEMBERS } from '@/data/team';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function TeamCardsSticky() {
  const stickyRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1000px)', () => {
        let scrollTriggerInstance: ScrollTrigger | null = null;

        const stickySection = stickyRef.current;
        const stickyHeader = headerRef.current;
        const cards = cardsRef.current;

        if (!stickySection || !stickyHeader || !cards || cards.length === 0) {
          return () => {};
        }

        let stickyHeight = 0;
        let maxTranslate = 0;
        let cardWidth = 325;
        let viewportWidth = window.innerWidth;
        let cardStartX = 25;
        let cardEndX = -650;

        const measure = () => {
          stickyHeight = window.innerHeight * 5;
          const headerWidth = stickyHeader ? stickyHeader.offsetWidth : 0;
          maxTranslate = Math.max(0, headerWidth - window.innerWidth);
          viewportWidth = window.innerWidth;

          if (cards && cards.length > 0 && cards[0]) {
            const cardRect = cards[0].getBoundingClientRect();
            cardWidth = cardRect.width || 325;
          }

          const standardViewportWidth = 1920;
          const standardEndXPercent = -650;
          const standardTravelPixels = Math.abs(
            (standardEndXPercent / 100) * cardWidth
          );

          const viewportScale = viewportWidth / standardViewportWidth;
          const requiredTravelPixels =
            standardTravelPixels * 1.25 * Math.max(1, viewportScale);

          cardStartX = 25;
          cardEndX = -(requiredTravelPixels / cardWidth) * 100;
        };
        measure();

        // Multi-stage transforms for each card [Y positions, Rotations]
        const transforms = [
          [
            [10, 50, -10, 10],
            [20, -10, -45, 20],
          ],
          [
            [0, 47.5, -10, 15],
            [-25, 15, -45, 30],
          ],
          [
            [0, 52.5, -10, 5],
            [15, -5, -40, 60],
          ],
        ];

        scrollTriggerInstance = ScrollTrigger.create({
          trigger: stickySection,
          start: 'top top',
          end: () => `+=${stickyHeight}px`,
          pin: true,
          pinSpacing: true,
          onUpdate: (self) => {
            const progress = self.progress;

            // Parallax background title
            const translateX = -progress * maxTranslate;
            gsap.set(stickyHeader, { x: translateX });

            cards.forEach((card, index) => {
              if (!card) return;

              const delay = index * 0.1125;
              const cardProgress = Math.max(
                0,
                Math.min((progress - delay) * 2, 1)
              );

              if (cardProgress > 0) {
                const yPos = transforms[index % transforms.length][0];
                const rotations = transforms[index % transforms.length][1];

                // X-axis interpolation
                const cardX = gsap.utils.interpolate(
                  cardStartX,
                  cardEndX,
                  cardProgress
                );

                // Y-axis multi-stage interpolation
                const yProgress = cardProgress * 3;
                const yIndex = Math.min(Math.floor(yProgress), yPos.length - 2);
                const yInterpolation = yProgress - yIndex;
                const cardY = gsap.utils.interpolate(
                  yPos[yIndex],
                  yPos[yIndex + 1],
                  yInterpolation
                );

                // Rotation multi-stage interpolation
                const cardRotation = gsap.utils.interpolate(
                  rotations[yIndex],
                  rotations[yIndex + 1],
                  yInterpolation
                );

                gsap.set(card, {
                  xPercent: cardX,
                  yPercent: cardY,
                  rotation: cardRotation,
                  opacity: 1,
                });
              } else {
                gsap.set(card, { opacity: 0 });
              }
            });
          },
        });

        const onRefreshInit = () => measure();
        ScrollTrigger.addEventListener('refreshInit', onRefreshInit);

        const handleResize = () => {
          measure();
          ScrollTrigger.refresh();
        };
        window.addEventListener('resize', handleResize, { passive: true });

        ScrollTrigger.refresh();

        return () => {
          if (scrollTriggerInstance) scrollTriggerInstance.kill();
          ScrollTrigger.removeEventListener('refreshInit', onRefreshInit);
          window.removeEventListener('resize', handleResize);
        };
      });

      mm.add('(max-width: 999px)', () => {
        const stickySection = stickyRef.current;
        const stickyHeader = headerRef.current;
        if (stickySection) gsap.set(stickySection, { clearProps: 'all' });
        if (stickyHeader) gsap.set(stickyHeader, { clearProps: 'all' });
        cardsRef.current.forEach((card) => {
          if (card) gsap.set(card, { clearProps: 'all', opacity: 1 });
        });

        ScrollTrigger.refresh();

        const refreshHandler = () => {
          ScrollTrigger.refresh();
        };

        window.addEventListener('orientationchange', refreshHandler);
        const onLoad = () => ScrollTrigger.refresh();
        window.addEventListener('load', onLoad, { passive: true });

        return () => {
          window.removeEventListener('orientationchange', refreshHandler);
          window.removeEventListener('load', onLoad);
        };
      });

      return () => {
        mm.revert();
      };
    },
    { scope: stickyRef }
  );

  return (
    <>
      {/* Desktop animated section */}
      <section className="team-cards-section team-desktop" ref={stickyRef}>
        <div className="sticky-header" ref={headerRef}>
          <h1>Leadership Team</h1>
        </div>
        {TEAM_MEMBERS.map((member, idx) => (
          <div
            className="team-card"
            id={`team-card-${idx + 1}`}
            key={member.id}
            ref={(el) => {
              cardsRef.current[idx] = el;
            }}
          >
            <div className="team-card-image">
              <img src={member.image} alt={member.name} />
            </div>
            <div className="team-card-content">
              <div className="team-card-title">
                <h2>{member.name}</h2>
              </div>
              <div className="team-card-description">
                <p>{member.bio}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Mobile static section */}
      <section className="team-cards-section team-mobile">
        <div className="mobile-header">
          <h1>Leadership Team</h1>
        </div>
        {TEAM_MEMBERS.map((member, idx) => (
          <div className="team-card" id={`team-card-m-${idx + 1}`} key={`m-${member.id}`}>
            <div className="team-card-image">
              <img src={member.image} alt={member.name} />
            </div>
            <div className="team-card-content">
              <div className="team-card-title">
                <h2>{member.name}</h2>
              </div>
              <div className="team-card-description">
                <p>{member.bio}</p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
