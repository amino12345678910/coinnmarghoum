"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import clsx from "clsx";
import Reveal from "@/components/ui/Reveal";
import { signatureDishes, Dish } from "@/data/dishes";

function DishCard({ dish }: { dish: Dish }) {
  return (
    <div className="group relative rounded-xl overflow-hidden transition-all duration-700 hover:-translate-y-3 bg-charcoal shadow-2xl hover:shadow-[0_20px_40px_rgba(200,90,70,0.15)] cursor-pointer">
      <div className="relative aspect-[3/4] overflow-hidden w-full">
        {/* Soft film grade filter using Tailwind utilities */}
        <Image 
          src={dish.image} 
          alt={dish.name} 
          fill 
          className="object-cover transition-transform duration-1000 group-hover:scale-110 saturate-[1.1] contrast-[1.05] brightness-95 sepia-[0.15]"
          sizes="(max-width: 1024px) 100vw, 400px"
        />
        
        {/* Margoum diamond pattern wash on hover */}
        <div className="absolute inset-0 bg-margoum-pattern opacity-0 group-hover:opacity-30 transition-opacity duration-1000 mix-blend-overlay z-10 pointer-events-none" />
        
        {/* Dark gradient for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a111a]/90 via-[#0a111a]/40 to-transparent z-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-90" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-20 flex flex-col items-start text-white">
          <div className="flex flex-wrap gap-2 mb-4">
            {dish.tags.map(tag => (
              <span key={tag} className="text-[9px] md:text-[10px] font-semibold uppercase tracking-widest bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-sm text-cream border border-white/20">
                {tag}
              </span>
            ))}
          </div>
          <h3 className="font-heading text-3xl md:text-4xl mb-3 group-hover:text-brass transition-colors duration-500 drop-shadow-md">
            {dish.name}
          </h3>
          <div className="overflow-hidden">
            <p className="text-sm md:text-base text-cream/90 font-light leading-relaxed opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out">
              {dish.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignatureMenu() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Use matchMedia to apply horizontal scroll only on desktop
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      if (!containerRef.current || !trackRef.current) return;
      
      const trackWidth = trackRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      
      // Amount to scroll horizontally
      const xOffset = trackWidth - viewportWidth + 100; 

      gsap.to(trackRef.current, {
        x: -xOffset,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => "+=" + xOffset, // The pinning distance equals the scroll distance
          invalidateOnRefresh: true,
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-deep-blue text-cream relative w-full overflow-hidden">
      <div className="py-24 md:py-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12 z-10 relative">
        <Reveal>
          <div>
            <span className="text-xs font-semibold tracking-[0.2em] text-terracotta uppercase mb-4 block">
              LE CHOIX DU CHEF
            </span>
            <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl text-cream leading-none tracking-tight">
              Nos Plats Signature
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <a href="/menu" className="group relative inline-flex items-center text-brass font-semibold uppercase tracking-widest text-xs md:text-sm hover:text-white transition-colors duration-300 pb-2">
            Voir le menu complet
            <svg className="absolute bottom-0 left-0 w-full h-1 overflow-visible" viewBox="0 0 100 12" preserveAspectRatio="none">
              <path
                d="M0,6 Q12,12 25,6 T50,6 T75,6 T100,6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="100"
                className="[stroke-dashoffset:100] group-hover:[stroke-dashoffset:0] transition-all duration-500 ease-out"
                strokeLinecap="round"
              />
            </svg>
          </a>
        </Reveal>
      </div>

      <div className="w-full overflow-hidden pb-32">
        <div 
          ref={trackRef} 
          className="flex flex-col lg:flex-row gap-8 lg:gap-16 px-6 md:px-12 lg:px-24 w-full lg:w-max items-center lg:items-start"
        >
          {signatureDishes.map((dish) => (
             <div 
               key={dish.id} 
               className={clsx(
                 "w-full max-w-md lg:w-[420px] flex-shrink-0 transition-transform duration-500",
                 {
                   "lg:-mt-12": dish.alignment === "top",
                   "lg:mt-16": dish.alignment === "center",
                   "lg:mt-40": dish.alignment === "bottom",
                 }
               )}
             >
               <DishCard dish={dish} />
             </div>
          ))}
          {/* Spacer for horizontal scroll end */}
          <div className="hidden lg:block w-[10vw] flex-shrink-0" />
        </div>
      </div>
    </section>
  );
}
