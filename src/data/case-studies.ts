export interface CaseStudy {
  id: string;
  title: string;
  location: string;
  challenge: string;
  solution: string[];
  result: string;
  metrics: { label: string; value: string }[];
  images: { before: string; after: string }[];
  visual: 'timeline' | 'slider' | '3d-visualization';
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'one-the-waterfront',
    title: 'One The Waterfront',
    location: 'Wentworth Point, Sydney',
    challenge: 'Masscon acquired an abandoned, partially completed complex requiring full structural reconfiguration — more levels, more units, column removals, and new vertical circulation — with neighbouring buildings fully occupied',
    solution: [
      '2,000 core holes drilled across the project',
      '5,000 linear metres of concrete cutting through 5 levels',
      '40 columns removed with full propping and temporary works',
      'Full stormwater pipe relining in Basement 4',
    ],
    result: 'Completed in 5 weeks — zero incidents, zero delays, zero disruption to neighbouring occupied buildings',
    metrics: [
      { label: 'Core Holes', value: '2,000' },
      { label: 'Linear Metres Cut', value: '5,000' },
      { label: 'Columns Removed', value: '40' },
    ],
    images: [
      {
        before: '/images/case-studies/waterfront-before.webp',
        after: '/images/case-studies/waterfront-after.webp',
      },
    ],
    visual: 'timeline',
  },
  {
    id: 'portico-plaza',
    title: 'Portico Plaza Shopping Centre',
    location: 'Sydney',
    challenge: '2,500m of structural cracks threatening building integrity and compliance',
    solution: [
      'Complete crack injection program',
      '300sqm concrete restoration',
      'Structural compliance verification',
      'Long-term integrity assurance',
    ],
    result: 'Asset positioned for successful sale with full structural certification',
    metrics: [
      { label: 'Cracks Repaired', value: '2,500m' },
      { label: 'Concrete Restored', value: '300sqm' },
    ],
    images: [
      {
        before: '/images/case-studies/portico-before.webp',
        after: '/images/case-studies/portico-after.webp',
      },
    ],
    visual: 'slider',
  },
  {
    id: 'greenway-gosford',
    title: 'Greenway Gosford',
    location: 'Gosford',
    challenge: 'Slab deflection with potential structural failure risk',
    solution: [
      'Tailored carbon fiber reinforcement system',
      'Structural load analysis',
      'Precision fiber application',
      'Ongoing monitoring protocol',
    ],
    result: 'Restored structural integrity with zero operational compromise',
    metrics: [
      { label: 'Carbon Fiber Applied', value: 'Custom Solution' },
      { label: 'Operational Downtime', value: 'Minimal' },
    ],
    images: [
      {
        before: '/images/case-studies/greenway-before.webp',
        after: '/images/case-studies/greenway-after.webp',
      },
    ],
    visual: '3d-visualization',
  },
];
