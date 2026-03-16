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
      <ServicesClient services={services} />
    </>
  );
}
