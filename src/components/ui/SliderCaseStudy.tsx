'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { CaseStudy } from '@/data/case-studies';

interface SliderCaseStudyProps {
  caseStudy: CaseStudy;
  index: number;
  isInView: boolean;
}

export function SliderCaseStudy({ caseStudy, index, isInView }: SliderCaseStudyProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) handleMove(e.touches[0].clientX);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="bg-white rounded-3xl shadow-xl overflow-hidden"
    >
      <div className="p-8 lg:p-12">
        {/* Header */}
        <div className="mb-8">
          <span className="inline-block px-4 py-1 bg-trd-accent/10 text-trd-accent rounded-full text-sm font-semibold mb-4">
            Featured Project
          </span>
          <h3 className="text-3xl lg:text-4xl font-bold text-concrete-900 mb-2">
            {caseStudy.title}
          </h3>
          <p className="text-concrete-600 text-lg mb-4">{caseStudy.location}</p>
          <p className="text-concrete-700">{caseStudy.challenge}</p>
        </div>

        {/* Before/After Slider */}
        <div
          ref={containerRef}
          className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden cursor-col-resize select-none mb-8"
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          onTouchMove={handleTouchMove}
        >
          {/* After Image (Full) */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-600"
            style={{
              backgroundImage: `url(${caseStudy.images[0].after})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute top-4 right-4 px-4 py-2 bg-green-600/90 text-white rounded-lg font-semibold">
              After
            </div>
          </div>

          {/* Before Image (Clipped) */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-600"
            style={{
              clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
              backgroundImage: `url(${caseStudy.images[0].before})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute top-4 left-4 px-4 py-2 bg-red-600/90 text-white rounded-lg font-semibold">
              Before
            </div>
          </div>

          {/* Slider Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                          w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
              <div className="flex gap-1">
                <div className="w-0.5 h-6 bg-concrete-400" />
                <div className="w-0.5 h-6 bg-concrete-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Solution & Results */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h4 className="text-xl font-bold text-concrete-900 mb-4">Our Solution</h4>
            <ul className="space-y-2">
              {caseStudy.solution.map((sol, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-trd-accent mr-2 text-lg">✓</span>
                  <span className="text-concrete-700">{sol}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold text-concrete-900 mb-4">Result</h4>
            <p className="text-concrete-700 mb-6">{caseStudy.result}</p>
            <div className="grid grid-cols-2 gap-4">
              {caseStudy.metrics.map((metric) => (
                <div key={metric.label} className="bg-concrete-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-trd-accent mb-1">
                    {metric.value}
                  </div>
                  <div className="text-sm text-concrete-600">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
