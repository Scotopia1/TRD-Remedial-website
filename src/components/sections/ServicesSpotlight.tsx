"use client";
import "./ServicesSpotlight.css";

import { useEffect, useRef, useState } from "react";
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

  // State for background image
  const [activeBgImage, setActiveBgImage] = useState(SERVICES[0].visual);

  // CGMWTAUG2025 pattern: Mobile detection for conditional ScrollTrigger
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  // Check mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileDevice(window.innerWidth <= 1000);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Configuration for synchronized title and image timing
  // Adjusted for perfect alignment when title reaches "OUR SERVICES" position
  const config = {
    gap: 0.12,        // Increased gap for better spacing between service reveals
    speed: 0.4,       // Longer duration for smoother image transitions
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

    // CGMWTAUG2025 pattern: Only create complex ScrollTrigger on desktop
    // Mobile gets simpler, non-pinned experience
    if (!isMobileDevice) {
      // Create ScrollTrigger - dynamic duration based on service count
      scrollTriggerRef.current = ScrollTrigger.create({
      trigger: ".services-spotlight",
      start: "top top",
      end: `+=${window.innerHeight * spotlightItems.length * 1.5}px`, // Increased for better timing sync
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

          // Detect active service - based on title alignment with "OUR SERVICES" label
          let closestIndex = currentActiveIndex;

          if (!isMobile && titleElements) {
            // Desktop: Find title that aligns with "OUR SERVICES" (50% viewport height)
            const alignmentPoint = viewportHeight * 0.5; // Center of viewport where "OUR SERVICES" is
            let closestDistance = Infinity;

            titleElements.forEach((title, index) => {
              const titleRect = title.getBoundingClientRect();
              const titleCenter = titleRect.top + titleRect.height / 2;
              const distanceFromAlignment = Math.abs(titleCenter - alignmentPoint);

              // Find the closest title to the alignment point
              if (distanceFromAlignment < closestDistance) {
                closestDistance = distanceFromAlignment;
                closestIndex = index;
              }
            });

            // Sync floating images to match the selected title
            // When title is aligned, its corresponding image should be at peak visibility
            imageElements.forEach((_, index) => {
              const imageProgress = getImgProgressState(index, switchProgress);

              if (index === closestIndex) {
                // Active service image should be visible and prominent
                // Adjust timing so image peaks when title aligns
                if (imageProgress >= 0.3 && imageProgress <= 0.7) {
                  // Image is at good visibility - keep this selection
                } else if (imageProgress < 0.3 || imageProgress > 0.7) {
                  // Image timing is off - might need to adjust scroll position
                  // but keep the selection based on title alignment
                }
              }
            });
          } else if (isMobile) {
            // Mobile: sync with bezier image timing
            let bestMatchScore = -1;

            imageElements.forEach((_, index) => {
              const imageProgress = getImgProgressState(index, switchProgress);

              if (imageProgress >= 0 && imageProgress <= 1) {
                const score = 1 - Math.abs(imageProgress - 0.5);
                if (score > bestMatchScore) {
                  bestMatchScore = score;
                  closestIndex = index;
                }
              }
            });
          }

          // Update title opacity continuously on desktop (titles hidden on mobile)
          if (!isMobile && titleElements) {
            // Update all titles based on their distance from alignment point
            const alignmentPoint = viewportHeight * 0.5;

            titleElements.forEach((title, index) => {
              const titleRect = title.getBoundingClientRect();
              const titleCenter = titleRect.top + titleRect.height / 2;
              const distance = Math.abs(titleCenter - alignmentPoint);
              const maxDistance = viewportHeight * 0.3; // 30% of viewport

              if (index === closestIndex && distance < maxDistance * 0.5) {
                // Active title - fully opaque when well-aligned
                title.style.opacity = "1";
              } else if (index === closestIndex) {
                // Active but not perfectly aligned
                title.style.opacity = "0.8";
              } else if (distance < maxDistance) {
                // Nearby inactive titles - partially visible
                const proximityOpacity = 0.35 + (0.25 * (1 - distance / maxDistance));
                title.style.opacity = proximityOpacity.toString();
              } else {
                // Far away titles - dim
                title.style.opacity = "0.2";
              }
            });
          }

          // Change background image when active service changes
          if (closestIndex !== currentActiveIndex) {
            if (closestIndex >= 0 && closestIndex < spotlightItems.length) {
              setActiveBgImage(spotlightItems[closestIndex].img);
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
    } // End desktop-only ScrollTrigger

    // Cleanup function
    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
    };
  }, [isMobileDevice]); // Re-run when mobile state changes

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
            src={activeBgImage}
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
