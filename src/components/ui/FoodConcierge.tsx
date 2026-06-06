"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const SUGGESTIONS = [
  "Que me recommandez-vous ?",
  "Plats végétariens ?",
  "Réserver une table"
];

export default function FoodConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Marhaba ! Je suis Margoum, votre hôte. Que puis-je faire pour vous aujourd'hui ?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
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
        body: JSON.stringify({ messages: newMessages }),
      });
      
      const data = await res.json();
      
      // Simulate streaming delay for graceful fallback
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
        setIsTyping(false);
      }, 800);
      
    } catch {
      setIsTyping(false);
      setMessages((prev) => [...prev, { role: "assistant", content: "Désolé, je rencontre des difficultés de connexion. Veuillez réessayer." }]);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 md:bottom-10 md:left-10 z-50 bg-charcoal border-2 border-brass text-brass p-4 rounded-full shadow-2xl hover:bg-brass hover:text-charcoal transition-all duration-300 group flex items-center justify-center hover:scale-105"
        aria-label="Ouvrir le concierge virtuel"
      >
        <Sparkles size={24} className="relative z-10" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 md:inset-auto md:bottom-28 md:left-10 z-50 w-full md:w-[380px] h-full md:h-[600px] bg-cream shadow-2xl md:rounded-xl overflow-hidden flex flex-col border border-brass/30"
          >
            {/* Header */}
            <div className="bg-charcoal text-cream p-4 flex justify-between items-center relative overflow-hidden shrink-0">
              <div className="absolute inset-0 bg-margoum-pattern opacity-10 mix-blend-overlay pointer-events-none" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 bg-brass rounded-full flex items-center justify-center text-charcoal shadow-md">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="font-heading text-lg leading-tight">Margoum</h3>
                  <p className="text-[10px] text-brass tracking-wider uppercase">Votre Hôte Virtuel</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-cream/50 hover:text-terracotta transition-colors relative z-10"
              >
                <X size={24} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-cream bg-[url('/images/paper-grain.png')]">
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`max-w-[85%] p-3 text-sm leading-relaxed ${
                      msg.role === "user" 
                        ? "bg-brass text-charcoal rounded-2xl rounded-br-sm shadow-sm" 
                        : "bg-white text-charcoal border border-charcoal/5 rounded-2xl rounded-bl-sm shadow-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl rounded-bl-sm shadow-sm border border-charcoal/5 flex gap-1">
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-brass rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-brass rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-brass rounded-full" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length === 1 && (
              <div className="px-4 py-3 flex flex-wrap gap-2 bg-cream/90 backdrop-blur-sm shrink-0 border-t border-charcoal/5">
                {SUGGESTIONS.map((sug, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(sug)}
                    className="text-[11px] md:text-xs bg-white border border-charcoal/10 text-charcoal px-3 py-1.5 rounded-full hover:border-brass hover:text-brass transition-colors text-left shadow-sm"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
              className="p-4 bg-white border-t border-charcoal/5 flex gap-2 shrink-0 items-center"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Posez votre question..."
                className="flex-1 bg-cream/30 border border-charcoal/10 rounded-full px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-brass focus:ring-1 focus:ring-brass transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-11 h-11 bg-charcoal rounded-full flex items-center justify-center text-brass shrink-0 hover:bg-brass hover:text-charcoal transition-colors disabled:opacity-50 disabled:hover:bg-charcoal disabled:hover:text-brass"
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
