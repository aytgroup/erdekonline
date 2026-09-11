import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Yerel Ürünler | ErdekOnline",
  description: "Erdek'in doğal ve yerel ürünleri. Zeytin, peynir, bal ve daha fazlası.",
};

const urunler = [
  { id: 6, isim: "Yerel Köy Ürünleri", kategori: "Zeytinyağı & Zeytin", puan: 4.9, emoji: "🫒", renk: "bg-lime-100" },
  { id: 13, isim: "Erdek Balıkçısı", kategori: "Taze Balık", puan: 4.8, emoji: "🐟", renk: "bg-blue-100" },
  { id: 14, isim: "Bağ Evi Peynircisi", kategori: "Peynir & Süt Ürünleri", puan: 4.7, emoji: "🧀", renk: "bg-yellow-100" },
  { id: 15, isim: "Erdek Balı", kategori: "Doğal Bal", puan: 5.0, emoji: "🍯", renk: "bg-amber-100" },
];

export default function YerelPage() {
  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="bg-white border-b border-gray-100 shadow-sm px-4 py-5">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <Link href="/" className="text-gray-500 hover:text-sky-600 transition-colors"><ArrowLeft size={22} /></Link>
          <div>
            <h1 className="text-2xl font-black text-gray-900">🐟 Yerel Ürünler</h1>
            <p className="text-gray-500 text-sm">Erdek&apos;in topraklarından sofranıza</p>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {urunler.map((b) => (
            <Link key={b.id} href={`/isletme/${b.id}`}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all group">
              <div className={`h-44 ${b.renk} flex items-center justify-center`}>
                <span className="text-7xl group-hover:scale-110 transition-transform">{b.emoji}</span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-gray-900 text-base mb-1 group-hover:text-sky-600 transition-colors">{b.isim}</h3>
                <p className="text-gray-500 text-sm mb-3">{b.kategori}</p>
                <div className="flex items-center gap-1 text-sm">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span className="font-bold text-gray-700">{b.puan}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-12 bg-lime-50 border border-lime-100 rounded-2xl p-8 text-center">
          <div className="text-4xl mb-3">🌿</div>
          <h2 className="text-xl font-black text-gray-900 mb-2">Yerel Üreticiniz Var mı?</h2>
          <p className="text-gray-500 text-sm mb-4">Erdek&apos;in doğal ürünlerini platformumuzda satın.</p>
          <Link href="/isletme-kayit" className="inline-flex items-center gap-2 bg-lime-500 hover:bg-lime-600 text-white font-bold px-6 py-3 rounded-full transition-colors">
            Ücretsiz Ekle →
          </Link>
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}