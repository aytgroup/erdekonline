"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { LogOut, Store, Phone, Mail, MapPin, Clock, CheckCircle, AlertCircle, Package, BarChart3, Users, Star, ChevronDown } from "lucide-react";
import { isletmeSiparisleri, isletmeIstatistik, siparisGuncelle, type Siparis } from "@/lib/siparis";
import Footer from "@/components/Footer";

interface AktifIsletme {
  isletmeAdi: string; kategori: string; aciklama: string;
  acilis: string; kapanis: string; yetkili: string;
  telefon: string; eposta: string; adres: string;
  durum: string; tarih: string;
}

export default function IsletmePanelPage() {
  const router = useRouter();
  const [isletme, setIsletme] = useState<AktifIsletme | null>(null);
  const [siparisler, setSiparisler] = useState<Siparis[]>([]);
  const [istat, setIstat] = useState({ toplamSiparis: 0, teslimEdilen: 0, toplamKazanc: 0, aktifSiparis: 0 });
  const [acikSiparis, setAcikSiparis] = useState<string | null>(null);

  function siparisleriYukle(isletmeAdi: string) {
    const s = isletmeSiparisleri(isletmeAdi);
    setSiparisler(s);
    setIstat(isletmeIstatistik(isletmeAdi));
  }

  useEffect(() => {
    try {
      const raw = localStorage.getItem("eo_aktif_isletme");
      if (!raw) { router.replace("/isletme-giris"); return; }
      const parsed = JSON.parse(raw);
      setIsletme(parsed);
      siparisleriYukle(parsed.isletmeAdi);
    } catch { router.replace("/isletme-giris"); }

    const handler = () => {
      const raw = localStorage.getItem("eo_aktif_isletme");
      if (raw) {
        const parsed = JSON.parse(raw);
        siparisleriYukle(parsed.isletmeAdi);
      }
    };
    window.addEventListener("eo_yeni_siparis", handler);
    window.addEventListener("eo_siparis_guncellendi", handler);
    return () => {
      window.removeEventListener("eo_yeni_siparis", handler);
      window.removeEventListener("eo_siparis_guncellendi", handler);
    };
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
        {/* Istatistik Kartlari — Gercek Veri */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: <Package size={20} className="text-orange-500" />, label: "Toplam Siparis", value: String(istat.toplamSiparis), bg: "bg-orange-50" },
            { icon: <CheckCircle size={20} className="text-green-500" />, label: "Teslim Edilen", value: String(istat.teslimEdilen), bg: "bg-green-50" },
            { icon: <AlertCircle size={20} className="text-yellow-500" />, label: "Aktif Siparis", value: String(istat.aktifSiparis), bg: "bg-yellow-50" },
            { icon: <BarChart3 size={20} className="text-sky-500" />, label: "Toplam Kazanc", value: istat.toplamKazanc > 0 ? `${istat.toplamKazanc.toLocaleString("tr-TR")} TL` : "—", bg: "bg-sky-50" },
          ].map((s, i) => (
            <div key={i} className={`${s.bg} rounded-2xl p-5 flex flex-col gap-2`}>
              {s.icon}
              <p className="text-2xl font-black text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500 font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2"><Package size={20} className="text-orange-500" /><h2 className="font-black text-gray-900 text-lg">Siparisler</h2></div>
            {istat.aktifSiparis > 0 && <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full animate-pulse">{istat.aktifSiparis} Yeni</span>}
          </div>
          {siparisler.length === 0 ? (
            <div className="text-center py-10">
              <div className="text-5xl mb-3">📦</div>
              <p className="text-gray-500 font-medium">Henuz siparis yok.</p>
              <p className="text-gray-400 text-sm mt-1">Yeni siparisler burada gorunecek.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {siparisler.map(s => (
                <div key={s.id} className={`border rounded-xl overflow-hidden ${s.durum === "hazirlaniyor" ? "border-orange-200 bg-orange-50" : s.durum === "yolda" ? "border-blue-200 bg-blue-50" : s.durum === "teslim_edildi" ? "border-green-200 bg-green-50" : "border-gray-200 bg-gray-50"}`}>
                  <div className="p-4 flex items-center justify-between cursor-pointer" onClick={() => setAcikSiparis(acikSiparis === s.id ? null : s.id)}>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full text-white ${s.durum === "hazirlaniyor" ? "bg-orange-500" : s.durum === "yolda" ? "bg-blue-500" : s.durum === "teslim_edildi" ? "bg-green-500" : "bg-gray-400"}`}>
                          {s.durum === "hazirlaniyor" ? "Hazirlaniyor" : s.durum === "yolda" ? "Yolda" : s.durum === "teslim_edildi" ? "Teslim Edildi" : "Iptal"}
                        </span>
                        <span className="text-xs text-gray-500">{s.tarih}</span>
                      </div>
                      <p className="font-bold text-gray-900 text-sm">{s.urunler.map(u => u.isim).join(", ")}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{s.teslimat?.ad} — {s.toplam.toLocaleString("tr-TR")} TL</p>
                    </div>
                    <ChevronDown size={16} className={`text-gray-400 transition-transform ${acikSiparis === s.id ? "rotate-180" : ""}`} />
                  </div>
                  {acikSiparis === s.id && (
                    <div className="border-t border-gray-200 px-4 py-4 bg-white">
                      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                        <div><p className="text-xs font-semibold text-gray-400 mb-1">Musteri</p><p className="font-medium">{s.teslimat?.ad}</p></div>
                        <div><p className="text-xs font-semibold text-gray-400 mb-1">Telefon</p><a href={`tel:${s.teslimat?.telefon}`} className="font-medium text-sky-600">{s.teslimat?.telefon}</a></div>
                        <div className="col-span-2"><p className="text-xs font-semibold text-gray-400 mb-1">Adres</p><p className="text-gray-700">{s.teslimat?.adres}</p></div>
                        {s.teslimat?.not && <div className="col-span-2"><p className="text-xs font-semibold text-gray-400 mb-1">Not</p><p className="italic text-gray-700">{s.teslimat.not}</p></div>}
                        <div className="col-span-2">
                          <p className="text-xs font-semibold text-gray-400 mb-2">Urunler</p>
                          {s.urunler.map((u, i) => <div key={i} className="flex justify-between text-sm py-1 border-b border-gray-100 last:border-0"><span>{u.isim} x{u.adet}</span><span className="font-bold">{(u.fiyat * u.adet).toLocaleString("tr-TR")} TL</span></div>)}
                          <div className="flex justify-between font-black text-base mt-2"><span>Toplam</span><span className="text-orange-600">{s.toplam.toLocaleString("tr-TR")} TL</span></div>
                        </div>
                      </div>
                      {s.durum !== "teslim_edildi" && s.durum !== "iptal" && (
                        <div className="flex gap-2 mt-2">
                          {s.durum === "hazirlaniyor" && <button onClick={() => siparisGuncelle(s.id, "yolda")} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 rounded-xl text-sm">Yola Cikti</button>}
                          {s.durum === "yolda" && <button onClick={() => siparisGuncelle(s.id, "teslim_edildi")} className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 rounded-xl text-sm">Teslim Edildi</button>}
                          <button onClick={() => siparisGuncelle(s.id, "iptal")} className="px-4 bg-red-50 hover:bg-red-100 text-red-600 font-bold py-2.5 rounded-xl text-sm border border-red-200">Iptal</button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="text-center"><Link href="/" className="text-sm text-gray-400 hover:text-sky-600 transition-colors">← Ana Sayfaya Dön</Link></div>
      </div>
      <Footer />
    </main>
  );
}