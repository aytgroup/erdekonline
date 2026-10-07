"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ArrowLeft, Phone, Mail, MessageCircle, Clock, ChevronDown } from "lucide-react";

const sss = [
  { q:"Siparisimi nasil takip ederim?", a:"Hesabim siparislerim bolumunden takip edebilirsiniz." },
  { q:"Iptal nasil yapilir?", a:"Siparis onayindan 5 dakika icinde destek hattimizi arayin." },
  { q:"Isletmemi nasil eklerim?", a:"Isletme Ol butonuna tiklayin, 24 saat icinde sizi arayalim." },
  { q:"Uyelik ucretsiz mi?", a:"Evet, kullanici uyeligi ucretsizdir. Ilk 3 ay komisyon sifir." },
  { q:"Sifremi unuttum?", a:"info@erdekonline.com adresine yazin veya destek hattimizi arayin." },
  { q:"Teslimat suresi?", a:"Ortalama 20-40 dakikadir." },
];

function SSS() {
  const [acik,setAcik] = useState<number|null>(null);
  return (
    <div className="space-y-3">
      {sss.map((item,i)=>(
        <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <button onClick={()=>setAcik(acik===i?null:i)} className="w-full flex items-center justify-between px-6 py-4 text-left">
            <span className="font-semibold text-gray-900 text-sm">{item.q}</span>
            <ChevronDown size={16} className={`text-gray-400 transition-transform shrink-0 ml-3 ${acik===i?"rotate-180":""}`}/>
          </button>
          {acik===i&&<div className="px-6 pb-4 pt-2 text-sm text-gray-600 border-t border-gray-50">{item.a}</div>}
        </div>
      ))}
    </div>
  );
}

function BizeYazin() {
  const [form,setForm] = useState({ad:"",email:"",konu:"",mesaj:""});
  const [gonderildi,setGonderildi] = useState(false);
  if (gonderildi) return (
    <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
      <div className="text-4xl mb-3">✅</div>
      <h3 className="font-black text-gray-900 mb-2">Mesajiniz Alindi!</h3>
      <p className="text-gray-500 text-sm">En kisa surede size donecegiz.</p>
    </div>
  );
  return (
    <form onSubmit={e=>{e.preventDefault();setGonderildi(true);}} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
      <div><label className="text-sm font-semibold text-gray-700 mb-1.5 block">Adiniz *</label><input required value={form.ad} onChange={e=>setForm({...form,ad:e.target.value})} placeholder="Ad Soyad" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-sky-400"/></div>
      <div><label className="text-sm font-semibold text-gray-700 mb-1.5 block">E-posta *</label><input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="ornek@email.com" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-sky-400"/></div>
      <div><label className="text-sm font-semibold text-gray-700 mb-1.5 block">Konu *</label><input required value={form.konu} onChange={e=>setForm({...form,konu:e.target.value})} placeholder="Konuyu belirtin" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-sky-400"/></div>
      <div><label className="text-sm font-semibold text-gray-700 mb-1.5 block">Mesaj *</label><textarea required rows={4} value={form.mesaj} onChange={e=>setForm({...form,mesaj:e.target.value})} placeholder="Mesajinizi yazin..." className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-sky-400 resize-none"/></div>
      <button type="submit" className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-xl">Gonder</button>
    </form>
  );
}
export default function DestekPage() {
  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Navbar/>
      <div className="bg-white border-b shadow-sm px-4 py-5">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link href="/" className="text-gray-500 hover:text-sky-600"><ArrowLeft size={22}/></Link>
          <div><h1 className="text-2xl font-black text-gray-900">Destek</h1><p className="text-gray-500 text-sm">Yardimci olabiliriz</p></div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <a href="tel:+902668350000" className="bg-green-50 border border-green-100 rounded-2xl p-5 flex items-center gap-4 hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm"><Phone size={20} className="text-green-500"/></div>
            <div><p className="font-bold text-gray-900">Telefon</p><p className="text-sm text-gray-500">+90 266 835 00 00</p></div>
          </a>
          <a href="https://wa.me/902668350000" target="_blank" rel="noopener noreferrer" className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 flex items-center gap-4 hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm"><MessageCircle size={20} className="text-emerald-500"/></div>
            <div><p className="font-bold text-gray-900">WhatsApp</p><p className="text-sm text-gray-500">Hizli destek</p></div>
          </a>
          <a href="mailto:info@erdekonline.com" className="bg-sky-50 border border-sky-100 rounded-2xl p-5 flex items-center gap-4 hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm"><Mail size={20} className="text-sky-500"/></div>
            <div><p className="font-bold text-gray-900">E-posta</p><p className="text-sm text-gray-500">info@erdekonline.com</p></div>
          </a>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <div><h2 className="text-xl font-black text-gray-900 mb-4">Sik Sorulan Sorular</h2><SSS/></div>
          <div><h2 className="text-xl font-black text-gray-900 mb-4">Bize Yazin</h2><BizeYazin/></div>
        </div>
        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 flex items-center gap-4">
          <Clock size={28} className="text-orange-500 shrink-0"/>
          <div><p className="font-bold text-gray-900">Calisma Saatlerimiz</p><p className="text-gray-500 text-sm">Pzt-Cuma: 09:00-18:00 | Hafta sonu: 10:00-16:00</p></div>
        </div>
      </div>
      <Footer/><WhatsAppButton/>
    </main>
  );
}