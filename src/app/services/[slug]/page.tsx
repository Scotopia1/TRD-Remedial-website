import './service-detail.css';
import './seo-content.css';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getServiceBySlug, getServices, getProjects, getSettings } from '@/lib/api';
import type { Project } from '@/types/api';
import { ServiceDetailClient } from './ServiceDetailClient';
import { ServiceSchema } from '@/components/seo/ServiceSchema';

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return { title: 'Service Not Found | TRD Remedial' };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://trdremedial.com.au';
  const canonicalUrl = `${baseUrl}/services/${service.slug}`;

  return {
    title: service.metaTitle || `${service.title} Sydney`,
    description: service.metaDescription || service.tagline + ' - ' + service.description.substring(0, 120),
    keywords: [service.title, 'Sydney', 'NSW', 'concrete repair', 'structural remediation', ...(service.relatedServices || [])],
    openGraph: {
      title: service.title,
      description: service.tagline,
      images: [{ url: service.heroImage || service.visual, width: 1920, height: 1080, alt: `${service.title} in Sydney` }],
      type: 'website',
      url: canonicalUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: service.title,
      description: service.tagline,
      images: [service.heroImage || service.visual],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [service, settings, allServices, allProjects] = await Promise.all([
    getServiceBySlug(slug),
    getSettings(),
    getServices(),
    getProjects(),
  ]);

  if (!service) {
    notFound();
  }

  // Resolve related projects: fetch all projects and filter by the IDs listed on the service
  let relatedProjects: Project[] = [];
  if (service.relatedProjects && service.relatedProjects.length > 0) {
    const relatedIds = new Set(service.relatedProjects);
    relatedProjects = allProjects.filter((p) => relatedIds.has(p.id) || relatedIds.has(p.slug));
  }

  const otherServices = allServices.filter((s) => s.slug !== slug);

  return (
    <>
      <ServiceSchema service={service} settings={settings} />
      {/* SEO: Internal links to related services - server rendered */}
      <nav className="sr-only" aria-label="Related services">
        <h2>Our Other Services</h2>
        <ul>
          {otherServices.map((s) => (
            <li key={s.slug}>
              <a href={`/services/${s.slug}`}>{s.title}</a>
            </li>
          ))}
        </ul>
        <a href="/services">View All Services</a>
        <a href="/projects">View Our Projects</a>
        <a href="/contact">Get a Free Quote</a>
        <a href="/about">About TRD Remedial</a>
      </nav>

      {/* Server-rendered SEO content section — improves text/HTML ratio */}
      <section className="seo-service-summary">
        <div className="seo-service-summary-inner">
          <p className="seo-service-tagline">{service.tagline}</p>
          {service.description && (
            <div className="seo-service-description">
              <p>{service.description}</p>
            </div>
          )}
          {service.features && service.features.length > 0 && (
            <div className="seo-service-features">
              <span className="seo-service-features-label">Capabilities</span>
              {service.features.map((feature, i) => (
                <span key={i} className="seo-service-feature-tag">{feature}</span>
              ))}
            </div>
          )}
          {service.commonApplications && (
            <div className="seo-service-description">
              <p>{service.commonApplications}</p>
            </div>
          )}
          {service.whyChooseTRD && (
            <div className="seo-service-description">
              <p>{service.whyChooseTRD}</p>
            </div>
          )}
          <p className="seo-service-meta">
            TRD Remedial provides expert {service.title.toLowerCase()} services across Sydney
            and Greater NSW. As specialist remedial builders, we deliver professional structural
            remediation solutions for residential, commercial, and industrial properties.
            {service.serviceArea ? ` ${service.serviceArea}` : ''}
          </p>
        </div>
      </section>

      <ServiceDetailClient service={service} relatedProjects={relatedProjects} />
    </>
  );
}
