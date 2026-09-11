import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Star, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Tekne Turları | ErdekOnline",
  description: "Erdek'te tekne turu rezervasyonu yapın. Günlük turlar, ada gezileri ve gün batımı turları.",
};

const turlar = [
  { id: 10, isim: "Erdek Mavi Tur", kategori: "Günlük Tekne Turu", puan: 4.9, kapasite: "12 kişi", emoji: "⛵", renk: "bg-blue-100", sure: "Tam Gün" },
  { id: 11, isim: "Adalar Keşif Turu", kategori: "Ada Turu", puan: 4.8, kapasite: "20 kişi", emoji: "🏝️", renk: "bg-sky-100", sure: "Yarım Gün" },
  { id: 12, isim: "Gün Batımı Turu", kategori: "Romantik Tur", puan: 5.0, kapasite: "8 kişi", emoji: "🌅", renk: "bg-orange-100", sure: "3 Saat" },
];

export default function TeknePage() {
  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="bg-white border-b border-gray-100 shadow-sm px-4 py-5">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <Link href="/" className="text-gray-500 hover:text-sky-600 transition-colors"><ArrowLeft size={22} /></Link>
          <div>
            <h1 className="text-2xl font-black text-gray-900">⛵ Tekne Turları</h1>
            <p className="text-gray-500 text-sm">Erdek&apos;in mavi sularında unutulmaz turlar</p>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-8 text-sm text-blue-700 font-medium">
          🌊 Sezon: Mayıs – Ekim · Rezervasyon için arayın: <a href="tel:+902668350000" className="underline font-bold">+90 (266) 835 00 00</a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {turlar.map((b) => (
            <Link key={b.id} href={`/isletme/${b.id}`} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all group cursor-pointer">
              <div className={`h-44 ${b.renk} flex items-center justify-center`}>
                <span className="text-7xl group-hover:scale-110 transition-transform">{b.emoji}</span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-gray-900 text-base mb-1">{b.isim}</h3>
                <p className="text-gray-500 text-sm mb-3">{b.kategori}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1"><Star size={14} className="text-yellow-400 fill-yellow-400" /><span className="font-bold text-gray-700">{b.puan}</span></div>
                  <div className="flex items-center gap-1"><Users size={14} />{b.kapasite}</div>
                  <div className="font-medium text-sky-600">{b.sure}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-12 bg-sky-50 border border-sky-100 rounded-2xl p-8 text-center">
          <div className="text-4xl mb-3">⛵</div>
          <h2 className="text-xl font-black text-gray-900 mb-2">Tekne Turunuzu Ekleyin!</h2>
          <p className="text-gray-500 text-sm mb-4">Erdek&apos;te tekne turu işletiyorsanız sizi bekliyoruz.</p>
          <Link href="/isletme-kayit" className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold px-6 py-3 rounded-full transition-colors">
            Ücretsiz Ekle →
          </Link>
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}