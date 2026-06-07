"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { label: "Accueil", href: "#accueil" },
  { label: "Notre Histoire", href: "#histoire" },
  { label: "Menu", href: "#menu" },
  { label: "Ambiance", href: "#galerie" },
  { label: "Réservation", href: "#contact" },
  { label: "Contact", href: "#contact" },
];

export default function PremiumNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    if (isOpen) window.setTimeout(() => firstLinkRef.current?.focus(), 180);
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      if (event.key === "Escape") {
        setIsOpen(false);
        closeButtonRef.current?.focus();
      }

      if (event.key === "Tab") {
        const focusable = Array.from(
          document.querySelectorAll<HTMLElement>(
            "[data-navigation-overlay] a, [data-navigation-overlay] button"
          )
        ).filter((element) => !element.hasAttribute("disabled"));

        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-[90] px-4 py-4 md:px-8 md:py-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-cream/10 bg-charcoal/28 px-4 py-3 text-cream shadow-2xl shadow-charcoal/20 backdrop-blur-xl md:px-5">
          <a
            href="#accueil"
            className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-brass"
            onClick={closeMenu}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-brass/50 bg-charcoal/70 text-brass">
              <span className="h-3.5 w-3.5 rotate-45 border border-current" />
            </span>
            <span className="font-heading text-lg leading-none tracking-wide md:text-xl">
              Coin Margoum
            </span>
          </a>

          <div className="flex items-center gap-2 md:gap-3">
            <a
              href="#contact"
              onClick={closeMenu}
              className="inline-flex items-center justify-center rounded-full border border-brass bg-brass px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-charcoal shadow-lg shadow-brass/20 transition-all hover:-translate-y-0.5 hover:bg-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal md:px-5"
            >
              Réserver
            </a>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setIsOpen((current) => !current)}
              aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isOpen}
              aria-controls="premium-navigation"
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-cream/15 bg-cream/10 text-cream transition-all hover:border-brass hover:text-brass focus:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
            >
              <span className="relative h-4 w-5">
                <span
                  className={`absolute left-0 top-1 block h-px w-5 bg-current transition-transform duration-300 ${
                    isOpen ? "translate-y-[5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute bottom-1 left-0 block h-px w-5 bg-current transition-transform duration-300 ${
                    isOpen ? "-translate-y-[5px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="premium-navigation"
            data-navigation-overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[80] flex justify-end bg-charcoal/45 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation principale"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeMenu();
            }}
          >
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-full w-full overflow-hidden border-l border-brass/20 bg-[#14110f]/88 px-6 pb-8 pt-28 text-cream shadow-2xl shadow-charcoal/40 backdrop-blur-2xl md:w-[54vw] md:min-w-[560px] md:px-14 md:pt-32 lg:w-[45vw]"
            >
              <div className="pointer-events-none absolute inset-0 bg-margoum-pattern opacity-[0.08] mix-blend-overlay" />
              <div className="pointer-events-none absolute -right-20 top-20 h-64 w-64 rounded-full border border-brass/20" />
              <div className="pointer-events-none absolute bottom-10 left-8 h-28 w-28 rotate-45 border border-terracotta/25" />

              <div className="relative z-10 flex h-full flex-col">
                <div className="mb-10">
                  <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.28em] text-brass">
                    Navigation
                  </span>
                  <p className="max-w-md text-sm leading-relaxed text-cream/60 md:text-base">
                    Avancez calmement dans la maison: histoire, carte, ambiance et réservation.
                  </p>
                </div>

                <div className="flex flex-1 flex-col justify-center gap-3">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.href + link.label}
                      ref={index === 0 ? firstLinkRef : undefined}
                      href={link.href}
                      onClick={closeMenu}
                      initial={{ opacity: 0, x: 28 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.12 + index * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      className="group flex items-center justify-between border-b border-cream/10 py-4 font-heading text-4xl leading-none text-cream transition-colors hover:text-brass focus:outline-none focus-visible:text-brass md:text-6xl"
                    >
                      <span>{link.label}</span>
                      <span className="h-2 w-2 rotate-45 border border-brass/50 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" />
                    </motion.a>
                  ))}
                </div>

                <motion.a
                  href="#contact"
                  onClick={closeMenu}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="mt-10 inline-flex w-full items-center justify-center rounded-full border border-brass bg-brass px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal shadow-2xl shadow-brass/20 transition-all hover:-translate-y-0.5 hover:bg-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal md:w-auto"
                >
                  Réserver une table
                </motion.a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
