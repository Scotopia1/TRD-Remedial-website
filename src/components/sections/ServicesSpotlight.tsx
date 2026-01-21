"use client";
import "./ServicesSpotlight.css";

import { useEffect, useRef } from "react";
import Image from "next/image";

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

  // Configuration matching CGMWTAUG2025 reference
  // NOTE: These values are interconnected - gap, speed, and arcRadius work together
  const config = {
    gap: 0.08,        // Matches reference
    speed: 0.3,       // Matches reference
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

      // Clear and rebuild title elements only (images are React-rendered)
      titlesContainer.innerHTML = "";

      // Create title elements for each service
      spotlightItems.forEach((item, index) => {
        // Create title element
        const titleElement = document.createElement("h1");
        titleElement.textContent = item.name;
        if (index === 0) titleElement.style.opacity = "1";
        titleElement.style.cursor = "pointer";
        titleElement.onclick = () => {
          window.location.href = `/services/${SERVICES[index].slug}`;
        };
        titlesContainer.appendChild(titleElement);
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
    const containerWidth = isMobile ? window.innerWidth * 0.5 : window.innerWidth * 0.3;
    const containerHeight = window.innerHeight;
    // On mobile: push images further right to avoid text collision
    const arcStartX = isMobile ? containerWidth + 20 : containerWidth - 220;
    const arcStartY = -200;
    const arcEndY = containerHeight + 200;
    const arcRadius = isMobile ? 150 : config.arcRadius;
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

    // Create ScrollTrigger - dynamic duration based on service count
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: ".services-spotlight",
      start: "top top",
      end: `+=${window.innerHeight * spotlightItems.length}px`, // Dynamic based on service count
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
          if (spotlightHeader) {
            spotlightHeader.style.opacity = "1";
            // Reset to "Our Services" at start
            spotlightHeader.innerHTML = `<p>Our Services</p>`;
          }
          gsap.set(titlesContainerElement, {
            "--before-opacity": "1",
            "--after-opacity": "1",
          });

          // Reset active index for mobile header tracking
          currentActiveIndex = -1;
        }
        // ==================== PHASE 3: Main Animation (25-95%) ====================
        else if (progress > 0.25 && progress <= 0.95) {
          // Null check for required elements
          if (!titlesContainer || !titleElements) return;

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

          // Detect active service - use different methods for desktop vs mobile
          let closestIndex = 0;

          if (isMobile) {
            // On mobile: sync with bezier image timing
            // Find which image is currently most visible (closest to middle of its animation)
            let bestMatchScore = -1;

            imageElements.forEach((_, index) => {
              const imageProgress = getImgProgressState(index, switchProgress);
              // Only consider images that are currently animating (0 to 1)
              if (imageProgress >= 0 && imageProgress <= 1) {
                // Score based on how close to middle of animation (0.5 = peak visibility)
                const score = 1 - Math.abs(imageProgress - 0.5);
                if (score > bestMatchScore) {
                  bestMatchScore = score;
                  closestIndex = index;
                }
              }
            });

            // Fallback: if no image is animating, use the last visible one
            if (bestMatchScore === -1) {
              for (let i = imageElements.length - 1; i >= 0; i--) {
                if (getImgProgressState(i, switchProgress) > 1) {
                  closestIndex = i;
                  break;
                }
              }
            }
          } else {
            // On desktop: detect which title is closest to viewport center
            const viewportMiddle = viewportHeight / 2;
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
          }

          // Update active title and background image
          if (closestIndex !== currentActiveIndex) {
            // Only update title opacity on desktop (titles hidden on mobile)
            if (!isMobile && titleElements) {
              // Deselect previous title (if valid index)
              if (currentActiveIndex >= 0 && currentActiveIndex < titleElements.length) {
                titleElements[currentActiveIndex].style.opacity = "0.35";
              }
              // Select new title
              if (closestIndex >= 0 && closestIndex < titleElements.length) {
                titleElements[closestIndex].style.opacity = "1";
              }
            }

            // Change background image to match active service
            const bgImg = document.querySelector(".spotlight-bg-img img") as HTMLImageElement;
            if (bgImg && closestIndex >= 0 && closestIndex < spotlightItems.length) {
              bgImg.src = spotlightItems[closestIndex].img;
            }

            // On mobile: update header text to show service name
            if (isMobile && spotlightHeader && closestIndex >= 0) {
              const serviceName = spotlightItems[closestIndex].name;
              // Format: max 2 words per line
              const words = serviceName.split(" ");
              let formattedName = "";
              for (let i = 0; i < words.length; i += 2) {
                if (i > 0) formattedName += "<br>";
                formattedName += words.slice(i, i + 2).join(" ");
              }
              spotlightHeader.innerHTML = `<p>${formattedName}</p>`;
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
            ref={(el) => { introTextElementsRef.current[0] = el; }}
          >
            <p>Comprehensive</p>
          </div>
          <div
            className="spotlight-intro-text"
            ref={(el) => { introTextElementsRef.current[1] = el; }}
          >
            <p>Solutions</p>
          </div>
        </div>

        {/* Background image with synchronized service changes */}
        <div className="spotlight-bg-img">
          <Image
            src={SERVICES[0].visual}
            alt=""
            fill
            sizes="100vw"
            quality={85}
            priority={true}
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        </div>
      </div>

      {/* Scrolling titles with clip-path mask */}
      <div
        className="spotlight-titles-container"
        ref={titlesContainerElementRef}
      >
        <div className="spotlight-titles" ref={titlesContainerRef}></div>
      </div>

      {/* Images following Bezier curve - React-rendered */}
      <div className="spotlight-images" ref={imagesContainerRef}>
        {spotlightItems.map((item, index) => (
          <div
            key={item.id}
            className="spotlight-img"
            ref={(el) => {
              if (el) imageElementsRef.current[index] = el;
            }}
          >
            <Image
              src={item.img}
              alt={item.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={85}
              priority={index === 0}
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
          </div>
        ))}
      </div>

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
