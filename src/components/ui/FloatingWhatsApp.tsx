"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getWhatsAppUrl } from "@/config/site";

export default function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);
  const whatsappUrl = getWhatsAppUrl();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) setIsVisible(true);
      else setIsVisible(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!whatsappUrl) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 bg-brass text-charcoal p-4 rounded-full shadow-[0_10px_25px_rgba(200,160,90,0.4)] hover:bg-white hover:text-terracotta transition-colors duration-300 group"
          aria-label="Contact us on WhatsApp"
        >
          {/* Subtle pulse ring */}
          <div className="absolute inset-0 bg-brass rounded-full animate-ping opacity-40 duration-1000" />
          <Phone size={28} className="relative z-10" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
