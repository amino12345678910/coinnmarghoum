import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/layout/LenisProvider";
import Noise from "@/components/ui/Noise";
import Cursor from "@/components/ui/Cursor";
import Preloader from "@/components/layout/Preloader";
import Footer from "@/components/sections/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import FoodConcierge from "@/components/ui/FoodConcierge";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });

export const metadata: Metadata = {
  title: "Coin Margoum | Restaurant Tunisien à La Marsa",
  description: "Où la saveur tunisienne se tisse. Un voyage culinaire authentique au cœur de La Marsa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="font-body bg-cream text-charcoal antialiased selection:bg-terracotta selection:text-cream overflow-x-hidden">
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
