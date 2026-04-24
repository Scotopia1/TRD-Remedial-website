import './contact.css';
import './seo-content.css';
import { AnimatedH1 } from '@/components/animations/AnimatedH1';
import { AnimatedCopy } from '@/components/animations/AnimatedCopy';
import Link from 'next/link';
import { getSettings, getServices } from '@/lib/api';
import { ContactFormClient } from './ContactFormClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact TRD Remedial | Free Quote — Structural Repair Sydney',
  description: 'Contact TRD Remedial for structural remediation, concrete repair, and 24/7 emergency structural services across Sydney and NSW. Call 0414 727 167 or request a free quote online.',
  keywords: [
    'contact TRD Remedial',
    'structural remediation quote Sydney',
    'concrete repair quote NSW',
    'emergency structural repair Sydney',
    'remedial builder contact',
  ],
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact TRD Remedial | Free Quote for Structural Remediation',
    description: 'Get in touch for structural remediation, concrete repair, and emergency services. Call 0414 727 167 or request a free quote across Sydney and NSW.',
    type: 'website',
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

      {/* Server-rendered SEO content for contact page */}
      <section className="seo-contact-content">
        <div className="seo-contact-inner">
          <h2>Contact TRD Remedial</h2>
          <p>
            Need expert structural remediation in Sydney? TRD Remedial provides free consultations and assessments
            for all building types — residential, commercial, and industrial. Whether you require concrete repairs,
            crack injection, structural strengthening, or emergency structural response, our team is ready to help.
          </p>
          <p>
            We service all areas of Sydney and Greater NSW from our base in Greenacre.
            Our experienced team can assess your structural concerns, provide detailed scope reports,
            and deliver tailored remediation solutions. For urgent structural issues, we offer 24/7 emergency response.
          </p>
          <div className="seo-contact-details">
            <p><strong>Office:</strong> 2 Beryl Place, Greenacre NSW 2190</p>
            <p><strong>Service Area:</strong> Sydney Metropolitan, Greater NSW</p>
            <p><strong>Availability:</strong> 24/7 Emergency Response</p>
          </div>

          <h3>How We Can Help</h3>
          <p>
            TRD Remedial handles a wide spectrum of structural and remedial building enquiries — from emergency
            situations requiring same-day attendance through to planned defect rectification and long-term maintenance
            programs. Our team is experienced in interpreting engineering reports and defect notices, and can engage
            directly with your strata manager, building manager, or principal contractor to understand the full context
            of the issue before providing a recommendation.
          </p>
          <p>
            Common enquiries we receive include concrete cancer repair and spalling treatment, structural crack assessment
            and injection, post-tensioned slab concerns, waterproofing failures to balconies and podium decks, carbon
            fibre strengthening requirements identified by engineers, slab scanning and GPR survey requests, concrete
            cutting and core drilling, and emergency structural response where a building has been placed under an
            occupation restriction or engineering hold.
          </p>
          <p>
            We also work with owners corporations preparing for a Strata Inspection Report or building dilapidation
            survey. Our team can provide itemised scope documents and cost estimates that assist strata committees in
            budgeting for capital works and obtaining competitive tender responses. No matter the size or complexity
            of the project, TRD Remedial is equipped to provide a structured, professional response.
          </p>

          <h3>What to Expect When You Contact Us</h3>
          <p>
            When you contact TRD Remedial, you&apos;ll be connected with a knowledgeable team member who can triage your
            enquiry and provide an initial assessment of urgency and complexity. For non-emergency matters, we typically
            respond within one business day and can schedule a site inspection within the week. For urgent structural
            concerns — particularly those involving active cracking, deflection, or post-tension cable failure — our
            emergency response team is available around the clock.
          </p>
          <p>
            Following the initial site visit, we prepare a detailed scope of works and provide a written quotation that
            clearly outlines the proposed repair methodology, materials to be used, estimated programme, and warranty
            provisions. We do not pressure clients into commitments — our goal is to equip you with the information
            needed to make an informed decision. Where an engineering assessment has already been completed, we work
            directly from the engineer&apos;s specification to ensure the repair meets the required standard.
          </p>

          <h3>Sydney Service Areas</h3>
          <p>
            TRD Remedial services the entirety of the Sydney metropolitan region from our base in Greenacre, NSW.
            We regularly work across Sydney&apos;s Inner West, Eastern Suburbs, Lower North Shore, Upper North Shore,
            Northern Beaches, Hills District, Western Sydney, South Western Sydney, and the Illawarra and Wollongong
            corridor. We also service the Central Coast and Blue Mountains regions on a project basis.
          </p>
          <p>
            Specific suburbs and local government areas we frequently operate in include Parramatta, Blacktown,
            Penrith, Liverpool, Campbelltown, Sutherland, Hurstville, Kogarah, Randwick, Bondi, Manly, Chatswood,
            Hornsby, Ryde, Burwood, and the Sydney CBD. We have also completed projects in regional NSW including
            Newcastle, the Hunter Valley, and Southern Highlands for clients requiring specialist remedial capabilities
            not available locally.
          </p>
          <p>
            Our Greenacre office and yard provide a central base for mobilising equipment and crew across all Sydney
            regions. We maintain a fleet of work vehicles and carry a comprehensive inventory of specialist remediation
            materials and equipment, allowing rapid deployment for both emergency and planned works.
          </p>

          <div className="seo-contact-faq">
            <h3>Frequently Asked Questions</h3>

            <div className="seo-contact-faq-item">
              <h4>How quickly can you respond to a structural emergency?</h4>
              <p>
                TRD Remedial operates a 24/7 emergency response service. For urgent structural concerns — including
                active cracking, deflection, post-tension failures, or buildings placed under engineering holds —
                we aim to have a qualified representative on site within four hours of your call. Our emergency line
                is staffed at all times, including weekends and public holidays.
              </p>
            </div>

            <div className="seo-contact-faq-item">
              <h4>Do you provide free assessments and quotations?</h4>
              <p>
                Yes. TRD Remedial provides complimentary initial site assessments and written quotations for all
                standard remediation enquiries. There is no obligation to proceed. For larger or more complex
                projects — particularly those requiring specialist non-destructive testing or extensive investigation
                works prior to scope development — we may provide a fee proposal for the assessment phase, which we
                will discuss with you in advance.
              </p>
            </div>

            <div className="seo-contact-faq-item">
              <h4>What areas of Sydney do you service?</h4>
              <p>
                We service all Sydney metropolitan areas, from the CBD and Eastern Suburbs through to Western Sydney,
                the North Shore, Northern Beaches, Inner West, Sutherland Shire, and South Western Sydney. We also
                service the Central Coast, Wollongong, and regional NSW on a project basis. Contact us to confirm
                availability for your location.
              </p>
            </div>

            <div className="seo-contact-faq-item">
              <h4>Can you work on occupied buildings and strata properties?</h4>
              <p>
                Yes — the majority of our work is carried out on occupied residential and commercial strata buildings.
                We are experienced in managing the scheduling, noise, dust, and access requirements that come with
                working in occupied environments. We liaise directly with building managers and strata committees to
                develop a works programme that minimises disruption to residents and building users.
              </p>
            </div>

            <div className="seo-contact-faq-item">
              <h4>What qualifications and licences does your team hold?</h4>
              <p>
                TRD Remedial holds the appropriate NSW contractor&apos;s licence for the scope of remedial building works
                we undertake. All supervisors and tradespeople hold the relevant trade qualifications, white cards,
                and specialised certifications required for high-risk work including working at heights, confined spaces,
                and post-tension systems. We are fully insured with public liability and contractor&apos;s all-risk coverage,
                and all works are carried out in accordance with current WHS legislation and Australian Standards.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
