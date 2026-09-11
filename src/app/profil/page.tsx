"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { User, Mail, Phone, Calendar, LogOut, ShoppingBag, Heart, Settings, ArrowLeft } from "lucide-react";

interface Kullanici { ad: string; soyad: string; email: string; telefon: string; kayitTarihi: string; }

export default function ProfilPage() {
  const router = useRouter();
  const [kullanici, setKullanici] = useState<Kullanici | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("eo_aktif_kullanici");
      if (raw) setKullanici(JSON.parse(raw));
      else router.push("/giris");
    } catch { router.push("/giris"); }
  }, [router]);

  function cikisYap() {
    localStorage.removeItem("eo_aktif_kullanici");
    router.push("/");
  }

  if (!kullanici) {
    return (
      <main className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-400 text-sm">Yükleniyor...</div>
        </div>
        <Footer />
      </main>
    );
  }

  const kayitTarihi = new Date(kullanici.kayitTarihi).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto w-full px-4 py-8 flex-1">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-sky-600 text-sm font-medium mb-6 transition-colors">
          <ArrowLeft size={16} /> Ana Sayfaya Dön
        </Link>

        {/* Profil kartı */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-sky-500 to-blue-600 px-8 py-10 flex items-center gap-6">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center border-4 border-white/40">
              <span className="text-4xl font-black text-white">{kullanici.ad[0]}{kullanici.soyad[0]}</span>
            </div>
            <div>
              <h1 className="text-white font-black text-2xl">{kullanici.ad} {kullanici.soyad}</h1>
              <p className="text-sky-200 text-sm mt-1">ErdekOnline Üyesi</p>
              <p className="text-sky-200 text-xs mt-0.5">Üyelik: {kayitTarihi}</p>
            </div>
          </div>
          <div className="px-8 py-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center shrink-0">
                <Mail size={18} className="text-sky-500" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">E-posta</p>
                <p className="text-sm font-semibold text-gray-800 truncate">{kullanici.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
                <Phone size={18} className="text-green-500" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Telefon</p>
                <p className="text-sm font-semibold text-gray-800">{kullanici.telefon}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center shrink-0">
                <Calendar size={18} className="text-purple-500" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Üyelik Tarihi</p>
                <p className="text-sm font-semibold text-gray-800">{kayitTarihi}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Menü */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <Link href="/siparisler" className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all group">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-orange-200 transition-colors">
              <ShoppingBag size={22} className="text-orange-500" />
            </div>
            <div>
              <p className="font-bold text-gray-900">Siparişlerim</p>
              <p className="text-gray-400 text-sm">Geçmiş siparişleriniz</p>
            </div>
          </Link>
          <Link href="/favoriler" className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all group">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-red-200 transition-colors">
              <Heart size={22} className="text-red-500" />
            </div>
            <div>
              <p className="font-bold text-gray-900">Favorilerim</p>
              <p className="text-gray-400 text-sm">Beğendiğiniz işletmeler</p>
            </div>
          </Link>
        </div>

        {/* Çıkış */}
        <button onClick={cikisYap}
          className="w-full bg-white border border-red-100 text-red-500 hover:bg-red-50 font-bold py-4 rounded-2xl transition-colors flex items-center justify-center gap-2">
          <LogOut size={18} /> Çıkış Yap
        </button>
      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}