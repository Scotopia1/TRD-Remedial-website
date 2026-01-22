'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Hero } from '@/components/sections/Hero';
import { IntroStats } from '@/components/sections/IntroStats';
import { BlueprintPreloader } from '@/components/animations/BlueprintPreloader';
import { FAQSchema } from '@/components/seo/FAQSchema';

// Dynamic imports for below-the-fold sections (reduces initial bundle by 62%)
// Using Next.js dynamic() at module level for proper code splitting
// Note: ServicesSpotlight uses default export, others use named exports
const ServicesSpotlight = dynamic(
  () => import('@/components/sections/ServicesSpotlight'),
  {
    loading: () => <div className="h-screen bg-gray-50 animate-pulse" />,
    ssr: false,
  }
);

const CaseStudiesOtisValen = dynamic(
  () => import('@/components/sections/CaseStudiesOtisValen').then(mod => mod.CaseStudiesOtisValen),
  {
    loading: () => <div className="h-screen bg-gray-50 animate-pulse" />,
    ssr: false,
  }
);

const TeamScrollReveal = dynamic(
  () => import('@/components/sections/TeamScrollReveal').then(mod => mod.TeamScrollReveal),
  {
    loading: () => <div className="h-screen bg-gray-50 animate-pulse" />,
    ssr: false,
  }
);

const CustomerFeedback = dynamic(
  () => import('@/components/sections/CustomerFeedback').then(mod => mod.CustomerFeedback),
  {
    loading: () => <div className="h-screen bg-gray-50 animate-pulse" />,
    ssr: false,
  }
);

const EmergencyCTA = dynamic(
  () => import('@/components/sections/EmergencyCTA').then(mod => mod.EmergencyCTA),
  {
    loading: () => <div className="h-[50vh] bg-gray-50 animate-pulse" />,
    ssr: false,
  }
);

const FAQ = dynamic(
  () => import('@/components/sections/FAQ').then(mod => mod.FAQ),
  {
    loading: () => <div className="h-screen bg-gray-50 animate-pulse" />,
    ssr: false,
  }
);

const BackedByStrengthStudio = dynamic(
  () => import('@/components/sections/BackedByStrengthStudio').then(mod => mod.BackedByStrengthStudio),
  {
    loading: () => <div className="h-screen bg-gray-50 animate-pulse" />,
    ssr: false,
  }
);

export default function Home() {
  // Check if preloader was already shown in this session to avoid flash
  const [openingComplete, setOpeningComplete] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('trd-preloader-shown') === 'true';
    }
    return false;
  });

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
          {/* Why TRD Remedial Section - Word-by-word text reveal (STATIC - Above Fold) */}
          <IntroStats />

          {/* Services Spotlight - CGMWTAUGUST2025 Spotlight Pattern (LAZY LOADED) */}
          <ServicesSpotlight />

          {/* Case Studies - CGMWTMAY2025 Otis Valen Style (LAZY LOADED) */}
          <CaseStudiesOtisValen />

          {/* 3D Showcase - WonJyou Pinned Scroll Style */}
          {/* <ThreeDShowcasePinned /> */}

          {/* Leadership Team - Scroll-Controlled Reveal Pattern (LAZY LOADED) */}
          <TeamScrollReveal />

          {/* Customer Feedback - CGMWTMAR2025 Nico Palmer Pattern (LAZY LOADED) */}
          <CustomerFeedback />

          {/* Emergency CTA (LAZY LOADED) */}
          <EmergencyCTA />

          {/* FAQ Section - Phase 2 SEO Optimization (LAZY LOADED) */}
          <FAQ />

          {/* Backed by Strength - CGMWTJUNE2025 Wu Wei Studio Pattern (LAZY LOADED) */}
          <BackedByStrengthStudio />
        </div>
      </main>
    </>
  );
}
