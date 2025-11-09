'use client';

import React, { useEffect, useRef, useState } from 'react';
import './Menu.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { useStore } from '@/stores/useStore';

export function Menu() {
  const menuLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/projects', label: 'Projects' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const pathname = usePathname();
  const menuContainer = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuAnimation = useRef<GSAPTimeline | null>(null);
  const menuLinksAnimation = useRef<GSAPTimeline | null>(null);

  const lastScrollY = useRef(0);
  const menuBarRef = useRef<HTMLDivElement>(null);
  const { isLoading } = useStore();

  const [windowWidth, setWindowWidth] = useState(0);
  const [shouldDelayClose, setShouldDelayClose] = useState(false);
  const previousPathRef = useRef(pathname);
  const scrollPositionRef = useRef(0);
  const [isOnLightBackground, setIsOnLightBackground] = useState(false);
  const [showMenuHint, setShowMenuHint] = useState(false);

  // Initialize window width on client
  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  // Show menu hint for 3 seconds AFTER loading completes
  useEffect(() => {
    if (!isLoading) {
      // Start hint animation after loading is done
      setShowMenuHint(true);

      const timer = setTimeout(() => {
        setShowMenuHint(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const toggleBodyScroll = (disableScroll: boolean) => {
    if (disableScroll) {
      // Save current scroll position
      scrollPositionRef.current = window.pageYOffset;

      // Prevent scroll without position: fixed (avoids visual jump)
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
    } else {
      // Restore scroll
      document.documentElement.style.removeProperty('overflow');
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('padding-right');

      // No need to restore scroll position - user stays where they were
    }
  };

  const toggleMenu = () => {
    const logoButton = document.querySelector('.logo-menu-button');
    if (logoButton) {
      logoButton.classList.toggle('active');
    }
    const newMenuState = !isMenuOpen;
    setIsMenuOpen(newMenuState);
    toggleBodyScroll(newMenuState);
  };

  const closeMenu = () => {
    if (isMenuOpen) {
      const logoButton = document.querySelector('.logo-menu-button');
      if (logoButton) {
        logoButton.classList.remove('active');
      }
      setIsMenuOpen(false);
      toggleBodyScroll(false);
    }
  };

  const handleLinkClick = (path: string) => {
    if (path !== pathname) {
      setShouldDelayClose(true);
    }
  };

  useEffect(() => {
    if (pathname !== previousPathRef.current && shouldDelayClose) {
      const timer = setTimeout(() => {
        closeMenu();
        setShouldDelayClose(false);
      }, 700);

      previousPathRef.current = pathname;
      return () => clearTimeout(timer);
    }

    previousPathRef.current = pathname;
  }, [pathname, shouldDelayClose]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    gsap.set('.menu-link-item-holder', { y: 125 });

    menuAnimation.current = gsap.timeline({ paused: true }).to('.menu', {
      duration: 1,
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      ease: 'power4.inOut',
    });

    menuLinksAnimation.current = gsap
      .timeline({ paused: true })
      .to('.menu-link-item-holder', {
        y: 0,
        duration: 1.25,
        stagger: 0.075,
        ease: 'power3.inOut',
        delay: 0.125,
      });
  }, [windowWidth]);

  useEffect(() => {
    if (isMenuOpen) {
      menuAnimation.current?.play();
      menuLinksAnimation.current?.play();
    } else {
      menuAnimation.current?.reverse();
      menuLinksAnimation.current?.reverse();
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) return;

      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current) {
        gsap.to('.menu-bar', {
          y: -200,
          duration: 1,
          ease: 'power2.out',
        });
      } else {
        gsap.to('.menu-bar', {
          y: 0,
          duration: 1,
          ease: 'power2.out',
        });
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    return () => {
      // Cleanup: restore scroll if component unmounts with menu open
      if (document.body.style.overflow === 'hidden') {
        toggleBodyScroll(false);
      }
    };
  }, []);

  // Detect section background color and adapt logo
  useEffect(() => {
    // Sections with light/white backgrounds
    const lightSections = [
      '.feedback-scroll-section', // CustomerFeedback
      '.cs-header', // CaseStudies header
      '.cs-work-items', // CaseStudies items
      '.backed-by-strength-studio', // BackedByStrengthStudio (if white)
    ];

    const observerOptions = {
      threshold: [0, 0.5, 1],
      rootMargin: '-80px 0px 0px 0px', // Account for menu bar height
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          // Check if this section is a light section
          const isLight = lightSections.some((selector) =>
            entry.target.matches(selector)
          );
          setIsOnLightBackground(isLight);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all major sections
    const sections = document.querySelectorAll(
      'section, .feedback-scroll-section, .cs-header, .cs-work-items'
    );
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="menu-container"
      ref={menuContainer}
      style={{ display: isLoading ? 'none' : 'block' }}
    >
      <div className="menu-bar" ref={menuBarRef}>
        <div className="menu-bar-container">
          <div className="menu-actions">
            <div className="menu-toggle">
              <button
                className={`logo-menu-button ${showMenuHint ? 'menu-hint' : ''}`}
                onClick={toggleMenu}
              >
                <img
                  src="/trd-logo.svg"
                  alt="TRD Menu"
                  className="logo-icon"
                  style={{
                    filter: isOnLightBackground ? 'invert(1) brightness(0)' : 'none',
                    transition: 'filter 0.5s ease',
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={`menu ${isMenuOpen ? 'menu-open' : ''}`}>
        <div className="menu-col">
          <div className="menu-sub-col">
            <div className="menu-links">
              {menuLinks.map((link, index) => (
                <div key={index} className="menu-link-item">
                  <div className="menu-link-item-holder">
                    <Link
                      className="menu-link"
                      href={link.path}
                      onClick={() => handleLinkClick(link.path)}
                    >
                      {link.label}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
