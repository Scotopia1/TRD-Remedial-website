/**
 * Data Fetching Layer
 *
 * All website data is fetched from the admin dashboard's public API.
 * These functions are intended for use in Next.js Server Components and
 * use ISR (Incremental Static Regeneration) with 60-second revalidation
 * so pages stay fast while content stays fresh.
 *
 * API base URL is controlled by the API_URL environment variable (server-side only).
 */

import type {
  Service,
  Project,
  TeamMember,
  CompanyValue,
  FAQItem,
  Testimonial,
  SiteSettings,
  PageContent,
} from '@/types/api';

// Re-export all types for convenience so callers can import from one place.
export type {
  Service,
  ServiceStat,
  ProcessStep,
  ServiceFAQ,
  ServiceTestimonial,
  Project,
  ProjectImage,
  ProjectStat,
  ProjectTestimonial,
  TeamMember,
  ExpertiseLevel,
  CompanyValue,
  FAQItem,
  Testimonial,
  SiteSettings,
  PageContent,
} from '@/types/api';

// ---------------------------------------------------------------------------
// Core fetch helper
// ---------------------------------------------------------------------------

const API_URL = process.env.API_URL || 'http://localhost:3001';

interface FetchOptions {
  /** ISR revalidation interval in seconds. Defaults to 60. */
  revalidate?: number;
}

async function fetchAPI<T>(path: string, options?: FetchOptions): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  const res = await fetch(`${API_URL}${path}`, {
    next: { revalidate: process.env.NODE_ENV === 'development' ? 0 : (options?.revalidate ?? 60) },
    headers: { 'Content-Type': 'application/json' },
    signal: controller.signal,
  });
  clearTimeout(timeout);

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText} — ${API_URL}${path}`);
  }

  return res.json() as Promise<T>;
}

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------

/**
 * Fetch all services ordered for display.
 */
export async function getServices(): Promise<Service[]> {
  try {
    return await fetchAPI<Service[]>('/api/public/services');
  } catch (err) {
    console.error('[api] getServices failed:', err);
    return [];
  }
}

/**
 * Fetch a single service by slug.
 * The API embeds related projects inside the service object.
 * Returns null when not found or on error.
 */
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    return await fetchAPI<Service>(`/api/public/services/${slug}`);
  } catch (err) {
    console.error(`[api] getServiceBySlug(${slug}) failed:`, err);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

/**
 * Fetch all projects ordered for display.
 */
export async function getProjects(): Promise<Project[]> {
  try {
    return await fetchAPI<Project[]>('/api/public/projects');
  } catch (err) {
    console.error('[api] getProjects failed:', err);
    return [];
  }
}

/**
 * Fetch a single project by slug.
 * Returns null when not found or on error.
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    return await fetchAPI<Project>(`/api/public/projects/${slug}`);
  } catch (err) {
    console.error(`[api] getProjectBySlug(${slug}) failed:`, err);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Team
// ---------------------------------------------------------------------------

/**
 * Fetch all team members ordered for display.
 */
export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    return await fetchAPI<TeamMember[]>('/api/public/team');
  } catch (err) {
    console.error('[api] getTeamMembers failed:', err);
    return [];
  }
}

// ---------------------------------------------------------------------------
// Company Values
// ---------------------------------------------------------------------------

/**
 * Fetch all company values (used on the About page grid).
 */
export async function getCompanyValues(): Promise<CompanyValue[]> {
  try {
    return await fetchAPI<CompanyValue[]>('/api/public/values');
  } catch (err) {
    console.error('[api] getCompanyValues failed:', err);
    return [];
  }
}

// ---------------------------------------------------------------------------
// FAQs
// ---------------------------------------------------------------------------

/**
 * Fetch all site-wide FAQs.
 */
export async function getFAQs(): Promise<FAQItem[]> {
  try {
    return await fetchAPI<FAQItem[]>('/api/public/faqs');
  } catch (err) {
    console.error('[api] getFAQs failed:', err);
    return [];
  }
}

/**
 * Fetch FAQs filtered by category.
 * Fetches all FAQs and filters client-side to avoid an extra endpoint.
 */
export async function getFAQsByCategory(
  category: FAQItem['category'],
): Promise<FAQItem[]> {
  const all = await getFAQs();
  return all.filter((faq) => faq.category === category);
}

/**
 * Return the list of distinct FAQ categories present in the data.
 */
export async function getFAQCategories(): Promise<FAQItem['category'][]> {
  const all = await getFAQs();
  const seen = new Set<FAQItem['category']>();
  for (const faq of all) seen.add(faq.category);
  // Return in a stable, predictable order.
  const ordered: FAQItem['category'][] = ['process', 'technical', 'services'];
  return ordered.filter((c) => seen.has(c));
}

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

/**
 * Fetch all testimonials (used on the homepage and throughout the site).
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    return await fetchAPI<Testimonial[]>('/api/public/testimonials');
  } catch (err) {
    console.error('[api] getTestimonials failed:', err);
    return [];
  }
}

// ---------------------------------------------------------------------------
// Site Settings
// ---------------------------------------------------------------------------

/**
 * Fetch global site settings (contact info, social links, etc.).
 */
export async function getSettings(): Promise<SiteSettings> {
  try {
    return await fetchAPI<SiteSettings>('/api/public/settings', { revalidate: 60 });
  } catch (err) {
    console.error('[api] getSettings failed:', err);
    // Return a safe default so the site doesn't break if settings are unavailable.
    return {
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
  }
}

// ---------------------------------------------------------------------------
// Page Content (CMS)
// ---------------------------------------------------------------------------

/**
 * Fetch all content blocks, optionally filtered by page.
 */
export async function getPageContent(page?: string): Promise<PageContent[]> {
  try {
    const query = page ? `?page=${encodeURIComponent(page)}` : '';
    return await fetchAPI<PageContent[]>(`/api/public/content${query}`);
  } catch (err) {
    console.error('[api] getPageContent failed:', err);
    return [];
  }
}

/**
 * Fetch a single content block by its unique key.
 * Returns null when not found or on error.
 */
export async function getContentByKey(key: string): Promise<PageContent | null> {
  try {
    return await fetchAPI<PageContent>(`/api/public/content/${encodeURIComponent(key)}`);
  } catch (err) {
    console.error(`[api] getContentByKey(${key}) failed:`, err);
    return null;
  }
}

/**
 * Convenience helper — returns just the string value for a content key.
 * Returns an empty string when the key doesn't exist.
 */
export async function getContentValue(key: string): Promise<string> {
  const block = await getContentByKey(key);
  return block?.value ?? '';
}
