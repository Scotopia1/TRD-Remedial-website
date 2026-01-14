export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://thetrdgroup.com.au/#organization",
    name: "TRD Remedial",
    legalName: "Tension Reinforced Developments",
    url: "https://thetrdgroup.com.au",
    logo: "https://thetrdgroup.com.au/trd-logo.svg",
    foundingDate: "2017",
    founders: [
      {
        "@type": "Person",
        name: "Christopher Nassif"
      },
      {
        "@type": "Person",
        name: "Charly Nassif"
      },
      {
        "@type": "Person",
        name: "Fahed Nassif"
      }
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+61-414-727-167",
      contactType: "emergency",
      areaServed: "AU",
      availableLanguage: "English"
    },
    sameAs: [
      "https://www.linkedin.com/company/trd-remedial",
      "https://www.facebook.com/trdremedial",
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://thetrdgroup.com.au/#localbusiness",
    name: "TRD Remedial",
    image: "https://thetrdgroup.com.au/images/og-image.jpg",
    description: "Award-winning structural remediation experts in Sydney. Specializing in carbon fibre reinforcement, concrete cutting, crack injection, and emergency structural solutions.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "2 Beryl Place",
      addressLocality: "Greenacre",
      addressRegion: "NSW",
      postalCode: "2190",
      addressCountry: "AU"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -33.9000,
      longitude: 151.0500
    },
    telephone: "+61-414-727-167",
    email: "info@thetrdgroup.com.au",
    url: "https://thetrdgroup.com.au",
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      opens: "00:00",
      closes: "23:59"
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Structural Remediation Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Structural Remedial Works",
            description: "Comprehensive crack injection, concrete patching, and surface restoration services"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Concrete Cutting & Coring",
            description: "Precision wall sawing, floor cutting, and coring services"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Carbon Fibre Reinforcement",
            description: "Advanced structural strengthening using carbon fiber technology"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Slab Scanning & Concrete Imaging",
            description: "GPR scanning and non-invasive diagnostic services"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Safety Fixture Installation",
            description: "Professional installation of handrails and height safety systems"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Carpark Line Marking & Fit-outs",
            description: "Complete carpark solutions and line marking services"
          }
        }
      ]
    },
    areaServed: {
      "@type": "State",
      name: "New South Wales"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://thetrdgroup.com.au/#website",
    url: "https://thetrdgroup.com.au",
    name: "TRD Remedial",
    description: "The Remedial Experts - Structural Solutions Sydney",
    publisher: {
      "@id": "https://thetrdgroup.com.au/#organization"
    },
    inLanguage: "en-AU"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://thetrdgroup.com.au"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
