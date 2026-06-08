"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "@/data/translations";

export type Locale = "fr" | "en";

interface LanguageContextProps {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr");

  useEffect(() => {
    const savedLocale = localStorage.getItem("preferred_locale") as Locale;
    if (savedLocale === "en" || savedLocale === "fr") {
      setLocaleState(savedLocale);
    } else {
      const browserLang = navigator.language.slice(0, 2);
      if (browserLang === "en") {
        setLocaleState("en");
      }
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("preferred_locale", newLocale);
    
    // Update HTML lang attribute dynamically
    document.documentElement.lang = newLocale;
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let current: unknown = translations[locale];

    for (const k of keys) {
      if (current && typeof current === "object" && k in (current as Record<string, unknown>)) {
        current = (current as Record<string, unknown>)[k];
      } else {
        // Fallback to FR translation if key is missing
        let fallback: unknown = translations["fr"];
        for (const fk of keys) {
          if (fallback && typeof fallback === "object" && fk in (fallback as Record<string, unknown>)) {
            fallback = (fallback as Record<string, unknown>)[fk];
          } else {
            fallback = key;
            break;
          }
        }
        return typeof fallback === "string" ? fallback : key;
      }
    }

    return typeof current === "string" ? current : key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
