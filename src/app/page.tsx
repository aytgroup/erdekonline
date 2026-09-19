import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedBusinesses from "@/components/FeaturedBusinesses";
import WhyErDekOnline from "@/components/WhyErDekOnline";
import TestimonialSection from "@/components/TestimonialSection";
import BusinessCTA from "@/components/BusinessCTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "ErdekOnline — Erdek'in Dijital Platformu",
  description: "Yemek siparişinden market alışverişine, tekne turundan konaklama rezervasyonuna — Erdek'in tüm hizmetleri tek platformda. Erdek bir tık uzağında!",
  keywords: "Erdek, yemek siparişi, market, tekne turu, konaklama, yerel ürünler, Balıkesir",
  openGraph: {
    title: "ErdekOnline — Erdek'in Dijital Platformu",
    description: "Erdek'in tüm hizmetleri tek platformda. Erdek bir tık uzağında!",
    images: [{ url: "/logo.png", width: 1254, height: 1254 }],
  },
};

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturedBusinesses />
      <WhyErDekOnline />
      <TestimonialSection />
      <BusinessCTA />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
