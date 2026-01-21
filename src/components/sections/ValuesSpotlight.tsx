'use client';

import './ValuesSpotlight.css';
import Image from 'next/image';
import { COMPANY_VALUES } from '@/data/team';

export function ValuesSpotlight() {
  return (
    <section className="values-spotlight">
      <div className="values-container">
        {COMPANY_VALUES.map((value) => (
          <div key={value.id} className="value-item">
            {value.isText ? (
              <div className="value-text">
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ) : value.image ? (
              <div className="value-image">
                <Image
                  src={value.image}
                  alt="TRD Value"
                  width={800}
                  height={600}
                  sizes="(max-width: 768px) 100vw, 800px"
                  quality={85}
                  priority={false}
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
