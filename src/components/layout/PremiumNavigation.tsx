"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

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
  const [isScrolled, setIsScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 32);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    if (isOpen) window.setTimeout(() => firstMobileLinkRef.current?.focus(), 120);

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }

      if (event.key === "Tab") {
        const focusable = Array.from(
          document.querySelectorAll<HTMLElement>(
            "[data-mobile-navigation] a, [data-mobile-navigation] button"
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
      <header className="fixed left-0 right-0 top-0 z-[90] px-4 py-3 md:px-8 md:py-4">
        <nav
          className={`mx-auto flex h-14 max-w-7xl items-center justify-between border px-3 transition-all duration-300 md:h-16 md:px-5 ${
            isScrolled
              ? "rounded-full border-brass/15 bg-charcoal/78 text-cream shadow-xl shadow-charcoal/20 backdrop-blur-md"
              : "rounded-full border-cream/10 bg-charcoal/30 text-cream shadow-lg shadow-charcoal/10 backdrop-blur-sm"
          }`}
          aria-label="Navigation principale"
        >
          <a
            href="#accueil"
            onClick={closeMenu}
            className="flex min-w-0 items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-brass"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brass/50 bg-charcoal/50 text-brass">
              <span className="h-3 w-3 rotate-45 border border-current" />
            </span>
            <span className="truncate font-heading text-lg leading-none tracking-wide md:text-xl">
              Coin Margoum
            </span>
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cream/78 transition-colors hover:text-brass focus:outline-none focus-visible:text-brass"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              onClick={closeMenu}
              className="inline-flex items-center justify-center rounded-full border border-brass bg-brass px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-charcoal shadow-md shadow-brass/15 transition-all hover:-translate-y-0.5 hover:bg-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal md:px-5"
            >
              Réserver
            </a>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsOpen((current) => !current)}
              aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 bg-cream/8 text-cream transition-colors hover:border-brass hover:text-brass focus:outline-none focus-visible:ring-2 focus-visible:ring-brass lg:hidden"
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
        </nav>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation"
            data-mobile-navigation
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[85] bg-charcoal/55 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu mobile"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeMenu();
            }}
          >
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="relative ml-auto flex h-full w-[86vw] max-w-sm flex-col overflow-hidden border-l border-brass/20 bg-[#17120f]/96 px-6 pb-8 pt-24 text-cream shadow-2xl"
            >
              <div className="pointer-events-none absolute inset-0 bg-margoum-pattern opacity-[0.06] mix-blend-overlay" />

              <button
                type="button"
                onClick={closeMenu}
                className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-colors hover:border-brass hover:text-brass focus:outline-none focus-visible:ring-2 focus-visible:ring-brass"
                aria-label="Fermer le menu"
              >
                <X size={18} />
              </button>

              <div className="relative z-10">
                <span className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.26em] text-brass">
                  Coin Margoum
                </span>
                <p className="max-w-xs text-sm leading-relaxed text-cream/58">
                  Cuisine tunisienne, ambiance feutrée et réservation simple.
                </p>
              </div>

              <div className="relative z-10 mt-10 flex flex-col">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    ref={index === 0 ? firstMobileLinkRef : undefined}
                    href={link.href}
                    onClick={closeMenu}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + index * 0.045, duration: 0.32 }}
                    className="border-b border-cream/10 py-4 font-heading text-3xl leading-none text-cream transition-colors hover:text-brass focus:outline-none focus-visible:text-brass"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>

              <a
                href="#contact"
                onClick={closeMenu}
                className="relative z-10 mt-auto inline-flex items-center justify-center rounded-full border border-brass bg-brass px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-charcoal transition-all hover:bg-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-brass"
              >
                Réserver une table
              </a>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
