"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Mail, Lock, ArrowLeft, CheckCircle, Phone, User } from "lucide-react";

interface Kullanici {
  ad: string;
  soyad: string;
  email: string;
  telefon: string;
  sifre: string;
  kayitTarihi: string;
}

function kullanicilariGetir(): Kullanici[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("eo_kullanicilar") || "[]");
  } catch {
    return [];
  }
}

function kullaniciKaydet(k: Kullanici) {
  const liste = kullanicilariGetir();
  liste.push(k);
  localStorage.setItem("eo_kullanicilar", JSON.stringify(liste));
}

function GirisForm({ showPass, setShowPass }: { showPass: boolean; setShowPass: (v: boolean) => void }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [sifre, setSifre] = useState("");
  const [hata, setHata] = useState("");
  const [yukleniyor, setYukleniyor] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setHata("");
    if (!email || !sifre) { setHata("Lütfen tüm alanları doldurun."); return; }
    setYukleniyor(true);
    setTimeout(() => {
      const liste = kullanicilariGetir();
      const kullanici = liste.find((k) => k.email === email && k.sifre === sifre);
      if (kullanici) {
        localStorage.setItem("eo_aktif_kullanici", JSON.stringify(kullanici));
        router.push("/");
      } else {
        setHata("E-posta veya şifre hatalı. Lütfen tekrar deneyin.");
        setYukleniyor(false);
      }
    }, 600);
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {hata && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">{hata}</div>
      )}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">E-posta</label>
        <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 gap-3 focus-within:border-sky-400 transition-colors">
          <Mail size={16} className="text-gray-400 shrink-0" />
          <input type="email" placeholder="ornek@mail.com" value={email} onChange={(e) => setEmail(e.target.value)}
            className="flex-1 outline-none text-sm text-gray-800 placeholder-gray-400" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Şifre</label>
        <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 gap-3 focus-within:border-sky-400 transition-colors">
          <Lock size={16} className="text-gray-400 shrink-0" />
          <input type={showPass ? "text" : "password"} placeholder="••••••••" value={sifre} onChange={(e) => setSifre(e.target.value)}
            className="flex-1 outline-none text-sm text-gray-800 placeholder-gray-400" />
          <button type="button" onClick={() => setShowPass(!showPass)} className="text-gray-400 hover:text-gray-600">
            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
          <input type="checkbox" className="rounded" /> Beni hatırla
        </label>
        <span className="text-sky-600 font-medium text-xs">Şifremi unuttum</span>
      </div>
      <button type="submit" disabled={yukleniyor}
        className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-3.5 rounded-xl transition-colors mt-2 text-base">
        {yukleniyor ? "Giriş yapılıyor..." : "Giriş Yap"}
      </button>
    </form>
  );
}
function KayitForm({ showPass, setShowPass }: { showPass: boolean; setShowPass: (v: boolean) => void }) {
  const [ad, setAd] = useState("");
  const [soyad, setSoyad] = useState("");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");
  const [sifre, setSifre] = useState("");
  const [sozlesme, setSozlesme] = useState(false);
  const [hata, setHata] = useState("");
  const [basarili, setBasarili] = useState(false);
  const [yukleniyor, setYukleniyor] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setHata("");
    if (!ad || !soyad || !email || !telefon || !sifre) {
      setHata("Lütfen tüm alanları doldurun."); return;
    }
    if (sifre.length < 8) {
      setHata("Şifre en az 8 karakter olmalıdır."); return;
    }
    if (!sozlesme) {
      setHata("Kullanım koşullarını kabul etmeniz gerekmektedir."); return;
    }
    const liste = kullanicilariGetir();
    if (liste.find((k) => k.email === email)) {
      setHata("Bu e-posta zaten kayıtlı. Giriş yapabilirsiniz."); return;
    }
    setYukleniyor(true);
    setTimeout(() => {
      kullaniciKaydet({ ad, soyad, email, telefon, sifre, kayitTarihi: new Date().toISOString() });
      setYukleniyor(false);
      setBasarili(true);
    }, 700);
  }

  if (basarili) {
    return (
      <div className="flex flex-col items-center gap-4 py-4 text-center">
        <CheckCircle size={56} className="text-green-500" />
        <h2 className="text-xl font-black text-gray-800">Kayıt Başarılı!</h2>
        <p className="text-gray-500 text-sm">
          Hoş geldiniz, <span className="font-semibold text-gray-700">{ad} {soyad}</span>! Hesabınız oluşturuldu.
        </p>
        <Link href="/" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl transition-colors text-base text-center block mt-2">
          Ana Sayfaya Git
        </Link>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {hata && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">{hata}</div>
      )}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Ad</label>
          <div className="flex items-center border border-gray-200 rounded-xl px-3 py-3 gap-2 focus-within:border-sky-400 transition-colors">
            <User size={15} className="text-gray-400 shrink-0" />
            <input type="text" placeholder="Adınız" value={ad} onChange={(e) => setAd(e.target.value)}
              className="flex-1 outline-none text-sm text-gray-800 placeholder-gray-400 w-0" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Soyad</label>
          <div className="flex items-center border border-gray-200 rounded-xl px-3 py-3 gap-2 focus-within:border-sky-400 transition-colors">
            <User size={15} className="text-gray-400 shrink-0" />
            <input type="text" placeholder="Soyadınız" value={soyad} onChange={(e) => setSoyad(e.target.value)}
              className="flex-1 outline-none text-sm text-gray-800 placeholder-gray-400 w-0" />
          </div>
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">E-posta</label>
        <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 gap-3 focus-within:border-sky-400 transition-colors">
          <Mail size={16} className="text-gray-400 shrink-0" />
          <input type="email" placeholder="ornek@mail.com" value={email} onChange={(e) => setEmail(e.target.value)}
            className="flex-1 outline-none text-sm text-gray-800 placeholder-gray-400" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Telefon</label>
        <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 gap-3 focus-within:border-sky-400 transition-colors">
          <Phone size={16} className="text-gray-400 shrink-0" />
          <input type="tel" placeholder="05XX XXX XX XX" value={telefon} onChange={(e) => setTelefon(e.target.value)}
            className="flex-1 outline-none text-sm text-gray-800 placeholder-gray-400" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Şifre</label>
        <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 gap-3 focus-within:border-sky-400 transition-colors">
          <Lock size={16} className="text-gray-400 shrink-0" />
          <input type={showPass ? "text" : "password"} placeholder="En az 8 karakter" value={sifre} onChange={(e) => setSifre(e.target.value)}
            className="flex-1 outline-none text-sm text-gray-800 placeholder-gray-400" />
          <button type="button" onClick={() => setShowPass(!showPass)} className="text-gray-400 hover:text-gray-600">
            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>
      <label className="flex items-start gap-2 text-xs text-gray-500 cursor-pointer">
        <input type="checkbox" className="mt-0.5 rounded shrink-0" checked={sozlesme} onChange={(e) => setSozlesme(e.target.checked)} />
        <span>
          <Link href="/kullanim-kosullari" className="text-sky-600 hover:underline">Kullanım koşullarını</Link>{" "}ve{" "}
          <Link href="/gizlilik" className="text-sky-600 hover:underline">gizlilik politikasını</Link> kabul ediyorum.
        </span>
      </label>
      <button type="submit" disabled={yukleniyor}
        className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-3.5 rounded-xl transition-colors text-base">
        {yukleniyor ? "Kayıt yapılıyor..." : "Kayıt Ol"}
      </button>
    </form>
  );
}
export default function GirisPage() {
  const [showPass, setShowPass] = useState(false);
  const [tab, setTab] = useState<"giris" | "kayit">("giris");

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-sky-600 text-sm font-medium mb-6 transition-colors">
          <ArrowLeft size={16} /> Ana Sayfaya Dön
        </Link>
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-sky-600 to-blue-700 px-8 py-8 text-center">
            <Image src="/logo.svg" alt="ErdekOnline" width={72} height={72} className="mx-auto rounded-full mb-3" priority />
            <h1 className="text-white font-black text-2xl">
              <span className="text-orange-300">Erdek</span><span className="text-sky-200">Online</span>
            </h1>
            <p className="text-sky-200 text-sm mt-1">Erdek Bir Tık Uzağında</p>
          </div>
          <div className="flex border-b border-gray-100">
            <button onClick={() => setTab("giris")}
              className={`flex-1 py-4 text-sm font-bold transition-colors ${tab === "giris" ? "text-sky-600 border-b-2 border-sky-500" : "text-gray-400 hover:text-gray-600"}`}>
              Giriş Yap
            </button>
            <button onClick={() => setTab("kayit")}
              className={`flex-1 py-4 text-sm font-bold transition-colors ${tab === "kayit" ? "text-sky-600 border-b-2 border-sky-500" : "text-gray-400 hover:text-gray-600"}`}>
              Kayıt Ol
            </button>
          </div>
          <div className="px-8 py-8">
            {tab === "giris"
              ? <GirisForm showPass={showPass} setShowPass={setShowPass} />
              : <KayitForm showPass={showPass} setShowPass={setShowPass} />}
          </div>
        </div>
        <p className="text-center text-xs text-gray-400 mt-6">
          İşletme sahibi misiniz?{" "}
          <Link href="/isletme-kayit" className="text-sky-600 hover:underline font-semibold">
            İşletme hesabı oluşturun →
          </Link>
        </p>
      </div>
    </main>
  );
}
