import { getTeamMembers, getCompanyValues, getPageContent } from '@/lib/api';
import { AboutPageClient } from '@/components/about/AboutPageClient';
import type { PageContent } from '@/types/api';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about TRD Remedial - Sydney\'s leading structural remediation specialists. 8+ years of experience, 150+ projects completed, and 24/7 emergency response across NSW.',
  alternates: {
    canonical: '/about',
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
