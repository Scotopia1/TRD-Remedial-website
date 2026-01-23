"use client";
import "./CaseStudiesOtisValen.css";

import { useRef } from "react";
import Image from "next/image";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { scrollTriggerManager } from "@/utils/scrollTriggerManager";
import { PROJECTS } from "@/data/projects";
import { OptimizedImage } from "@/components/ui/OptimizedImage";

gsap.registerPlugin(ScrollTrigger, SplitText);

export function CaseStudiesOtisValen() {
  // Select 6 diverse real projects representing different services and categories
  const featuredProjectIds = [
    'project-001', // Caringbah Pavilion - Carbon Fibre, Heritage
    'project-006', // Rouse Hill - Slab Scanning, Diagnostic
    'project-007', // Pelican Road - Residential Estate
    'project-003', // Enfield - Curtain Wall, Commercial
    'project-005', // Northbridge - Structural Wall, Heritage
    'project-012', // Zetland - Surelock System, Precision
  ];

  const caseStudiesData = featuredProjectIds
    .map(id => PROJECTS.find(p => p.id === id))
    .filter((project): project is NonNullable<typeof project> => project !== undefined)
    .map(project => ({
      title: project.name,
      category: project.serviceType,
      image: project.thumbnailImage || project.featuredImage,
      href: `/projects/${project.slug}`,
    }));

  // Debug: Log image paths
  console.log('Case Studies Images:', caseStudiesData.map(d => d.image));

  const containerRef = useRef(null);
  const headerContentRef = useRef(null);
  const workItemsRef = useRef(null);

  // Header animations
  useGSAP(() => {
    if (!headerContentRef.current) return;

    gsap.set(".cs-profile-icon", { scale: 0 });
    gsap.set(".cs-circular-btn-wrapper", { scale: 0, opacity: 0 });

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
      ".cs-circular-btn-wrapper",
      {
        scale: 1,
        opacity: 1,
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
          rotation: 0,
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
      scrollTriggerManager.requestRefresh();
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
            <h2>Our Work In Action</h2>
          </div>
          <a href="/projects" className="cs-circular-btn-wrapper">
            <div className="cs-circular-btn">
              <svg viewBox="0 0 200 200" className="cs-circular-btn-svg">
                <defs>
                  <path
                    id="csCirclePath"
                    d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                  />
                </defs>
                <text className="cs-circular-btn-text">
                  <textPath href="#csCirclePath" startOffset="0%">
                    SEE MORE WORK • SEE MORE WORK •
                  </textPath>
                </text>
              </svg>
              <div className="cs-circular-btn-arrow">↓</div>
            </div>
          </a>
        </div>
      </section>

      {/* Case Studies - Work Items */}
      <section className="cs-work-items" ref={workItemsRef}>
        <div className="cs-row">
          <div className="cs-work-item">
            <div className="cs-work-item-img">
              <a href={caseStudiesData[0].href}>
                <OptimizedImage
                  src={caseStudiesData[0].image}
                  alt={caseStudiesData[0].title}
                  width={1200}
                  height={800}
                  priority={true}
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
                <OptimizedImage
                  src={caseStudiesData[1].image}
                  alt={caseStudiesData[1].title}
                  width={1200}
                  height={800}
                  priority={false}
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
                <OptimizedImage
                  src={caseStudiesData[2].image}
                  alt={caseStudiesData[2].title}
                  width={1200}
                  height={800}
                  priority={false}
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
                <OptimizedImage
                  src={caseStudiesData[3].image}
                  alt={caseStudiesData[3].title}
                  width={1200}
                  height={800}
                  priority={false}
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
                <OptimizedImage
                  src={caseStudiesData[4].image}
                  alt={caseStudiesData[4].title}
                  width={1200}
                  height={800}
                  priority={false}
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
                <OptimizedImage
                  src={caseStudiesData[5].image}
                  alt={caseStudiesData[5].title}
                  width={1200}
                  height={800}
                  priority={false}
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
