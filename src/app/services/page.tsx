import './[slug]/seo-content.css';
import { getServices } from '@/lib/api';
import { ServicesClient } from './ServicesClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Comprehensive structural remediation services in Sydney - structural strengthening, crack injection, concrete cutting, concrete repairs, slab scanning, curtain wall injection, and more.',
  alternates: {
    canonical: '/services',
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

      <ServicesClient services={services} />
    </>
  );
}
