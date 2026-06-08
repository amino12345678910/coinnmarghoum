"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { siteConfig } from "@/config/site";

const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.705 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
  </svg>
);

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, totalPrice, totalCount } = useCart();
  const { locale, t } = useLanguage();
  const [clientName, setClientName] = useState("");
  const [specialNotes, setSpecialNotes] = useState("");

  const handleCheckout = () => {
    const phone = siteConfig.whatsappNumber;
    const cleanPhone = phone.replace(/[^\d]/g, "");

    const timestamp = new Date().toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    let itemsText = "";
    items.forEach((cartItem) => {
      const name = cartItem.item.name[locale];
      const quantity = cartItem.quantity;
      const price = cartItem.item.price * quantity;
      itemsText += `• *${quantity}x* ${name} (_${price} TND_)\n`;
    });

    const header = locale === "fr" 
      ? `🏺 *LA SÉLECTION MARGOUM*\n----------------------------------\n` 
      : `🏺 *THE MARGOUM SELECTION*\n----------------------------------\n`;
      
    const clientLabel = locale === "fr" ? `*Client :*` : `*Guest:*`;
    const notesLabel = locale === "fr" ? `*Demandes spéciales :*` : `*Special Requests:*`;
    const dateLabel = locale === "fr" ? `*Date / Heure :*` : `*Date / Time:*`;
    const itemsLabel = locale === "fr" ? `*Plats sélectionnés :*` : `*Selected Dishes:*`;
    const totalLabel = locale === "fr" ? `*Total estimé :*` : `*Estimated Total:*`;
    
    let message = `${header}`;
    message += `${clientLabel} ${clientName || (locale === "fr" ? "Non spécifié" : "Not specified")}\n`;
    message += `${dateLabel} ${timestamp}\n\n`;
    message += `${itemsLabel}\n${itemsText}\n`;
    
    if (specialNotes.trim()) {
      message += `${notesLabel}\n_${specialNotes.trim()}_\n\n`;
    }
    
    message += `----------------------------------\n`;
    message += `${totalLabel} *${totalPrice} TND*\n`;
    message += `_Généré depuis coinmargoum.com_`;

    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedText}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      {/* Floating Medallion Trigger on bottom-left */}
      <AnimatePresence>
        {!isOpen && totalCount > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -20 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 left-6 z-50 flex h-16 w-16 items-center justify-center rounded-full border border-brass bg-charcoal text-brass shadow-2xl shadow-charcoal/40 transition-all duration-300 hover:-translate-y-1 hover:bg-brass hover:text-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal md:bottom-10 md:left-10"
            aria-label={t("cart.openAria")}
          >
            {/* Subtle pulse ring */}
            <span className="absolute inset-0 rounded-full border border-brass animate-ping opacity-25 duration-1000" />
            <span className="absolute inset-1 rounded-full border border-brass/20" />
            <ShoppingBag size={24} className="relative z-10" />
            
            {/* Count Badge */}
            <span className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-terracotta text-[10px] font-bold text-cream border border-cream shadow-sm z-20 font-body">
              {totalCount}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[200] flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-charcoal/70 backdrop-blur-sm"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative flex h-full w-full max-w-md flex-col border-l border-brass/20 bg-[#161311] text-[#f4ecdd] shadow-2xl z-10"
            >
              {/* Margoum background styling */}
              <div className="pointer-events-none absolute inset-0 bg-margoum-pattern opacity-5 mix-blend-overlay" />

              {/* Header */}
              <div className="relative flex items-center justify-between border-b border-brass/10 px-6 py-5">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brass">
                    La Sélection
                  </span>
                  <h3 className="font-heading text-2xl text-cream mt-0.5">
                    {t("cart.title")}
                  </h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-brass/10 bg-[#221e1a] text-brass hover:bg-brass hover:text-[#161311] transition-all duration-300"
                  aria-label={t("cart.closeAria")}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Content Body */}
              <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-thin">
                {items.length === 0 ? (
                  // Empty state
                  <div className="flex h-[60%] flex-col items-center justify-center text-center">
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-brass/20 bg-charcoal/40 text-brass/70">
                      <ShoppingBag size={32} />
                    </div>
                    <h4 className="font-heading text-xl text-cream mb-2">
                      {t("cart.empty")}
                    </h4>
                    <p className="max-w-[280px] text-xs leading-relaxed text-cream/50">
                      {t("cart.emptyDesc")}
                    </p>
                  </div>
                ) : (
                  // Selected items list
                  <div className="space-y-6">
                    <div className="space-y-4">
                      {items.map((cartItem) => (
                        <div
                          key={cartItem.item.name.fr}
                          className="group flex gap-4 rounded-xl border border-brass/10 bg-[#201b18] p-3 transition-colors hover:border-brass/35"
                        >
                          {/* Thumbnail */}
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-charcoal border border-brass/5">
                            <Image
                              src={cartItem.item.image}
                              alt={cartItem.item.name[locale]}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          </div>

                          {/* Item Details */}
                          <div className="flex flex-col justify-between flex-1 min-w-0">
                            <div className="flex justify-between items-start gap-2">
                              <h4 className="font-heading text-base text-cream truncate leading-none pt-0.5">
                                {cartItem.item.name[locale]}
                              </h4>
                              <button
                                onClick={() => removeItem(cartItem.item.name.fr)}
                                className="text-cream/30 hover:text-terracotta transition-colors"
                                aria-label="Delete item"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>

                            <div className="flex justify-between items-center mt-1">
                              {/* Quantity Selector */}
                              <div className="flex items-center rounded-full border border-brass/20 bg-[#151210] px-2 py-1">
                                <button
                                  onClick={() =>
                                    updateQuantity(cartItem.item.name.fr, cartItem.quantity - 1)
                                  }
                                  className="text-brass/70 hover:text-brass transition-colors p-1"
                                >
                                  <Minus size={10} />
                                </button>
                                <span className="w-6 text-center text-xs font-semibold font-body text-cream">
                                  {cartItem.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(cartItem.item.name.fr, cartItem.quantity + 1)
                                  }
                                  className="text-brass/70 hover:text-brass transition-colors p-1"
                                >
                                  <Plus size={10} />
                                </button>
                              </div>

                              {/* Total price for this item */}
                              <span className="font-heading text-brass text-sm">
                                {cartItem.item.price * cartItem.quantity} TND
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Customer Information Inputs */}
                    <div className="space-y-4 border-t border-brass/10 pt-6 mt-6">
                      <div>
                        <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-brass mb-2">
                          {t("cart.clientName")}
                        </label>
                        <input
                          type="text"
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder={t("cart.clientNamePlaceholder")}
                          className="w-full rounded-lg border border-brass/10 bg-[#1b1714] py-3 px-4 text-sm text-cream placeholder:text-cream/30 focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-brass mb-2">
                          {t("cart.notes")}
                        </label>
                        <textarea
                          value={specialNotes}
                          onChange={(e) => setSpecialNotes(e.target.value)}
                          placeholder={t("cart.notesPlaceholder")}
                          rows={3}
                          className="w-full rounded-lg border border-brass/10 bg-[#1b1714] py-3 px-4 text-sm text-cream placeholder:text-cream/30 focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass transition-colors resize-none"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t border-brass/10 bg-[#1c1815] px-6 py-6 space-y-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm font-semibold uppercase tracking-wider text-cream/60">
                      {t("cart.subtotal")}
                    </span>
                    <span className="font-heading text-3xl text-brass">
                      {totalPrice} TND
                    </span>
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={items.length === 0}
                    className="w-full inline-flex items-center justify-center gap-3 rounded-full bg-brass text-charcoal px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] transition-all hover:bg-cream hover:-translate-y-0.5 shadow-lg shadow-brass/15 duration-300 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <WhatsAppIcon size={18} />
                    {t("cart.checkout")}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
