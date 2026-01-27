'use client';

import type { ProjectImage } from '@/data/projects';
import './ImageCarousel.css';

interface ImageCarouselProps {
  images: ProjectImage[];
  projectName: string;
}

export function ImageCarousel({ images, projectName }: ImageCarouselProps) {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="image-masonry">
      <div className="masonry-grid">
        {images.map((image, index) => (
          <div
            key={index}
            className={`masonry-item masonry-item-${index + 1}`}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="masonry-image"
            />
            {image.caption && (
              <p className="masonry-caption">{image.caption}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
