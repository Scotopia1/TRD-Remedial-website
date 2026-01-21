/**
 * FAQ Schema Component
 * Phase 2 SEO Optimization - Advanced Schema Markup
 *
 * Implements FAQPage schema.org structured data for rich snippets
 * in Google search results
 */

import { FAQS } from '@/data/faqs';

export function FAQSchema() {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://thetrdgroup.com.au';

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
