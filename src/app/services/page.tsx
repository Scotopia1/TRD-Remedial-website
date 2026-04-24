import './[slug]/seo-content.css';
import './seo-services-listing.css';
import { getServices } from '@/lib/api';
import { ServicesClient } from './ServicesClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Structural Remediation Services Sydney NSW',
  description: 'Comprehensive structural remediation services in Sydney — structural strengthening, crack injection, concrete cutting, concrete repairs, slab scanning, post-tension truncation, curtain wall injection, and more. Expert remedial builders across NSW.',
  keywords: [
    'structural remediation services Sydney',
    'concrete repair Sydney',
    'structural strengthening Sydney',
    'crack injection Sydney',
    'concrete cutting Sydney',
    'slab scanning Sydney',
    'post tension truncation Sydney',
    'curtain wall injection Sydney',
    'remedial building services NSW',
  ],
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Structural Remediation Services Sydney NSW | TRD Remedial',
    description: 'Full-scope structural remediation: strengthening, crack injection, concrete repairs, slab scanning, post-tension truncation and more across Sydney and NSW.',
    type: 'website',
  },
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      {/* SEO: Internal links to all service pages - server rendered */}
      <nav className="sr-only" aria-label="All services">
        <h2>Our Structural Remediation Services</h2>
        <ul>
          {services.map((s) => (
            <li key={s.slug}>
              <a href={`/services/${s.slug}`}>{s.title}</a>
            </li>
          ))}
        </ul>
        <a href="/projects">View Our Projects</a>
        <a href="/contact">Get a Free Quote</a>
      </nav>

      {/* Server-rendered SEO intro — improves text/HTML ratio */}
      <section className="seo-services-intro">
        <div className="seo-services-intro-inner">
          <p>
            TRD Remedial delivers comprehensive structural remediation services across Sydney and NSW.
            From concrete repairs and crack injection to structural strengthening with carbon fibre
            reinforcement, our expert team provides solutions for residential, commercial, and
            industrial buildings.
          </p>
          <p>
            We specialise in concrete cutting, slab scanning, curtain wall injection, post-tension
            truncation, structural alterations, and temporary moving joints. Every project is backed
            by decades of experience and a commitment to engineering excellence.
          </p>
        </div>
      </section>

      {/* Server-rendered SEO content — individual service descriptions for crawlers and users */}
      <section className="seo-services-content">
        <div className="seo-services-content-inner">
          <h2>Comprehensive Remedial Building Services in Sydney</h2>
          <p>
            TRD Remedial provides a full spectrum of structural remediation services designed to address
            every aspect of building deterioration and structural deficiency. Each service is delivered by
            experienced remedial builders using industry-leading techniques and materials.
          </p>
          {services.map((s) => (
            <div key={s.slug} className="seo-service-item">
              <h3><a href={`/services/${s.slug}`}>{s.title}</a></h3>
              <p>{s.tagline || s.description?.substring(0, 200)}</p>
            </div>
          ))}
          <p>
            All services are available across Sydney and Greater NSW. Contact our team for a free
            consultation and detailed scope assessment for your project.
          </p>
        </div>
      </section>

      <ServicesClient services={services} />
    </>
  );
}
