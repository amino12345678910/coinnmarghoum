"use client";

import { useRef, useEffect, useState } from "react";

export default function InteractiveDivider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  
  // Default control points for the Bezier curves (center of the 1000x100 SVG)
  const [controlPoint, setControlPoint] = useState({ x: 500, y: 50 });

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDesktop || reducedMotion || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    
    // Map mouse position to SVG coordinates (1000x100)
    const relativeX = (e.clientX - rect.left) / rect.width;
    const relativeY = (e.clientY - rect.top) / rect.height;
    
    const svgX = relativeX * 1000;
    const svgY = relativeY * 100;
    
    setControlPoint({ x: svgX, y: svgY });
  };

  const handleMouseLeave = () => {
    setControlPoint({ x: 500, y: 50 });
  };

  if (!isDesktop || reducedMotion) {
    return (
      <div className="w-full flex justify-center py-16">
        <div className="w-3/4 max-w-lg h-px bg-brass/20" />
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center py-12 md:py-24 bg-charcoal relative z-20">
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full max-w-6xl h-[120px] relative cursor-crosshair overflow-visible group"
      >
        <svg 
          viewBox="0 0 1000 100" 
          className="w-full h-full fill-none transition-all duration-500 ease-out" 
          preserveAspectRatio="none"
        >
           {/* Central Thread */}
           <path 
             d={`M 0 50 Q ${controlPoint.x} ${controlPoint.y} 1000 50`} 
             className="opacity-50 stroke-brass stroke-[1.5px] group-hover:opacity-100 transition-opacity duration-300"
           />
           {/* Top Thread */}
           <path 
             d={`M 0 50 Q ${controlPoint.x} ${controlPoint.y - 15} 1000 50`} 
             className="opacity-30 stroke-terracotta stroke-[1px] group-hover:opacity-80 transition-opacity duration-300 delay-75"
           />
           {/* Bottom Thread */}
           <path 
             d={`M 0 50 Q ${controlPoint.x} ${controlPoint.y + 15} 1000 50`} 
             className="opacity-20 stroke-white stroke-[1px] group-hover:opacity-60 transition-opacity duration-300 delay-100"
           />
           {/* Outer Thread */}
           <path 
             d={`M 0 50 Q ${controlPoint.x} ${controlPoint.y + 30} 1000 50`} 
             className="opacity-10 stroke-brass stroke-[0.5px] group-hover:opacity-40 transition-opacity duration-300 delay-150"
           />
        </svg>

        {/* Floating dust particles on hover */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-brass/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      </div>
    </div>
  );
}
