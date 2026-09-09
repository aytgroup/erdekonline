"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from "lucide-react";

function GirisForm({ showPass, setShowPass }: { showPass: boolean; setShowPass: (v: boolean) => void }) {
  return (
    <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">E-posta</label>
        <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 gap-3 focus-within:border-sky-400 transition-colors">
          <Mail size={16} className="text-gray-400 shrink-0" />
          <input type="email" placeholder="ornek@mail.com"
            className="flex-1 outline-none text-sm text-gray-800 placeholder-gray-400" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Şifre</label>
        <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 gap-3 focus-within:border-sky-400 transition-colors">
          <Lock size={16} className="text-gray-400 shrink-0" />
          <input type={showPass ? "text" : "password"} placeholder="••••••••"
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
        <Link href="/sifre-unuttum" className="text-sky-600 hover:underline font-medium">Şifremi unuttum</Link>
      </div>
      <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl transition-colors mt-2 text-base">
        Giriş Yap
      </button>
      <div className="relative my-2">
        <div className="border-t border-gray-100" />
        <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs text-gray-400">veya</span>
      </div>
      <button type="button" className="w-full border border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm flex items-center justify-center gap-2">
        🔵 Google ile Giriş Yap
      </button>
    </form>
  );
}

function KayitForm({ showPass, setShowPass }: { showPass: boolean; setShowPass: (v: boolean) => void }) {
  return (
    <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Ad</label>
          <input type="text" placeholder="Adınız"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-sky-400 transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Soyad</label>
          <input type="text" placeholder="Soyadınız"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-sky-400 transition-colors" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">E-posta</label>
        <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 gap-3 focus-within:border-sky-400 transition-colors">
          <Mail size={16} className="text-gray-400 shrink-0" />
          <input type="email" placeholder="ornek@mail.com"
            className="flex-1 outline-none text-sm text-gray-800 placeholder-gray-400" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Telefon</label>
        <input type="tel" placeholder="05XX XXX XX XX"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-sky-400 transition-colors" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Şifre</label>
        <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 gap-3 focus-within:border-sky-400 transition-colors">
          <Lock size={16} className="text-gray-400 shrink-0" />
          <input type={showPass ? "text" : "password"} placeholder="En az 8 karakter"
            className="flex-1 outline-none text-sm text-gray-800 placeholder-gray-400" />
          <button type="button" onClick={() => setShowPass(!showPass)} className="text-gray-400 hover:text-gray-600">
            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>
      <label className="flex items-start gap-2 text-xs text-gray-500 cursor-pointer">
        <input type="checkbox" className="mt-0.5 rounded shrink-0" />
        <span>
          <Link href="/kullanim-kosullari" className="text-sky-600 hover:underline">Kullanım koşullarını</Link> ve{" "}
          <Link href="/gizlilik" className="text-sky-600 hover:underline">gizlilik politikasını</Link> kabul ediyorum.
        </span>
      </label>
      <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl transition-colors text-base">
        Kayıt Ol
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
            <Image src="/logo.png" alt="ErdekOnline" width={72} height={72} className="mx-auto rounded-full mb-3" priority />
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