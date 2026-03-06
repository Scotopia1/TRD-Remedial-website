'use client';

/**
 * SiteSettingsProvider
 *
 * Fetches global site settings once at the client level and makes them
 * available to all client components (Footer, Header, EmergencyCTA, etc.)
 * via React context.
 *
 * Why client-side fetch?
 * Footer, Menu, and Header live in the root layout and are rendered as
 * 'use client' components. The simplest way to supply them with dynamic
 * settings is through a shared context that fetches from the public API.
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { SiteSettings } from '@/types/api';

// ---------------------------------------------------------------------------
// Defaults — shown while settings load or if the API is unavailable
// ---------------------------------------------------------------------------
const DEFAULT_SETTINGS: SiteSettings = {
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
export function SiteSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    fetch(`${apiUrl}/api/public/settings`)
      .then((res) => {
        if (!res.ok) throw new Error(`settings fetch ${res.status}`);
        return res.json() as Promise<SiteSettings>;
      })
      .then((data) => setSettings(data))
      .catch((err) => {
        // Keep defaults on error — site remains functional
        console.error('[SiteSettingsProvider] Failed to load settings:', err);
      });
  }, []);

  return (
    <SiteSettingsContext.Provider value={settings}>
      {children}
    </SiteSettingsContext.Provider>
  );
}
