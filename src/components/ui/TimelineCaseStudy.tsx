'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CaseStudy } from '@/data/case-studies';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface TimelineCaseStudyProps {
  caseStudy: CaseStudy;
  index: number;
  isInView: boolean;
}

export function TimelineCaseStudy({ caseStudy, index, isInView }: TimelineCaseStudyProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const timelineSteps = [
    { label: 'Challenge', content: caseStudy.challenge },
    ...caseStudy.solution.map((sol, idx) => ({ label: `Step ${idx + 1}`, content: sol })),
    { label: 'Result', content: caseStudy.result },
  ];

  useGSAP(() => {
    if (!timelineRef.current) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: timelineRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
      },
    });

    timelineSteps.forEach((_, idx) => {
      timeline.to(timelineRef.current, {
        onUpdate: () => {
          const progress = timeline.progress();
          const stepProgress = progress * timelineSteps.length;
          setActiveStep(Math.min(Math.floor(stepProgress), timelineSteps.length - 1));
        },
      });
    });
  }, { scope: timelineRef });

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="bg-white rounded-3xl shadow-xl overflow-hidden"
    >
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Side - Project Info */}
        <div className="p-8 lg:p-12">
          <div className="mb-6">
            <span className="inline-block px-4 py-1 bg-trd-accent/10 text-trd-accent rounded-full text-sm font-semibold mb-4">
              Featured Project
            </span>
            <h3 className="text-3xl lg:text-4xl font-bold text-concrete-900 mb-2">
              {caseStudy.title}
            </h3>
            <p className="text-concrete-600 text-lg">{caseStudy.location}</p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {caseStudy.metrics.map((metric) => (
              <div key={metric.label} className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-trd-accent mb-1">
                  {metric.value}
                </div>
                <div className="text-sm text-concrete-600">{metric.label}</div>
              </div>
            ))}
          </div>

          {/* Before/After Images */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm font-semibold text-concrete-700">Before</div>
              <div
                className="h-40 rounded-lg bg-gradient-to-br from-concrete-300 to-concrete-400"
                style={{
                  backgroundImage: `url(${caseStudy.images[0].before})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </div>
            <div className="space-y-2">
              <div className="text-sm font-semibold text-concrete-700">After</div>
              <div
                className="h-40 rounded-lg bg-gradient-to-br from-green-300 to-green-400"
                style={{
                  backgroundImage: `url(${caseStudy.images[0].after})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </div>
          </div>
        </div>

        {/* Right Side - Interactive Timeline */}
        <div ref={timelineRef} className="bg-concrete-50 p-8 lg:p-12 flex items-center">
          <div className="w-full">
            <h4 className="text-xl font-bold text-concrete-900 mb-8">Project Timeline</h4>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-concrete-200" />
              <div
                className="absolute left-4 top-0 w-0.5 bg-trd-accent transition-all duration-500"
                style={{
                  height: `${(activeStep / (timelineSteps.length - 1)) * 100}%`,
                }}
              />

              {/* Timeline Steps */}
              <div className="space-y-6">
                {timelineSteps.map((step, idx) => (
                  <div key={idx} className="relative pl-12">
                    <div
                      className={`absolute left-0 w-8 h-8 rounded-full border-4 border-white transition-all duration-300 ${
                        idx <= activeStep
                          ? 'bg-trd-accent scale-110'
                          : 'bg-concrete-300 scale-100'
                      }`}
                    />
                    <div
                      className={`transition-all duration-300 ${
                        idx === activeStep ? 'opacity-100 scale-105' : 'opacity-60 scale-100'
                      }`}
                    >
                      <div className="text-sm font-semibold text-trd-accent mb-1">
                        {step.label}
                      </div>
                      <div className="text-concrete-700">{step.content}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
