"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { LogOut, RefreshCw, Trash2, Phone, Mail, MapPin, Clock, Tag, User } from "lucide-react";
import { basvurulariGetir, durumGuncelle, basvuruSil, type Basvuru } from "@/lib/basvurular";

const ADMIN_PIN = "1234";

const durumRenk: Record<Basvuru["durum"], string> = {
  yeni: "bg-orange-100 text-orange-700 border-orange-200",
  goruldu: "bg-blue-100 text-blue-700 border-blue-200",
  onaylandi: "bg-green-100 text-green-700 border-green-200",
  reddedildi: "bg-red-100 text-red-700 border-red-200",
};

const durumLabel: Record<Basvuru["durum"], string> = {
  yeni: "Yeni",
  goruldu: "Görüldü",
  onaylandi: "Onaylandı",
  reddedildi: "Reddedildi",
};

function formatTarih(iso: string) {
  return new Date(iso).toLocaleString("tr-TR", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function BasvuruKart({ b, onRefresh }: { b: Basvuru; onRefresh: () => void }) {
  const [open, setOpen] = useState(false);
  const durum = (d: Basvuru["durum"]) => { durumGuncelle(b.id, d); onRefresh(); };
  const sil = () => {
    if (confirm("Silmek istediğinizden emin misiniz?")) { basvuruSil(b.id); onRefresh(); }
  };
  return (
    <div className={`bg-white rounded-2xl border shadow-sm overflow-hidden ${b.durum === "yeni" ? "border-orange-200" : "border-gray-100"}`}>
      <div className="p-5 cursor-pointer" onClick={() => setOpen(!open)}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-black text-gray-900 text-base">{b.isletmeAdi}</h3>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${durumRenk[b.durum]}`}>{durumLabel[b.durum]}</span>
            </div>
            <p className="text-sm text-gray-500 mt-0.5">{b.kategori} · {formatTarih(b.tarih)}</p>
          </div>
          <span className="text-gray-400 shrink-0">{open ? "▲" : "▼"}</span>
        </div>
      </div>
      {open && (
        <div className="border-t border-gray-100 px-5 pb-5 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600"><User size={15} className="text-gray-400 shrink-0" /><span className="font-medium">{b.yetkili}</span></div>
            <div className="flex items-center gap-2 text-sm text-gray-600"><Phone size={15} className="text-gray-400 shrink-0" /><a href={`tel:${b.telefon}`} className="text-sky-600 hover:underline font-medium">{b.telefon}</a></div>
            <div className="flex items-center gap-2 text-sm text-gray-600"><Mail size={15} className="text-gray-400 shrink-0" /><a href={`mailto:${b.eposta}`} className="text-sky-600 hover:underline">{b.eposta}</a></div>
            <div className="flex items-center gap-2 text-sm text-gray-600"><Clock size={15} className="text-gray-400 shrink-0" /><span>{b.acilis} – {b.kapanis}</span></div>
            <div className="flex items-start gap-2 text-sm text-gray-600 sm:col-span-2"><MapPin size={15} className="text-gray-400 shrink-0 mt-0.5" /><span>{b.adres}</span></div>
            {b.aciklama && <div className="flex items-start gap-2 text-sm text-gray-600 sm:col-span-2"><Tag size={15} className="text-gray-400 shrink-0 mt-0.5" /><span>{b.aciklama}</span></div>}
          </div>
          <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
            {b.durum !== "goruldu" && <button onClick={() => durum("goruldu")} className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200">👁️ Görüldü</button>}
            {b.durum !== "onaylandi" && <button onClick={() => durum("onaylandi")} className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 border border-green-200">✅ Onayla</button>}
            {b.durum !== "reddedildi" && <button onClick={() => durum("reddedildi")} className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 border border-red-200">❌ Reddet</button>}
            <button onClick={sil} className="ml-auto text-xs font-semibold px-3 py-1.5 rounded-lg bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-600 flex items-center gap-1"><Trash2 size={12} /> Sil</button>
          </div>
        </div>
      )}
    </div>
  );
}

function GirisEkrani({ onGiris }: { onGiris: () => void }) {
  const [pin, setPin] = useState("");
  const [hata, setHata] = useState(false);
  const handleGiris = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) { onGiris(); }
    else { setHata(true); setPin(""); }
  };
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm text-center">
        <Image src="/logo.png" alt="ErdekOnline" width={64} height={64} className="mx-auto rounded-full mb-4" priority />
        <h1 className="text-xl font-black text-gray-900 mb-1">Admin Paneli</h1>
        <p className="text-gray-400 text-sm mb-6">ErdekOnline yönetim girişi</p>
        <form onSubmit={handleGiris} className="flex flex-col gap-3">
          <input type="password" value={pin} onChange={e => setPin(e.target.value)}
            placeholder="PIN girin" maxLength={10}
            className={`w-full border rounded-xl px-4 py-3 text-center text-2xl tracking-[0.5em] outline-none transition-colors ${hata ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-orange-400"}`} />
          {hata && <p className="text-red-500 text-sm font-medium">Hatalı PIN, tekrar deneyin.</p>}
          <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors">Giriş Yap</button>
        </form>
        <Link href="/" className="block mt-4 text-xs text-gray-400 hover:text-gray-600">← Ana Sayfaya Dön</Link>
      </div>
    </main>
  );
}

export default function AdminPage() {
  const [giris, setGiris] = useState(false);
  const [basvurular, setBasvurular] = useState<Basvuru[]>([]);
  const [filtre, setFiltre] = useState<"hepsi" | Basvuru["durum"]>("hepsi");

  const yukle = () => setBasvurular(basvurulariGetir());
  useEffect(() => { if (giris) yukle(); }, [giris]);

  if (!giris) return <GirisEkrani onGiris={() => setGiris(true)} />;

  const filtrelenmis = filtre === "hepsi" ? basvurular : basvurular.filter(b => b.durum === filtre);
  const say = (d: Basvuru["durum"]) => basvurular.filter(b => b.durum === d).length;

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 shadow-sm px-4 py-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="ErdekOnline" width={40} height={40} className="rounded-full" />
            <div>
              <h1 className="font-black text-gray-900 text-base leading-none">Admin Paneli</h1>
              <p className="text-xs text-gray-400">İşletme Başvuruları</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={yukle} className="p-2 text-gray-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"><RefreshCw size={18} /></button>
            <button onClick={() => setGiris(false)} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg font-medium"><LogOut size={15} /> Çıkış</button>
          </div>
        </div>
      </header>
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {([["yeni","🔔","Yeni"],["goruldu","👁️","Görüldü"],["onaylandi","✅","Onaylı"],["reddedildi","❌","Reddedilen"]] as const).map(([key,icon,label]) => (
            <button key={key} onClick={() => setFiltre(key)}
              className={`rounded-2xl p-4 text-center border transition-all ${filtre === key ? "bg-orange-500 text-white border-orange-500 shadow-lg" : "bg-white border-gray-100 hover:border-orange-200"}`}>
              <div className="text-2xl mb-1">{icon}</div>
              <div className={`text-2xl font-black ${filtre === key ? "text-white" : "text-gray-900"}`}>{say(key)}</div>
              <div className={`text-xs font-medium ${filtre === key ? "text-orange-100" : "text-gray-400"}`}>{label}</div>
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-black text-gray-900">
            {filtre === "hepsi" ? "Tüm Başvurular" : durumLabel[filtre as Basvuru["durum"]]}
            <span className="ml-2 text-sm font-normal text-gray-400">({filtrelenmis.length} adet)</span>
          </h2>
          {filtre !== "hepsi" && <button onClick={() => setFiltre("hepsi")} className="text-xs text-sky-600 hover:underline font-medium">Tümünü Gör</button>}
        </div>
        {filtrelenmis.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-3">📭</div>
            <p className="text-gray-400 font-medium">Henüz başvuru yok.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtrelenmis.map(b => <BasvuruKart key={b.id} b={b} onRefresh={yukle} />)}
          </div>
        )}
      </div>
    </main>
  );
}