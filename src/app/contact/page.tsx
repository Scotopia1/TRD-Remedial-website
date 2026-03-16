import './contact.css';
import { AnimatedH1 } from '@/components/animations/AnimatedH1';
import { AnimatedCopy } from '@/components/animations/AnimatedCopy';
import Link from 'next/link';
import { getSettings, getServices } from '@/lib/api';
import { ContactFormClient } from './ContactFormClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with TRD Remedial for structural remediation, concrete repair, and emergency services across Sydney and NSW. Request a quote or consultation today.',
  alternates: {
    canonical: '/contact',
  },
};

export default async function ContactPage() {
  const [settings, services] = await Promise.all([
    getSettings(),
    getServices(),
  ]);
  const emergencyPhone = settings.emergencyPhone1 ?? settings.contactPhone ?? '0414 727 167';
  const contactEmail = settings.contactEmail;
  const currentYear = String(new Date().getFullYear()).slice(-2);

  return (
    <div className="contact-page">
      {/* SEO: Internal links to service pages - server rendered */}
      <nav className="sr-only" aria-label="Our services">
        <h2>Our Services</h2>
        <ul>
          {services.map((s) => (
            <li key={s.slug}>
              <a href={`/services/${s.slug}`}>{s.title}</a>
            </li>
          ))}
        </ul>
        <a href="/services">All Services</a>
        <a href="/projects">Our Projects</a>
        <a href="/about">About TRD Remedial</a>
      </nav>
      <section className="contact-hero">
        <div className="contact-hero-content">
          <div className="contact-hero-left">
            <AnimatedH1 delay={0.85} className="contact-heading">
              Get In Touch
            </AnimatedH1>
            <div className="contact-year">
              <AnimatedCopy tag="span" delay={0.1}>©{currentYear}</AnimatedCopy>
            </div>
          </div>

          <div className="contact-hero-right">
            <div className="contact-info-block">
              <AnimatedCopy tag="p" delay={0.85} className="contact-label">
                Email
              </AnimatedCopy>
              <a href={`mailto:${contactEmail}`} className="contact-value">
                <AnimatedCopy tag="span" delay={0.95}>
                  {contactEmail}
                </AnimatedCopy>
              </a>
            </div>

            <div className="contact-info-block">
              <AnimatedCopy tag="p" delay={1} className="contact-label">
                Phone
              </AnimatedCopy>
              <a href={`tel:${emergencyPhone.replace(/\s/g, '')}`} className="contact-value">
                <AnimatedCopy tag="span" delay={1.1}>
                  {emergencyPhone}
                </AnimatedCopy>
              </a>
            </div>

            <div className="contact-info-block">
              <AnimatedCopy tag="p" delay={1.15} className="contact-label">
                Address
              </AnimatedCopy>
              <AnimatedCopy tag="p" delay={1.25} className="contact-value">
                {settings.contactAddress ?? 'Sydney, NSW'}
              </AnimatedCopy>
            </div>

            <div className="contact-info-block">
              <AnimatedCopy tag="p" delay={1.3} className="contact-label">
                Business Hours
              </AnimatedCopy>
              <AnimatedCopy tag="p" delay={1.4} className="contact-value">
                {settings.businessHours ?? 'Mon-Fri: 7:00 AM - 6:00 PM\nSat: 8:00 AM - 2:00 PM\n24/7 Emergency Service'}
              </AnimatedCopy>
            </div>
          </div>
        </div>
      </section>

      <ContactFormClient services={services} />

      <section className="contact-cta">
        <AnimatedCopy tag="p" className="contact-cta-text">
          Need expert structural remediation? We&apos;re ready to help with your project.
        </AnimatedCopy>
        <div className="contact-cta-buttons">
          <Link href="/services" className="contact-cta-button">
            View Services
          </Link>
          <Link href="/projects" className="contact-cta-button contact-cta-button-secondary">
            See Our Work
          </Link>
        </div>
      </section>
    </div>
  );
}
