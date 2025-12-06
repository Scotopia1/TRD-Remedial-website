"use client";
import "./CaseStudiesOtisValen.css";

import { useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

export function CaseStudiesOtisValen() {
  const caseStudiesData = [
    {
      title: "Carbon Fibre Bridge Repair",
      category: "Structural Reinforcement",
      image: "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=800&h=600&fit=crop",
      href: "/projects/westfield-carpark-carbon-fibre-strengthening",
    },
    {
      title: "Sydney Tower GPR Scanning",
      category: "Non-Destructive Testing",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop",
      href: "/projects/bondi-apartment-slab-scanning",
    },
    {
      title: "Warehouse Floor Crack Injection",
      category: "Concrete Repair",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop",
      href: "/projects/greenacre-plaza-post-tension-repair",
    },
    {
      title: "Parking Structure Reinforcement",
      category: "Carbon Fibre Systems",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop",
      href: "/projects/penrith-warehouse-carbon-fibre-upgrade",
    },
    {
      title: "Retail Complex Line Marking",
      category: "Traffic Management",
      image: "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=800&h=600&fit=crop",
      href: "/projects/liverpool-shopping-precinct-carpark",
    },
    {
      title: "Industrial Safety Fixtures",
      category: "Fall Protection",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop",
      href: "/projects/olympic-park-safety-handrails",
    },
  ];

  const containerRef = useRef(null);
  const headerContentRef = useRef(null);
  const workItemsRef = useRef(null);

  // Header animations
  useGSAP(() => {
    if (!headerContentRef.current) return;

    gsap.set(".cs-profile-icon", { scale: 0 });
    gsap.set(".cs-header-arrow-icon", { scale: 0 });

    const introText = new SplitText(".cs-header-content > p", {
      type: "lines",
      linesClass: "line-wrapper",
    });

    const titleText = new SplitText(".cs-header-title h1", {
      type: "lines",
      linesClass: "line-wrapper",
    });

    gsap.set([introText.lines, titleText.lines], {
      y: "120%",
    });

    const headerTl = gsap.timeline({ delay: 0.75 });

    headerTl.to(".cs-profile-icon", {
      scale: 1,
      duration: 1,
      ease: "power4.out",
    });

    headerTl.to(
      introText.lines,
      {
        y: "0%",
        duration: 1,
        ease: "power4.out",
      },
      "-=0.9"
    );

    headerTl.to(
      titleText.lines,
      {
        y: "0%",
        duration: 1,
        ease: "power4.out",
        stagger: 0.1,
      },
      "-=0.9"
    );

    headerTl.to(
      ".cs-header-arrow-icon",
      {
        scale: 1,
        duration: 0.75,
        ease: "power4.out",
      },
      "-=0.9"
    );

    return () => {
      introText.revert();
      titleText.revert();
    };
  }, { scope: headerContentRef });

  // Work items animations
  useGSAP(() => {
    if (!workItemsRef.current) return;

    const scrollTriggerInstances: ScrollTrigger[] = [];

    gsap.set(".cs-work-item", {
      opacity: 0,
      scale: 0.75,
    });

    document.querySelectorAll(".cs-work-items .cs-row").forEach((row) => {
      const workItems = row.querySelectorAll(".cs-work-item");

      workItems.forEach((item, itemIndex) => {
        const fromLeft = itemIndex % 2 === 0;

        gsap.set(item, {
          x: fromLeft ? -1000 : 1000,
          rotation: fromLeft ? -50 : 50,
          transformOrigin: "center center",
        });
      });

      const trigger = ScrollTrigger.create({
        trigger: row as HTMLElement,
        start: "top 80%",
        refreshPriority: 8,
        onEnter: () => {
          gsap.timeline().to(workItems, {
            duration: 1,
            x: 0,
            rotation: 0,
            opacity: 1,
            scale: 1,
            ease: "power4.out",
          });
        },
      });
      scrollTriggerInstances.push(trigger);
    });

    return () => {
      scrollTriggerInstances.forEach((instance) => instance.kill());
      ScrollTrigger.refresh();
    };
  }, { scope: workItemsRef });

  return (
    <>
      {/* Case Studies - Header */}
      <section className="cs-header" ref={headerContentRef}>
        <div className="cs-header-content">
          <div className="cs-profile-icon">
            <img
              src="/trd-logo-black.svg"
              alt="TRD Remedial"
            />
          </div>
          <p>Proven Results, Real Projects</p>
          <div className="cs-header-title">
            <h1>Case Studies</h1>
            <h1>Our Work In Action</h1>
          </div>
          <div className="cs-header-arrow-icon">
            <h1>&#8595;</h1>
          </div>
        </div>
        <div className="cs-footer">
          <div className="cs-footer-symbols">
            <img src="https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/25fc.svg" alt="Decorative icon" />
          </div>
          <div className="cs-footer-scroll-down">
            <p className="mn">See More Work</p>
          </div>
          <div className="cs-footer-tags">
            <p className="mn">Our Projects / 2025</p>
          </div>
        </div>
      </section>

      {/* Case Studies - Work Items */}
      <section className="cs-work-items" ref={workItemsRef}>
        <div className="cs-row">
          <div className="cs-work-item">
            <div className="cs-work-item-img">
              <a href={caseStudiesData[0].href}>
                <img
                  src={caseStudiesData[0].image}
                  alt={caseStudiesData[0].title}
                />
              </a>
            </div>
            <div className="cs-work-item-content">
              <h3>{caseStudiesData[0].title}</h3>
              <p className="mn">{caseStudiesData[0].category}</p>
            </div>
          </div>
          <div className="cs-work-item">
            <div className="cs-work-item-img">
              <a href={caseStudiesData[1].href}>
                <img
                  src={caseStudiesData[1].image}
                  alt={caseStudiesData[1].title}
                />
              </a>
            </div>
            <div className="cs-work-item-content">
              <h3>{caseStudiesData[1].title}</h3>
              <p className="mn">{caseStudiesData[1].category}</p>
            </div>
          </div>
        </div>
        <div className="cs-row">
          <div className="cs-work-item">
            <div className="cs-work-item-img">
              <a href={caseStudiesData[2].href}>
                <img
                  src={caseStudiesData[2].image}
                  alt={caseStudiesData[2].title}
                />
              </a>
            </div>
            <div className="cs-work-item-content">
              <h3>{caseStudiesData[2].title}</h3>
              <p className="mn">{caseStudiesData[2].category}</p>
            </div>
          </div>
          <div className="cs-work-item">
            <div className="cs-work-item-img">
              <a href={caseStudiesData[3].href}>
                <img
                  src={caseStudiesData[3].image}
                  alt={caseStudiesData[3].title}
                />
              </a>
            </div>
            <div className="cs-work-item-content">
              <h3>{caseStudiesData[3].title}</h3>
              <p className="mn">{caseStudiesData[3].category}</p>
            </div>
          </div>
        </div>
        <div className="cs-row">
          <div className="cs-work-item">
            <div className="cs-work-item-img">
              <a href={caseStudiesData[4].href}>
                <img
                  src={caseStudiesData[4].image}
                  alt={caseStudiesData[4].title}
                />
              </a>
            </div>
            <div className="cs-work-item-content">
              <h3>{caseStudiesData[4].title}</h3>
              <p className="mn">{caseStudiesData[4].category}</p>
            </div>
          </div>
          <div className="cs-work-item">
            <div className="cs-work-item-img">
              <a href={caseStudiesData[5].href}>
                <img
                  src={caseStudiesData[5].image}
                  alt={caseStudiesData[5].title}
                />
              </a>
            </div>
            <div className="cs-work-item-content">
              <h3>{caseStudiesData[5].title}</h3>
              <p className="mn">{caseStudiesData[5].category}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
