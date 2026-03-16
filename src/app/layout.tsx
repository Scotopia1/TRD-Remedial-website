import type { Metadata } from "next";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { AccessibilityProvider } from "@/components/providers/AccessibilityProvider";
import { TransitionProvider } from "@/components/providers/TransitionProvider";
import { StructuredData } from "@/components/seo/StructuredData";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { Menu } from "@/components/layout/Menu";
import { Footer } from "@/components/sections/Footer";
import { WebVitals } from "@/components/analytics/WebVitals";
import { Analytics } from "@vercel/analytics/next";
import { SiteSettingsProvider } from "@/components/providers/SiteSettingsProvider";
import { getSettings } from "@/lib/api";

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://trdremedial.com.au';

  return {
    title: {
      default: `${settings.companyName || 'TRD Remedial'} | Expert Structural Remediation Sydney NSW`,
      template: `%s | ${settings.companyName || 'TRD Remedial'} - ${settings.tagline || 'The Remedial Experts'}`
    },
    description: settings.siteDescription || "Sydney's leading structural remediation and concrete repair specialists. Expert structural strengthening, crack injection, concrete cutting, concrete repairs, post tension truncation, slab scanning, and 24/7 emergency structural solutions across NSW. Building compliance guaranteed.",
    keywords: [
      "structural remediation Sydney",
      "concrete repair",
      "structural strengthening",
      "building compliance",
      "structural engineering",
      "crack injection",
      "concrete cutting",
      "GPR scanning",
      "slab scanning",
      "concrete repairs",
      "post tension truncation",
      "emergency structural repair",
      "building commissioner approved",
      "Sydney construction",
      "curtain wall injection",
      "structural alterations"
    ],
    authors: [{ name: settings.companyName || "TRD Remedial", url: siteUrl }],
    creator: settings.companyName || "TRD Remedial",
    publisher: settings.companyName || "TRD Remedial",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: siteUrl,
    },
    manifest: "/manifest.json",
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
        { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [
        { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    openGraph: {
      title: `${settings.companyName || 'TRD Remedial'} | Expert Structural Remediation Sydney NSW`,
      description: settings.siteDescription || `${settings.subTagline || 'When structural problems demand real answers'}. ${settings.valueProposition || 'We solve challenges others can\'t handle'}. Expert remediation services across NSW.`,
      url: siteUrl,
      siteName: settings.companyName || "TRD Remedial",
      locale: "en_AU",
      type: "website",
      images: [
        {
          url: settings.ogImage || "https://ik.imagekit.io/1fovck7sy4/trd-website/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${settings.companyName || "TRD Remedial"} - Structural Remediation Experts`,
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${settings.companyName || 'TRD Remedial'} | Expert Structural Remediation Sydney NSW`,
      description: settings.siteDescription || "Award-winning structural remediation. We solve challenges others can't handle. 24/7 emergency response.",
      images: [settings.twitterImage || "https://ik.imagekit.io/1fovck7sy4/trd-website/images/twitter-image.jpg"],
      creator: "@trdremedial",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    // verification: {
    //   google: "YOUR_GOOGLE_VERIFICATION_CODE",
    //   yandex: "YOUR_YANDEX_VERIFICATION_CODE",
    // },
    category: "construction",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSettings();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
        {/* Google Analytics 4 */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('consent', 'default', {
                    'analytics_storage': 'granted'
                  });
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
        {/* Font Preloading - Optimized for Performance (Only critical fonts preloaded) */}
        {/* PRIMARY FONT: Messina Sans Regular - Used for main body text */}
        <link
          rel="preload"
          href="/fonts/messina-sans/MessinaSans-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* SECONDARY FONTS: Loaded with lower priority for faster FCP */}
        <link
          rel="prefetch"
          href="/fonts/messina-sans/MessinaSans-SemiBold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="prefetch"
          href="/fonts/rader/PPRader-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="prefetch"
          href="/fonts/rader/PPRader-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className="antialiased"
      >
        {/* TEMP REMOVED ScrollUnlockProvider - Testing */}
        <WebVitals />
        <SiteSettingsProvider initialSettings={siteSettings}>
          <AccessibilityProvider>
            <ScrollToTop />
            <Menu />
            <CustomCursor />
            <ScrollProgress />
            <TransitionProvider>
              <SmoothScrollProvider>
                {children}
              </SmoothScrollProvider>
              <Footer />
            </TransitionProvider>
          </AccessibilityProvider>
        </SiteSettingsProvider>
        <Analytics />
      </body>
    </html>
  );
}
