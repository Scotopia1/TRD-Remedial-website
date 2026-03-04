export interface TeamMember {
  id: string;
  name: string;
  title: string;
  roles: string[];
  expertise: string[];
  bio: string;
  image: string;
  blurDataURL?: string;
  linkedIn?: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'christopher-nassif',
    name: 'Christopher Nassif',
    title: 'Director | Architect | Division Manager',
    roles: ['Director', 'Architect', 'Division Manager'],
    expertise: [
      'Future-focused vision',
      'Architectural integration expertise',
      'Combined design and site execution experience',
      'Strategic project planning',
    ],
    bio: 'Christopher brings a unique combination of architectural design expertise and on-site execution experience. His future-focused vision drives TRD\'s innovative approach to structural remediation, ensuring every project meets both aesthetic and structural requirements.',
    image: '/images/team/christopher-nassif.webp',
    blurDataURL: 'data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAADQAQCdASoKAA0ABUB8JaQAAtz+n6IegAD+6I/rCVXNH2aEKVs+t1c6xQplqQWAf5RBTsjv0Zz2gXKwFuRAjHKU4AA=',
    linkedIn: '#',
  },
  {
    id: 'charly-nassif',
    name: 'Charly Nassif',
    title: 'Builder & Director',
    roles: ['Licensed Builder', 'Director'],
    expertise: [
      'Licensed builder credentials',
      'Construction leadership background',
      'Results-driven approach',
      'Safety-focused management',
      'Game-changing outcomes',
    ],
    bio: 'As a licensed builder with extensive construction leadership experience, Charly ensures every TRD project is executed with precision and safety. His results-driven approach has consistently delivered game-changing outcomes for complex structural challenges.',
    image: '/images/team/charly-nassif.webp',
    blurDataURL: 'data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAADQAQCdASoKAA0ABUB8JaQAAtz4P/TEAAD+6KC00GkgBiRdnInc1/oI5aJgeCK7X2OVjGO/Vn6VM24rFVrWHCt5dswTG4AA',
    linkedIn: '#',
  },
  {
    id: 'fahed-nassif',
    name: 'Fahed Nassif',
    title: 'Lead Structural Engineer',
    roles: ['Lead Structural Engineer'],
    expertise: [
      'Technical command',
      'Structural insight',
      'Precision engineering',
      'Problem-solving reputation',
      'Innovative structural solutions',
    ],
    bio: 'Fahed\'s technical command and deep structural insight make him the cornerstone of TRD\'s engineering excellence. Known for precision and innovative problem-solving, he tackles the most complex structural challenges with confidence and expertise.',
    image: '/images/team/fahed-nassif.webp',
    blurDataURL: 'data:image/webp;base64,UklGRlQAAABXRUJQVlA4IEgAAAAQAgCdASoKAA0ABUB8JaQAD4xwNgBM9PaAAP7ooLOTlwTjlGlfJSaJw4eMpQ5pTXLPDXaCnsdeK4degx1hCkCFTYRVo4vAAAA=',
    linkedIn: '#',
  },
];

export interface CompanyValue {
  id: string;
  title: string;
  description: string;
  image?: string;
  isText?: boolean;
}

export const COMPANY_VALUES: CompanyValue[] = [
  {
    id: 'value-001',
    title: 'PRECISION',
    description: 'Every measurement, every cut, every repair executed with meticulous attention to detail.',
    isText: true,
  },
  {
    id: 'value-002',
    title: '',
    description: '',
    image: '/images/projects/pelican-road-schofields/featured.jpg',
  },
  {
    id: 'value-003',
    title: 'SAFETY',
    description: 'Zero-compromise approach to worker and occupant safety on every project.',
    isText: true,
  },
  {
    id: 'value-004',
    title: '',
    description: '',
    image: '/images/projects/waitara-multi-service/featured.jpg',
  },
  {
    id: 'value-005',
    title: 'INNOVATION',
    description: 'Leveraging cutting-edge technology and methods for superior structural solutions.',
    isText: true,
  },
  {
    id: 'value-006',
    title: '',
    description: '',
    image: '/images/projects/rouse-hill-slab-scanning/featured.jpg',
  },
  {
    id: 'value-007',
    title: 'INTEGRITY',
    description: 'Honest assessments, transparent communication, and ethical practices always.',
    isText: true,
  },
  {
    id: 'value-008',
    title: '',
    description: '',
    image: '/images/projects/enfield-curtain-wall/featured.jpg',
  },
];
