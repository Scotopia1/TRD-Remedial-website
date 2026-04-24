import './seo-content.css';
import { getTeamMembers, getCompanyValues, getPageContent } from '@/lib/api';
import { AboutPageClient } from '@/components/about/AboutPageClient';
import type { PageContent } from '@/types/api';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About TRD Remedial | Structural Remediation Experts Sydney',
  description: 'TRD Remedial — Sydney\'s trusted structural remediation specialists since 2017. 8+ years experience, 150+ projects completed, 24/7 emergency response. Expert remedial builders for residential, commercial and industrial buildings across NSW.',
  keywords: [
    'TRD Remedial',
    'structural remediation company Sydney',
    'remedial building company NSW',
    'concrete repair specialists Sydney',
    'structural engineers Sydney',
    'Tension Reinforced Developments',
    'Christopher Nassif',
  ],
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About TRD Remedial | Structural Remediation Experts Since 2017',
    description: 'Sydney\'s trusted structural remediation specialists. 8+ years experience, 150+ completed projects, and 24/7 emergency response across NSW.',
    type: 'website',
  },
};

/* ================================================================
   ABOUT PAGE -- SERVER COMPONENT
   Fetches all data and passes it to the client shell.
   ================================================================ */

/** Pull a single value from a PageContent array by key, with a fallback. */
function getContent(blocks: PageContent[], key: string, fallback = ''): string {
  return blocks.find((b) => b.key === key)?.value ?? fallback;
}

export default async function AboutPage() {
  const [teamMembers, companyValues, pageContent] = await Promise.all([
    getTeamMembers(),
    getCompanyValues(),
    getPageContent('about'),
  ]);

  const companyDescription = getContent(pageContent, 'about.company.description');
  const companyQuote = getContent(pageContent, 'about.company.quote');
  const establishedYear = getContent(pageContent, 'about.meta.established', '2018');

  /* ----------------------------------------------------------------
     DOC META LINES — keyed about.doc-meta.1 through about.doc-meta.6
     Fallback to the original static content when CMS has no entry.
  ---------------------------------------------------------------- */
  const docMetaLines = [
    {
      label: getContent(pageContent, 'about.doc-meta.1.label', 'DOCUMENT TYPE:  '),
      value: getContent(pageContent, 'about.doc-meta.1.value', 'COMPANY PROFILE'),
    },
    {
      label: getContent(pageContent, 'about.doc-meta.2.label', 'SUBJECT:        '),
      value: getContent(pageContent, 'about.doc-meta.2.value', 'TRD REMEDIAL PTY LTD'),
    },
    {
      label: getContent(pageContent, 'about.doc-meta.3.label', 'LOCATION:       '),
      value: getContent(pageContent, 'about.doc-meta.3.value', 'SYDNEY, NSW, AUSTRALIA'),
    },
    {
      label: getContent(pageContent, 'about.doc-meta.4.label', 'ESTABLISHED:    '),
      value: getContent(pageContent, 'about.doc-meta.4.value', '2018'),
    },
    {
      label: getContent(pageContent, 'about.doc-meta.5.label', 'STATUS:         '),
      value: getContent(pageContent, 'about.doc-meta.5.value', 'ACTIVE'),
      isRedacted: true,
    },
    {
      label: getContent(pageContent, 'about.doc-meta.6.label', 'CLEARANCE:      '),
      value: getContent(pageContent, 'about.doc-meta.6.value', 'STRUCTURAL EXPERTS'),
    },
  ];

  /* ----------------------------------------------------------------
     EVIDENCE IMAGES — keyed about.evidence-image.1 through .3
  ---------------------------------------------------------------- */
  const evidenceImages = [
    {
      src: getContent(
        pageContent,
        'about.evidence-image.1.src',
        'https://ik.imagekit.io/1fovck7sy4/trd-website/images/projects/caringbah-pavilion/featured.jpg'
      ),
      alt: getContent(
        pageContent,
        'about.evidence-image.1.alt',
        'Caringbah Pavilion structural remediation'
      ),
    },
    {
      src: getContent(
        pageContent,
        'about.evidence-image.2.src',
        'https://ik.imagekit.io/1fovck7sy4/trd-website/images/projects/pelican-road-schofields/featured.jpg'
      ),
      alt: getContent(
        pageContent,
        'about.evidence-image.2.alt',
        'Pelican Road Schofields carbon fibre reinforcement'
      ),
    },
    {
      src: getContent(
        pageContent,
        'about.evidence-image.3.src',
        'https://ik.imagekit.io/1fovck7sy4/trd-website/images/projects/northbridge-structural-wall/featured.jpg'
      ),
      alt: getContent(
        pageContent,
        'about.evidence-image.3.alt',
        'Northbridge structural wall repair works'
      ),
    },
  ];

  /* ----------------------------------------------------------------
     FILE IDS — keyed about.file-id.1 through .3
  ---------------------------------------------------------------- */
  const fileIds = [
    getContent(pageContent, 'about.file-id.1', 'CN-001'),
    getContent(pageContent, 'about.file-id.2', 'CN-002'),
    getContent(pageContent, 'about.file-id.3', 'FN-001'),
  ];

  /* ----------------------------------------------------------------
     STATS — keyed about.stats.N.value / .label / .suffix / .sublabel
  ---------------------------------------------------------------- */
  const stats = [
    {
      value: Number(getContent(pageContent, 'about.stats.1.value', '8')),
      suffix: getContent(pageContent, 'about.stats.1.suffix', '+'),
      label: getContent(pageContent, 'about.stats.1.label', 'YRS'),
      sublabel: getContent(pageContent, 'about.stats.1.sublabel', 'EXPERIENCE'),
    },
    {
      value: Number(getContent(pageContent, 'about.stats.2.value', '3000')),
      suffix: getContent(pageContent, 'about.stats.2.suffix', '+'),
      label: getContent(pageContent, 'about.stats.2.label', 'LM'),
      sublabel: getContent(pageContent, 'about.stats.2.sublabel', 'REPAIRED'),
    },
    {
      value: Number(getContent(pageContent, 'about.stats.3.value', '24')),
      suffix: getContent(pageContent, 'about.stats.3.suffix', '/7'),
      label: getContent(pageContent, 'about.stats.3.label', 'ERT'),
      sublabel: getContent(pageContent, 'about.stats.3.sublabel', 'RESPONSE'),
    },
    {
      value: Number(getContent(pageContent, 'about.stats.4.value', '0')),
      suffix: getContent(pageContent, 'about.stats.4.suffix', ''),
      label: getContent(pageContent, 'about.stats.4.label', 'SAFETY'),
      sublabel: getContent(pageContent, 'about.stats.4.sublabel', 'INCIDENTS'),
    },
  ];

  /* ----------------------------------------------------------------
     DATA STREAM — keyed about.datastream.N.key / .value
  ---------------------------------------------------------------- */
  const dataStream = [
    {
      key: getContent(pageContent, 'about.datastream.1.key', 'projects.completed'),
      value: getContent(pageContent, 'about.datastream.1.value', '150+'),
    },
    {
      key: getContent(pageContent, 'about.datastream.2.key', 'client.satisfaction.rate'),
      value: getContent(pageContent, 'about.datastream.2.value', '99.2%'),
    },
    {
      key: getContent(pageContent, 'about.datastream.3.key', 'avg.response.time.hrs'),
      value: getContent(pageContent, 'about.datastream.3.value', '< 4'),
    },
    {
      key: getContent(pageContent, 'about.datastream.4.key', 'buildings.serviced'),
      value: getContent(pageContent, 'about.datastream.4.value', '200+'),
    },
    {
      key: getContent(pageContent, 'about.datastream.5.key', 'concrete.repaired.sqm'),
      value: getContent(pageContent, 'about.datastream.5.value', '50,000+'),
    },
    {
      key: getContent(pageContent, 'about.datastream.6.key', 'carbon.fibre.installed.m'),
      value: getContent(pageContent, 'about.datastream.6.value', '2,500+'),
    },
  ];

  return (
    <>
      {/* SEO: Internal links - server rendered */}
      <nav className="sr-only" aria-label="Site navigation">
        <h2>Explore TRD Remedial</h2>
        <ul>
          <li><a href="/services">Our Services</a></li>
          <li><a href="/projects">Our Projects</a></li>
          <li><a href="/contact">Contact Us</a></li>
          <li><a href="/">Home</a></li>
        </ul>
      </nav>
      {/* Server-rendered SEO content for about page */}
      <section className="seo-about-content">
        <div className="seo-about-inner">
          <h2>Sydney&apos;s Trusted Structural Remediation Experts</h2>
          <p>
            TRD Remedial — a division of Tension Reinforced Developments — is a specialist remedial building
            company serving Sydney and Greater New South Wales. Founded by Christopher, Charly, and Fahed Nassif,
            our team combines decades of hands-on experience in structural engineering, concrete repairs,
            and building remediation.
          </p>
          <p>
            We specialise in structural strengthening using carbon fibre reinforcement, concrete crack injection,
            slab scanning and GPR analysis, post-tension truncation, curtain wall waterproofing, concrete cutting,
            and large-scale defect rectification. From emergency structural response to planned remediation programs,
            TRD Remedial delivers solutions that meet the highest engineering standards.
          </p>
          <p>
            Our commitment to quality has earned the trust of strata managers, building owners, engineers,
            and construction professionals across residential, commercial, and industrial sectors.
            Every project is backed by thorough assessment, transparent communication, and proven remediation methodologies.
          </p>

          <h3>Our Company History</h3>
          <p>
            TRD Remedial was founded in 2017 under the parent entity Tension Reinforced Developments, a name that
            reflects the company&apos;s roots in post-tensioned slab repair and structural reinforcement. What began as a
            specialist subcontracting business focused on concrete strengthening and crack repair has grown into one of
            Sydney&apos;s most recognised names in full-scope remedial construction.
          </p>
          <p>
            Over the years, TRD Remedial has expanded its capabilities significantly — moving from reactive repair work
            to providing comprehensive remediation programs for large residential strata buildings, government facilities,
            commercial complexes, and industrial structures. The company&apos;s evolution has been driven by a consistent focus
            on technical excellence, safety, and a genuine commitment to solving complex structural problems rather than
            simply patching symptoms.
          </p>
          <p>
            Today, TRD Remedial operates across Sydney and Greater NSW with a dedicated team of tradespeople, supervisors,
            and project managers. The company has completed over 150 remediation projects, repaired more than 3,000 linear
            metres of structural defects, and installed in excess of 2,500 metres of carbon fibre reinforcement systems.
            This track record has been built project by project — each one reinforcing the company&apos;s reputation for
            delivering lasting structural solutions under budget and ahead of schedule.
          </p>

          <h3>Our Technical Expertise</h3>
          <p>
            TRD Remedial&apos;s technical capabilities span the full spectrum of remedial building and structural strengthening.
            Our core services include concrete crack injection using epoxy and polyurethane resins, carbon fibre reinforced
            polymer (CFRP) laminate and fabric installation, post-tension cable truncation and re-stressing, slab scanning
            using ground-penetrating radar (GPR) to locate embedded tendons and services, and curtain wall waterproofing
            systems for multi-storey buildings.
          </p>
          <p>
            We work closely with structural and civil engineers to develop repair methodologies that meet Australian
            Standards and project-specific engineering requirements. Our partnerships with accredited engineering firms
            mean every structural intervention is designed and certified to the appropriate standard — whether that
            involves a minor crack repair or a major load-redistribution program.
          </p>
          <p>
            Our team holds experience across a wide range of building types and construction ages, including heritage
            structures, 1970s–1990s concrete-frame apartment buildings, modern post-tensioned slabs, and precast tilt-up
            panels. This breadth of experience allows TRD Remedial to diagnose the root cause of structural distress
            rather than applying generic solutions, resulting in outcomes that hold up over the long term.
          </p>

          <h3>Our Approach to Remediation</h3>
          <p>
            Every project at TRD Remedial begins with a thorough site assessment. Before any work commences, our team
            conducts a detailed investigation of the structural concern — including visual inspection, non-destructive
            testing where appropriate, and consultation with the project engineer and building manager. This diagnostic
            phase is essential to understanding the full scope of the issue and developing a repair strategy that addresses
            root causes rather than surface symptoms.
          </p>
          <p>
            Transparent communication is central to how we work. Clients receive a clear scope of works document, a
            detailed methodology statement, and regular progress updates throughout the project. Our project managers
            maintain open lines of communication with strata committees, building managers, and owners corporation
            representatives to ensure there are no surprises — particularly on occupied buildings where minimising
            disruption is a priority.
          </p>
          <p>
            Quality assurance at TRD Remedial is embedded at every stage. We document all repair activities with
            photographic evidence, prepare as-built records on completion, and issue defect-liability warranties appropriate
            to the repair type. Where engineering sign-off is required, we coordinate inspection hold points and ensure
            all regulatory requirements are met before closing out the works.
          </p>

          <h3>Industry Certifications &amp; Compliance</h3>
          <p>
            TRD Remedial operates in full compliance with NSW building regulations, the National Construction Code (NCC),
            and the relevant Australian Standards governing structural repair and strengthening. All works are carried out
            under the appropriate builder&apos;s licence, and the company maintains current public liability and contractor&apos;s
            all-risk insurance for all project types.
          </p>
          <p>
            Our site safety management systems are designed to comply with the Work Health and Safety Act 2011 (NSW)
            and applicable Safe Work Method Statements (SWMS) are prepared for all high-risk construction activities.
            TRD Remedial has maintained a zero lost-time injury record throughout its operating history — a statistic
            that reflects a genuine culture of safety that begins in the planning stage and carries through to practical
            completion.
          </p>
          <p>
            We are committed to ongoing professional development and technical training. Our team regularly engages with
            product manufacturers and industry bodies to stay current with the latest repair materials, strengthening
            systems, and best-practice methodologies in the remedial construction sector.
          </p>

          <h3>Community &amp; Industry Relationships</h3>
          <p>
            TRD Remedial has built strong working relationships with strata management companies, specialist strata
            engineers, quantity surveyors, and principal contractors across Sydney. We understand the unique dynamics of
            working within occupied strata buildings — including the need for flexible scheduling, respectful interaction
            with residents, and clear communication with owners corporations and their representatives.
          </p>
          <p>
            Our relationships with structural and civil engineering firms allow us to mobilise quickly when an engineer
            has identified a structural defect requiring urgent remediation. We regularly collaborate with engineering
            consultancies on defect assessment programs and provide specialist remedial construction services as part of
            broader building upgrade and maintenance works.
          </p>
          <p>
            Whether engaged directly by a building owner, appointed by a strata manager, or subcontracted by a principal
            builder, TRD Remedial brings the same level of professionalism and technical rigour to every engagement.
            Our goal is always to leave every building in a stronger, safer condition — and to leave every client with
            the confidence that the work has been done right.
          </p>
        </div>
      </section>
      <AboutPageClient
        docMetaLines={docMetaLines}
        evidenceImages={evidenceImages}
        fileIds={fileIds}
        teamMembers={teamMembers}
        companyValues={companyValues}
        stats={stats}
        dataStream={dataStream}
        companyDescription={companyDescription || undefined}
        companyQuote={companyQuote || undefined}
        establishedYear={establishedYear}
      />
    </>
  );
}
