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
    location: 'Sydney Olympic Park',
    challenge: 'Stalled development with Building Commissioner stop-work order due to structural compliance issues',
    solution: [
      '40 columns removed with precision',
      '4 slabs cut to specifications',
      '3,000m of drainage system installed',
      'Comprehensive structural remediation',
    ],
    result: 'Stop-work order lifted, development proceeding successfully',
    metrics: [
      { label: 'Columns Removed', value: '40' },
      { label: 'Slabs Cut', value: '4' },
      { label: 'Drainage Installed', value: '3,000m' },
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
  {
    id: 'florence-capri-structural',
    title: 'Florence & Capri Complex Structural Alterations',
    location: 'Wentworth Point, Sydney',
    challenge: 'Large-scale structural alterations required across multiple levels of a residential complex, including shoring wall modifications and suspended slab reinforcement',
    solution: [
      'Comprehensive structural assessment and engineering review',
      'Precision concrete cutting for wall modifications',
      'Carbon fibre reinforcement installation',
      'Shoring wall repair and waterproofing',
    ],
    result: 'All structural modifications completed on schedule with full engineering certification and zero defects',
    metrics: [
      { label: 'Levels Modified', value: '4' },
      { label: 'Structural Cert', value: '100%' },
    ],
    images: [
      {
        before: '/images/projects/florence-capri-complex/before-01.jpg',
        after: '/images/projects/florence-capri-complex/after-01.jpg',
      },
    ],
    visual: 'slider',
  },
];
