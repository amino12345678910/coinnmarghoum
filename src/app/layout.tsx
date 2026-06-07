import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/layout/LenisProvider";
import Noise from "@/components/ui/Noise";
import Cursor from "@/components/ui/Cursor";
import Preloader from "@/components/layout/Preloader";
import Footer from "@/components/sections/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import FoodConcierge from "@/components/ui/FoodConcierge";
import { siteConfig } from "@/config/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });

export const viewport: Viewport = {
  themeColor: "#1a1a1a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "Coin Margoum | Restaurant Tunisien Authentique à La Marsa",
    template: "%s | Coin Margoum",
  },
  description: "Découvrez Coin Margoum, le meilleur restaurant tunisien à La Marsa. Dégustez notre couscous authentique, brik, et cuisine tunisienne traditionnelle dans un cadre chaleureux.",
  keywords: ["restaurant tunisien La Marsa", "couscous La Marsa", "cuisine tunisienne authentique", "restaurant La Marsa", "gastronomie tunisienne"],
  openGraph: {
    title: "Coin Margoum | Restaurant Tunisien à La Marsa",
    description: "Une expérience culinaire authentique au cœur de La Marsa. Où la saveur tunisienne se tisse.",
    url: siteConfig.siteUrl,
    siteName: "Coin Margoum",
    locale: "fr_TN",
    type: "website",
    images: [
      {
        url: "/images/hero_interior.png",
        width: 1200,
        height: 630,
        alt: "Coin Margoum - Restaurant Tunisien La Marsa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Coin Margoum | Restaurant Tunisien",
    description: "Le meilleur de la cuisine tunisienne à La Marsa.",
    images: ["/images/hero_interior.png"],
  },
  alternates: {
    canonical: siteConfig.siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const socialLinks = Object.values(siteConfig.socials).filter(Boolean);

const restaurantJsonLd = {
  "@type": "Restaurant",
  "@id": `${siteConfig.siteUrl}/#restaurant`,
  "name": siteConfig.name,
  "image": `${siteConfig.siteUrl}/images/hero_interior.png`,
  "url": siteConfig.siteUrl,
  "menu": `${siteConfig.siteUrl}/#menu`,
  "servesCuisine": "Tunisian",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": siteConfig.address.street,
    "addressLocality": siteConfig.address.city,
    "postalCode": siteConfig.address.postalCode,
    "addressCountry": siteConfig.address.countryCode
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": siteConfig.address.latitude,
    "longitude": siteConfig.address.longitude
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
      "opens": "12:00",
      "closes": "23:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Friday", "Saturday", "Sunday"],
      "opens": "12:00",
      "closes": "00:00"
    }
  ],
  ...(siteConfig.phoneE164 ? { "telephone": siteConfig.phoneE164 } : {}),
  ...(socialLinks.length ? { "sameAs": socialLinks } : {}),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    restaurantJsonLd,
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Accueil",
          "item": `${siteConfig.siteUrl}/`
        }
      ]
    }
  ]
};

/*
  ✅ LIGHTHOUSE & PERFORMANCE CHECKLIST:
  - [x] Font Display Swap (inter/fraunces)
  - [x] Strict Image Sizing & priority hints
  - [x] Semantic HTML elements
  - [x] Dynamic Native Metadata + JSON-LD
  - [x] Viewport meta tags optimization
  - [x] Accessibility (Aria labels on interactive elements)
  - [x] Reduced Motion checks (window.matchMedia logic implemented in GSAP/Canvas)
*/

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="font-body bg-cream text-charcoal antialiased selection:bg-terracotta selection:text-cream overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Preloader />
        <Noise />
        <Cursor />
        <LenisProvider>
          {children}
          <Footer />
          <FloatingWhatsApp />
          <FoodConcierge />
        </LenisProvider>
      </body>
    </html>
  );
}
