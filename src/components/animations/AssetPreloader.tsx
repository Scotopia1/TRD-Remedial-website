'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import './AssetPreloader.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(CustomEase);
  CustomEase.create('hop', '0.9, 0, 0.1, 1');
}

interface AssetPreloaderProps {
  onComplete: () => void;
}

// TRD Services Data
const servicesData = [
  { name: 'Carbon Fibre', category: 'Reinforcement' },
  { name: 'Concrete Cutting', category: 'Precision Work' },
  { name: 'Crack Injection', category: 'Repair Solutions' },
  { name: 'GPR Scanning', category: 'Non-Destructive' },
  { name: 'Line Marking', category: 'Safety Standards' },
  { name: 'Safety Fixtures', category: 'Fall Protection' },
  { name: 'Structural Repair', category: 'Remediation' },
  { name: 'Emergency Response', category: '24/7 Available' },
];

// TRD Project Images
const projectImages = [
  'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
  '/images/team/christopher-nassif.png',
  '/images/team/charly-nassif.png',
];

export function AssetPreloader({ onComplete }: AssetPreloaderProps) {
  const [isAnimating, setIsAnimating] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);
  const imageGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem('trd-preloader-seen');

    if (hasVisited === 'true') {
      setIsAnimating(false);
      onComplete();
      return;
    }

    // Initialize GSAP animations
    const initAnimations = () => {
      const overlayTimeline = gsap.timeline();
      const imagesTimeline = gsap.timeline();

      // Logo text reveal with gradient
      overlayTimeline.to('.logo-line-1', {
        backgroundPosition: '0% 0%',
        color: '#f5f5f5',
        duration: 1,
        ease: 'none',
        delay: 0.5,
        onComplete: () => {
          gsap.to('.logo-line-2', {
            backgroundPosition: '0% 0%',
            color: '#f5f5f5',
            duration: 1,
            ease: 'none',
          });
        },
      });

      // Services appear
      overlayTimeline.to(['.services-header', '.service-item'], {
        opacity: 1,
        duration: 0.05,
        stagger: 0.075,
        delay: 1,
      });

      // Categories appear
      overlayTimeline.to(
        ['.categories-header', '.category-item'],
        {
          opacity: 1,
          duration: 0.05,
          stagger: 0.075,
        },
        '<'
      );

      // Text color change
      overlayTimeline.to('.service-item', {
        color: '#f5f5f5',
        duration: 0.15,
        stagger: 0.075,
      });

      overlayTimeline.to(
        '.category-item',
        {
          color: '#f5f5f5',
          duration: 0.15,
          stagger: 0.075,
        },
        '<'
      );

      // Fade out services and categories
      overlayTimeline.to(['.services-header', '.service-item'], {
        opacity: 0,
        duration: 0.05,
        stagger: 0.075,
      });

      overlayTimeline.to(
        ['.categories-header', '.category-item'],
        {
          opacity: 0,
          duration: 0.05,
          stagger: 0.075,
        },
        '<'
      );

      // Fade out overlay
      overlayTimeline.to('.preloader-overlay', {
        opacity: 0,
        duration: 0.5,
        delay: 1.5,
      });

      // Reveal images
      imagesTimeline.to('.grid-img', {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 1,
        delay: 2.5,
        stagger: 0.05,
        ease: 'hop',
        onStart: () => {
          setTimeout(() => {
            gsap.to('.preloader-loader', { opacity: 0, duration: 0.3 });
          }, 1000);
        },
      });

      // Hide images and complete
      imagesTimeline.to('.grid-img', {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        duration: 1,
        delay: 2.5,
        stagger: 0.05,
        ease: 'hop',
        onComplete: () => {
          localStorage.setItem('trd-preloader-seen', 'true');
          setTimeout(() => {
            setIsAnimating(false);
            onComplete();
          }, 500);
        },
      });
    };

    initAnimations();
  }, [onComplete]);

  if (!isAnimating) {
    return null;
  }

  return (
    <>
      {/* Overlay with services and categories */}
      <div ref={overlayRef} className="preloader-overlay">
        <div className="preloader-services">
          <div className="services-header">
            <p>Service</p>
            <p>Category</p>
          </div>
          {servicesData.map((service, index) => (
            <div key={index} className="service-item">
              <p>{service.name}</p>
              <p>{service.category}</p>
            </div>
          ))}
        </div>

        <div className="preloader-loader">
          <span className="logo-line-1" data-animate="logo">TRD</span>
          <span className="logo-line-2" data-animate="logo">Remedial</span>
        </div>

        <div className="preloader-categories">
          <div className="categories-header">
            <p>Expertise</p>
          </div>
          {servicesData.map((service, index) => (
            <div key={index} className="category-item">
              <p>{service.category}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Image Grid */}
      <div ref={imageGridRef} className="preloader-image-grid">
        <div className="preloader-grid-row">
          {projectImages.slice(0, 3).map((img, index) => (
            <div key={index} className="grid-img">
              <OptimizedImage
                src={img}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                quality={75}
                priority={true}
                style={{ objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
        <div className="preloader-grid-row">
          {projectImages.slice(3, 6).map((img, index) => (
            <div key={index} className="grid-img">
              <OptimizedImage
                src={img}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                quality={75}
                priority={true}
                style={{ objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
        <div className="preloader-grid-row">
          {projectImages.slice(6, 9).map((img, index) => (
            <div key={index} className="grid-img">
              <OptimizedImage
                src={img}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                quality={75}
                priority={true}
                style={{ objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
