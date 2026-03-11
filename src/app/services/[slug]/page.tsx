import './service-detail.css';
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
    title: service.metaTitle || `${service.title} Sydney | TRD Remedial Services`,
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
  const [service, settings] = await Promise.all([
    getServiceBySlug(slug),
    getSettings(),
  ]);

  if (!service) {
    notFound();
  }

  // Resolve related projects: fetch all projects and filter by the IDs listed on the service
  let relatedProjects: Project[] = [];
  if (service.relatedProjects && service.relatedProjects.length > 0) {
    const allProjects = await getProjects();
    const relatedIds = new Set(service.relatedProjects);
    relatedProjects = allProjects.filter((p) => relatedIds.has(p.id) || relatedIds.has(p.slug));
  }

  return (
    <>
      <ServiceSchema service={service} settings={settings} />
      <ServiceDetailClient service={service} relatedProjects={relatedProjects} />
    </>
  );
}
