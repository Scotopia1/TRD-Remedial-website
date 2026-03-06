'use client';

/**
 * SiteSettingsProvider
 *
 * Receives server-fetched site settings and makes them available to all
 * client components (Footer, Header, EmergencyCTA, etc.) via React context.
 *
 * Settings are fetched server-side in the root layout and passed as
 * initialSettings, avoiding CORS issues with cross-origin client fetches.
 */

import React, { createContext, useContext } from 'react';
import type { SiteSettings } from '@/types/api';

// ---------------------------------------------------------------------------
// Defaults — used if the server fails to fetch settings
// ---------------------------------------------------------------------------
export const DEFAULT_SETTINGS: SiteSettings = {
  contactEmail: 'contact@trdremedial.com.au',
  contactPhone: '0414 727 167',
  contactAddress: '2 Beryl Place Greenacre NSW 2190',
  businessHours: 'Mon-Fri: 7:00 AM - 6:00 PM, Sat: 8:00 AM - 2:00 PM, 24/7 Emergency Service',
  siteTitle: 'TRD Remedial - The Remedial Experts',
  siteDescription: "Sydney's leading structural remediation and concrete repair specialists. Expert crack injection, carbon fibre strengthening, and 24/7 emergency services across NSW.",
  companyName: 'TRD Remedial',
  companyFullName: 'TRD Remedial - The Remedial Experts',
  tagline: 'THE REMEDIAL EXPERTS',
  subTagline: 'When structural problems demand real answers',
  valueProposition: "We solve challenges others can't handle",
  emergencyPhone1: '0414 727 167',
  emergencyPhone2: '0404 404 422',
  parentCompanyName: 'Tension Reinforced Developments',
  parentCompanyYear: '2017',
  socialLinkedIn: '',
  socialFacebook: '',
  socialInstagram: '',
  ogImage: '',
  twitterImage: '',
  footerCta: "Let's Build Together",
  footerDescription: "From structural remediation to emergency repairs -- we're always ready to collaborate.",
  bannerText: 'TRD REMEDIAL * THE REMEDIAL EXPERTS *',
  copyrightText: '\u00a9 TRD Remedial 2025',
  navigationLinks: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  featuredProjectIds: ['project-001', 'project-011', 'project-006', 'project-007', 'project-003', 'project-012'],
};

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------
const SiteSettingsContext = createContext<SiteSettings>(DEFAULT_SETTINGS);

export function useSiteSettings(): SiteSettings {
  return useContext(SiteSettingsContext);
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------
export function SiteSettingsProvider({
  initialSettings,
  children,
}: {
  initialSettings?: SiteSettings;
  children: React.ReactNode;
}) {
  return (
    <SiteSettingsContext.Provider value={initialSettings || DEFAULT_SETTINGS}>
      {children}
    </SiteSettingsContext.Provider>
  );
}
