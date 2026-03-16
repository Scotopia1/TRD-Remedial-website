import { getSettings, getServices, getTeamMembers } from '@/lib/api';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Format an Australian phone number (03xxxxxxxx / 04xxxxxxxx / 0414…) to
 * the E.164-ish display format expected by schema.org: +61-XXX-XXX-XXX
 */
function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('0') && digits.length >= 9) {
    // Split after leading 0 into groups: area(3) + first(3) + last(remaining)
    const body = digits.slice(1); // drop leading 0
    const part1 = body.slice(0, 3);
    const part2 = body.slice(3, 6);
    const part3 = body.slice(6);
    return `+61-${part1}-${part2}-${part3}`;
  }
  return phone;
}

/**
 * Parse a single-string Australian address of the form
 * "2 Beryl Place Greenacre NSW 2190" into structured parts.
 *
 * Strategy: last token → postCode, second-to-last → state, third-to-last →
 * suburb, everything before → street.
 */
function parseAddress(raw: string): {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
} {
  const parts = raw.trim().split(/\s+/);
  if (parts.length >= 4) {
    const postalCode = parts[parts.length - 1];
    const addressRegion = parts[parts.length - 2];
    const addressLocality = parts[parts.length - 3];
    const streetAddress = parts.slice(0, parts.length - 3).join(' ');
    return { streetAddress, addressLocality, addressRegion, postalCode };
  }
  // Graceful fallback to hardcoded defaults if format is unexpected
  return {
    streetAddress: raw,
    addressLocality: 'Greenacre',
    addressRegion: 'NSW',
    postalCode: '2190',
  };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export async function StructuredData() {
  const [settings, services, teamMembers] = await Promise.all([
    getSettings(),
    getServices(),
    getTeamMembers(),
  ]);

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://trdremedial.com.au';

  // Primary phone — use emergencyPhone1 or contactPhone, fallback to known number
  const primaryPhone =
    settings.emergencyPhone1 || settings.contactPhone || '0414 727 167';

  const addressParts = parseAddress(
    settings.contactAddress || '2 Beryl Place Greenacre NSW 2190',
  );

  // Build sameAs from individual social fields
  const sameAs = [
    settings.socialLinkedIn,
    settings.socialFacebook,
    settings.socialInstagram,
    'https://twitter.com/trdremedial',
    'https://youtube.com/@trdremedial',
  ].filter((v): v is string => Boolean(v));

  // ---------------------------------------------------------------------------
  // Schema: Organization
  // ---------------------------------------------------------------------------

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: settings.companyName || 'TRD Remedial',
    alternateName: settings.companyFullName || 'TRD Remedial - The Remedial Experts',
    legalName: settings.parentCompanyName || 'Tension Reinforced Developments',
    url: siteUrl,
    logo: `${siteUrl}/trd-logo.svg`,
    foundingDate: settings.parentCompanyYear || '2017',
    slogan: settings.tagline || 'THE REMEDIAL EXPERTS',
    founders:
      teamMembers.length > 0
        ? teamMembers.map((m) => ({ '@type': 'Person', name: m.name }))
        : [
            { '@type': 'Person', name: 'Christopher Nassif' },
            { '@type': 'Person', name: 'Charly Nassif' },
            { '@type': 'Person', name: 'Fahed Nassif' },
          ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: formatPhone(primaryPhone),
      contactType: 'emergency',
      areaServed: 'AU',
      availableLanguage: 'English',
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  // ---------------------------------------------------------------------------
  // Schema: LocalBusiness
  // ---------------------------------------------------------------------------

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/#localbusiness`,
    name: settings.companyName || 'TRD Remedial',
    image: settings.ogImage || `https://ik.imagekit.io/1fovck7sy4/trd-website/images/og-image.jpg`,
    description:
      settings.siteDescription ||
      'Award-winning structural remediation experts in Sydney. Specializing in structural strengthening, concrete cutting, crack injection, concrete repairs, and emergency structural solutions.',
    slogan: settings.valueProposition || settings.subTagline || 'When structural problems demand real answers',
    address: {
      '@type': 'PostalAddress',
      streetAddress: addressParts.streetAddress,
      addressLocality: addressParts.addressLocality,
      addressRegion: addressParts.addressRegion,
      postalCode: addressParts.postalCode,
      addressCountry: 'AU',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: settings.geoLatitude ?? -33.9,
      longitude: settings.geoLongitude ?? 151.05,
    },
    telephone: formatPhone(primaryPhone),
    email: settings.contactEmail || 'contact@trdremedial.com.au',
    url: siteUrl,
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Structural Remediation Services',
      itemListElement:
        services.length > 0
          ? services.map((s) => ({
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: s.title,
                description: s.tagline || s.description?.substring(0, 200) || '',
                url: `${siteUrl}/services/${s.slug}`,
              },
            }))
          : [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Structural Strengthening',
                  description:
                    'Carbon fibre reinforcement and advanced structural strengthening solutions',
                },
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Concrete Repairs',
                  description:
                    'Comprehensive concrete patching, spalling repair, and surface restoration',
                },
              },
            ],
    },
    areaServed: {
      '@type': 'State',
      name: 'New South Wales',
    },
  };

  // ---------------------------------------------------------------------------
  // Schema: WebSite
  // ---------------------------------------------------------------------------

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: settings.companyName || 'TRD Remedial',
    description:
      settings.siteDescription || 'The Remedial Experts - Structural Solutions Sydney',
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
    inLanguage: 'en-AU',
  };

  // ---------------------------------------------------------------------------
  // Schema: BreadcrumbList (home)
  // ---------------------------------------------------------------------------

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
