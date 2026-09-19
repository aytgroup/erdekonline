"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Star, MapPin, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const yerler = [
  { id: 20, isim: "Erdek Sahil Pansiyon", kat: "Pansiyon", puan: 4.7, konum: "Sahil Caddesi", fiyat: 800, fiyatGoster: "₺800'den", emoji: "🏨", renk: "bg-blue-100", telefon: "+90 266 835 00 20", musaitlik: true },
  { id: 21, isim: "Ada Manzara Butik Otel", kat: "Butik Otel", puan: 4.9, konum: "Merkez", fiyat: 1500, fiyatGoster: "₺1.500'den", emoji: "🏩", renk: "bg-purple-100", telefon: "+90 266 835 00 21", musaitlik: true },
  { id: 22, isim: "Erdek Apart Otel", kat: "Apart", puan: 4.5, konum: "Bağlarbaşı", fiyat: 600, fiyatGoster: "₺600'den", emoji: "🏠", renk: "bg-green-100", telefon: "+90 266 835 00 22", musaitlik: false },
];

const kategoriler = ["Tümü", "Pansiyon", "Butik Otel", "Apart"];

export default function KonaklamaPage() {
  const [aktif, setAktif] = useState("Tümü");
  const [siralama, setSiralama] = useState<"puan" | "fiyat">("puan");

  const liste = yerler
    .filter(b => aktif === "Tümü" || b.kat === aktif)
    .sort((a, b) => siralama === "puan" ? b.puan - a.puan : a.fiyat - b.fiyat);

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="bg-white border-b border-gray-100 shadow-sm px-4 py-5">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <Link href="/" className="text-gray-500 hover:text-sky-600 transition-colors"><ArrowLeft size={22} /></Link>
          <div>
            <h1 className="text-2xl font-black text-gray-900">🏨 Konaklama</h1>
            <p className="text-gray-500 text-sm">{liste.length} tesis listeleniyor</p>
          </div>
        </div>
      </div>

      {/* Filtre bar */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 sticky top-[64px] z-30 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          <div className="flex gap-2 overflow-x-auto">
            {kategoriler.map(k => (
              <button key={k} onClick={() => setAktif(k)}
                className={`shrink-0 text-xs font-bold px-4 py-2 rounded-full border transition-all ${aktif === k ? "bg-purple-500 text-white border-purple-500" : "bg-white text-gray-600 border-gray-200 hover:border-purple-300"}`}>
                {k}
              </button>
            ))}
          </div>
          <select value={siralama} onChange={e => setSiralama(e.target.value as "puan" | "fiyat")}
            className="shrink-0 border border-gray-200 rounded-xl px-3 py-2 text-xs font-medium outline-none bg-white text-gray-700 cursor-pointer">
            <option value="puan">En Yüksek Puan</option>
            <option value="fiyat">En Uygun Fiyat</option>
          </select>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {liste.map((b) => (
            <div key={b.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all group">
              <Link href={`/isletme/${b.id}`}>
                <div className={`h-44 ${b.renk} flex items-center justify-center relative`}>
                  <span className="text-7xl group-hover:scale-110 transition-transform">{b.emoji}</span>
                  <span className={`absolute top-3 left-3 text-white text-xs font-bold px-2.5 py-1 rounded-full ${b.musaitlik ? "bg-green-500" : "bg-red-400"}`}>
                    {b.musaitlik ? "● Müsait" : "● Dolu"}
                  </span>
                  <span className="absolute bottom-2 right-2 bg-white/90 text-orange-600 text-xs font-black px-2 py-0.5 rounded-full">Gecelik {b.fiyatGoster}</span>
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">{b.kat}</span>
                  <h3 className="font-bold text-gray-900 text-base mt-2 mb-1 group-hover:text-sky-600 transition-colors">{b.isim}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1"><Star size={14} className="text-yellow-400 fill-yellow-400" /><span className="font-bold text-gray-700">{b.puan}</span></div>
                    <div className="flex items-center gap-1"><MapPin size={13} />{b.konum}</div>
                  </div>
                </div>
              </Link>
              <div className="px-5 pb-4">
                <a href={`tel:${b.telefon}`}
                  className="flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white text-sm font-bold py-2.5 rounded-xl transition-colors w-full">
                  <Phone size={14} /> Rezervasyon Yap
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-purple-50 border border-purple-100 rounded-2xl p-8 text-center">
          <div className="text-4xl mb-3">🏨</div>
          <h2 className="text-xl font-black text-gray-900 mb-2">Tesisinizi Ekleyin!</h2>
          <p className="text-gray-500 text-sm mb-4">Pansiyon, otel veya apart olarak platformumuza katılın.</p>
          <Link href="/isletme-kayit" className="inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white font-bold px-6 py-3 rounded-full transition-colors">
            Ücretsiz Ekle →
          </Link>
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}