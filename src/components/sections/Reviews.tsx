"use client";

import { Star } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const reviews = [
  {
    id: 1,
    author: "Mehdi K.",
    source: "TripAdvisor",
    quote: "Un véritable voyage culinaire. Le meilleur couscous de La Marsa, servi dans un cadre authentique et incroyablement chaleureux.",
    rating: 5,
  },
  {
    id: 2,
    author: "Sarah G.",
    source: "Google",
    quote: "L'attention aux détails est magnifique. Des épices parfaitement dosées, une ambiance apaisante et un service impeccable.",
    rating: 5,
  },
  {
    id: 3,
    author: "Lucas M.",
    source: "TripAdvisor",
    quote: "L'Ojja Merguez m'a instantanément rappelé les saveurs de mon enfance. Une adresse absolument incontournable pour la vraie cuisine tunisienne.",
    rating: 5,
  },
];

// Duplicate items enough times to ensure seamless infinite scroll
const marqueeItems = [...reviews, ...reviews, ...reviews, ...reviews];

export default function Reviews() {
  return (
    <section className="bg-cream py-24 md:py-32 w-full overflow-hidden border-t border-brass/10 relative">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-7xl relative z-20">
        <Reveal>
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-xs font-semibold tracking-[0.2em] text-brass uppercase mb-4 block">
              VOS RETOURS
            </span>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-deep-blue leading-tight mb-8">
              Ce que disent nos clients
            </h2>
            
            {/* Aggregate Trust Bar */}
            <div className="inline-flex flex-col md:flex-row items-center gap-4 bg-white px-6 py-3 rounded-full shadow-md shadow-charcoal/5 border border-charcoal/5">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="fill-brass text-brass" />
                ))}
              </div>
              <span className="text-charcoal/70 text-sm font-medium">4.9/5 — Vu sur Google & TripAdvisor</span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden flex py-8 group">
        {/* Fading Edges */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-48 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-48 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none" />

        <div 
          className="flex gap-6 md:gap-8 px-4 w-max animate-marquee hover:[animation-play-state:paused] transition-all duration-300 ease-out"
        >
          {marqueeItems.map((review, i) => (
            <div 
              key={`${review.id}-${i}`}
              className="w-[320px] md:w-[480px] h-full flex-shrink-0 bg-white p-8 md:p-10 rounded-sm shadow-xl shadow-charcoal/5 flex flex-col justify-between border border-charcoal/5 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 cursor-default"
            >
              <div>
                <div className="flex gap-1 mb-6">
                  {[...Array(review.rating)].map((_, idx) => (
                    <Star key={idx} size={14} className="fill-terracotta text-terracotta" />
                  ))}
                </div>
                <p className="font-heading text-xl md:text-2xl text-deep-blue leading-snug mb-8">
                  &quot;{review.quote}&quot;
                </p>
              </div>

              <div className="flex items-center gap-4 mt-auto">
                {/* Margoum Diamond Divider */}
                <div className="w-8 h-8 flex items-center justify-center bg-cream rounded-full shrink-0">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="var(--brass)">
                    <path d="M12 0 L24 12 L12 24 L0 12 Z" />
                  </svg>
                </div>
                
                <div className="flex flex-col">
                  <span className="font-semibold text-charcoal text-sm">{review.author}</span>
                  <span className="text-[10px] md:text-xs text-charcoal/50 uppercase tracking-wider">{review.source}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Background graphic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-margoum-pattern opacity-5 mix-blend-overlay pointer-events-none rounded-full blur-[100px]" />
    </section>
  );
}
