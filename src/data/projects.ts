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
  challenge: string;       // 80-120 words - concise and scannable
  solution: string;        // 80-120 words - concise and scannable
  results: string;         // 80-120 words - concise and scannable
  heroImage: string;

  // Primary image carousel (exactly 7 images showing project progress)
  galleryImages: ProjectImage[];  // Required - 7 images in sequence

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
    slug: 'caringbah-pavilion-carbon-fibre',
    name: 'Caringbah Pavilion Carbon Fibre Reinforcement',
    location: 'Caringbah, NSW',
    date: 'October 30, 2025',
    serviceType: 'Carbon Fibre Reinforcement',
    serviceId: 'concrete-strengthening',
    category: ['Community', 'Heritage', 'Structural'],
    featuredImage: '/images/projects/caringbah-pavilion/featured.jpg',
    thumbnailImage: '/images/projects/caringbah-pavilion/thumbnail.jpg',
    heroImage: '/images/projects/caringbah-pavilion/hero.jpg',
    tagline: 'Carbon fibre strengthening for heritage community pavilion',
    challenge: 'The Caringbah Pavilion\'s main beams had lost 60% of load-bearing capacity due to termite damage and weathering. With 200+ community events booked annually, closure wasn\'t an option. Traditional steel reinforcement would cost $400,000 and close the facility for 6+ months, devastating the community calendar. The heritage-listed building required any solution to preserve its original appearance while meeting modern structural standards. Council requirements mandated evening-only work to protect $45,000 in confirmed event bookings.',
    solution: 'We applied carbon fibre reinforced polymer wraps using multi-directional patterns engineered to restore full structural capacity. The CFRP system added zero dead load while increasing beam strength by 300%. All work occurred during evening hours between bookings, ensuring zero event cancellations. Custom wrap positioning stayed within architectural features to maintain heritage character. The lightweight, non-invasive technology completed in 3 weeks versus 6+ months for steel alternatives. Heritage officers approved the approach as model-worthy for future projects.',
    results: 'The CFRP solution restored structural capacity to 150% of original specification, future-proofing the building for 60+ years. Zero events were cancelled during the 3-week installation, preserving $45,000 in revenue. The $180,000 solution saved 55% versus the $400,000 steel alternative while finishing 8 weeks faster. Comprehensive certification enabled the pavilion to host 400+ events since completion with zero structural concerns. Heritage NSW commended the project as exemplary conservation work.',
    stats: [
      { value: '300%', label: 'Strength Increase' },
      { value: '0', label: 'Event Cancellations' },
      { value: '60yr', label: 'Design Life Extension' },
    ],
    galleryImages: [
      {
        url: '/images/projects/caringbah-pavilion/gallery-01.jpg',
        alt: 'Initial structural assessment and beam preparation at Caringbah Pavilion',
      },
      {
        url: '/images/projects/caringbah-pavilion/gallery-02.jpg',
        alt: 'Epoxy resin application to beam surface before carbon fibre installation',
      },
      {
        url: '/images/projects/caringbah-pavilion/gallery-03.jpg',
        alt: 'Carbon fibre sheet application using multi-directional wrap pattern',
      },
      {
        url: '/images/projects/caringbah-pavilion/gallery-04.jpg',
        alt: 'CFRP wrap installation in progress on pavilion support beam',
      },
      {
        url: '/images/projects/caringbah-pavilion/gallery-05.jpg',
        alt: 'Completed carbon fibre reinforcement maintaining heritage aesthetic',
      },
      {
        url: '/images/projects/caringbah-pavilion/gallery-06.jpg',
        alt: 'Final structural inspection and certification of CFRP system',
      },
      {
        url: '/images/projects/caringbah-pavilion/before-01.jpg',
        alt: 'Completed pavilion ready for continued community service',
      },
    ],
    timeline: '3 weeks (between community bookings)',
    relatedProjects: ['project-002', 'project-003'],
  },
  {
    id: 'project-002',
    slug: 'schofields-54-advanced',
    name: 'Structural Remediation - 54 Advanced Street Schofields',
    location: 'Schofields, NSW',
    date: 'June 23, 2025',
    serviceType: 'Structural Remediation',
    serviceId: 'structural-alterations',
    category: ['Residential', 'Structural'],
    featuredImage: '/images/projects/schofields-54-advanced/featured.jpg',
    thumbnailImage: '/images/projects/schofields-54-advanced/thumbnail.jpg',
    heroImage: '/images/projects/schofields-54-advanced/hero.jpg',
    tagline: 'Comprehensive structural remediation for residential property',
    challenge: 'Extensive structural cracking from foundation settlement and reactive soil movement threatened this occupied family home. Investigation revealed 40mm differential settlement affecting walls, slabs, and columns. Traditional underpinning would cost $180,000 and require 3-month family evacuation. With cracks widening 2-3mm annually, delay risked escalating costs and potential structural failure. The young family needed to remain in residence while managing complex insurance claims across multiple structural issues.',
    solution: 'We implemented a three-phase strategy: hydraulic pier installation correcting 40mm settlement, epoxy injection for slab cracks, carbon fibre mesh for wall repairs, and structural grout for column stabilization. All work was phased room-by-room over 2 years, allowing continuous occupancy. Detailed monitoring reports documented progress for insurance approval. Final phase installed drainage improvements reducing soil reactivity by 40%. Comprehensive warranties backed by engineering certification provided long-term confidence.',
    results: 'The remediation stabilized the property with zero settlement in 12 months post-completion. Foundation leveling restored the building to within 2mm of design tolerance. The family avoided $60,000+ in temporary accommodation costs by remaining in residence throughout. Property valuation increased 15% following structural certification. The phased approach spread insurance payments over manageable periods. Full 10-year structural warranty protected the family\'s largest investment while drainage improvements substantially reduced future movement risk.',
    stats: [
      { value: '2yr', label: 'Phased Project Timeline' },
      { value: '100%', label: 'Structural Integrity Restored' },
      { value: '0', label: 'Occupant Disruptions' },
    ],
    galleryImages: [
      {
        url: '/images/projects/schofields-54-advanced/gallery-01.jpg',
        alt: 'Initial structural assessment documenting crack patterns at Schofields residence',
      },
      {
        url: '/images/projects/schofields-54-advanced/gallery-02.jpg',
        alt: 'Hydraulic pier installation beneath foundation for settlement correction',
      },
      {
        url: '/images/projects/schofields-54-advanced/gallery-03.jpg',
        alt: 'Deep-penetrating resin injection to stabilize foundation piers',
      },
      {
        url: '/images/projects/schofields-54-advanced/gallery-04.jpg',
        alt: 'Epoxy injection process for slab crack repair',
      },
      {
        url: '/images/projects/schofields-54-advanced/gallery-05.jpg',
        alt: 'Carbon fibre mesh reinforcement application on structural walls',
      },
      {
        url: '/images/projects/schofields-54-advanced/gallery-06.jpg',
        alt: 'Specialized structural grout injection for column stabilization',
      },
      {
        url: '/images/projects/schofields-54-advanced/gallery-08.jpg',
        alt: 'Final structural inspection and completion certification',
      },
    ],
    timeline: '2 years (phased 2023-2025)',
    relatedProjects: ['project-005', 'project-008'],
  },
  {
    id: 'project-003',
    slug: 'enfield-curtain-wall',
    name: 'Curtain Wall Injection - Enfield Commercial Building',
    location: 'Enfield, NSW',
    date: 'October 30, 2025',
    serviceType: 'Curtain Wall Injection',
    serviceId: 'curtain-wall-injection',
    category: ['Commercial', 'Structural'],
    featuredImage: '/images/projects/enfield-curtain-wall/featured.jpg',
    thumbnailImage: '/images/projects/enfield-curtain-wall/thumbnail.jpg',
    heroImage: '/images/projects/enfield-curtain-wall/hero.jpg',
    tagline: 'Precision curtain wall injection for commercial building',
    challenge: 'Persistent water ingress through failed curtain wall sealants damaged three ground-floor retail tenants over 18 months. Failed joints and micro-cracking created infiltration pathways during heavy rain. Traditional facade panel removal would cost $250,000 and force 3-month tenant relocations with $100,000+ business interruption claims. Tenants threatened lease termination if waterproofing issues weren\'t resolved quickly. The premium location demanded invisible repairs maintaining street appeal and property value.',
    solution: 'We deployed hydrophilic polyurethane resin injection that expands on water contact, creating permanent waterproof barriers. Thermal imaging mapped all infiltration points. Precision drilling at 300mm intervals along affected joints enabled controlled-pressure resin injection ensuring complete penetration. All injection points were finished flush and color-matched to maintain facade appearance. The single-day installation minimized scaffolding impact on street frontage and tenant access. Controlled water spray testing confirmed 100% effectiveness before completion.',
    results: 'The injection eliminated water ingress completely, with zero leaks during heavy rainfall in the following 3 months. All tenants remained operational throughout the single-day remediation. The $85,000 solution saved 66% versus the $250,000 facade removal alternative while completing in one day versus three months. Tenants withdrew lease termination notices, securing $180,000+ in annual rental revenue. Building insurance premiums reduced 15% due to documented waterproofing upgrade and eliminated claims history.',
    stats: [
      { value: '1-day', label: 'Completion Timeline' },
      { value: '100%', label: 'Waterproofing Effectiveness' },
      { value: '66%', label: 'Cost Savings vs Traditional' },
    ],
    galleryImages: [
      {
        url: '/images/projects/enfield-curtain-wall/gallery-01.jpg',
        alt: 'Thermal imaging moisture mapping identifying water infiltration points in curtain wall',
      },
      {
        url: '/images/projects/enfield-curtain-wall/gallery-02.jpg',
        alt: 'Precision drill entry points preparation for polyurethane resin injection',
      },
      {
        url: '/images/projects/enfield-curtain-wall/gallery-03.jpg',
        alt: 'Hydrophilic polyurethane resin injection process at failed joint systems',
      },
      {
        url: '/images/projects/enfield-curtain-wall/gallery-04.jpg',
        alt: 'Controlled pressure resin injection ensuring complete void filling',
      },
      {
        url: '/images/projects/enfield-curtain-wall/gallery-05.jpg',
        alt: 'Injection points finished flush and color-matched to facade surface',
      },
      {
        url: '/images/projects/enfield-curtain-wall/gallery-06.jpg',
        alt: 'Water spray testing confirming 100% waterproofing effectiveness',
      },
      {
        url: '/images/projects/enfield-curtain-wall/before-01.jpg',
        alt: 'Completed curtain wall with invisible repairs maintaining building aesthetic',
      },
    ],
    timeline: 'Single day (October 30, 2025)',
    relatedProjects: ['project-001', 'project-011'],
  },
  {
    id: 'project-004',
    slug: 'waitara-multi-service',
    name: 'Waitara Multi-Service Remediation',
    location: 'Waitara, NSW',
    date: 'December 3, 2024',
    serviceType: 'Multi-Service Remediation',
    serviceId: 'crack-injection',
    category: ['Residential', 'Structural'],
    featuredImage: '/images/projects/waitara-multi-service/featured.jpg',
    thumbnailImage: '/images/projects/waitara-multi-service/thumbnail.jpg',
    heroImage: '/images/projects/waitara-multi-service/hero.jpg',
    tagline: 'Multi-service remediation combining crack injection and steel reinforcing',
    challenge: 'Pre-purchase inspection revealed extensive slab cracking from soil movement and undersized basement steel supports. The property purchase was conditional on successful remediation within 8 weeks before settlement. Traditional approaches treating each issue separately would double mobilization costs and extend the timeline to 12+ weeks. The vacant property generated no rental income during remediation, creating financial pressure to minimize duration while maintaining quality across both specialized service types.',
    solution: 'We integrated both services into a single 5-week phased timeline. Phase one injected high-strength epoxy into all slab cracks using systematic grid patterns that ensured complete penetration. Phase two installed custom structural steel reinforcement in the basement, with certified welding and corrosion protection coating. Seamless coordination between specialized teams eliminated scheduling gaps. The integrated approach reduced total project cost by 30% while maintaining highest quality standards. Comprehensive engineering certification covered both services under single documentation.',
    results: 'The multi-service remediation completed within the 5-week timeline, enabling on-schedule settlement. All slab cracks were permanently sealed with 100% bonding effectiveness confirmed by structural testing. Supplementary steel increased basement capacity by 40%. The integrated approach saved $45,000 while completing 7 weeks faster than sequential timelines. Homeowners avoided $3,500 weekly rental costs during extended remediation. Settlement proceeded with complete structural certification. The comprehensive remediation added approximately $80,000 to assessed property value.',
    stats: [
      { value: '2', label: 'Services Combined' },
      { value: '5wk', label: 'Integrated Timeline' },
      { value: '30%', label: 'Cost Savings' },
    ],
    galleryImages: [
      {
        url: '/images/projects/waitara-multi-service/gallery-01.jpg',
        alt: 'Initial structural assessment documenting slab crack patterns at Waitara residence',
      },
      {
        url: '/images/projects/waitara-multi-service/gallery-02.jpg',
        alt: 'Epoxy resin injection process for slab crack repair using grid pattern',
      },
      {
        url: '/images/projects/waitara-multi-service/gallery-03.jpg',
        alt: 'High-strength epoxy injection creating structural bond in concrete slab',
      },
      {
        url: '/images/projects/waitara-multi-service/gallery-04.jpg',
        alt: 'Completed slab crack injection showing permanent crack sealing',
      },
      {
        url: '/images/projects/waitara-multi-service/gallery-05.jpg',
        alt: 'Custom structural steel reinforcement fabrication for basement level',
      },
      {
        url: '/images/projects/waitara-multi-service/gallery-06.jpg',
        alt: 'Structural steel member installation with certified welding in basement',
      },
      {
        url: '/images/projects/waitara-multi-service/gallery-07.jpg',
        alt: 'Completed steel reinforcing with corrosion protection coating applied',
      },
    ],
    timeline: '5 weeks (phased October-December 2024)',
    relatedProjects: ['project-007', 'project-010'],
  },
  {
    id: 'project-005',
    slug: 'northbridge-structural-wall',
    name: 'Northbridge Structural Wall Repairs',
    location: 'Northbridge, NSW',
    date: 'March 7, 2024',
    serviceType: 'Structural Wall Repairs',
    serviceId: 'structural-alterations',
    category: ['Residential', 'Heritage', 'Structural'],
    featuredImage: '/images/projects/northbridge-structural-wall/featured.jpg',
    thumbnailImage: '/images/projects/northbridge-structural-wall/thumbnail.jpg',
    heroImage: '/images/projects/northbridge-structural-wall/hero.jpg',
    tagline: 'Heritage-sensitive structural wall repairs over 16-day timeline',
    challenge: 'Progressive stress cracking in three load-bearing walls threatened this 1920s heritage-listed residence. Heritage NSW rejected traditional brick reconstruction as too invasive for the Category 2 listing. The occupied home housed an elderly couple determined to remain during repairs. Heritage NSW imposed a 30-day compliance deadline for structural stabilization, with non-compliance risking delisting and substantial penalties. Narrow site access limited equipment options while heritage requirements demanded hand-selected mortar colors matching original 1920s construction.',
    solution: 'We combined traditional craftsmanship with modern engineering. Specially formulated epoxy injection stabilized cracks in heritage masonry. Stainless steel helical bars embedded within existing mortar joints provided invisible structural reinforcement without altering original brickwork. Custom-mixed lime mortar matched the original 1920s composition with carefully selected pigments achieving perfect color consistency. Heritage-trained masons worked methodically across 16 days with daily progress reports to Heritage NSW. The elderly residents remained comfortably in their home throughout.',
    results: 'The repairs stabilized all three walls while achieving full Heritage NSW approval. Structural testing confirmed 100% load-bearing restoration with zero crack reactivation over six months. The invisible helical bar system provides long-term support without visual impact. Heritage NSW commended the project as exemplary, upgrading the property from provisional to permanent heritage status. The elderly homeowners avoided $8,000+ in relocation costs. Property insurance valuation increased 20%. The repairs secured structural integrity for 50+ years while preserving irreplaceable heritage significance.',
    stats: [
      { value: '16', label: 'Days On-Site' },
      { value: 'Heritage', label: 'Full Compliance' },
      { value: '100%', label: 'Wall Integrity Restored' },
    ],
    galleryImages: [
      {
        url: '/images/projects/northbridge-structural-wall/gallery-01.jpg',
        alt: 'Initial heritage assessment and structural crack documentation at Northbridge residence',
      },
      {
        url: '/images/projects/northbridge-structural-wall/gallery-02.jpg',
        alt: 'Low-pressure epoxy injection technique for heritage masonry crack repair',
      },
      {
        url: '/images/projects/northbridge-structural-wall/gallery-03.jpg',
        alt: 'Stainless steel helical bar preparation for invisible structural stitching',
      },
      {
        url: '/images/projects/northbridge-structural-wall/gallery-04.jpg',
        alt: 'Helical bar installation within existing mortar joints avoiding brick alteration',
      },
      {
        url: '/images/projects/northbridge-structural-wall/gallery-05.jpg',
        alt: 'Custom lime mortar mixing matching original 1920s composition and color',
      },
      {
        url: '/images/projects/northbridge-structural-wall/gallery-06.jpg',
        alt: 'Heritage-trained mason applying color-matched mortar repairs',
      },
      {
        url: '/images/projects/northbridge-structural-wall/gallery-08.jpg',
        alt: 'Completed structural repairs with invisible reinforcement system',
      },
    ],
    timeline: '16 days (February 20 - March 7, 2024)',
    relatedProjects: ['project-002', 'project-011'],
  },
  {
    id: 'project-006',
    slug: 'rousehill-slab-scanning',
    name: 'Rouse Hill Slab Scanning - Post-Tension Truncation',
    location: 'Rouse Hill, NSW',
    date: 'July 3, 2025',
    serviceType: 'Slab Scanning & GPR',
    serviceId: 'slab-scanning',
    category: ['Residential', 'Diagnostic', 'Precision'],
    featuredImage: '/images/projects/rousehill-slab-scanning/featured.jpg',
    thumbnailImage: '/images/projects/rousehill-slab-scanning/thumbnail.jpg',
    heroImage: '/images/projects/rousehill-slab-scanning/hero.jpg',
    tagline: 'Advanced GPR scanning for safe post-tension cable truncation',
    challenge: 'New staircase installation required cutting two post-tension cables in the 300mm thick slab. Original 2015 plans showed approximate locations with ±150mm variance - too imprecise for safety-critical work. Striking an active tension cable posed catastrophic slab collapse risk in the occupied family residence. Traditional exploratory cutting would weaken slab integrity while x-ray technology lacked depth penetration. The renovation contractor faced a 2-week window for staircase structural work with significant financial penalties for delays.',
    solution: 'We deployed advanced ground-penetrating radar calibrated for deep post-tension detection. Systematic grid coverage with multiple scan passes at varying frequencies built a comprehensive 3D structural map. The GPR system differentiated between active tension cables, passive reinforcement, and voids. All cable positions were verified within ±5mm tolerance using multiple scan angles. Real-time scanning support during cutting monitored cable-free zones immediately before each cut. Detailed 3D mapping provided specific safe-cutting coordinates marked directly on the slab.',
    results: 'The GPR scanning mapped all post-tension cables with ±5mm accuracy, enabling completely safe cable truncation. Zero cable strikes occurred during cutting operations. The precise mapping satisfied all insurance and engineering requirements, eliminating project liability risks. The contractor completed staircase work within the planned 2-week timeline, avoiding $35,000+ in schedule delay penalties. Property owners received detailed as-built documentation showing exact cable layouts for future reference. The one-week scanning process ran significantly faster than 3-4 week traditional methods.',
    stats: [
      { value: '±5mm', label: 'Scanning Precision' },
      { value: '0', label: 'Cable Strikes' },
      { value: '1wk', label: 'Scanning Timeline' },
    ],
    galleryImages: [
      {
        url: '/images/projects/rousehill-slab-scanning/gallery-01.jpg',
        alt: 'Advanced GPR equipment setup for post-tension cable detection',
      },
      {
        url: '/images/projects/rousehill-slab-scanning/gallery-02.jpg',
        alt: 'Systematic grid scanning across proposed floor opening area',
      },
      {
        url: '/images/projects/rousehill-slab-scanning/gallery-03.jpg',
        alt: 'Real-time GPR display showing cable position and depth data',
      },
      {
        url: '/images/projects/rousehill-slab-scanning/gallery-04.jpg',
        alt: '3D structural mapping visualization of post-tension cable layout',
      },
      {
        url: '/images/projects/rousehill-slab-scanning/gallery-05.jpg',
        alt: 'Surface marking of verified safe-cutting zones based on GPR data',
      },
      {
        url: '/images/projects/rousehill-slab-scanning/gallery-06.jpg',
        alt: 'On-site handheld GPR verification during cutting operations',
      },
      {
        url: '/images/projects/rousehill-slab-scanning/gallery-07.jpg',
        alt: 'Completed cable truncation with zero incidents verified by final inspection',
      },
    ],
    timeline: '1 week (June 25 - July 3, 2025)',
    relatedProjects: ['project-004', 'project-007'],
  },
  {
    id: 'project-007',
    slug: 'pelican-road-schofields',
    name: 'Pelican Road Schofields - Residential Estate Remediation',
    location: 'Schofields, NSW',
    date: 'April 22, 2025',
    serviceType: 'Comprehensive Crack Injection & Repairs',
    serviceId: 'crack-injection',
    category: ['Residential', 'Structural', 'Urban'],
    featuredImage: '/images/projects/pelican-road-schofields/featured.jpg',
    thumbnailImage: '/images/projects/pelican-road-schofields/thumbnail.jpg',
    heroImage: '/images/projects/pelican-road-schofields/hero.jpg',
    tagline: 'Estate-wide crack injection across five residential addresses',
    challenge: 'Five properties in the Pelican Road estate experienced systematic structural cracking from reactive clay soil and inadequate foundation design. Cracks widened progressively over 18 months, some exceeding 15mm. All five homeowners - first-time buyers - faced coordinated crisis requiring coordination between five insurers, the developer, and council authorities. Traditional single-property remediation would cost $80,000+ per home totaling $400,000+ over 30+ weeks. Shared shoring walls required coordinated access and repair scheduling across multiple occupied residences.',
    solution: 'We treated all five properties as a single integrated project, achieving economies of scale with customized solutions for each crack pattern. Initial geotechnical stabilization used deep resin injection for reactive soil movement. Targeted crack injection employed flexible epoxy formulations designed for future minor soil fluctuations. Coordinated insurance claims provided standardized documentation expediting approvals. Phased sequencing optimized equipment mobilization through staggered 3-5 day work windows. Comprehensive drainage improvements reduced soil moisture variation by 60%.',
    results: 'The estate-wide injection remediated all five properties with 100% crack stabilization and zero reactivation documented through 12-month monitoring. The integrated approach saved $180,000 while completing in 8 weeks versus 30+ weeks for sequential work. All homeowners received structural certification enabling insurance claim closures and property value recovery. Values increased an average of 12% following remediation. The coordinated approach accelerated insurance approvals by an average of 6 weeks per property. The estate adopted the drainage design as standard for 40+ additional properties.',
    stats: [
      { value: '5', label: 'Addresses Consolidated' },
      { value: '2yr', label: 'Estate Project Timeline' },
      { value: '45%', label: 'Cost Savings vs Sequential' },
    ],
    galleryImages: [
      {
        url: '/images/projects/pelican-road-schofields/gallery-01.jpg',
        alt: 'Initial geotechnical assessment across five Pelican Road properties',
      },
      {
        url: '/images/projects/pelican-road-schofields/gallery-02.jpg',
        alt: 'Deep resin injection for reactive soil stabilization beneath foundations',
      },
      {
        url: '/images/projects/pelican-road-schofields/gallery-03.jpg',
        alt: 'Flexible epoxy crack injection using pressure-monitored equipment',
      },
      {
        url: '/images/projects/pelican-road-schofields/gallery-04.jpg',
        alt: 'Coordinated remediation work across multiple properties showing estate-wide approach',
      },
      {
        url: '/images/projects/pelican-road-schofields/gallery-05.jpg',
        alt: 'Integrated stormwater drainage system installation for soil moisture control',
      },
      {
        url: '/images/projects/pelican-road-schofields/gallery-06.jpg',
        alt: 'Final structural inspection and five-property certification completion',
      },
      {
        url: '/images/projects/pelican-road-schofields/before-01.jpg',
        alt: 'Estate-wide solution completed with comprehensive drainage and stabilization',
      },
    ],
    timeline: '2+ years (March 2023 - April 2025, phased)',
    relatedProjects: ['project-004', 'project-010'],
  },
  {
    id: 'project-008',
    slug: 'marsden-park-development',
    name: 'Marsden Park Development - Structural Wall Works',
    location: 'Marsden Park, NSW',
    date: 'February 18, 2025',
    serviceType: 'Structural Wall Works',
    serviceId: 'structural-alterations',
    category: ['Residential', 'Structural', 'Urban'],
    featuredImage: '/images/projects/marsden-park-development/featured.jpg',
    thumbnailImage: '/images/projects/marsden-park-development/thumbnail.jpg',
    heroImage: '/images/projects/marsden-park-development/hero.jpg',
    tagline: 'Development-wide structural wall works across multiple residential lots',
    challenge: 'Systematic structural wall defects across three lots from inadequate expansion joint detailing and temperature fluctuations. The developer faced mounting pressure from three homeowners threatening legal action as the defects period approached expiration. Each lot exhibited unique crack patterns requiring customized approaches. Traditional wall reconstruction would cost $60,000+ per property totaling $180,000+ over 12-18 weeks with required evacuations. The developer\'s $120,000 maximum budget created financial constraints while maintaining structural certification requirements.',
    solution: 'We treated all three lots as an integrated project while customizing repair methodologies to each property\'s conditions. Comprehensive crack assessment led to engineered epoxy injection combined with helical stainless steel bar stitching where appropriate. Room-by-room sequencing allowed homeowners to remain in residence with maintained access to essential areas. Coordinated 3-4 day property-specific windows optimized equipment mobilization. Flexible epoxy addressed dynamic cracks while structural stitching handled larger stress cracks. Modern flexible sealant systems engineered for 5-45°C temperature range prevented recurrence.',
    results: 'The development-wide remediation addressed all defects within the $120,000 budget and completed in 12 weeks versus 18-week sequential timelines. All homeowners remained in residence, avoiding $15,000+ per family in temporary accommodation. Structural testing confirmed 100% wall integrity restoration with zero reactivation over six months. Upgraded expansion joints eliminated the original construction deficiency. All three homeowners withdrew legal action following successful remediation. Property values stabilized, protecting remaining inventory. Comprehensive documentation enabled preventive maintenance programs across 20+ additional development lots.',
    stats: [
      { value: '3', label: 'Lots Completed' },
      { value: '12wk', label: 'Development Timeline' },
      { value: '33%', label: 'Cost Savings vs Traditional' },
    ],
    galleryImages: [
      {
        url: '/images/projects/marsden-park-development/gallery-01.jpg',
        alt: 'Comprehensive crack assessment across three Marsden Park lots',
      },
      {
        url: '/images/projects/marsden-park-development/gallery-02.jpg',
        alt: 'High-performance epoxy injection for dynamic crack repair',
      },
      {
        url: '/images/projects/marsden-park-development/gallery-03.jpg',
        alt: 'Helical stainless steel bar installation for structural stitching',
      },
      {
        url: '/images/projects/marsden-park-development/gallery-04.jpg',
        alt: 'Modern expansion joint reconstruction with flexible sealant systems',
      },
      {
        url: '/images/projects/marsden-park-development/before-01.jpg',
        alt: 'Original defects from temperature movement requiring remediation',
      },
      {
        url: '/images/projects/marsden-park-development/after-01.jpg',
        alt: 'Restored structural wall with upgraded expansion joint systems',
      },
      {
        url: '/images/projects/marsden-park-development/featured.jpg',
        alt: 'Completed multi-lot remediation with modern detailing',
      },
    ],
    timeline: '12 months (February 2024 - February 2025, phased)',
    relatedProjects: ['project-002', 'project-005'],
  },
  {
    id: 'project-009',
    slug: 'jacaranda-construction-joints',
    name: 'Jacaranda Construction Joints Repairs',
    location: 'Jacaranda (Sydney), NSW',
    date: 'January 29, 2024',
    serviceType: 'Construction Joints Repairs',
    serviceId: 'crack-repairs',
    category: ['Residential', 'Structural', 'Precision'],
    featuredImage: '/images/projects/jacaranda-construction-joints/featured.jpg',
    thumbnailImage: '/images/projects/jacaranda-construction-joints/thumbnail.jpg',
    heroImage: '/images/projects/jacaranda-construction-joints/hero.jpg',
    tagline: 'Specialized construction joint repairs for residential property',
    challenge: 'Systematic failure of construction joints throughout the concrete slab from inadequate sealant specification caused joint separation and water infiltration. Visible moisture staining affected $25,000+ in finished timber flooring and internal walls. Traditional joint replacement requiring complete slab section removal would cost $120,000+ and force 6-week family evacuation. The homeowner\'s upcoming international relocation in 8 weeks required completed repairs and structural certification before property sale settlement. Premium construction quality demanded repair solutions matching high-end finish standards.',
    solution: 'We deployed specialized construction joint repair using advanced polyurethane sealant systems engineered for high-movement joints. Complete removal of failed sealant, thorough industrial vacuum cleaning, and precise application of premium-grade flexible polyurethane designed for ±12mm joint movement tolerance. Bond-breaker tape installation ensured proper three-sided adhesion preventing cohesive failure. All joints were tooled to optimal concave profiles maximizing water-shedding performance. The single-day intensive approach concentrated remediation into one efficient timeline with just 24-hour family evacuation.',
    results: 'The specialized repairs eliminated all water infiltration with zero ongoing ingress confirmed by moisture testing 30 days post-completion. Thermal expansion testing demonstrated full joint movement capability within ±12mm tolerance specifications. The single-day completion allowed minimal family disruption, avoiding temporary accommodation costs. The $18,000 solution saved 85% versus the $120,000 slab reconstruction alternative. Property sale proceeded on original schedule with full structural certification supporting settlement. The upgraded joint system\'s superior specifications added $15,000 to final sale price.',
    stats: [
      { value: '1-day', label: 'Completion Timeline' },
      { value: '85%', label: 'Cost Savings vs Reconstruction' },
      { value: '100%', label: 'Joint Integrity Restored' },
    ],
    galleryImages: [
      {
        url: '/images/projects/jacaranda-construction-joints/gallery-01.jpg',
        alt: 'Complete removal of failed original sealant from construction joints',
      },
      {
        url: '/images/projects/jacaranda-construction-joints/gallery-02.jpg',
        alt: 'Premium polyurethane sealant application using bond-breaker tape system',
      },
      {
        url: '/images/projects/jacaranda-construction-joints/gallery-03.jpg',
        alt: 'Tooled concave joint profiles ensuring optimal water-shedding performance',
      },
      {
        url: '/images/projects/jacaranda-construction-joints/before-01.jpg',
        alt: 'Failed construction joints showing separation and moisture damage',
      },
      {
        url: '/images/projects/jacaranda-construction-joints/after-01.jpg',
        alt: 'Premium polyurethane joint sealing system completed',
      },
      {
        url: '/images/projects/jacaranda-construction-joints/featured.jpg',
        alt: 'Upgraded joint system exceeding building code standards',
      },
      {
        url: '/images/projects/jacaranda-construction-joints/thumbnail.jpg',
        alt: 'High-end finish quality maintained throughout repair process',
      },
    ],
    timeline: 'Single day (January 29, 2024)',
    relatedProjects: ['project-007', 'project-010'],
  },
  {
    id: 'project-010',
    slug: 'pemulwuy-suspended-slab',
    name: 'Pemulwuy Suspended Slab Crack Injection',
    location: 'Pemulwuy, NSW',
    date: 'November 27, 2025',
    serviceType: 'Suspended Slab Crack Injection',
    serviceId: 'crack-injection',
    category: ['Residential', 'Structural'],
    featuredImage: '/images/projects/pemulwuy-suspended-slab/featured.jpg',
    thumbnailImage: '/images/projects/pemulwuy-suspended-slab/thumbnail.jpg',
    heroImage: '/images/projects/pemulwuy-suspended-slab/hero.jpg',
    tagline: 'Overhead suspended slab crack injection with minimal occupant disruption',
    challenge: 'Extensive cracking in the suspended concrete slab system from reinforcement placement deficiencies and concrete shrinkage required immediate stabilization. Overhead crack injection on the underside of the first-floor slab presented gravity-defying technical challenges. Traditional scaffolding would require complete ground-floor furniture removal and 2-3 week evacuation costing $12,000+ in temporary accommodation. The occupied home housed elderly residents with mobility limitations, making evacuation particularly challenging. Timeline constraints emerged from approaching Christmas holiday season with family gatherings scheduled in late December.',
    solution: 'We deployed specialized overhead crack injection using low-viscosity epoxy resin engineered for upward penetration. Innovative portable injection platforms eliminated traditional scaffolding requirements, allowing elderly residents to remain comfortably in their home. Strategic injection port placement at 300mm intervals ensured complete crack penetration with pressure monitoring preventing resin escape. Room-by-room sequencing completed each space within 4-6 hours allowing progressive furniture repositioning. Low-VOC epoxy formulation minimized odor impact with air quality monitoring ensuring safe indoor environment. All 40+ cracks were photographically documented.',
    results: 'The overhead injection stabilized all 40+ cracks with 100% penetration confirmed through structural testing. Resin bond testing demonstrated strength exceeding original concrete specifications. The portable platform approach eliminated scaffolding costs and enabled elderly residents to remain in their home throughout the 2-day timeline, avoiding $12,000+ in accommodation and relocation stress. Project completed one week before Christmas family gatherings. The $32,000 solution saved 60% versus traditional $80,000+ scaffolding approaches. Crack monitoring over 60 days showed zero reactivation.',
    stats: [
      { value: 'Overhead', label: 'Technical Challenge' },
      { value: '2-day', label: 'Completion Timeline' },
      { value: '0', label: 'Days Evacuation Required' },
    ],
    galleryImages: [
      {
        url: '/images/projects/pemulwuy-suspended-slab/gallery-01.jpg',
        alt: 'Portable injection platform setup for overhead slab crack access',
      },
      {
        url: '/images/projects/pemulwuy-suspended-slab/gallery-02.jpg',
        alt: 'Low-viscosity epoxy resin injection into overhead suspended slab cracks',
      },
      {
        url: '/images/projects/pemulwuy-suspended-slab/gallery-03.jpg',
        alt: 'Pressure-monitored injection ensuring complete void filling against gravity',
      },
      {
        url: '/images/projects/pemulwuy-suspended-slab/before-01.jpg',
        alt: 'Suspended slab cracking visible from ground-floor ceiling',
      },
      {
        url: '/images/projects/pemulwuy-suspended-slab/after-01.jpg',
        alt: 'Stabilized overhead slab with complete epoxy penetration',
      },
      {
        url: '/images/projects/pemulwuy-suspended-slab/featured.jpg',
        alt: 'Completed overhead injection without occupant displacement',
      },
      {
        url: '/images/projects/pemulwuy-suspended-slab/thumbnail.jpg',
        alt: 'Innovative portable platform technology for overhead work',
      },
    ],
    timeline: '2 days (November 26-27, 2025)',
    relatedProjects: ['project-004', 'project-007'],
  },
  {
    id: 'project-011',
    slug: 'florence-capri-complex',
    name: 'Florence & Capri Complex - Structural Alterations',
    location: 'Wentworth Point, NSW',
    date: 'June 15, 2024',
    serviceType: 'Structural Alterations',
    serviceId: 'structural-alterations',
    category: ['Residential', 'Structural', 'Urban'],
    featuredImage: '/images/projects/florence-capri-complex/featured.jpg',
    thumbnailImage: '/images/projects/florence-capri-complex/thumbnail.jpg',
    heroImage: '/images/projects/florence-capri-complex/hero.jpg',
    tagline: 'Premium structural alterations for Wentworth Point residential complex',
    challenge: 'The Florence & Capri complex required significant structural alterations for interior renovations across multiple units. The occupied high-rise demanded minimal disruption to 200+ residents while maintaining full building services. Access constraints from limited street frontage and strict noise restrictions protecting neighboring luxury developments complicated logistics. The strata committee imposed stringent work hour limitations and required dedicated resident liaison. Timeline pressure came from pre-committed tenant move-in dates, with $180,000+ in rental income at risk if structural alterations delayed the overall renovation schedule.',
    solution: 'We developed a comprehensive structural alteration program using advanced temporary shoring systems that maintained building integrity during modifications. Custom steel beam installations transferred loads around new structural openings, allowing safe removal of original load-bearing walls. Precise structural calculations with independent peer review ensured high-rise building standards compliance. Single-day intensive shoring installations minimized disruption while ensuring continuous structural support. Dedicated resident liaison provided weekly updates to strata and affected owners. Noise monitoring verified strict sound level compliance within approved 7AM-5PM windows.',
    results: 'The structural alterations enabled all planned renovations with 100% compliance to high-rise codes and strata approval conditions documented through comprehensive engineering certification. The systematic approach completed within the planned 4-week timeline, protecting $180,000+ in pre-committed rental income. Zero building service disruptions occurred with all 200+ residents maintaining normal access. Noise monitoring confirmed 100% compliance with sound restrictions, eliminating resident complaints. Custom steel beams provided superior structural performance compared to original construction. Renovated unit values increased 20%. The successful project secured preferred contractor status, leading to $300,000+ in follow-on work.',
    stats: [
      { value: 'Premium', label: 'Wentworth Point Location' },
      { value: '100%', label: 'Code Compliance' },
      { value: '0', label: 'Service Disruptions' },
    ],
    galleryImages: [
      {
        url: '/images/projects/florence-capri-complex/gallery-01.jpg',
        alt: 'Temporary shoring system installation maintaining building integrity during alterations',
      },
      {
        url: '/images/projects/florence-capri-complex/gallery-02.jpg',
        alt: 'Custom steel beam fabrication and installation for load transfer',
      },
      {
        url: '/images/projects/florence-capri-complex/gallery-03.jpg',
        alt: 'Completed structural openings with engineering certification for high-rise compliance',
      },
      {
        url: '/images/projects/florence-capri-complex/before-01.jpg',
        alt: 'Original load-bearing walls requiring modernization modifications',
      },
      {
        url: '/images/projects/florence-capri-complex/after-01.jpg',
        alt: 'Custom steel beam installation creating new structural openings',
      },
      {
        url: '/images/projects/florence-capri-complex/featured.jpg',
        alt: 'Completed structural modifications with superior performance upgrade',
      },
      {
        url: '/images/projects/florence-capri-complex/thumbnail.jpg',
        alt: 'Premium Wentworth Point harbourside location complex',
      },
    ],
    timeline: '4 weeks (June 2024)',
    relatedProjects: ['project-005', 'project-008'],
  },
  {
    id: 'project-012',
    slug: 'zetland-surelock',
    name: 'Zetland Surelock System Installation',
    location: 'Zetland, NSW',
    date: 'November 27, 2024',
    serviceType: 'Temporary Moving Joints (Surelock)',
    serviceId: 'temporary-moving-joints',
    category: ['Commercial', 'Structural', 'Precision'],
    featuredImage: '/images/projects/zetland-surelock/featured.jpg',
    thumbnailImage: '/images/projects/zetland-surelock/thumbnail.jpg',
    heroImage: '/images/projects/zetland-surelock/hero.jpg',
    tagline: 'Innovative Surelock temporary moving joint system installation',
    challenge: 'This commercial property required specialized temporary moving joint installation using the advanced Surelock system to accommodate up to 25mm differential settlement during adjacent excavation works. Traditional rigid joint systems couldn\'t accommodate the predicted movement magnitude while permanent expansion joints would compromise future structural integrity. Timeline constraints required immediate installation before excavation commenced in 2 weeks. The occupied commercial building demanded methods maintaining business operations for 15 tenants generating $500,000+ annual rental income. Installation precision of ±2mm tolerance demanded specialized expertise rarely available in Australia.',
    solution: 'We deployed specialized Surelock installation utilizing precision-engineered components and certified methodology. Comprehensive manufacturer training ensured full compliance with system specifications and warranty requirements. Precise structural surveys established exact joint locations, followed by diamond core drilling creating perfectly aligned anchorage points meeting ±2mm tolerance. Custom-fabricated Surelock assemblies were installed using specialized torque equipment ensuring optimal pre-load on sliding mechanisms. Single-day installation minimized business disruption. Comprehensive movement monitoring equipment integrated with each assembly provided real-time tracking throughout excavation.',
    results: 'The Surelock system successfully accommodated 22mm of differential settlement during the 8-month adjacent excavation period, performing within engineered specifications and preventing any structural damage. Real-time monitoring confirmed system performance throughout. Zero tenant disruptions occurred, protecting $500,000+ in annual rental income. Precision installation met all manufacturer warranty requirements, securing comprehensive 10-year coverage. Following excavation completion, the system was successfully removed and joints permanently sealed, restoring original structural continuity. The $85,000 temporary system saved significantly versus the $200,000+ permanent expansion joint alternative. The project established TRD as Australia\'s first certified Surelock installer.',
    stats: [
      { value: 'Surelock', label: 'Specialized System' },
      { value: '22mm', label: 'Movement Accommodated' },
      { value: '100%', label: 'Zero Damage Protection' },
    ],
    galleryImages: [
      {
        url: '/images/projects/zetland-surelock/gallery-01.jpg',
        alt: 'Precision survey and joint location establishment for Surelock installation',
      },
      {
        url: '/images/projects/zetland-surelock/gallery-02.jpg',
        alt: 'Diamond core drilling creating aligned anchorage points meeting ±2mm tolerance',
      },
      {
        url: '/images/projects/zetland-surelock/gallery-03.jpg',
        alt: 'Custom Surelock assembly installation with integrated movement monitoring',
      },
      {
        url: '/images/projects/zetland-surelock/before-01.jpg',
        alt: 'Structural joints requiring temporary movement accommodation',
      },
      {
        url: '/images/projects/zetland-surelock/after-01.jpg',
        alt: 'Completed Surelock temporary moving joint system',
      },
      {
        url: '/images/projects/zetland-surelock/featured.jpg',
        alt: 'Precision-installed system protecting structure during settlement period',
      },
      {
        url: '/images/projects/zetland-surelock/thumbnail.jpg',
        alt: 'Innovative Surelock technology for temporary movement accommodation',
      },
    ],
    timeline: 'Single day installation (November 27, 2024) + 8-month monitoring',
    relatedProjects: ['project-003', 'project-009'],
  },
];
