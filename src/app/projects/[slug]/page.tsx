import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { PROJECTS } from '@/data/projects';
import { ProjectDetailClient } from './ProjectDetailClient';
import './project-detail.css';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: 'Project Not Found | TRD Remedial',
      description: 'The requested project could not be found.',
    };
  }

  const description = `${project.tagline} - ${project.challenge.substring(0, 120)}...`;

  return {
    title: `${project.name} | TRD Remedial Case Study`,
    description: description,
    openGraph: {
      title: project.name,
      description: project.tagline,
      images: [{ url: project.heroImage, width: 1920, height: 800, alt: project.name }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: project.name,
      description: project.tagline,
      images: [project.heroImage],
    },
    keywords: [
      project.serviceType,
      project.location,
      'TRD Remedial',
      'Sydney',
      'structural remediation',
      'concrete repair',
      ...project.category,
    ],
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}
