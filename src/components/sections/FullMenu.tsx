"use client";

import { useMemo, useState } from "react";
import { Coffee, Flame, Leaf, Sparkles, UtensilsCrossed, Wine } from "lucide-react";

import Reveal from "@/components/ui/Reveal";
import { menuCategories, type MenuCategoryId } from "@/data/menu";
import { useLanguage } from "@/context/LanguageContext";

const categoryIcons = {
  entrees: Sparkles,
  plats: Flame,
  vegetal: Leaf,
  douceurs: Wine,
  boissons: Coffee,
};

export default function FullMenu() {
  const { locale, t } = useLanguage();
  const [activeId, setActiveId] = useState<MenuCategoryId>("plats");
  const activeCategory = useMemo(
    () => menuCategories.find((category) => category.id === activeId) || menuCategories[0],
    [activeId]
  );
  const averagePrice = useMemo(
    () =>
      Math.round(
        activeCategory.items.reduce((total, item) => total + item.price, 0) /
          activeCategory.items.length
      ),
    [activeCategory]
  );
  const ActiveIcon = categoryIcons[activeCategory.id];

  return (
    <section id="menu" className="relative overflow-hidden bg-cream py-24 text-charcoal md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-margoum-pattern opacity-[0.035]" />
      <div className="pointer-events-none absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-brass/40 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-brass/40 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-24">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div>
              <span className="mb-5 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-terracotta">
                <span className="h-px w-10 bg-terracotta/60" />
                {t("fullMenu.eyebrow")}
              </span>
              <h2 className="font-heading text-5xl leading-[0.95] text-deep-blue md:text-6xl xl:text-7xl">
                <span className="block">{t("fullMenu.titlePart1")}</span>
                <span className="block">{t("fullMenu.titlePart2")}</span>
              </h2>
            </div>

            <div className="border-l border-brass/30 pl-6 text-charcoal/70 lg:pl-8">
              <p className="text-base leading-relaxed md:text-lg">
                {t("fullMenu.desc")}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {[t("fullMenu.tag1"), t("fullMenu.tag2"), t("fullMenu.tag3")].map((label) => (
                  <span key={label} className="border border-charcoal/10 bg-white/50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-charcoal/60">
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-14 border-y border-charcoal/10 py-4">
            <div role="tablist" aria-label={t("fullMenu.categoriesLabel")} className="menu-carousel flex gap-3 overflow-x-auto pb-3">
              {menuCategories.map((category, index) => {
                const Icon = categoryIcons[category.id];
                const isActive = category.id === activeId;

                return (
                  <button
                    key={category.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`menu-panel-${category.id}`}
                    onClick={() => setActiveId(category.id)}
                    className={`group flex min-w-[190px] items-center justify-between gap-4 border px-4 py-4 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-cream ${
                      isActive
                        ? "border-deep-blue bg-deep-blue text-cream"
                        : "border-charcoal/10 bg-white/50 text-charcoal hover:border-brass/60 hover:bg-white"
                    }`}
                  >
                    <span>
                      <span className={`mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] ${isActive ? "text-brass" : "text-terracotta"}`}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-heading text-2xl leading-none">{category.label[locale]}</span>
                    </span>
                    <Icon size={22} className={isActive ? "text-brass" : "text-charcoal/35 group-hover:text-brass"} />
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <Reveal delay={0.15}>
            <aside className="relative overflow-hidden bg-deep-blue px-7 py-8 text-cream md:px-9 md:py-10">
              <div className="absolute inset-0 bg-margoum-pattern opacity-10 mix-blend-overlay" />
              <div className="relative z-10">
                <div className="mb-10 flex items-start justify-between gap-6">
                  <div>
                    <span className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.24em] text-brass">
                      {activeCategory.eyebrow[locale]}
                    </span>
                    <h3 className="font-heading text-5xl leading-none text-cream md:text-6xl">
                      {activeCategory.label[locale]}
                    </h3>
                  </div>
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-brass/50 text-brass">
                    <ActiveIcon size={26} />
                  </div>
                </div>

                <p className="max-w-md text-base leading-relaxed text-cream/70">
                  {activeCategory.description[locale]}
                </p>

                <div className="mt-8 grid grid-cols-2 gap-3">
                  <div className="border border-brass/25 bg-cream/5 p-4">
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-brass/80">
                      {t("fullMenu.avgPrice")}
                    </span>
                    <strong className="mt-2 block font-heading text-3xl text-cream">
                      {averagePrice} TND
                    </strong>
                  </div>
                  <div className="border border-brass/25 bg-cream/5 p-4">
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-brass/80">
                      {t("fullMenu.selection")}
                    </span>
                    <strong className="mt-2 block font-heading text-3xl text-cream">
                      {activeCategory.items.length} {t("fullMenu.countSuffix")}
                    </strong>
                  </div>
                </div>

                <div className="mt-10 grid grid-cols-4 gap-2" aria-hidden="true">
                  {[0, 1, 2, 3].map((item) => (
                    <span key={item} className="aspect-square border border-brass/30 bg-brass/10 [clip-path:polygon(50%_0,100%_50%,50%_100%,0_50%)]" />
                  ))}
                </div>

                <a
                  href="#contact"
                  className="mt-10 inline-flex items-center gap-3 rounded-full border border-brass px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-brass transition-colors hover:bg-brass hover:text-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-deep-blue"
                >
                  {t("fullMenu.btnBookTable")}
                  <UtensilsCrossed size={16} />
                </a>
              </div>
            </aside>
          </Reveal>

          <Reveal delay={0.2}>
            <div
              id={`menu-panel-${activeCategory.id}`}
              role="tabpanel"
              aria-live="polite"
              className="divide-y divide-charcoal/10 border-y border-charcoal/10"
            >
              {activeCategory.items.map((item) => (
                <article key={item.name.fr} className="group grid gap-5 py-7 transition-colors md:grid-cols-[1fr_auto] md:items-start">
                  <div>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <h4 className="font-heading text-3xl leading-none text-deep-blue md:text-4xl">
                          {item.name[locale]}
                        </h4>
                        {item.signature && (
                          <span className="border border-terracotta/30 bg-terracotta/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-terracotta">
                            {t("fullMenu.maisonBadge")}
                          </span>
                        )}
                      </div>
                      <span className="shrink-0 border border-brass/40 bg-brass/10 px-3 py-1.5 font-heading text-2xl leading-none text-deep-blue">
                        {item.price} TND
                      </span>
                    </div>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-charcoal/70 md:text-base">
                      {item.description[locale]}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 md:max-w-[230px] md:justify-end">
                    {item.notes[locale].map((note) => (
                      <span key={note} className="bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-charcoal/55 shadow-sm shadow-charcoal/5">
                        {note}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.25}>
          <div className="mt-14 grid gap-6 border border-brass/30 bg-white/55 p-6 shadow-xl shadow-charcoal/5 md:grid-cols-[1fr_auto] md:items-center md:p-8">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-terracotta">
                {t("fullMenu.degustation.eyebrow")}
              </span>
              <h3 className="mt-3 font-heading text-3xl leading-tight text-deep-blue md:text-4xl">
                {t("fullMenu.degustation.title")}
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-charcoal/70 md:text-base">
                {t("fullMenu.degustation.desc")}
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-deep-blue px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-cream shadow-lg shadow-deep-blue/20 transition-all hover:-translate-y-0.5 hover:bg-terracotta focus:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
            >
              {t("fullMenu.degustation.btn")}
              <UtensilsCrossed size={16} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
