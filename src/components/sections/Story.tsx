"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

import aboutMargoumImg from "../../../public/images/about_margoum.png";
import dishCouscousImg from "../../../public/images/dish_couscous.png";

export default function Story() {
  const containerRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const dishImageRef = useRef<HTMLDivElement>(null);
  const threadRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // Thread Animation
      if (threadRef.current) {
        const length = threadRef.current.getTotalLength();
        gsap.set(threadRef.current, { strokeDasharray: length, strokeDashoffset: length });
        
        gsap.to(threadRef.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
          },
        });
      }

      if (!prefersReducedMotion && imageContainerRef.current && dishImageRef.current) {
        // Image crossfade / clip reveal
        gsap.to(dishImageRef.current, {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: {
            trigger: imageContainerRef.current,
            start: "top 60%",
            end: "bottom 40%",
            scrub: true,
          },
        });
      } else if (dishImageRef.current) {
         // Fallback for reduced motion
         gsap.set(dishImageRef.current, { clipPath: "inset(0% 0% 0% 0%)" });
      }
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-cream py-24 md:py-32 overflow-hidden">
      {/* Horizontal Thread Line */}
      <div className="absolute top-16 left-0 w-full pointer-events-none opacity-30 px-4 md:px-0">
        <svg className="w-full h-3 md:h-4" preserveAspectRatio="none">
          <path
            ref={threadRef}
            d="M0,6 Q50,0 100,6 T200,6 T300,6 T400,6 T500,6 T600,6 T700,6 T800,6 T900,6 T1000,6 T1100,6 T1200,6 T1300,6 T1400,6 T1500,6 T1600,6 T1700,6 T1800,6 T1900,6 T2000,6"
            fill="none"
            stroke="var(--terracotta)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Left Column: Image Crossfade */}
          <div className="relative aspect-[4/5] md:aspect-[3/4] w-full max-w-md mx-auto lg:mx-0 overflow-hidden rounded-sm shadow-xl" ref={imageContainerRef}>
            <div className="absolute inset-0 z-0">
              <Image 
                src={aboutMargoumImg} 
                alt="Détail de tissage Margoum" 
                fill 
                className="object-cover saturate-50 contrast-125"
                sizes="(max-width: 1024px) 100vw, 50vw"
                placeholder="blur"
              />
            </div>
            {/* The second image starts fully clipped from the top */}
            <div 
              ref={dishImageRef} 
              className="absolute inset-0 z-10"
              style={{ clipPath: "inset(100% 0% 0% 0%)" }}
            >
              <Image 
                src={dishCouscousImg} 
                alt="Couscous Royal Coin Margoum" 
                fill 
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                placeholder="blur"
              />
            </div>
            {/* Subtle Margoum pattern overlay */}
            <div className="absolute inset-0 z-20 bg-margoum-pattern opacity-20 pointer-events-none mix-blend-overlay" />
          </div>

          {/* Right Column: Narrative */}
          <div className="flex flex-col justify-center max-w-xl mx-auto lg:mx-0">
            <Reveal>
              <div className="flex flex-col items-start text-left mb-8">
                <span className="text-xs font-semibold tracking-[0.2em] text-brass uppercase mb-4">
                  NOTRE IDENTITÉ
                </span>
                <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-deep-blue leading-tight text-balance">
                  Pourquoi le Margoum ?
                </h2>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-base md:text-lg text-charcoal/80 mb-6 leading-relaxed">
                Reconnu comme un restaurant tunisien incontournable à La Marsa, Coin Margoum prépare chaque plat avec le même soin qu&apos;un tapis tissé à la main. L&apos;artisanat de la cuisine tunisienne authentique se retrouve dans chaque détail.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-base md:text-lg text-charcoal/80 mb-10 leading-relaxed">
                Des ingrédients soigneusement choisis et des épices équilibrées s&apos;entrelacent pour créer une expérience culinaire où chaque saveur raconte une histoire, tout comme les motifs géométriques de notre héritage tunisien.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <blockquote className="border-l-2 border-terracotta pl-6 mb-10 py-1">
                <p className="font-heading text-2xl md:text-3xl text-terracotta italic leading-snug tracking-tight">
                  &quot;Chaque plat est une histoire tissée.&quot;
                </p>
              </blockquote>
            </Reveal>

            <Reveal delay={0.4}>
              <a href="#menu" className="group relative inline-flex items-center text-brass font-semibold uppercase tracking-widest text-xs md:text-sm hover:text-terracotta transition-colors duration-300">
                En savoir plus
                <svg className="absolute -bottom-2 left-0 w-full h-2 overflow-visible" viewBox="0 0 100 12" preserveAspectRatio="none">
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
        </div>
      </div>
    </section>
  );
}
