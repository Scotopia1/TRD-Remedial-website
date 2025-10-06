import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { AccessibilityProvider } from "@/components/providers/AccessibilityProvider";
import { StructuredData } from "@/components/seo/StructuredData";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Menu } from "@/components/layout/Menu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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

export const metadata: Metadata = {
  title: {
    default: "TRD Remedial - The Remedial Experts | Structural Solutions Sydney",
    template: "%s | TRD Remedial"
  },
  description: "Award-winning structural remediation experts in Sydney. Specializing in carbon fibre reinforcement, concrete cutting & coring, crack injection, GPR scanning, and emergency structural solutions. 24/7 response available.",
  keywords: [
    "structural remediation Sydney",
    "concrete repair",
    "carbon fiber reinforcement",
    "building compliance",
    "structural engineering",
    "crack injection",
    "concrete cutting",
    "GPR scanning",
    "slab scanning",
    "emergency structural repair",
    "building commissioner approved",
    "Sydney construction",
    "carpark line marking",
    "safety fixture installation"
  ],
  authors: [{ name: "TRD Remedial", url: "https://thetrdgroup.com.au" }],
  creator: "TRD Remedial",
  publisher: "TRD Remedial",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://thetrdgroup.com.au"),
  alternates: {
    canonical: "/",
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
    title: "TRD Remedial - The Remedial Experts | Structural Solutions Sydney",
    description: "We solve structural challenges others can't handle. Expert remediation services: carbon fibre reinforcement, concrete cutting, crack injection, GPR scanning. 24/7 emergency response.",
    url: "https://thetrdgroup.com.au",
    siteName: "TRD Remedial",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TRD Remedial - Structural Remediation Experts",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TRD Remedial - The Remedial Experts",
    description: "Award-winning structural remediation. We solve challenges others can't handle. 24/7 emergency response.",
    images: ["/images/twitter-image.jpg"],
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
  verification: {
    google: "google-site-verification-code", // To be replaced with actual code
    yandex: "yandex-verification-code",
  },
  category: "construction",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AccessibilityProvider>
          <Menu />
          <CustomCursor />
          <ScrollProgress />
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
