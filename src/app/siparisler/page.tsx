"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ShoppingBag, ArrowLeft, Clock, CheckCircle, ChevronDown, MapPin, Phone, FileText, Package, Truck } from "lucide-react";

interface TeslimatBilgi { ad: string; telefon: string; adres: string; not: string; }
interface Siparis {
  id: string; tarih: string; isletme: string;
  urunler: { isim: string; adet: number; fiyat: number }[];
  toplam: number;
  durum: "hazirlaniyor" | "yolda" | "teslim_edildi";
  teslimat?: TeslimatBilgi;
}

const durumLabel: Record<Siparis["durum"], string> = {
  hazirlaniyor: "Hazırlanıyor", yolda: "Yolda", teslim_edildi: "Teslim Edildi",
};
const durumRenk: Record<Siparis["durum"], string> = {
  hazirlaniyor: "bg-orange-100 text-orange-700",
  yolda: "bg-blue-100 text-blue-700",
  teslim_edildi: "bg-green-100 text-green-700",
};
const durumAdimlar: Siparis["durum"][] = ["hazirlaniyor", "yolda", "teslim_edildi"];
const durumIkon = { hazirlaniyor: Package, yolda: Truck, teslim_edildi: CheckCircle };

function SiparisKart({ siparis }: { siparis: Siparis }) {
  const [acik, setAcik] = useState(false);
  const adimIdx = durumAdimlar.indexOf(siparis.durum);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-5 cursor-pointer" onClick={() => setAcik(!acik)}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="font-black text-gray-900 truncate">{siparis.isletme}</p>
            <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
              <Clock size={11} /> {siparis.tarih}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${durumRenk[siparis.durum]}`}>{durumLabel[siparis.durum]}</span>
            <ChevronDown size={16} className={`text-gray-400 transition-transform ${acik ? "rotate-180" : ""}`} />
          </div>
        </div>
        <div className="flex items-center mt-4">
          {durumAdimlar.map((d, i) => {
            const Icon = durumIkon[d];
            const ok = i <= adimIdx;
            return (
              <div key={d} className="flex items-center flex-1">
                <div className={`flex flex-col items-center gap-1 flex-1 ${i===0?"items-start":i===2?"items-end":"items-center"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${ok?"bg-green-500 border-green-500 text-white":"bg-white border-gray-200 text-gray-300"}`}>
                    <Icon size={14} />
                  </div>
                  <span className={`text-xs font-medium ${ok?"text-green-600":"text-gray-300"}`}>{durumLabel[d]}</span>
                </div>
                {i < 2 && <div className={`h-0.5 flex-1 mx-1 mb-4 ${i < adimIdx?"bg-green-400":"bg-gray-100"}`} />}
              </div>
            );
          })}
        </div>
      </div>
      {acik && (
        <div className="border-t border-gray-100 px-5 pb-5 pt-4 space-y-4">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Siparis Urunleri</p>
            <div className="flex flex-col gap-1.5">
              {siparis.urunler.map((u, i) => (
                <div key={i} className="flex justify-between text-sm text-gray-600">
                  <span>{u.isim} <span className="text-gray-400">x{u.adet}</span></span>
                  <span className="font-semibold text-gray-800">{(u.fiyat * u.adet).toFixed(0)} ₺</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between items-center">
              <span className="text-sm text-gray-500 font-medium">Toplam</span>
              <span className="font-black text-orange-500 text-base">{siparis.toplam.toFixed(0)} ₺</span>
            </div>
          </div>
          {siparis.teslimat && (
            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Teslimat Bilgileri</p>
              {siparis.teslimat.ad && <div className="text-sm font-medium text-gray-700">{siparis.teslimat.ad}</div>}
              {siparis.teslimat.telefon && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone size={13} className="text-gray-400 shrink-0" />
                  <a href={`tel:${siparis.teslimat.telefon}`} className="text-sky-600 hover:underline">{siparis.teslimat.telefon}</a>
                </div>
              )}
              {siparis.teslimat.adres && (
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <MapPin size={13} className="text-gray-400 shrink-0 mt-0.5" />
                  <span>{siparis.teslimat.adres}</span>
                </div>
              )}
              {siparis.teslimat.not && (
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <FileText size={13} className="text-gray-400 shrink-0 mt-0.5" />
                  <span className="italic">{siparis.teslimat.not}</span>
                </div>
              )}
            </div>
          )}
          {siparis.durum === "teslim_edildi" && (
            <div className="flex items-center gap-2 text-green-600 text-sm font-semibold bg-green-50 rounded-xl px-4 py-3">
              <CheckCircle size={16} /> Siparisiniz basariyla teslim edildi!
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function SiparislerPage() {
  const [siparisler, setSiparisler] = useState<Siparis[]>([]);
  useEffect(() => {
    try { const raw = localStorage.getItem("eo_siparisler"); setSiparisler(raw ? JSON.parse(raw) : []); }
    catch { setSiparisler([]); }
  }, []);
  const aktif = siparisler.filter(s => s.durum !== "teslim_edildi");
  const gecmis = siparisler.filter(s => s.durum === "teslim_edildi");
  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto w-full px-4 py-8 flex-1">
        <Link href="/profil" className="inline-flex items-center gap-2 text-gray-500 hover:text-sky-600 text-sm font-medium mb-6 transition-colors">
          <ArrowLeft size={16} /> Profile Don
        </Link>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <ShoppingBag size={26} className="text-orange-500" />
            <h1 className="text-2xl font-black text-gray-900">Siparislerim</h1>
          </div>
          {siparisler.length > 0 && (
            <span className="bg-orange-100 text-orange-600 text-sm font-bold px-3 py-1 rounded-full">{siparisler.length} siparis</span>
          )}
        </div>
        {siparisler.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <ShoppingBag size={64} className="text-gray-200 mb-4" />
            <h2 className="text-xl font-black text-gray-700 mb-2">Henuz Siparis Yok</h2>
            <p className="text-gray-400 text-sm mb-6">Ilk siparisini vermek icin isletmelere goz atin.</p>
            <Link href="/isletmeler" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-full transition-colors">Siparis Ver</Link>
          </div>
        ) : (
          <div className="space-y-6">
            {aktif.length > 0 && (
              <div>
                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Aktif Siparisler</h2>
                <div className="flex flex-col gap-4">{aktif.map(s => <SiparisKart key={s.id} siparis={s} />)}</div>
              </div>
            )}
            {gecmis.length > 0 && (
              <div>
                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Teslim Edilenler</h2>
                <div className="flex flex-col gap-4">{gecmis.map(s => <SiparisKart key={s.id} siparis={s} />)}</div>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
