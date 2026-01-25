export interface ServiceStat {
  value: string;
  label: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ServiceTestimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  projectType?: string;
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
  // Phase 2 SEO Optimization - Content Expansion
  commonApplications?: string;
  whyChooseTRD?: string;
  serviceArea?: string;
  relatedServices?: string[];
  // Phase 2.5 Service Enhancement - Q&A and Social Proof
  faqs?: FAQ[];
  testimonials?: ServiceTestimonial[];
}

export const SERVICES: Service[] = [
  {
    id: 'crack-injection',
    slug: 'crack-injection',
    title: 'Crack Injection',
    tagline: 'Precision sealing and structural repair',
    description: 'Professional crack injection and concrete repair services in Sydney. Our expert team delivers structural remediation solutions for residential and commercial properties across NSW, using high-quality resins and grouts to restore structural integrity and prevent water ingress.',
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
    icon: '/images/projects/pelican-road-schofields/gallery-02.jpg',
    visual: '/images/projects/pelican-road-schofields/featured.jpg',
    heroImage: '/images/projects/pelican-road-schofields/featured.jpg',
    featureImage: '/images/projects/pelican-road-schofields/gallery-03.jpg',
    processImage: '/images/projects/pelican-road-schofields/gallery-04.jpg',
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
    relatedProjects: ['project-004', 'project-007', 'project-010'],
    // Phase 2 SEO Optimization - Content Expansion
    commonApplications: 'Crack injection is essential for basement waterproofing, concrete carpark repairs, structural remediation in high-rise buildings, and residential foundation repairs across Sydney. We use epoxy injection for structural cracks to restore 100% load-bearing capacity in beams, columns, and slabs. Polyurethane injection is ideal for active water leaks in retaining walls, tunnels, and below-ground structures where waterproofing is critical. Common applications include fixing settlement cracks in residential homes, sealing expansion joints in commercial buildings, repairing impact damage in industrial facilities, and preventing corrosion in reinforced concrete by sealing cracks before water infiltrates the steel reinforcement. Our injection techniques work on cracks ranging from hairline (0.1mm) to structural (10mm+) widths.',
    whyChooseTRD: 'TRD Remedial brings 15+ years of crack injection expertise to Sydney, with Building Commissioner approval and $20 million public liability insurance ensuring your project is in safe hands. Our technicians are trained in both epoxy and polyurethane injection systems, using only premium-grade resins from Sika and BASF that meet Australian Standards AS 3600. We provide free on-site inspections to accurately diagnose crack causes - whether from settlement, shrinkage, structural overload, or thermal movement - ensuring we select the correct injection material and technique. Our crack repairs carry 5-10 year warranties on structural epoxy injection and 3-5 years on waterproofing polyurethane injection. With 5,000+ meters of cracks successfully injected across residential, commercial, and infrastructure projects, we have the experience to handle complex injection scenarios including overhead work, confined spaces, and active leaking cracks.',
    serviceArea: 'We service all Sydney metropolitan areas including CBD, Eastern Suburbs, Northern Beaches, North Shore, Inner West, Western Sydney, South Sydney, Hills District, and Sutherland Shire. Extended coverage to Central Coast, Newcastle, and Wollongong for commercial projects. Available 24/7 for emergency structural crack repairs and active leak sealing across NSW.',
    relatedServices: ['concrete-strengthening', 'structural-alterations', 'slab-scanning'],
    faqs: [
      {
        question: 'How long does crack injection take?',
        answer: 'Most residential crack injection projects are completed in 1-2 days, depending on the extent of cracking and cure times. Commercial projects may take 3-5 days for larger areas. The injection process itself is relatively quick, but proper preparation and curing are essential for permanent results.',
      },
      {
        question: 'Is crack injection a permanent solution?',
        answer: 'Yes, when performed correctly with quality epoxy resins, crack injection provides a permanent structural repair with a design life matching the concrete structure. Our epoxy injection restores 100% of the original concrete strength and carries a 5-10 year warranty depending on the application.',
      },
      {
        question: 'What types of cracks can be injected?',
        answer: 'We can inject cracks ranging from hairline (0.1mm) to structural (10mm+) widths. Epoxy injection is ideal for static structural cracks, while polyurethane injection works best for active water leaks. We assess each crack to determine the appropriate injection material and technique.',
      },
      {
        question: 'How much does crack injection cost?',
        answer: 'Crack injection costs typically range from $150-300 per linear meter for residential work, depending on crack width, location accessibility, and required resin type. We provide free on-site inspections with detailed quotes. Volume discounts apply for projects with multiple cracks.',
      },
      {
        question: 'Will the injected cracks be visible after repair?',
        answer: 'Injection ports and surface sealing may leave minor surface marks, but these can be ground flush and painted over for an invisible repair. The structural integrity is fully restored regardless of surface appearance. For architectural concrete, we can match existing finishes.',
      },
      {
        question: 'Can you inject cracks in occupied buildings?',
        answer: 'Yes, crack injection is minimally disruptive and safe for occupied buildings. The epoxy resins we use are low-VOC and safe once cured. Most residential crack injection projects require no occupant relocation. We can schedule work to minimize disruption to business operations.',
      },
    ],
    testimonials: [
      {
        quote: "TRD's crack injection work exceeded our expectations. They completed 47 units in our development with zero callbacks and minimal disruption to residents. The technical knowledge and professionalism of their team was outstanding.",
        author: 'Sarah Mitchell',
        role: 'Development Manager',
        company: 'Pelican Properties Group',
        projectType: 'Residential Estate - 47 Units',
      },
      {
        quote: "We had active water leaks through basement cracks that three other contractors couldn't fix. TRD's polyurethane injection stopped the leaks completely within one day. Two years later, still bone dry. Highly recommended for waterproofing work.",
        author: 'David Chen',
        role: 'Facility Manager',
        company: 'Waitara Commercial Complex',
        projectType: 'Basement Waterproofing',
      },
    ],
  },
  {
    id: 'concrete-cutting',
    slug: 'concrete-cutting',
    title: 'Concrete Cutting',
    tagline: 'Precision cutting and coring',
    description: 'Precision concrete cutting and coring services throughout Sydney. Specialized in structural remediation and building compliance for major infrastructure projects, delivering precise cuts with minimal dust and disruption across NSW.',
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
    heroImage: '/images/services/concrete-cutting/hero.jpg',
    featureImage: '/images/services/concrete-cutting/feature.jpg',
    processImage: '/images/services/concrete-cutting/process.jpg',
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
    relatedProjects: [],
    // Phase 2 SEO Optimization - Content Expansion
    commonApplications: 'Concrete cutting is vital for structural alterations in commercial buildings, creating openings for doors, windows, and ventilation ducts in residential properties, and precision core drilling for plumbing, electrical, and HVAC installations across Sydney. Our diamond sawing services are used for expansion joint installation in carparks, creating access hatches in high-rise buildings, demolition of load-bearing walls with engineering approval, and floor sawing for underfloor heating and drainage systems. We handle complex projects including Sydney Metro tunnel access, Barangaroo tower structural modifications, hospital upgrades requiring dust-free environments, and heritage building renovations where vibration-free cutting is essential. Applications range from small residential bathroom modifications to large-scale infrastructure projects requiring 24/7 operations and strict safety protocols.',
    whyChooseTRD: 'TRD Remedial operates Sydney\'s most advanced concrete cutting fleet, including Hilti wall saws capable of 800mm depth cuts, hydraulic floor saws for precision ±1mm accuracy, and diamond core drilling up to 600mm diameter. Our team holds all required NSW licenses and Building Commissioner approval for structural alterations, backed by $20 million public liability insurance. We use water suppression systems for dust-free cutting in occupied buildings, ensuring minimal disruption to businesses and residents. With 10,000+ cuts executed across residential, commercial, and infrastructure projects, we have the experience to handle complex scenarios including post-tensioned slab cutting with GPR scanning, underwater cutting for marine structures, and emergency cutting for fire-damaged buildings. All equipment is maintained to manufacturer specifications with daily safety checks, and our operators are certified in confined space entry and working at heights.',
    serviceArea: 'Servicing all Sydney metro areas 24/7: CBD, Eastern Suburbs, Northern Beaches, North Shore, Inner West, Western Sydney, Hills District, and Sutherland Shire. Extended regional coverage to Central Coast, Newcastle, Wollongong, and Blue Mountains for major commercial and infrastructure projects. Emergency cutting services available with 2-4 hour response time across NSW.',
    relatedServices: ['slab-scanning', 'structural-alterations', 'temporary-moving-joints'],
    faqs: [
      {
        question: 'How precise is concrete cutting?',
        answer: 'Our diamond sawing equipment achieves tolerances of ±2mm on typical cuts. Wall sawing can cut to exact dimensions for door and window openings, while core drilling produces perfectly circular holes for plumbing, electrical, and HVAC penetrations. GPS-guided floor sawing ensures straight cuts over long distances.',
      },
      {
        question: 'Is concrete cutting dusty and noisy?',
        answer: 'We use water-cooled diamond blades that eliminate 95%+ of dust through wet cutting. For indoor work where water runoff is a concern, we offer dry cutting with HEPA-filtered vacuum systems. Noise levels vary by equipment but we can work with noise restrictions for hospitals, schools, and occupied offices.',
      },
      {
        question: 'Can you cut through reinforced concrete?',
        answer: 'Yes, diamond sawing cuts through both concrete and steel reinforcement without issue. We can cut reinforced slabs up to 600mm thick, heavily reinforced walls, and post-tensioned concrete with specialized techniques. Pre-scanning with GPR is recommended to map reinforcement and avoid cutting critical structural elements.',
      },
      {
        question: 'What size openings can you create?',
        answer: 'We can create openings from small core holes (20mm diameter) to large doorways and vehicle access openings (4m+ wide). Wall sawing equipment handles walls up to 800mm thick. For very large openings, we can combine multiple cuts and provide temporary support during the cutting process.',
      },
      {
        question: 'How much does concrete cutting cost?',
        answer: 'Concrete cutting costs vary by method and complexity. Floor sawing typically ranges from $8-15 per linear meter for standard residential slabs. Wall sawing costs $25-50 per square meter depending on thickness and access. Core drilling is $5-15 per core depending on diameter and depth. Site-specific quotes provided after assessing project requirements.',
      },
      {
        question: 'Do I need an engineer for concrete cutting?',
        answer: 'For structural elements like load-bearing walls, columns, or beams, an engineer\'s approval is required before cutting. We work with structural engineers to assess impacts and design temporary support systems if needed. For non-structural work like doorways in partition walls, engineering may not be required but we recommend GPR scanning regardless.',
      },
    ],
    testimonials: [
      {
        quote: "TRD completed our Coles supermarket concrete cutting project on time despite challenging night work restrictions. Their dust control was exceptional - the store opened on schedule with zero complaints. Professional team that understands retail constraints.",
        author: 'James Robertson',
        role: 'Project Manager',
        company: 'Coles Group - Property Development',
        projectType: 'Retail Supermarket Modification',
      },
    ],
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
    heroImage: '/images/services/crack-repairs/hero.jpg',
    featureImage: '/images/services/crack-repairs/feature.jpg',
    processImage: '/images/services/crack-repairs/process.jpg',
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
    relatedProjects: ['project-009'],
    // Phase 2 SEO Optimization - Content Expansion
    commonApplications: 'Crack repairs are essential for cosmetic restoration of driveways, patios, and footpaths in residential properties, spalling concrete repair in carparks and commercial building facades, and surface defect treatment in industrial warehouses across Sydney. We address hairline surface cracks caused by shrinkage, thermal movement, or minor settling, as well as patch delaminated concrete resulting from reinforcement corrosion or freeze-thaw damage. Common projects include repairing damaged concrete edges on stairs and balconies, fixing chipped corners on pillars and beams, restoring weathered concrete surfaces on external walls, and matching existing finishes on heritage buildings where aesthetics are critical. Our repair mortars are formulated to match existing concrete color and texture, ensuring seamless visual integration. Applications span from small residential cosmetic fixes to large-scale commercial facade restoration projects.',
    whyChooseTRD: 'TRD Remedial specializes in invisible crack repairs that perfectly match existing concrete finishes - whether smooth trowel finish, exposed aggregate, or textured surfaces. Our technicians use color-matched polymer-modified repair mortars from leading manufacturers like Sika and BASF, ensuring repairs blend seamlessly with surrounding concrete both visually and structurally. We provide detailed surface preparation including shot-blasting for optimal bonding, apply corrosion inhibitors to exposed reinforcement, and use vapor-permeable coatings to prevent moisture entrapment. With expertise in heritage restoration and high-end residential projects, we understand the importance of aesthetic outcomes. All repairs are backed by 2-5 year warranties depending on application, and we provide maintenance advice to prolong repair lifespan. Our portfolio includes hundreds of successful crack repair projects across Sydney\'s premium residential estates, commercial towers, and heritage-listed structures.',
    serviceArea: 'Covering all Sydney regions: CBD, Eastern Suburbs (Double Bay, Bondi, Paddington), Northern Beaches (Manly, Mona Vale), North Shore (Mosman, Chatswood), Inner West (Newtown, Leichhardt), Western Sydney (Parramatta, Penrith), Hills District (Castle Hill, Baulkham Hills), and Sutherland Shire (Cronulla, Miranda). Extended service to Central Coast, Wollongong, and Newcastle for commercial projects.',
    relatedServices: ['crack-injection', 'concrete-strengthening', 'structural-alterations'],
    faqs: [
      {
        question: 'How long does concrete crack repair take?',
        answer: 'Most crack repair projects are completed in 1-3 days depending on the extent of damage and surface area. Residential driveway or patio repairs typically take 1-2 days, while large commercial facade repairs may take 3-5 days. The application itself is quick, but proper surface preparation and curing time are essential for long-lasting results.',
      },
      {
        question: 'Is crack repair a permanent solution?',
        answer: 'Yes, when completed with quality polymer-modified repair mortars and proper surface preparation, crack repairs are permanent and carry warranties of 2-5 years depending on application. The repair mortar is designed to match the concrete\'s strength and flexibility, preventing recurrence of the same crack.',
      },
      {
        question: 'What types of cracks can be repaired?',
        answer: 'We repair hairline surface cracks caused by shrinkage, cosmetic cracks from minor settling, thermal movement cracks, weathering damage, spalling concrete from reinforcement corrosion, and edge damage on stairs and balconies. For structural cracks requiring load-bearing restoration, we recommend epoxy crack injection instead.',
      },
      {
        question: 'How much does concrete crack repair cost?',
        answer: 'Crack repair costs typically range from $50-150 per linear meter for residential work, depending on crack width, surface condition, and finish type required. Large commercial projects may qualify for volume discounts. We provide free on-site quotes after assessing damage severity and finish requirements.',
      },
      {
        question: 'Will the repaired crack match the existing concrete finish?',
        answer: 'Yes, we use color-matched repair mortars and specialized finishing techniques to blend seamlessly with existing concrete. We can match smooth trowel finishes, exposed aggregate, textured surfaces, and heritage concrete colors. Most repairs are virtually invisible after completion.',
      },
      {
        question: 'Can crack repairs be done in occupied buildings?',
        answer: 'Absolutely. Crack repair is minimally disruptive with low dust generation and odor when using low-VOC polymer mortars. Residential and commercial properties can remain occupied during repairs. We can schedule weekend or after-hours work to minimize disruption to business operations.',
      },
    ],
    testimonials: [
      {
        quote: 'Our 25-year-old driveway was looking terrible with multiple spalling patches and cracks. TRD\'s crack repair team completely transformed it in just 2 days. The finish is flawless and looks like new concrete. Excellent workmanship and fair pricing.',
        author: 'Margaret Thompson',
        role: 'Homeowner',
        company: 'Double Bay Residential',
        projectType: 'Driveway & Patio Restoration - 150 sqm',
      },
      {
        quote: 'We needed cosmetic crack repairs on our commercial building facade before a major client event. TRD delivered perfect color matching and invisible repairs on schedule. Their attention to detail and professional finish exceeded our expectations.',
        author: 'Robert Chen',
        role: 'Building Manager',
        company: 'Parramatta Plaza Shopping Centre',
        projectType: 'Commercial Facade Restoration',
      },
    ],
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
    heroImage: '/images/services/structural-alterations/hero.jpg',
    featureImage: '/images/services/structural-alterations/feature.jpg',
    processImage: '/images/services/structural-alterations/process.jpg',
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
    relatedProjects: ['project-002', 'project-005', 'project-008', 'project-011'],
    // Phase 2 SEO Optimization - Content Expansion
    commonApplications: 'Structural alterations are critical for residential renovations including removing load-bearing walls to create open-plan living, installing steel beams for loft conversions, and creating new openings for staircases or lifts. Commercial applications include opening up retail spaces for tenancy fitouts, creating access points in office buildings for HVAC systems, modifying warehouse structures for mezzanine installations, and heritage building adaptations while preserving facades. Major infrastructure projects involve Sydney Metro tunnel connections, Barangaroo tower structural modifications, hospital expansions requiring temporary propping, and bridge strengthening works. Our structural engineering partners provide certified calculations and building approval documentation for all alterations. We specialize in complex scenarios including post-tensioned slab modifications, removing columns from multi-story buildings, creating basement car park entries, and retrofitting earthquake resistance into existing structures across Sydney.',
    whyChooseTRD: 'TRD Remedial holds Building Commissioner approval and works exclusively with certified structural engineers (CPEng) registered with Engineers Australia. Every alteration project includes full engineering documentation, building approval coordination, and compliance certification for DA (Development Application) and CC (Construction Certificate) requirements. Our team is experienced in complex structural propping systems including acrow props, steel needling beams, and hydraulic jacking for temporary load transfer during alterations. We use non-destructive testing methods including GPR scanning and load testing to assess existing structures before alterations commence. With 500+ structural alteration projects completed with zero structural failures, we have proven expertise in high-risk scenarios including heritage buildings, occupied commercial towers, and critical infrastructure. Our insurance covers structural alteration work up to $20 million, and we provide 10-year structural warranties backed by engineer certification.',
    serviceArea: 'Sydney-wide structural alteration services: CBD high-rises, Eastern Suburbs heritage homes, North Shore commercial buildings, Inner West industrial conversions, Western Sydney residential developments, Hills District new builds, and Sutherland Shire renovations. Regional projects in Newcastle, Wollongong, and Central Coast for major commercial and infrastructure alterations. Building Commissioner approval enables work across all NSW council areas.',
    relatedServices: ['concrete-cutting', 'concrete-strengthening', 'shoring-wall-repairs'],
    faqs: [
      {
        question: 'How long do structural alterations take?',
        answer: 'Timeline depends on project complexity. Simple wall removals in residential homes typically take 2-4 weeks including engineering approvals. Major commercial projects or those requiring temporary propping may take 6-12 weeks. We provide detailed project schedules during the engineering and planning phase before construction begins.',
      },
      {
        question: 'Do structural alterations require building approval?',
        answer: 'Yes, all structural alterations require Development Application (DA) and Construction Certificate (CC) from your local council. We coordinate all approvals with certified structural engineers and handle documentation requirements. Building Commissioner certification is provided on completion of all work.',
      },
      {
        question: 'What happens if there are delays in engineering approvals?',
        answer: 'Engineering approvals typically take 1-2 weeks for standard projects and 4-8 weeks for complex multi-story alterations. We manage all coordination with structural engineers and councils to minimize delays. Our detailed preliminary engineering reports help accelerate council review and approval processes.',
      },
      {
        question: 'How much do structural alterations cost?',
        answer: 'Costs vary significantly based on scope. Residential wall removals typically range $8,000-15,000 including temporary propping and structural frame installation. Commercial projects with complex engineering and phasing can cost $50,000-200,000+. We provide detailed quotes after structural assessment and engineering review.',
      },
      {
        question: 'Can occupants remain in the building during structural work?',
        answer: 'This depends on the project scope and council requirements. Small residential alterations may allow occupancy with noise and dust management. Large commercial or multi-story work typically requires partial or full building evacuation during the alteration phase for safety compliance. We work with your occupants to minimize disruption.',
      },
      {
        question: 'What temporary support systems are used?',
        answer: 'We use engineered temporary support systems including acrow props, steel needling beams, and hydraulic jacking systems designed by structural engineers for each specific project. All temporary works comply with building codes and are monitored daily for performance and safety throughout the alteration process.',
      },
    ],
    testimonials: [
      {
        quote: 'We wanted to remove the wall between our kitchen and lounge room. TRD handled all the engineering, permits, and installation of the steel beam with absolute professionalism. The work was completed in 3 weeks with minimal disruption. Our open-plan living is perfect. Highly recommended!',
        author: 'James Patterson',
        role: 'Homeowner',
        company: 'Mosman Heritage Home',
        projectType: 'Residential Open-Plan Renovation',
      },
      {
        quote: 'TRD managed our Westfield retail tenancy expansion requiring a major structural wall removal. Despite tight timelines and complex engineering, they delivered on schedule with zero safety incidents. Professional coordination between council, engineers, and site teams was exceptional.',
        author: 'Lisa Wong',
        role: 'Project Manager',
        company: 'Westfield Property Group',
        projectType: 'Commercial Retail Space Expansion',
      },
    ],
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
    heroImage: '/images/services/slab-scanning/hero.jpg',
    featureImage: '/images/services/slab-scanning/feature.jpg',
    processImage: '/images/services/slab-scanning/process.jpg',
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
    relatedProjects: ['project-006'],
    // Phase 2 SEO Optimization - Content Expansion
    commonApplications: 'GPR slab scanning is mandatory before any concrete cutting or coring to locate post-tension cables, rebar, and embedded services in slabs, walls, and beams across Sydney. Critical applications include pre-construction scanning for high-rise buildings, locating conduits before installing anchor bolts in commercial fitouts, mapping rebar layouts for structural assessments, and detecting voids or delamination in concrete members. Our scanning services prevent costly damage to post-tensioned slabs (repair costs $50,000+), identify safe coring locations for plumbing and electrical penetrations, verify as-built drawings against actual construction, and locate lost services in heritage buildings where documentation is incomplete. We scan suspended slabs before installing mechanical anchors, basement slabs before waterproofing injection, and bridge decks before overlay placement. Applications span from small residential renovations to major infrastructure projects including Sydney Metro stations and airport terminals.',
    whyChooseTRD: 'TRD Remedial uses state-of-the-art Hilti PS 1000 X-Scan Ground Penetrating Radar systems capable of detecting objects up to 400mm depth with 99.9% accuracy down to ±5mm precision. Our certified GPR operators provide on-site interpretation with instant marking of findings using color-coded spray paint (red for post-tension cables, blue for rebar, yellow for conduits). We generate detailed scan reports with 3D visualization, depth measurements, and recommended safe cutting/coring zones. With 1,000+ scans completed across residential, commercial, and infrastructure projects, we have experience with all slab types including post-tensioned, conventionally reinforced, composite steel-concrete, and precast systems. Emergency scanning available 24/7 for time-critical projects. Our scanning services are endorsed by structural engineers and comply with AS 3600 requirements for verifying reinforcement placement before structural modifications.',
    serviceArea: 'Comprehensive GPR scanning services across all Sydney suburbs: CBD, Eastern Suburbs, Northern Beaches, North Shore, Inner West, Western Sydney, Hills District, Sutherland Shire. Regional coverage for major projects in Central Coast, Newcastle, Wollongong, and Blue Mountains. Mobile scanning units enable rapid response within 2-4 hours for emergency projects across NSW.',
    relatedServices: ['concrete-cutting', 'structural-alterations', 'crack-injection'],
    faqs: [
      {
        question: 'How long does GPR slab scanning take?',
        answer: 'Most slab scanning projects take 1-2 days depending on area size and complexity. A typical 1,000 sqm office floor completes in one day. We mark findings on-site in real-time, allowing you to proceed with cutting or coring immediately without waiting for reports. Rush scanning available for time-critical projects.',
      },
      {
        question: 'How accurate is GPR slab scanning?',
        answer: 'Our Hilti PS 1000 X-Scan system detects objects with ±5mm precision to depths of 400mm. We achieve 99.9% accuracy in locating post-tension cables, rebar, conduits, and voids. Accuracy depends on concrete quality and object size, which we discuss during site assessment to set realistic expectations.',
      },
      {
        question: 'Why is GPR scanning mandatory before cutting?',
        answer: 'GPR scanning identifies hidden hazards including post-tension cables (damage repair costs $50,000+), electrical conduits (shock hazards), plumbing lines, and structural rebar. Scanning prevents costly damage, eliminates safety risks, and identifies safe cutting zones. Building codes require scanning before any structural cutting work.',
      },
      {
        question: 'How much does GPR scanning cost?',
        answer: 'Standard residential slab scanning costs $400-800 depending on area and complexity. Commercial projects range $1,500-5,000 for full floor scanning. Pricing is per linear meter of scanning pass ($3-5 per meter). Rush scanning and detailed 3D reports incur additional charges. Free site assessment and quotes provided.',
      },
      {
        question: 'What can GPR detect?',
        answer: 'GPR detects post-tension cables, reinforcing steel (rebar), embedded electrical conduits, water pipes, voids in concrete, delamination, and changes in concrete density. It cannot reliably detect small PVC pipes, very deep objects beyond 400mm, or objects directly in line with strong reflective surfaces. We discuss limitations during site inspection.',
      },
      {
        question: 'Can we use the scanning data for design planning?',
        answer: 'Yes, we provide detailed scan reports with depth measurements and 3D visualizations showing exact rebar spacing, cable locations, and conduit routes. These reports assist structural engineers in design planning, verify as-built versus original drawings, and guide mechanical anchor placement for fitouts.',
      },
    ],
    testimonials: [
      {
        quote: 'Before cutting our office slab for new mechanical penetrations, TRD\'s GPR scanning discovered active electrical conduits and post-tension cables we didn\'t know existed. Their expertise saved us from a potential disaster. Professional, thorough, and essential work.',
        author: 'Michael Foster',
        role: 'Facilities Manager',
        company: 'Barangaroo CBD Office Tower',
        projectType: 'Commercial Slab Scanning - 5,000 sqm',
      },
      {
        quote: 'TRD provided fast, accurate scanning before our carpark renovation. They delivered on-site marked results within hours and generated detailed reports showing rebar layout. The scanning data was invaluable for our structural engineer\'s upgrade planning.',
        author: 'Susan Mitchell',
        role: 'Project Manager',
        company: 'Neutral Bay Carpark Development',
        projectType: 'Carpark Scanning & Engineering',
      },
    ],
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
    heroImage: '/images/services/temporary-moving-joints/hero.jpg',
    featureImage: '/images/services/temporary-moving-joints/feature.jpg',
    processImage: '/images/services/temporary-moving-joints/process.jpg',
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
    relatedProjects: ['project-012'],
    // Phase 2 SEO Optimization - Content Expansion
    commonApplications: 'Temporary moving joints are essential during staged construction of large commercial buildings, allowing independent movement between construction phases before permanent joints are installed. Applications include multi-stage carpark construction where expansion joints accommodate thermal movement between poured sections, staged slab pouring in high-rise towers to manage shrinkage, and bridge deck construction where joints allow for creep and settlement. We design custom joint systems for major infrastructure projects including tunnel linings with segmental construction, retaining walls built in stages to accommodate backfilling, and marine structures subject to tidal movements. Temporary joints also accommodate movement during structural repairs where sections must remain operational during remediation. Common scenarios include shopping center extensions built adjacent to existing structures, office tower additions requiring flexible connections, and industrial facilities undergoing staged expansions across Sydney.',
    whyChooseTRD: 'TRD Remedial designs bespoke temporary joint solutions based on structural engineering calculations considering thermal expansion coefficients, concrete shrinkage rates, and differential settlement. Our systems use high-performance sealants, compressible foam fillers, and flexible backer rods sized to accommodate calculated movement ranges. We monitor joint performance throughout construction phases using precision survey equipment and adjust systems if actual movements exceed design parameters. With experience on major Sydney projects including Barangaroo staged construction and Sydney Metro station connections, we understand complex movement scenarios. All joint installations are coordinated with structural engineers and certified for Building Commissioner approval. We provide detailed movement monitoring reports, photographic documentation, and recommendations for transition to permanent joint systems. Our temporary joint solutions have successfully accommodated movements exceeding 50mm in major infrastructure projects without structural distress.',
    serviceArea: 'Servicing major construction projects across Sydney metro: CBD commercial developments, Eastern Suburbs residential expansions, Western Sydney industrial facilities, and infrastructure projects throughout NSW. Specialized service for staged construction requiring complex temporary joint systems. Regional coverage for Central Coast, Newcastle, and Wollongong major developments.',
    relatedServices: ['structural-alterations', 'concrete-cutting', 'crack-injection'],
    faqs: [
      {
        question: 'How long does temporary joint installation take?',
        answer: 'Most temporary joint installations complete in 1-3 days depending on joint length and complexity. A typical commercial building stage pour requires 2-3 days to install monitoring systems. Removal or transition to permanent joints typically takes 1-2 days. Timeline is coordinated with your construction schedule.',
      },
      {
        question: 'How much movement can temporary joints accommodate?',
        answer: 'Our engineered temporary joint systems accommodate movements up to 50-75mm depending on design. Movement capacity is calculated based on thermal expansion coefficients, concrete shrinkage rates, and differential settlement predictions. Larger movements are possible with specialized high-capacity systems designed on a project-specific basis.',
      },
      {
        question: 'Why are temporary joints needed during construction?',
        answer: 'Concrete experiences movement from thermal expansion, shrinkage, and differential settlement, especially during staged construction. Without temporary joints, these movements cause stress concentrations and cracking at weak points. Temporary joints accommodate these movements safely until permanent joint systems are installed after construction completes.',
      },
      {
        question: 'How much do temporary moving joints cost?',
        answer: 'Temporary joint costs typically range $150-300 per linear meter including design, installation, and monitoring. Large infrastructure projects with complex engineering may cost $300-500 per meter. Full cost includes engineering calculations, materials, installation labor, and movement monitoring throughout construction phases.',
      },
      {
        question: 'Can temporary joints be converted to permanent joints?',
        answer: 'Yes, temporary joint systems are designed with transition to permanent joints in mind. We provide recommendations for converting to permanent expansion joints, control joints, or isolation joints based on final building design and compliance requirements. Transition typically requires minor modification or replacement of sealants and covers.',
      },
      {
        question: 'How is joint performance monitored?',
        answer: 'We monitor temporary joints throughout construction using precision survey equipment, crack width gauges, and photographic documentation. If actual movements exceed design parameters, we adjust the joint system and provide structural engineer notifications. Detailed monitoring reports track performance at each construction stage.',
      },
    ],
    testimonials: [
      {
        quote: 'TRD designed and installed temporary moving joints for our staged apartment complex construction. Their engineering calculations were precise, and the joints accommodated all expected movements without any cracking issues. Professional service and excellent coordination with our structural engineer.',
        author: 'David Robertson',
        role: 'Project Manager',
        company: 'Renaissance Development Group',
        projectType: 'Multi-Stage Residential Complex - 12 Stages',
      },
      {
        quote: 'During our shopping center expansion, TRD\'s temporary joint system successfully bridged the connection between our existing slab and new construction. Zero cracking despite thermal cycling and construction loads. Highly professional and technically competent team.',
        author: 'Patricia Zhang',
        role: 'Construction Director',
        company: 'Westpoint Shopping Centre',
        projectType: 'Commercial Expansion - Phased Construction',
      },
    ],
  },
  {
    id: 'concrete-strengthening',
    slug: 'concrete-strengthening',
    title: 'Concrete Strengthening',
    tagline: 'Enhancing load capacity',
    description: 'Expert structural strengthening using carbon fibre (CFRP) and steel plate bonding in Sydney. Our structural remediation specialists increase the load-bearing capacity of existing concrete structures across NSW, ensuring building compliance and long-term stability.',
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
    heroImage: '/images/services/concrete-strengthening/hero.jpg',
    featureImage: '/images/services/concrete-strengthening/feature.jpg',
    processImage: '/images/services/concrete-strengthening/process.jpg',
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
    relatedProjects: ['project-001'],
    // Phase 2 SEO Optimization - Content Expansion
    commonApplications: 'Concrete strengthening is critical for increasing load capacity of existing structures to accommodate additional floors in residential and commercial buildings, upgrading carpark slabs to support heavier electric vehicles, and retrofitting earthquake resistance into heritage buildings across Sydney. Carbon fibre reinforced polymer (CFRP) wrapping is used for columns in high-rise buildings requiring strength upgrades without increasing dimensions, beams supporting increased loads from mezzanine installations, and slabs requiring flexural strengthening for equipment loads. Steel plate bonding applications include strengthening bridge beams for increased traffic loads, reinforcing tunnel lining segments, and upgrading industrial facility structures for heavy machinery. We specialize in confined space strengthening work including basement columns, underground carparks, and utility tunnels. Major projects include Barangaroo tower column strengthening, Sydney Metro station structural upgrades, and heritage building seismic retrofits meeting modern building codes.',
    whyChooseTRD: 'TRD Remedial uses premium CFRP systems from Sika CarboDur and BASF MBrace providing 50-200% load capacity increases with minimal weight addition and zero dimensional increase. Our structural engineers (CPEng certified) design strengthening systems using finite element analysis (FEA) to optimize fibre placement and bonding patterns. We conduct pull-off testing to verify adhesive bond strength exceeds 2.5MPa before loading strengthened elements. With Building Commissioner approval and AS 3600 compliance certification, our strengthening work is endorsed by structural engineers and accepted by all Sydney councils. We provide 10-year structural warranties backed by engineer certification and $20 million structural alteration insurance. Our portfolio includes 200+ strengthening projects with zero structural failures, demonstrating proven expertise in high-risk scenarios including occupied commercial towers, heritage structures, and critical infrastructure. All CFRP installations include UV protection coatings and fire rating upgrades where required.',
    serviceArea: 'Sydney-wide concrete strengthening services: CBD high-rises, Eastern Suburbs heritage buildings, North Shore commercial structures, Inner West industrial facilities, Western Sydney residential developments, and infrastructure across NSW. Specialized regional service for major strengthening projects in Central Coast, Newcastle, Wollongong, and Blue Mountains. Building Commissioner approval enables structural work across all NSW council jurisdictions.',
    relatedServices: ['structural-alterations', 'crack-injection', 'shoring-wall-repairs'],
    faqs: [
      {
        question: 'How long does concrete strengthening take?',
        answer: 'CFRP carbon fibre strengthening typically requires 1-2 weeks depending on element size and adhesive cure time. Surface preparation takes 2-3 days, fibre application takes 1-2 days, and full cure time is 7 days before loading. Rush curing systems available for time-critical projects reduce timeline to 3-5 days.',
      },
      {
        question: 'How much strength does CFRP strengthening add?',
        answer: 'CFRP strengthening typically increases load-bearing capacity by 50-200% depending on fibre layup design and bonding pattern. We conduct finite element analysis (FEA) to calculate exact capacity increases for your specific structural elements. Steel plate bonding provides 30-100% increases depending on plate thickness and bonding area.',
      },
      {
        question: 'Is concrete strengthening permanent?',
        answer: 'Yes, CFRP and steel plate bonding provide permanent structural upgrades with design life matching the concrete structure. We provide 10-year structural warranties backed by engineer certification. The carbon fibre is corrosion-resistant and unaffected by moisture or temperature extremes common in Australian climate conditions.',
      },
      {
        question: 'How much does concrete strengthening cost?',
        answer: 'CFRP strengthening typically costs $400-800 per square meter of application depending on system complexity and access. Steel plate bonding costs $500-1,200 per square meter. Residential applications on single beams or columns range $8,000-20,000. Commercial multi-element projects range $50,000-200,000+. Site-specific quotes provided after structural analysis.',
      },
      {
        question: 'Can buildings remain occupied during strengthening?',
        answer: 'Yes, concrete strengthening is minimally disruptive. Surface preparation creates dust managed with containment barriers, and CFRP application uses low-odor epoxies. Most work can proceed with building occupancy using temporary surface protection and scheduling during non-critical hours. No load removal required in many cases.',
      },
      {
        question: 'Do I need engineer approval for strengthening?',
        answer: 'Yes, all structural strengthening work requires design calculations from a certified structural engineer and Building Commissioner approval before commencement. We coordinate all engineering documentation and provide compliance certification on completion. Building council approval is standard for load capacity upgrades.',
      },
    ],
    testimonials: [
      {
        quote: 'Our 1960s office tower needed column strengthening to accommodate additional mechanical loads on upper floors. TRD\'s CFRP strengthening solution was non-invasive and completed in 2 weeks without relocating occupants. The structural upgrade was flawless and we gained 80% additional capacity per column.',
        author: 'Christopher Lee',
        role: 'Facility Manager',
        company: 'North Sydney Business Centre',
        projectType: 'High-Rise Column Strengthening - 40 Columns',
      },
      {
        quote: 'We wanted to convert our warehouse to add a second level mezzanine, but the existing slab wasn\'t rated for the additional load. TRD strengthened our main support beams with carbon fibre, and now we have the capacity we need. The upgrade was seamless and cost-effective compared to reconstruction.',
        author: 'Nicole Ahmed',
        role: 'Operations Director',
        company: 'Holroyd Industrial Logistics',
        projectType: 'Industrial Slab & Beam Strengthening',
      },
    ],
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
    heroImage: '/images/services/curtain-wall-injection/hero.jpg',
    featureImage: '/images/services/curtain-wall-injection/feature.jpg',
    processImage: '/images/services/curtain-wall-injection/process.jpg',
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
    relatedProjects: ['project-003'],
    // Phase 2 SEO Optimization - Content Expansion
    commonApplications: 'Curtain injection grouting is the preferred waterproofing method for below-ground structures including basement walls with active leaks, underground carparks with groundwater infiltration, and tunnels experiencing water ingress across Sydney. Critical applications include heritage building basements where external excavation would damage foundations, lift pits and sumps with persistent water problems, and retaining walls in residential properties where excavation is impractical. We use curtain injection to waterproof subway stations, underground shopping center basements, hospital basements, and high-rise tower basement levels without disrupting occupants. The technique creates a continuous waterproof gel curtain behind walls, stopping water flow through cracks, joints, and porous concrete. Common scenarios include repairing failed membrane systems without excavation, sealing construction joints in basement walls, stopping water infiltration through lift shaft walls, and creating waterproof barriers in confined access situations where traditional waterproofing cannot be applied.',
    whyChooseTRD: 'TRD Remedial uses acrylamide and polyurethane gel systems specifically formulated for soil stabilization and curtain grouting, providing permanent waterproof barriers that remain flexible and accommodate minor ground movements. Our injection technicians map groundwater flow patterns using moisture meters and thermal imaging to optimize injection hole spacing and grout volumes. We conduct water pressure testing post-injection to verify complete water cutoff before demobilizing. With Building Commissioner approval and specialist training in chemical grouting systems, our team handles complex scenarios including contaminated groundwater, artesian pressure conditions, and proximity to sensitive structures. We provide 5-year waterproofing warranties on curtain injection work, backed by detailed injection records showing grout volumes, pressures, and coverage. Our curtain injection projects include Sydney CBD basement towers, Eastern Suburbs heritage homes, and major infrastructure including Sydney Metro underground stations.',
    serviceArea: 'Specialized curtain injection services across Sydney metro: CBD basement complexes, Eastern Suburbs heritage buildings, North Shore residential basements, Inner West industrial facilities, and infrastructure projects throughout NSW. Regional service for major waterproofing projects in Central Coast, Newcastle, and Wollongong requiring below-ground curtain injection expertise.',
    relatedServices: ['crack-injection', 'structural-alterations', 'shoring-wall-repairs'],
    faqs: [
      {
        question: 'How long does curtain wall injection take?',
        answer: 'Most curtain injection projects complete in 2-5 days depending on wall area and water pressure conditions. The injection process itself takes 1-2 days, but gel requires time to penetrate and harden. We verify waterproofing through water pressure testing before demobilizing, typically 3-5 days after injection begins.',
      },
      {
        question: 'Is curtain wall injection a permanent waterproofing solution?',
        answer: 'Yes, when performed correctly with quality gel systems, curtain injection provides permanent waterproofing with a 5-year guarantee. The acrylamide or polyurethane gel fills voids, cracks, and pores behind walls to create an impermeable barrier. The waterproofing remains effective regardless of groundwater pressure fluctuations or seasonal water table variations.',
      },
      {
        question: 'Why curtain injection instead of external excavation and membrane?',
        answer: 'Curtain injection avoids expensive excavation, protects existing landscaping and structures, and works in situations where excavation is impossible. Heritage buildings, tight urban sites, and basements with water problems benefit from injection because we don\'t disturb the foundation perimeter. Costs are typically 40-60% less than full excavation and membrane installation.',
      },
      {
        question: 'How much does curtain wall injection cost?',
        answer: 'Curtain wall injection typically costs $200-500 per linear meter depending on wall height and groundwater pressure. A typical 15m x 3m deep basement wall costs $9,000-22,500. Larger commercial projects with multiple walls and deeper foundations may cost $50,000-150,000. Free site assessment and quotes provided with water pressure analysis.',
      },
      {
        question: 'Will curtain injection damage my basement or interior finishes?',
        answer: 'Interior damage is minimal. We drill small injection holes from inside the basement at regular intervals (typically 1m spacing). Holes are sealed after injection and can be plastered over invisibly. No excavation means no exterior damage, and existing interior finishes remain undisturbed. We take precautions to protect existing finishes during injection.',
      },
      {
        question: 'How long until the basement is completely dry?',
        answer: 'Most basements experience immediate water cutoff, but complete drying may take 2-4 weeks as trapped moisture evaporates through concrete and existing ventilation. We recommend installing temporary dehumidifiers to accelerate drying. Water pressure testing confirms complete water cutoff within 3-5 days of injection completion.',
      },
    ],
    testimonials: [
      {
        quote: 'Our heritage terrace basement had been flooding every winter for 20 years. External waterproofing would have destroyed the heritage facade. TRD\'s curtain injection fixed it without excavation. Three years later, the basement is still completely dry. Remarkable solution for impossible situations.',
        author: 'Elizabeth Hartley',
        role: 'Heritage Property Owner',
        company: 'Paddington Terrace Residence',
        projectType: 'Heritage Basement Waterproofing',
      },
      {
        quote: 'We had an active groundwater infiltration problem in our underground carpark. TRD\'s curtain injection team worked methodically to seal 150 linear meters of basement wall. The water stopped completely and the carpark has been bone dry for 18 months. Professional team and guaranteed results.',
        author: 'Anthony Nguyen',
        role: 'Building Manager',
        company: 'Chatswood Corporate Plaza',
        projectType: 'Commercial Carpark Waterproofing - 3 Levels',
      },
    ],
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
    icon: '/images/projects/florence-capri-complex/gallery-01.jpg',
    visual: '/images/projects/florence-capri-complex/gallery-01.jpg',
    heroImage: '/images/projects/florence-capri-complex/gallery-01.jpg',
    featureImage: '/images/projects/florence-capri-complex/gallery-02.jpg',
    processImage: '/images/projects/florence-capri-complex/gallery-03.jpg',
    stats: [
      { value: '100+', label: 'Walls Repaired' },
      { value: '15+', label: 'Years Experience' },
      { value: '0', label: 'Failures' },
    ],
    process: [
      { step: 1, title: 'Assess', description: 'Inspect wall condition' },
      { step: 2, title: 'Stabilize', description: 'Install temporary support if needed' },
      { step: 3, title: 'Repair', description: 'Apply shotcrete or fix anchors' },
      { step: 4, title: 'Drain', description: 'Ensure proper drainage' },
    ],
    relatedProjects: [],
    // Phase 2 SEO Optimization - Content Expansion
    commonApplications: 'Shoring and retaining wall repairs are essential for residential properties with failing boundary walls, sloped blocks requiring stabilization, and pool retaining walls showing signs of movement across Sydney. Commercial applications include carpark retaining walls with structural cracks, industrial site perimeter walls requiring reinforcement, and shopping center basement walls showing signs of earth pressure distress. We repair shotcrete retaining walls with spalling and reinforcement corrosion, soldier pile and lagging walls with damaged timbers, masonry retaining walls with bulging or leaning, and modular block walls requiring reanchoring. Common scenarios include landslip repairs after heavy rain, undermined walls from adjacent excavation, anchor failure in tieback walls, and drainage failure causing hydrostatic pressure buildup. Major projects include restoring heritage sandstone retaining walls, stabilizing hillside properties in Eastern Suburbs, and repairing damaged shoring in excavation sites across Sydney\'s construction zones.',
    whyChooseTRD: 'TRD Remedial provides comprehensive shoring wall assessment including geotechnical analysis, structural engineering review, and drainage system evaluation to identify root causes of wall failure. Our repair solutions include shotcrete application for spalled concrete, ground anchor installation or replacement for tieback walls, drainage system upgrades with geocomposite drainage boards, and structural reinforcement using soil nails or helical anchors. We coordinate with geotechnical engineers for soil testing and bearing capacity verification, ensuring repair solutions address underlying ground conditions. With Building Commissioner approval and certification from structural engineers, our shoring wall repairs meet building code requirements and provide 5-10 year warranties depending on repair extent. Our portfolio includes 100+ retaining wall repairs with zero re-failures, demonstrating proven expertise in complex geotechnical scenarios. We provide ongoing monitoring services with crack width measurements and inclinometer readings to track wall stability post-repair.',
    serviceArea: 'Comprehensive shoring and retaining wall repair services across Sydney: Eastern Suburbs sloped properties, North Shore hillside homes, Northern Beaches coastal erosion sites, Inner West industrial sites, Western Sydney developments, and infrastructure throughout NSW. Specialized regional service for major wall stabilization projects in Central Coast, Blue Mountains, and Wollongong hillside properties.',
    relatedServices: ['structural-alterations', 'concrete-strengthening', 'curtain-wall-injection'],
    faqs: [
      {
        question: 'How long do shoring wall repairs take?',
        answer: 'Timeline depends on repair extent. Simple drainage improvements take 2-3 days. Shotcrete applications for spalling repairs take 3-5 days. Major structural stabilization with ground anchors or soil nails may take 2-4 weeks. We provide detailed schedules after initial structural assessment and geotechnical review.',
      },
      {
        question: 'Are shoring wall repairs permanent solutions?',
        answer: 'Yes, properly executed shoring wall repairs are permanent. Shotcrete applications bond permanently to existing concrete. Ground anchors and soil nails provide permanent load transfer to stable soil. We provide 5-10 year warranties depending on repair extent and ongoing maintenance requirements.',
      },
      {
        question: 'Why is my retaining wall failing?',
        answer: 'Common failure causes include drainage failure (water pressure buildup), reinforcement corrosion weakening load capacity, inadequate anchor maintenance, soil movement from adjacent excavation, and aging concrete deterioration. We conduct geotechnical assessment including soil testing and drainage analysis to identify root causes before designing repairs.',
      },
      {
        question: 'How much do shoring wall repairs cost?',
        answer: 'Costs vary significantly. Simple drainage upgrades cost $3,000-8,000. Shotcrete repair of 50 sqm spalling costs $8,000-15,000. Major structural repairs with new anchors or soil nails range $30,000-100,000 depending on wall height and soil conditions. Geotechnical assessment required for accurate quoting.',
      },
      {
        question: 'Will wall repairs require vacating the property?',
        answer: 'Minor drainage repairs and shotcrete patching allow normal property use with temporary fencing for safety. Major anchor or soil nail installation typically requires restricted access to the work area but doesn\'t necessitate full property evacuation. We minimize disruption through careful work sequencing and scheduling.',
      },
      {
        question: 'Do I need a geotechnical engineer?',
        answer: 'Yes, we recommend geotechnical assessment for all shoring wall repairs exceeding simple maintenance. Assessment identifies underlying soil conditions, bearing capacity, drainage patterns, and appropriate repair methods. Certified geotechnical reports are required for major repairs and ensure long-term stability.',
      },
    ],
    testimonials: [
      {
        quote: 'Our retaining wall on the Northern Beaches property was showing serious cracks and leaning outward. TRD\'s geotechnical assessment identified drainage failure as the root cause. Their shotcrete repair and drainage upgrade completely stabilized the wall. We have confidence it will last another 30+ years.',
        author: 'Victoria Summers',
        role: 'Homeowner',
        company: 'Avalon Beach Residential',
        projectType: 'Coastal Retaining Wall Stabilization',
      },
      {
        quote: 'After adjacent excavation damaged our carpark retaining wall, TRD provided emergency assessment and stabilization within 48 hours. They installed temporary support, then completed permanent soil nail reinforcement. Fast response, excellent engineering, and complete peace of mind.',
        author: 'Kevin Wu',
        role: 'Building Manager',
        company: 'Westfield Warringah Shopping Centre',
        projectType: 'Emergency Retaining Wall Stabilization',
      },
    ],
  },
];
