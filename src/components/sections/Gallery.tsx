"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/context/LanguageContext";

type GalleryItem = {
  id: string;
  src: string;
  caption: { fr: string; en: string };
  span?: string;
};

const galleryItems: GalleryItem[] = [
  {
    id: "interior",
    src: "/images/hero_interior.png",
    caption: { fr: "Notre salle à manger", en: "Our dining room" },
    span: "col-span-1 md:col-span-2 row-span-2",
  },
  {
    id: "couscous",
    src: "/images/dish_couscous.png",
    caption: { fr: "Couscous Royal", en: "Royal Couscous" },
  },
  {
    id: "riz-djerbien",
    src: "/images/dish_riz_djerbien.png",
    caption: { fr: "Riz Djerbien", en: "Djerbian Rice" },
    span: "col-span-1 md:col-span-2 row-span-1",
  },
  {
    id: "ojja",
    src: "/images/dish_ojja.png",
    caption: { fr: "Ojja Merguez", en: "Merguez Ojja" },
    span: "col-span-1 row-span-2",
  },
  {
    id: "margoum",
    src: "/images/about_margoum.png",
    caption: { fr: "Tissage traditionnel", en: "Traditional weaving" },
    span: "col-span-1 md:col-span-2 row-span-2",
  },
  {
    id: "brik",
    src: "/images/dish_brik.png",
    caption: { fr: "Brik croustillante", en: "Crispy brik" },
  },
];

export default function Gallery() {
  const { locale, t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight") setActiveIndex((prev) => (prev! + 1) % galleryItems.length);
      if (e.key === "ArrowLeft") setActiveIndex((prev) => (prev! - 1 + galleryItems.length) % galleryItems.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  return (
    <section id="galerie" className="w-full bg-charcoal py-24 md:py-32">
      <div className="container mx-auto max-w-7xl px-6 md:px-12 lg:px-24">
        <Reveal>
          <div className="mb-16 flex flex-col items-center text-center">
            <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-brass">
              {t("gallery.eyebrow")}
            </span>
            <h2 className="font-heading text-4xl leading-tight text-cream md:text-5xl lg:text-6xl">
              {t("gallery.title")}
            </h2>
          </div>
        </Reveal>

        <div className="group grid auto-rows-[220px] grid-cols-1 gap-4 md:auto-rows-[250px] md:grid-cols-3 lg:grid-cols-4">
          {galleryItems.map((item, index) => (
            <button
              type="button"
              key={item.id}
              onClick={() => setActiveIndex(index)}
              aria-label={`Ouvrir ${item.caption[locale]}`}
              className={`relative block h-full w-full cursor-pointer overflow-hidden rounded-sm bg-deep-blue text-left transition-all duration-700 group-hover:grayscale-[0.6] group-hover:opacity-60 hover:z-10 hover:!scale-[1.02] hover:!grayscale-0 hover:!opacity-100 hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal ${item.span || "col-span-1 row-span-1"}`}
            >
              <Image
                src={item.src}
                alt={item.caption[locale]}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-1000 hover:scale-110"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-[#0a111a]/90 via-transparent to-transparent p-6 opacity-0 transition-opacity duration-500 hover:opacity-100">
                <span className="font-heading text-xl text-brass drop-shadow-md md:text-2xl">
                  {item.caption[locale]}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/95 p-4 backdrop-blur-md md:p-12"
            onClick={() => setActiveIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Galerie Coin Margoum"
          >
            <button
              className="absolute right-6 top-6 z-50 text-cream transition-colors hover:text-terracotta md:right-10 md:top-10"
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(null);
              }}
              aria-label={t("gallery.closeAria")}
            >
              <X size={36} />
            </button>

            <button
              className="absolute left-2 top-1/2 z-50 -translate-y-1/2 text-cream/50 transition-colors hover:text-brass md:left-8"
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex((prev) => (prev! - 1 + galleryItems.length) % galleryItems.length);
              }}
              aria-label={t("gallery.prevAria")}
            >
              <ChevronLeft size={48} />
            </button>

            <button
              className="absolute right-2 top-1/2 z-50 -translate-y-1/2 text-cream/50 transition-colors hover:text-brass md:right-8"
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex((prev) => (prev! + 1) % galleryItems.length);
              }}
              aria-label={t("gallery.nextAria")}
            >
              <ChevronRight size={48} />
            </button>

            <motion.div
              key={activeIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative flex aspect-video w-full max-w-6xl items-center justify-center overflow-hidden rounded-sm border-4 border-brass/20 bg-black shadow-2xl md:aspect-[16/9]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryItems[activeIndex].src}
                alt={galleryItems[activeIndex].caption[locale]}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
              <div className="absolute inset-0 pointer-events-none border-[16px] border-margoum-pattern opacity-10 mix-blend-overlay" />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-6">
                <p className="text-center font-heading text-2xl text-brass md:text-3xl">
                  {galleryItems[activeIndex].caption[locale]}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
