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

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });

export const viewport: Viewport = {
  themeColor: "#1a1a1a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://coinmargoum.com"), // Placeholder URL
  title: {
    default: "Coin Margoum | Restaurant Tunisien Authentique à La Marsa",
    template: "%s | Coin Margoum",
  },
  description: "Découvrez Coin Margoum, le meilleur restaurant tunisien à La Marsa. Dégustez notre couscous authentique, brik, et cuisine tunisienne traditionnelle dans un cadre chaleureux.",
  keywords: ["restaurant tunisien La Marsa", "couscous La Marsa", "cuisine tunisienne authentique", "restaurant La Marsa", "gastronomie tunisienne"],
  openGraph: {
    title: "Coin Margoum | Restaurant Tunisien à La Marsa",
    description: "Une expérience culinaire authentique au cœur de La Marsa. Où la saveur tunisienne se tisse.",
    url: "https://coinmargoum.com",
    siteName: "Coin Margoum",
    locale: "fr_TN",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
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
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: "https://coinmargoum.com",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Restaurant",
      "@id": "https://coinmargoum.com/#restaurant",
      "name": "Coin Margoum",
      "image": "https://coinmargoum.com/images/og-image.jpg",
      "url": "https://coinmargoum.com",
      "telephone": "+21600000000",
      "menu": "https://coinmargoum.com/#menu",
      "servesCuisine": "Tunisian",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "12 Rue Sidi Abdelaziz",
        "addressLocality": "La Marsa",
        "postalCode": "2070",
        "addressCountry": "TN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 36.88856,
        "longitude": 10.323565
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
      "sameAs": [
        "https://instagram.com/coinmargoum",
        "https://facebook.com/coinmargoum"
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "124"
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Accueil",
          "item": "https://coinmargoum.com/"
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
