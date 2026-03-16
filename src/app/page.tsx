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
    <>
      {/* SEO: Internal links to all service and project pages - server rendered */}
      <nav className="sr-only" aria-label="Site sections">
        <h2>TRD Remedial Services &amp; Projects</h2>
        <ul>
          {services.map((s) => (
            <li key={s.slug}>
              <a href={`/services/${s.slug}`}>{s.title}</a>
            </li>
          ))}
          {projects.slice(0, 8).map((p) => (
            <li key={p.slug}>
              <a href={`/projects/${p.slug}`}>{p.name}</a>
            </li>
          ))}
        </ul>
        <a href="/services">All Services</a>
        <a href="/projects">All Projects</a>
        <a href="/about">About Us</a>
        <a href="/contact">Contact Us</a>
      </nav>
      <HomeClient
        services={services}
        projects={projects}
        teamMembers={teamMembers}
        testimonials={testimonials}
        pageContent={pageContent}
        faqs={faqs}
      />
    </>
  );
}
