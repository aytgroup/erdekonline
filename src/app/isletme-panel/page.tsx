"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { LogOut, Store, Phone, Mail, MapPin, Clock, CheckCircle, AlertCircle, Package } from "lucide-react";

interface AktifIsletme {
  isletmeAdi: string; kategori: string; aciklama: string;
  acilis: string; kapanis: string; yetkili: string;
  telefon: string; eposta: string; adres: string;
  durum: string; tarih: string;
}

export default function IsletmePanelPage() {
  const router = useRouter();
  const [isletme, setIsletme] = useState<AktifIsletme | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("eo_aktif_isletme");
      if (!raw) { router.replace("/isletme-giris"); return; }
      setIsletme(JSON.parse(raw));
    } catch { router.replace("/isletme-giris"); }
  }, [router]);

  if (!isletme) return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-gray-400 text-sm">Yükleniyor...</p>
    </main>
  );

  const aktif = isletme.durum === "onaylandi";
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 shadow-sm px-4 py-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.svg" alt="ErdekOnline" width={40} height={40} className="rounded-full" />
            <div>
              <h1 className="font-black text-gray-900 text-base leading-none">İşletme Paneli</h1>
              <p className="text-xs text-gray-400 mt-0.5">{isletme.isletmeAdi}</p>
            </div>
          </div>
          <button onClick={() => { localStorage.removeItem("eo_aktif_isletme"); router.push("/isletme-giris"); }}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg font-medium transition-colors">
            <LogOut size={15} /> Çıkış
          </button>
        </div>
      </header>
      <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col gap-6">
        <div className={`rounded-2xl p-6 flex items-start gap-4 ${aktif ? "bg-green-50 border border-green-200" : "bg-orange-50 border border-orange-200"}`}>
          {aktif ? <CheckCircle size={28} className="text-green-500 shrink-0 mt-0.5" /> : <AlertCircle size={28} className="text-orange-400 shrink-0 mt-0.5" />}
          <div>
            <p className={`font-black text-lg ${aktif ? "text-green-800" : "text-orange-700"}`}>
              {aktif ? "İşletmeniz Aktif!" : "Başvurunuz İnceleniyor"}
            </p>
            <p className={`text-sm mt-1 ${aktif ? "text-green-600" : "text-orange-500"}`}>
              {aktif ? "Müşteriler artık sizi ErdekOnline üzerinden bulabilir ve sipariş verebilir." : "Ekibimiz başvurunuzu 24 saat içinde inceleyerek sizi arayacak."}
            </p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-5">
            <Store size={20} className="text-orange-500" />
            <h2 className="font-black text-gray-900 text-lg">İşletme Bilgileri</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">İşletme Adı</p><p className="font-bold text-gray-900">{isletme.isletmeAdi}</p></div>
            <div><p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Kategori</p><p className="font-medium text-gray-700">{isletme.kategori}</p></div>
            {isletme.aciklama && <div className="sm:col-span-2"><p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Açıklama</p><p className="text-gray-600 text-sm leading-relaxed">{isletme.aciklama}</p></div>}
            <div className="flex items-center gap-2 text-sm text-gray-600 sm:col-span-2">
              <Clock size={14} className="text-gray-400 shrink-0" />
              <span>Çalışma: <span className="font-semibold">{isletme.acilis} – {isletme.kapanis}</span></span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-black text-gray-900 text-lg mb-5">İletişim Bilgileri</h2>
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex items-center gap-3"><Phone size={15} className="text-sky-400 shrink-0" /><a href={`tel:${isletme.telefon}`} className="text-sky-600 hover:underline font-medium">{isletme.telefon}</a></div>
            <div className="flex items-center gap-3"><Mail size={15} className="text-sky-400 shrink-0" /><a href={`mailto:${isletme.eposta}`} className="text-sky-600 hover:underline">{isletme.eposta}</a></div>
            <div className="flex items-start gap-3 text-gray-600"><MapPin size={15} className="text-sky-400 shrink-0 mt-0.5" /><span>{isletme.adres}</span></div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4"><Package size={20} className="text-orange-500" /><h2 className="font-black text-gray-900 text-lg">Siparişler</h2></div>
          <div className="text-center py-10">
            <div className="text-5xl mb-3">📦</div>
            <p className="text-gray-500 font-medium">Henüz sipariş yok.</p>
            <p className="text-gray-400 text-sm mt-1">Yeni siparişler burada görünecek.</p>
          </div>
        </div>
        <div className="text-center"><Link href="/" className="text-sm text-gray-400 hover:text-sky-600 transition-colors">← Ana Sayfaya Dön</Link></div>
      </div>
    </main>
  );
}