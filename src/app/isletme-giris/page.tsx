"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Lock, ArrowLeft, Store, CheckCircle } from "lucide-react";


export default function IsletmeGirisPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [sifre, setSifre] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [hata, setHata] = useState("");
  const [yukleniyor, setYukleniyor] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setHata("");
    if (!email || !sifre) { setHata("Lütfen tüm alanları doldurun."); return; }
    setYukleniyor(true);
    setTimeout(() => {
      // Başvuru listesinden kontrol
      try {
        const basvurular = JSON.parse(localStorage.getItem("erdekonline_basvurular") || "[]");
        const isletme = basvurular.find((b: { email: string; durum: string }) =>
          b.email === email && b.durum === "onaylandi"
        );
        if (isletme) {
          localStorage.setItem("eo_aktif_isletme", JSON.stringify(isletme));
          router.push("/isletme-panel");
        } else {
          setHata("İşletme bulunamadı veya henüz onaylanmadı. Başvurunuzu kontrol edin.");
          setYukleniyor(false);
        }
      } catch {
        setHata("Bir hata oluştu. Lütfen tekrar deneyin.");
        setYukleniyor(false);
      }
    }, 700);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-600 text-sm font-medium mb-6 transition-colors">
          <ArrowLeft size={16} /> Ana Sayfaya Dön
        </Link>
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-8 text-center">
            <Image src="/logo.svg" alt="ErdekOnline" width={72} height={72} className="mx-auto rounded-full mb-3" priority />
            <h1 className="text-white font-black text-2xl">İşletme Girişi</h1>
            <p className="text-orange-100 text-sm mt-1">ErdekOnline İşletme Paneli</p>
          </div>
          <div className="px-8 py-8">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              {hata && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">{hata}</div>
              )}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">E-posta</label>
                <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 gap-3 focus-within:border-orange-400 transition-colors">
                  <Store size={16} className="text-gray-400 shrink-0" />
                  <input type="email" placeholder="isletme@mail.com" value={email} onChange={e => setEmail(e.target.value)}
                    className="flex-1 outline-none text-sm text-gray-800 placeholder-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Şifre</label>
                <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 gap-3 focus-within:border-orange-400 transition-colors">
                  <Lock size={16} className="text-gray-400 shrink-0" />
                  <input type={showPass ? "text" : "password"} placeholder="••••••••" value={sifre} onChange={e => setSifre(e.target.value)}
                    className="flex-1 outline-none text-sm text-gray-800 placeholder-gray-400" />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="text-gray-400 hover:text-gray-600">
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={yukleniyor}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-3.5 rounded-xl transition-colors mt-2 text-base">
                {yukleniyor ? "Giriş yapılıyor..." : "İşletme Girişi Yap"}
              </button>
            </form>
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-3 text-sm text-gray-500">
                  <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                  <span>Başvurunuz onaylandıktan sonra giriş yapabilirsiniz.</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-gray-500">
                  <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                  <span>Henüz başvurmadıysanız ücretsiz kayıt olun.</span>
                </div>
              </div>
              <Link href="/isletme-kayit"
                className="w-full mt-4 flex items-center justify-center gap-2 border border-orange-200 text-orange-600 font-semibold py-3 rounded-xl hover:bg-orange-50 transition-colors text-sm">
                <Store size={16} /> İşletme Başvurusu Yap →
              </Link>
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-gray-400 mt-6">
          Müşteri girişi için{" "}
          <Link href="/giris" className="text-sky-600 hover:underline font-semibold">buraya tıklayın</Link>
        </p>
      </div>
    </main>
  );
}