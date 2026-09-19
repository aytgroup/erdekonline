"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Heart, ArrowLeft, Star, Clock } from "lucide-react";

const tumIsletmeler: Record<string, { isim: string; kategori: string; puan: number; sure: string; emoji: string; renk: string }> = {
  "1": { isim: "Kalamar Balık Restaurant", kategori: "Balık & Deniz Ürünleri", puan: 4.9, sure: "25-40 dk", emoji: "🐟", renk: "bg-blue-100" },
  "2": { isim: "Erdek Pide & Lahmacun", kategori: "Pide & Lahmacun", puan: 4.7, sure: "20-35 dk", emoji: "🍕", renk: "bg-orange-100" },
  "3": { isim: "Şevket Market", kategori: "Market & Bakkal", puan: 4.6, sure: "15-25 dk", emoji: "🛒", renk: "bg-green-100" },
  "4": { isim: "Erdek Burger & Döner", kategori: "Burger & Fast Food", puan: 4.5, sure: "20-30 dk", emoji: "🍔", renk: "bg-yellow-100" },
  "5": { isim: "Tatlı Dükkanı Erdek", kategori: "Tatlı & Pasta", puan: 4.8, sure: "30-45 dk", emoji: "🍰", renk: "bg-pink-100" },
  "6": { isim: "Yerel Köy Ürünleri", kategori: "Yerel & Organik", puan: 4.9, sure: "Aynı Gün", emoji: "🫒", renk: "bg-lime-100" },
  "7": { isim: "Erdek Manav", kategori: "Meyve & Sebze", puan: 4.7, sure: "20-30 dk", emoji: "🥦", renk: "bg-emerald-100" },
  "12": { isim: "Gün Batımı Turu", kategori: "Romantik Tekne Turu", puan: 5.0, sure: "3 Saat", emoji: "🌅", renk: "bg-orange-100" },
  "13": { isim: "Erdek Balıkçısı", kategori: "Taze Balık", puan: 4.8, sure: "Aynı Gün", emoji: "🐟", renk: "bg-blue-100" },
  "14": { isim: "Bağ Evi Peynircisi", kategori: "Peynir & Süt Ürünleri", puan: 4.7, sure: "Aynı Gün", emoji: "🧀", renk: "bg-yellow-100" },
  "15": { isim: "Erdek Balı", kategori: "Doğal Bal", puan: 5.0, sure: "Aynı Gün", emoji: "🍯", renk: "bg-amber-100" },
  "20": { isim: "Erdek Sahil Pansiyon", kategori: "Pansiyon", puan: 4.7, sure: "Rezervasyon", emoji: "🏨", renk: "bg-blue-100" },
  "21": { isim: "Ada Manzara Butik Otel", kategori: "Butik Otel", puan: 4.9, sure: "Rezervasyon", emoji: "🏩", renk: "bg-purple-100" },
  "22": { isim: "Erdek Apart Otel", kategori: "Apart Otel", puan: 4.5, sure: "Rezervasyon", emoji: "🏠", renk: "bg-green-100" },
};

export default function FavorilerPage() {
  const [favoriler, setFavoriler] = useState<string[]>([]);
  const [yuklendi, setYuklendi] = useState(false);

  useEffect(() => {
    try {
      const kullanici = localStorage.getItem("eo_aktif_kullanici");
      if (!kullanici) { window.location.href = "/giris"; return; }
      const raw = localStorage.getItem("eo_favoriler");
      setFavoriler(raw ? JSON.parse(raw) : []);
    } catch { setFavoriler([]); }
    setYuklendi(true);
  }, []);

  function favoriKaldir(id: string) {
    const yeni = favoriler.filter(f => f !== id);
    setFavoriler(yeni);
    localStorage.setItem("eo_favoriler", JSON.stringify(yeni));
  }

  const favoriIsletmeler = favoriler.map(id => ({ id, ...tumIsletmeler[id] })).filter(f => f.isim);

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto w-full px-4 py-8 flex-1">
        <Link href="/profil" className="inline-flex items-center gap-2 text-gray-500 hover:text-sky-600 text-sm font-medium mb-6 transition-colors">
          <ArrowLeft size={16} /> Profile Dön
        </Link>
        <div className="flex items-center gap-3 mb-8">
          <Heart size={26} className="text-red-500 fill-red-500" />
          <h1 className="text-2xl font-black text-gray-900">Favorilerim</h1>
          {favoriIsletmeler.length > 0 && (
            <span className="bg-red-100 text-red-600 text-sm font-bold px-3 py-1 rounded-full">
              {favoriIsletmeler.length} işletme
            </span>
          )}
        </div>

        {favoriIsletmeler.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Heart size={64} className="text-gray-200 mb-4" />
            <h2 className="text-xl font-black text-gray-700 mb-2">Henüz Favori Yok</h2>
            <p className="text-gray-400 text-sm mb-6">İşletme sayfalarındaki kalp ikonuna tıklayarak favori ekleyebilirsiniz.</p>
            <Link href="/isletmeler" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-full transition-colors">
              İşletmeleri Keşfet
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {favoriIsletmeler.map(item => (
              <div key={item.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all group relative">
                <button onClick={() => favoriKaldir(item.id)}
                  className="absolute top-3 right-3 z-10 p-1.5 bg-white rounded-full shadow-md text-red-500 hover:bg-red-50 transition-colors">
                  <Heart size={16} className="fill-red-500" />
                </button>
                <Link href={`/isletme/${item.id}`}>
                  <div className={`h-36 ${item.renk} flex items-center justify-center`}>
                    <span className="text-6xl group-hover:scale-110 transition-transform">{item.emoji}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-sky-600 transition-colors">{item.isim}</h3>
                    <p className="text-gray-400 text-xs mb-3">{item.kategori}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                        <span className="font-bold text-gray-700">{item.puan}</span>
                      </div>
                      <div className="flex items-center gap-1"><Clock size={12} />{item.sure}</div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}