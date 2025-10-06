'use client';

import './CustomerFeedback.css';

import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(SplitText, ScrollTrigger);

// Customer feedback data - TRD construction/engineering testimonials
const customerFeedback = [
  {
    id: 1,
    copy: "TRD's carbon fibre reinforcement solution saved our heritage bridge from demolition. Their technical precision and minimal disruption approach exceeded all expectations.",
    author: "David Martinez, Infrastructure Director",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    copy: "The GPR scanning work revealed critical structural issues we never knew existed. TRD's detailed reporting and proactive solutions prevented what could have been a catastrophic failure.",
    author: "Sarah Chen, Facility Manager",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    copy: "Professional, methodical, and completely reliable. TRD handled our multi-level car park crack injection with zero downtime to our operations. Exceptional project management.",
    author: "Michael Thompson, Property Operations",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
  },
];

export function CustomerFeedback() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeReview, setActiveReview] = useState(0);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Customer feedback SplitText animations
    const reviewCopy = sectionRef.current.querySelectorAll('.customer-review-copy');

    reviewCopy.forEach((copy) => {
      const split = new SplitText(copy, {
        type: 'lines',
        linesClass: 'line++',
      });

      gsap.set(split.lines, { opacity: 0, y: 20 });

      ScrollTrigger.create({
        trigger: copy,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          gsap.to(split.lines, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
          });
        },
      });
    });
  }, { scope: sectionRef, dependencies: [activeReview] });

  return (
    <section ref={sectionRef} className="customer-feedback">
      <div id="customer-feedback-copy">
        {customerFeedback.map((review, index) => (
          <div
            key={review.id}
            className={`customer-review-item ${index === activeReview ? 'active' : ''}`}
            style={{ opacity: index === activeReview ? 1 : 0 }}
          >
            <div className="quote-icon">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <path
                  d="M15 35V25C15 18.3726 20.3726 13 27 13H28V18H27C23.134 18 20 21.134 20 25V26H25V35H15ZM37 35V25C37 18.3726 42.3726 13 49 13H50V18H49C45.134 18 42 21.134 42 25V26H47V35H37Z"
                  fill="var(--trd-accent)"
                />
              </svg>
            </div>
            <p className="customer-review-copy">{review.copy}</p>
            <p className="customer-review-author">— {review.author}</p>
          </div>
        ))}
      </div>

      {/* Thumbnail Navigation */}
      <div className="customer-feedback-list">
        {customerFeedback.map((review, index) => (
          <div
            key={review.id}
            className={`customer-feedback-thumbnail ${index === activeReview ? 'active' : ''}`}
            onClick={() => setActiveReview(index)}
          >
            <img src={review.image} alt={`Customer ${index + 1}`} />
          </div>
        ))}
      </div>
    </section>
  );
}
