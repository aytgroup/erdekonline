"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Building2, Phone, Mail, MapPin, ChevronDown } from "lucide-react";
import { basvuruKaydet } from "@/lib/basvurular";

const cats = [
  "Restoran / Kafe", "Market / Bakkal", "Tekne Turu",
  "Konaklama / Pansiyon", "Yerel Ürünler", "Kuaför / Güzellik",
  "Eczane", "Diğer Hizmetler",
];

function Step1({ onSubmit }: { onSubmit: (e: React.FormEvent<HTMLFormElement>) => void }) {
  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-xl font-black text-gray-900 mb-2 flex items-center gap-2">
        <Building2 size={20} className="text-orange-500" /> İşletme Bilgileri
      </h2>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">İşletme Adı *</label>
        <input required name="isletmeAdi" type="text" placeholder="Örn: Kalamar Balık Restaurant"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400 transition-colors" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Kategori *</label>
        <div className="relative">
          <select required name="kategori" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400 appearance-none bg-white">
            <option value="">Kategori seçin...</option>
            {cats.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Açıklama</label>
        <textarea name="aciklama" rows={3} placeholder="İşletmenizi kısaca tanıtın..."
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400 transition-colors resize-none" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Açılış</label>
          <input name="acilis" type="time" defaultValue="09:00" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Kapanış</label>
          <input name="kapanis" type="time" defaultValue="22:00" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400" />
        </div>
      </div>
      <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl transition-colors text-base mt-2">
        Devam Et →
      </button>
    </form>
  );
}

function Step2({ onSubmit, onBack }: { onSubmit: (e: React.FormEvent<HTMLFormElement>) => void; onBack: () => void }) {
  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-xl font-black text-gray-900 mb-2 flex items-center gap-2">
        <Phone size={20} className="text-orange-500" /> İletişim Bilgileri
      </h2>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Yetkili Adı Soyadı *</label>
        <input required name="yetkili" type="text" placeholder="Ad Soyad"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400 transition-colors" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Telefon *</label>
        <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 gap-3 focus-within:border-orange-400 transition-colors">
          <Phone size={16} className="text-gray-400 shrink-0" />
          <input required name="telefon" type="tel" placeholder="05XX XXX XX XX" className="flex-1 outline-none text-sm text-gray-800 placeholder-gray-400" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">E-posta *</label>
        <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 gap-3 focus-within:border-orange-400 transition-colors">
          <Mail size={16} className="text-gray-400 shrink-0" />
          <input required name="eposta" type="email" placeholder="isletme@mail.com" className="flex-1 outline-none text-sm text-gray-800 placeholder-gray-400" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Adres *</label>
        <div className="flex items-start border border-gray-200 rounded-xl px-4 py-3 gap-3 focus-within:border-orange-400 transition-colors">
          <MapPin size={16} className="text-gray-400 shrink-0 mt-0.5" />
          <textarea required name="adres" rows={2} placeholder="Erdek, Balıkesir — cadde/sokak/no"
            className="flex-1 outline-none text-sm text-gray-800 placeholder-gray-400 resize-none" />
        </div>
      </div>
      <div className="flex gap-3">
        <button type="button" onClick={onBack}
          className="flex-1 border border-gray-200 text-gray-600 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm">
          ← Geri
        </button>
        <button type="submit"
          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors text-sm">
          Devam Et →
        </button>
      </div>
    </form>
  );
}

function Step3({ isletmeAdi }: { isletmeAdi: string }) {
  return (
    <div className="text-center py-6">
      <div className="text-7xl mb-4">🎉</div>
      <h2 className="text-2xl font-black text-gray-900 mb-3">Başvurunuz Alındı!</h2>
      {isletmeAdi && <p className="text-gray-700 font-semibold mb-2">{isletmeAdi}</p>}
      <p className="text-gray-500 mb-2 leading-relaxed">
        ErdekOnline ekibi en geç <strong>24 saat</strong> içinde sizi arayacak.
      </p>
      <p className="text-gray-400 text-sm mb-8">
        Sorular için: <span className="text-sky-600 font-semibold">info@erdekonline.com</span>
      </p>
      <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 mb-8 text-left">
        <p className="text-sm font-bold text-orange-700 mb-3">🎁 Avantajlarınız:</p>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-center gap-2"><span className="text-green-500">✓</span> İlk 3 ay komisyon sıfır</li>
          <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Üretsiz işletme sayfası</li>
          <li className="flex items-center gap-2"><span className="text-green-500">✓</span> 7/24 teknik destek</li>
        </ul>
      </div>
      <Link href="/" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3.5 rounded-full transition-colors">
        Ana Sayfaya Dön
      </Link>
    </div>
  );
}

export default function IsletmeKayitPage() {
  const [step, setStep] = useState(1);
  // Form verilerini ref ile tutuyoruz (re-render gerektirmiyor)
  const form = useRef({
    isletmeAdi: "", kategori: "", aciklama: "", acilis: "09:00", kapanis: "22:00",
    yetkili: "", telefon: "", eposta: "", adres: "",
  });

  const handleStep1Done = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    form.current.isletmeAdi = fd.get("isletmeAdi") as string;
    form.current.kategori = fd.get("kategori") as string;
    form.current.aciklama = fd.get("aciklama") as string;
    form.current.acilis = fd.get("acilis") as string;
    form.current.kapanis = fd.get("kapanis") as string;
    setStep(2);
  };

  const handleStep2Done = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    form.current.yetkili = fd.get("yetkili") as string;
    form.current.telefon = fd.get("telefon") as string;
    form.current.eposta = fd.get("eposta") as string;
    form.current.adres = fd.get("adres") as string;
    basvuruKaydet(form.current);
    setStep(3);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 to-sky-50 px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-sky-600 text-sm font-medium mb-6 transition-colors">
          <ArrowLeft size={16} /> Ana Sayfaya Dön
        </Link>
        <div className="bg-gradient-to-r from-orange-500 to-sky-600 rounded-3xl p-8 text-center mb-6 text-white">
          <Image src="/logo.svg" alt="ErdekOnline" width={64} height={64} className="mx-auto rounded-full mb-3" priority />
          <h1 className="text-2xl font-black mb-1">İşletmenizi ErdekOnline&apos;a Ekleyin</h1>
          <p className="text-white/80 text-sm">Erdek&apos;teki müşterilere ulaşın. İlk 3 ay komisyon sıfır!</p>
        </div>
        <div className="flex items-center gap-2 mb-8 px-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${step >= s ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-400"}`}>{s}</div>
              <div className={`text-xs font-medium hidden sm:block ${step >= s ? "text-gray-700" : "text-gray-400"}`}>
                {s === 1 ? "İşletme" : s === 2 ? "İletişim" : "Onay"}
              </div>
              {s < 3 && <div className={`flex-1 h-0.5 ${step > s ? "bg-orange-400" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>
        <div className="bg-white rounded-3xl shadow-xl p-8">
          {step === 1 && <Step1 onSubmit={handleStep1Done} />}
          {step === 2 && <Step2 onSubmit={handleStep2Done} onBack={() => setStep(1)} />}
          {step === 3 && <Step3 isletmeAdi={form.current.isletmeAdi} />}
        </div>
      </div>
    </main>
  );
}
