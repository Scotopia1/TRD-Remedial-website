'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

type ServiceOverlay = 'none' | 'carbon-fiber' | 'crack-injection' | 'cutting' | 'scanning';

interface BuildingModelProps {
  activeService: ServiceOverlay;
  scrollProgress: number;
  tourActive: boolean;
}

interface Hotspot {
  position: [number, number, number];
  service: Exclude<ServiceOverlay, 'none'>;
  label: string;
  description: string;
}

export function BuildingModel({ activeService, scrollProgress, tourActive }: BuildingModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);

  // Store refs for pulsing rings
  const hotspotRingsRef = useRef<Map<string, THREE.Mesh>>(new Map());
  const pulseTime = useRef(0);

  // Auto-rotation when no specific service is active and not in tour mode
  useFrame((state, delta) => {
    if (groupRef.current && activeService === 'none' && !tourActive) {
      // Subtle rotation combined with scroll-based rotation
      groupRef.current.rotation.y = scrollProgress * Math.PI * 2 + state.clock.elapsedTime * 0.05;
    }

    // Pulse animation for hotspot rings
    pulseTime.current += delta;
    hotspotRingsRef.current.forEach((ring) => {
      if (ring) {
        const pulseScale = 1 + Math.sin(pulseTime.current * 2) * 0.2;
        ring.scale.set(pulseScale, pulseScale, 1);

        // Pulsing opacity
        if (ring.material instanceof THREE.MeshBasicMaterial) {
          ring.material.opacity = 0.4 + Math.sin(pulseTime.current * 2) * 0.3;
        }
      }
    });
  });

  // Define hotspots for each service
  const hotspots: Hotspot[] = [
    {
      position: [0, 2, 2],
      service: 'carbon-fiber',
      label: 'Carbon Fiber Reinforcement',
      description: 'Slab strengthening with carbon fiber application',
    },
    {
      position: [-2, 3, 0],
      service: 'crack-injection',
      label: 'Crack Injection',
      description: 'Structural crack repair and sealing',
    },
    {
      position: [2, 1, -1],
      service: 'cutting',
      label: 'Concrete Cutting',
      description: 'Precision cutting and coring work',
    },
    {
      position: [0, 4, -2],
      service: 'scanning',
      label: 'GPR Scanning',
      description: 'Ground-penetrating radar analysis',
    },
  ];

  const getServiceColor = (service: ServiceOverlay): string => {
    const colors = {
      'carbon-fiber': '#3b82f6', // blue
      'crack-injection': '#ef4444', // red
      'cutting': '#f59e0b', // amber
      'scanning': '#10b981', // green
      'none': '#6b7280', // gray
    };
    return colors[service];
  };

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Building Base/Foundation */}
      <mesh position={[0, -0.2, 0]} receiveShadow>
        <boxGeometry args={[6, 0.4, 6]} />
        <meshStandardMaterial color="#4b5563" />
      </mesh>

      {/* Floor 1 */}
      <group position={[0, 1, 0]}>
        {/* Floor Slab */}
        <mesh position={[0, 0, 0]} receiveShadow castShadow>
          <boxGeometry args={[5, 0.3, 5]} />
          <meshStandardMaterial
            color={activeService === 'carbon-fiber' ? getServiceColor('carbon-fiber') : '#d1d5db'}
            opacity={activeService === 'carbon-fiber' ? 0.8 : 1}
            transparent={activeService === 'carbon-fiber'}
            emissive={activeService === 'carbon-fiber' ? getServiceColor('carbon-fiber') : '#000000'}
            emissiveIntensity={activeService === 'carbon-fiber' ? 0.3 : 0}
          />
        </mesh>

        {/* Columns */}
        {[[-2, 0, -2], [2, 0, -2], [-2, 0, 2], [2, 0, 2]].map((pos, idx) => (
          <mesh key={idx} position={pos as [number, number, number]} castShadow>
            <cylinderGeometry args={[0.2, 0.2, 3, 8]} />
            <meshStandardMaterial color="#6b7280" />
          </mesh>
        ))}

        {/* Walls with Cracks (for crack injection service) */}
        <mesh position={[2.5, 1.5, 0]} castShadow>
          <boxGeometry args={[0.2, 3, 4]} />
          <meshStandardMaterial
            color={activeService === 'crack-injection' ? getServiceColor('crack-injection') : '#9ca3af'}
            opacity={activeService === 'crack-injection' ? 0.8 : 1}
            transparent={activeService === 'crack-injection'}
            emissive={activeService === 'crack-injection' ? getServiceColor('crack-injection') : '#000000'}
            emissiveIntensity={activeService === 'crack-injection' ? 0.3 : 0}
          />
        </mesh>
      </group>

      {/* Floor 2 */}
      <group position={[0, 4, 0]}>
        {/* Floor Slab */}
        <mesh position={[0, 0, 0]} receiveShadow castShadow>
          <boxGeometry args={[5, 0.3, 5]} />
          <meshStandardMaterial
            color={activeService === 'scanning' ? getServiceColor('scanning') : '#d1d5db'}
            opacity={activeService === 'scanning' ? 0.8 : 1}
            transparent={activeService === 'scanning'}
            emissive={activeService === 'scanning' ? getServiceColor('scanning') : '#000000'}
            emissiveIntensity={activeService === 'scanning' ? 0.3 : 0}
          />
        </mesh>

        {/* Columns */}
        {[[-2, 0, -2], [2, 0, -2], [-2, 0, 2], [2, 0, 2]].map((pos, idx) => (
          <mesh key={idx} position={pos as [number, number, number]} castShadow>
            <cylinderGeometry args={[0.2, 0.2, 3, 8]} />
            <meshStandardMaterial color="#6b7280" />
          </mesh>
        ))}
      </group>

      {/* Floor 3 (Roof) */}
      <mesh position={[0, 7, 0]} receiveShadow castShadow>
        <boxGeometry args={[5, 0.3, 5]} />
        <meshStandardMaterial color="#9ca3af" />
      </mesh>

      {/* Cutting Area Indicator */}
      {activeService === 'cutting' && (
        <mesh position={[2, 1, -1]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.5, 0.1, 16, 32]} />
          <meshStandardMaterial
            color={getServiceColor('cutting')}
            emissive={getServiceColor('cutting')}
            emissiveIntensity={0.5}
          />
        </mesh>
      )}

      {/* Hotspots */}
      {hotspots.map((hotspot, idx) => {
        const isActive = activeService === hotspot.service || activeService === 'none';
        const isHovered = hoveredHotspot === hotspot.label;

        return (
          <group key={idx} position={hotspot.position}>
            {/* Hotspot Marker */}
            <mesh
              onPointerEnter={() => setHoveredHotspot(hotspot.label)}
              onPointerLeave={() => setHoveredHotspot(null)}
              visible={isActive}
            >
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshStandardMaterial
                color={getServiceColor(hotspot.service)}
                emissive={getServiceColor(hotspot.service)}
                emissiveIntensity={isHovered ? 0.8 : 0.3}
                opacity={0.9}
                transparent
              />
            </mesh>

            {/* Pulsing Ring - Enhanced */}
            {isActive && (
              <mesh
                ref={(el) => {
                  if (el) hotspotRingsRef.current.set(hotspot.label, el);
                }}
                rotation={[Math.PI / 2, 0, 0]}
              >
                <ringGeometry args={[0.2, 0.3, 32]} />
                <meshBasicMaterial
                  color={getServiceColor(hotspot.service)}
                  opacity={0.6}
                  transparent
                  side={THREE.DoubleSide}
                />
              </mesh>
            )}

            {/* Outer Pulsing Ring (slower pulse) */}
            {isActive && (
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.35, 0.4, 32]} />
                <meshBasicMaterial
                  color={getServiceColor(hotspot.service)}
                  opacity={0.3}
                  transparent
                  side={THREE.DoubleSide}
                />
              </mesh>
            )}

            {/* HTML Label */}
            {(isHovered || activeService === hotspot.service) && (
              <Html
                position={[0, 0.5, 0]}
                center
                distanceFactor={6}
                style={{
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
              >
                <div className="bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg
                             text-sm whitespace-nowrap shadow-lg border border-white/20
                             animate-in fade-in zoom-in-95 duration-200">
                  <div className="font-bold">{hotspot.label}</div>
                  <div className="text-xs text-white/70 mt-1">{hotspot.description}</div>
                </div>
              </Html>
            )}
          </group>
        );
      })}

      {/* Scanning Grid Overlay */}
      {activeService === 'scanning' && (
        <group position={[0, 4, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <planeGeometry args={[5, 5, 10, 10]} />
            <meshBasicMaterial
              color={getServiceColor('scanning')}
              wireframe
              opacity={0.4}
              transparent
            />
          </mesh>
        </group>
      )}
    </group>
  );
}
