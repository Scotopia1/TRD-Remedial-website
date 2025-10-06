/**
 * Site-wide constants and configuration
 */

// Company Information
export const COMPANY_INFO = {
  name: 'TRD Remedial',
  fullName: 'TRD Remedial - The Remedial Experts',
  tagline: 'THE REMEDIAL EXPERTS',
  subTagline: 'When structural problems demand real answers',
  valueProposition: "We solve challenges others can't handle",

  // Contact Details
  contact: {
    phone: {
      emergency1: '0414 727 167',
      emergency2: '0404 404 422',
    },
    email: 'info@thetrdgroup.com.au',
    address: '2 Beryl Place Greenacre NSW 2190',
  },

  // Quick access properties
  emergency_phones: ['0414 727 167', '0404 404 422'],
  email: 'info@thetrdgroup.com.au',
  address: '2 Beryl Place Greenacre NSW 2190',

  // Parent Company
  parentCompany: {
    name: 'Tension Reinforced Developments',
    established: '2017',
  },
} as const;

// Hero Section Stats
export const HERO_STATS = [
  { label: 'Columns Removed', value: 40 },
  { label: 'Cracks Repaired', value: 2500, unit: 'm' },
  { label: 'Compromises', value: 0 },
] as const;

// Navigation Links
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
] as const;

// Animation Duration
export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  opening: 5, // Opening animation duration in seconds
} as const;

// Responsive Breakpoints (matching Tailwind defaults)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Color Palette (to be used in Tailwind config)
export const COLORS = {
  concrete: {
    50: '#f8f9fa',
    100: '#e9ecef',
    200: '#dee2e6',
    300: '#ced4da',
    400: '#adb5bd',
    500: '#6c757d',
    600: '#495057',
    700: '#343a40',
    800: '#212529',
    900: '#0a0c0d',
  },
  industrial: {
    50: '#f5f5f5',
    100: '#e0e0e0',
    200: '#bdbdbd',
    300: '#9e9e9e',
    400: '#757575',
    500: '#616161',
    600: '#424242',
    700: '#303030',
    800: '#212121',
    900: '#121212',
  },
  trd: {
    primary: '#1a1a1a', // Charcoal (brand color)
    secondary: '#f5f5f5', // Off-white (backgrounds)
    accent: '#424242', // Dark gray (CTAs/highlights)
    accentHover: '#303030', // Darker gray (hover states)
  },
} as const;
