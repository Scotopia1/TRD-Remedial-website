import {
  getServices,
  getProjects,
  getTeamMembers,
  getTestimonials,
  getPageContent,
  getFAQs,
} from '@/lib/api';
import HomeClient from './HomeClient';

export default async function Home() {
  // Fetch all homepage data in parallel for best performance.
  // Each fetcher returns a safe default (empty array) on failure,
  // so the page always renders even if the API is down.
  const [services, projects, teamMembers, testimonials, pageContent, faqs] =
    await Promise.all([
      getServices(),
      getProjects(),
      getTeamMembers(),
      getTestimonials(),
      getPageContent('home'),
      getFAQs(),
    ]);

  return (
    <HomeClient
      services={services}
      projects={projects}
      teamMembers={teamMembers}
      testimonials={testimonials}
      pageContent={pageContent}
      faqs={faqs}
    />
  );
}
