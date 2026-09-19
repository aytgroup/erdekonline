import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Heart, Star, Rocket, MapPin, Phone, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Hakkımızda | ErdekOnline",
  description: "ErdekOnline hakkında bilgi edinin. Erdek'in dijital platformu, misyonumuz ve hikayemiz.",
};

const istatistikler = [
  { deger: "20+", etiket: "Kayıtlı İşletme", icon: "🏪" },
  { deger: "500+", etiket: "Mutlu Kullanıcı", icon: "😊" },
  { deger: "4.8★", etiket: "Ortalama Puan", icon: "⭐" },
  { deger: "2026", etiket: "Kuruluş Yılı", icon: "🚀" },
];

export default function HakkimizdaPage() {
  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-sky-600 to-blue-700 py-20 px-4 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-6xl mb-4">🌊</div>
          <h1 className="text-4xl font-black mb-4">Erdek&apos;in Dijital Platformu</h1>
          <p className="text-sky-100 text-lg leading-relaxed max-w-2xl mx-auto">
            ErdekOnline, Erdek&apos;teki yerel işletmeleri ve halkı dijital dünyada buluşturmak için kurulmuş bir platform.
            Yemekten markete, tekne turundan konaklamaya her şey tek tıkta.
          </p>
        </div>
      </section>

      {/* İstatistikler */}
      <section className="bg-white py-12 px-4 border-b border-gray-100">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6">
          {istatistikler.map(s => (
            <div key={s.etiket} className="text-center">
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="text-2xl font-black text-gray-900">{s.deger}</div>
              <div className="text-gray-500 text-sm mt-1">{s.etiket}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Hikayemiz */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center">
              <Rocket size={20} className="text-sky-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Hikayemiz</h2>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-8 space-y-4 text-gray-600 leading-relaxed">
            <p>Erdek, Marmara Denizi&apos;nin incisi — ama dijital dönüşümde geride kalmasın istedik.
              Yerel işletmeler müşterilerine ulaşmakta zorlanıyor, ziyaretçiler hangi restorana gideceklerini
              internetten bulamıyor, tekne turları sadece kulaktan dolma bilgilerle doluyordu.</p>
            <p>Bu boşluğu doldurmak için <span className="font-bold text-gray-800">ErdekOnline</span>&apos;u
              kurduk. Amacımız sade: Erdek&apos;teki her işletmeyi, her hizmeti, her etkinliği tek bir
              platformda toplamak ve hem yerellere hem turistlere kolayca ulaştırmak.</p>
            <p>Şu an büyüyoruz. Her gün yeni işletmeler katılıyor, her ay daha fazla sipariş alınıyor.
              Erdek&apos;in dijital nabzı olmaya kararlıyız.</p>
          </div>
        </div>
      </section>

      {/* Misyon & Vizyon */}
      <section className="py-8 px-4 bg-white">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-sky-50 border border-sky-100 rounded-2xl p-8">
            <div className="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center mb-4">
              <Heart size={22} className="text-sky-600" />
            </div>
            <h3 className="font-black text-gray-900 text-xl mb-3">Misyonumuz</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Erdek&apos;teki yerel işletmeleri güçlendirmek, halkın hayatını kolaylaştırmak
              ve Erdek&apos;i dijital dünyada hak ettiği yere taşımak.
            </p>
          </div>
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-8">
            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mb-4">
              <Star size={22} className="text-orange-500" />
            </div>
            <h3 className="font-black text-gray-900 text-xl mb-3">Vizyonumuz</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Türkiye&apos;nin her küçük şehrinde yerel ekonomiyi canlandıran dijital platformların
              öncüsü olmak. Erdek&apos;ten başlayan bir hareket.
            </p>
          </div>
        </div>
      </section>
{/* Değerlerimiz */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-gray-900 mb-8 text-center">Değerlerimiz</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { emoji: "🤝", baslik: "Yerellik", aciklama: "Erdek'in ruhunu ve insanlarını her zaman ön planda tutarız." },
              { emoji: "🔍", baslik: "Şeffaflık", aciklama: "Fiyatlar, komisyonlar ve süreçler her zaman açık ve net." },
              { emoji: "⚡", baslik: "Hız", aciklama: "Hem platform hem teslimat — Erdek'te hız standart." },
            ].map(d => (
              <div key={d.baslik} className="bg-white border border-gray-100 rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
                <div className="text-4xl mb-3">{d.emoji}</div>
                <h3 className="font-black text-gray-900 mb-2">{d.baslik}</h3>
                <p className="text-gray-500 text-sm">{d.aciklama}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* İletişim */}
      <section className="py-12 px-4 bg-white border-t border-gray-100">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-black text-gray-900 mb-2">Bize Ulaşın</h2>
          <p className="text-gray-500 mb-8">Her türlü soru ve iş birliği için.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="mailto:info@erdekonline.com"
              className="flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold px-6 py-3.5 rounded-full transition-colors">
              <Mail size={18} /> info@erdekonline.com
            </a>
            <a href="tel:+902668350000"
              className="flex items-center justify-center gap-2 border border-gray-200 text-gray-700 hover:bg-gray-50 font-bold px-6 py-3.5 rounded-full transition-colors">
              <Phone size={18} /> +90 (266) 835 00 00
            </a>
          </div>
          <div className="flex items-center justify-center gap-2 text-gray-400 text-sm mt-6">
            <MapPin size={15} className="text-sky-400" /> Erdek, Balıkesir, Türkiye
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-black mb-3">İşletmenizi Büyütmeye Hazır mısınız?</h2>
          <p className="text-orange-100 mb-6">Ücretsiz başlayın, binlerce müşteriye ulaşın.</p>
          <Link href="/isletme-kayit"
            className="inline-block bg-white text-orange-600 font-black px-8 py-3.5 rounded-full hover:bg-orange-50 transition-colors">
            Ücretsiz Başvur →
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
