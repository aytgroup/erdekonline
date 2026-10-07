"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ShoppingCart, User, ChevronDown, LogOut, Search } from "lucide-react";

const cats = [
  { href:"/yemek", label:"Yemek", emoji:"🍽️" },
  { href:"/market", label:"Market", emoji:"🛒" },
  { href:"/tekne", label:"Tekne Turu", emoji:"⛵" },
  { href:"/konaklama", label:"Konaklama", emoji:"🏨" },
  { href:"/yerel", label:"Yerel Urunler", emoji:"🫒" },
  { href:"/hizmetler", label:"Hizmetler", emoji:"💈" },
  { href:"/etkinlikler", label:"Etkinlikler", emoji:"🎭" },
  { href:"/isletmeler", label:"Tum Isletmeler", emoji:"🏪" },
];

interface Kullanici { ad: string; soyad: string; email: string; }

export default function Navbar() {
  const router = useRouter();
  const [mob, setMob] = useState(false);
  const [banner, setBanner] = useState(true);
  const [catOpen, setCatOpen] = useState(false);
  const [kul, setKul] = useState<Kullanici | null>(null);
  const [userOpen, setUserOpen] = useState(false);
  const [sepet, setSepet] = useState(0);
  const [aramaAcik, setAramaAcik] = useState(false);
  const [aramaQ, setAramaQ] = useState("");
  const userRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function chkUser() { try { const r=localStorage.getItem("eo_aktif_kullanici"); setKul(r?JSON.parse(r):null); } catch { setKul(null); } }
    function chkSepet() { try { const r=localStorage.getItem("eo_sepet"); const it:{adet:number}[]=r?JSON.parse(r):[]; setSepet(it.reduce((a,i)=>a+i.adet,0)); } catch { setSepet(0); } }
    chkUser(); chkSepet();
    window.addEventListener("storage", chkUser);
    window.addEventListener("storage", chkSepet);
    window.addEventListener("eo_sepet_guncellendi", chkSepet);
    return () => { window.removeEventListener("storage", chkUser); window.removeEventListener("storage", chkSepet); window.removeEventListener("eo_sepet_guncellendi", chkSepet); };
  }, []);

  useEffect(() => {
    function out(e: MouseEvent) {
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserOpen(false);
      if (catRef.current && !catRef.current.contains(e.target as Node)) setCatOpen(false);
    }
    document.addEventListener("mousedown", out);
    return () => document.removeEventListener("mousedown", out);
  }, []);

  function cikis() { localStorage.removeItem("eo_aktif_kullanici"); setKul(null); setUserOpen(false); router.push("/"); router.refresh(); }

return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-100">
      {banner&&<div className="bg-gradient-to-r from-sky-600 to-blue-700 text-white text-sm text-center py-2 px-4 font-medium relative">ErdekOnline&apos;a hos geldiniz!<button onClick={()=>setBanner(false)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"><X size={16}/></button></div>}
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between gap-4 py-3">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/logo.svg" alt="ErdekOnline" width={52} height={52} className="rounded-full object-contain" priority/>
          <div><div className="font-black text-2xl leading-none"><span className="text-orange-500">Erdek</span><span className="text-sky-500">Online</span></div><div className="text-[11px] font-bold text-orange-400 uppercase tracking-[0.2em] mt-0.5">Erdek Bir Tik Uzaginda</div></div>
        </Link>
        {aramaAcik?(
          <form onSubmit={e=>{e.preventDefault();if(aramaQ.trim()){router.push(`/ara?q=${encodeURIComponent(aramaQ.trim())}`);setAramaAcik(false);setAramaQ("");}}} className="hidden md:flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 gap-2 focus-within:border-sky-400">
            <Search size={15} className="text-gray-400 shrink-0"/>
            <input autoFocus type="text" value={aramaQ} onChange={e=>setAramaQ(e.target.value)} placeholder="Isletme ara..." className="outline-none text-sm bg-transparent w-40"/>
            <button type="button" onClick={()=>{setAramaAcik(false);setAramaQ("");}}><X size={14} className="text-gray-400"/></button>
          </form>
        ):(
          <button onClick={()=>setAramaAcik(true)} className="hidden md:flex items-center justify-center w-9 h-9 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-sky-600"><Search size={18}/></button>
        )}
        <div className="hidden md:flex items-center relative" ref={catRef}>
          <button onClick={()=>setCatOpen(!catOpen)} className="flex items-center gap-1.5 text-gray-700 font-semibold text-sm px-4 py-2 rounded-full border border-gray-200 hover:border-sky-300 hover:text-sky-600"><span>Kategoriler</span><ChevronDown size={15} className={catOpen?"rotate-180":""}/></button>
          {catOpen&&<div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">{cats.map(c=><Link key={c.href} href={c.href} onClick={()=>setCatOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-600 font-medium"><span>{c.emoji}</span><span>{c.label}</span></Link>)}</div>}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <Link href="/sepet" className="relative text-gray-600 hover:text-sky-600 p-2"><ShoppingCart size={24}/>{sepet>0&&<span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-orange-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">{sepet}</span>}</Link>
          {kul?(
            <div className="relative" ref={userRef}>
              <button onClick={()=>setUserOpen(!userOpen)} className="flex items-center gap-2 text-sm font-semibold text-gray-700 border border-gray-200 px-4 py-2 rounded-full hover:border-sky-300 hover:text-sky-600"><User size={16}/><span>{kul.ad}</span><ChevronDown size={14} className={userOpen?"rotate-180":""}/></button>
              {userOpen&&(
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100"><p className="text-sm font-bold">{kul.ad} {kul.soyad}</p><p className="text-xs text-gray-400 truncate">{kul.email}</p></div>
                  <Link href="/profil" onClick={()=>setUserOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 font-medium"><User size={15}/> Profilim</Link>
                  <Link href="/sepet" onClick={()=>setUserOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 font-medium"><ShoppingCart size={15}/> Sepetim</Link>
                  <Link href="/siparisler" onClick={()=>setUserOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 font-medium">🛍️ Siparislerim</Link>
                  <Link href="/favoriler" onClick={()=>setUserOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 font-medium">❤️ Favorilerim</Link>
                  <button onClick={cikis} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 font-medium border-t border-gray-100 mt-1"><LogOut size={15}/> Cikis Yap</button>
                </div>
              )}
            </div>
          ):(
            <Link href="/giris" className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-sky-600 border border-gray-200 px-4 py-2 rounded-full hover:border-sky-300"><User size={16}/> Giris Yap</Link>
          )}
          <Link href="/isletme-kayit" className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-5 py-2 rounded-full shadow-md shadow-orange-200">Isletme Ol</Link>
        </div>
        <button className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg" onClick={()=>setMob(!mob)}>{mob?<X size={26}/>:<Menu size={26}/>}</button>
      </div>
{mob&&(
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 flex flex-col gap-1">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3 mb-2">Kategoriler</p>
          {cats.map(c=><Link key={c.href} href={c.href} className="flex items-center gap-2 px-3 py-2.5 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-600 rounded-xl font-medium" onClick={()=>setMob(false)}><span>{c.emoji}</span><span>{c.label}</span></Link>)}
          <div className="border-t border-gray-100 mt-3 pt-3 flex flex-col gap-2">
            {kul?(
              <>
                <div className="px-3 py-2"><p className="text-sm font-bold">{kul.ad} {kul.soyad}</p><p className="text-xs text-gray-400">{kul.email}</p></div>
                <Link href="/profil" className="flex items-center gap-3 text-gray-700 font-semibold text-sm px-3 py-2.5 rounded-xl hover:bg-gray-50" onClick={()=>setMob(false)}><User size={18}/> Profilim</Link>
                <Link href="/siparisler" className="flex items-center gap-3 text-gray-700 font-semibold text-sm px-3 py-2.5 rounded-xl hover:bg-gray-50" onClick={()=>setMob(false)}>🛍️ Siparislerim</Link>
                <Link href="/favoriler" className="flex items-center gap-3 text-gray-700 font-semibold text-sm px-3 py-2.5 rounded-xl hover:bg-gray-50" onClick={()=>setMob(false)}>❤️ Favorilerim</Link>
                <button onClick={()=>{cikis();setMob(false);}} className="flex items-center gap-3 text-red-500 font-semibold text-sm px-3 py-2.5 rounded-xl hover:bg-red-50"><LogOut size={18}/> Cikis Yap</button>
              </>
            ):(
              <Link href="/giris" className="flex items-center gap-3 text-gray-700 font-bold text-sm px-3 py-2.5 rounded-xl hover:bg-gray-50" onClick={()=>setMob(false)}><User size={18}/> Giris Yap</Link>
            )}
            <Link href="/sepet" className="flex items-center justify-between bg-orange-50 text-orange-600 font-bold text-sm px-3 py-2.5 rounded-xl" onClick={()=>setMob(false)}>
              <span className="flex items-center gap-2"><ShoppingCart size={18}/> Sepetim</span>
              {sepet>0&&<span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">{sepet}</span>}
            </Link>
            <Link href="/isletme-kayit" className="bg-orange-500 text-white font-bold text-sm px-4 py-3 rounded-xl text-center" onClick={()=>setMob(false)}>Isletme Ol</Link>
          </div>
        </div>
      )}
    </header>
  );
}
