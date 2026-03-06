'use client';

import './BackedByStrengthStudio.css';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface BackedByStrengthStudioProps {
  /** Header subtitle / mission statement */
  headerSubtitle?: string;
  /** First mission paragraph */
  missionParagraph1?: string;
  /** Second mission paragraph */
  missionParagraph2?: string;
  /** Recognition paragraph */
  recognitionText?: string;
  /** Mission intro image path */
  missionImage?: string;
  /** Section title */
  title?: string;
  /** Recognition label text */
  recognitionLabel?: string;
  /** CTA link text */
  ctaText?: string;
}

const DEFAULT_HEADER_SUBTITLE =
  'At TRD, we approach every project with precision and discipline. Through proven methods and technical expertise, we deliver structural solutions that reflect both our clients\u2019 needs and our commitment to excellence.';

const DEFAULT_MISSION_P1 =
  'We are the remedial experts. TRD Remedial are the specialist contractors builders and developers across NSW trust when the scope is complex, the timeline is tight, and the margin for error is zero. Structural alterations, carbon fibre reinforcement, crack injection, waterproofing, concrete cutting \u2014 we deliver it all, on time and to standard.';

const DEFAULT_MISSION_P2 =
  'Our work spans occupied buildings, live construction sites, and Building Commissioner rectification orders. Whatever the challenge, we bring the expertise, the methodology, and the accountability to see it through. That\u2019s not a promise \u2014 it\u2019s how we operate.';

const DEFAULT_RECOGNITION =
  'Our work has been recognized by industry bodies and regulatory authorities for its safety, consistency, and attention to detail. We focus on building structural solutions that go beyond code compliance\u2014we engineer lasting performance.';

export function BackedByStrengthStudio({
  headerSubtitle,
  missionParagraph1,
  missionParagraph2,
  recognitionText,
  missionImage,
  title,
  recognitionLabel,
  ctaText,
}: BackedByStrengthStudioProps = {}) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Mission link scroll-triggered animation
    const missionLink = sectionRef.current.querySelector('.mission-link');

    if (missionLink) {
      gsap.set(missionLink, { y: 30, opacity: 0 });

      const missionCopy = missionLink.closest('.mission-intro-copy');

      ScrollTrigger.create({
        trigger: missionCopy,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          gsap.to(missionLink, {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 1.2,
            ease: 'power3.out',
          });
        },
      });
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="backed-by-strength-studio">
      {/* Company Header - Title + Mission Statement */}
      <section className="strength-header">
        <div className="strength-header-copy">
          <h1 className="strength-title">{title || 'Backed by Strength'}</h1>
          <h2>
            {headerSubtitle || DEFAULT_HEADER_SUBTITLE}
          </h2>
        </div>
      </section>

      {/* Mission Intro - Dark Inversion Section */}
      <section className="mission-intro">
        <div className="mission-intro-col-sm">
          <img
            src={missionImage || 'https://ik.imagekit.io/1fovck7sy4/trd-website/images/projects/florence-capri-complex/hero.jpg'}
            alt="TRD structural alterations project at One The Waterfront, Wentworth Point"
            className="mission-intro-image"
            loading="lazy"
          />
        </div>
        <div className="mission-intro-col-lg">
          <div className="mission-intro-copy">
            <h3>
              {missionParagraph1 || DEFAULT_MISSION_P1}
            </h3>
            <br />
            <h3>
              {missionParagraph2 || DEFAULT_MISSION_P2}
            </h3>

            <div className="mission-link">
              <a href="#case-studies" className="btn-link">
                <span>{ctaText || 'View Our Projects'}</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M4 10h12M10 4l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Recognition - Centered Credentials */}
      <section className="recognition">
        <div className="recognition-copy">
          <p className="sm caps">{recognitionLabel || '(Recognition)'}</p>
          <br />
          <h2>
            {recognitionText || DEFAULT_RECOGNITION}
          </h2>
        </div>
      </section>
    </section>
  );
}
