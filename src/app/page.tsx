'use client';

import { useState, useCallback } from 'react';
import { Hero } from '@/components/sections/Hero';
import { IntroStats } from '@/components/sections/IntroStats';
import { BlueprintPreloader } from '@/components/animations/BlueprintPreloader';
import ServicesSpotlight from '@/components/sections/ServicesSpotlight';
import { CaseStudiesOtisValen } from '@/components/sections/CaseStudiesOtisValen';
// import { ThreeDShowcasePinned } from '@/components/sections/ThreeDShowcasePinned';
import { TeamScrollReveal } from '@/components/sections/TeamScrollReveal';
import { CustomerFeedback } from '@/components/sections/CustomerFeedback';
import { BackedByStrengthStudio } from '@/components/sections/BackedByStrengthStudio';
import { EmergencyCTA } from '@/components/sections/EmergencyCTA';
import { FAQ } from '@/components/sections/FAQ';
import { FAQSchema } from '@/components/seo/FAQSchema';

export default function Home() {
  const [openingComplete, setOpeningComplete] = useState(false);

  const handleOpeningComplete = useCallback(() => {
    setOpeningComplete(true);
  }, []);

  return (
    <>
      {/* FAQ Schema for SEO - Phase 2 Optimization */}
      <FAQSchema />

      {/* Blueprint Preloader - SVG animation with T-R-D reveal */}
      <BlueprintPreloader onComplete={handleOpeningComplete} />

      {/* Main Content */}
      <main id="main-content" aria-label="Main content">
        {/* Hero Section - Video always visible, text appears after loading */}
        <Hero showContent={openingComplete} />

        {/* Rest of content - Shows after opening animation */}
        <div className={`transition-opacity duration-500 ${openingComplete ? 'opacity-100' : 'opacity-0'}`}>
          {/* Why TRD Remedial Section - Word-by-word text reveal */}
          <IntroStats />

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

          {/* FAQ Section - Phase 2 SEO Optimization */}
          <FAQ />

          {/* Emergency CTA */}
          <EmergencyCTA />

          {/* Backed by Strength - CGMWTJUNE2025 Wu Wei Studio Pattern */}
          <BackedByStrengthStudio />
        </div>
      </main>
    </>
  );
}
