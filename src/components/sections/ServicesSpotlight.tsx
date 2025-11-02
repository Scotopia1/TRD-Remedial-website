"use client";
import "./ServicesSpotlight.css";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES } from "@/data/services";

const ServicesSpotlight = () => {
  const spotlightRef = useRef(null);
  const titlesContainerRef = useRef<HTMLDivElement | null>(null);
  const imagesContainerRef = useRef<HTMLDivElement | null>(null);
  const spotlightHeaderRef = useRef<HTMLDivElement | null>(null);
  const titlesContainerElementRef = useRef<HTMLDivElement | null>(null);
  const introTextElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imageElementsRef = useRef<HTMLDivElement[]>([]);
  const titleElementsRef = useRef<NodeListOf<HTMLHeadingElement> | null>(null);
  const currentActiveIndexRef = useRef(0);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  // NOTE: These values are adjusted for 6 services instead of 10.
  // Gap and speed increased to account for fewer items while maintaining smooth transitions.
  const config = {
    gap: 0.12,
    speed: 0.4,
    arcRadius: 500,
  };

  // Map TRD services to spotlight format
  const spotlightItems = SERVICES.map((service) => ({
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

      titlesContainer.innerHTML = "";
      imagesContainer.innerHTML = "";
      imageElements.length = 0;

      spotlightItems.forEach((item, index) => {
        const titleElement = document.createElement("h1");
        titleElement.textContent = item.name;
        if (index === 0) titleElement.style.opacity = "1";
        titlesContainer.appendChild(titleElement);

        const imgWrapper = document.createElement("div");
        imgWrapper.className = "spotlight-img";
        const imgElement = document.createElement("img");
        imgElement.src = item.img;
        imgElement.alt = item.name;
        imgElement.loading = "lazy";
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

    const containerWidth = window.innerWidth * 0.3;
    const containerHeight = window.innerHeight;
    const arcStartX = containerWidth - 220;
    const arcStartY = -200;
    const arcEndY = containerHeight + 200;
    const arcControlPointX = arcStartX + config.arcRadius;
    const arcControlPointY = containerHeight / 2;

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

    function getImgProgressState(index: number, overallProgress: number) {
      const startTime = index * config.gap;
      const endTime = startTime + config.speed;

      if (overallProgress < startTime) return -1;
      if (overallProgress > endTime) return 2;

      return (overallProgress - startTime) / config.speed;
    }

    imageElements.forEach((img) => gsap.set(img, { opacity: 0 }));

    // Adjusted scroll distance for 6 services (6 viewport heights instead of 10)
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: ".services-spotlight",
      start: "top top",
      end: `+=${window.innerHeight * 6}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        if (progress <= 0.2) {
          // Phase 1: Intro animation - "Strength" and "Precision"
          const animationProgress = progress / 0.2;

          const moveDistance = window.innerWidth * 0.6;
          gsap.set(introTextElements[0], {
            x: -animationProgress * moveDistance,
          });
          gsap.set(introTextElements[1], {
            x: animationProgress * moveDistance,
          });
          gsap.set(introTextElements[0], { opacity: 1 });
          gsap.set(introTextElements[1], { opacity: 1 });

          gsap.set(".services-spotlight-bg-img", {
            transform: `scale(${animationProgress})`,
          });
          gsap.set(".services-spotlight-bg-img img", {
            transform: `scale(${1.5 - animationProgress * 0.5})`,
          });

          imageElements.forEach((img) => gsap.set(img, { opacity: 0 }));
          if (spotlightHeader) spotlightHeader.style.opacity = "0";
          gsap.set(titlesContainerElement, {
            "--before-opacity": "0",
            "--after-opacity": "0",
          });
        } else if (progress > 0.2 && progress <= 0.25) {
          // Phase 2: Transition
          gsap.set(".services-spotlight-bg-img", { transform: "scale(1)" });
          gsap.set(".services-spotlight-bg-img img", { transform: "scale(1)" });

          gsap.set(introTextElements[0], { opacity: 0 });
          gsap.set(introTextElements[1], { opacity: 0 });

          imageElements.forEach((img) => gsap.set(img, { opacity: 0 }));
          if (spotlightHeader) spotlightHeader.style.opacity = "1";
          gsap.set(titlesContainerElement, {
            "--before-opacity": "1",
            "--after-opacity": "1",
          });
        } else if (progress > 0.25 && progress <= 0.95) {
          // Phase 3: Main spotlight showcase
          gsap.set(".services-spotlight-bg-img", { transform: "scale(1)" });
          gsap.set(".services-spotlight-bg-img img", { transform: "scale(1)" });

          gsap.set(introTextElements[0], { opacity: 0 });
          gsap.set(introTextElements[1], { opacity: 0 });

          if (spotlightHeader) spotlightHeader.style.opacity = "1";
          gsap.set(titlesContainerElement, {
            "--before-opacity": "1",
            "--after-opacity": "1",
          });

          const switchProgress = (progress - 0.25) / 0.7;
          const viewportHeight = window.innerHeight;
          const titlesContainerHeight = titlesContainer!.scrollHeight;
          const startPosition = viewportHeight;
          const targetPosition = -titlesContainerHeight;
          const totalDistance = startPosition - targetPosition;
          const currentY = startPosition - switchProgress * totalDistance;

          gsap.set(".services-spotlight-titles", {
            transform: `translateY(${currentY}px)`,
          });

          imageElements.forEach((img, index) => {
            const imageProgress = getImgProgressState(index, switchProgress);

            if (imageProgress < 0 || imageProgress > 1) {
              gsap.set(img, { opacity: 0 });
            } else {
              const pos = getBezierPosition(imageProgress);
              gsap.set(img, {
                x: pos.x - 100,
                y: pos.y - 75,
                opacity: 1,
              });
            }
          });

          const viewportMiddle = viewportHeight / 2;
          let closestIndex = 0;
          let closestDistance = Infinity;

          titleElements!.forEach((title, index) => {
            const titleRect = title.getBoundingClientRect();
            const titleCenter = titleRect.top + titleRect.height / 2;
            const distanceFromCenter = Math.abs(titleCenter - viewportMiddle);

            if (distanceFromCenter < closestDistance) {
              closestDistance = distanceFromCenter;
              closestIndex = index;
            }
          });

          if (closestIndex !== currentActiveIndex) {
            titleElements![currentActiveIndex].style.opacity = "0.35";
            titleElements![closestIndex].style.opacity = "1";
            const bgImg = document.querySelector(
              ".services-spotlight-bg-img img"
            ) as HTMLImageElement;
            if (bgImg) {
              bgImg.src = spotlightItems[closestIndex].img;
            }
            currentActiveIndex = closestIndex;
          }
        } else if (progress > 0.95) {
          // Phase 4: Exit
          if (spotlightHeader) spotlightHeader.style.opacity = "0";
          gsap.set(titlesContainerElement, {
            "--before-opacity": "0",
            "--after-opacity": "0",
          });
        }
      },
    });

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
    };
  }, []);

  return (
    <section
      className="services-spotlight"
      ref={spotlightRef}
      aria-label="Services Showcase Gallery"
    >
      <div className="services-spotlight-inner">
        <div className="services-spotlight-intro-text-wrapper">
          <div
            className="services-spotlight-intro-text"
            ref={(el) => {
              introTextElementsRef.current[0] = el;
            }}
          >
            <p>Strength</p>
          </div>
          <div
            className="services-spotlight-intro-text"
            ref={(el) => {
              introTextElementsRef.current[1] = el;
            }}
          >
            <p>Precision</p>
          </div>
        </div>
        <div className="services-spotlight-bg-img">
          <img src={SERVICES[0].visual} alt="" />
        </div>
      </div>
      <div
        className="services-spotlight-titles-container"
        ref={titlesContainerElementRef}
      >
        <div
          className="services-spotlight-titles"
          ref={titlesContainerRef}
        ></div>
      </div>
      <div className="services-spotlight-images" ref={imagesContainerRef}></div>
      <div className="services-spotlight-header" ref={spotlightHeaderRef}>
        <p>Our Services</p>
      </div>
      <div className="services-spotlight-outline"></div>
    </section>
  );
};

export default ServicesSpotlight;
