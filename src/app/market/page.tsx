import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Market | ErdekOnline",
  description: "Erdek'teki marketlerden online alışveriş yapın. Gıda, içecek ve daha fazlası kapınıza gelsin.",
};

const isletmeler = [
  { id: 3, isim: "Şevket Market", kategori: "Market & Bakkal", puan: 4.6, sure: "15-25 dk", emoji: "🛒", renk: "bg-green-100" },
  { id: 7, isim: "Erdek Manav", kategori: "Meyve & Sebze", puan: 4.7, sure: "20-30 dk", emoji: "🥦", renk: "bg-emerald-100" },
];

export default function MarketPage() {
  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="bg-white border-b border-gray-100 shadow-sm px-4 py-5">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <Link href="/" className="text-gray-500 hover:text-sky-600 transition-colors"><ArrowLeft size={22} /></Link>
          <div>
            <h1 className="text-2xl font-black text-gray-900">🛒 Market</h1>
            <p className="text-gray-500 text-sm">Erdek&apos;in marketleri kapınıza gelsin</p>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isletmeler.map((b) => (
            <Link key={b.id} href={`/isletme/${b.id}`}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all group">
              <div className={`h-44 ${b.renk} flex items-center justify-center`}>
                <span className="text-7xl group-hover:scale-110 transition-transform">{b.emoji}</span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-gray-900 text-base mb-1 group-hover:text-sky-600 transition-colors">{b.isim}</h3>
                <p className="text-gray-500 text-sm mb-3">{b.kategori}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1"><Star size={14} className="text-yellow-400 fill-yellow-400" /><span className="font-bold text-gray-700">{b.puan}</span></div>
                  <div className="flex items-center gap-1"><Clock size={14} />{b.sure}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-12 bg-green-50 border border-green-100 rounded-2xl p-8 text-center">
          <div className="text-4xl mb-3">🏪</div>
          <h2 className="text-xl font-black text-gray-900 mb-2">Marketiniz Burada Olsun!</h2>
          <p className="text-gray-500 text-sm mb-4">Marketinizi ErdekOnline&apos;a ekleyin.</p>
          <Link href="/isletme-kayit" className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-full transition-colors">
            Ücretsiz Ekle →
          </Link>
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}