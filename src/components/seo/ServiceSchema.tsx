/**
 * Service Schema Component
 * Phase 2 SEO Optimization - Advanced Schema Markup
 *
 * Implements Service schema.org structured data for rich snippets
 * in Google search results for service detail pages
 */

import type { Service, SiteSettings } from '@/types/api';

const toTelHref = (phone: string) => `tel:${phone.replace(/\s/g, '')}`;

interface ServiceSchemaProps {
  service: Service;
  settings?: Pick<SiteSettings, 'companyName' | 'emergencyPhone1' | 'contactAddress'>;
}

export function ServiceSchema({ service, settings }: ServiceSchemaProps) {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://trdremedial.com.au';
  const companyName = settings?.companyName ?? 'TRD Remedial';
  const phone = settings?.emergencyPhone1 ?? '0414 727 167';
  const telHref = toTelHref(phone);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/services/${service.slug}#service`,
    "serviceType": service.title,
    "name": service.title,
    "description": service.description,
    "additionalType": "https://schema.org/ProfessionalService",
    "provider": {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      "name": companyName,
      "telephone": telHref,
      "url": SITE_URL,
      "logo": `${SITE_URL}/trd-logo.svg`,
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "NSW",
        "addressCountry": "AU"
      }
    },
    "areaServed": {
      "@type": "State",
      "name": "New South Wales"
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": `${SITE_URL}/services/${service.slug}`,
      "servicePhone": telHref,
      "availableLanguage": {
        "@type": "Language",
        "name": "English"
      }
    },
    "keywords": [service.title, "Sydney", "NSW"],
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "AUD",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "priceCurrency": "AUD"
      }
    },
    ...(service.heroImage && {
      "image": service.heroImage
    })
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
