"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Coffee, Flame, Leaf, Sparkles, UtensilsCrossed, Wine, Search, CalendarDays } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import Reveal from "@/components/ui/Reveal";
import { menuCategories, type MenuCategoryId, type MenuItem } from "@/data/menu";
import { useLanguage } from "@/context/LanguageContext";
import FoodDetailModal from "@/components/ui/FoodDetailModal";
import { useCart } from "@/context/CartContext";
import CartDrawer from "@/components/ui/CartDrawer";

const categoryIcons = {
  entrees: Sparkles,
  plats: Flame,
  vegetal: Leaf,
  douceurs: Wine,
  boissons: Coffee,
};

export default function FullMenu() {
  const { locale, t } = useLanguage();
  const { addItem } = useCart();
  const [activeId, setActiveId] = useState<MenuCategoryId | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filtering States
  const [filterVeg, setFilterVeg] = useState(false);
  const [filterSpicy, setFilterSpicy] = useState(false);
  const [filterSignature, setFilterSignature] = useState(false);
  
  // Selected Item for Modal
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Categories list including "Tout voir"
  const categoriesList = useMemo(() => {
    return [
      { id: "all" as const, label: { fr: "Tout voir", en: "All" } },
      ...menuCategories
    ];
  }, []);

  // Filtered Menu Items
  const filteredItems = useMemo(() => {
    let items: MenuItem[] = [];
    
    // Get base list
    if (activeId === "all") {
      items = menuCategories.flatMap((category) => category.items);
    } else {
      const category = menuCategories.find((cat) => cat.id === activeId);
      items = category ? [...category.items] : [];
    }

    // Apply search query
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.name[locale].toLowerCase().includes(query) ||
          item.description[locale].toLowerCase().includes(query)
      );
    }

    // Apply quick filters
    if (filterVeg) {
      items = items.filter((item) => item.vegetarian);
    }
    if (filterSpicy) {
      items = items.filter((item) => item.spicy);
    }
    if (filterSignature) {
      items = items.filter((item) => item.signature);
    }

    return items;
  }, [activeId, locale, searchQuery, filterVeg, filterSpicy, filterSignature]);

  // Average price of showing items
  const averagePrice = useMemo(() => {
    if (filteredItems.length === 0) return 0;
    const total = filteredItems.reduce((acc, item) => acc + item.price, 0);
    return Math.round(total / filteredItems.length);
  }, [filteredItems]);

  return (
    <section id="menu" className="relative overflow-hidden bg-cream py-24 text-charcoal md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-margoum-pattern opacity-[0.035]" />
      <div className="pointer-events-none absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-brass/40 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-brass/40 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-24">
        {/* Header Section */}
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div>
              <span className="mb-5 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-terracotta">
                <span className="h-px w-10 bg-terracotta/60" />
                {t("fullMenu.eyebrow")}
              </span>
              <h2 className="font-heading text-5xl leading-[0.95] text-deep-blue md:text-6xl xl:text-7xl text-balance">
                <span className="block">{t("fullMenu.titlePart1")}</span>
                <span className="block">{t("fullMenu.titlePart2")}</span>
              </h2>
            </div>

            <div className="border-l border-brass/30 pl-6 text-charcoal/70 lg:pl-8">
              <p className="text-base leading-relaxed md:text-lg">
                {t("fullMenu.desc")}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Tab & Filter Control Bar */}
        <div className="mt-14 flex flex-col gap-6 border-y border-charcoal/10 py-6">
          {/* Tab Categories */}
          <div className="menu-carousel flex gap-2 overflow-x-auto pb-2">
            {categoriesList.map((category) => {
              const isActive = category.id === activeId;
              const Icon = category.id !== "all" ? categoryIcons[category.id] : UtensilsCrossed;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveId(category.id)}
                  className={`flex items-center gap-3 rounded-full border px-6 py-3 text-sm font-semibold tracking-wide transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brass shrink-0 ${
                    isActive
                      ? "border-terracotta bg-terracotta text-cream shadow-md"
                      : "border-charcoal/10 bg-white/60 text-charcoal hover:border-brass/60 hover:bg-white"
                  }`}
                >
                  <Icon size={16} />
                  <span>{category.label[locale]}</span>
                </button>
              );
            })}
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={locale === "fr" ? "Rechercher un plat..." : "Search a dish..."}
                className="w-full rounded-full border border-charcoal/10 bg-white/60 py-3 pl-12 pr-4 text-sm text-charcoal placeholder:text-charcoal/40 focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
              />
            </div>

            {/* Diet Filters */}
            <div className="flex flex-wrap gap-2 text-xs">
              <button
                onClick={() => setFilterVeg(!filterVeg)}
                className={`flex items-center gap-1.5 rounded-full border px-4 py-2.5 transition-colors ${
                  filterVeg
                    ? "border-olive bg-olive text-cream"
                    : "border-charcoal/10 bg-white/40 text-charcoal/70 hover:bg-white"
                }`}
              >
                <Leaf size={14} />
                <span>{locale === "fr" ? "Végétarien" : "Vegetarian"}</span>
              </button>

              <button
                onClick={() => setFilterSpicy(!filterSpicy)}
                className={`flex items-center gap-1.5 rounded-full border px-4 py-2.5 transition-colors ${
                  filterSpicy
                    ? "border-terracotta bg-terracotta text-cream"
                    : "border-charcoal/10 bg-white/40 text-charcoal/70 hover:bg-white"
                }`}
              >
                <Flame size={14} />
                <span>{locale === "fr" ? "Relevé" : "Spicy"}</span>
              </button>

              <button
                onClick={() => setFilterSignature(!filterSignature)}
                className={`flex items-center gap-1.5 rounded-full border px-4 py-2.5 transition-colors ${
                  filterSignature
                    ? "border-brass bg-brass text-charcoal font-semibold"
                    : "border-charcoal/10 bg-white/40 text-charcoal/70 hover:bg-white"
                }`}
              >
                <Sparkles size={14} />
                <span>Signatures</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Items Grid */}
        <div className="mt-12">
          {filteredItems.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-charcoal/10 bg-white/30 rounded-lg">
              <p className="text-charcoal/50 text-lg">
                {locale === "fr"
                  ? "Aucun plat ne correspond à vos critères."
                  : "No dishes match your criteria."}
              </p>
            </div>
          ) : (
            <motion.div
              layout
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.name.fr}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    onClick={() => setSelectedItem(item)}
                    className="group flex flex-col justify-between overflow-hidden rounded-xl bg-white border border-charcoal/5 shadow-md shadow-charcoal/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-brass/40 cursor-pointer"
                  >
                    {/* Card Top: Photo */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-charcoal">
                      <Image
                        src={item.image}
                        alt={item.name[locale]}
                        fill
                        sizes="(max-width: 640px) 100vw, 350px"
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent pointer-events-none" />
                      <div className="absolute inset-0 bg-margoum-pattern opacity-0 mix-blend-overlay transition-opacity duration-1000 group-hover:opacity-25" />
                      
                      {/* Diet Floating tags on Image */}
                      <div className="absolute left-4 top-4 flex flex-col gap-1.5 z-10 animate-in fade-in duration-300">
                        {item.signature && (
                          <span className="rounded-sm bg-brass px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-charcoal shadow-sm">
                            {t("fullMenu.maisonBadge")}
                          </span>
                        )}
                        {item.vegetarian && (
                          <span className="inline-flex items-center gap-1 rounded-sm bg-olive px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-cream shadow-sm">
                            <Leaf size={10} />
                            {locale === "fr" ? "Végé" : "Veg"}
                          </span>
                        )}
                        {item.spicy && (
                          <span className="inline-flex items-center gap-1 rounded-sm bg-terracotta px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-cream shadow-sm">
                            <Flame size={10} />
                            {locale === "fr" ? "Relevé" : "Spicy"}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="flex flex-col justify-between flex-1 p-6">
                      <div>
                        {/* Title & Price */}
                        <div className="flex items-baseline justify-between gap-3 mb-3">
                          <h3 className="font-heading text-2xl leading-none text-deep-blue transition-colors duration-500 group-hover:text-brass">
                            {item.name[locale]}
                          </h3>
                          <span className="shrink-0 font-heading text-lg text-terracotta whitespace-nowrap">
                            {item.price} DT
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-xs md:text-sm leading-relaxed text-charcoal/70 line-clamp-3 font-light mb-4">
                          {item.description[locale]}
                        </p>
                      </div>

                      {/* Card Footer tags and Add Button */}
                      <div className="flex items-center justify-between border-t border-charcoal/5 pt-4 mt-auto">
                        <div className="flex flex-wrap gap-1">
                          {item.notes[locale].slice(0, 2).map((note) => (
                            <span
                              key={note}
                              className="bg-cream/40 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-charcoal/55 rounded-sm"
                            >
                              {note}
                            </span>
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            addItem(item);
                          }}
                          className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-brass hover:text-terracotta transition-colors border border-brass/30 hover:border-terracotta/40 px-3 py-1.5 rounded-full bg-cream/10 z-10"
                        >
                          <span>+ {locale === "fr" ? "Ajouter" : "Add"}</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {/* Dynamic selection metadata summary */}
        <Reveal delay={0.2}>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 border border-brass/20 bg-white/40 p-4 rounded-lg text-center md:text-left">
            <div className="p-3 border-b md:border-b-0 md:border-r border-brass/25">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-brass/80">
                {locale === "fr" ? "Plats affichés" : "Items Shown"}
              </span>
              <strong className="mt-1 block font-heading text-2xl text-deep-blue">
                {filteredItems.length} {t("fullMenu.countSuffix")}
              </strong>
            </div>
            <div className="p-3 border-b md:border-b-0 md:border-r border-brass/25">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-brass/80">
                {t("fullMenu.avgPrice")}
              </span>
              <strong className="mt-1 block font-heading text-2xl text-deep-blue">
                {averagePrice} TND
              </strong>
            </div>
            <div className="p-3 flex items-center justify-center md:justify-start">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brass hover:text-terracotta transition-colors"
              >
                {locale === "fr" ? "Réserver votre table" : "Reserve your table"}
                <UtensilsCrossed size={14} />
              </a>
            </div>
          </div>
        </Reveal>

        {/* Tasting Menu CTA */}
        <Reveal delay={0.25}>
          <div className="mt-12 grid gap-6 border border-brass/30 bg-[#17120f] p-8 shadow-xl text-cream md:grid-cols-[1fr_auto] md:items-center relative overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-margoum-pattern opacity-10 mix-blend-overlay pointer-events-none" />
            <div className="relative z-10">
              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brass">
                {t("fullMenu.degustation.eyebrow")}
              </span>
              <h3 className="mt-3 font-heading text-3xl leading-tight text-white md:text-4xl">
                {t("fullMenu.degustation.title")}
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-cream/70 md:text-base font-light">
                {t("fullMenu.degustation.desc")}
              </p>
            </div>
            <a
              href="#contact"
              className="relative z-10 inline-flex items-center justify-center gap-3 rounded-full bg-brass px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-charcoal shadow-lg shadow-brass/20 transition-all hover:-translate-y-0.5 hover:bg-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
            >
              {t("fullMenu.degustation.btn")}
              <CalendarDays size={16} />
            </a>
          </div>
        </Reveal>
      </div>

      {/* Food Detail Modal Component */}
      <FoodDetailModal
        item={selectedItem}
        isOpen={selectedItem !== null}
        onClose={() => setSelectedItem(null)}
      />

      {/* Cart Drawer Component */}
      <CartDrawer />
    </section>
  );
}
