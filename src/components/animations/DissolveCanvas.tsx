'use client';

import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { vertexShader, fragmentShader } from '@/components/shaders/dissolve';

gsap.registerPlugin(ScrollTrigger);

interface DissolveCanvasProps {
  color?: string;
  spread?: number;
  speed?: number;
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255,
      }
    : { r: 1, g: 1, b: 1 };
}

export function DissolveCanvas({
  color = '#e0e0e0',
  spread = 0.5,
  speed = 2,
}: DissolveCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const geometryRef = useRef<THREE.PlaneGeometry | null>(null);
  const scrollProgressRef = useRef(0);
  const [isMounted, setIsMounted] = useState(false);

  // Handle SSR - only render on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const hero = document.querySelector('.hero') as HTMLElement;
    if (!hero) return;

    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
    });
    rendererRef.current = renderer;

    // Resize function
    const resize = () => {
      const width = hero.offsetWidth;
      const height = hero.offsetHeight;
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      if (materialRef.current) {
        materialRef.current.uniforms.uResolution.value.set(width, height);
      }
    };

    resize();
    window.addEventListener('resize', resize);

    // Create shader material
    const rgb = hexToRgb(color);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uProgress: { value: 0 },
        uResolution: { value: new THREE.Vector2(hero.offsetWidth, hero.offsetHeight) },
        uColor: { value: new THREE.Vector3(rgb.r, rgb.g, rgb.b) },
        uSpread: { value: spread },
      },
      transparent: true,
    });
    materialRef.current = material;

    // Create mesh
    const geometry = new THREE.PlaneGeometry(2, 2);
    geometryRef.current = geometry;
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // ScrollTrigger for scroll progress
    const scrollTrigger = ScrollTrigger.create({
      trigger: '.hero',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        // Speed multiplier makes effect complete faster than scroll
        scrollProgressRef.current = Math.min(self.progress * speed, 1.1);
      },
    });

    // Animation loop
    let animationId: number;
    const animate = () => {
      if (materialRef.current) {
        materialRef.current.uniforms.uProgress.value = scrollProgressRef.current;
      }
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      scrollTrigger.kill();

      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
      if (geometryRef.current) {
        geometryRef.current.dispose();
        geometryRef.current = null;
      }
      if (materialRef.current) {
        materialRef.current.dispose();
        materialRef.current = null;
      }
    };
  }, [isMounted, color, spread, speed]);

  // Don't render canvas during SSR
  if (!isMounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="hero-canvas"
      aria-hidden="true"
    />
  );
}
