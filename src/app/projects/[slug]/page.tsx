import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getProjects, getProjectBySlug, getSettings } from '@/lib/api';
import { ProjectDetailClient } from './ProjectDetailClient';
import { ProjectSchema } from '@/components/seo/ProjectSchema';
import './project-detail.css';

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
  const title = project.metaTitle || `${project.name} | TRD Remedial Case Study`;
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
  const [project, settings] = await Promise.all([
    getProjectBySlug(slug),
    getSettings(),
  ]);

  if (!project) {
    notFound();
  }

  return (
    <>
      <ProjectSchema project={project} settings={settings} />
      <ProjectDetailClient project={project} />
    </>
  );
}
