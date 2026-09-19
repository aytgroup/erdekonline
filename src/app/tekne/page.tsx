"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Star, Users, Clock, Phone, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useToast } from "@/components/Toast";

const turlar = [
  { id: 10, isim: "Erdek Mavi Tur", kat: "Tam Gün", puan: 4.9, kapasite: "12 kişi", emoji: "⛵", renk: "bg-blue-100", sure: "Tam Gün", fiyat: "₺850/kişi", telefon: "+90 266 835 00 10" },
  { id: 11, isim: "Adalar Keşif Turu", kat: "Yarım Gün", puan: 4.8, kapasite: "20 kişi", emoji: "🏝️", renk: "bg-sky-100", sure: "Yarım Gün", fiyat: "₺550/kişi", telefon: "+90 266 835 00 11" },
  { id: 12, isim: "Gün Batımı Turu", kat: "Akşam", puan: 5.0, kapasite: "8 kişi", emoji: "🌅", renk: "bg-orange-100", sure: "3 Saat", fiyat: "₺800/kişi", telefon: "+90 266 835 00 12" },
];

const kategoriler = ["Tümü", "Tam Gün", "Yarım Gün", "Akşam"];

export default function TeknePage() {
  const [aktif, setAktif] = useState("Tümü");
  const [favoriler, setFavoriler] = useState<string[]>([]);
  const { goster, ToastContainer } = useToast();
  const liste = turlar.filter(t => aktif === "Tümü" || t.kat === aktif);

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

      {/* Filtre */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 sticky top-[64px] z-30 shadow-sm">
        <div className="max-w-5xl mx-auto flex gap-2 overflow-x-auto">
          {kategoriler.map(k => (
            <button key={k} onClick={() => setAktif(k)}
              className={`shrink-0 text-xs font-bold px-4 py-2 rounded-full border transition-all ${aktif === k ? "bg-sky-500 text-white border-sky-500" : "bg-white text-gray-600 border-gray-200 hover:border-sky-300"}`}>
              {k}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 w-full">
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-8 text-sm text-blue-700 font-medium">
          🌊 Sezon: Mayıs – Ekim · Rezervasyon için arayın: <a href="tel:+902668350000" className="underline font-bold">+90 (266) 835 00 00</a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {liste.map((b) => (
            <div key={b.id} className="relative bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all group">
              <button onClick={(e) => favoriToggle(e, b.id)}
                className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors">
                <Heart size={16} className={favoriler.includes(String(b.id)) ? "fill-red-500 text-red-500" : "text-gray-400"} />
              </button>
              <Link href={`/isletme/${b.id}`}>
                <div className={`h-44 ${b.renk} flex items-center justify-center relative`}>
                  <span className="text-7xl group-hover:scale-110 transition-transform">{b.emoji}</span>
                  <span className="absolute bottom-2 right-2 bg-white/90 text-sky-700 text-xs font-black px-2 py-0.5 rounded-full">{b.fiyat}</span>
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full">{b.kat}</span>
                  <h3 className="font-bold text-gray-900 text-base mt-2 mb-1 group-hover:text-sky-600 transition-colors">{b.isim}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1"><Star size={14} className="text-yellow-400 fill-yellow-400" /><span className="font-bold text-gray-700">{b.puan}</span></div>
                    <div className="flex items-center gap-1"><Users size={13} />{b.kapasite}</div>
                    <div className="flex items-center gap-1"><Clock size={13} />{b.sure}</div>
                  </div>
                </div>
              </Link>
              <div className="px-5 pb-4 flex gap-2">
                <a href={`tel:${b.telefon}`}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-sky-500 hover:bg-sky-600 text-white text-sm font-bold py-2.5 rounded-xl transition-colors">
                  <Phone size={14} /> Rezervasyon
                </a>
                <a href={`https://wa.me/90${b.telefon.replace(/\D/g,"").slice(2)}?text=Merhaba%2C%20${encodeURIComponent(b.isim)}%20i%C3%A7in%20rezervasyon%20yapmak%20istiyorum.`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-sm font-bold px-3 py-2.5 rounded-xl transition-colors">
                  💬
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-sky-50 border border-sky-100 rounded-2xl p-8 text-center">
          <div className="text-4xl mb-3">⛵</div>
          <h2 className="text-xl font-black text-gray-900 mb-2">Tekne Turunuzu Ekleyin!</h2>
          <p className="text-gray-500 text-sm mb-4">Erdek&apos;te tekne turu işletiyorsanız sizi bekliyoruz.</p>
          <Link href="/isletme-kayit" className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold px-6 py-3 rounded-full transition-colors">
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