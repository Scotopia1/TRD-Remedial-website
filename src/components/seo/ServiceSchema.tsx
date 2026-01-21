/**
 * Service Schema Component
 * Phase 2 SEO Optimization - Advanced Schema Markup
 *
 * Implements Service schema.org structured data for rich snippets
 * in Google search results for service detail pages
 */

import type { Service } from '@/data/services';

interface ServiceSchemaProps {
  service: Service;
}

export function ServiceSchema({ service }: ServiceSchemaProps) {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://thetrdgroup.com.au';

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/services/${service.slug}#service`,
    "serviceType": service.title,
    "name": service.title,
    "description": service.description,
    "provider": {
      "@id": `${SITE_URL}/#organization`
    },
    "areaServed": {
      "@type": "State",
      "name": "New South Wales"
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": `${SITE_URL}/services/${service.slug}`,
      "servicePhone": "+61414727167",
      "availableLanguage": {
        "@type": "Language",
        "name": "English"
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
