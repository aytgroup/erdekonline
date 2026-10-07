"use client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Mail, Lock, CheckCircle, Phone, User } from "lucide-react";

interface Kullanici { ad:string; soyad:string; email:string; telefon:string; sifre:string; kayitTarihi:string; }
function getKullanicilar(): Kullanici[] {
  if (typeof window==="undefined") return [];
  try { return JSON.parse(localStorage.getItem("eo_kullanicilar")||"[]"); } catch { return []; }
}
function saveKullanici(k: Kullanici) {
  const l=getKullanicilar(); l.push(k); localStorage.setItem("eo_kullanicilar",JSON.stringify(l));
}

function GirisForm() {
  const router=useRouter();
  const [email,setEmail]=useState(""); const [sifre,setSifre]=useState("");
  const [show,setShow]=useState(false); const [hata,setHata]=useState("");
  const [yukleniyor,setYukleniyor]=useState(false); const [hatirla,setHatirla]=useState(false);
  function submit(e: React.FormEvent) {
    e.preventDefault(); setHata("");
    if(!email||!sifre){setHata("Tum alanlari doldurun.");return;}
    setYukleniyor(true);
    setTimeout(()=>{
      const k=getKullanicilar().find(x=>x.email===email&&x.sifre===sifre);
      if(k){localStorage.setItem("eo_aktif_kullanici",JSON.stringify(k));if(hatirla)localStorage.setItem("eo_aktif_kullanici_kalici",JSON.stringify(k));window.dispatchEvent(new Event("storage"));router.push("/profil");}
      else{setHata("E-posta veya sifre hatali.");setYukleniyor(false);}
    },600);
  }
  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <div><label className="text-sm font-semibold text-gray-700 mb-1.5 block">E-posta</label>
        <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-orange-400 bg-gray-50">
          <Mail size={16} className="text-gray-400 shrink-0"/>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="ornek@email.com" className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"/>
        </div>
      </div>
      <div><label className="text-sm font-semibold text-gray-700 mb-1.5 block">Sifre</label>
        <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-orange-400 bg-gray-50">
          <Lock size={16} className="text-gray-400 shrink-0"/>
          <input type={show?"text":"password"} value={sifre} onChange={e=>setSifre(e.target.value)} placeholder="Sifreniz" className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"/>
          <button type="button" onClick={()=>setShow(!show)} className="text-gray-400">{show?<EyeOff size={16}/>:<Eye size={16}/>}</button>
        </div>
      </div>
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={hatirla} onChange={e=>setHatirla(e.target.checked)} className="w-4 h-4 accent-orange-500"/>
        <span className="text-sm text-gray-600">Beni Hatirla</span>
      </label>
      {hata&&<div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">{hata}</div>}
      <button type="submit" disabled={yukleniyor} className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-3 rounded-xl">{yukleniyor?"Giris Yapiliyor...":"Giris Yap"}</button>
      <p className="text-center text-sm text-gray-500">Hesabiniz yok mu? <Link href="/giris?tab=kayit" className="text-orange-500 font-semibold hover:underline">Kayit Ol</Link></p>
    </form>
  );
}

function KayitForm({onBasari}:{onBasari:()=>void}) {
  const [ad,setAd]=useState(""); const [soyad,setSoyad]=useState("");
  const [email,setEmail]=useState(""); const [tel,setTel]=useState("");
  const [sifre,setSifre]=useState(""); const [show,setShow]=useState(false);
  const [hata,setHata]=useState(""); const [yukleniyor,setYukleniyor]=useState(false);
  function submit(e: React.FormEvent) {
    e.preventDefault(); setHata("");
    if(!ad||!soyad||!email||!sifre){setHata("Zorunlu alanlari doldurun.");return;}
    if(sifre.length<6){setHata("Sifre en az 6 karakter olmalidir.");return;}
    if(getKullanicilar().find(k=>k.email===email)){setHata("Bu e-posta zaten kayitli.");return;}
    setYukleniyor(true);
    setTimeout(()=>{
      const yeni:Kullanici={ad,soyad,email,telefon:tel,sifre,kayitTarihi:new Date().toLocaleDateString("tr-TR")};
      saveKullanici(yeni);localStorage.setItem("eo_aktif_kullanici",JSON.stringify(yeni));window.dispatchEvent(new Event("storage"));onBasari();
    },600);
  }
  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <div><label className="text-sm font-semibold text-gray-700 mb-1.5 block">Ad *</label><div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-3 focus-within:border-orange-400 bg-gray-50"><User size={14} className="text-gray-400"/><input required value={ad} onChange={e=>setAd(e.target.value)} placeholder="Adiniz" className="flex-1 bg-transparent outline-none text-sm"/></div></div>
        <div><label className="text-sm font-semibold text-gray-700 mb-1.5 block">Soyad *</label><div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-3 focus-within:border-orange-400 bg-gray-50"><User size={14} className="text-gray-400"/><input required value={soyad} onChange={e=>setSoyad(e.target.value)} placeholder="Soyadiniz" className="flex-1 bg-transparent outline-none text-sm"/></div></div>
      </div>
      <div><label className="text-sm font-semibold text-gray-700 mb-1.5 block">E-posta *</label><div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-orange-400 bg-gray-50"><Mail size={15} className="text-gray-400"/><input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="ornek@email.com" className="flex-1 bg-transparent outline-none text-sm"/></div></div>
      <div><label className="text-sm font-semibold text-gray-700 mb-1.5 block">Telefon</label><div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-orange-400 bg-gray-50"><Phone size={15} className="text-gray-400"/><input type="tel" value={tel} onChange={e=>setTel(e.target.value)} placeholder="05xx xxx xxxx" className="flex-1 bg-transparent outline-none text-sm"/></div></div>
      <div><label className="text-sm font-semibold text-gray-700 mb-1.5 block">Sifre *</label><div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-orange-400 bg-gray-50"><Lock size={15} className="text-gray-400"/><input required type={show?"text":"password"} value={sifre} onChange={e=>setSifre(e.target.value)} placeholder="En az 6 karakter" className="flex-1 bg-transparent outline-none text-sm"/><button type="button" onClick={()=>setShow(!show)} className="text-gray-400">{show?<EyeOff size={15}/>:<Eye size={15}/>}</button></div></div>
      {hata&&<div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">{hata}</div>}
      <button type="submit" disabled={yukleniyor} className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-3 rounded-xl">{yukleniyor?"Kayit Yapiliyor...":"Ucretsiz Kayit Ol"}</button>
      <p className="text-center text-sm text-gray-500">Hesabiniz var mi? <Link href="/giris" className="text-orange-500 font-semibold hover:underline">Giris Yap</Link></p>
    </form>
  );
}

function GirisIcerik() {
  const params=useSearchParams();
  const [tab,setTab]=useState(params.get("tab")==="kayit"?"kayit":"giris");
  const [basari,setBasari]=useState(false);
  if(basari) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-3xl shadow-lg p-10 max-w-md w-full text-center">
        <CheckCircle size={56} className="text-green-500 mx-auto mb-4"/>
        <h2 className="text-2xl font-black text-gray-900 mb-2">Kayit Basarili!</h2>
        <p className="text-gray-500 mb-6">Hosgeldiniz! Hesabiniz olusturuldu.</p>
        <Link href="/profil" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-full inline-block">Profile Git</Link>
      </div>
    </div>
  );
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="bg-white rounded-3xl shadow-lg p-8 max-w-md w-full">
        <div className="flex justify-center mb-8"><Image src="/logo.svg" alt="ErdekOnline" width={64} height={64} className="rounded-full"/></div>
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          <button onClick={()=>setTab("giris")} className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${tab==="giris"?"bg-white shadow text-gray-900":"text-gray-500"}`}>Giris Yap</button>
          <button onClick={()=>setTab("kayit")} className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${tab==="kayit"?"bg-white shadow text-gray-900":"text-gray-500"}`}>Kayit Ol</button>
        </div>
        {tab==="giris"?<GirisForm/>:<KayitForm onBasari={()=>setBasari(true)}/>}
      </div>
    </div>
  );
}

export default function GirisPage() {
  return <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-400">Yukleniyor...</div>}><GirisIcerik/></Suspense>;
}