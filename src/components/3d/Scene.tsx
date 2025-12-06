'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, Grid } from '@react-three/drei';
import { BuildingModel } from './BuildingModel';
import { GuidedTour } from './GuidedTour';
import * as THREE from 'three';

type ServiceOverlay = 'none' | 'carbon-fiber' | 'crack-injection' | 'cutting' | 'scanning';

interface SceneProps {
  activeService: ServiceOverlay;
  tourActive: boolean;
  isMobile: boolean;
  scrollProgress: number;
}

// Camera controller component that responds to scroll
function CameraController({ scrollProgress, tourActive }: { scrollProgress: number; tourActive: boolean }) {
  const { camera } = useThree();

  useEffect(() => {
    if (tourActive) return; // Don't control camera during tour

    // Zoom based on scroll progress
    const minDistance = 8;
    const maxDistance = 15;
    const targetDistance = minDistance + (maxDistance - minDistance) * (1 - scrollProgress);

    // Smoothly interpolate camera position
    const targetX = Math.cos(scrollProgress * Math.PI * 2) * targetDistance;
    const targetZ = Math.sin(scrollProgress * Math.PI * 2) * targetDistance;
    const targetY = 6 + scrollProgress * 3;

    camera.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.05);
    camera.lookAt(0, 3, 0);
  }, [scrollProgress, camera, tourActive]);

  return null;
}

export function Scene({ activeService, tourActive, isMobile, scrollProgress }: SceneProps) {
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    // Reset camera position when service changes
    if (controlsRef.current && activeService !== 'none') {
      controlsRef.current.reset();
    }
  }, [activeService]);

  return (
    <Canvas
      shadows
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      gl={{
        antialias: true,
        alpha: true,
      }}
    >
      {/* Camera */}
      <PerspectiveCamera
        makeDefault
        position={[8, 6, 8]}
        fov={50}
      />

      {/* Camera controller for scroll-based movement */}
      {!tourActive && <CameraController scrollProgress={scrollProgress} tourActive={tourActive} />}

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <hemisphereLight
        args={['#ffffff', '#444444', 0.6]}
        position={[0, 20, 0]}
      />

      {/* Environment */}
      <Environment preset="warehouse" />

      {/* Grid */}
      <Grid
        args={[20, 20]}
        cellSize={0.5}
        cellThickness={0.5}
        cellColor="#6e6e6e"
        sectionSize={2}
        sectionThickness={1}
        sectionColor="#9d4b4b"
        fadeDistance={30}
        fadeStrength={1}
        followCamera={false}
        infiniteGrid={true}
      />

      {/* Building Model */}
      <BuildingModel
        activeService={activeService}
        scrollProgress={scrollProgress}
        tourActive={tourActive}
      />

      {/* Guided Tour */}
      {tourActive && <GuidedTour controlsRef={controlsRef} />}

      {/* Controls */}
      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.05}
        minDistance={5}
        maxDistance={20}
        maxPolarAngle={Math.PI / 2}
        enabled={!tourActive}
      />
    </Canvas>
  );
}
