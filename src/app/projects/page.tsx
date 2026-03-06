import { getProjects } from '@/lib/api';
import ProjectsListClient from './ProjectsListClient';

export const metadata = {
  title: 'Projects | TRD Remedial',
  description: 'Explore our portfolio of structural remediation, concrete repair, and CFRP strengthening projects across Sydney and NSW.',
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  return <ProjectsListClient projects={projects} />;
}
