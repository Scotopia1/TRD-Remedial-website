'use client';

import { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { scrollTriggerManager } from '@/utils/scrollTriggerManager';
import { Hero } from '@/components/sections/Hero';
import { IntroStats } from '@/components/sections/IntroStats';
import { BlueprintPreloader } from '@/components/animations/BlueprintPreloader';
import { FAQSchema } from '@/components/seo/FAQSchema';
import type { Service, Project, TeamMember, Testimonial, PageContent, FAQItem } from '@/types/api';

// Dynamic imports for below-the-fold sections (reduces initial bundle by 62%)
// Using Next.js dynamic() at module level for proper code splitting
// Note: ServicesSpotlight uses default export, others use named exports
const ServicesSpotlight = dynamic(
  () => import('@/components/sections/ServicesSpotlight'),
  {
    loading: () => <div className="h-dvh bg-gray-50 animate-pulse" />,
    ssr: false,
  }
);

const CaseStudiesOtisValen = dynamic(
  () => import('@/components/sections/CaseStudiesOtisValen').then(mod => mod.CaseStudiesOtisValen),
  {
    loading: () => <div className="h-dvh bg-gray-50 animate-pulse" />,
    ssr: false,
  }
);

const TeamScrollReveal = dynamic(
  () => import('@/components/sections/TeamScrollReveal').then(mod => mod.TeamScrollReveal),
  {
    loading: () => <div className="h-dvh bg-gray-50 animate-pulse" />,
    ssr: false,
  }
);

const CustomerFeedback = dynamic(
  () => import('@/components/sections/CustomerFeedback').then(mod => mod.CustomerFeedback),
  {
    loading: () => <div className="h-dvh bg-gray-50 animate-pulse" />,
    ssr: false,
  }
);

const EmergencyCTA = dynamic(
  () => import('@/components/sections/EmergencyCTA').then(mod => mod.EmergencyCTA),
  {
    loading: () => <div className="h-[50dvh] bg-gray-50 animate-pulse" />,
    ssr: false,
  }
);

const FAQ = dynamic(
  () => import('@/components/sections/FAQ').then(mod => mod.FAQ),
  {
    loading: () => <div className="h-dvh bg-gray-50 animate-pulse" />,
    ssr: false,
  }
);

const BackedByStrengthStudio = dynamic(
  () => import('@/components/sections/BackedByStrengthStudio').then(mod => mod.BackedByStrengthStudio),
  {
    loading: () => <div className="h-dvh bg-gray-50 animate-pulse" />,
    ssr: false,
  }
);

// ---------------------------------------------------------------------------
// Props — all data is fetched by the server component and passed down
// ---------------------------------------------------------------------------

export interface HomeClientProps {
  services: Service[];
  projects: Project[];
  teamMembers: TeamMember[];
  testimonials: Testimonial[];
  pageContent: PageContent[];
  faqs: FAQItem[];
}

// ---------------------------------------------------------------------------
// Helper to look up a page content value by key
// ---------------------------------------------------------------------------

function contentValue(content: PageContent[], key: string): string | undefined {
  const block = content.find(c => c.key === key);
  return block?.value;
}

// ---------------------------------------------------------------------------
// Client Component
// ---------------------------------------------------------------------------

export default function HomeClient({
  services,
  projects,
  teamMembers,
  testimonials,
  pageContent,
  faqs,
}: HomeClientProps) {
  // HYDRATION FIX: Always start with false to match SSR output.
  // Reading sessionStorage in useState initializer causes server/client mismatch
  // because the server always returns false but client may return true.
  // Use useEffect to read sessionStorage only after hydration completes.
  const [openingComplete, setOpeningComplete] = useState(false);

  useEffect(() => {
    // After hydration, check if preloader was already shown in this session
    if (sessionStorage.getItem('trd-preloader-shown') === 'true') {
      setOpeningComplete(true);
    }
  }, []);

  const handleOpeningComplete = useCallback(() => {
    setOpeningComplete(true);
  }, []);

  // Coordinated ScrollTrigger refresh after all dynamic sections mount.
  // Dynamic imports (ssr: false) resolve asynchronously — this ensures all
  // components have mounted and created their ScrollTriggers before refresh.
  useEffect(() => {
    if (!openingComplete) return;
    const timeoutId = setTimeout(() => {
      scrollTriggerManager.requestRefresh();
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [openingComplete]);

  // Extract hero-specific content from CMS (with fallbacks handled by Hero)
  const taglines = [
    contentValue(pageContent, 'home.hero.tagline.1'),
    contentValue(pageContent, 'home.hero.tagline.2'),
    contentValue(pageContent, 'home.hero.tagline.3'),
  ].filter(Boolean) as string[];
  const heroCtaText = contentValue(pageContent, 'home.hero.cta');
  // Video now served from /public/video/hero-video.webm directly

  // Extract intro section content
  const introBodyText = contentValue(pageContent, 'home.intro.body');
  const introHeading = contentValue(pageContent, 'home.intro.heading');
  const introLinkText = contentValue(pageContent, 'home.intro.link-text');

  // Extract ServicesSpotlight content
  const servicesIntroWord1 = contentValue(pageContent, 'home.services.intro-word-1');
  const servicesIntroWord2 = contentValue(pageContent, 'home.services.intro-word-2');

  // Extract CaseStudies content
  const caseStudiesEyebrow = contentValue(pageContent, 'home.case-studies.eyebrow');
  const caseStudiesTitle = contentValue(pageContent, 'home.case-studies.title');
  const caseStudiesSubtitle = contentValue(pageContent, 'home.case-studies.subtitle');
  const caseStudiesCta = contentValue(pageContent, 'home.case-studies.cta');
  const featuredProjectsJson = contentValue(pageContent, 'home.featured-projects');
  let featuredProjectIds: string[] | undefined;
  if (featuredProjectsJson) {
    try { featuredProjectIds = JSON.parse(featuredProjectsJson) as string[]; }
    catch { /* malformed JSON in CMS — ignore, will use fallback */ }
  }

  // Extract CustomerFeedback content
  const testimonialsLabel = contentValue(pageContent, 'home.testimonials.label');
  const testimonialsSubtitle = contentValue(pageContent, 'home.testimonials.subtitle');

  // Extract BackedByStrength content
  const strengthHeaderSubtitle = contentValue(pageContent, 'home.mission.paragraph.1');
  const strengthMissionP1 = contentValue(pageContent, 'home.mission.paragraph.2');
  const strengthMissionP2 = contentValue(pageContent, 'home.mission.paragraph.3');
  const strengthRecognition = contentValue(pageContent, 'home.mission.recognition');
  const strengthMissionImage = contentValue(pageContent, 'home.mission.image');
  const missionTitle = contentValue(pageContent, 'home.mission.title');
  const missionRecognitionLabel = contentValue(pageContent, 'home.mission.recognition-label');
  const missionCta = contentValue(pageContent, 'home.mission.cta');

  // Extract Team section content
  const teamHeading = contentValue(pageContent, 'home.team.heading');
  const teamOutro = contentValue(pageContent, 'home.team.outro');

  // Extract FAQ section content
  const faqTitle = contentValue(pageContent, 'home.faq.title');
  const faqSubtitle = contentValue(pageContent, 'home.faq.subtitle');
  const faqCtaText = contentValue(pageContent, 'home.faq.cta-text');

  // Extract EmergencyCTA content
  const emergencyHeading = contentValue(pageContent, 'home.emergency.heading');
  const emergencyBody = contentValue(pageContent, 'home.emergency.body');
  const emergencyCta = contentValue(pageContent, 'home.emergency.cta');
  const emergencySubtitle = contentValue(pageContent, 'home.emergency.subtitle');
  const emergencyBadge = contentValue(pageContent, 'home.emergency.badge');

  return (
    <>
      {/* FAQ Schema for SEO - Phase 2 Optimization */}
      <FAQSchema faqs={faqs} />

      {/* Blueprint Preloader - technical drawing animation with looping until site ready */}
      <BlueprintPreloader onComplete={handleOpeningComplete} />

      {/* Main Content */}
      <main id="main-content" aria-label="Main content">
        {/* Hero Section - Video always visible, text appears after loading */}
        <Hero
          showContent={openingComplete}
          taglines={taglines.length > 0 ? taglines : undefined}
          ctaText={heroCtaText}
        />

        {/* Rest of content - Shows after opening animation */}
        <div className={`transition-opacity duration-500 ${openingComplete ? 'opacity-100' : 'opacity-0'}`}>
          {/* Why TRD Remedial Section - Word-by-word text reveal (STATIC - Above Fold) */}
          <IntroStats bodyText={introBodyText} heading={introHeading} linkText={introLinkText} />

          {/* Services Spotlight - CGMWTAUGUST2025 Spotlight Pattern (LAZY LOADED) */}
          <ServicesSpotlight services={services} introWord1={servicesIntroWord1} introWord2={servicesIntroWord2} />

          {/* Case Studies - CGMWTMAY2025 Otis Valen Style (LAZY LOADED) */}
          <CaseStudiesOtisValen
            projects={projects}
            featuredProjectIds={featuredProjectIds}
            eyebrow={caseStudiesEyebrow}
            title={caseStudiesTitle}
            subtitle={caseStudiesSubtitle}
            ctaText={caseStudiesCta}
          />

          {/* Leadership Team - Scroll-Controlled Reveal Pattern (LAZY LOADED) */}
          <TeamScrollReveal teamMembers={teamMembers} heading={teamHeading} outro={teamOutro} />

          {/* Customer Feedback - CGMWTMAR2025 Nico Palmer Pattern (LAZY LOADED) */}
          <CustomerFeedback testimonials={testimonials} label={testimonialsLabel} subtitle={testimonialsSubtitle} />

          {/* Emergency CTA (LAZY LOADED) */}
          <EmergencyCTA
            heading={emergencyHeading}
            body={emergencyBody}
            ctaText={emergencyCta}
            subtitle={emergencySubtitle}
            badge={emergencyBadge}
          />

          {/* FAQ Section - Phase 2 SEO Optimization (LAZY LOADED) */}
          <FAQ faqs={faqs} title={faqTitle} subtitle={faqSubtitle} ctaText={faqCtaText} />

          {/* Backed by Strength - CGMWTJUNE2025 Wu Wei Studio Pattern (LAZY LOADED) */}
          <BackedByStrengthStudio
            headerSubtitle={strengthHeaderSubtitle}
            missionParagraph1={strengthMissionP1}
            missionParagraph2={strengthMissionP2}
            recognitionText={strengthRecognition}
            missionImage={strengthMissionImage}
            title={missionTitle}
            recognitionLabel={missionRecognitionLabel}
            ctaText={missionCta}
          />
        </div>
      </main>
    </>
  );
}
