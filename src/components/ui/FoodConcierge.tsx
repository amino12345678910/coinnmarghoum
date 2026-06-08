"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, Send, Sparkles, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type Message = {
  role: "user" | "assistant";
  content: string;
};

function localConciergeReply(text: string, locale: "fr" | "en") {
  const question = text.toLowerCase();

  if (locale === "en") {
    if (question.includes("veget") || question.includes("meat")) {
      return "I recommend the vegetable couscous, homemade kafteji, or classic lablabi. They are warm, generous, and highly aromatic choices.";
    }
    if (question.includes("price") || question.includes("cost") || question.includes("how much")) {
      return "Starters begin around 11 TND, signature dishes range from 29 to 46 TND, and the Royal Couscous is 42 TND.";
    }
    if (question.includes("book") || question.includes("reserv") || question.includes("table")) {
      return "To book, please use the Contact & Reservation form. Enter the date, time, and number of guests, and our team will confirm shortly.";
    }
    if (question.includes("spic") || question.includes("hot") || question.includes("harissa")) {
      return "Harissa is well-balanced: the Merguez Ojja is the spiciest, the Royal Couscous is hearty but balanced, and the Djerbian Rice is mostly fragrant.";
    }
    return "Marhaba! For a first visit, I recommend the Egg Brik, Royal Couscous, or Djerbian Rice, followed by a fresh mint tea. It is the best way to discover the house.";
  }

  if (question.includes("veget") || question.includes("sans viande")) {
    return "Je vous conseille le couscous aux legumes, le kafteji maison ou le lablabi soigne. Ce sont des choix solaires, genereux et bien parfumes.";
  }

  if (question.includes("prix") || question.includes("coute") || question.includes("combien")) {
    return "Les entrees commencent autour de 11 TND, les plats signatures vont de 29 a 46 TND, et le Couscous Royal est a 42 TND.";
  }

  if (question.includes("reserver") || question.includes("reservation") || question.includes("table")) {
    return "Pour reserver, utilisez le formulaire Contact & Reservation. Indiquez la date, l'heure, le nombre de personnes et l'equipe vous confirme rapidement.";
  }

  if (question.includes("epice") || question.includes("piquant") || question.includes("harissa")) {
    return "L'harissa est maitrisee: l'Ojja Merguez est la plus relevee, le Couscous Royal reste genereux mais equilibre, et le Riz Djerbien est surtout parfume.";
  }

  return "Marhaba ! Pour une premiere visite, je recommande Brik a l'oeuf, Couscous Royal ou Riz Djerbien, puis un the a la menthe. C'est le meilleur chemin pour decouvrir la maison.";
}

export default function FoodConcierge() {
  const { locale, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Marhaba ! Je suis Margoum, votre hote virtuel. Je peux conseiller un plat, expliquer les prix ou vous guider vers une reservation.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    t("concierge.suggestion1"),
    t("concierge.suggestion2"),
    t("concierge.suggestion3"),
    t("concierge.suggestion4"),
  ];

  // Dynamically update greeting on language change
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].role === "assistant") {
        return [
          {
            role: "assistant",
            content: t("concierge.greeting"),
          },
        ];
      }
      return prev;
    });
  }, [locale, t]);

  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const newMessages = [...messages, { role: "user" as const, content: text }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/.netlify/functions/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, locale }),
      });

      if (!res.ok) throw new Error("Concierge request failed");

      const data = await res.json();
      const reply = typeof data.reply === "string" ? data.reply : localConciergeReply(text, locale);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: localConciergeReply(text, locale) }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full border border-brass bg-charcoal text-brass shadow-2xl shadow-charcoal/30 transition-all duration-300 hover:-translate-y-1 hover:bg-brass hover:text-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal md:bottom-10 md:right-10"
          aria-label="Ouvrir le concierge virtuel"
        >
          <span className="absolute inset-1 rounded-full border border-brass/20" />
          <Sparkles size={25} className="relative z-10" />
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex h-full w-full flex-col overflow-hidden bg-cream shadow-2xl md:inset-auto md:bottom-28 md:right-10 md:h-[620px] md:w-[400px] md:rounded-xl md:border md:border-brass/30"
          >
            <div className="relative flex shrink-0 items-center justify-between overflow-hidden bg-charcoal p-4 text-cream">
              <div className="absolute inset-0 bg-margoum-pattern opacity-10 mix-blend-overlay pointer-events-none" />
              <div className="relative z-10 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brass text-charcoal shadow-md">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="font-heading text-lg leading-tight">Margoum</h3>
                  <p className="text-[10px] uppercase tracking-wider text-brass">{t("concierge.roleLabel")}</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="relative z-30 p-2 text-cream/60 transition-colors hover:text-terracotta cursor-pointer"
                aria-label={t("gallery.closeAria")}
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-cream p-4">
              <div className="mb-4 rounded-lg border border-brass/20 bg-white/70 p-3 text-xs leading-relaxed text-charcoal/65">
                <span className="font-semibold text-deep-blue">{t("concierge.infoTitle")}</span> {t("concierge.infoDesc")}
              </div>

              <div className="flex flex-col gap-4">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[86%] rounded-2xl p-3 text-sm leading-relaxed shadow-sm ${
                        msg.role === "user"
                          ? "rounded-br-sm bg-deep-blue text-cream"
                          : "rounded-bl-sm border border-charcoal/5 bg-white text-charcoal"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex gap-1 rounded-2xl rounded-bl-sm border border-charcoal/5 bg-white p-4 shadow-sm">
                      {[0, 0.2, 0.4].map((delay) => (
                        <motion.div
                          key={delay}
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay }}
                          className="h-1.5 w-1.5 rounded-full bg-brass"
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {messages.length === 1 && (
              <div className="flex shrink-0 flex-wrap gap-2 border-t border-charcoal/5 bg-cream/95 px-4 py-3 backdrop-blur-sm">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSend(suggestion)}
                    disabled={isTyping}
                    className="rounded-full border border-charcoal/10 bg-white px-3 py-1.5 text-left text-[11px] text-charcoal shadow-sm transition-colors hover:border-brass hover:text-terracotta disabled:opacity-50 md:text-xs"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="flex shrink-0 items-center gap-2 border-t border-charcoal/5 bg-white p-4"
            >
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brass/40 text-brass transition-colors hover:bg-brass hover:text-charcoal"
                aria-label={t("concierge.reservationAria")}
              >
                <CalendarCheck size={18} />
              </a>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("concierge.inputPlaceholder")}
                aria-label={t("concierge.inputPlaceholder")}
                className="min-w-0 flex-1 rounded-full border border-charcoal/10 bg-cream/40 px-4 py-3 text-sm text-charcoal transition-all placeholder:text-charcoal/40 focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-charcoal text-brass transition-colors hover:bg-brass hover:text-charcoal disabled:opacity-50 disabled:hover:bg-charcoal disabled:hover:text-brass"
                aria-label={t("concierge.sendAria")}
              >
                <Send size={18} className="ml-0.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
