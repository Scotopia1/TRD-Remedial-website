'use client';

import './BackedByStrengthStudio.css';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export function BackedByStrengthStudio() {
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
          <h1 className="strength-title">Backed by Strength</h1>
          <h2>
            At TRD, we approach every project with precision and discipline.
            Through proven methods and technical expertise, we deliver
            structural solutions that reflect both our clients' needs and our
            commitment to excellence.
          </h2>
        </div>
      </section>

      {/* Mission Intro - Dark Inversion Section */}
      <section className="mission-intro">
        <div className="mission-intro-col-sm">
          <img
            src="/images/projects/northbridge-structural-wall/gallery-05.jpg"
            alt="TRD structural wall reinforcement project at Northbridge"
            className="mission-intro-image"
            loading="lazy"
          />
        </div>
        <div className="mission-intro-col-lg">
          <div className="mission-intro-copy">
            <h3>
              We are a structural engineering company dedicated to creating safe
              and lasting solutions. Our work is rooted in technical precision,
              guided by building standards, and shaped through close
              collaboration with clients and industry partners.
            </h3>
            <br />
            <h3>
              With a focus on carbon fibre reinforcement, concrete cutting, and
              ground-penetrating radar, we build scalable solutions that reflect
              quiet precision and long-term value. Every project is an exercise
              in restraint, intention, and technical care.
            </h3>

            <div className="mission-link">
              <a href="#case-studies" className="btn-link">
                <span>View Our Projects</span>
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
          <p className="sm caps">(Recognition)</p>
          <br />
          <h2>
            Our work has been recognized by industry bodies and regulatory
            authorities for its safety, consistency, and attention to detail. We
            focus on building structural solutions that go beyond code
            compliance—we engineer lasting performance.
          </h2>
        </div>
      </section>
    </section>
  );
}
