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
  // Phase 2 SEO Optimization - Content Expansion
  commonApplications?: string;
  whyChooseTRD?: string;
  serviceArea?: string;
  relatedServices?: string[];
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
    // Phase 2 SEO Optimization - Content Expansion
    commonApplications: 'Crack injection is essential for basement waterproofing, concrete carpark repairs, structural remediation in high-rise buildings, and residential foundation repairs across Sydney. We use epoxy injection for structural cracks to restore 100% load-bearing capacity in beams, columns, and slabs. Polyurethane injection is ideal for active water leaks in retaining walls, tunnels, and below-ground structures where waterproofing is critical. Common applications include fixing settlement cracks in residential homes, sealing expansion joints in commercial buildings, repairing impact damage in industrial facilities, and preventing corrosion in reinforced concrete by sealing cracks before water infiltrates the steel reinforcement. Our injection techniques work on cracks ranging from hairline (0.1mm) to structural (10mm+) widths.',
    whyChooseTRD: 'TRD Remedial brings 15+ years of crack injection expertise to Sydney, with Building Commissioner approval and $20 million public liability insurance ensuring your project is in safe hands. Our technicians are trained in both epoxy and polyurethane injection systems, using only premium-grade resins from Sika and BASF that meet Australian Standards AS 3600. We provide free on-site inspections to accurately diagnose crack causes - whether from settlement, shrinkage, structural overload, or thermal movement - ensuring we select the correct injection material and technique. Our crack repairs carry 5-10 year warranties on structural epoxy injection and 3-5 years on waterproofing polyurethane injection. With 5,000+ meters of cracks successfully injected across residential, commercial, and infrastructure projects, we have the experience to handle complex injection scenarios including overhead work, confined spaces, and active leaking cracks.',
    serviceArea: 'We service all Sydney metropolitan areas including CBD, Eastern Suburbs, Northern Beaches, North Shore, Inner West, Western Sydney, South Sydney, Hills District, and Sutherland Shire. Extended coverage to Central Coast, Newcastle, and Wollongong for commercial projects. Available 24/7 for emergency structural crack repairs and active leak sealing across NSW.',
    relatedServices: ['concrete-strengthening', 'structural-alterations', 'slab-scanning'],
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
    // Phase 2 SEO Optimization - Content Expansion
    commonApplications: 'Concrete cutting is vital for structural alterations in commercial buildings, creating openings for doors, windows, and ventilation ducts in residential properties, and precision core drilling for plumbing, electrical, and HVAC installations across Sydney. Our diamond sawing services are used for expansion joint installation in carparks, creating access hatches in high-rise buildings, demolition of load-bearing walls with engineering approval, and floor sawing for underfloor heating and drainage systems. We handle complex projects including Sydney Metro tunnel access, Barangaroo tower structural modifications, hospital upgrades requiring dust-free environments, and heritage building renovations where vibration-free cutting is essential. Applications range from small residential bathroom modifications to large-scale infrastructure projects requiring 24/7 operations and strict safety protocols.',
    whyChooseTRD: 'TRD Remedial operates Sydney\'s most advanced concrete cutting fleet, including Hilti wall saws capable of 800mm depth cuts, hydraulic floor saws for precision ±1mm accuracy, and diamond core drilling up to 600mm diameter. Our team holds all required NSW licenses and Building Commissioner approval for structural alterations, backed by $20 million public liability insurance. We use water suppression systems for dust-free cutting in occupied buildings, ensuring minimal disruption to businesses and residents. With 10,000+ cuts executed across residential, commercial, and infrastructure projects, we have the experience to handle complex scenarios including post-tensioned slab cutting with GPR scanning, underwater cutting for marine structures, and emergency cutting for fire-damaged buildings. All equipment is maintained to manufacturer specifications with daily safety checks, and our operators are certified in confined space entry and working at heights.',
    serviceArea: 'Servicing all Sydney metro areas 24/7: CBD, Eastern Suburbs, Northern Beaches, North Shore, Inner West, Western Sydney, Hills District, and Sutherland Shire. Extended regional coverage to Central Coast, Newcastle, Wollongong, and Blue Mountains for major commercial and infrastructure projects. Emergency cutting services available with 2-4 hour response time across NSW.',
    relatedServices: ['slab-scanning', 'structural-alterations', 'temporary-moving-joints'],
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
    // Phase 2 SEO Optimization - Content Expansion
    commonApplications: 'Crack repairs are essential for cosmetic restoration of driveways, patios, and footpaths in residential properties, spalling concrete repair in carparks and commercial building facades, and surface defect treatment in industrial warehouses across Sydney. We address hairline surface cracks caused by shrinkage, thermal movement, or minor settling, as well as patch delaminated concrete resulting from reinforcement corrosion or freeze-thaw damage. Common projects include repairing damaged concrete edges on stairs and balconies, fixing chipped corners on pillars and beams, restoring weathered concrete surfaces on external walls, and matching existing finishes on heritage buildings where aesthetics are critical. Our repair mortars are formulated to match existing concrete color and texture, ensuring seamless visual integration. Applications span from small residential cosmetic fixes to large-scale commercial facade restoration projects.',
    whyChooseTRD: 'TRD Remedial specializes in invisible crack repairs that perfectly match existing concrete finishes - whether smooth trowel finish, exposed aggregate, or textured surfaces. Our technicians use color-matched polymer-modified repair mortars from leading manufacturers like Sika and BASF, ensuring repairs blend seamlessly with surrounding concrete both visually and structurally. We provide detailed surface preparation including shot-blasting for optimal bonding, apply corrosion inhibitors to exposed reinforcement, and use vapor-permeable coatings to prevent moisture entrapment. With expertise in heritage restoration and high-end residential projects, we understand the importance of aesthetic outcomes. All repairs are backed by 2-5 year warranties depending on application, and we provide maintenance advice to prolong repair lifespan. Our portfolio includes hundreds of successful crack repair projects across Sydney\'s premium residential estates, commercial towers, and heritage-listed structures.',
    serviceArea: 'Covering all Sydney regions: CBD, Eastern Suburbs (Double Bay, Bondi, Paddington), Northern Beaches (Manly, Mona Vale), North Shore (Mosman, Chatswood), Inner West (Newtown, Leichhardt), Western Sydney (Parramatta, Penrith), Hills District (Castle Hill, Baulkham Hills), and Sutherland Shire (Cronulla, Miranda). Extended service to Central Coast, Wollongong, and Newcastle for commercial projects.',
    relatedServices: ['crack-injection', 'concrete-strengthening', 'structural-alterations'],
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
    // Phase 2 SEO Optimization - Content Expansion
    commonApplications: 'Structural alterations are critical for residential renovations including removing load-bearing walls to create open-plan living, installing steel beams for loft conversions, and creating new openings for staircases or lifts. Commercial applications include opening up retail spaces for tenancy fitouts, creating access points in office buildings for HVAC systems, modifying warehouse structures for mezzanine installations, and heritage building adaptations while preserving facades. Major infrastructure projects involve Sydney Metro tunnel connections, Barangaroo tower structural modifications, hospital expansions requiring temporary propping, and bridge strengthening works. Our structural engineering partners provide certified calculations and building approval documentation for all alterations. We specialize in complex scenarios including post-tensioned slab modifications, removing columns from multi-story buildings, creating basement car park entries, and retrofitting earthquake resistance into existing structures across Sydney.',
    whyChooseTRD: 'TRD Remedial holds Building Commissioner approval and works exclusively with certified structural engineers (CPEng) registered with Engineers Australia. Every alteration project includes full engineering documentation, building approval coordination, and compliance certification for DA (Development Application) and CC (Construction Certificate) requirements. Our team is experienced in complex structural propping systems including acrow props, steel needling beams, and hydraulic jacking for temporary load transfer during alterations. We use non-destructive testing methods including GPR scanning and load testing to assess existing structures before alterations commence. With 500+ structural alteration projects completed with zero structural failures, we have proven expertise in high-risk scenarios including heritage buildings, occupied commercial towers, and critical infrastructure. Our insurance covers structural alteration work up to $20 million, and we provide 10-year structural warranties backed by engineer certification.',
    serviceArea: 'Sydney-wide structural alteration services: CBD high-rises, Eastern Suburbs heritage homes, North Shore commercial buildings, Inner West industrial conversions, Western Sydney residential developments, Hills District new builds, and Sutherland Shire renovations. Regional projects in Newcastle, Wollongong, and Central Coast for major commercial and infrastructure alterations. Building Commissioner approval enables work across all NSW council areas.',
    relatedServices: ['concrete-cutting', 'concrete-strengthening', 'shoring-wall-repairs'],
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
    // Phase 2 SEO Optimization - Content Expansion
    commonApplications: 'GPR slab scanning is mandatory before any concrete cutting or coring to locate post-tension cables, rebar, and embedded services in slabs, walls, and beams across Sydney. Critical applications include pre-construction scanning for high-rise buildings, locating conduits before installing anchor bolts in commercial fitouts, mapping rebar layouts for structural assessments, and detecting voids or delamination in concrete members. Our scanning services prevent costly damage to post-tensioned slabs (repair costs $50,000+), identify safe coring locations for plumbing and electrical penetrations, verify as-built drawings against actual construction, and locate lost services in heritage buildings where documentation is incomplete. We scan suspended slabs before installing mechanical anchors, basement slabs before waterproofing injection, and bridge decks before overlay placement. Applications span from small residential renovations to major infrastructure projects including Sydney Metro stations and airport terminals.',
    whyChooseTRD: 'TRD Remedial uses state-of-the-art Hilti PS 1000 X-Scan Ground Penetrating Radar systems capable of detecting objects up to 400mm depth with 99.9% accuracy down to ±5mm precision. Our certified GPR operators provide on-site interpretation with instant marking of findings using color-coded spray paint (red for post-tension cables, blue for rebar, yellow for conduits). We generate detailed scan reports with 3D visualization, depth measurements, and recommended safe cutting/coring zones. With 1,000+ scans completed across residential, commercial, and infrastructure projects, we have experience with all slab types including post-tensioned, conventionally reinforced, composite steel-concrete, and precast systems. Emergency scanning available 24/7 for time-critical projects. Our scanning services are endorsed by structural engineers and comply with AS 3600 requirements for verifying reinforcement placement before structural modifications.',
    serviceArea: 'Comprehensive GPR scanning services across all Sydney suburbs: CBD, Eastern Suburbs, Northern Beaches, North Shore, Inner West, Western Sydney, Hills District, Sutherland Shire. Regional coverage for major projects in Central Coast, Newcastle, Wollongong, and Blue Mountains. Mobile scanning units enable rapid response within 2-4 hours for emergency projects across NSW.',
    relatedServices: ['concrete-cutting', 'structural-alterations', 'crack-injection'],
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
    // Phase 2 SEO Optimization - Content Expansion
    commonApplications: 'Temporary moving joints are essential during staged construction of large commercial buildings, allowing independent movement between construction phases before permanent joints are installed. Applications include multi-stage carpark construction where expansion joints accommodate thermal movement between poured sections, staged slab pouring in high-rise towers to manage shrinkage, and bridge deck construction where joints allow for creep and settlement. We design custom joint systems for major infrastructure projects including tunnel linings with segmental construction, retaining walls built in stages to accommodate backfilling, and marine structures subject to tidal movements. Temporary joints also accommodate movement during structural repairs where sections must remain operational during remediation. Common scenarios include shopping center extensions built adjacent to existing structures, office tower additions requiring flexible connections, and industrial facilities undergoing staged expansions across Sydney.',
    whyChooseTRD: 'TRD Remedial designs bespoke temporary joint solutions based on structural engineering calculations considering thermal expansion coefficients, concrete shrinkage rates, and differential settlement. Our systems use high-performance sealants, compressible foam fillers, and flexible backer rods sized to accommodate calculated movement ranges. We monitor joint performance throughout construction phases using precision survey equipment and adjust systems if actual movements exceed design parameters. With experience on major Sydney projects including Barangaroo staged construction and Sydney Metro station connections, we understand complex movement scenarios. All joint installations are coordinated with structural engineers and certified for Building Commissioner approval. We provide detailed movement monitoring reports, photographic documentation, and recommendations for transition to permanent joint systems. Our temporary joint solutions have successfully accommodated movements exceeding 50mm in major infrastructure projects without structural distress.',
    serviceArea: 'Servicing major construction projects across Sydney metro: CBD commercial developments, Eastern Suburbs residential expansions, Western Sydney industrial facilities, and infrastructure projects throughout NSW. Specialized service for staged construction requiring complex temporary joint systems. Regional coverage for Central Coast, Newcastle, and Wollongong major developments.',
    relatedServices: ['structural-alterations', 'concrete-cutting', 'crack-injection'],
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
    // Phase 2 SEO Optimization - Content Expansion
    commonApplications: 'Concrete strengthening is critical for increasing load capacity of existing structures to accommodate additional floors in residential and commercial buildings, upgrading carpark slabs to support heavier electric vehicles, and retrofitting earthquake resistance into heritage buildings across Sydney. Carbon fibre reinforced polymer (CFRP) wrapping is used for columns in high-rise buildings requiring strength upgrades without increasing dimensions, beams supporting increased loads from mezzanine installations, and slabs requiring flexural strengthening for equipment loads. Steel plate bonding applications include strengthening bridge beams for increased traffic loads, reinforcing tunnel lining segments, and upgrading industrial facility structures for heavy machinery. We specialize in confined space strengthening work including basement columns, underground carparks, and utility tunnels. Major projects include Barangaroo tower column strengthening, Sydney Metro station structural upgrades, and heritage building seismic retrofits meeting modern building codes.',
    whyChooseTRD: 'TRD Remedial uses premium CFRP systems from Sika CarboDur and BASF MBrace providing 50-200% load capacity increases with minimal weight addition and zero dimensional increase. Our structural engineers (CPEng certified) design strengthening systems using finite element analysis (FEA) to optimize fibre placement and bonding patterns. We conduct pull-off testing to verify adhesive bond strength exceeds 2.5MPa before loading strengthened elements. With Building Commissioner approval and AS 3600 compliance certification, our strengthening work is endorsed by structural engineers and accepted by all Sydney councils. We provide 10-year structural warranties backed by engineer certification and $20 million structural alteration insurance. Our portfolio includes 200+ strengthening projects with zero structural failures, demonstrating proven expertise in high-risk scenarios including occupied commercial towers, heritage structures, and critical infrastructure. All CFRP installations include UV protection coatings and fire rating upgrades where required.',
    serviceArea: 'Sydney-wide concrete strengthening services: CBD high-rises, Eastern Suburbs heritage buildings, North Shore commercial structures, Inner West industrial facilities, Western Sydney residential developments, and infrastructure across NSW. Specialized regional service for major strengthening projects in Central Coast, Newcastle, Wollongong, and Blue Mountains. Building Commissioner approval enables structural work across all NSW council jurisdictions.',
    relatedServices: ['structural-alterations', 'crack-injection', 'shoring-wall-repairs'],
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
    // Phase 2 SEO Optimization - Content Expansion
    commonApplications: 'Curtain injection grouting is the preferred waterproofing method for below-ground structures including basement walls with active leaks, underground carparks with groundwater infiltration, and tunnels experiencing water ingress across Sydney. Critical applications include heritage building basements where external excavation would damage foundations, lift pits and sumps with persistent water problems, and retaining walls in residential properties where excavation is impractical. We use curtain injection to waterproof subway stations, underground shopping center basements, hospital basements, and high-rise tower basement levels without disrupting occupants. The technique creates a continuous waterproof gel curtain behind walls, stopping water flow through cracks, joints, and porous concrete. Common scenarios include repairing failed membrane systems without excavation, sealing construction joints in basement walls, stopping water infiltration through lift shaft walls, and creating waterproof barriers in confined access situations where traditional waterproofing cannot be applied.',
    whyChooseTRD: 'TRD Remedial uses acrylamide and polyurethane gel systems specifically formulated for soil stabilization and curtain grouting, providing permanent waterproof barriers that remain flexible and accommodate minor ground movements. Our injection technicians map groundwater flow patterns using moisture meters and thermal imaging to optimize injection hole spacing and grout volumes. We conduct water pressure testing post-injection to verify complete water cutoff before demobilizing. With Building Commissioner approval and specialist training in chemical grouting systems, our team handles complex scenarios including contaminated groundwater, artesian pressure conditions, and proximity to sensitive structures. We provide 5-year waterproofing warranties on curtain injection work, backed by detailed injection records showing grout volumes, pressures, and coverage. Our curtain injection projects include Sydney CBD basement towers, Eastern Suburbs heritage homes, and major infrastructure including Sydney Metro underground stations.',
    serviceArea: 'Specialized curtain injection services across Sydney metro: CBD basement complexes, Eastern Suburbs heritage buildings, North Shore residential basements, Inner West industrial facilities, and infrastructure projects throughout NSW. Regional service for major waterproofing projects in Central Coast, Newcastle, and Wollongong requiring below-ground curtain injection expertise.',
    relatedServices: ['crack-injection', 'structural-alterations', 'shoring-wall-repairs'],
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
    // Phase 2 SEO Optimization - Content Expansion
    commonApplications: 'Shoring and retaining wall repairs are essential for residential properties with failing boundary walls, sloped blocks requiring stabilization, and pool retaining walls showing signs of movement across Sydney. Commercial applications include carpark retaining walls with structural cracks, industrial site perimeter walls requiring reinforcement, and shopping center basement walls showing signs of earth pressure distress. We repair shotcrete retaining walls with spalling and reinforcement corrosion, soldier pile and lagging walls with damaged timbers, masonry retaining walls with bulging or leaning, and modular block walls requiring reanchoring. Common scenarios include landslip repairs after heavy rain, undermined walls from adjacent excavation, anchor failure in tieback walls, and drainage failure causing hydrostatic pressure buildup. Major projects include restoring heritage sandstone retaining walls, stabilizing hillside properties in Eastern Suburbs, and repairing damaged shoring in excavation sites across Sydney\'s construction zones.',
    whyChooseTRD: 'TRD Remedial provides comprehensive shoring wall assessment including geotechnical analysis, structural engineering review, and drainage system evaluation to identify root causes of wall failure. Our repair solutions include shotcrete application for spalled concrete, ground anchor installation or replacement for tieback walls, drainage system upgrades with geocomposite drainage boards, and structural reinforcement using soil nails or helical anchors. We coordinate with geotechnical engineers for soil testing and bearing capacity verification, ensuring repair solutions address underlying ground conditions. With Building Commissioner approval and certification from structural engineers, our shoring wall repairs meet building code requirements and provide 5-10 year warranties depending on repair extent. Our portfolio includes 100+ retaining wall repairs with zero re-failures, demonstrating proven expertise in complex geotechnical scenarios. We provide ongoing monitoring services with crack width measurements and inclinometer readings to track wall stability post-repair.',
    serviceArea: 'Comprehensive shoring and retaining wall repair services across Sydney: Eastern Suburbs sloped properties, North Shore hillside homes, Northern Beaches coastal erosion sites, Inner West industrial sites, Western Sydney developments, and infrastructure throughout NSW. Specialized regional service for major wall stabilization projects in Central Coast, Blue Mountains, and Wollongong hillside properties.',
    relatedServices: ['structural-alterations', 'concrete-strengthening', 'curtain-wall-injection'],
  },
];
