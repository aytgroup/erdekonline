"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ShoppingBag, ArrowLeft, Clock, CheckCircle } from "lucide-react";

interface Siparis {
  id: string;
  tarih: string;
  isletme: string;
  urunler: { isim: string; adet: number; fiyat: number }[];
  toplam: number;
  durum: "hazirlaniyor" | "yolda" | "teslim_edildi";
}

export default function SiparislerPage() {
  const [siparisler, setSiparisler] = useState<Siparis[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("eo_siparisler");
      setSiparisler(raw ? JSON.parse(raw) : []);
    } catch { setSiparisler([]); }
  }, []);

  const durumLabel: Record<Siparis["durum"], string> = {
    hazirlaniyor: "Hazırlanıyor",
    yolda: "Yolda",
    teslim_edildi: "Teslim Edildi",
  };

  const durumRenk: Record<Siparis["durum"], string> = {
    hazirlaniyor: "bg-orange-100 text-orange-700",
    yolda: "bg-blue-100 text-blue-700",
    teslim_edildi: "bg-green-100 text-green-700",
  };

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto w-full px-4 py-8 flex-1">
        <Link href="/profil" className="inline-flex items-center gap-2 text-gray-500 hover:text-sky-600 text-sm font-medium mb-6 transition-colors">
          <ArrowLeft size={16} /> Profile Dön
        </Link>
        <div className="flex items-center gap-3 mb-8">
          <ShoppingBag size={26} className="text-orange-500" />
          <h1 className="text-2xl font-black text-gray-900">Siparişlerim</h1>
        </div>

        {siparisler.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <ShoppingBag size={64} className="text-gray-200 mb-4" />
            <h2 className="text-xl font-black text-gray-700 mb-2">Henüz Sipariş Yok</h2>
            <p className="text-gray-400 text-sm mb-6">İlk siparişinizi vermek için işletmelere göz atın.</p>
            <Link href="/isletmeler" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-full transition-colors">
              Sipariş Ver
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {siparisler.map(siparis => (
              <div key={siparis.id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-black text-gray-900">{siparis.isletme}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                      <Clock size={11} /> {siparis.tarih}
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${durumRenk[siparis.durum]}`}>
                    {durumLabel[siparis.durum]}
                  </span>
                </div>
                <div className="border-t border-gray-100 pt-3 flex flex-col gap-1.5">
                  {siparis.urunler.map((u, i) => (
                    <div key={i} className="flex justify-between text-sm text-gray-600">
                      <span>{u.isim} x{u.adet}</span>
                      <span className="font-semibold text-gray-800">{(u.fiyat * u.adet).toFixed(0)} ₺</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between items-center">
                  <span className="text-sm text-gray-500">Toplam</span>
                  <span className="font-black text-orange-500 text-base">{siparis.toplam.toFixed(0)} ₺</span>
                </div>
                {siparis.durum === "teslim_edildi" && (
                  <div className="mt-3 flex items-center gap-2 text-green-600 text-xs font-semibold">
                    <CheckCircle size={14} /> Siparişiniz teslim edildi
                  </div>
                )}
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