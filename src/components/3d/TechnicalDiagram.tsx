'use client';

import { useState } from 'react';

type ServiceOverlay = 'none' | 'carbon-fiber' | 'crack-injection' | 'cutting' | 'scanning';

interface TechnicalDiagramProps {
  activeService: ServiceOverlay;
}

interface Hotspot {
  id: string;
  x: number;
  y: number;
  service: Exclude<ServiceOverlay, 'none'>;
  label: string;
  description: string;
}

export function TechnicalDiagram({ activeService }: TechnicalDiagramProps) {
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);

  const hotspots: Hotspot[] = [
    {
      id: 'cf1',
      x: 300,
      y: 250,
      service: 'carbon-fiber',
      label: 'Carbon Fiber Reinforcement',
      description: 'Floor 2 - Slab strengthening',
    },
    {
      id: 'ci1',
      x: 150,
      y: 200,
      service: 'crack-injection',
      label: 'Crack Injection',
      description: 'West wall - Structural repair',
    },
    {
      id: 'cut1',
      x: 450,
      y: 350,
      service: 'cutting',
      label: 'Concrete Cutting',
      description: 'Floor 1 - Precision coring',
    },
    {
      id: 'scan1',
      x: 300,
      y: 150,
      service: 'scanning',
      label: 'GPR Scanning',
      description: 'Floor 3 - Subsurface analysis',
    },
  ];

  const getServiceColor = (service: ServiceOverlay): string => {
    const colors = {
      'carbon-fiber': '#3b82f6',
      'crack-injection': '#ef4444',
      'cutting': '#f59e0b',
      'scanning': '#10b981',
      'none': '#6b7280',
    };
    return colors[service];
  };

  const isHotspotVisible = (hotspot: Hotspot) => {
    return activeService === 'none' || activeService === hotspot.service;
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-concrete-800 to-industrial-900 flex items-center justify-center">
      <svg
        viewBox="0 0 600 500"
        className="w-full h-full max-w-4xl max-h-full"
        style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }}
      >
        <defs>
          {/* Grid Pattern */}
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#4b5563" strokeWidth="0.5" opacity="0.3" />
          </pattern>

          {/* Crack Pattern */}
          <pattern id="cracks" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M0,15 Q7.5,10 15,15 T30,15" fill="none" stroke="#ef4444" strokeWidth="2" opacity="0.6" />
          </pattern>

          {/* Carbon Fiber Pattern */}
          <pattern id="carbonFiber" width="10" height="10" patternUnits="userSpaceOnUse">
            <line x1="0" y1="5" x2="10" y2="5" stroke="#3b82f6" strokeWidth="2" />
            <line x1="5" y1="0" x2="5" y2="10" stroke="#3b82f6" strokeWidth="2" />
          </pattern>

          {/* Scanning Grid */}
          <pattern id="scanGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="none" stroke="#10b981" strokeWidth="1" />
          </pattern>
        </defs>

        {/* Background Grid */}
        <rect width="600" height="500" fill="url(#grid)" />

        {/* Building Structure - Front View */}
        <g id="building-structure">
          {/* Foundation */}
          <rect x="100" y="400" width="400" height="30" fill="#4b5563" stroke="#6b7280" strokeWidth="2" />

          {/* Floor 1 */}
          <g id="floor-1">
            <rect x="100" y="350" width="400" height="50" fill="#9ca3af" stroke="#6b7280" strokeWidth="2" />
            {activeService === 'cutting' && (
              <circle cx="450" cy="375" r="30" fill="none" stroke={getServiceColor('cutting')} strokeWidth="3" strokeDasharray="5,5">
                <animate attributeName="r" values="25;35;25" dur="2s" repeatCount="indefinite" />
              </circle>
            )}
          </g>

          {/* Floor 2 */}
          <g id="floor-2">
            <rect
              x="100"
              y="250"
              width="400"
              height="50"
              fill={activeService === 'carbon-fiber' ? 'url(#carbonFiber)' : '#d1d5db'}
              stroke="#6b7280"
              strokeWidth="2"
              opacity={activeService === 'carbon-fiber' ? 0.8 : 1}
            />
          </g>

          {/* Floor 3 */}
          <g id="floor-3">
            <rect
              x="100"
              y="150"
              width="400"
              height="50"
              fill={activeService === 'scanning' ? 'url(#scanGrid)' : '#e5e7eb'}
              stroke="#6b7280"
              strokeWidth="2"
              opacity={activeService === 'scanning' ? 0.9 : 1}
            />
          </g>

          {/* Roof */}
          <polygon points="80,150 300,80 520,150" fill="#6b7280" stroke="#4b5563" strokeWidth="2" />

          {/* Columns */}
          {[150, 250, 350, 450].map((x, idx) => (
            <rect key={idx} x={x - 10} y="200" width="20" height="200" fill="#6b7280" />
          ))}

          {/* Wall with Cracks */}
          <g id="wall">
            <rect
              x="100"
              y="200"
              width="50"
              height="200"
              fill={activeService === 'crack-injection' ? 'url(#cracks)' : '#9ca3af'}
              stroke="#6b7280"
              strokeWidth="2"
              opacity={activeService === 'crack-injection' ? 0.9 : 1}
            />
          </g>
        </g>

        {/* Hotspots */}
        {hotspots.map((hotspot) => {
          if (!isHotspotVisible(hotspot)) return null;

          const isHovered = hoveredHotspot === hotspot.id;
          const isActive = activeService === hotspot.service;

          return (
            <g
              key={hotspot.id}
              onMouseEnter={() => setHoveredHotspot(hotspot.id)}
              onMouseLeave={() => setHoveredHotspot(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* Pulsing Circle */}
              <circle
                cx={hotspot.x}
                cy={hotspot.y}
                r="15"
                fill={getServiceColor(hotspot.service)}
                opacity={isActive ? 0.8 : 0.6}
              >
                {isActive && (
                  <animate attributeName="r" values="12;18;12" dur="2s" repeatCount="indefinite" />
                )}
              </circle>

              {/* Outer Ring */}
              <circle
                cx={hotspot.x}
                cy={hotspot.y}
                r="20"
                fill="none"
                stroke={getServiceColor(hotspot.service)}
                strokeWidth="2"
                opacity={isHovered || isActive ? 0.8 : 0.4}
              />

              {/* Label Line */}
              {(isHovered || isActive) && (
                <>
                  <line
                    x1={hotspot.x}
                    y1={hotspot.y}
                    x2={hotspot.x + 50}
                    y2={hotspot.y - 40}
                    stroke={getServiceColor(hotspot.service)}
                    strokeWidth="2"
                  />
                  <foreignObject
                    x={hotspot.x + 55}
                    y={hotspot.y - 70}
                    width="180"
                    height="60"
                  >
                    <div className="bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm border border-white/20">
                      <div className="font-bold">{hotspot.label}</div>
                      <div className="text-xs text-white/70 mt-1">{hotspot.description}</div>
                    </div>
                  </foreignObject>
                </>
              )}
            </g>
          );
        })}

        {/* Legend */}
        <g id="legend" transform="translate(20, 20)">
          <rect x="0" y="0" width="180" height="140" fill="black" fillOpacity="0.7" rx="8" />
          <text x="15" y="25" fill="white" fontSize="14" fontWeight="bold">Service Locations</text>

          {[
            { service: 'carbon-fiber' as const, label: 'Carbon Fiber' },
            { service: 'crack-injection' as const, label: 'Crack Injection' },
            { service: 'cutting' as const, label: 'Cutting & Coring' },
            { service: 'scanning' as const, label: 'GPR Scanning' },
          ].map((item, idx) => (
            <g key={item.service} transform={`translate(15, ${45 + idx * 22})`}>
              <circle cx="8" cy="0" r="6" fill={getServiceColor(item.service)} />
              <text x="20" y="4" fill="white" fontSize="12">{item.label}</text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
