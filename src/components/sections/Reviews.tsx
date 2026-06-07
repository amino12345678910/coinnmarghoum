"use client";

import { Star } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const experienceCards = [
  {
    id: 1,
    title: "Cuisine tunisienne authentique",
    text: "Des recettes généreuses, des épices équilibrées et des plats pensés pour retrouver les saveurs de la maison.",
  },
  {
    id: 2,
    title: "Cadre inspiré du Margoum",
    text: "Un décor chaleureux autour du tissage, des motifs et des couleurs qui racontent l'artisanat tunisien.",
  },
  {
    id: 3,
    title: "Moment simple et soigné",
    text: "Une adresse pour déjeuner, dîner ou réserver une table autour d'un couscous, d'une brik ou d'une ojja.",
  },
];

const marqueeItems = [...experienceCards, ...experienceCards, ...experienceCards, ...experienceCards];

export default function Reviews() {
  return (
    <section className="bg-cream py-24 md:py-32 w-full overflow-hidden border-t border-brass/10 relative">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-7xl relative z-20">
        <Reveal>
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-xs font-semibold tracking-[0.2em] text-brass uppercase mb-4 block">
              EXPÉRIENCE
            </span>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-deep-blue leading-tight mb-8">
              Ce qui fait revenir à table
            </h2>
          </div>
        </Reveal>
      </div>

      <div className="relative w-full overflow-hidden flex py-8 group">
        <div className="absolute inset-y-0 left-0 w-16 md:w-48 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-48 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none" />

        <div className="flex gap-6 md:gap-8 px-4 w-max animate-marquee hover:[animation-play-state:paused] transition-all duration-300 ease-out">
          {marqueeItems.map((item, i) => (
            <div
              key={`${item.id}-${i}`}
              className="w-[320px] md:w-[480px] h-full flex-shrink-0 bg-white p-8 md:p-10 rounded-sm shadow-xl shadow-charcoal/5 flex flex-col justify-between border border-charcoal/5 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 cursor-default"
            >
              <div>
                <div className="flex gap-1 mb-6" aria-hidden="true">
                  {[...Array(3)].map((_, idx) => (
                    <Star key={idx} size={14} className="fill-terracotta text-terracotta" />
                  ))}
                </div>
                <h3 className="font-heading text-xl md:text-2xl text-deep-blue leading-snug mb-4">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base text-charcoal/70 leading-relaxed">
                  {item.text}
                </p>
              </div>

              <div className="flex items-center gap-4 mt-8">
                <div className="w-8 h-8 flex items-center justify-center bg-cream rounded-full shrink-0" aria-hidden="true">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="var(--brass)">
                    <path d="M12 0 L24 12 L12 24 L0 12 Z" />
                  </svg>
                </div>
                <span className="text-[10px] md:text-xs text-charcoal/50 uppercase tracking-wider">
                  Coin Margoum
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-margoum-pattern opacity-5 mix-blend-overlay pointer-events-none rounded-full blur-[100px]" />
    </section>
  );
}
