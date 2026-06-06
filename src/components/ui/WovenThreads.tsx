"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Segments = 50;

function Thread({ index }: { index: number }) {
  const lineRef = useRef<THREE.Line>(null);
  const positions = useMemo(() => new Float32Array(Segments * 3), []);
  
  useFrame((state) => {
    if (!lineRef.current) return;
    const time = state.clock.getElapsedTime();
    const arr = lineRef.current.geometry.attributes.position.array as Float32Array;
    
    // Calculate offsets based on index to spread the threads out
    const zOffset = (index - 7) * 0.5;
    const yOffset = Math.sin(time * 0.1 + index) * 1.5;
    
    for (let j = 0; j < Segments; j++) {
      const x = (j / Segments) * 30 - 15;
      // Gently undulating threads simulating loom strings
      const y = Math.sin(x * 0.3 + time * 0.4 + index * 0.2) * 0.8 + Math.cos(x * 0.15 + time * 0.2) * 0.5 + yOffset;
      
      arr[j * 3] = x; 
      arr[j * 3 + 1] = y;
      arr[j * 3 + 2] = zOffset;
    }
    lineRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <line ref={lineRef as any}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={Segments}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial 
        color={index % 4 === 0 ? "#ab5033" : "#c8a05a"} // Mix of Terracotta and Brass
        transparent 
        opacity={0.2} 
      />
    </line>
  );
}

export default function WovenThreads() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop = window.innerWidth >= 768;
    
    if (!prefersReducedMotion && isDesktop) {
      setShouldRender(true);
    }
  }, []);

  if (!shouldRender) return null;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ antialias: false, powerPreference: "low-power" }}>
        <group rotation={[0, 0, -Math.PI / 12]}>
          {Array.from({ length: 20 }).map((_, i) => (
            <Thread key={i} index={i} />
          ))}
        </group>
      </Canvas>
    </div>
  );
}
