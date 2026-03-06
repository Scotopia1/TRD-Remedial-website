import type { Project, SiteSettings } from '@/types/api';

interface ProjectSchemaProps {
  project: Project;
  settings?: Pick<SiteSettings, 'companyName'>;
}

export function ProjectSchema({ project, settings }: ProjectSchemaProps) {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://trdremedial.com.au';
  const companyName = settings?.companyName ?? 'TRD Remedial';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Project',
    name: project.name,
    description: project.metaDescription || project.challenge,
    image: project.heroImage,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/projects/${project.slug}`,
    },
    provider: {
      '@type': 'Organization',
      name: companyName,
      url: SITE_URL,
      logo: `${SITE_URL}/trd-logo.svg`,
    },
    serviceType: project.serviceType,
    location: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: project.location.split(',')[0].trim(),
        addressRegion: 'NSW',
        addressCountry: 'AU',
      },
    },
    startDate: project.date,
    keywords: [project.serviceType, project.location, ...(Array.isArray(project.category) ? project.category : [])].join(', '),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
