export interface ServiceStat {
  value: string;
  label: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  benefits: string[];
  icon: string;
  visual: string;
  heroImage?: string;
  featureImage?: string;
  processImage?: string;
  detailPage?: string;
  stats?: ServiceStat[];
  process?: ProcessStep[];
  relatedProjects?: string[];
}

export const SERVICES: Service[] = [
  {
    id: 'structural-remedial',
    slug: 'structural-remedial-works',
    title: 'Structural Remedial Works',
    tagline: 'Comprehensive restoration and repair',
    description: 'Expert crack injection, concrete patching, and structural surface restoration services. We address concrete degradation with precision and lasting solutions.',
    features: [
      'Crack injection and sealing',
      'Concrete patching and repair',
      'Surface restoration',
      'Structural strengthening',
    ],
    benefits: [
      'Extended structure lifespan',
      'Prevents water ingress and further damage',
      'Restores structural integrity',
      'Cost-effective compared to replacement',
    ],
    icon: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=100&h=100&fit=crop',
    visual: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop',
    heroImage: '/images/services/structural-remedial-hero.jpg',
    featureImage: '/images/services/structural-remedial-feature.jpg',
    processImage: '/images/services/structural-remedial-process.jpg',
    stats: [
      { value: '2,500+', label: 'Meters Repaired' },
      { value: '98%', label: 'Success Rate' },
      { value: '24/7', label: 'Emergency Response' },
    ],
    process: [
      { step: 1, title: 'Assessment', description: 'Detailed structural inspection and damage assessment' },
      { step: 2, title: 'Planning', description: 'Custom repair strategy development' },
      { step: 3, title: 'Execution', description: 'Professional repair implementation' },
      { step: 4, title: 'Verification', description: 'Quality control and testing' },
    ],
    relatedProjects: ['project-1', 'project-2'],
  },
  {
    id: 'concrete-cutting',
    slug: 'concrete-cutting-coring',
    title: 'Concrete Cutting & Coring',
    tagline: 'Precision cutting technology',
    description: 'Professional wall sawing, floor cutting, and core drilling services with state-of-the-art equipment for accurate, dust-controlled operations.',
    features: [
      'Wall sawing',
      'Floor cutting',
      'Core drilling',
      'Precision cutting work',
    ],
    benefits: [
      'Minimal dust and noise',
      'Precise cut dimensions',
      'Fast turnaround times',
      'Suitable for occupied buildings',
    ],
    icon: 'https://images.unsplash.com/photo-1581092918484-8313e01f50e2?w=100&h=100&fit=crop',
    visual: 'https://images.unsplash.com/photo-1581092918484-8313e01f50e2?w=800&h=600&fit=crop',
    heroImage: '/images/services/concrete-cutting-hero.jpg',
    featureImage: '/images/services/concrete-cutting-feature.jpg',
    processImage: '/images/services/concrete-cutting-process.jpg',
    stats: [
      { value: '1,000+', label: 'Cores Drilled' },
      { value: '±1mm', label: 'Cutting Precision' },
      { value: '10+', label: 'Years Experience' },
    ],
    process: [
      { step: 1, title: 'Site Survey', description: 'Assess cutting requirements and site conditions' },
      { step: 2, title: 'Setup', description: 'Position equipment and safety measures' },
      { step: 3, title: 'Cutting', description: 'Execute precise cutting operations' },
      { step: 4, title: 'Cleanup', description: 'Remove debris and restore site' },
    ],
    relatedProjects: ['project-3', 'project-4'],
  },
  {
    id: 'carbon-fibre',
    slug: 'carbon-fibre-reinforcement',
    title: 'Carbon Fibre Reinforcement',
    tagline: 'Advanced structural strengthening',
    description: 'Cutting-edge carbon fiber technology for non-invasive structural strengthening. Increase load capacity without adding bulk or weight to existing structures.',
    features: [
      'Structural strengthening',
      'Carbon fiber application',
      'Load capacity enhancement',
      'Non-invasive reinforcement',
    ],
    benefits: [
      'Minimal structural disruption',
      'Lightweight reinforcement',
      'Corrosion resistant',
      'Long-lasting solution',
    ],
    icon: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=100&h=100&fit=crop',
    visual: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=800&h=600&fit=crop',
    heroImage: '/images/services/carbon-fibre-hero.jpg',
    featureImage: '/images/services/carbon-fibre-feature.jpg',
    processImage: '/images/services/carbon-fibre-process.jpg',
    stats: [
      { value: '300%', label: 'Strength Increase' },
      { value: '50+', label: 'Years Lifespan' },
      { value: '100%', label: 'Success Rate' },
    ],
    process: [
      { step: 1, title: 'Structural Analysis', description: 'Calculate load requirements and fiber specifications' },
      { step: 2, title: 'Surface Prep', description: 'Clean and prepare concrete surface' },
      { step: 3, title: 'Fiber Application', description: 'Apply carbon fiber sheets with epoxy resin' },
      { step: 4, title: 'Curing & Testing', description: 'Allow curing and perform load tests' },
    ],
    relatedProjects: ['project-5', 'project-6'],
  },
  {
    id: 'slab-scanning',
    slug: 'slab-scanning-imaging',
    title: 'Slab Scanning & Concrete Imaging',
    tagline: 'See beneath the surface',
    description: 'Advanced GPR scanning and concrete imaging for non-invasive diagnostics. Locate post-tension cables, rebar, conduits, and voids before cutting or drilling.',
    features: [
      'Ground-penetrating radar (GPR)',
      'Concrete imaging',
      'Non-invasive diagnostics',
      '3D structural mapping',
    ],
    benefits: [
      'Prevent costly damage',
      'Accurate utility location',
      'Safe cutting operations',
      'Detailed structural data',
    ],
    icon: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=100&h=100&fit=crop',
    visual: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop',
    heroImage: '/images/services/slab-scanning-hero.jpg',
    featureImage: '/images/services/slab-scanning-feature.jpg',
    processImage: '/images/services/slab-scanning-process.jpg',
    stats: [
      { value: '500+', label: 'Scans Completed' },
      { value: '99%', label: 'Detection Accuracy' },
      { value: '300mm', label: 'Depth Penetration' },
    ],
    process: [
      { step: 1, title: 'Site Prep', description: 'Mark scan areas and set up equipment' },
      { step: 2, title: 'Scanning', description: 'Perform GPR passes across target areas' },
      { step: 3, title: 'Data Analysis', description: 'Interpret radar data and create maps' },
      { step: 4, title: 'Reporting', description: 'Deliver detailed scan reports with markings' },
    ],
    relatedProjects: ['project-7', 'project-8'],
  },
  {
    id: 'safety-fixtures',
    slug: 'safety-fixture-installation',
    title: 'Safety Fixture Installation',
    tagline: 'Compliance and protection',
    description: 'Professional installation of handrails, balustrades, and height safety systems. Ensure compliance with AS standards and protect your workforce.',
    features: [
      'Handrail installation',
      'Height safety systems',
      'Fall protection equipment',
      'Compliance with safety standards',
    ],
    benefits: [
      'Meet AS/NZS standards',
      'Reduce workplace accidents',
      'Professional certification',
      'Durable installations',
    ],
    icon: 'https://images.unsplash.com/photo-1503328427499-d92d414d0f41?w=100&h=100&fit=crop',
    visual: 'https://images.unsplash.com/photo-1503328427499-d92d414d0f41?w=800&h=600&fit=crop',
    heroImage: '/images/services/safety-fixtures-hero.jpg',
    featureImage: '/images/services/safety-fixtures-feature.jpg',
    processImage: '/images/services/safety-fixtures-process.jpg',
    stats: [
      { value: '200+', label: 'Installations' },
      { value: '100%', label: 'AS Compliant' },
      { value: 'Zero', label: 'Failures Recorded' },
    ],
    process: [
      { step: 1, title: 'Site Assessment', description: 'Identify safety requirements and regulations' },
      { step: 2, title: 'Design', description: 'Engineer compliant safety systems' },
      { step: 3, title: 'Installation', description: 'Professionally install fixtures' },
      { step: 4, title: 'Certification', description: 'Provide compliance documentation' },
    ],
    relatedProjects: ['project-9', 'project-10'],
  },
  {
    id: 'carpark-solutions',
    slug: 'carpark-line-marking',
    title: 'Carpark Line Marking & Fit-outs',
    tagline: 'Complete carpark solutions',
    description: 'Professional line marking, surface preparation, and complete carpark fit-out services. Transform your parking facility with clear, durable markings.',
    features: [
      'Line marking',
      'Carpark design',
      'Surface preparation',
      'Complete fit-out solutions',
    ],
    benefits: [
      'Improved traffic flow',
      'Enhanced safety',
      'Durable markings',
      'Compliance with standards',
    ],
    icon: 'https://images.unsplash.com/photo-1486406146456-8edd19c34d82?w=100&h=100&fit=crop',
    visual: 'https://images.unsplash.com/photo-1486406146456-8edd19c34d82?w=800&h=600&fit=crop',
    heroImage: '/images/services/carpark-hero.jpg',
    featureImage: '/images/services/carpark-feature.jpg',
    processImage: '/images/services/carpark-process.jpg',
    stats: [
      { value: '50+', label: 'Carparks Completed' },
      { value: '5,000+', label: 'Bays Marked' },
      { value: '10yr', label: 'Marking Warranty' },
    ],
    process: [
      { step: 1, title: 'Design', description: 'Plan layout and optimize space usage' },
      { step: 2, title: 'Surface Prep', description: 'Clean and repair carpark surface' },
      { step: 3, title: 'Marking', description: 'Apply high-durability line markings' },
      { step: 4, title: 'Signage', description: 'Install directional and safety signage' },
    ],
    relatedProjects: ['project-11', 'project-12'],
  },
];
