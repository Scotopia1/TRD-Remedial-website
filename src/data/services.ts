export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
  visual: string;
  detailPage?: string;
}

export const SERVICES: Service[] = [
  {
    id: 'structural-remedial',
    title: 'Structural Remedial Works',
    description: 'Comprehensive crack injection, concrete patching, and surface restoration services',
    features: [
      'Crack injection and sealing',
      'Concrete patching and repair',
      'Surface restoration',
      'Structural strengthening',
    ],
    icon: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=100&h=100&fit=crop',
    visual: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop',
  },
  {
    id: 'concrete-cutting',
    title: 'Concrete Cutting & Coring',
    description: 'Precision wall sawing, floor cutting, and coring services',
    features: [
      'Wall sawing',
      'Floor cutting',
      'Core drilling',
      'Precision cutting work',
    ],
    icon: 'https://images.unsplash.com/photo-1581092918484-8313e01f50e2?w=100&h=100&fit=crop',
    visual: 'https://images.unsplash.com/photo-1581092918484-8313e01f50e2?w=800&h=600&fit=crop',
  },
  {
    id: 'carbon-fibre',
    title: 'Carbon Fibre Reinforcement',
    description: 'Advanced structural strengthening using carbon fiber technology',
    features: [
      'Structural strengthening',
      'Carbon fiber application',
      'Load capacity enhancement',
      'Non-invasive reinforcement',
    ],
    icon: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=100&h=100&fit=crop',
    visual: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=800&h=600&fit=crop',
  },
  {
    id: 'slab-scanning',
    title: 'Slab Scanning & Concrete Imaging',
    description: 'GPR scanning and non-invasive diagnostic services',
    features: [
      'Ground-penetrating radar (GPR)',
      'Concrete imaging',
      'Non-invasive diagnostics',
      '3D structural mapping',
    ],
    icon: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=100&h=100&fit=crop',
    visual: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop',
  },
  {
    id: 'safety-fixtures',
    title: 'Safety Fixture Installation',
    description: 'Professional installation of handrails and height safety systems',
    features: [
      'Handrail installation',
      'Height safety systems',
      'Fall protection equipment',
      'Compliance with safety standards',
    ],
    icon: 'https://images.unsplash.com/photo-1503328427499-d92d414d0f41?w=100&h=100&fit=crop',
    visual: 'https://images.unsplash.com/photo-1503328427499-d92d414d0f41?w=800&h=600&fit=crop',
  },
  {
    id: 'carpark-solutions',
    title: 'Carpark Line Marking & Fit-outs',
    description: 'Complete carpark solutions and line marking services',
    features: [
      'Line marking',
      'Carpark design',
      'Surface preparation',
      'Complete fit-out solutions',
    ],
    icon: 'https://images.unsplash.com/photo-1486406146456-8edd19c34d82?w=100&h=100&fit=crop',
    visual: 'https://images.unsplash.com/photo-1486406146456-8edd19c34d82?w=800&h=600&fit=crop',
  },
];
