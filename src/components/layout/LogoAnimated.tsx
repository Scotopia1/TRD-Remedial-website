'use client';

import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { gsap } from 'gsap';

export interface LogoAnimatedHandle {
  playOpen: () => void;
  playClose: () => void;
}

const LogoAnimated = forwardRef<LogoAnimatedHandle, { className?: string }>(
  ({ className }, ref) => {
    const crackPathRef = useRef<SVGPathElement>(null);
    const crackGlowRef = useRef<SVGPathElement>(null);
    const flashRef = useRef<SVGCircleElement>(null);
    const rLeftRef = useRef<SVGPathElement>(null);
    const rRightRef = useRef<SVGPathElement>(null);

    useImperativeHandle(ref, () => ({
      playOpen() {
        const crack = crackPathRef.current;
        const crackGlow = crackGlowRef.current;
        const flash = flashRef.current;
        const rLeft = rLeftRef.current;
        const rRight = rRightRef.current;
        if (!crack || !flash || !rLeft || !rRight) return;

        gsap.killTweensOf([rLeft, rRight, crack, crackGlow, flash]);

        const crackLen = crack.getTotalLength();
        gsap.set(crack, { strokeDasharray: crackLen, strokeDashoffset: crackLen });
        gsap.set(crackGlow, { strokeDasharray: crackLen, strokeDashoffset: crackLen });

        const tl = gsap.timeline();

        // Draw crack on R
        tl.to([crack, crackGlow], {
          opacity: 1,
          strokeDashoffset: 0,
          duration: 0.25,
          ease: 'power3.out',
        });

        // Flash
        tl.to(flash, { opacity: 0.9, scale: 1.3, duration: 0.12, ease: 'power2.out', transformOrigin: '151.425px 47.23px' }, '+=0.05');
        tl.to(flash, { opacity: 0, scale: 1.6, duration: 0.25, ease: 'power2.in' });

        // Halves split apart
        tl.to(rLeft, { x: -12, opacity: 0.6, duration: 0.4, ease: 'power3.out' }, '-=0.1');
        tl.to(rRight, { x: 12, opacity: 0.6, duration: 0.4, ease: 'power3.out' }, '<');
      },

      playClose() {
        const crack = crackPathRef.current;
        const crackGlow = crackGlowRef.current;
        const rLeft = rLeftRef.current;
        const rRight = rRightRef.current;
        if (!crack || !rLeft || !rRight) return;

        gsap.killTweensOf([rLeft, rRight, crack, crackGlow]);

        const crackLen = crack.getTotalLength();
        const tl = gsap.timeline();

        // Halves reassemble
        tl.to([rLeft, rRight], { x: 0, opacity: 1, duration: 0.35, ease: 'power2.inOut' });

        // Erase crack
        tl.to([crack, crackGlow], {
          strokeDashoffset: crackLen,
          opacity: 0,
          duration: 0.2,
          ease: 'power2.in',
        }, '-=0.1');
      },
    }));

    return (
      <svg
        viewBox="0 0 299.011 90.553"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="TRD"
        className={className}
        style={{ overflow: 'visible' }}
      >
        <defs>
          <filter id="lgGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feComposite in="SourceGraphic" in2="b" operator="over" />
          </filter>

          <clipPath id="lgRLeft">
            <rect x="0" y="0" width="151.425" height="90.553" />
          </clipPath>

          <clipPath id="lgRRight">
            <rect x="151.425" y="0" width="147.586" height="90.553" />
          </clipPath>
        </defs>

        {/* T circle */}
        <circle
          cx="43.562" cy="44.523" r="41.062"
          fill="none"
          stroke="#fff"
          strokeWidth="5"
          strokeMiterlimit="10"
        />

        {/* R circle — left half */}
        <path
          ref={rLeftRef}
          d="M151.425,6.408 a40.822,40.822 0 1,0 0,81.644"
          fill="none"
          stroke="#fff"
          strokeWidth="5"
          strokeMiterlimit="10"
          clipPath="url(#lgRLeft)"
        />

        {/* R circle — right half */}
        <path
          ref={rRightRef}
          d="M151.425,6.408 a40.822,40.822 0 1,1 0,81.644"
          fill="none"
          stroke="#fff"
          strokeWidth="5"
          strokeMiterlimit="10"
          clipPath="url(#lgRRight)"
        />

        {/* D circle */}
        <circle
          cx="255.989" cy="44.678" r="40.522"
          fill="none"
          stroke="#fff"
          strokeWidth="5"
          strokeMiterlimit="10"
        />

        {/* Crack through R (hidden by default) */}
        <path
          ref={crackPathRef}
          d="M153,6 L151,18 L155,30 L149,40 L154,50 L150,60 L153,70 L151,82 L150,88"
          fill="none"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0"
        />
        <path
          ref={crackGlowRef}
          d="M153,6 L151,18 L155,30 L149,40 L154,50 L150,60 L153,70 L151,82 L150,88"
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="0.8"
          strokeLinecap="round"
          opacity="0"
          filter="url(#lgGlow)"
        />

        {/* Flash ring on R */}
        <circle
          ref={flashRef}
          cx="151.425" cy="47.23" r="41"
          fill="none"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="3"
          opacity="0"
          filter="url(#lgGlow)"
        />

        {/* T letter */}
        <polygon
          points="38.642 30.671 38.885 72.192 48.721 72.192 48.721 30.671 63.361 30.671 63.362 22.269 23.762 22.272 23.762 30.67 38.642 30.671"
          fill="#fff"
          stroke="#fff"
          strokeMiterlimit="10"
        />

        {/* R letter */}
        <path
          d="M132.261,21.035h26.056s14.178-.609,14.539,13.504c.35,13.718-13.317,14.551-13.317,14.551,5.722.722,17.111,21.968,17.111,21.968h-12.226c-12.125-22.262-16.852-20.854-16.852-20.854l-5.634-.222-.241,20.884-9.835-.005.399-49.826ZM142.017,29.168v12.889h14.815s6.259-.815,5.815-6.815-5.704-6.074-5.704-6.074h-14.926Z"
          fill="#fff"
          stroke="#fff"
          strokeMiterlimit="10"
        />

        {/* D letter */}
        <path
          d="M261.381,19.597s19.556-.519,19.778,24.926-18.444,24.926-18.444,24.926h-23.556l.296-49.852h21.926ZM249.381,27.967v33.407h11.407s10,.426,10-16.193c0-17.275-10.67-17.215-10.67-17.215h-10.738Z"
          fill="#fff"
          stroke="#fff"
          strokeMiterlimit="10"
        />
      </svg>
    );
  }
);

LogoAnimated.displayName = 'LogoAnimated';
export default LogoAnimated;
