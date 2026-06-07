"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const diamondRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (prefersReducedMotion) {
      if (containerRef.current) containerRef.current.style.display = "none";
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Ensure elements are visible before animation begins
      gsap.set(containerRef.current, { autoAlpha: 1 });

      const counter = { value: 0 };
      
      // Animate percentage text and bottom line loader
      tl.to(counter, {
        value: 100,
        duration: 1,
        ease: "power3.inOut",
        onUpdate: () => {
          if (percentRef.current) {
            percentRef.current.innerText = Math.round(counter.value).toString().padStart(2, '0') + "%";
          }
        }
      });

      tl.to(lineRef.current, {
        width: "100%",
        duration: 1,
        ease: "power3.inOut",
      }, "<");

      // Animate diamond stroke drawing itself
      if (pathRef.current) {
        const length = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });
        
        tl.to(pathRef.current, {
          strokeDashoffset: 0,
          duration: 1,
          ease: "power3.inOut",
        }, "<");
        
        // Fill diamond with gold at the end
        tl.to(pathRef.current, {
          fill: "#c8a05a", // brass
          duration: 0.4,
          ease: "power2.inOut"
        });
      }

      // Fade out inner elements gracefully
      tl.to([diamondRef.current, textRef.current, percentRef.current, lineRef.current], {
        opacity: 0,
        y: -20,
        duration: 0.35,
        stagger: 0.1,
        ease: "power2.inOut",
      }, "+=0.2");

      // Slide out the entire container upwards, revealing the hero
      tl.to(containerRef.current, {
        yPercent: -100,
        duration: 0.6,
        ease: "power4.inOut",
      }, "-=0.2");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#0a0a0a] text-cream overflow-hidden invisible"
    >
      {/* Subtle Textures */}
      <div className="absolute inset-0 bg-margoum-pattern opacity-5 mix-blend-overlay pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center h-full justify-center w-full">
        {/* Diamond SVG */}
        <svg 
          ref={diamondRef} 
          width="48" 
          height="48" 
          viewBox="0 0 48 48" 
          className="mb-10 opacity-80"
        >
          <path 
            ref={pathRef}
            d="M24 2 L46 24 L24 46 L2 24 Z" 
            fill="transparent" 
            stroke="#c8a05a" 
            strokeWidth="1.5" 
          />
        </svg>

        {/* Branding Typography */}
        <div ref={textRef} className="flex flex-col items-center text-center">
          <h1 className="font-heading text-4xl md:text-6xl text-cream uppercase tracking-[0.15em] drop-shadow-2xl mb-4">
            Coin Margoum
          </h1>
          <p className="text-[9px] md:text-[11px] font-sans tracking-[0.5em] text-brass uppercase font-semibold">
            La Marsa · Tunisie
          </p>
        </div>

        {/* Loader Percentage */}
        <div className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2">
          <span 
            ref={percentRef} 
            className="inline-block font-sans text-xs md:text-sm tracking-[0.2em] text-cream/40 font-light"
          >
            00%
          </span>
        </div>

        {/* Minimal Progress Line at Absolute Bottom */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5">
          <div ref={lineRef} className="h-full w-0 bg-terracotta" />
        </div>
      </div>
    </div>
  );
}
