import {
  getServices,
  getProjects,
  getTeamMembers,
  getTestimonials,
  getPageContent,
  getFAQs,
} from '@/lib/api';
import HomeClient from './HomeClient';
import './seo-home-content.css';

export default async function Home() {
  // Fetch all homepage data in parallel for best performance.
  // Each fetcher returns a safe default (empty array) on failure,
  // so the page always renders even if the API is down.
  const [services, projects, teamMembers, testimonials, pageContent, faqs] =
    await Promise.all([
      getServices(),
      getProjects(),
      getTeamMembers(),
      getTestimonials(),
      getPageContent('home'),
      getFAQs(),
    ]);

  return (
    <>
      {/* SEO: Internal links to all service and project pages - server rendered */}
      <nav className="sr-only" aria-label="Site sections">
        <h2>TRD Remedial Services &amp; Projects</h2>
        <ul>
          {services.map((s) => (
            <li key={s.slug}>
              <a href={`/services/${s.slug}`}>{s.title}</a>
            </li>
          ))}
          {projects.map((p) => (
            <li key={p.slug}>
              <a href={`/projects/${p.slug}`}>{p.name}</a>
            </li>
          ))}
        </ul>
        <a href="/services">All Services</a>
        <a href="/projects">All Projects</a>
        <a href="/about">About Us</a>
        <a href="/contact">Contact Us</a>
      </nav>

      {/* Server-rendered SEO content — visible, substantial text for crawlers and users */}
      <section className="seo-home-content">
        <div className="seo-home-inner">
          <h2>Sydney&apos;s Leading Structural Remediation Company</h2>
          <p>
            TRD Remedial is Sydney&apos;s premier structural remediation company, delivering expert solutions
            for residential, commercial, and industrial buildings across New South Wales. As a division of
            Tension Reinforced Developments, we bring over eight years of specialised experience in diagnosing
            and resolving structural defects, concrete deterioration, and building compliance issues.
          </p>

          <h3>Our Structural Remediation Services</h3>
          <p>
            We offer a comprehensive range of remedial building services tailored to each project&apos;s unique
            requirements. Our core capabilities include:
          </p>
          <ul>
            <li>
              <strong>Structural Strengthening</strong> — Carbon fibre reinforced polymer (CFRP) and steel plate
              bonding to restore and enhance load-bearing capacity of concrete beams, columns, and slabs.
            </li>
            <li>
              <strong>Concrete Repairs</strong> — Professional patching, spalling repair, and surface restoration
              to address concrete cancer, carbonation damage, and general deterioration.
            </li>
            <li>
              <strong>Crack Injection</strong> — Epoxy and polyurethane injection for structural crack sealing
              and waterproofing of basement walls, slabs, and foundations.
            </li>
            <li>
              <strong>Concrete Cutting</strong> — Precision diamond cutting and coring for structural
              modifications, penetrations, and demolition work.
            </li>
            <li>
              <strong>Slab Scanning</strong> — Ground-penetrating radar (GPR) scanning to locate reinforcement,
              post-tension cables, and embedded services before any cutting or drilling.
            </li>
            <li>
              <strong>Curtain Wall Injection</strong> — Hydrophobic epoxy injection grouting to waterproof
              below-grade basement walls and eliminate water ingress without excavation.
            </li>
            <li>
              <strong>Post-Tension Truncation</strong> — Safe identification and controlled truncation of
              post-tension cables using GPR scanning technology.
            </li>
            <li>
              <strong>Structural Alterations</strong> — Load-bearing wall removal, opening creation, and
              structural support modification with proper engineering design.
            </li>
            <li>
              <strong>Temporary Moving Joints</strong> — Installation of SureLok&trade; and other temporary movement
              joint systems for post-tensioned concrete construction.
            </li>
          </ul>

          <h3>Why Choose TRD Remedial</h3>
          <p>
            With over 150 completed projects and a team of experienced remedial builders, TRD Remedial has
            established a reputation for delivering technically complex remediation work on time and within budget.
            Our approach combines thorough structural assessment with innovative repair methodologies to deliver
            lasting results.
          </p>
          <p>
            We hold all necessary licences for structural remediation work in NSW and maintain comprehensive
            insurance coverage. Our team works closely with structural engineers, strata managers, building
            owners, and construction professionals to deliver solutions that meet both regulatory requirements
            and practical building needs.
          </p>

          <h3>Service Areas</h3>
          <p>
            TRD Remedial operates across the entire Sydney metropolitan area and Greater New South Wales.
            Our team regularly services projects in the CBD, Inner West, Eastern Suburbs, Northern Beaches,
            North Shore, Western Sydney, South Sydney, Hills District, and surrounding regions. For emergency
            structural issues, we provide rapid response anywhere in the Sydney basin.
          </p>
        </div>
      </section>

      <HomeClient
        services={services}
        projects={projects}
        teamMembers={teamMembers}
        testimonials={testimonials}
        pageContent={pageContent}
        faqs={faqs}
      />
    </>
  );
}
