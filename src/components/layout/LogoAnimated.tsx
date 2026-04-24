'use client';

import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { gsap } from 'gsap';

export interface LogoAnimatedHandle {
  playOpen: () => void;
  playClose: () => void;
}

const DEBRIS_VECS = [
  { dx: 28,  dy: -18, rot: -30 },
  { dx: 38,  dy: -5,  rot: 25  },
  { dx: 32,  dy: 16,  rot: -20 },
  { dx: -22, dy: -15, rot: 35  },
  { dx: -30, dy: 12,  rot: -15 },
  { dx: 22,  dy: 24,  rot: 40  },
];

const REMEDIAL_LETTERS = ['E', 'M', 'E', 'D', 'I', 'A', 'L'];
const REMEDIAL_X       = [190, 203, 219, 233, 247, 255, 270];

const LogoAnimated = forwardRef<LogoAnimatedHandle, { className?: string }>(
  ({ className }, ref) => {
    const svgRef       = useRef<SVGSVGElement>(null);
    const circTRef     = useRef<SVGCircleElement>(null);
    const circDRef     = useRef<SVGCircleElement>(null);
    const tLetterRef   = useRef<SVGPolygonElement>(null);
    const dLetterRef   = useRef<SVGPathElement>(null);
    const crackPathRef = useRef<SVGPathElement>(null);
    const crackGlowRef = useRef<SVGPathElement>(null);
    const flashRef     = useRef<SVGCircleElement>(null);
    const rLeftRef     = useRef<SVGPathElement>(null);
    const rRightRef    = useRef<SVGPathElement>(null);
    const debrisRefs   = useRef<(SVGRectElement | null)[]>([]);
    const remedialRefs = useRef<(SVGTextElement | null)[]>([]);

    useImperativeHandle(ref, () => ({
      playOpen() {
        const crack      = crackPathRef.current;
        const crackGlow  = crackGlowRef.current;
        const flash      = flashRef.current;
        const rLeft      = rLeftRef.current;
        const rRight     = rRightRef.current;
        const circT      = circTRef.current;
        const circD      = circDRef.current;
        const tLetter    = tLetterRef.current;
        const dLetter    = dLetterRef.current;
        const shards     = debrisRefs.current.filter(Boolean) as SVGRectElement[];
        const remLetters = remedialRefs.current.filter(Boolean) as SVGTextElement[];
        const svg        = svgRef.current;

        if (!crack || !flash || !rLeft || !rRight || !svg) return;

        gsap.killTweensOf([svg, crack, crackGlow, flash, rLeft, rRight,
          circT, circD, tLetter, dLetter, ...shards, ...remLetters]);

        const crackLen = crack.getTotalLength();
        gsap.set(crack,      { strokeDasharray: crackLen, strokeDashoffset: crackLen, opacity: 0 });
        gsap.set(crackGlow,  { strokeDasharray: crackLen, strokeDashoffset: crackLen, opacity: 0 });
        gsap.set(flash,      { opacity: 0, scale: 1 });
        gsap.set(rLeft,      { x: 0, opacity: 1 });
        gsap.set(rRight,     { x: 0, opacity: 1 });
        gsap.set(shards,     { x: 0, y: 0, rotation: 0, opacity: 0 });
        gsap.set(remLetters, { opacity: 0, x: -8 });
        gsap.set([circT, tLetter, circD, dLetter], { opacity: 1 });

        const tl = gsap.timeline();

        // 1. Shake buildup
        tl.to(svg, { rotation: -3, duration: 0.07, ease: 'sine.inOut', transformOrigin: '50% 50%' })
          .to(svg, { rotation:  3, duration: 0.07, ease: 'sine.inOut' })
          .to(svg, { rotation: -2, duration: 0.06, ease: 'sine.inOut' })
          .to(svg, { rotation:  1, duration: 0.06, ease: 'sine.inOut' })
          .to(svg, { rotation:  0, duration: 0.05, ease: 'sine.in'   });

        // 2. Draw crack
        tl.to([crack, crackGlow], {
          opacity: 1,
          strokeDashoffset: 0,
          duration: 0.25,
          ease: 'power3.out',
        });

        // 3. Flash
        tl.to(flash, {
          opacity: 0.9, scale: 1.3, duration: 0.12,
          ease: 'power2.out', svgOrigin: '151.425 47.23',
        }, '+=0.04');
        tl.to(flash, { opacity: 0, scale: 1.6, duration: 0.25, ease: 'power2.in' });

        // 4. T + D fade out (concurrent with flash out)
        tl.to([circT, tLetter], { opacity: 0, duration: 0.3, ease: 'power2.out' }, '<-0.1');
        tl.to([circD, dLetter], { opacity: 0, duration: 0.3, ease: 'power2.out' }, '<');

        // 5. R halves split
        tl.to(rLeft,  { x: -12, opacity: 0.55, duration: 0.4, ease: 'power3.out' }, '<');
        tl.to(rRight, { x:  12, opacity: 0.55, duration: 0.4, ease: 'power3.out' }, '<');

        // 5b. Debris scatter (concurrent)
        shards.forEach((shard, i) => {
          const v = DEBRIS_VECS[i];
          tl.fromTo(shard,
            { x: 0, y: 0, opacity: 1, rotation: 0 },
            { x: v.dx, y: v.dy, opacity: 0, rotation: v.rot, duration: 0.5, ease: 'power2.out' },
            '<',
          );
        });

        // 6. EMEDIAL type out
        remLetters.forEach((letter) => {
          tl.to(letter, { opacity: 1, x: 0, duration: 0.18, ease: 'power3.out' }, '>-0.08');
        });
      },

      playClose() {
        const crack      = crackPathRef.current;
        const crackGlow  = crackGlowRef.current;
        const rLeft      = rLeftRef.current;
        const rRight     = rRightRef.current;
        const circT      = circTRef.current;
        const circD      = circDRef.current;
        const tLetter    = tLetterRef.current;
        const dLetter    = dLetterRef.current;
        const shards     = debrisRefs.current.filter(Boolean) as SVGRectElement[];
        const remLetters = remedialRefs.current.filter(Boolean) as SVGTextElement[];
        const svg        = svgRef.current;

        if (!crack || !rLeft || !rRight) return;

        gsap.killTweensOf([svg, crack, crackGlow, rLeft, rRight,
          circT, circD, tLetter, dLetter, ...shards, ...remLetters]);

        gsap.set(shards, { opacity: 0 });

        const crackLen = crack.getTotalLength();
        const tl = gsap.timeline();

        // Reset any interrupted shake
        tl.to(svg, { rotation: 0, duration: 0.15, ease: 'power2.out', transformOrigin: '50% 50%' });

        // 1. EMEDIAL collapses
        tl.to(remLetters, { opacity: 0, x: -8, duration: 0.2, ease: 'power2.in', stagger: 0.02 }, '<');

        // 2. R halves reassemble
        tl.to([rLeft, rRight], { x: 0, opacity: 1, duration: 0.35, ease: 'power2.inOut' }, '-=0.05');

        // 3. Crack erases
        tl.to([crack, crackGlow], {
          strokeDashoffset: crackLen, opacity: 0, duration: 0.2, ease: 'power2.in',
        }, '-=0.1');

        // 4. T and D fade back in
        tl.to([circT, tLetter, circD, dLetter], { opacity: 1, duration: 0.35, ease: 'power2.out' }, '-=0.1');
      },
    }));

    return (
      <svg
        ref={svgRef}
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
          ref={circTRef}
          cx="43.562" cy="44.523" r="41.062"
          fill="none" stroke="#fff" strokeWidth="5" strokeMiterlimit="10"
        />

        {/* R circle — left half */}
        <path
          ref={rLeftRef}
          d="M151.425,6.408 a40.822,40.822 0 1,0 0,81.644"
          fill="none" stroke="#fff" strokeWidth="5" strokeMiterlimit="10"
          clipPath="url(#lgRLeft)"
        />

        {/* R circle — right half */}
        <path
          ref={rRightRef}
          d="M151.425,6.408 a40.822,40.822 0 1,1 0,81.644"
          fill="none" stroke="#fff" strokeWidth="5" strokeMiterlimit="10"
          clipPath="url(#lgRRight)"
        />

        {/* D circle */}
        <circle
          ref={circDRef}
          cx="255.989" cy="44.678" r="40.522"
          fill="none" stroke="#fff" strokeWidth="5" strokeMiterlimit="10"
        />

        {/* Crack through R */}
        <path
          ref={crackPathRef}
          d="M153,6 L151,18 L155,30 L149,40 L154,50 L150,60 L153,70 L151,82 L150,88"
          fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2"
          strokeLinecap="round" opacity="0"
        />
        <path
          ref={crackGlowRef}
          d="M153,6 L151,18 L155,30 L149,40 L154,50 L150,60 L153,70 L151,82 L150,88"
          fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8"
          strokeLinecap="round" opacity="0" filter="url(#lgGlow)"
        />

        {/* Flash ring */}
        <circle
          ref={flashRef}
          cx="151.425" cy="47.23" r="41"
          fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="3"
          opacity="0" filter="url(#lgGlow)"
        />

        {/* Debris shards — scatter from R center */}
        {DEBRIS_VECS.map((_, i) => (
          <rect
            key={i}
            ref={(el) => { debrisRefs.current[i] = el; }}
            x={148 + (i % 3) * 3}
            y={38 + Math.floor(i / 3) * 8}
            width={i % 2 === 0 ? 3 : 2.5}
            height={i % 2 === 0 ? 2.5 : 3}
            rx="0.5"
            fill="rgba(255,255,255,0.85)"
            opacity="0"
          />
        ))}

        {/* EMEDIAL — completes "REMEDIAL" from the R */}
        {REMEDIAL_LETTERS.map((letter, i) => (
          <text
            key={i}
            ref={(el) => { remedialRefs.current[i] = el; }}
            x={REMEDIAL_X[i]}
            y="52"
            fontFamily="Manrope, system-ui, sans-serif"
            fontSize="22"
            fontWeight="800"
            fill="#fff"
            opacity="0"
            dy="0.35em"
          >
            {letter}
          </text>
        ))}

        {/* T letter */}
        <polygon
          ref={tLetterRef}
          points="38.642 30.671 38.885 72.192 48.721 72.192 48.721 30.671 63.361 30.671 63.362 22.269 23.762 22.272 23.762 30.67 38.642 30.671"
          fill="#fff" stroke="#fff" strokeMiterlimit="10"
        />

        {/* R letter */}
        <path
          d="M132.261,21.035h26.056s14.178-.609,14.539,13.504c.35,13.718-13.317,14.551-13.317,14.551,5.722.722,17.111,21.968,17.111,21.968h-12.226c-12.125-22.262-16.852-20.854-16.852-20.854l-5.634-.222-.241,20.884-9.835-.005.399-49.826ZM142.017,29.168v12.889h14.815s6.259-.815,5.815-6.815-5.704-6.074-5.704-6.074h-14.926Z"
          fill="#fff" stroke="#fff" strokeMiterlimit="10"
        />

        {/* D letter */}
        <path
          ref={dLetterRef}
          d="M261.381,19.597s19.556-.519,19.778,24.926-18.444,24.926-18.444,24.926h-23.556l.296-49.852h21.926ZM249.381,27.967v33.407h11.407s10,.426,10-16.193c0-17.275-10.67-17.215-10.67-17.215h-10.738Z"
          fill="#fff" stroke="#fff" strokeMiterlimit="10"
        />
      </svg>
    );
  }
);

LogoAnimated.displayName = 'LogoAnimated';
export default LogoAnimated;
