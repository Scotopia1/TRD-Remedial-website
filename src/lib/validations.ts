// Zod Validation Schemas for Admin API
import { z } from 'zod'

// Service validation schema
export const serviceSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  title: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  features: z.array(z.string()),
  benefits: z.array(z.string()),
  icon: z.string().url(),
  visual: z.string().url(),
  heroImage: z.string().url().optional(),
  featureImage: z.string().url().optional(),
  processImage: z.string().url().optional(),
  stats: z.any().optional(),
  process: z.any().optional(),
})

export const serviceUpdateSchema = serviceSchema.partial()

// Project validation schema
export const projectSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  name: z.string().min(1),
  location: z.string().min(1),
  date: z.string().datetime().or(z.date()),
  serviceType: z.string().min(1),
  serviceId: z.string().min(1),
  categories: z.array(z.string()),
  featuredImage: z.string().url(),
  thumbnailImage: z.string().url(),
  heroImage: z.string().url(),
  tagline: z.string().min(1),
  challenge: z.string().min(1),
  solution: z.string().min(1),
  results: z.string().min(1),
  beforeImage: z.any().optional(),
  afterImage: z.any().optional(),
  galleryImages: z.any().optional(),
  stats: z.any().optional(),
  testimonial: z.any().optional(),
  timeline: z.string().optional(),
  budget: z.string().optional(),
})

export const projectUpdateSchema = projectSchema.partial()

// TeamMember validation schema
export const teamMemberSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  roles: z.array(z.string()),
  expertise: z.array(z.string()),
  bio: z.string().min(1),
  image: z.string().url(),
  linkedIn: z.string().url().optional(),
})

export const teamMemberUpdateSchema = teamMemberSchema.partial()

// CompanyValue validation schema
export const companyValueSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  image: z.string().url().optional(),
  isText: z.boolean().default(true),
  order: z.number().int().min(0).default(0),
})

export const companyValueUpdateSchema = companyValueSchema.partial()

// CaseStudy validation schema
export const caseStudySchema = z.object({
  title: z.string().min(1),
  location: z.string().min(1),
  challenge: z.string().min(1),
  solution: z.array(z.string()),
  result: z.string().min(1),
  metrics: z.any().optional(),
  images: z.any().optional(),
  visual: z.string().optional(),
})

export const caseStudyUpdateSchema = caseStudySchema.partial()

// SiteSettings validation schema
export const siteSettingsSchema = z.object({
  contactEmail: z.string().email(),
  contactPhone: z.string().min(1),
  contactAddress: z.string().min(1),
  businessHours: z.string().min(1),
  siteTitle: z.string().min(1),
  siteDescription: z.string().min(1),
})

export const siteSettingsUpdateSchema = siteSettingsSchema.partial()

// Media validation schema
export const mediaSchema = z.object({
  filename: z.string().min(1),
  url: z.string().url(),
  mimeType: z.string().min(1),
  size: z.number().int().positive(),
  alt: z.string().optional(),
  caption: z.string().optional(),
})

export const mediaUpdateSchema = mediaSchema.partial()
