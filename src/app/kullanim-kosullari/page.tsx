import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function KullanimKosullariPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-sky-600 text-sm font-medium mb-8 transition-colors">
          <ArrowLeft size={16} /> Ana Sayfaya Dön
        </Link>
        <h1 className="text-3xl font-black text-gray-900 mb-2">Kullanım Koşulları</h1>
        <p className="text-gray-400 text-sm mb-8">Son güncelleme: Eylül 2026</p>
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-3">1. Hizmet Kullanımı</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">ErdekOnline platformunu kullanan tüm kullanıcılar bu koşulları kabul etmiş sayılır. Platform yalnızca yasal amaçlarla kullanılabilir.</p>
          <h2 className="text-lg font-bold text-gray-900 mb-3">2. Hesap Güvenliği</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">Hesabınızın güvenliğinden siz sorumlusunuz. Şifrenizi kimseyle paylaşmayınız. Yetkisiz erişim durumunda derhal info@erdekonline.com adresine bildirin.</p>
          <h2 className="text-lg font-bold text-gray-900 mb-3">3. İşletme Sorumlulukları</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">Platform üzerindeki işletmeler, sundukları ürün ve hizmetlerin doğruluğundan ve kalitesinden sorumludur. ErdekOnline aracı konumundadır.</p>
          <h2 className="text-lg font-bold text-gray-900 mb-3">4. Değişiklikler</h2>
          <p className="text-gray-600 text-sm leading-relaxed">Bu koşullar önceden haber verilmeksizin güncellenebilir. Güncel koşullar her zaman bu sayfada yer alır.</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}