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
    id: 'crack-injection',
    slug: 'crack-injection',
    title: 'Crack Injection',
    tagline: 'Precision sealing and structural repair',
    description: 'Specialized crack injection services to seal and bond concrete cracks. We use high-quality resins and grouts to restore structural integrity and prevent water ingress.',
    features: [
      'Epoxy injection',
      'Polyurethane injection',
      'Structural bonding',
      'Leak sealing',
    ],
    benefits: [
      'Restores structural strength',
      'Waterproofs cracks',
      'Prevents corrosion',
      'Cost-effective repair',
    ],
    icon: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=100&h=100&fit=crop',
    visual: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop',
    heroImage: '/images/services/crack-injection-hero.jpg',
    featureImage: '/images/services/crack-injection-feature.jpg',
    processImage: '/images/services/crack-injection-process.jpg',
    stats: [
      { value: '5,000+', label: 'Meters Injected' },
      { value: '100%', label: 'Seal Success' },
      { value: '15+', label: 'Years Experience' },
    ],
    process: [
      { step: 1, title: 'Inspection', description: 'Assess crack width, depth, and cause' },
      { step: 2, title: 'Preparation', description: 'Clean crack and install injection ports' },
      { step: 3, title: 'Injection', description: 'Inject resin or grout at controlled pressure' },
      { step: 4, title: 'Finishing', description: 'Remove ports and seal surface' },
    ],
    relatedProjects: ['project-1'],
  },
  {
    id: 'concrete-cutting',
    slug: 'concrete-cutting',
    title: 'Concrete Cutting',
    tagline: 'Precision cutting and coring',
    description: 'Professional concrete cutting services including wall sawing, floor sawing, and core drilling. We deliver precise cuts with minimal dust and disruption.',
    features: [
      'Wall sawing',
      'Floor sawing',
      'Core drilling',
      'Expansion joints',
    ],
    benefits: [
      'Precise dimensions',
      'Dust control',
      'Structural safety',
      'Efficient execution',
    ],
    icon: 'https://images.unsplash.com/photo-1581092918484-8313e01f50e2?w=100&h=100&fit=crop',
    visual: 'https://images.unsplash.com/photo-1581092918484-8313e01f50e2?w=800&h=600&fit=crop',
    heroImage: '/images/services/concrete-cutting-hero.jpg',
    featureImage: '/images/services/concrete-cutting-feature.jpg',
    processImage: '/images/services/concrete-cutting-process.jpg',
    stats: [
      { value: '10,000+', label: 'Cuts Made' },
      { value: '±1mm', label: 'Precision' },
      { value: '24/7', label: 'Availability' },
    ],
    process: [
      { step: 1, title: 'Marking', description: 'Layout cut lines according to plans' },
      { step: 2, title: 'Setup', description: 'Position saws and safety equipment' },
      { step: 3, title: 'Cutting', description: 'Execute cuts with water control' },
      { step: 4, title: 'Removal', description: 'Remove concrete blocks and slurry' },
    ],
    relatedProjects: ['project-3'],
  },
  {
    id: 'crack-repairs',
    slug: 'crack-repairs',
    title: 'Crack Repairs',
    tagline: 'Comprehensive surface restoration',
    description: 'General concrete crack repair and surface patching. We address spalling, surface cracks, and cosmetic defects to improve aesthetics and durability.',
    features: [
      'Concrete patching',
      'Spall repair',
      'Surface rendering',
      'Cosmetic restoration',
    ],
    benefits: [
      'Improved appearance',
      'Surface protection',
      'Safety hazard removal',
      'Extended durability',
    ],
    icon: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=100&h=100&fit=crop',
    visual: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=800&h=600&fit=crop',
    heroImage: '/images/services/crack-repairs-hero.jpg',
    featureImage: '/images/services/crack-repairs-feature.jpg',
    processImage: '/images/services/crack-repairs-process.jpg',
    stats: [
      { value: '2,000+', label: 'Repairs' },
      { value: '10yr', label: 'Warranty' },
      { value: '100%', label: 'Client Satisfaction' },
    ],
    process: [
      { step: 1, title: 'Clean', description: 'Remove loose concrete and debris' },
      { step: 2, title: 'Prime', description: 'Apply bonding agent' },
      { step: 3, title: 'Patch', description: 'Apply repair mortar' },
      { step: 4, title: 'Finish', description: 'Texture and match existing surface' },
    ],
    relatedProjects: ['project-2'],
  },
  {
    id: 'structural-alterations',
    slug: 'structural-alterations',
    title: 'Structural Alterations',
    tagline: 'Modifying structures safely',
    description: 'Expert structural alteration services including opening creation, wall removal, and structural support modification. We ensure stability during all alteration works.',
    features: [
      'Wall removal',
      'Opening creation',
      'Beam installation',
      'Propping and support',
    ],
    benefits: [
      'Space optimization',
      'Structural safety',
      'Code compliance',
      'Seamless integration',
    ],
    icon: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=100&h=100&fit=crop',
    visual: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop',
    heroImage: '/images/services/structural-alterations-hero.jpg',
    featureImage: '/images/services/structural-alterations-feature.jpg',
    processImage: '/images/services/structural-alterations-process.jpg',
    stats: [
      { value: '500+', label: 'Projects' },
      { value: '0', label: 'Incidents' },
      { value: 'Certified', label: 'Engineers' },
    ],
    process: [
      { step: 1, title: 'Engineering', description: 'Review structural drawings and plans' },
      { step: 2, title: 'Propping', description: 'Install temporary supports' },
      { step: 3, title: 'Demolition', description: 'Remove targeted structural elements' },
      { step: 4, title: 'Installation', description: 'Install new beams or supports' },
    ],
    relatedProjects: ['project-5'],
  },
  {
    id: 'slab-scanning',
    slug: 'slab-scanning',
    title: 'Slab Scanning',
    tagline: 'Non-destructive testing',
    description: 'Advanced GPR slab scanning to locate rebar, post-tension cables, and services before cutting. Ensure safety and prevent costly damage.',
    features: [
      'GPR scanning',
      'Rebar location',
      'Service detection',
      'Void detection',
    ],
    benefits: [
      'Risk mitigation',
      'Accurate mapping',
      'Immediate results',
      'Non-destructive',
    ],
    icon: 'https://images.unsplash.com/photo-1503328427499-d92d414d0f41?w=100&h=100&fit=crop',
    visual: 'https://images.unsplash.com/photo-1503328427499-d92d414d0f41?w=800&h=600&fit=crop',
    heroImage: '/images/services/slab-scanning-hero.jpg',
    featureImage: '/images/services/slab-scanning-feature.jpg',
    processImage: '/images/services/slab-scanning-process.jpg',
    stats: [
      { value: '99.9%', label: 'Accuracy' },
      { value: '1,000+', label: 'Scans' },
      { value: '400mm', label: 'Depth' },
    ],
    process: [
      { step: 1, title: 'Grid Setup', description: 'Mark out scanning grid' },
      { step: 2, title: 'Scan', description: 'Perform GPR scan passes' },
      { step: 3, title: 'Analyze', description: 'Interpret data on-site' },
      { step: 4, title: 'Mark', description: 'Mark findings directly on slab' },
    ],
    relatedProjects: ['project-7'],
  },
  {
    id: 'temporary-moving-joints',
    slug: 'temporary-moving-joints',
    title: 'Temporary Moving Joints',
    tagline: 'Flexible joint solutions',
    description: 'Installation and maintenance of temporary movement joints for construction phases. Allow for thermal expansion and contraction during building works.',
    features: [
      'Joint installation',
      'Movement monitoring',
      'Sealant application',
      'Temporary bridging',
    ],
    benefits: [
      'Prevents cracking',
      'Accommodates movement',
      'Protects structure',
      'Construction flexibility',
    ],
    icon: 'https://images.unsplash.com/photo-1486406146456-8edd19c34d82?w=100&h=100&fit=crop',
    visual: 'https://images.unsplash.com/photo-1486406146456-8edd19c34d82?w=800&h=600&fit=crop',
    heroImage: '/images/services/moving-joints-hero.jpg',
    featureImage: '/images/services/moving-joints-feature.jpg',
    processImage: '/images/services/moving-joints-process.jpg',
    stats: [
      { value: '100+', label: 'Joints Installed' },
      { value: '50mm+', label: 'Movement Capacity' },
      { value: 'Custom', label: 'Solutions' },
    ],
    process: [
      { step: 1, title: 'Design', description: 'Calculate movement requirements' },
      { step: 2, title: 'Install', description: 'Place temporary joint systems' },
      { step: 3, title: 'Monitor', description: 'Check performance during works' },
      { step: 4, title: 'Remove', description: 'Remove or finalize joints' },
    ],
    relatedProjects: ['project-9'],
  },
  {
    id: 'concrete-strengthening',
    slug: 'concrete-strengthening',
    title: 'Concrete Strengthening',
    tagline: 'Enhancing load capacity',
    description: 'Structural strengthening using carbon fibre (CFRP) and steel plate bonding. Increase the load-bearing capacity of existing concrete structures.',
    features: [
      'Carbon fibre wrapping',
      'Steel plate bonding',
      'Column jacketing',
      'Beam strengthening',
    ],
    benefits: [
      'Increased capacity',
      'Minimal weight add',
      'Corrosion resistance',
      'Versatile application',
    ],
    icon: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=100&h=100&fit=crop',
    visual: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop',
    heroImage: '/images/services/concrete-strengthening-hero.jpg',
    featureImage: '/images/services/concrete-strengthening-feature.jpg',
    processImage: '/images/services/concrete-strengthening-process.jpg',
    stats: [
      { value: '200%', label: 'Strength Gain' },
      { value: 'Light', label: 'Weight' },
      { value: 'Fast', label: 'Installation' },
    ],
    process: [
      { step: 1, title: 'Prep', description: 'Grind and clean surface' },
      { step: 2, title: 'Adhesive', description: 'Apply structural epoxy' },
      { step: 3, title: 'Install', description: 'Apply CFRP or steel plates' },
      { step: 4, title: 'Cure', description: 'Allow adhesive to cure fully' },
    ],
    relatedProjects: ['project-6'],
  },
  {
    id: 'curtain-wall-injection',
    slug: 'curtain-wall-injection',
    title: 'Curtain Wall Injection',
    tagline: 'Waterproofing below ground',
    description: 'Curtain injection grouting to waterproof below-grade structures. Create a waterproof barrier behind walls without excavation.',
    features: [
      'Gel injection',
      'Soil stabilization',
      'Basement waterproofing',
      'Leak stopping',
    ],
    benefits: [
      'No excavation needed',
      'Total waterproofing',
      'Quick application',
      'Permanent solution',
    ],
    icon: 'https://images.unsplash.com/photo-1581092918484-8313e01f50e2?w=100&h=100&fit=crop',
    visual: 'https://images.unsplash.com/photo-1581092918484-8313e01f50e2?w=800&h=600&fit=crop',
    heroImage: '/images/services/curtain-wall-hero.jpg',
    featureImage: '/images/services/curtain-wall-feature.jpg',
    processImage: '/images/services/curtain-wall-process.jpg',
    stats: [
      { value: '100%', label: 'Waterproof' },
      { value: '3yr', label: 'Guarantee' },
      { value: 'Deep', label: 'Penetration' },
    ],
    process: [
      { step: 1, title: 'Drill', description: 'Drill grid of injection holes' },
      { step: 2, title: 'Inject', description: 'Inject gel behind the wall' },
      { step: 3, title: 'Barrier', description: 'Gel forms waterproof curtain' },
      { step: 4, title: 'Seal', description: 'Plug holes and finish' },
    ],
    relatedProjects: ['project-11'],
  },
  {
    id: 'shoring-wall-repairs',
    slug: 'shoring-wall-repairs',
    title: 'Shoring Wall Repairs',
    tagline: 'Retaining wall restoration',
    description: 'Repair and stabilization of shoring and retaining walls. We address structural issues, drainage problems, and surface deterioration.',
    features: [
      'Shotcrete repair',
      'Anchor testing',
      'Drainage improvement',
      'Structural stabilization',
    ],
    benefits: [
      'Wall stability',
      'Erosion control',
      'Extended lifespan',
      'Safety compliance',
    ],
    icon: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=100&h=100&fit=crop',
    visual: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=800&h=600&fit=crop',
    heroImage: '/images/services/shoring-wall-hero.jpg',
    featureImage: '/images/services/shoring-wall-feature.jpg',
    processImage: '/images/services/shoring-wall-process.jpg',
    stats: [
      { value: 'Stable', label: 'Results' },
      { value: 'Expert', label: 'Team' },
      { value: 'Safe', label: 'Sites' },
    ],
    process: [
      { step: 1, title: 'Assess', description: 'Inspect wall condition' },
      { step: 2, title: 'Stabilize', description: 'Install temporary support if needed' },
      { step: 3, title: 'Repair', description: 'Apply shotcrete or fix anchors' },
      { step: 4, title: 'Drain', description: 'Ensure proper drainage' },
    ],
    relatedProjects: ['project-12'],
  },
];
