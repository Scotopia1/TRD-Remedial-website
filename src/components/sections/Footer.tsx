'use client';

import './Footer.css';

import Link from 'next/link';

export function Footer() {
  return (
    <div className="footer">
      {/* Row 1: Contact CTA + Navigation */}
      <div className="footer-row">
        <div className="footer-contact">
          <h3>
            Let&apos;s Build Together <br />
            contact<span>@</span>trdremedial.com.au
          </h3>

          <p className="secondary">
            From structural remediation to emergency repairs — we&apos;re always ready to collaborate.
            Reach out anytime for expert solutions.
          </p>

          <Link href="/contact" className="btn">
            Get in Touch
          </Link>
        </div>

        <div className="footer-nav">
          <Link href="/services" className="footer-nav-item">
            <span>Services</span>
            <span>&#8594;</span>
          </Link>
          <Link href="/projects" className="footer-nav-item">
            <span>Projects</span>
            <span>&#8594;</span>
          </Link>
          <Link href="/about" className="footer-nav-item">
            <span>About</span>
            <span>&#8594;</span>
          </Link>
          <Link href="/contact" className="footer-nav-item">
            <span>Contact</span>
            <span>&#8594;</span>
          </Link>
          <Link href="/emergency" className="footer-nav-item">
            <span>Emergency</span>
            <span>&#8594;</span>
          </Link>
        </div>
      </div>

      {/* Row 2: Massive Typography + Copyright */}
      <div className="footer-row">
        <div className="footer-header">
          <h1>TRD</h1>
          <h1>REMEDIAL</h1>
        </div>

        <div className="footer-copyright-line">
          <p className="primary sm">&copy; TRD Remedial 2025</p>
          <p className="primary sm">Website by The Elites Agency</p>
        </div>
      </div>
    </div>
  );
}
