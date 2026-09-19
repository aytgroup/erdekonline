import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Gizlilik Politikası | ErdekOnline",
  description: "ErdekOnline gizlilik politikası. Kişisel verilerinizin nasıl toplandığı ve kullanıldığı hakkında bilgi.",
};
import WhatsAppButton from "@/components/WhatsAppButton";

export default function GizlilikPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-sky-600 text-sm font-medium mb-8 transition-colors">
          <ArrowLeft size={16} /> Ana Sayfaya Dön
        </Link>
        <h1 className="text-3xl font-black text-gray-900 mb-2">Gizlilik Politikası</h1>
        <p className="text-gray-400 text-sm mb-8">Son güncelleme: Eylül 2026</p>
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 prose prose-gray max-w-none">
          <h2 className="text-lg font-bold text-gray-900 mb-3">1. Toplanan Bilgiler</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">ErdekOnline olarak, hizmetlerimizi kullanırken ad, e-posta, telefon numarası ve adres gibi kişisel bilgilerinizi toplamaktayız. Bu bilgiler yalnızca sipariş ve hizmet süreçlerinin yürütülmesi amacıyla kullanılır.</p>
          <h2 className="text-lg font-bold text-gray-900 mb-3">2. Bilgilerin Kullanımı</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">Toplanan veriler; sipariş takibi, müşteri desteği, platform iyileştirmeleri ve yasal yükümlülüklerin yerine getirilmesi amacıyla kullanılır. Verileriniz üçüncü taraflarla paylaşılmaz.</p>
          <h2 className="text-lg font-bold text-gray-900 mb-3">3. Çerezler</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">Sitemiz, kullanıcı deneyimini iyileştirmek amacıyla çerez kullanmaktadır. Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz.</p>
          <h2 className="text-lg font-bold text-gray-900 mb-3">4. İletişim</h2>
          <p className="text-gray-600 text-sm leading-relaxed">Gizlilik politikamız hakkında sorularınız için <a href="mailto:info@erdekonline.com" className="text-sky-600 hover:underline">info@erdekonline.com</a> adresine yazabilirsiniz.</p>
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}