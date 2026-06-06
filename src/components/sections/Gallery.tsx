"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

type GalleryItem = {
  id: string;
  type: "image" | "video";
  src: string;
  caption: string;
  span?: string;
};

const galleryItems: GalleryItem[] = [
  {
    id: "interior",
    type: "image",
    src: "/images/hero_interior.png",
    caption: "Notre Salle à Manger",
    span: "col-span-1 md:col-span-2 row-span-2",
  },
  {
    id: "couscous",
    type: "image",
    src: "/images/dish_couscous.png",
    caption: "Couscous Royal",
    span: "col-span-1 row-span-1",
  },
  {
    id: "video-ambiance",
    type: "video",
    src: "/video/hero.mp4",
    caption: "L'Ambiance Margoum",
    span: "col-span-1 md:col-span-2 row-span-1",
  },
  {
    id: "tea",
    type: "image",
    src: "https://images.unsplash.com/photo-1576092762791-dd9e2220afa1?auto=format&fit=crop&q=80",
    caption: "Le Thé à la Menthe",
    span: "col-span-1 row-span-2",
  },
  {
    id: "margoum",
    type: "image",
    src: "/images/about_margoum.png",
    caption: "Tissage Traditionnel",
    span: "col-span-1 md:col-span-2 row-span-2",
  },
  {
    id: "brik",
    type: "image",
    src: "/images/dish_brik.png",
    caption: "Brik Croustillante",
    span: "col-span-1 row-span-1",
  },
];

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Keyboard navigation
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
    <section className="bg-charcoal py-24 md:py-32 w-full">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-7xl">
        <Reveal>
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-xs font-semibold tracking-[0.2em] text-brass uppercase mb-4 block">
              IMMERSION
            </span>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-cream leading-tight">
              L&apos;Ambiance Margoum
            </h2>
          </div>
        </Reveal>

        {/* Masonry/Justified Grid */}
        <div className="group grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[250px]">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActiveIndex(index)}
              className={`relative overflow-hidden rounded-sm cursor-pointer transition-all duration-700 
                bg-deep-blue
                ${item.span || "col-span-1 row-span-1"}
                /* Sibling hover effect */
                group-hover:grayscale-[0.6] group-hover:opacity-60
                hover:!grayscale-0 hover:!opacity-100 hover:z-10 hover:shadow-2xl hover:scale-[1.02]
              `}
            >
              {item.type === "image" ? (
                <Image
                  src={item.src}
                  alt={item.caption}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-1000 hover:scale-110"
                  loading="lazy"
                />
              ) : (
                <video
                  src={item.src}
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
                  muted
                  loop
                  playsInline
                  onMouseOver={(e) => e.currentTarget.play()}
                  onMouseOut={(e) => {
                     e.currentTarget.pause();
                     e.currentTarget.currentTime = 0;
                  }}
                />
              )}

              {/* Caption Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a111a]/90 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none flex items-end p-6">
                <span className="font-heading text-brass text-xl md:text-2xl drop-shadow-md translate-y-4 hover:translate-y-0 transition-transform duration-500">
                  {item.caption}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/95 backdrop-blur-md p-4 md:p-12"
            onClick={() => setActiveIndex(null)}
          >
            <button 
              className="absolute top-6 right-6 md:top-10 md:right-10 text-cream hover:text-terracotta transition-colors z-50"
              onClick={(e) => { e.stopPropagation(); setActiveIndex(null); }}
            >
              <X size={36} />
            </button>

            <button 
              className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-cream/50 hover:text-brass transition-colors z-50"
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex((prev) => (prev! - 1 + galleryItems.length) % galleryItems.length);
              }}
            >
              <ChevronLeft size={48} />
            </button>

            <button 
              className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-cream/50 hover:text-brass transition-colors z-50"
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex((prev) => (prev! + 1) % galleryItems.length);
              }}
            >
              <ChevronRight size={48} />
            </button>

            <motion.div
              key={activeIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl aspect-video md:aspect-[16/9] border-4 border-brass/20 rounded-sm shadow-2xl overflow-hidden bg-black flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {galleryItems[activeIndex].type === "image" ? (
                <Image
                  src={galleryItems[activeIndex].src}
                  alt={galleryItems[activeIndex].caption}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              ) : (
                <video
                  src={galleryItems[activeIndex].src}
                  className="w-full max-h-full object-contain"
                  controls
                  autoPlay
                  playsInline
                />
              )}
              
              {/* Margoum Overlay Border for Lightbox */}
              <div className="absolute inset-0 pointer-events-none border-[16px] border-margoum-pattern opacity-10 mix-blend-overlay" />
              
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent">
                <p className="font-heading text-brass text-2xl md:text-3xl text-center">
                  {galleryItems[activeIndex].caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
