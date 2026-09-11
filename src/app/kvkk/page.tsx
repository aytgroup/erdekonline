import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function KvkkPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-sky-600 text-sm font-medium mb-8 transition-colors">
          <ArrowLeft size={16} /> Ana Sayfaya Dön
        </Link>
        <h1 className="text-3xl font-black text-gray-900 mb-2">KVKK Aydınlatma Metni</h1>
        <p className="text-gray-400 text-sm mb-8">6698 Sayılı Kişisel Verilerin Korunması Kanunu</p>
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Veri Sorumlusu</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">ErdekOnline, 6698 sayılı KVKK kapsamında veri sorumlusu sıfatıyla hareket etmektedir. Merkez adres: Erdek, Balıkesir, Türkiye.</p>
          <h2 className="text-lg font-bold text-gray-900 mb-3">İşlenen Kişisel Veriler</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">Ad-soyad, e-posta, telefon numarası, teslimat adresi ve ödeme bilgileri işlenmektedir. Bu veriler hizmet sunumu ve yasal yükümlülükler kapsamında kullanılır.</p>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Haklarınız</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">KVKK kapsamında kişisel verilerinize erişme, düzeltme, silme ve itiraz etme haklarına sahipsiniz. Başvurularınız için info@erdekonline.com adresine yazabilirsiniz.</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}