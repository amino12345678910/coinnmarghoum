"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (prefersReducedMotion) {
      if (containerRef.current) containerRef.current.style.display = "none";
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(containerRef.current, {
        yPercent: -100,
        duration: 1.5,
        ease: "power4.inOut",
        delay: 1, // Add time for fake loading or logo reveal
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-cream"
    >
      <div className="font-heading text-3xl text-terracotta">Coin Margoum</div>
    </div>
  );
}
