"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, PackageOpen, CheckCircle } from "lucide-react";

interface SepetItem {
  id: number;
  isim: string;
  fiyat: number;
  adet: number;
  emoji: string;
  isletme: string;
}

interface TeslimatBilgi {
  ad: string;
  telefon: string;
  adres: string;
  not: string;
}

export default function SepetPage() {
  const [items, setItems] = useState<SepetItem[]>([]);
  const [siparisOnay, setSiparisOnay] = useState(false);
  const [teslimat, setTeslimat] = useState<TeslimatBilgi>({ ad: "", telefon: "", adres: "", not: "" });
  const [adresHata, setAdresHata] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("eo_sepet");
      if (raw) setItems(JSON.parse(raw));
    } catch { setItems([]); }
  }, []);

  function save(updated: SepetItem[]) {
    setItems(updated);
    localStorage.setItem("eo_sepet", JSON.stringify(updated));
    window.dispatchEvent(new Event("eo_sepet_guncellendi"));
  }

  function arttir(id: number) { save(items.map(i => i.id === id ? { ...i, adet: i.adet + 1 } : i)); }
  function azalt(id: number) {
    const item = items.find(i => i.id === id);
    if (!item) return;
    if (item.adet <= 1) save(items.filter(i => i.id !== id));
    else save(items.map(i => i.id === id ? { ...i, adet: i.adet - 1 } : i));
  }
  function sil(id: number) { save(items.filter(i => i.id !== id)); }
  function temizle() { save([]); }
  function siparisVer() {
    setAdresHata("");
    if (!teslimat.ad.trim() || !teslimat.telefon.trim() || !teslimat.adres.trim()) {
      setAdresHata("Lütfen ad, telefon ve teslimat adresini doldurun.");
      return;
    }
    try {
      const mevcutlar = JSON.parse(localStorage.getItem("eo_siparisler") || "[]");
      const yeniSiparis = {
        id: Date.now().toString(),
        tarih: new Date().toLocaleString("tr-TR"),
        isletme: items[0]?.isletme || "ErdekOnline",
        urunler: items.map(i => ({ isim: i.isim, adet: i.adet, fiyat: i.fiyat })),
        toplam: items.reduce((acc, i) => acc + i.fiyat * i.adet, 0) + (items.reduce((acc, i) => acc + i.fiyat * i.adet, 0) >= 300 ? 0 : 25),
        durum: "hazirlaniyor" as const,
        teslimat,
      };
      localStorage.setItem("eo_siparisler", JSON.stringify([yeniSiparis, ...mevcutlar]));
    } catch { /* sessiz hata */ }
    save([]);
    setSiparisOnay(true);
  }

  const toplam = items.reduce((acc, i) => acc + i.fiyat * i.adet, 0);
  const teslimatUcreti = items.length > 0 ? (toplam >= 300 ? 0 : 25) : 0;
  const genel = toplam + teslimatUcreti;

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto w-full px-4 py-8 flex-1">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/" className="text-gray-500 hover:text-sky-600 transition-colors"><ArrowLeft size={22} /></Link>
          <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
            <ShoppingCart size={24} className="text-orange-500" /> Sepetim
          </h1>
          {items.length > 0 && (
            <span className="ml-2 bg-orange-100 text-orange-600 text-sm font-bold px-3 py-1 rounded-full">
              {items.reduce((a, i) => a + i.adet, 0)} ürün
            </span>
          )}
        </div>

        {siparisOnay ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <CheckCircle size={72} className="text-green-400 mb-4" />
            <h2 className="text-2xl font-black text-gray-800 mb-2">Siparişiniz Alındı! 🎉</h2>
            <p className="text-gray-500 text-sm mb-6">En kısa sürede işletme sizi arayacak veya siparişiniz hazırlanacak.</p>
            <Link href="/" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-full transition-colors">
              Ana Sayfaya Dön
            </Link>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <PackageOpen size={64} className="text-gray-200 mb-4" />
            <h2 className="text-xl font-black text-gray-700 mb-2">Sepetiniz Boş</h2>
            <p className="text-gray-400 text-sm mb-6">Henüz sepetinize ürün eklemediniz.</p>
            <Link href="/" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-full transition-colors">
              Alışverişe Başla
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 flex flex-col gap-3">
              {items.map(item => (
                <div key={item.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4">
                  <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center text-3xl shrink-0">{item.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm truncate">{item.isim}</p>
                    <p className="text-gray-400 text-xs">{item.isletme}</p>
                    <p className="text-orange-500 font-black text-base mt-1">{(item.fiyat * item.adet).toFixed(0)} ₺</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => azalt(item.id)} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"><Minus size={14} /></button>
                    <span className="w-6 text-center font-bold text-gray-800">{item.adet}</span>
                    <button onClick={() => arttir(item.id)} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"><Plus size={14} /></button>
                    <button onClick={() => sil(item.id)} className="w-8 h-8 rounded-full flex items-center justify-center text-red-400 hover:bg-red-50 transition-colors ml-1"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
              <button onClick={temizle} className="text-red-400 hover:text-red-600 text-sm font-medium text-right mt-1 transition-colors self-end">Sepeti Temizle</button>
            </div>
<div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
                <h3 className="font-black text-gray-900 text-lg mb-4">Sipariş Özeti</h3>
                <div className="flex flex-col gap-2 text-sm text-gray-600 mb-4">
                  <div className="flex justify-between">
                    <span>Ara Toplam</span>
                    <span className="font-semibold text-gray-800">{toplam.toFixed(0)} ₺</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Teslimat</span>
                    <span className={teslimatUcreti === 0 ? "text-green-600 font-semibold" : "font-semibold text-gray-800"}>
                      {teslimatUcreti === 0 ? "Ücretsiz 🎉" : `${teslimatUcreti} ₺`}
                    </span>
                  </div>
                  {teslimatUcreti > 0 && <p className="text-xs text-gray-400">300 ₺ üzeri siparişlerde ücretsiz teslimat!</p>}
                </div>
                <div className="border-t border-gray-100 pt-4 flex justify-between font-black text-gray-900 text-lg mb-5">
                  <span>Toplam</span>
                  <span className="text-orange-500">{genel.toFixed(0)} ₺</span>
                </div>
                {/* Teslimat Bilgileri */}
                <div className="border-t border-gray-100 pt-4 mb-4">
                  <h4 className="font-bold text-gray-800 text-sm mb-3">📦 Teslimat Bilgileri</h4>
                  <div className="flex flex-col gap-2">
                    <input
                      type="text" placeholder="Adınız Soyadınız *"
                      value={teslimat.ad}
                      onChange={e => setTeslimat(t => ({ ...t, ad: e.target.value }))}
                      className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-orange-400 transition-colors"
                    />
                    <input
                      type="tel" placeholder="Telefon Numaranız *"
                      value={teslimat.telefon}
                      onChange={e => setTeslimat(t => ({ ...t, telefon: e.target.value }))}
                      className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-orange-400 transition-colors"
                    />
                    <textarea
                      placeholder="Teslimat Adresi * (Mahalle, Sokak, No...)"
                      value={teslimat.adres}
                      onChange={e => setTeslimat(t => ({ ...t, adres: e.target.value }))}
                      rows={2}
                      className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-orange-400 transition-colors resize-none"
                    />
                    <textarea
                      placeholder="Sipariş notu (isteğe bağlı)"
                      value={teslimat.not}
                      onChange={e => setTeslimat(t => ({ ...t, not: e.target.value }))}
                      rows={1}
                      className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-orange-400 transition-colors resize-none"
                    />
                  </div>
                  {adresHata && (
                    <p className="text-red-500 text-xs mt-2 font-medium">{adresHata}</p>
                  )}
                </div>
                <button onClick={siparisVer} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl transition-colors text-base">
                  Siparişi Tamamla
                </button>
                <Link href="/" className="w-full mt-3 flex items-center justify-center text-sm text-gray-500 hover:text-sky-600 transition-colors">
                  Alışverişe Devam Et
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
