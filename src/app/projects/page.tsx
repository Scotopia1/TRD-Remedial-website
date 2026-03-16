import { getProjects } from '@/lib/api';
import ProjectsListClient from './ProjectsListClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | TRD Remedial',
  description: 'Explore our portfolio of structural remediation, concrete repair, and CFRP strengthening projects across Sydney and NSW.',
  alternates: {
    canonical: '/projects',
  },
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <>
      {/* SEO: Internal links to all project pages - server rendered */}
      <nav className="sr-only" aria-label="All projects">
        <h2>Our Project Portfolio</h2>
        <ul>
          {projects.map((p) => (
            <li key={p.slug}>
              <a href={`/projects/${p.slug}`}>{p.name}</a>
            </li>
          ))}
        </ul>
        <a href="/services">Our Services</a>
        <a href="/contact">Contact Us</a>
      </nav>
      <ProjectsListClient projects={projects} />
    </>
  );
}
