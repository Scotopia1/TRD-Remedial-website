"use client";
import "./ServicesShowcaseSticky.css";

import { useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SERVICES } from "@/data/services";

gsap.registerPlugin(ScrollTrigger);

export function ServicesShowcaseSticky() {
  const sectionRef = useRef<HTMLElement>(null);

  // Initial rotations for visual interest (from reference design)
  const rotations = [-12, 10, -5, 5, -5, -2];

  useGSAP(() => {
    if (!sectionRef.current) return;

    const galleryCards = gsap.utils.toArray<HTMLElement>(".gallery-card");
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Set initial positions - cards start below viewport with rotation
    galleryCards.forEach((card, index) => {
      gsap.set(card, {
        y: prefersReducedMotion ? 0 : window.innerHeight,
        rotate: prefersReducedMotion ? 0 : (rotations[index] || 0),
      });
    });

    if (prefersReducedMotion) {
      // Simplified animation for reduced motion - just fade and simple position
      galleryCards.forEach((card, index) => {
        gsap.set(card, {
          opacity: 1,
          y: 0,
          x: 0,
        });
      });
      return;
    }

    // Pin section and animate cards on scroll
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${window.innerHeight * 8}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const totalCards = galleryCards.length;
        const progressPerCard = 1 / totalCards;

        galleryCards.forEach((galleryCard, index) => {
          const galleryCardStart = index * progressPerCard;
          let galleryCardProgress =
            (progress - galleryCardStart) / progressPerCard;
          galleryCardProgress = Math.min(Math.max(galleryCardProgress, 0), 1);

          // Card slides up from bottom
          let yPos = window.innerHeight * (1 - galleryCardProgress);
          let xPos = 0;

          // After card is fully revealed, slide it to upper-left
          if (galleryCardProgress === 1 && index < totalCards - 1) {
            const remainingProgress =
              (progress - (galleryCardStart + progressPerCard)) /
              (1 - (galleryCardStart + progressPerCard));
            if (remainingProgress > 0) {
              const distanceMultiplier = 1 - index * 0.15;
              xPos =
                -window.innerWidth * 0.3 * distanceMultiplier * remainingProgress;
              yPos =
                -window.innerHeight *
                0.3 *
                distanceMultiplier *
                remainingProgress;
            }
          }

          gsap.to(galleryCard, {
            y: yPos,
            x: xPos,
            duration: 0,
            ease: "none",
          });
        });
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="services-gallery"
      aria-label="Services Gallery"
    >
      {/* Header */}
      <div className="services-gallery-header">
        <h3>
          Our Services
        </h3>
      </div>

      {/* Decorative Top Bar */}
      <div className="services-top-bar" role="presentation">
        <div className="container">
          <div className="symbols-container">
            <div className="symbol" aria-hidden="true"></div>
          </div>
          <div className="symbols-container">
            <div className="symbol" aria-hidden="true"></div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Bar */}
      <div className="services-bottom-bar" role="presentation">
        <div className="container">
          <p className="mono">
            <span aria-hidden="true">&#9654;</span> Services Gallery
          </p>
          <p className="mono">/ Six Core Solutions</p>
        </div>
      </div>

      {/* Gallery Cards */}
      {SERVICES.map((service, index) => (
        <div
          key={service.id}
          className="gallery-card"
          role="article"
          aria-label={`Service ${index + 1}: ${service.title}`}
        >
          <div className="gallery-card-img">
            <img
              src={service.visual}
              alt={`${service.title} - ${service.description}`}
              loading="lazy"
            />
          </div>
          <div className="gallery-card-content">
            <p className="mono">
              {String(index + 1).padStart(2, "0")} - {service.title}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
