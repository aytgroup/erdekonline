"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const isletmeler = [
  { id: 1, isim: "Kalamar Balık Restaurant", kat: "Balık", puan: 4.9, sure: "25-40 dk", emoji: "🐟", renk: "bg-blue-100", minSiparis: "150₺" },
  { id: 2, isim: "Erdek Pide & Lahmacun", kat: "Pide", puan: 4.7, sure: "20-35 dk", emoji: "🍕", renk: "bg-orange-100", minSiparis: "80₺" },
  { id: 4, isim: "Erdek Burger & Döner", kat: "Fast Food", puan: 4.5, sure: "20-30 dk", emoji: "🍔", renk: "bg-yellow-100", minSiparis: "100₺" },
  { id: 5, isim: "Tatlı Dükkanı Erdek", kat: "Tatlı", puan: 4.8, sure: "30-45 dk", emoji: "🍰", renk: "bg-pink-100", minSiparis: "120₺" },
];

const filtreler = ["Tümü", "Balık", "Pide", "Fast Food", "Tatlı"];

export default function YemekPage() {
  const [aktif, setAktif] = useState("Tümü");
  const [siralama, setSiralama] = useState<"puan" | "sure">("puan");

  const liste = isletmeler
    .filter(b => aktif === "Tümü" || b.kat === aktif)
    .sort((a, b) => siralama === "puan" ? b.puan - a.puan : a.sure.localeCompare(b.sure));

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="bg-white border-b border-gray-100 shadow-sm px-4 py-5">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <Link href="/" className="text-gray-500 hover:text-sky-600 transition-colors"><ArrowLeft size={22} /></Link>
          <div>
            <h1 className="text-2xl font-black text-gray-900">🍽️ Yemek Siparişi</h1>
            <p className="text-gray-500 text-sm">{liste.length} restoran listeleniyor</p>
          </div>
        </div>
      </div>

      {/* Filtre bar */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 sticky top-[64px] z-30 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          <div className="flex gap-2 overflow-x-auto pb-0.5">
            {filtreler.map(f => (
              <button key={f} onClick={() => setAktif(f)}
                className={`shrink-0 text-xs font-bold px-4 py-2 rounded-full border transition-all ${aktif === f ? "bg-orange-500 text-white border-orange-500" : "bg-white text-gray-600 border-gray-200 hover:border-orange-300"}`}>
                {f}
              </button>
            ))}
          </div>
          <select value={siralama} onChange={e => setSiralama(e.target.value as "puan" | "sure")}
            className="shrink-0 border border-gray-200 rounded-xl px-3 py-2 text-xs font-medium outline-none bg-white text-gray-700 cursor-pointer">
            <option value="puan">En Yüksek Puan</option>
            <option value="sure">En Hızlı</option>
          </select>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {liste.map((b) => (
            <Link key={b.id} href={`/isletme/${b.id}`}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all group">
              <div className={`h-44 ${b.renk} flex items-center justify-center relative`}>
                <span className="text-7xl group-hover:scale-110 transition-transform">{b.emoji}</span>
                <span className="absolute bottom-2 right-2 bg-white/90 text-gray-700 text-xs font-bold px-2 py-0.5 rounded-full">Min. {b.minSiparis}</span>
              </div>
              <div className="p-5">
                <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">{b.kat}</span>
                <h3 className="font-bold text-gray-900 text-base mt-2 mb-1 group-hover:text-sky-600 transition-colors">{b.isim}</h3>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1"><Star size={14} className="text-yellow-400 fill-yellow-400" /><span className="font-bold text-gray-700">{b.puan}</span></div>
                  <div className="flex items-center gap-1"><Clock size={14} />{b.sure}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-12 bg-orange-50 border border-orange-100 rounded-2xl p-8 text-center">
          <div className="text-4xl mb-3">🏪</div>
          <h2 className="text-xl font-black text-gray-900 mb-2">Restoranınız Burada Olsun!</h2>
          <p className="text-gray-500 text-sm mb-4">Erdek&apos;teki restoranınızı platforma ekleyin.</p>
          <Link href="/isletme-kayit" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-full transition-colors">
            Ücretsiz Ekle →
          </Link>
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}