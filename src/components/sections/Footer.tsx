"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";

const socialLinks = [
  { label: "Instagram", href: siteConfig.socials.instagram },
  { label: "Facebook", href: siteConfig.socials.facebook },
  { label: "TripAdvisor", href: siteConfig.socials.tripadvisor },
].filter((link) => link.href);

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-charcoal text-cream relative w-full overflow-hidden">
      <div className="w-full h-12 bg-margoum-pattern opacity-10 mix-blend-overlay border-t border-b border-white/5" />

      <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-7xl py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="flex flex-col items-start gap-6">
            <h2 className="font-heading text-3xl text-white tracking-tight">Coin<br/>Margoum.</h2>
            <p className="text-sm text-cream/60 font-light leading-relaxed max-w-xs">
              {t("footer.desc")}
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-xs font-semibold tracking-widest text-brass uppercase">{t("footer.navTitle")}</h4>
            <ul className="flex flex-col gap-3 text-sm text-cream/70 font-light">
              <li><Link href="/#menu" className="hover:text-white transition-colors">{t("footer.ourMenu")}</Link></li>
              <li><Link href="/#histoire" className="hover:text-white transition-colors">{t("footer.storyLink")}</Link></li>
              <li><Link href="/#galerie" className="hover:text-white transition-colors">{t("footer.galleryLink")}</Link></li>
              <li><Link href="/#contact" className="hover:text-white transition-colors">{t("footer.reservationLink")}</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-xs font-semibold tracking-widest text-brass uppercase">{t("contact.address")}</h4>
            <p className="text-sm text-cream/70 font-light leading-relaxed">
              {siteConfig.address.street}<br/>
              {siteConfig.address.city}, {siteConfig.address.postalCode}<br/>
              {siteConfig.address.country === "Tunisie" ? (t("hero.location").split(" · ")[1]) : siteConfig.address.country}
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-xs font-semibold tracking-widest text-brass uppercase">{t("contact.hours")}</h4>
            <p className="text-sm text-cream/70 font-light leading-relaxed">
              {t("contact.weekdayHours")}<br/>
              {t("contact.weekendHours")}
            </p>
            {socialLinks.length > 0 && (
              <ul className="flex flex-col gap-3 text-sm text-cream/70 font-light">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="hover:text-terracotta transition-colors" target="_blank" rel="noopener noreferrer">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-cream/40 font-light">
          <p>© {new Date().getFullYear()} Coin Margoum. {t("footer.copyright")}</p>
          <div className="flex gap-4">
            <Link href="/mentions-legales" className="hover:text-cream">{t("footer.mentions")}</Link>
            <Link href="/politique-confidentialite" className="hover:text-cream">{t("footer.privacy")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
