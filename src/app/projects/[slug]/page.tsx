import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getProjects, getProjectBySlug, getSettings } from '@/lib/api';
import { ProjectDetailClient } from './ProjectDetailClient';
import { ProjectSchema } from '@/components/seo/ProjectSchema';
import './project-detail.css';
import './seo-content.css';

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found | TRD Remedial',
      description: 'The requested project could not be found.',
    };
  }

  const description = project.metaDescription || `${project.tagline} - ${project.challenge.substring(0, 120)}...`;
  const title = project.metaTitle || `${project.name} — Case Study`;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://trdremedial.com.au';
  const canonicalUrl = `${baseUrl}/projects/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      images: [{ url: project.heroImage, width: 1920, height: 800, alt: project.name }],
      type: 'website',
      url: canonicalUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [project.heroImage],
    },
    keywords: [
      project.serviceType,
      project.location,
      'TRD Remedial',
      'Sydney',
      'structural remediation',
      'concrete repair',
      'carbon fibre strengthening',
      'CFRP',
      ...(Array.isArray(project.category) ? project.category : []),
    ],
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [project, settings, allProjects] = await Promise.all([
    getProjectBySlug(slug),
    getSettings(),
    getProjects(),
  ]);

  if (!project) {
    notFound();
  }

  const otherProjects = allProjects.filter((p) => p.slug !== slug).slice(0, 5);

  return (
    <>
      <ProjectSchema project={project} settings={settings} />
      {/* SEO: Internal links - server rendered */}
      <nav className="sr-only" aria-label="Related projects">
        <h2>Explore More Projects</h2>
        <ul>
          {otherProjects.map((p) => (
            <li key={p.slug}>
              <a href={`/projects/${p.slug}`}>{p.name}</a>
            </li>
          ))}
        </ul>
        <a href="/projects">View All Projects</a>
        <a href="/services">Our Services</a>
        <a href="/contact">Contact Us</a>
        <a href="/about">About TRD Remedial</a>
      </nav>
      {/* Server-rendered SEO content — visible descriptive text for crawlers and users */}
      <section className="seo-project-summary">
        <div className="seo-project-summary-inner">
          {project.location && (
            <p className="seo-project-location">
              {project.serviceType} — {project.location}
            </p>
          )}
          {project.tagline && (
            <div className="seo-project-description">
              <p>{project.tagline}</p>
            </div>
          )}
          {project.challenge && (
            <div className="seo-project-challenge">
              <strong>The Challenge:</strong>{' '}
              <span>{typeof project.challenge === 'string' ? project.challenge : ''}</span>
            </div>
          )}
          {project.solution && (
            <div className="seo-project-solution">
              <strong>Our Solution:</strong>{' '}
              <span>{typeof project.solution === 'string' ? project.solution : ''}</span>
            </div>
          )}
          {project.results && (
            <div className="seo-project-solution">
              <strong>Results:</strong>{' '}
              <span>{typeof project.results === 'string' ? project.results : ''}</span>
            </div>
          )}
          <p className="seo-project-meta">
            This {project.serviceType || 'structural remediation'} project by TRD Remedial
            {project.location ? ` in ${project.location}` : ''} demonstrates our expertise in
            delivering professional building remediation solutions across Sydney and Greater NSW.
            {project.timeline ? ` Completed within ${project.timeline}.` : ''}
          </p>
        </div>
      </section>
      <ProjectDetailClient project={project} />
    </>
  );
}
