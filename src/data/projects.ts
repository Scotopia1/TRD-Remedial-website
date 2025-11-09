export interface ProjectImage {
  url: string;
  alt: string;
  caption?: string;
}

export interface ProjectStat {
  value: string;
  label: string;
}

export interface ProjectTestimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface Project {
  // List view data
  id: string;
  slug: string;
  name: string;
  location: string;
  date: string;
  serviceType: string;
  serviceId: string;
  category: string[];
  featuredImage: string;
  thumbnailImage: string;

  // Detail view data
  tagline: string;
  challenge: string;
  solution: string;
  results: string;
  heroImage: string;
  beforeImage?: ProjectImage;
  afterImage?: ProjectImage;
  galleryImages?: ProjectImage[];
  stats?: ProjectStat[];
  testimonial?: ProjectTestimonial;
  timeline?: string;
  budget?: string;
  teamMembers?: string[];
  relatedProjects?: string[];
}

export const PROJECTS: Project[] = [
  {
    id: 'project-001',
    slug: 'greenacre-plaza-post-tension-repair',
    name: 'Greenacre Plaza Post-Tension Repair',
    location: 'Greenacre, NSW',
    date: 'March 15, 2024',
    serviceType: 'Post Tension Repairs',
    serviceId: 'structural-remedial',
    category: ['Commercial', 'Structural'],
    featuredImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&h=400&fit=crop',
    thumbnailImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=800&fit=crop',
    tagline: 'Critical structural repair on occupied commercial building',
    challenge: 'Greenacre Plaza, a 15-year-old commercial complex, exhibited extensive concrete cracking and spalling. Investigation revealed 40+ deteriorated post-tension cables threatening structural integrity. The building remained fully occupied during assessment, requiring non-invasive diagnostic methods and minimal disruption.',
    solution: 'We implemented a phased repair strategy: GPR scanning identified all compromised cables, systematic inspection documented corrosion extent, specialized injection techniques stabilized existing tendons, and 12 severely damaged cables were replaced using custom-engineered solutions. All work conducted during off-peak hours to maintain business operations.',
    results: 'Successfully restored structural integrity to 100% design capacity. Zero business interruptions during 6-week repair period. Building re-certified for another 50 years of service. Client reported significant insurance premium reduction due to comprehensive documentation and proactive maintenance plan implementation.',
    stats: [
      { value: '40+', label: 'Cables Repaired' },
      { value: '0', label: 'Days Downtime' },
      { value: '100%', label: 'Success Rate' },
    ],
    beforeImage: {
      url: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&h=600&fit=crop',
      alt: 'Before: Cracked concrete ceiling',
      caption: 'Extensive cracking before repair',
    },
    afterImage: {
      url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop',
      alt: 'After: Restored ceiling',
      caption: 'Seamless restoration after treatment',
    },
    testimonial: {
      quote: 'TRD completed this complex repair with zero impact to our tenants. Their professionalism and technical expertise exceeded expectations.',
      author: 'David Chen',
      role: 'Property Manager',
      company: 'Greenacre Commercial Properties',
    },
    timeline: '6 weeks',
    relatedProjects: ['project-002', 'project-003'],
  },
  {
    id: 'project-002',
    slug: 'westfield-carpark-carbon-fibre-strengthening',
    name: 'Westfield Carpark Carbon Fibre Strengthening',
    location: 'Parramatta, NSW',
    date: 'January 20, 2024',
    serviceType: 'Carbon Fibre Reinforcement',
    serviceId: 'carbon-fibre',
    category: ['Commercial', 'Infrastructure'],
    featuredImage: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=1600&h=400&fit=crop',
    thumbnailImage: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=800&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=1200&h=800&fit=crop',
    tagline: 'Non-invasive structural strengthening of 500-bay carpark',
    challenge: 'The 4-level carpark required immediate load capacity upgrade to accommodate modern SUVs and electric vehicles. Traditional strengthening would require 3+ months of closure, costing the mall $2M+ in lost revenue. Structural analysis revealed 200+ columns needed reinforcement.',
    solution: 'Carbon fibre reinforcement provided the perfect solution. We designed a custom wrap pattern for each column type, applied high-strength epoxy resin systems, and installed carbon fibre sheets in precisely calculated layers. The lightweight solution added zero dead load while increasing capacity by 300%.',
    results: 'Carpark remained open throughout the 4-week installation. Load capacity increased from 2.5 to 7.5 tonnes per bay. 50-year design life extension. Client saved $1.8M vs traditional reinforcement methods. Work completed 2 weeks ahead of schedule.',
    stats: [
      { value: '300%', label: 'Strength Increase' },
      { value: '200+', label: 'Columns Strengthened' },
      { value: '4wk', label: 'Completion Time' },
    ],
    beforeImage: {
      url: 'https://images.unsplash.com/photo-1486406146456-8edd19c34d82?w=800&h=600&fit=crop',
      alt: 'Before: Original carpark columns',
      caption: 'Standard columns before reinforcement',
    },
    afterImage: {
      url: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=800&h=600&fit=crop',
      alt: 'After: Carbon fibre wrapped columns',
      caption: 'Columns reinforced with carbon fibre',
    },
    testimonial: {
      quote: 'The carbon fibre solution saved us millions and kept our carpark operational. TRD\'s engineering expertise and efficient execution were remarkable.',
      author: 'Sarah Mitchell',
      role: 'Facilities Director',
      company: 'Westfield Parramatta',
    },
    timeline: '4 weeks',
    relatedProjects: ['project-001', 'project-005'],
  },
  {
    id: 'project-003',
    slug: 'sydney-office-tower-concrete-cutting',
    name: 'Sydney Office Tower Concrete Cutting',
    location: 'Sydney CBD, NSW',
    date: 'November 8, 2023',
    serviceType: 'Concrete Cutting & Coring',
    serviceId: 'concrete-cutting',
    category: ['Commercial', 'Precision'],
    featuredImage: 'https://images.unsplash.com/photo-1581092918484-8313e01f50e2?w=1600&h=400&fit=crop',
    thumbnailImage: 'https://images.unsplash.com/photo-1581092918484-8313e01f50e2?w=800&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1581092918484-8313e01f50e2?w=1200&h=800&fit=crop',
    tagline: 'Precision floor openings for new elevator shaft installation',
    challenge: 'A 32-storey office tower required a new express elevator to improve tenant access. This demanded cutting perfect 3m x 3m openings through 32 post-tensioned concrete slabs without damaging existing structural cables or disrupting occupied floors below.',
    solution: 'Comprehensive GPR scanning mapped all post-tension cables across every floor. Custom cutting patterns avoided all structural elements. Diamond wire sawing executed cuts with ±1mm precision. Dust extraction systems maintained air quality for occupied floors. Night work minimized tenant impact.',
    results: 'All 32 floor openings completed in 8 weeks. Zero cable strikes or structural damage. Dust levels maintained below office air quality standards. Building remained fully occupied throughout project. Elevator installation proceeded on schedule with perfect alignment.',
    stats: [
      { value: '32', label: 'Floors Cut' },
      { value: '±1mm', label: 'Precision' },
      { value: 'Zero', label: 'Structural Damage' },
    ],
    timeline: '8 weeks',
    relatedProjects: ['project-004', 'project-007'],
  },
  {
    id: 'project-004',
    slug: 'bondi-apartment-slab-scanning',
    name: 'Bondi Apartment Complex Slab Scanning',
    location: 'Bondi, NSW',
    date: 'September 22, 2023',
    serviceType: 'Slab Scanning & GPR',
    serviceId: 'slab-scanning',
    category: ['Residential', 'Diagnostic'],
    featuredImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&h=400&fit=crop',
    thumbnailImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=800&fit=crop',
    tagline: 'Comprehensive structural mapping for renovation project',
    challenge: 'Owners of a 1960s Bondi apartment complex planned extensive renovations including new plumbing, electrical, and HVAC systems. Original building plans were incomplete, creating high risk of striking post-tension cables or rebar during core drilling operations.',
    solution: 'We deployed ground-penetrating radar (GPR) across all 45 apartments, scanning every proposed penetration location. Our 3D imaging technology created detailed structural maps showing exact positions of all embedded elements. Color-coded marking on floors indicated safe drilling zones.',
    results: 'Identified 200+ post-tension cables that weren\'t on original plans. Prevented potential catastrophic cable strikes. Saved estimated $500K in emergency repairs. Renovation proceeded with zero structural incidents. Comprehensive documentation provided for future maintenance.',
    stats: [
      { value: '45', label: 'Apartments Scanned' },
      { value: '200+', label: 'Hidden Cables Found' },
      { value: '$500K', label: 'Damages Prevented' },
    ],
    timeline: '2 weeks',
    relatedProjects: ['project-003', 'project-008'],
  },
  {
    id: 'project-005',
    slug: 'olympic-park-safety-handrails',
    name: 'Olympic Park Stadium Safety Handrails',
    location: 'Olympic Park, NSW',
    date: 'July 15, 2023',
    serviceType: 'Safety Fixture Installation',
    serviceId: 'safety-fixtures',
    category: ['Infrastructure', 'Safety'],
    featuredImage: 'https://images.unsplash.com/photo-1503328427499-d92d414d0f41?w=1600&h=400&fit=crop',
    thumbnailImage: 'https://images.unsplash.com/photo-1503328427499-d92d414d0f41?w=800&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1503328427499-d92d414d0f41?w=1200&h=800&fit=crop',
    tagline: 'AS1657-compliant handrail installation for stadium roof access',
    challenge: 'Stadium management required emergency roof access handrails to meet updated AS1657 safety standards. The 200m handrail system needed to withstand extreme wind loads while maintaining aesthetic appeal for televised events. Installation had to occur between match days.',
    solution: 'Engineered custom stainless steel handrail system with enhanced wind resistance. Designed modular sections for rapid installation during 48-hour windows. Used specialized roof anchors that preserved waterproofing membrane. Powder-coated finish matched stadium color scheme.',
    results: 'Complete 200m handrail system installed across 3 match-day gaps. AS1657 compliance certificate issued. Zero roof membrane damage. System tested to 150% design load. Stadium passed safety audit with commendation for proactive compliance.',
    stats: [
      { value: '200m', label: 'Handrails Installed' },
      { value: '100%', label: 'AS1657 Compliant' },
      { value: '3', label: 'Installation Windows' },
    ],
    timeline: '6 days (over 3 weeks)',
    relatedProjects: ['project-002', 'project-006'],
  },
  {
    id: 'project-006',
    slug: 'chatswood-medical-carpark-line-marking',
    name: 'Chatswood Medical Centre Carpark',
    location: 'Chatswood, NSW',
    date: 'May 10, 2023',
    serviceType: 'Carpark Line Marking',
    serviceId: 'carpark-solutions',
    category: ['Commercial', 'Infrastructure'],
    featuredImage: 'https://images.unsplash.com/photo-1486406146456-8edd19c34d82?w=1600&h=400&fit=crop',
    thumbnailImage: 'https://images.unsplash.com/photo-1486406146456-8edd19c34d82?w=800&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1486406146456-8edd19c34d82?w=1200&h=800&fit=crop',
    tagline: 'Complete carpark redesign and line marking solution',
    challenge: 'The medical centre\'s aging carpark had faded markings, poor traffic flow, and inadequate disabled parking. Patient complaints about parking difficulty were affecting the centre\'s reputation. The layout wasted 15% of available space due to inefficient design.',
    solution: 'Conducted traffic flow analysis and redesigned layout to optimize space utilization. Increased parking capacity from 120 to 145 bays. Added 8 disabled bays with compliant access paths. Applied high-durability thermoplastic markings with 10-year warranty. Installed directional signage and speed humps.',
    results: 'Parking capacity increased 20% without physical expansion. Disabled parking compliance achieved. Patient satisfaction scores improved 35%. Zero parking complaints in 6 months post-completion. Line markings remain bright and clear after 18 months.',
    stats: [
      { value: '145', label: 'Parking Bays' },
      { value: '+20%', label: 'Capacity Increase' },
      { value: '10yr', label: 'Marking Warranty' },
    ],
    timeline: '1 week',
    relatedProjects: ['project-005', 'project-012'],
  },
  {
    id: 'project-007',
    slug: 'macquarie-university-research-facility',
    name: 'Macquarie University Research Facility',
    location: 'Macquarie Park, NSW',
    date: 'March 5, 2023',
    serviceType: 'Concrete Cutting & Coring',
    serviceId: 'concrete-cutting',
    category: ['Education', 'Precision'],
    featuredImage: 'https://images.unsplash.com/photo-1581092918484-8313e01f50e2?w=1600&h=400&fit=crop',
    thumbnailImage: 'https://images.unsplash.com/photo-1581092918484-8313e01f50e2?w=800&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1581092918484-8313e01f50e2?w=1200&h=800&fit=crop',
    tagline: 'Precision core drilling for sensitive research equipment installation',
    challenge: 'Installation of electron microscope and mass spectrometer required 50+ precise penetrations through vibration-sensitive labs. Dust contamination would damage research worth $2M+. Adjacent labs housed delicate experiments that couldn\'t be disturbed.',
    solution: 'Deployed diamond core drilling with vacuum dust extraction achieving 99.9% dust capture. Vibration monitoring ensured levels stayed below 0.5mm/s. Created temporary cleanroom barriers. Worked during semester breaks to minimize disruption. Each core precisely positioned using laser guidance systems.',
    results: 'All 50 cores completed with zero vibration incidents. Dust levels maintained at ISO Class 5 cleanroom standards. No research disruption or equipment damage. Perfect alignment achieved for all utility penetrations. Equipment installation proceeded on schedule.',
    stats: [
      { value: '50+', label: 'Precision Cores' },
      { value: '99.9%', label: 'Dust Capture' },
      { value: 'Zero', label: 'Research Disruption' },
    ],
    timeline: '3 weeks',
    relatedProjects: ['project-003', 'project-004'],
  },
  {
    id: 'project-008',
    slug: 'north-shore-private-hospital-expansion',
    name: 'North Shore Private Hospital Expansion',
    location: 'St Leonards, NSW',
    date: 'December 12, 2022',
    serviceType: 'Slab Scanning & GPR',
    serviceId: 'slab-scanning',
    category: ['Healthcare', 'Diagnostic'],
    featuredImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&h=400&fit=crop',
    thumbnailImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=800&fit=crop',
    tagline: 'Structural mapping for hospital operating theatre expansion',
    challenge: 'Hospital expansion required 30 new penetrations for medical gas lines, electrical conduits, and drainage near critical operating theatres. Striking embedded utilities could cause catastrophic service outages. Original 1980s plans lacked detail on post-tension cable locations.',
    solution: 'Comprehensive GPR scanning of all affected areas using latest 3D imaging technology. X-ray verification at critical locations. Created detailed 3D structural models integrated into BIM system. Provided real-time scanning support during construction to verify safe drilling zones.',
    results: 'Zero utility strikes during entire expansion project. Identified 40+ undocumented post-tension cables. Prevented estimated 6-month delay and $3M+ in emergency repairs. Provided accurate as-built documentation for future maintenance. Expansion completed 2 weeks early.',
    stats: [
      { value: '30', label: 'Safe Penetrations' },
      { value: '40+', label: 'Hidden Cables Found' },
      { value: '$3M+', label: 'Damages Prevented' },
    ],
    timeline: '1 week scanning + ongoing support',
    relatedProjects: ['project-004', 'project-009'],
  },
  {
    id: 'project-009',
    slug: 'barangaroo-residential-tower-remediation',
    name: 'Barangaroo Residential Tower Remediation',
    location: 'Barangaroo, NSW',
    date: 'October 18, 2022',
    serviceType: 'Post Tension Repairs',
    serviceId: 'structural-remedial',
    category: ['Residential', 'Structural'],
    featuredImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&h=400&fit=crop',
    thumbnailImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=800&fit=crop',
    tagline: 'Emergency structural stabilization of luxury residential tower',
    challenge: 'Newly completed 40-storey tower exhibited concerning deflection patterns. Engineering investigation discovered water ingress had corroded 15 post-tension tendons on levels 12-18. Immediate intervention required to prevent progressive collapse. All 200 residents had to remain in building during repairs.',
    solution: 'Emergency shoring installed on affected levels within 48 hours. Systematic tendon-by-tendon assessment identified exact damage extent. Developed innovative internal tendon replacement technique avoiding facade removal. Coordinated night work to minimize resident disruption. Implemented real-time structural monitoring.',
    results: 'Building fully stabilized within 3 weeks. All damaged tendons successfully replaced. Residents remained safely in apartments throughout. Structural capacity restored to 120% of original design. Comprehensive corrosion protection system installed. Building re-certified with enhanced design life.',
    stats: [
      { value: '15', label: 'Tendons Replaced' },
      { value: '40', label: 'Storeys Secured' },
      { value: '200', label: 'Residents Protected' },
    ],
    timeline: '3 weeks emergency + 2 weeks certification',
    relatedProjects: ['project-001', 'project-010'],
  },
  {
    id: 'project-010',
    slug: 'penrith-warehouse-carbon-fibre-upgrade',
    name: 'Penrith Warehouse Carbon Fibre Upgrade',
    location: 'Penrith, NSW',
    date: 'August 25, 2022',
    serviceType: 'Carbon Fibre Reinforcement',
    serviceId: 'carbon-fibre',
    category: ['Industrial', 'Structural'],
    featuredImage: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=1600&h=400&fit=crop',
    thumbnailImage: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=800&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=1200&h=800&fit=crop',
    tagline: 'Structural upgrade for heavy equipment storage',
    challenge: 'Logistics company needed to store heavy mining equipment in existing warehouse. Original design allowed only 5 tonnes per bay, new equipment required 12 tonnes. Traditional steel reinforcement would reduce ceiling clearance below operational requirements. Budget constraint of $400K maximum.',
    solution: 'Carbon fibre reinforcement provided perfect solution. Designed custom FRP beam wrapping system increasing capacity 240%. Lightweight installation added zero ceiling height loss. Completed installation during single 2-week shutdown period. Solution cost $280K vs $650K for steel alternative.',
    results: 'Load capacity increased from 5 to 12 tonnes per bay. Zero clearance loss maintained operational efficiency. Project completed $370K under steel reinforcement budget. Warehouse operational 3 months earlier than steel schedule. 60-year design life extension achieved.',
    stats: [
      { value: '+240%', label: 'Capacity Increase' },
      { value: '$370K', label: 'Cost Savings' },
      { value: '2wk', label: 'Installation Time' },
    ],
    timeline: '2 weeks',
    relatedProjects: ['project-002', 'project-011'],
  },
  {
    id: 'project-011',
    slug: 'manly-wharf-safety-barriers',
    name: 'Manly Wharf Safety Barrier System',
    location: 'Manly, NSW',
    date: 'June 8, 2022',
    serviceType: 'Safety Fixture Installation',
    serviceId: 'safety-fixtures',
    category: ['Infrastructure', 'Marine'],
    featuredImage: 'https://images.unsplash.com/photo-1503328427499-d92d414d0f41?w=1600&h=400&fit=crop',
    thumbnailImage: 'https://images.unsplash.com/photo-1503328427499-d92d414d0f41?w=800&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1503328427499-d92d414d0f41?w=1200&h=800&fit=crop',
    tagline: 'Marine-grade handrail installation for public wharf access',
    challenge: 'Historic Manly Wharf required safety barrier upgrade to meet current AS standards while preserving heritage character. Marine environment demanded corrosion-resistant materials. Installation had to occur without disrupting daily ferry services carrying 15,000+ passengers.',
    solution: 'Designed custom stainless steel handrail system matching heritage aesthetic. Used marine-grade 316 stainless steel with enhanced corrosion protection. Modular design allowed night-time installation in 4-hour windows. Specialized marine anchoring system preserved timber deck integrity.',
    results: 'Complete 180m handrail system installed over 8 nights. Zero ferry service disruptions. AS1657 compliance achieved while maintaining heritage approval. Marine corrosion testing predicts 30+ year lifespan. Featured in heritage architecture award submission.',
    stats: [
      { value: '180m', label: 'Marine Handrails' },
      { value: '8', label: 'Night Installations' },
      { value: '30yr', label: 'Projected Lifespan' },
    ],
    timeline: '8 nights over 2 weeks',
    relatedProjects: ['project-005', 'project-012'],
  },
  {
    id: 'project-012',
    slug: 'liverpool-shopping-precinct-carpark',
    name: 'Liverpool Shopping Precinct Carpark',
    location: 'Liverpool, NSW',
    date: 'April 15, 2022',
    serviceType: 'Carpark Line Marking',
    serviceId: 'carpark-solutions',
    category: ['Commercial', 'Urban'],
    featuredImage: 'https://images.unsplash.com/photo-1486406146456-8edd19c34d82?w=1600&h=400&fit=crop',
    thumbnailImage: 'https://images.unsplash.com/photo-1486406146456-8edd19c34d82?w=800&h=600&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1486406146456-8edd19c34d82?w=1200&h=800&fit=crop',
    tagline: 'Multi-level carpark refurbishment and signage upgrade',
    challenge: 'Aging 800-bay shopping centre carpark had poor wayfinding, faded markings, and dangerous blind corners. Customer complaints about difficulty finding spaces and navigating exits. Previous contractors\' markings lasted only 18 months. Council required improved disabled access compliance.',
    solution: 'Complete carpark analysis and redesign. Implemented color-coded level system with LED wayfinding. Applied premium thermoplastic markings with reflective properties. Added safety mirrors at blind corners. Installed digital bay counter system. Upgraded disabled bays to exceed minimum requirements.',
    results: 'Customer satisfaction increased 50% in post-completion survey. Navigation complaints dropped from 40/month to zero. Disabled bays increased from 12 to 25 exceeding council requirements. Thermoplastic markings showing zero degradation after 30 months. Shopping centre extended maintenance contract.',
    stats: [
      { value: '800', label: 'Bays Remarked' },
      { value: '25', label: 'Accessible Bays' },
      { value: '+50%', label: 'Satisfaction Increase' },
    ],
    timeline: '2 weeks',
    relatedProjects: ['project-006', 'project-001'],
  },
];
