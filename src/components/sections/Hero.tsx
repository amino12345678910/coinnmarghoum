"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(".word", { y: 0 });
        gsap.set(underlineRef.current, { strokeDashoffset: 0 });
        gsap.set(".fade-in", { opacity: 1, y: 0 });
        return;
      }

      // Initial Load Animation
      const tl = gsap.timeline({ delay: 1.5 }); // Wait for preloader

      tl.to(".word", {
        y: "0%",
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
      })
      .to(underlineRef.current, {
        strokeDashoffset: 0,
        duration: 1,
        ease: "power3.inOut",
      }, "-=0.6")
      .to(".fade-in", {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      }, "-=0.8");

      // Scroll Animation
      gsap.to(videoRef.current, {
        scale: 1.15,
        y: "10%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(overlayRef.current, {
        opacity: 0,
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="accueil" ref={containerRef} className="relative h-screen w-full overflow-hidden bg-charcoal">
      {/* Margoum diamond border framing */}
      <div className="pointer-events-none absolute inset-4 md:inset-6 z-20 border border-brass/20" />
      <div className="pointer-events-none absolute inset-4 md:inset-6 z-20 overflow-hidden">
         {/* Top left corner diamond */}
         <svg className="absolute -top-3 -left-3 w-6 h-6 text-brass/40" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2L22 12L12 22L2 12Z"/></svg>
         {/* Top right corner diamond */}
         <svg className="absolute -top-3 -right-3 w-6 h-6 text-brass/40" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2L22 12L12 22L2 12Z"/></svg>
         {/* Bottom left corner diamond */}
         <svg className="absolute -bottom-3 -left-3 w-6 h-6 text-brass/40" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2L22 12L12 22L2 12Z"/></svg>
         {/* Bottom right corner diamond */}
         <svg className="absolute -bottom-3 -right-3 w-6 h-6 text-brass/40" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2L22 12L12 22L2 12Z"/></svg>
      </div>

      {/* Video Background */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero_interior.png"
          className="h-full w-full object-cover transform-origin-center"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
        {/* Dark gradient + grain overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-deep-blue/60 to-charcoal/40 mix-blend-multiply pointer-events-none" />
      
        <div className="pointer-events-none absolute inset-0 bg-margoum-pattern opacity-10 mix-blend-overlay" />
      </div>

      {/* Main Text Overlay */}
      <div ref={overlayRef} className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 text-center pt-16 pb-24 lg:pt-20 lg:pb-0">
        <div ref={textRef} className="w-full max-w-6xl">
          <span className="fade-in mb-4 md:mb-6 block text-xs md:text-sm font-semibold tracking-[0.3em] text-brass uppercase">
            La Marsa · Tunisie
          </span>
          
          <h1 className="mb-6 md:mb-8 font-heading text-5xl md:text-7xl lg:text-[5.5rem] xl:text-8xl text-cream leading-[0.95] tracking-tight">
            {"Où la saveur tunisienne se".split(" ").map((word, i) => (
              <span key={i} className="inline-block overflow-hidden pb-1 md:pb-2 mr-2 md:mr-4">
                <span className="word inline-block">{word}</span>
              </span>
            ))}
            <span className="inline-block overflow-visible relative pb-1 md:pb-2 pl-1">
              <span className="word inline-block">tisse</span>
              <svg className="absolute -bottom-1 left-0 w-full h-3 md:h-4 overflow-visible" viewBox="0 0 100 12" preserveAspectRatio="none">
                <path
                  ref={underlineRef}
                  d="M0,6 Q12,12 25,6 T50,6 T75,6 T100,6"
                  fill="none"
                  stroke="var(--terracotta)"
                  strokeWidth="4"
                  strokeDasharray="105"
                  strokeDashoffset="0"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <div className="fade-in flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="inline-flex w-full items-center justify-center rounded-full border border-terracotta bg-terracotta px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-cream shadow-2xl shadow-terracotta/25 transition-all hover:-translate-y-0.5 hover:bg-brass hover:text-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal sm:w-auto"
            >
              Réserver une table
            </a>
            <a
              href="#menu"
              className="inline-flex w-full items-center justify-center rounded-full border border-cream/25 bg-cream/10 px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-cream shadow-2xl shadow-charcoal/20 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-brass hover:bg-cream hover:text-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal sm:w-auto"
            >
              Voir le menu
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}
