"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Reveal from "@/components/ui/Reveal";
import { signatureDishes, Dish } from "@/data/dishes";

function DishCard({ dish }: { dish: Dish }) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-charcoal shadow-2xl transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(200,90,70,0.15)]">
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <Image
          src={dish.image}
          alt={dish.name}
          fill
          className="object-cover brightness-95 contrast-[1.05] saturate-[1.1] sepia-[0.15] transition-transform duration-1000 group-hover:scale-110"
          sizes="(max-width: 640px) 82vw, 420px"
        />

        <div className="absolute inset-0 z-10 bg-margoum-pattern opacity-0 mix-blend-overlay transition-opacity duration-1000 group-hover:opacity-30" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0a111a]/90 via-[#0a111a]/40 to-transparent transition-opacity duration-500 group-hover:opacity-90" />

        <div className="absolute bottom-0 left-0 z-20 flex w-full flex-col items-start p-6 text-white md:p-8">
          <div className="mb-4 flex flex-wrap gap-2">
            {dish.tags.map((tag) => (
              <span key={tag} className="rounded-sm border border-white/20 bg-white/10 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-widest text-cream backdrop-blur-md md:text-[10px]">
                {tag}
              </span>
            ))}
          </div>
          <h3 className="mb-3 font-heading text-3xl drop-shadow-md transition-colors duration-500 group-hover:text-brass md:text-4xl">
            {dish.name}
          </h3>
          <div className="overflow-hidden">
            <p className="translate-y-8 text-sm font-light leading-relaxed text-cream/90 opacity-0 transition-all duration-700 ease-out group-hover:translate-y-0 group-hover:opacity-100 md:text-base">
              {dish.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignatureMenu() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    setCanScrollLeft(track.scrollLeft > 8);
    setCanScrollRight(track.scrollLeft < maxScroll - 8);
  }, []);

  const scrollMenu = (direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;

    const firstCard = track.querySelector<HTMLElement>("[data-dish-card]");
    const cardWidth = firstCard?.offsetWidth || 420;
    const styles = window.getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "40") || 40;

    track.scrollBy({
      left: direction === "right" ? cardWidth + gap : -(cardWidth + gap),
      behavior: "smooth",
    });

    window.setTimeout(updateScrollState, 350);
  };

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [updateScrollState]);

  return (
    <section id="signature" className="relative w-full overflow-hidden bg-deep-blue text-cream">
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-start justify-between gap-10 px-6 py-24 md:px-12 md:py-32 lg:flex-row lg:items-end lg:px-24">
        <Reveal>
          <div>
            <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
              LE CHOIX DU CHEF
            </span>
            <h2 className="font-heading text-5xl leading-none tracking-tight text-cream md:text-6xl lg:text-7xl">
              Nos Plats Signature
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollMenu("left")}
              disabled={!canScrollLeft}
              aria-label="Plat précédent"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-brass/40 text-brass transition-colors hover:border-brass hover:bg-brass hover:text-charcoal disabled:pointer-events-none disabled:opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-deep-blue"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={() => scrollMenu("right")}
              disabled={!canScrollRight}
              aria-label="Plat suivant"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-brass/40 text-brass transition-colors hover:border-brass hover:bg-brass hover:text-charcoal disabled:pointer-events-none disabled:opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-deep-blue"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </Reveal>
      </div>

      <div className="relative w-full pb-24 md:pb-32">
        <div
          ref={trackRef}
          onScroll={updateScrollState}
          className="no-visible-scrollbar flex snap-x snap-mandatory gap-8 overflow-x-auto pb-8 pl-8 pr-[22vw] md:pl-16 md:pr-[24vw] lg:gap-10 lg:pl-[max(8rem,calc((100vw-80rem)/2+8rem))] lg:pr-[18vw] xl:pl-[max(10rem,calc((100vw-80rem)/2+10rem))]"
        >
          {signatureDishes.map((dish) => (
            <div
              key={dish.id}
              data-dish-card
              className="w-[78vw] max-w-md flex-none snap-start transition-transform duration-500 sm:w-[420px] lg:w-[430px]"
            >
              <DishCard dish={dish} />
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-deep-blue via-deep-blue/70 to-transparent backdrop-blur-[1px] md:w-36 lg:w-44" />
      </div>
    </section>
  );
}
