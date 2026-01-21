import './service-detail.css';
import { notFound } from 'next/navigation';
import { SERVICES } from '@/data/services';
import { ServiceDetailClient } from './ServiceDetailClient';
import { ServiceSchema } from '@/components/seo/ServiceSchema';

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
