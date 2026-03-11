import { getServices } from '@/lib/api';
import { ServicesClient } from './ServicesClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services | TRD Remedial',
  description: 'Comprehensive structural remediation services in Sydney - structural strengthening, crack injection, concrete cutting, concrete repairs, slab scanning, curtain wall injection, and more.',
  alternates: {
    canonical: '/services',
  },
};

export default async function ServicesPage() {
  const services = await getServices();

  return <ServicesClient services={services} />;
}
