import './service-detail.css';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { SERVICES } from '@/data/services';
import { ServiceDetailClient } from './ServiceDetailClient';
import { ServiceSchema } from '@/components/seo/ServiceSchema';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find(s => s.slug === slug);

  if (!service) {
    return { title: 'Service Not Found | TRD Remedial' };
  }

  return {
    title: `${service.title} Sydney | TRD Remedial Services`,
    description: service.tagline + ' - ' + service.description.substring(0, 120),
    keywords: [service.title, 'Sydney', 'NSW', 'concrete repair', 'structural remediation', ...(service.relatedServices || [])],
    openGraph: {
      title: service.title,
      description: service.tagline,
      images: [{ url: service.heroImage || service.visual, width: 1920, height: 1080, alt: `${service.title} in Sydney` }],
      type: 'website',
      url: `https://thetrdgroup.com.au/services/${service.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: service.title,
      description: service.tagline,
      images: [service.heroImage || service.visual],
    },
    alternates: {
      canonical: `https://thetrdgroup.com.au/services/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <ServiceSchema service={service} />
      <ServiceDetailClient service={service} />
    </>
  );
}
