'use client';

import { useState } from 'react';
import { Hero } from '@/components/sections/Hero';
import { OpeningAnimation } from '@/components/animations/OpeningAnimation';
import { WhyChooseTRD } from '@/components/sections/WhyChooseTRD';
import ServicesSpotlight from '@/components/sections/ServicesSpotlight';
import { CaseStudiesOtisValen } from '@/components/sections/CaseStudiesOtisValen';
// import { ThreeDShowcasePinned } from '@/components/sections/ThreeDShowcasePinned';
import { TeamScrollReveal } from '@/components/sections/TeamScrollReveal';
import { CustomerFeedback } from '@/components/sections/CustomerFeedback';
import { BackedByStrengthStudio } from '@/components/sections/BackedByStrengthStudio';
import { EmergencyCTA } from '@/components/sections/EmergencyCTA';

export default function Home() {
  const [openingComplete, setOpeningComplete] = useState(false);

  const handleOpeningComplete = () => {
    setOpeningComplete(true);
  };

  return (
    <>
      {/* Opening Animation - Now includes asset loading */}
      <OpeningAnimation onComplete={handleOpeningComplete} />

      {/* Main Content - Shows after opening animation */}
      <div className={`transition-opacity duration-500 ${openingComplete ? 'opacity-100' : 'opacity-0'}`}>
        {/* Main Content */}
        <main id="main-content" aria-label="Main content">
          {/* Hero Section */}
          <Hero />

          {/* Why TRD Remedial - GSAP Scroll Animation */}
          <WhyChooseTRD />

          {/* Services Spotlight - CGMWTAUGUST2025 Spotlight Pattern */}
          <ServicesSpotlight />

          {/* Case Studies - CGMWTMAY2025 Otis Valen Style */}
          <CaseStudiesOtisValen />

          {/* 3D Showcase - WonJyou Pinned Scroll Style */}
          {/* <ThreeDShowcasePinned /> */}

          {/* Leadership Team - Scroll-Controlled Reveal Pattern */}
          <TeamScrollReveal />

          {/* Customer Feedback - CGMWTMAR2025 Nico Palmer Pattern */}
          <CustomerFeedback />

          {/* Emergency CTA */}
          <EmergencyCTA />

          {/* Backed by Strength - CGMWTJUNE2025 Wu Wei Studio Pattern */}
          <BackedByStrengthStudio />
        </main>
      </div>
    </>
  );
}
