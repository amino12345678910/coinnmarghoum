"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Flame, Leaf, CalendarDays } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { MenuItem } from "@/data/menu";
import { useCart } from "@/context/CartContext";

interface FoodDetailModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function FoodDetailModal({ item, isOpen, onClose }: FoodDetailModalProps) {
  const { locale, t } = useLanguage();
  const { addItem } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-charcoal/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-4xl overflow-hidden rounded-xl border border-brass/20 bg-cream text-charcoal shadow-2xl z-10 grid grid-cols-1 md:grid-cols-2 md:max-h-[85vh]"
          >
            {/* Image Section */}
            <div className="relative aspect-video w-full md:aspect-auto md:h-full min-h-[250px] overflow-hidden bg-charcoal">
              <Image
                src={item.image}
                alt={item.name[locale]}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-1000 hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-margoum-pattern opacity-10 mix-blend-overlay pointer-events-none" />
            </div>

            {/* Content Section */}
            <div className="flex flex-col justify-between p-6 md:p-10 md:overflow-y-auto">
              <div>
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 md:right-6 md:top-6 flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/10 bg-white/60 text-charcoal hover:bg-white hover:text-terracotta transition-colors z-20"
                  aria-label={t("gallery.closeAria")}
                >
                  <X size={20} />
                </button>

                {/* Tags / Badges Header */}
                <div className="mb-4 flex flex-wrap gap-2 mt-4 md:mt-0">
                  {item.signature && (
                    <span className="rounded-sm border border-terracotta/30 bg-terracotta/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-terracotta">
                      {t("fullMenu.maisonBadge")}
                    </span>
                  )}
                  {item.vegetarian && (
                    <span className="inline-flex items-center gap-1.5 rounded-sm border border-olive/30 bg-olive/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-olive">
                      <Leaf size={12} />
                      {locale === "fr" ? "Végétarien" : "Vegetarian"}
                    </span>
                  )}
                  {item.spicy && (
                    <span className="inline-flex items-center gap-1.5 rounded-sm border border-terracotta/30 bg-terracotta/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-terracotta">
                      <Flame size={12} />
                      {locale === "fr" ? "Relevé" : "Spicy"}
                    </span>
                  )}
                </div>

                {/* Name & Price */}
                <div className="flex items-baseline justify-between gap-4 border-b border-charcoal/10 pb-4 mb-6">
                  <h3 className="font-heading text-3xl leading-tight text-deep-blue md:text-4xl">
                    {item.name[locale]}
                  </h3>
                  <span className="shrink-0 font-heading text-2xl text-terracotta whitespace-nowrap">
                    {item.price} TND
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm md:text-base leading-relaxed text-charcoal/80 mb-6 font-light">
                  {item.description[locale]}
                </p>

                {/* Notes List */}
                <div className="mb-8">
                  <h4 className="text-[10px] font-semibold uppercase tracking-widest text-charcoal/45 mb-3">
                    {locale === "fr" ? "Notes du Chef" : "Chef's Notes"}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {item.notes[locale].map((note) => (
                      <span key={note} className="bg-white/80 border border-charcoal/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-charcoal/60 rounded-sm shadow-sm">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions Grid: Add to cart & Book table */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => {
                    addItem(item);
                    onClose();
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border-2 border-brass bg-cream px-5 py-4 text-xs font-bold uppercase tracking-[0.15em] text-charcoal shadow-md transition-all hover:-translate-y-0.5 hover:bg-brass hover:text-charcoal focus:outline-none"
                >
                  {t("cart.addBtn")}
                </button>
                <a
                  href="#contact"
                  onClick={onClose}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-deep-blue px-5 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-cream shadow-lg shadow-deep-blue/20 transition-all hover:-translate-y-0.5 hover:bg-terracotta focus:outline-none"
                >
                  {t("fullMenu.btnBookTable")}
                  <CalendarDays size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
