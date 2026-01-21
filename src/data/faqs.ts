/**
 * TRD Remedial - FAQ Data
 * Phase 2 SEO Optimization - Content Expansion
 *
 * 13 FAQs organized by category:
 * - 5 Process
 * - 4 Technical
 * - 4 Services
 */

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'process' | 'technical' | 'services';
  keywords: string[];
}

export const FAQS: FAQItem[] = [
  // ==================== PROCESS CATEGORY (5 FAQs) ====================
  {
    id: 'project-duration',
    question: 'How long does structural remediation take?',
    answer: 'Project duration depends on scope: crack injection 1-2 days, concrete cutting 1-3 days, structural alterations 5-10 days, and full building remediation 2-8 weeks. We provide detailed timelines in our quotes and maintain strict project schedules to minimize disruption. Most residential repairs complete within 1 week.',
    category: 'process',
    keywords: ['remediation timeframe', 'how long concrete repair', 'structural work duration Sydney']
  },
  {
    id: 'site-disruption',
    question: 'Will work disrupt my business or residence?',
    answer: 'We minimize disruption through careful planning, dust control systems, noise reduction, and flexible scheduling including after-hours work. For commercial projects, we coordinate around business hours. Concrete cutting uses water suppression for dust-free operation. Most crack injection and scanning work causes minimal disruption.',
    category: 'process',
    keywords: ['minimal disruption concrete work', 'business-friendly remediation', 'quiet concrete services']
  },
  {
    id: 'equipment-used',
    question: 'What equipment and materials do you use?',
    answer: 'We use professional-grade equipment: Hilti diamond saws for cutting, Desoi/Hilti injection pumps, Hilti GPR scanners for slab scanning, and Building Commissioner-approved epoxy resins (Sika, BASF) and grouts. All materials meet Australian Standards AS 3600/AS 3958 for structural concrete repair.',
    category: 'process',
    keywords: ['concrete repair equipment', 'epoxy brands used', 'GPR slab scanning']
  },
  {
    id: 'warranty-period',
    question: 'What warranty do you offer on repairs?',
    answer: 'We provide 5-10 year warranties on structural crack injection (epoxy), 3-5 years on waterproofing injection (polyurethane), and 2-5 years on concrete cutting/patching depending on application. All work is Building Commissioner-approved and complies with Australian Standards. Warranties cover materials and workmanship.',
    category: 'process',
    keywords: ['crack repair warranty', 'structural repair guarantee', 'concrete work warranty Sydney']
  },
  {
    id: 'safety-compliance',
    question: 'Are you fully licensed and insured?',
    answer: 'Yes, TRD Remedial holds Building Commissioner approval for structural remediation, $20 million public liability insurance, workers compensation insurance, and all required NSW building licenses. Our team is qualified in working at heights, confined spaces, and adheres to strict OH&S protocols on every job.',
    category: 'process',
    keywords: ['licensed concrete contractor', 'insured remedial services', 'Building Commissioner approved']
  },

  // ==================== TECHNICAL CATEGORY (4 FAQs) ====================
  {
    id: 'epoxy-vs-polyurethane',
    question: 'When do you use epoxy vs polyurethane injection?',
    answer: 'Epoxy injection is used for structural crack repair where strength restoration is critical - it bonds concrete together and can restore 100% structural capacity. Polyurethane injection is used for waterproofing active leaks as it expands and forms flexible seals. We assess each crack and recommend the appropriate material based on structural requirements.',
    category: 'technical',
    keywords: ['epoxy injection', 'polyurethane injection', 'structural crack repair', 'waterproofing injection']
  },
  {
    id: 'crack-causes',
    question: 'What causes concrete cracks?',
    answer: 'Common causes include: structural overload, settlement/foundation movement, shrinkage during curing, thermal expansion/contraction, corrosion of reinforcement steel, freeze-thaw cycles, and poor initial construction. We identify root causes during inspection to prevent recurrence and recommend appropriate remediation methods.',
    category: 'technical',
    keywords: ['why concrete cracks', 'crack causes', 'structural damage reasons']
  },
  {
    id: 'slab-scanning-depth',
    question: 'How deep can slab scanning detect?',
    answer: 'Our GPR (Ground Penetrating Radar) scanning equipment can detect rebar, post-tension cables, conduits, and voids up to 400mm depth in concrete slabs with 99.9% accuracy. We provide on-site marking of findings and detailed scan reports. Essential before any cutting or coring to prevent costly damage to embedded services.',
    category: 'technical',
    keywords: ['GPR scanning depth', 'slab scanning accuracy', 'concrete scanning Sydney']
  },
  {
    id: 'carbon-fibre-strengthening',
    question: 'How does carbon fibre strengthening work?',
    answer: 'Carbon Fibre Reinforced Polymer (CFRP) wrapping/plating bonds high-strength carbon fibres to concrete using structural epoxy adhesive. It increases load capacity by 50-200% while adding minimal weight. Ideal for columns, beams, and slabs requiring strength upgrades without increasing dimensions. Provides superior corrosion resistance compared to steel plate bonding.',
    category: 'technical',
    keywords: ['carbon fibre concrete', 'CFRP strengthening', 'concrete strengthening Sydney']
  },

  // ==================== SERVICES CATEGORY (4 FAQs) ====================
  {
    id: 'emergency-services',
    question: 'Do you offer emergency services?',
    answer: 'Yes, TRD Remedial provides 24/7 emergency response for critical structural issues, active water leaks, dangerous spalling, and urgent concrete cutting requirements. Call 0414 727 167 for immediate dispatch. Our emergency team can respond within 2-4 hours across Sydney metro and provide temporary stabilization before permanent repairs.',
    category: 'services',
    keywords: ['emergency concrete repair', '24/7 remedial services', 'urgent structural repair Sydney']
  },
  {
    id: 'service-areas',
    question: 'What areas do you service?',
    answer: 'We service all Sydney metropolitan areas: CBD, Eastern Suburbs, Northern Beaches, North Shore, Inner West, Western Sydney, South Sydney, Hills District, and Sutherland Shire. We also travel to Central Coast, Newcastle, Wollongong, and regional NSW for large commercial projects. Contact us for availability in your area.',
    category: 'services',
    keywords: ['Sydney remedial services', 'concrete repair areas', 'structural repair coverage']
  },
  {
    id: 'commercial-vs-residential',
    question: 'Do you handle both commercial and residential projects?',
    answer: 'Yes, we service residential homes, commercial buildings, high-rise towers, warehouses, carparks, and infrastructure projects. Our team scales from small crack repairs to multi-million dollar structural remediation projects. Recent projects include Barangaroo towers, Sydney Metro, and 500+ residential repairs.',
    category: 'services',
    keywords: ['commercial concrete repair', 'residential remediation', 'high-rise structural work']
  },
  {
    id: 'ongoing-maintenance',
    question: 'Do you offer ongoing maintenance contracts?',
    answer: 'Yes, we provide annual/bi-annual maintenance contracts for commercial buildings, strata complexes, and industrial facilities. Services include crack monitoring, sealant replacement, concrete patching, and preventative inspections. Maintenance contracts include priority scheduling, discounted rates, and detailed reporting for building managers.',
    category: 'services',
    keywords: ['concrete maintenance contract', 'building remediation maintenance', 'preventative concrete care']
  }
];

// Helper function to get FAQs by category
export function getFAQsByCategory(category: FAQItem['category']): FAQItem[] {
  return FAQS.filter(faq => faq.category === category);
}

// Helper function to get all categories
export function getFAQCategories(): FAQItem['category'][] {
  return ['process', 'technical', 'services'];
}

// Statistics
export const FAQ_STATS = {
  total: FAQS.length,
  byCategory: {
    process: getFAQsByCategory('process').length,
    technical: getFAQsByCategory('technical').length,
    services: getFAQsByCategory('services').length,
  },
  averageAnswerLength: Math.round(
    FAQS.reduce((sum, faq) => sum + faq.answer.split(' ').length, 0) / FAQS.length
  ),
};
