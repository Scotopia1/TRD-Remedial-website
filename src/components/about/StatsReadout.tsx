'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
}

interface DataStreamLine {
  key: string;
  value: string;
}

interface StatsReadoutProps {
  stats: StatItem[];
  dataStream: DataStreamLine[];
}

function formatStatValue(val: number): string {
  if (val >= 1000) return val.toLocaleString();
  if (val === 0) return '000';
  return String(val).padStart(3, '0');
}

export function StatsReadout({ stats, dataStream }: StatsReadoutProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      const valueEls = sectionRef.current.querySelectorAll('.bb-stat-number');
      valueEls.forEach((el, i) => {
        const stat = stats[i];
        if (stat) (el as HTMLElement).textContent = formatStatValue(stat.value) + stat.suffix;
      });
      const streamLines = sectionRef.current.querySelectorAll('.bb-stream-line');
      streamLines.forEach((line) => {
        (line as HTMLElement).style.opacity = '1';
      });
      return;
    }

    const triggers: ScrollTrigger[] = [];
    const statCells = sectionRef.current.querySelectorAll('.bb-stat-cell');

    statCells.forEach((cell, i) => {
      const numberEl = cell.querySelector('.bb-stat-number');
      if (!numberEl) return;
      const stat = stats[i];
      if (!stat) return;

      const counter = { val: 0 };

      const st = ScrollTrigger.create({
        trigger: cell,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          const noiseOverlay = cell.querySelector('.bb-stat-noise');
          if (noiseOverlay) {
            gsap.to(noiseOverlay, { opacity: 0, duration: 0.4, ease: 'power2.out' });
          }
          gsap.to(counter, {
            val: stat.value,
            duration: stat.value > 100 ? 2 : 1.2,
            ease: 'power2.out',
            delay: i * 0.15,
            onUpdate: () => {
              (numberEl as HTMLElement).textContent =
                formatStatValue(Math.round(counter.val)) + stat.suffix;
            },
          });
        },
      });
      triggers.push(st);
    });

    const streamLines = sectionRef.current.querySelectorAll('.bb-stream-line');
    streamLines.forEach((line, i) => {
      gsap.fromTo(
        line,
        { opacity: 0, x: -10 },
        {
          opacity: 1,
          x: 0,
          duration: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: line,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          delay: i * 0.12,
        }
      );
    });

    return () => { triggers.forEach((st) => st.kill()); };
  }, { scope: sectionRef });

  return (
    <div ref={sectionRef} className="bb-stats-readout">
      <h2 className="bb-section-title">OPERATIONAL STATISTICS</h2>
      <div className="bb-section-title-underline" aria-hidden="true" />

      <div className="bb-stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className="bb-stat-cell">
            <div className="bb-stat-noise" aria-hidden="true" />
            <span className="bb-stat-number">
              {formatStatValue(0)}{stat.suffix}
            </span>
            <span className="bb-stat-label">{stat.label}</span>
            <span className="bb-stat-sublabel">{stat.sublabel}</span>
          </div>
        ))}
      </div>

      <div className="bb-data-stream">
        <span className="bb-stream-header">DATA STREAM:</span>
        {dataStream.map((item, i) => (
          <div key={i} className="bb-stream-line">
            <span className="bb-stream-prefix" aria-hidden="true">&gt; </span>
            <span className="bb-stream-key">{item.key}</span>
            <span className="bb-stream-dots" aria-hidden="true" />
            <span className="bb-stream-value">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
