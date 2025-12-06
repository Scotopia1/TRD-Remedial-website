'use client';

import './ValuesSpotlight.css';
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
            ) : (
              <div className="value-image">
                <img src={value.image} alt="TRD Value" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
