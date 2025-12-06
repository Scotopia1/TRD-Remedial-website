'use client';

import { useEffect, useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { gsap } from 'gsap';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface GuidedTourProps {
  controlsRef: React.RefObject<any>;
}

interface TourStep {
  position: [number, number, number];
  lookAt: [number, number, number];
  title: string;
  description: string;
  duration: number;
}

export function GuidedTour({ controlsRef }: GuidedTourProps) {
  const { camera } = useThree();
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const tourSteps: TourStep[] = [
    {
      position: [8, 6, 8],
      lookAt: [0, 3, 0],
      title: 'Building Overview',
      description: 'Welcome to the 3D structural analysis of our remedial project',
      duration: 3,
    },
    {
      position: [0, 3, 10],
      lookAt: [0, 2, 0],
      title: 'Carbon Fiber Reinforcement',
      description: 'Floor 2 slab strengthened with carbon fiber application',
      duration: 4,
    },
    {
      position: [-5, 3, 3],
      lookAt: [-2, 3, 0],
      title: 'Crack Injection',
      description: 'Structural crack repair on west wall using epoxy injection',
      duration: 4,
    },
    {
      position: [6, 2, -2],
      lookAt: [2, 1, -1],
      title: 'Precision Cutting',
      description: 'Concrete cutting and coring for service installation',
      duration: 4,
    },
    {
      position: [0, 8, 0],
      lookAt: [0, 4, 0],
      title: 'GPR Scanning',
      description: 'Ground-penetrating radar reveals hidden structural elements',
      duration: 4,
    },
    {
      position: [10, 8, 10],
      lookAt: [0, 3, 0],
      title: 'Tour Complete',
      description: 'Explore further by rotating the view with your mouse',
      duration: 3,
    },
  ];

  useEffect(() => {
    if (currentStep >= tourSteps.length) {
      setCurrentStep(0);
      return;
    }

    const step = tourSteps[currentStep];
    setIsAnimating(true);

    // Animate camera position
    gsap.to(camera.position, {
      x: step.position[0],
      y: step.position[1],
      z: step.position[2],
      duration: 2,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (controlsRef.current) {
          controlsRef.current.target.set(step.lookAt[0], step.lookAt[1], step.lookAt[2]);
          controlsRef.current.update();
        }
      },
      onComplete: () => {
        setIsAnimating(false);
      },
    });

    // Auto-advance to next step
    const timer = setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, step.duration * 1000);

    return () => clearTimeout(timer);
  }, [currentStep, camera, controlsRef, tourSteps]);

  const step = tourSteps[currentStep];
  if (!step) return null;

  return (
    <Html
      position={[0, 8, 0]}
      center
      distanceFactor={15}
      style={{
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      <div className="bg-black/80 backdrop-blur-md text-white px-6 py-4 rounded-xl
                   shadow-2xl border border-white/20 min-w-[300px] max-w-[400px]">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm text-white/60">
            Step {currentStep + 1} of {tourSteps.length}
          </div>
          <div className="flex gap-1">
            {tourSteps.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentStep ? 'bg-trd-accent w-6' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
        <p className="text-white/80 text-sm leading-relaxed">{step.description}</p>

        {/* Progress Bar */}
        <div className="mt-4 h-1 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-trd-accent transition-all"
            style={{
              width: isAnimating ? '0%' : '100%',
              transitionDuration: isAnimating ? '0s' : `${step.duration}s`,
              transitionTimingFunction: 'linear',
            }}
          />
        </div>
      </div>
    </Html>
  );
}
