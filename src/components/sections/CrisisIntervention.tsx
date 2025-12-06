'use client';

import './CrisisIntervention.css';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export function CrisisIntervention() {
  const cardsData = [
    {
      index: '01',
      title: 'The Crisis',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop',
      label: '(The Problem)',
      description:
        "Stop-work orders halting multi-million dollar developments. Structural compliance failures threatening project viability. Contractors who couldn't deliver on complex remedial requirements.",
    },
    {
      index: '02',
      title: 'The Solution',
      image: 'https://images.unsplash.com/photo-1503328427499-d92d414d0f41?w=800&h=600&fit=crop',
      label: '(TRD Remedial)',
      description:
        'Full structural compliance achieved. Stop-work orders lifted. Projects back on track with Building Commissioner approval. Development proceeding successfully.',
    },
  ];

  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const stickyCards = document.querySelectorAll('.sticky-card');

      stickyCards.forEach((card, index) => {
        // Pin all cards except the last one
        if (index < stickyCards.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: 'top top',
            endTrigger: stickyCards[stickyCards.length - 1],
            end: 'top top',
            pin: true,
            pinSpacing: false,
          });
        }

        // Scale, rotate, and darken animation for all except last
        if (index < stickyCards.length - 1) {
          ScrollTrigger.create({
            trigger: stickyCards[index + 1],
            start: 'top bottom',
            end: 'top top',
            onUpdate: (self) => {
              const progress = self.progress;
              const scale = 1 - progress * 0.25;
              const rotation = (index % 2 === 0 ? 5 : -5) * progress;
              const afterOpacity = progress;

              gsap.set(card, {
                scale: scale,
                rotation: rotation,
                '--after-opacity': afterOpacity,
              });
            },
          });
        }
      });
    },
    { scope: container }
  );

  return (
    <>
      {/* Intro Section */}
      <section className="crisis-intro">
        <h1>When Projects Stop</h1>
      </section>

      {/* Sticky Cards */}
      <div className="sticky-cards" ref={container}>
        {cardsData.map((cardData, index) => (
          <div className="sticky-card" key={index}>
            <div className="sticky-card-index">
              <h1>{cardData.index}</h1>
            </div>
            <div className="sticky-card-content">
              <div className="sticky-card-content-wrapper">
                <h1 className="sticky-card-header">{cardData.title}</h1>

                <div className="sticky-card-img">
                  <img src={cardData.image} alt={cardData.title} />
                </div>

                <div className="sticky-card-copy">
                  <div className="sticky-card-copy-title">
                    <p>{cardData.label}</p>
                  </div>
                  <div className="sticky-card-copy-description">
                    <p>{cardData.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
