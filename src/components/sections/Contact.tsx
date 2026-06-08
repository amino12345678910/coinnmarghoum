"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import { getPhoneHref, getSocialLinks, getWhatsAppUrl } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const mapSrc =
  "https://www.google.com/maps?q=12%20Rue%20Sidi%20Abdelaziz%2C%20La%20Marsa%202070%2C%20Tunisie&output=embed";

function encodeFormData(formData: FormData) {
  return new URLSearchParams(
    Array.from(formData.entries()).map(([key, value]) => [key, String(value)])
  ).toString();
}

export default function Contact() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const phoneHref = getPhoneHref();
  const whatsappUrl = getWhatsAppUrl();
  const socialLinks = getSocialLinks();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const form = e.currentTarget;
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeFormData(new FormData(form)),
      });

      if (!response.ok) {
        throw new Error("Reservation form submission failed");
      }

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="bg-deep-blue text-cream py-24 md:py-32 w-full relative border-t border-brass/10">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-7xl relative z-10">
        <Reveal>
          <div className="text-center md:text-left mb-16">
            <span className="text-xs font-semibold tracking-[0.2em] text-brass uppercase mb-4 block">
              {t("contact.eyebrow")}
            </span>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-cream leading-tight">
              {t("contact.title")}
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="flex flex-col gap-12">
            <Reveal delay={0.1}>
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="font-heading text-2xl text-brass mb-3">{t("contact.address")}</h3>
                  <p className="text-cream/80 font-light text-lg">12 Rue Sidi Abdelaziz<br/>La Marsa, 2070, Tunisie</p>
                </div>

                <div>
                  <h3 className="font-heading text-2xl text-brass mb-3">{t("contact.hours")}</h3>
                  <ul className="text-cream/80 font-light text-lg flex flex-col gap-2 relative pl-4 border-l border-brass/30">
                    <li className="relative before:content-[''] before:absolute before:-left-[21px] before:top-2 before:w-2 before:h-2 before:bg-brass before:rotate-45">
                      {t("contact.weekdayHours")}
                    </li>
                    <li className="relative before:content-[''] before:absolute before:-left-[21px] before:top-2 before:w-2 before:h-2 before:bg-brass before:rotate-45">
                      {t("contact.weekendHours")}
                    </li>
                  </ul>
                </div>

                {(whatsappUrl || phoneHref) && (
                  <div className="flex flex-wrap gap-4 mt-4">
                    {whatsappUrl && (
                      <a href={whatsappUrl} className="px-6 py-3 border border-brass text-brass hover:bg-brass hover:text-charcoal transition-colors uppercase tracking-widest text-xs font-semibold">
                        WhatsApp
                      </a>
                    )}
                    {phoneHref && (
                      <a href={phoneHref} className="px-6 py-3 border border-cream text-cream hover:bg-white hover:text-charcoal transition-colors uppercase tracking-widest text-xs font-semibold">
                        {t("contact.btnCall")}
                      </a>
                    )}
                  </div>
                )}

                <div className="mt-2 flex flex-wrap">
                  {socialLinks.instagram && (
                    <a
                      href={socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center justify-center gap-3 rounded-full border border-cream/20 bg-cream/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-cream transition-all hover:-translate-y-0.5 hover:border-brass hover:text-brass"
                    >
                      <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-[10px] text-white shadow-sm">
                        <span className="h-3.5 w-3.5 rounded-[4px] border-2 border-white" />
                        <span className="absolute right-2 top-2 h-1 w-1 rounded-full bg-white" />
                      </span>
                      Instagram
                    </a>
                  )}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="bg-charcoal p-8 md:p-10 border border-white/5 rounded-sm relative overflow-hidden">
                <h3 className="font-heading text-3xl text-white mb-8">{t("contact.form.title")}</h3>

                {status === "success" ? (
                  <div className="h-[300px] flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-700" aria-live="polite">
                    <div className="w-16 h-16 mb-6 flex items-center justify-center border-2 border-brass rounded-full rotate-45">
                      <div className="w-8 h-8 bg-brass -rotate-45" />
                    </div>
                    <h4 className="font-heading text-2xl text-brass mb-2">{t("contact.form.successTitle")}</h4>
                    <p className="text-cream/70 font-light">
                      {t("contact.form.successDesc")}
                    </p>
                  </div>
                ) : (
                  <form
                    name="reservation"
                    method="POST"
                    data-netlify="true"
                    netlify-honeypot="bot-field"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6 relative z-10"
                  >
                    <input type="hidden" name="form-name" value="reservation" />
                    <p className="hidden">
                      <label>
                        {t("contact.form.botField")}
                        <input name="bot-field" tabIndex={-1} autoComplete="off" />
                      </label>
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="sr-only" htmlFor="reservation-name">{t("contact.form.placeholderName")}</label>
                        <input id="reservation-name" name="name" required type="text" autoComplete="name" placeholder={t("contact.form.placeholderName")} className="w-full bg-transparent border-b border-white/20 pb-2 text-white placeholder:text-white/40 focus:outline-none focus:border-brass transition-colors" />
                      </div>
                      <div>
                        <label className="sr-only" htmlFor="reservation-phone">{t("contact.form.placeholderPhone")}</label>
                        <input id="reservation-phone" name="phone" required type="tel" autoComplete="tel" placeholder={t("contact.form.placeholderPhone")} className="w-full bg-transparent border-b border-white/20 pb-2 text-white placeholder:text-white/40 focus:outline-none focus:border-brass transition-colors" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="sr-only" htmlFor="reservation-date">{t("contact.form.placeholderDate")}</label>
                        <input id="reservation-date" name="date" required type="date" className="w-full bg-transparent border-b border-white/20 pb-2 text-white/80 focus:outline-none focus:border-brass transition-colors [color-scheme:dark]" />
                      </div>
                      <div>
                        <label className="sr-only" htmlFor="reservation-time">{t("contact.form.placeholderTime")}</label>
                        <input id="reservation-time" name="time" required type="time" className="w-full bg-transparent border-b border-white/20 pb-2 text-white/80 focus:outline-none focus:border-brass transition-colors [color-scheme:dark]" />
                      </div>
                      <div>
                        <label className="sr-only" htmlFor="reservation-guests">{t("contact.form.placeholderGuests")}</label>
                        <select id="reservation-guests" name="guests" required defaultValue="" className="w-full bg-transparent border-b border-white/20 pb-2 text-white/80 focus:outline-none focus:border-brass transition-colors appearance-none">
                          <option value="" disabled>{t("contact.form.placeholderGuests")}</option>
                          <option value="1" className="text-charcoal">{t("contact.form.person1")}</option>
                          <option value="2" className="text-charcoal">{t("contact.form.person2")}</option>
                          <option value="3" className="text-charcoal">{t("contact.form.person3")}</option>
                          <option value="4" className="text-charcoal">{t("contact.form.person4")}</option>
                          <option value="5+" className="text-charcoal">{t("contact.form.person5Plus")}</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="sr-only" htmlFor="reservation-message">{t("contact.form.placeholderMessage")}</label>
                      <textarea id="reservation-message" name="message" placeholder={t("contact.form.placeholderMessage")} rows={3} className="w-full bg-transparent border-b border-white/20 pb-2 text-white placeholder:text-white/40 focus:outline-none focus:border-brass transition-colors resize-none mt-4" />
                    </div>

                    {status === "error" && (
                      <p className="text-sm text-terracotta" role="alert">
                        {t("contact.form.errorMsg")}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="mt-6 rounded-full border border-terracotta bg-terracotta py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-xl shadow-terracotta/20 transition-all hover:-translate-y-0.5 hover:bg-brass hover:text-charcoal disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
                    >
                      {status === "submitting" ? t("contact.form.submitting") : t("contact.form.submitBtn")}
                    </button>
                  </form>
                )}

                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-margoum-pattern opacity-[0.03] mix-blend-overlay rounded-full blur-xl pointer-events-none" />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.3}>
            <div className="w-full h-[500px] lg:h-full min-h-[500px] relative p-2 md:p-4 border border-brass/20 bg-charcoal">
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-brass" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-brass" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-brass" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-brass" />

              <div className="w-full h-full relative overflow-hidden bg-deep-blue/50 filter sepia-[0.2] contrast-125 saturate-50 transition-all duration-700 hover:sepia-0 hover:saturate-100">
                <iframe
                  src={mapSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Carte de Coin Margoum à La Marsa"
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
