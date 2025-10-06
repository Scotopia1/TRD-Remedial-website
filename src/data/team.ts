export interface TeamMember {
  id: string;
  name: string;
  title: string;
  roles: string[];
  expertise: string[];
  bio: string;
  image: string;
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
    image: '/images/team/christopher-nassif.png',
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
    image: '/images/team/charly-nassif.png',
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
    image: '/images/team/fahed-nassif.png',
    linkedIn: '#',
  },
];
