/**
 * FAQ Schema Component
 * Phase 2 SEO Optimization - Advanced Schema Markup
 *
 * Implements FAQPage schema.org structured data for rich snippets
 * in Google search results
 */

import type { FAQItem } from '@/types/api';

interface FAQSchemaProps {
  faqs: FAQItem[];
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      },
      ...(faq.keywords && faq.keywords.length > 0 ? { "keywords": faq.keywords.join(', ') } : {})
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
