"use client";
import "./ServicesSpotlight.css";

import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES } from "@/data/services";

interface SpotlightItem {
  name: string;
  img: string;
  id: string;
}

const ServicesSpotlight = () => {
  const spotlightRef = useRef<HTMLElement>(null);
  const titlesContainerRef = useRef<HTMLDivElement>(null);
  const imagesContainerRef = useRef<HTMLDivElement>(null);
  const spotlightHeaderRef = useRef<HTMLDivElement>(null);
  const titlesContainerElementRef = useRef<HTMLDivElement>(null);
  const introTextElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imageElementsRef = useRef<HTMLDivElement[]>([]);
  const titleElementsRef = useRef<NodeListOf<HTMLHeadingElement> | null>(null);
  const currentActiveIndexRef = useRef(0);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  // Configuration optimized for 6 TRD services (vs 10 items in reference)
  // NOTE: These values are interconnected - gap, speed, and arcRadius work together
  // Adjusted from reference (gap: 0.08, speed: 0.3) to account for fewer items
  const config = {
    gap: 0.12,        // Increased from 0.08 - larger gap for fewer items
    speed: 0.4,       // Slower reveal for more emphasis (was 0.3)
    arcRadius: 500,   // Maintained from reference
  };

  // Convert TRD services to spotlight items
  const spotlightItems: SpotlightItem[] = SERVICES.map((service) => ({
    name: service.title,
    img: service.visual,
    id: service.id,
  }));

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const initializeSpotlight = () => {
      const titlesContainer = titlesContainerRef.current;
      const imagesContainer = imagesContainerRef.current;
      const spotlightHeader = spotlightHeaderRef.current;
      const titlesContainerElement = titlesContainerElementRef.current;
      const introTextElements = introTextElementsRef.current;
      const imageElements = imageElementsRef.current;

      if (
        !titlesContainer ||
        !imagesContainer ||
        !spotlightHeader ||
        !titlesContainerElement
      ) {
        return false;
      }

      // Clear and rebuild DOM elements
      titlesContainer.innerHTML = "";
      imagesContainer.innerHTML = "";
      imageElements.length = 0;

      // Create title and image elements for each service
      spotlightItems.forEach((item, index) => {
        // Create title element
        const titleElement = document.createElement("h1");
        titleElement.textContent = item.name;
        if (index === 0) titleElement.style.opacity = "1";
        titlesContainer.appendChild(titleElement);

        // Create image wrapper
        const imgWrapper = document.createElement("div");
        imgWrapper.className = "spotlight-img";
        const imgElement = document.createElement("img");
        imgElement.src = item.img;
        imgElement.alt = item.name;
        imgWrapper.appendChild(imgElement);
        imagesContainer.appendChild(imgWrapper);
        imageElements.push(imgWrapper);
      });

      const titleElements = titlesContainer.querySelectorAll("h1");
      titleElementsRef.current = titleElements;

      if (titleElements.length === 0) {
        return false;
      }

      return true;
    };

    // Initialize with retry mechanism
    let initialized = initializeSpotlight();

    if (!initialized) {
      const initInterval = setInterval(() => {
        initialized = initializeSpotlight();
        if (initialized) {
          clearInterval(initInterval);
        }
      }, 10);

      setTimeout(() => {
        clearInterval(initInterval);
      }, 2000);
    }

    if (!initialized) {
      return;
    }

    const titlesContainer = titlesContainerRef.current;
    const imagesContainer = imagesContainerRef.current;
    const spotlightHeader = spotlightHeaderRef.current;
    const titlesContainerElement = titlesContainerElementRef.current;
    const introTextElements = introTextElementsRef.current;
    const imageElements = imageElementsRef.current;
    const titleElements = titleElementsRef.current;
    let currentActiveIndex = 0;

    // Bezier curve calculations for image movement (responsive)
    const isMobile = window.innerWidth < 1000;
    const containerWidth = isMobile ? window.innerWidth * 0.4 : window.innerWidth * 0.3;
    const containerHeight = window.innerHeight;
    const arcStartX = isMobile ? containerWidth - 50 : containerWidth - 220;
    const arcStartY = -200;
    const arcEndY = containerHeight + 200;
    const arcRadius = isMobile ? 200 : config.arcRadius;
    const arcControlPointX = arcStartX + arcRadius;
    const arcControlPointY = containerHeight / 2;

    /**
     * Calculate position along quadratic Bezier curve
     * Creates the smooth arc motion for service images
     */
    function getBezierPosition(t: number) {
      const x =
        (1 - t) * (1 - t) * arcStartX +
        2 * (1 - t) * t * arcControlPointX +
        t * t * arcStartX;
      const y =
        (1 - t) * (1 - t) * arcStartY +
        2 * (1 - t) * t * arcControlPointY +
        t * t * arcEndY;
      return { x, y };
    }

    /**
     * Calculate progress state for individual image
     * Returns -1 (before), 0-1 (animating), or 2 (after)
     */
    function getImgProgressState(index: number, overallProgress: number) {
      const startTime = index * config.gap;
      const endTime = startTime + config.speed;

      if (overallProgress < startTime) return -1;
      if (overallProgress > endTime) return 2;

      return (overallProgress - startTime) / config.speed;
    }

    // Set all images to invisible initially
    imageElements.forEach((img) => gsap.set(img, { opacity: 0 }));

    // Create ScrollTrigger - 6vh duration (reduced from 10vh for 6 services)
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: ".services-spotlight",
      start: "top top",
      end: `+=${window.innerHeight * 6}px`, // 6 viewports for 6 services
      pin: true,
      pinSpacing: true, // Enable spacing to prevent content skipping
      scrub: 1,
      refreshPriority: 9, // High priority after WhyChooseTRD
      onUpdate: (self) => {
        const progress = self.progress;

        // ==================== PHASE 1: Intro Text Split (0-20%) ====================
        if (progress <= 0.2) {
          const animationProgress = progress / 0.2;

          // Split intro text apart horizontally
          const moveDistance = window.innerWidth * 0.6;
          gsap.set(introTextElements[0], {
            x: -animationProgress * moveDistance,
          });
          gsap.set(introTextElements[1], {
            x: animationProgress * moveDistance,
          });
          gsap.set(introTextElements[0], { opacity: 1 });
          gsap.set(introTextElements[1], { opacity: 1 });

          // Scale background image
          gsap.set(".spotlight-bg-img", {
            transform: `scale(${animationProgress})`,
          });
          // Counter-scale inner image for zoom effect
          gsap.set(".spotlight-bg-img img", {
            transform: `scale(${1.5 - animationProgress * 0.5})`,
          });

          // Hide all other elements
          imageElements.forEach((img) => gsap.set(img, { opacity: 0 }));
          if (spotlightHeader) spotlightHeader.style.opacity = "0";
          gsap.set(titlesContainerElement, {
            "--before-opacity": "0",
            "--after-opacity": "0",
          });
        }
        // ==================== PHASE 2: Transition (20-25%) ====================
        else if (progress > 0.2 && progress <= 0.25) {
          // Finalize background scale
          gsap.set(".spotlight-bg-img", { transform: "scale(1)" });
          gsap.set(".spotlight-bg-img img", { transform: "scale(1)" });

          // Hide intro text
          gsap.set(introTextElements[0], { opacity: 0 });
          gsap.set(introTextElements[1], { opacity: 0 });

          // Show main UI elements
          imageElements.forEach((img) => gsap.set(img, { opacity: 0 }));
          if (spotlightHeader) spotlightHeader.style.opacity = "1";
          gsap.set(titlesContainerElement, {
            "--before-opacity": "1",
            "--after-opacity": "1",
          });
        }
        // ==================== PHASE 3: Main Animation (25-95%) ====================
        else if (progress > 0.25 && progress <= 0.95) {
          // Maintain background and intro text state
          gsap.set(".spotlight-bg-img", { transform: "scale(1)" });
          gsap.set(".spotlight-bg-img img", { transform: "scale(1)" });
          gsap.set(introTextElements[0], { opacity: 0 });
          gsap.set(introTextElements[1], { opacity: 0 });

          // Show header and decorative lines
          if (spotlightHeader) spotlightHeader.style.opacity = "1";
          gsap.set(titlesContainerElement, {
            "--before-opacity": "1",
            "--after-opacity": "1",
          });

          // Calculate scroll progress for main animation (0-1 range)
          const switchProgress = (progress - 0.25) / 0.7;

          // Animate titles scrolling vertically
          const viewportHeight = window.innerHeight;
          const titlesContainerHeight = titlesContainer.scrollHeight;
          const startPosition = viewportHeight;
          const targetPosition = -titlesContainerHeight;
          const totalDistance = startPosition - targetPosition;
          const currentY = startPosition - switchProgress * totalDistance;

          gsap.set(".spotlight-titles", {
            transform: `translateY(${currentY}px)`,
          });

          // Animate images along Bezier curve
          imageElements.forEach((img, index) => {
            const imageProgress = getImgProgressState(index, switchProgress);

            if (imageProgress < 0 || imageProgress > 1) {
              // Image not yet visible or already passed
              gsap.set(img, { opacity: 0 });
            } else {
              // Image is animating along curve
              const pos = getBezierPosition(imageProgress);
              gsap.set(img, {
                x: pos.x - 100,
                y: pos.y - 75,
                opacity: 1,
              });
            }
          });

          // Detect which title is closest to viewport center (active state)
          const viewportMiddle = viewportHeight / 2;
          let closestIndex = 0;
          let closestDistance = Infinity;

          titleElements.forEach((title, index) => {
            const titleRect = title.getBoundingClientRect();
            const titleCenter = titleRect.top + titleRect.height / 2;
            const distanceFromCenter = Math.abs(titleCenter - viewportMiddle);

            if (distanceFromCenter < closestDistance) {
              closestDistance = distanceFromCenter;
              closestIndex = index;
            }
          });

          // Update active title and background image
          if (closestIndex !== currentActiveIndex) {
            titleElements[currentActiveIndex].style.opacity = "0.35";
            titleElements[closestIndex].style.opacity = "1";

            // Change background image to match active service
            const bgImg = document.querySelector(".spotlight-bg-img img") as HTMLImageElement;
            if (bgImg) {
              bgImg.src = spotlightItems[closestIndex].img;
            }

            currentActiveIndex = closestIndex;
          }
        }
        // ==================== PHASE 4: Exit Fade (95-100%) ====================
        else if (progress > 0.95) {
          if (spotlightHeader) spotlightHeader.style.opacity = "0";
          gsap.set(titlesContainerElement, {
            "--before-opacity": "0",
            "--after-opacity": "0",
          });
        }
      },
    });

    // Cleanup function
    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
    };
  }, []);

  return (
    <section className="services-spotlight" ref={spotlightRef}>
      {/* Main container with intro and background */}
      <div className="spotlight-inner">
        {/* Intro text that splits apart (0-20% progress) */}
        <div className="spotlight-intro-text-wrapper">
          <div
            className="spotlight-intro-text"
            ref={(el) => (introTextElementsRef.current[0] = el)}
          >
            <p>Comprehensive</p>
          </div>
          <div
            className="spotlight-intro-text"
            ref={(el) => (introTextElementsRef.current[1] = el)}
          >
            <p>Solutions</p>
          </div>
        </div>

        {/* Background image with synchronized service changes */}
        <div className="spotlight-bg-img">
          <img src={SERVICES[0].visual} alt="" />
        </div>
      </div>

      {/* Scrolling titles with clip-path mask */}
      <div
        className="spotlight-titles-container"
        ref={titlesContainerElementRef}
      >
        <div className="spotlight-titles" ref={titlesContainerRef}></div>
      </div>

      {/* Images following Bezier curve */}
      <div className="spotlight-images" ref={imagesContainerRef}></div>

      {/* "Discover" header text */}
      <div className="spotlight-header" ref={spotlightHeaderRef}>
        <p>Our Services</p>
      </div>

      {/* TRD-branded outline border */}
      <div className="spotlight-outline"></div>
    </section>
  );
};

export default ServicesSpotlight;
