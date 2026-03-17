import { getProjects } from '@/lib/api';
import ProjectsListClient from './ProjectsListClient';
import type { Metadata } from 'next';
import './seo-projects-intro.css';
import './seo-projects-listing.css';

export const metadata: Metadata = {
  title: 'Projects',
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
      {/* Server-rendered SEO intro — visible descriptive text for crawlers and users */}
      <section className="seo-projects-intro">
        <div className="seo-projects-intro-inner">
          <p>
            Explore TRD Remedial&apos;s portfolio of structural remediation projects across Sydney
            and NSW. Our case studies showcase concrete repairs, crack injection, structural
            strengthening with carbon fibre, slab scanning, curtain wall waterproofing, and
            large-scale defect rectification work delivered for residential and commercial buildings.
          </p>
        </div>
      </section>

      {/* Server-rendered SEO content — individual project summaries for crawlers and users */}
      <section className="seo-projects-content">
        <div className="seo-projects-content-inner">
          <h2>Structural Remediation Case Studies</h2>
          <p>
            Our portfolio demonstrates TRD Remedial&apos;s capability across diverse structural
            remediation challenges. From emergency rectification orders to planned strengthening
            programs, each project showcases our commitment to engineering excellence and
            client satisfaction.
          </p>
          {projects.map((p) => (
            <div key={p.slug} className="seo-project-item">
              <h3><a href={`/projects/${p.slug}`}>{p.name}</a></h3>
              <p className="seo-project-item-meta">
                {p.serviceType && <span>{p.serviceType}</span>}
                {p.location && <span> &mdash; {p.location}</span>}
              </p>
              {p.tagline && <p>{p.tagline}</p>}
            </div>
          ))}
        </div>
      </section>

      <ProjectsListClient projects={projects} />
    </>
  );
}
