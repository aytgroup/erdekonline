import Link from "next/link";
import { ArrowLeft, Phone, Mail, MessageCircle, Clock } from "lucide-react";

export default function DestekPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-sky-600 text-sm font-medium mb-8 transition-colors">
          <ArrowLeft size={16} /> Ana Sayfaya Dön
        </Link>
        <h1 className="text-3xl font-black text-gray-900 mb-2">Destek Merkezi</h1>
        <p className="text-gray-500 mb-8">Size yardımcı olmaktan mutluluk duyarız.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <a href="https://wa.me/902668350000" target="_blank" rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white rounded-2xl p-6 flex items-center gap-4 transition-colors">
            <MessageCircle size={32} />
            <div>
              <div className="font-black text-lg">WhatsApp</div>
              <div className="text-green-100 text-sm">Hızlı destek için</div>
            </div>
          </a>
          <a href="tel:+902668350000"
            className="bg-sky-500 hover:bg-sky-600 text-white rounded-2xl p-6 flex items-center gap-4 transition-colors">
            <Phone size={32} />
            <div>
              <div className="font-black text-lg">Telefon</div>
              <div className="text-sky-100 text-sm">+90 (266) 835 00 00</div>
            </div>
          </a>
          <a href="mailto:info@erdekonline.com"
            className="bg-white hover:bg-gray-50 border border-gray-200 rounded-2xl p-6 flex items-center gap-4 transition-colors">
            <Mail size={32} className="text-orange-500" />
            <div>
              <div className="font-black text-lg text-gray-900">E-posta</div>
              <div className="text-gray-500 text-sm">info@erdekonline.com</div>
            </div>
          </a>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center gap-4">
            <Clock size={32} className="text-purple-500" />
            <div>
              <div className="font-black text-lg text-gray-900">Çalışma Saatleri</div>
              <div className="text-gray-500 text-sm">Her gün 09:00 – 23:00</div>
            </div>
          </div>
        </div>
        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6">
          <h2 className="font-black text-orange-800 mb-3">Sık Sorulan Sorular</h2>
          <div className="space-y-3">
            {[
              ["Siparişimi nasıl takip ederim?", "Hesabım > Siparişlerim bölümünden tüm siparişlerinizi takip edebilirsiniz."],
              ["İptal/iade nasıl yapılır?", "Sipariş onayından sonraki 5 dakika içinde iptal yapılabilir. Destek hattımızı arayın."],
              ["İşletmemi nasıl eklerim?", "İşletme Ol butonuna tıklayın, 3 adımlı formu doldurun, 24 saat içinde sizi arayalım."],
            ].map(([q, a]) => (
              <div key={q} className="bg-white rounded-xl p-4 border border-orange-100">
                <div className="font-semibold text-gray-900 text-sm mb-1">{q}</div>
                <div className="text-gray-500 text-sm">{a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}