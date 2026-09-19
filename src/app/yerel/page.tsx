"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Star, Leaf, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useToast } from "@/components/Toast";

const urunler = [
  { id: 6, isim: "Yerel Köy Ürünleri", kat: "Zeytin", puan: 4.9, emoji: "🫒", renk: "bg-lime-100", organik: true, etiket: "Zeytinyağı & Zeytin" },
  { id: 13, isim: "Erdek Balıkçısı", kat: "Balık", puan: 4.8, emoji: "🐟", renk: "bg-blue-100", organik: false, etiket: "Taze Balık" },
  { id: 14, isim: "Bağ Evi Peynircisi", kat: "Peynir", puan: 4.7, emoji: "🧀", renk: "bg-yellow-100", organik: true, etiket: "Peynir & Süt Ürünleri" },
  { id: 15, isim: "Erdek Balı", kat: "Bal", puan: 5.0, emoji: "🍯", renk: "bg-amber-100", organik: true, etiket: "Doğal Bal" },
];

const kategoriler = ["Tümü", "Zeytin", "Balık", "Peynir", "Bal"];

export default function YerelPage() {
  const [aktif, setAktif] = useState("Tümü");
  const [sadaceOrganik, setSadaceOrganik] = useState(false);
  const [favoriler, setFavoriler] = useState<string[]>([]);
  const { goster, ToastContainer } = useToast();

  useEffect(() => {
    try { const raw = localStorage.getItem("eo_favoriler"); setFavoriler(raw ? JSON.parse(raw) : []); }
    catch { setFavoriler([]); }
  }, []);

  function favoriToggle(e: React.MouseEvent, id: number) {
    e.preventDefault(); e.stopPropagation();
    const sid = String(id);
    const eklendi = !favoriler.includes(sid);
    const yeni = eklendi ? [...favoriler, sid] : favoriler.filter(f => f !== sid);
    setFavoriler(yeni);
    localStorage.setItem("eo_favoriler", JSON.stringify(yeni));
    goster(eklendi ? "❤️ Favorilere eklendi!" : "Favorilerden kaldırıldı", eklendi ? "success" : "info");
  }

  const liste = urunler
    .filter(b => aktif === "Tümü" || b.kat === aktif)
    .filter(b => !sadaceOrganik || b.organik)
    .sort((a, b) => b.puan - a.puan);

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="bg-white border-b border-gray-100 shadow-sm px-4 py-5">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <Link href="/" className="text-gray-500 hover:text-sky-600 transition-colors"><ArrowLeft size={22} /></Link>
          <div>
            <h1 className="text-2xl font-black text-gray-900">🫒 Yerel Ürünler</h1>
            <p className="text-gray-500 text-sm">{liste.length} üretici listeleniyor</p>
          </div>
        </div>
      </div>

      {/* Filtre bar */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 sticky top-[64px] z-30 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          <div className="flex gap-2 overflow-x-auto">
            {kategoriler.map(k => (
              <button key={k} onClick={() => setAktif(k)}
                className={`shrink-0 text-xs font-bold px-4 py-2 rounded-full border transition-all ${aktif === k ? "bg-lime-500 text-white border-lime-500" : "bg-white text-gray-600 border-gray-200 hover:border-lime-300"}`}>
                {k}
              </button>
            ))}
          </div>
          <button onClick={() => setSadaceOrganik(!sadaceOrganik)}
            className={`shrink-0 flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-full border transition-all ${sadaceOrganik ? "bg-green-500 text-white border-green-500" : "bg-white text-gray-600 border-gray-200"}`}>
            <Leaf size={13} /> Organik
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 w-full">
        {liste.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-3">🌿</div>
            <p className="text-gray-500 font-medium">Bu filtreyle ürün bulunamadı.</p>
            <button onClick={() => { setAktif("Tümü"); setSadaceOrganik(false); }}
              className="mt-4 text-lime-600 font-bold text-sm hover:underline">Filtreleri Temizle</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {liste.map((b) => (
              <div key={b.id} className="relative">
                <button onClick={(e) => favoriToggle(e, b.id)}
                  className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors">
                  <Heart size={16} className={favoriler.includes(String(b.id)) ? "fill-red-500 text-red-500" : "text-gray-400"} />
                </button>
                <Link href={`/isletme/${b.id}`}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all group block">
                <div className={`h-44 ${b.renk} flex items-center justify-center relative`}>
                  <span className="text-7xl group-hover:scale-110 transition-transform">{b.emoji}</span>
                  {b.organik && (
                    <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Leaf size={11} /> Organik
                    </span>
                  )}
                  {b.puan === 5.0 && (
                    <span className="absolute top-3 right-3 bg-yellow-400 text-white text-xs font-bold px-2.5 py-1 rounded-full">⭐ 5.0</span>
                  )}
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold text-lime-700 bg-lime-50 px-2 py-0.5 rounded-full">{b.kat}</span>
                  <h3 className="font-bold text-gray-900 text-base mt-2 mb-1 group-hover:text-sky-600 transition-colors">{b.isim}</h3>
                  <p className="text-gray-400 text-xs mb-3">{b.etiket}</p>
                  <div className="flex items-center gap-1 text-sm">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <span className="font-bold text-gray-700">{b.puan}</span>
                    <span className="text-gray-400 text-xs ml-1">puan</span>
                  </div>
                </div>
              </Link>
              </div>
            ))}
          </div>
        )}

        <div className="bg-lime-50 border border-lime-100 rounded-2xl p-8 text-center">
          <div className="text-4xl mb-3">🌿</div>
          <h2 className="text-xl font-black text-gray-900 mb-2">Yerel Üreticiniz Var mı?</h2>
          <p className="text-gray-500 text-sm mb-4">Erdek&apos;in doğal ürünlerini platformumuzda satın.</p>
          <Link href="/isletme-kayit" className="inline-flex items-center gap-2 bg-lime-500 hover:bg-lime-600 text-white font-bold px-6 py-3 rounded-full transition-colors">
            Ücretsiz Ekle →
          </Link>
        </div>
      </div>
      {ToastContainer}
      <Footer />
      <WhatsAppButton />
    </main>
  );
}