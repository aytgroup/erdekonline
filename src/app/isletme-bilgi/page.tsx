import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "İşletme Bilgileri | ErdekOnline",
  description: "ErdekOnline'a işletmenizi ekleyin. Ücretsiz başlangıç, ilk 3 ay komisyon sıfır.",
};

const steps = [
  { num: "1", title: "Başvurun", desc: "İşletme Ol butonuna tıklayın, 2 dakikada formu doldurun." },
  { num: "2", title: "Onay", desc: "Ekibimiz 24 saat içinde sizi arayarak bilgileri doğrular." },
  { num: "3", title: "Yayına Alın", desc: "İşletme sayfanız hazır! Müşteriler sizi bulmaya başlar." },
  { num: "4", title: "Büyüyün", desc: "Siparişleri yönetin, yorumları takip edin, satışları artırın." },
];

const faydalar = [
  { icon: "🆓", title: "İlk 3 Ay Ücretsiz", desc: "Komisyon sıfır, aylık ücret yok." },
  { icon: "📱", title: "Kolay Yönetim", desc: "Telefonunuzdan siparişleri anlık görün." },
  { icon: "📊", title: "İstatistikler", desc: "Kaç kişi gördü, kaçı sipariş verdi, kazancınız." },
  { icon: "🏷️", title: "ErdekOnline Levhası", desc: "Fiziksel levha kapınıza ücretsiz gelir." },
  { icon: "⭐", title: "Değerlendirmeler", desc: "Müşteri yorumlarıyla güven oluşturun." },
  { icon: "📣", title: "Sosyal Medya", desc: "İşletmeniz sosyal medyada paylaşılır." },
];

export default function IsletmeBilgiPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="bg-gradient-to-r from-orange-500 to-sky-600 text-white py-16 px-4 text-center">
        <h1 className="text-4xl font-black mb-4">İşletmenizi Büyütün</h1>
        <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">Erdek&apos;teki binlerce müşteriye ErdekOnline üzerinden ulaşın.</p>
        <Link href="/isletme-kayit" className="inline-flex items-center gap-2 bg-white text-orange-600 font-black px-8 py-4 rounded-full hover:bg-orange-50 transition-colors text-lg">
          Hemen Başla — Ücretsiz →
        </Link>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-black text-gray-900 text-center mb-10">Nasıl Çalışır?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((s) => (
            <div key={s.num} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
              <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-black text-lg mx-auto mb-4">{s.num}</div>
              <h3 className="font-black text-gray-900 mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-black text-gray-900 text-center mb-10">Neden ErdekOnline?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {faydalar.map((f) => (
            <div key={f.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-black text-gray-900 mb-1">{f.title}</h3>
              <p className="text-gray-500 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link href="/isletme-kayit" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-black px-10 py-4 rounded-full transition-colors text-lg">
            İşletmemi Ekle →
          </Link>
          <p className="text-gray-400 text-sm mt-3">İlk 3 ay komisyon sıfır · Kurulum ücretsiz</p>
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}