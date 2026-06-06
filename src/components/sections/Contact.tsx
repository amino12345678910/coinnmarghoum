"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    
    // MOCK SUBMISSION
    // TODO: Wire to a real backend (Netlify Function or API Route) for emails
    setTimeout(() => {
      setStatus("success");
    }, 2000);
  };

  return (
    <section id="contact" className="bg-deep-blue text-cream py-24 md:py-32 w-full relative border-t border-brass/10">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-7xl relative z-10">
        
        <Reveal>
          <div className="text-center md:text-left mb-16">
            <span className="text-xs font-semibold tracking-[0.2em] text-brass uppercase mb-4 block">
              NOUS TROUVER
            </span>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-cream leading-tight">
              Contact & Réservation
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column: Info & Form */}
          <div className="flex flex-col gap-12">
            
            <Reveal delay={0.1}>
              {/* Info Block */}
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="font-heading text-2xl text-brass mb-3">Adresse</h3>
                  <p className="text-cream/80 font-light text-lg">12 Rue Sidi Abdelaziz<br/>La Marsa, 2070, Tunisie</p>
                </div>
                
                <div>
                  <h3 className="font-heading text-2xl text-brass mb-3">Horaires</h3>
                  <ul className="text-cream/80 font-light text-lg flex flex-col gap-2 relative pl-4 border-l border-brass/30">
                    <li className="relative before:content-[''] before:absolute before:-left-[21px] before:top-2 before:w-2 before:h-2 before:bg-brass before:rotate-45">
                      Lun - Jeu : 12h00 - 23h00
                    </li>
                    <li className="relative before:content-[''] before:absolute before:-left-[21px] before:top-2 before:w-2 before:h-2 before:bg-brass before:rotate-45">
                      Ven - Dim : 12h00 - 00h00
                    </li>
                  </ul>
                </div>

                <div className="flex flex-wrap gap-4 mt-4">
                  <a href="https://wa.me/21600000000" className="px-6 py-3 border border-brass text-brass hover:bg-brass hover:text-charcoal transition-colors uppercase tracking-widest text-xs font-semibold">
                    WhatsApp
                  </a>
                  <a href="tel:+21600000000" className="px-6 py-3 border border-cream text-cream hover:bg-white hover:text-charcoal transition-colors uppercase tracking-widest text-xs font-semibold">
                    Appeler
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              {/* Reservation Form */}
              <div className="bg-charcoal p-8 md:p-10 border border-white/5 rounded-sm relative overflow-hidden">
                <h3 className="font-heading text-3xl text-white mb-8">Réserver une table</h3>
                
                {status === "success" ? (
                  <div className="h-[300px] flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-700">
                    <div className="w-16 h-16 mb-6 flex items-center justify-center border-2 border-brass rounded-full rotate-45">
                      <div className="w-8 h-8 bg-brass -rotate-45" />
                    </div>
                    <h4 className="font-heading text-2xl text-brass mb-2">Demande Envoyée</h4>
                    <p className="text-cream/70 font-light">
                      Notre équipe vous contactera très vite pour confirmer votre réservation.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input required type="text" placeholder="Nom complet" className="bg-transparent border-b border-white/20 pb-2 text-white placeholder:text-white/40 focus:outline-none focus:border-brass transition-colors" />
                      <input required type="tel" placeholder="Téléphone" className="bg-transparent border-b border-white/20 pb-2 text-white placeholder:text-white/40 focus:outline-none focus:border-brass transition-colors" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <input required type="date" className="bg-transparent border-b border-white/20 pb-2 text-white/80 focus:outline-none focus:border-brass transition-colors [color-scheme:dark]" />
                      <input required type="time" className="bg-transparent border-b border-white/20 pb-2 text-white/80 focus:outline-none focus:border-brass transition-colors [color-scheme:dark]" />
                      <select required className="bg-transparent border-b border-white/20 pb-2 text-white/80 focus:outline-none focus:border-brass transition-colors appearance-none">
                        <option value="" disabled selected>Personnes</option>
                        <option value="1" className="text-charcoal">1 personne</option>
                        <option value="2" className="text-charcoal">2 personnes</option>
                        <option value="3" className="text-charcoal">3 personnes</option>
                        <option value="4" className="text-charcoal">4 personnes</option>
                        <option value="5+" className="text-charcoal">5+ personnes</option>
                      </select>
                    </div>
                    <textarea placeholder="Message ou demande spéciale (optionnel)" rows={3} className="bg-transparent border-b border-white/20 pb-2 text-white placeholder:text-white/40 focus:outline-none focus:border-brass transition-colors resize-none mt-4" />
                    
                    <button 
                      type="submit" 
                      disabled={status === "submitting"}
                      className="mt-6 bg-terracotta text-white py-4 uppercase tracking-widest text-sm font-semibold hover:bg-brass hover:text-charcoal transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === "submitting" ? "Envoi en cours..." : "Confirmer la demande"}
                    </button>
                  </form>
                )}

                {/* Form Background Pattern */}
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-margoum-pattern opacity-[0.03] mix-blend-overlay rounded-full blur-xl pointer-events-none" />
              </div>
            </Reveal>

          </div>

          {/* Right Column: Embedded Map */}
          <Reveal delay={0.3}>
            <div className="w-full h-[500px] lg:h-full min-h-[500px] relative p-2 md:p-4 border border-brass/20 bg-charcoal">
              {/* Margoum stylized corners */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-brass" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-brass" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-brass" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-brass" />
              
              <div className="w-full h-full relative overflow-hidden bg-deep-blue/50 filter sepia-[0.2] contrast-125 saturate-50 transition-all duration-700 hover:sepia-0 hover:saturate-100">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3191.0716618458737!2d10.323565!3d36.88856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12e2b4b4b4b4b4b4%3A0x4b4b4b4b4b4b4b4b!2sLa%20Marsa%2C%20Tunisia!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps La Marsa"
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
