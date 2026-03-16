'use client';

import './Footer.css';

import Link from 'next/link';
import { useSiteSettings } from '@/components/providers/SiteSettingsProvider';

export function Footer() {
  const settings = useSiteSettings();
  const contactEmail = settings.contactEmail;

  // Generate banner spans from the bannerText setting
  const bannerText = settings.bannerText || 'TRD REMEDIAL • THE REMEDIAL EXPERTS • ';
  const bannerSpans = Array.from({ length: 8 }, (_, i) => (
    <span key={i}>{bannerText}</span>
  ));

  // Nav links from settings with fallback
  const navLinks = settings.navigationLinks?.length
    ? settings.navigationLinks
    : [
        { label: 'Services', href: '/services' },
        { label: 'Projects', href: '/projects' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Emergency', href: '/emergency' },
      ];

  return (
    <>
      {/* Sliding Banner */}
      <div className="footer-banner">
        <div className="footer-banner-track">
          <div className="footer-banner-content">
            {bannerSpans}
          </div>
        </div>
      </div>

      <div className="footer">
        {/* Row 1: Contact CTA + Navigation */}
        <div className="footer-row">
        <div className="footer-contact">
          <h3>
            {settings.footerCta || "Let's Build Together"} <br />
            {contactEmail.split('@')[0]}<span>@</span>{contactEmail.split('@')[1]}
          </h3>

          <p className="secondary">
            {settings.footerDescription || "From structural remediation to emergency repairs — we're always ready to collaborate. Reach out anytime for expert solutions."}
          </p>

          <Link href="/contact" className="btn">
            Get in Touch
          </Link>
        </div>

        <div className="footer-nav">
          {navLinks.map((link, index) => (
            <Link key={index} href={link.href} className="footer-nav-item">
              <span>{link.label}</span>
              <span>&#8594;</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Row 2: Logo + Copyright */}
      <div className="footer-row">
        <div className="footer-header">
          <div className="footer-logo">
            <img
              src="/trd-logo-black.svg"
              alt="TRD Remedial"
            />
          </div>
        </div>

        <div className="footer-copyright-line">
          <p className="primary sm">{settings.copyrightText || `© ${settings.companyName || 'TRD Remedial'} 2025`}</p>
          <p className="primary sm">
            Website by{' '}
            <a
              href="https://theelitessolutions.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-credit-link"
            >
              The Elites Solutions
            </a>
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
