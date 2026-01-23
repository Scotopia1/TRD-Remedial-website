/**
 * Example: Using Blur Placeholders for Zero CLS
 *
 * This example shows how to use the generated blur placeholders
 * with Next.js Image component for optimal SEO and UX.
 */

import Image from 'next/image';
import blurPlaceholders from '@/data/blurPlaceholders.json';

// Type-safe helper to get blur placeholder
type ProjectSlug = keyof typeof blurPlaceholders.projects;
type ImageName<T extends ProjectSlug> = keyof typeof blurPlaceholders.projects[T];

function getBlurPlaceholder<T extends ProjectSlug>(
  projectSlug: T,
  imageName: ImageName<T>
): string {
  return blurPlaceholders.projects[projectSlug][imageName] as string;
}

// Example 1: Basic Usage
export function ProjectHeroImage({ projectSlug }: { projectSlug: string }) {
  const blurDataURL = getBlurPlaceholder(
    projectSlug as ProjectSlug,
    'hero'
  );

  return (
    <Image
      src={`/images/projects/${projectSlug}/hero.jpg`}
      alt="Project hero image"
      width={1920}
      height={1080}
      placeholder="blur"
      blurDataURL={blurDataURL}
      priority // For above-the-fold images
      className="w-full h-auto"
    />
  );
}

// Example 2: Gallery with Multiple Images
export function ProjectGallery({ projectSlug }: { projectSlug: string }) {
  const galleryImages = ['gallery-01', 'gallery-02', 'gallery-03'] as const;

  return (
    <div className="grid grid-cols-3 gap-4">
      {galleryImages.map((imageName) => {
        const blurDataURL = getBlurPlaceholder(
          projectSlug as ProjectSlug,
          imageName
        );

        return (
          <Image
            key={imageName}
            src={`/images/projects/${projectSlug}/${imageName}.jpg`}
            alt={`Gallery image ${imageName}`}
            width={800}
            height={600}
            placeholder="blur"
            blurDataURL={blurDataURL}
            className="w-full h-auto rounded-lg"
          />
        );
      })}
    </div>
  );
}

// Example 3: Before/After Comparison
export function BeforeAfterComparison({ projectSlug }: { projectSlug: string }) {
  const beforeBlur = getBlurPlaceholder(projectSlug as ProjectSlug, 'before-01');
  const afterBlur = getBlurPlaceholder(projectSlug as ProjectSlug, 'after-01');

  return (
    <div className="grid grid-cols-2 gap-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Before</h3>
        <Image
          src={`/images/projects/${projectSlug}/before-01.jpg`}
          alt="Before restoration"
          width={800}
          height={600}
          placeholder="blur"
          blurDataURL={beforeBlur}
          className="w-full h-auto rounded-lg"
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">After</h3>
        <Image
          src={`/images/projects/${projectSlug}/after-01.jpg`}
          alt="After restoration"
          width={800}
          height={600}
          placeholder="blur"
          blurDataURL={afterBlur}
          className="w-full h-auto rounded-lg"
        />
      </div>
    </div>
  );
}

// Example 4: Responsive Image with Blur
export function ResponsiveProjectImage({
  projectSlug,
  imageName,
  alt,
}: {
  projectSlug: string;
  imageName: string;
  alt: string;
}) {
  const blurDataURL = getBlurPlaceholder(
    projectSlug as ProjectSlug,
    imageName as any
  );

  return (
    <div className="relative w-full aspect-video">
      <Image
        src={`/images/projects/${projectSlug}/${imageName}.jpg`}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        placeholder="blur"
        blurDataURL={blurDataURL}
        className="object-cover rounded-lg"
      />
    </div>
  );
}

// Example 5: Project Card with Thumbnail
export function ProjectCard({ projectSlug, title }: { projectSlug: string; title: string }) {
  const thumbnailBlur = getBlurPlaceholder(
    projectSlug as ProjectSlug,
    'thumbnail'
  );

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <Image
          src={`/images/projects/${projectSlug}/thumbnail.jpg`}
          alt={`${title} thumbnail`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={thumbnailBlur}
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
    </div>
  );
}

/**
 * SEO Benefits:
 *
 * 1. Zero CLS (Cumulative Layout Shift)
 *    - Images reserve space immediately
 *    - No content jumping during load
 *    - Better Core Web Vitals score
 *
 * 2. Faster Perceived Performance
 *    - Users see blurred preview instantly
 *    - Progressive image loading
 *    - Better UX experience
 *
 * 3. Better Core Web Vitals
 *    - Improved CLS score
 *    - Better LCP (Largest Contentful Paint)
 *    - Higher SEO rankings
 *
 * 4. Bandwidth Efficient
 *    - Tiny base64 placeholders (~500 bytes)
 *    - No additional HTTP requests
 *    - Inline with HTML
 */
