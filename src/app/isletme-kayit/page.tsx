"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Building2, Phone, Mail, MapPin, ChevronDown } from "lucide-react";
import { basvuruKaydet } from "@/lib/basvurular";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const cats = ["Restoran / Kafe","Market / Bakkal","Tekne Turu","Konaklama / Pansiyon","Yerel Urunler","Kuafor / Guzellik","Eczane","Diger Hizmetler"];
type S1 = { isletmeAdi:string; kategori:string; aciklama:string; acilis:string; kapanis:string; };

export default function IsletmeKayitPage() {
  const [step,setStep] = useState(1);
  const [s1,setS1] = useState<S1|null>(null);
  const [tamam,setTamam] = useState(false);
  const [catAcik,setCatAcik] = useState(false);
  const [kat,setKat] = useState("");

  function handleStep1(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); const f=new FormData(e.currentTarget);
    setS1({ isletmeAdi:f.get("isletmeAdi") as string, kategori:kat, aciklama:f.get("aciklama") as string, acilis:f.get("acilis") as string, kapanis:f.get("kapanis") as string });
    setStep(2);
  }
  function handleStep2(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); if (!s1) return; const f=new FormData(e.currentTarget);
    basvuruKaydet({ ...s1, yetkili:f.get("yetkili") as string, telefon:f.get("telefon") as string, eposta:f.get("eposta") as string, adres:f.get("adres") as string });
    setTamam(true);
  }

  if (tamam) return (
    <main className="flex flex-col min-h-screen bg-gray-50"><Navbar/>
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-3xl shadow-lg p-10 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-black text-gray-900 mb-3">Basvurunuz Alindi!</h2>
          <p className="text-gray-500 mb-6">24 saat icerisinde sizi arayacagiz.</p>
          <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mb-6 text-left">
            <p className="text-sm font-semibold text-gray-700">Isletme: <span className="font-bold text-orange-600">{s1?.isletmeAdi}</span></p>
            <p className="text-sm text-gray-500 mt-1">Kategori: {s1?.kategori}</p>
          </div>
          <Link href="/" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-full inline-block">Ana Sayfaya Don</Link>
        </div>
      </div>
      <Footer/><WhatsAppButton/>
    </main>
  );
return (
    <main className="flex flex-col min-h-screen bg-gray-50"><Navbar/>
      <div className="max-w-2xl mx-auto w-full px-4 py-10 flex-1">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-sky-600 text-sm mb-6"><ArrowLeft size={16}/> Ana Sayfa</Link>
        <div className="flex items-center gap-3 mb-8">
          <Image src="/logo.svg" alt="ErdekOnline" width={48} height={48} className="rounded-full"/>
          <div><h1 className="text-2xl font-black text-gray-900">Isletme Ol</h1><p className="text-gray-500 text-sm">ErdekOnline&apos;a katil, musterilere ulas</p></div>
        </div>
        <div className="flex gap-2 mb-8">
          {[1,2].map(n=><div key={n} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border ${step===n?"bg-orange-500 text-white border-orange-500":step>n?"bg-green-100 text-green-700 border-green-200":"bg-gray-100 text-gray-400 border-gray-200"}`}><span>{step>n?"✓":n}</span>{n===1?"Isletme":"Iletisim"}</div>)}
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          {step===1 && (
            <form onSubmit={handleStep1} className="flex flex-col gap-5">
              <h2 className="text-xl font-black text-gray-900 flex items-center gap-2"><Building2 size={20} className="text-orange-500"/> Isletme Bilgileri</h2>
              <div><label className="text-sm font-semibold text-gray-700 mb-1.5 block">Isletme Adi *</label><input required name="isletmeAdi" type="text" placeholder="Ornek: Kalamar Balik" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400"/></div>
              <div className="relative"><label className="text-sm font-semibold text-gray-700 mb-1.5 block">Kategori *</label>
                <button type="button" onClick={()=>setCatAcik(!catAcik)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-left flex items-center justify-between">
                  <span className={kat?"text-gray-800":"text-gray-400"}>{kat||"Kategori secin"}</span><ChevronDown size={16} className={`transition-transform ${catAcik?"rotate-180":""}`}/>
                </button>
                {catAcik&&<div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-1">{cats.map(c=><button key={c} type="button" onClick={()=>{setKat(c);setCatAcik(false);}} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 font-medium">{c}</button>)}</div>}
              </div>
              <div><label className="text-sm font-semibold text-gray-700 mb-1.5 block">Aciklama</label><textarea name="aciklama" rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400 resize-none"/></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-sm font-semibold text-gray-700 mb-1.5 block">Acilis</label><input name="acilis" type="time" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400"/></div>
                <div><label className="text-sm font-semibold text-gray-700 mb-1.5 block">Kapanis</label><input name="kapanis" type="time" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400"/></div>
              </div>
              <button type="submit" disabled={!kat} className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-3 rounded-xl mt-2">Devam Et</button>
            </form>
          )}

{step===2 && (
            <form onSubmit={handleStep2} className="flex flex-col gap-5">
              <h2 className="text-xl font-black text-gray-900 flex items-center gap-2"><Phone size={20} className="text-orange-500"/> Iletisim Bilgileri</h2>
              <div><label className="text-sm font-semibold text-gray-700 mb-1.5 block">Yetkili Kisi *</label><input required name="yetkili" type="text" placeholder="Ad Soyad" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400"/></div>
              <div><label className="text-sm font-semibold text-gray-700 mb-1.5 block">Telefon *</label><div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-orange-400"><Phone size={15} className="text-gray-400 shrink-0"/><input required name="telefon" type="tel" placeholder="05xx xxx xxxx" className="flex-1 bg-transparent outline-none text-sm"/></div></div>
              <div><label className="text-sm font-semibold text-gray-700 mb-1.5 block">E-posta</label><div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-orange-400"><Mail size={15} className="text-gray-400 shrink-0"/><input name="eposta" type="email" placeholder="isletme@email.com" className="flex-1 bg-transparent outline-none text-sm"/></div></div>
              <div><label className="text-sm font-semibold text-gray-700 mb-1.5 block">Adres *</label><div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-orange-400"><MapPin size={15} className="text-gray-400 shrink-0"/><input required name="adres" type="text" placeholder="Cadde / Sokak, Erdek" className="flex-1 bg-transparent outline-none text-sm"/></div></div>
              <div className="flex gap-3">
                <button type="button" onClick={()=>setStep(1)} className="flex-1 border border-gray-200 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-50">Geri</button>
                <button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl">Basvuruyu Gonder</button>
              </div>
            </form>
          )}
        </div>
      </div>
      <Footer/><WhatsAppButton/>
    </main>
  );
}
