"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Star, Search, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useToast } from "@/components/Toast";
import { dinamikIsletmeleriGetir, type Isletme } from "@/lib/veri";

export default function MarketPage() {
  const [arama, setArama] = useState("");
  const [favoriler, setFavoriler] = useState<string[]>([]);
  const [liste, setListe] = useState<Isletme[]>([]);
  const { goster, ToastContainer } = useToast();

  useEffect(() => {
    setListe(dinamikIsletmeleriGetir().filter(i => i.katKey === "Market"));
    try { const r = localStorage.getItem("eo_favoriler"); setFavoriler(r ? JSON.parse(r) : []); }
    catch { setFavoriler([]); }
  }, []);

  function fav(e: React.MouseEvent, id: number) {
    e.preventDefault(); e.stopPropagation();
    const sid = String(id), ek = !favoriler.includes(sid);
    const y = ek ? [...favoriler, sid] : favoriler.filter(f => f !== sid);
    setFavoriler(y); localStorage.setItem("eo_favoriler", JSON.stringify(y));
    goster(ek ? "Favorilere eklendi!" : "Favorilerden kaldirildi", ek ? "success" : "info");
  }

  const filtreli = liste.filter(b =>
    b.isim.toLowerCase().includes(arama.toLowerCase()) ||
    b.kategori.toLowerCase().includes(arama.toLowerCase())
  );

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="bg-white border-b border-gray-100 shadow-sm px-4 py-5">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <Link href="/" className="text-gray-500 hover:text-sky-600"><ArrowLeft size={22} /></Link>
          <div className="flex-1">
            <h1 className="text-2xl font-black text-gray-900">Market</h1>
            <p className="text-gray-500 text-sm">Erdek&apos;in marketleri kapiniza gelsin</p>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
            <Search size={15} className="text-gray-400" />
            <input type="text" placeholder="Market ara..." value={arama} onChange={e => setArama(e.target.value)}
              className="outline-none text-sm bg-transparent text-gray-800 placeholder-gray-400 w-32" />
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-8 w-full">
        {filtreli.length === 0 ? (
          <div className="text-center py-16"><p className="text-gray-500 font-medium">Market bulunamadi.</p></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {filtreli.map(b => (
              <div key={b.id} className="relative">
                <button onClick={e => fav(e, b.id)} className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md hover:bg-red-50">
                  <Heart size={16} className={favoriler.includes(String(b.id)) ? "fill-red-500 text-red-500" : "text-gray-400"} />
                </button>
                <Link href={`/isletme/${b.id}`} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all group block">
                  <div className={`h-40 bg-gradient-to-br ${b.gradient} flex items-center justify-center relative`}>
                    <span className="text-7xl group-hover:scale-110 transition-transform">{b.emoji}</span>
                    {b.musaitlik && <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">Acik</span>}
                    {b.minSiparis && <span className="absolute bottom-2 right-2 bg-white/90 text-gray-700 text-xs font-bold px-2 py-0.5 rounded-full">Min. {b.minSiparis}</span>}
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">{b.kategori}</span>
                    <h3 className="font-bold text-gray-900 text-base mt-2 mb-1 group-hover:text-sky-600">{b.isim}</h3>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="flex items-center gap-1"><Star size={14} className="text-yellow-400 fill-yellow-400" /><span className="font-bold text-gray-700">{b.puan > 0 ? b.puan : "Yeni"}</span></span>
                      <span className="flex items-center gap-1"><Clock size={14} />{b.sure}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
        <div className="bg-green-50 border border-green-100 rounded-2xl p-8 text-center">
          <div className="text-4xl mb-3">🏪</div>
          <h2 className="text-xl font-black text-gray-900 mb-2">Marketiniz Burada Olsun!</h2>
          <p className="text-gray-500 text-sm mb-4">Marketinizi ErdekOnline&apos;a ekleyin.</p>
          <Link href="/isletme-kayit" className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-full transition-colors">Ucretsiz Ekle</Link>
        </div>
      </div>
      {ToastContainer}<Footer /><WhatsAppButton />
    </main>
  );
}

﻿
