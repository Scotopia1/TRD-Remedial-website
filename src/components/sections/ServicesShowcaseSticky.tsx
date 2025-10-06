"use client";
import "./ServicesShowcaseSticky.css";

import { useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function ServicesShowcaseSticky() {
  const servicesData = [
    {
      index: "01",
      title: "Carbon Fibre Reinforcement",
      image: "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=800&h=600&fit=crop",
      description:
        "Advanced structural strengthening using high-performance carbon fiber composite systems. Ideal for reinforcing concrete structures without adding significant weight or bulk.",
    },
    {
      index: "02",
      title: "Concrete Cutting & Coring",
      image: "https://images.unsplash.com/photo-1581092918484-8313e01f50e2?w=800&h=600&fit=crop",
      description:
        "Precision cutting, sawing, and coring services for concrete, masonry, and stone. Diamond blade technology ensures clean cuts with minimal disruption and dust.",
    },
    {
      index: "03",
      title: "Crack Injection",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop",
      description:
        "Specialized epoxy and polyurethane injection to seal and repair structural cracks. Restores structural integrity while preventing water ingress and further deterioration.",
    },
    {
      index: "04",
      title: "GPR Scanning",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop",
      description:
        "Non-destructive Ground Penetrating Radar technology to locate rebar, conduits, voids, and embedded objects. Essential for safe drilling and cutting operations.",
    },
    {
      index: "05",
      title: "Line Marking",
      image: "https://images.unsplash.com/photo-1486406146456-8edd19c34d82?w=800&h=600&fit=crop",
      description: "",
    },
    {
      index: "06",
      title: "Safety Fixtures",
      image: "https://images.unsplash.com/photo-1503328427499-d92d414d0f41?w=800&h=600&fit=crop",
      description:
        "Installation of safety anchor points, handrails, and fall protection systems. Fully compliant with Australian safety standards and regulations.",
    },
  ];

  const container = useRef(null);

  useGSAP(
    () => {
      const stickyCards = document.querySelectorAll(".service-sticky-card");

      stickyCards.forEach((card, index) => {
        if (index < stickyCards.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: "top top",
            endTrigger: stickyCards[stickyCards.length - 1],
            end: "top top",
            pin: true,
            pinSpacing: false,
          });
        }

        if (index < stickyCards.length - 1) {
          ScrollTrigger.create({
            trigger: stickyCards[index + 1],
            start: "top bottom",
            end: "top top",
            onUpdate: (self) => {
              const progress = self.progress;
              const scale = 1 - progress * 0.25;
              const rotation = (index % 2 === 0 ? 5 : -5) * progress;
              const afterOpacity = progress;

              gsap.set(card, {
                scale: scale,
                rotation: rotation,
                "--after-opacity": afterOpacity,
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
      {/* Intro Section - STICKY CARDS Style (Inverted Colors) */}
      <section className="services-intro">
        <h1>Our Services</h1>
      </section>

      {/* Sticky Cards */}
      <div className="services-sticky-cards" ref={container}>
        {servicesData.map((serviceData, index) => (
        <a
          href={`/services/${serviceData.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`}
          className="service-sticky-card"
          key={index}
          style={{ cursor: 'pointer' }}
        >
          <div className="service-sticky-card-index">
            <h1>{serviceData.index}</h1>
          </div>
          <div className="service-sticky-card-content">
            <div className="service-sticky-card-content-wrapper">
              <h1 className="service-sticky-card-header">{serviceData.title}</h1>

              <div className="service-sticky-card-img">
                <img src={serviceData.image} alt={serviceData.title} />
              </div>
            </div>
          </div>
        </a>
      ))}
      </div>
    </>
  );
}
