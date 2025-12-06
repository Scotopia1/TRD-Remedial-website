'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CaseStudy } from '@/data/case-studies';

interface VisualizationCaseStudyProps {
  caseStudy: CaseStudy;
  index: number;
  isInView: boolean;
}

export function VisualizationCaseStudy({ caseStudy, index, isInView }: VisualizationCaseStudyProps) {
  const [activeView, setActiveView] = useState<'stress' | 'solution' | 'result'>('stress');

  const visualizations = {
    stress: {
      title: 'Stress Analysis',
      description: 'Slab deflection showing structural stress points',
      gradient: 'from-red-500 via-orange-500 to-yellow-500',
    },
    solution: {
      title: 'Carbon Fiber Application',
      description: 'Strategic reinforcement pattern',
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    },
    result: {
      title: 'Restored Integrity',
      description: 'Structural analysis post-reinforcement',
      gradient: 'from-green-500 via-emerald-500 to-green-600',
    },
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
        </div>

        {/* Visualization Toggle */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {(Object.keys(visualizations) as Array<keyof typeof visualizations>).map((view) => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap ${
                activeView === view
                  ? 'bg-trd-accent text-white shadow-lg scale-105'
                  : 'bg-concrete-100 text-concrete-700 hover:bg-concrete-200'
              }`}
            >
              {visualizations[view].title}
            </button>
          ))}
        </div>

        {/* 3D Visualization Area (Placeholder for future 3D integration) */}
        <motion.div
          key={activeView}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden mb-8"
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${visualizations[activeView].gradient} opacity-90`}
            style={{
              backgroundImage: activeView === 'stress'
                ? `url(${caseStudy.images[0].before})`
                : `url(${caseStudy.images[0].after})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundBlendMode: 'overlay',
            }}
          />

          {/* Heat Map Grid Overlay */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }} />

          {/* Visualization Info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <h4 className="text-white font-bold text-xl mb-2">
              {visualizations[activeView].title}
            </h4>
            <p className="text-white/90">
              {visualizations[activeView].description}
            </p>
          </div>

          {/* Stress Points (for stress view) */}
          {activeView === 'stress' && (
            <>
              <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
              <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-orange-500 rounded-full animate-pulse" />
              <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-yellow-500 rounded-full animate-pulse" />
            </>
          )}

          {/* Carbon Fiber Pattern (for solution view) */}
          {activeView === 'solution' && (
            <svg className="absolute inset-0 w-full h-full opacity-60">
              <defs>
                <pattern id="carbonPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <path d="M 0 50 L 100 50" stroke="white" strokeWidth="3" />
                  <path d="M 50 0 L 50 100" stroke="white" strokeWidth="3" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#carbonPattern)" />
            </svg>
          )}
        </motion.div>

        {/* Challenge, Solution & Result */}
        <div className="space-y-6">
          <div>
            <h4 className="text-xl font-bold text-concrete-900 mb-3">The Challenge</h4>
            <p className="text-concrete-700">{caseStudy.challenge}</p>
          </div>

          <div>
            <h4 className="text-xl font-bold text-concrete-900 mb-3">Our Solution</h4>
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
            <h4 className="text-xl font-bold text-concrete-900 mb-3">The Result</h4>
            <p className="text-concrete-700 mb-4">{caseStudy.result}</p>
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
