'use client';

import './EmergencyCTA.css';

import Link from 'next/link';
import { useSiteSettings } from '@/components/providers/SiteSettingsProvider';

interface EmergencyCTAProps {
  /** Section heading */
  heading?: string;
  /** Body text */
  body?: string;
  /** CTA button text */
  ctaText?: string;
  /** Subtitle in the info bar */
  subtitle?: string;
  /** Badge text in the info bar */
  badge?: string;
}

export function EmergencyCTA({ heading, body, ctaText, subtitle, badge }: EmergencyCTAProps = {}) {
  const settings = useSiteSettings();
  const phone1 = settings.emergencyPhone1 || '0414 727 167';
  const phone2 = settings.emergencyPhone2 || '0404 404 422';
  const email = settings.contactEmail;

  return (
    <div className="emergency-cta">
      {/* Row 1: Info Bar */}
      <div className="emergency-cta-row">
        <div className="emergency-cta-row-copy-item">
          <p className="primary sm">{subtitle || 'Critical Repairs'}</p>
        </div>
        <div className="emergency-cta-row-copy-item">
          <p className="primary sm">({badge || 'Emergency — 24/7'})</p>
        </div>
        <div className="emergency-cta-row-copy-item">
          <p className="primary sm">{settings.copyrightText || '© TRD Remedial 2025'}</p>
        </div>
      </div>

      {/* Row 2: Main Content */}
      <div className="emergency-cta-row">
        {/* Left Column: Header + Availability */}
        <div className="emergency-cta-col">
          <div className="emergency-cta-header">
            <h3>{heading || '24/7 Emergency Response'}</h3>

            <p>
              {body || 'Structural emergencies demand immediate action. Our team is on standby 24/7 to respond when you need expert intervention. No project too complex, no problem too urgent.'}
            </p>
          </div>

          <div className="emergency-availability">
            <p className="primary sm">Always Available</p>
            <p className="primary sm">All Suburbs</p>
          </div>
        </div>

        {/* Right Column: Contact Info + CTA */}
        <div className="emergency-cta-col">
          <div className="emergency-contact-info">
            <h4>Emergency Lines</h4>
            <a
              href={`tel:${phone1.replace(/\s/g, '')}`}
              className="emergency-phone"
            >
              {phone1}
            </a>
            <a
              href={`tel:${phone2.replace(/\s/g, '')}`}
              className="emergency-phone"
            >
              {phone2}
            </a>
          </div>

          <div className="emergency-contact-info">
            <h4>Email</h4>
            <a href={`mailto:${email}`} className="emergency-email">
              {email}
            </a>
          </div>

          <div className="emergency-cta-button">
            <Link href="/contact" className="btn-emergency">
              {ctaText || 'Request Emergency Assessment'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
