import { notFound } from 'next/navigation';
import { PROJECTS } from '@/data/projects';
import { ProjectDetailClient } from './ProjectDetailClient';
import './project-detail.css';

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}
