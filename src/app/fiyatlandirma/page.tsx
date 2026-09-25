import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ArrowLeft, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Erdek İşletme Fiyatlandırma — Ücretsiz Başla",
  description:
    "ErdekOnline işletme paketleri ve fiyatları. Ücretsiz başlangıç planı ile hemen kaydol, Erdek'teki müşterilere ulaş. İlk 3 ay komisyon sıfır!",
  keywords:
    "ErdekOnline fiyat, Erdek işletme kaydı, Erdek dijital platform fiyat, ErdekOnline paket",
  alternates: { canonical: "https://erdekonline.com/fiyatlandirma" },
  openGraph: {
    title: "Erdek İşletme Fiyatlandırma — ErdekOnline",
    description: "Ücretsiz başla, Erdek'teki müşterilere ulaş. İlk 3 ay komisyon sıfır!",
    url: "https://erdekonline.com/fiyatlandirma",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ErdekOnline Fiyatlandırma" }],
  },
};

const planlar = [
  {
    isim: "Başlangıç",
    fiyat: "Ücretsiz",
    alt: "İlk 3 ay",
    renk: "border-gray-200",
    buton: "bg-gray-900 text-white hover:bg-gray-800",
    ozellikler: ["İşletme profil sayfası", "Müşteri yorumları", "Temel istatistikler", "ErdekOnline levhası", "E-posta desteği"],
  },
  {
    isim: "Standart",
    fiyat: "₺499",
    alt: "/ ay",
    renk: "border-orange-400 shadow-xl shadow-orange-100",
    rozet: "En Popüler",
    buton: "bg-orange-500 text-white hover:bg-orange-600",
    ozellikler: ["Başlangıç paketi +", "Online sipariş alma", "%8 komisyon", "Detaylı analitik", "Öncelikli destek", "Sosyal medya tanıtımı"],
  },
  {
    isim: "Premium",
    fiyat: "₺999",
    alt: "/ ay",
    renk: "border-sky-400",
    buton: "bg-sky-600 text-white hover:bg-sky-700",
    ozellikler: ["Standart paket +", "%5 komisyon", "Öne çıkan listeleme", "Reklam kampanyaları", "7/24 telefon desteği", "Özel hesap yöneticisi"],
  },
];

export default function FiyatlandirmaPage() {
  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex-1 max-w-5xl mx-auto px-4 py-16 w-full">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-sky-600 text-sm font-medium mb-10 transition-colors">
          <ArrowLeft size={16} /> Ana Sayfaya Dön
        </Link>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-gray-900 mb-3">Şeffaf Fiyatlandırma</h1>
          <p className="text-gray-500 text-lg">Gizli ücret yok. İstediğin zaman iptal.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {planlar.map((p) => (
            <div key={p.isim} className={`bg-white rounded-3xl border-2 p-8 relative ${p.renk}`}>
              {p.rozet && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-black px-4 py-1 rounded-full">{p.rozet}</div>
              )}
              <h2 className="font-black text-gray-900 text-xl mb-1">{p.isim}</h2>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-4xl font-black text-gray-900">{p.fiyat}</span>
                <span className="text-gray-400 mb-1">{p.alt}</span>
              </div>
              <div className="border-t border-gray-100 my-6" />
              <ul className="space-y-3 mb-8">
                {p.ozellikler.map((o) => (
                  <li key={o} className="flex items-center gap-2 text-sm text-gray-600">
                    <Check size={16} className="text-green-500 shrink-0" /> {o}
                  </li>
                ))}
              </ul>
              <Link href="/isletme-kayit" className={`block text-center font-bold py-3 rounded-xl transition-colors ${p.buton}`}>
                Başla →
              </Link>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-400 text-sm mt-8">Sorularınız için <a href="mailto:info@erdekonline.com" className="text-sky-600 hover:underline">info@erdekonline.com</a></p>

        {/* Karşılaştırma Tablosu */}
        <div className="mt-16">
          <h2 className="text-2xl font-black text-gray-900 text-center mb-8">Özellik Karşılaştırması</h2>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-6 py-4 text-gray-500 font-semibold w-1/2">Özellik</th>
                  <th className="text-center px-4 py-4 text-gray-700 font-black">Başlangıç</th>
                  <th className="text-center px-4 py-4 text-orange-600 font-black bg-orange-50">Standart</th>
                  <th className="text-center px-4 py-4 text-sky-700 font-black">Premium</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["İşletme Profil Sayfası", true, true, true],
                  ["Müşteri Yorumları", true, true, true],
                  ["ErdekOnline Levhası", true, true, true],
                  ["Online Sipariş Alma", false, true, true],
                  ["Temel İstatistikler", true, true, true],
                  ["Detaylı Analitik", false, true, true],
                  ["Sosyal Medya Tanıtımı", false, true, true],
                  ["Öne Çıkan Listeleme", false, false, true],
                  ["Reklam Kampanyaları", false, false, true],
                  ["Komisyon Oranı", "Yok", "%8", "%5"],
                  ["Destek", "E-posta", "Öncelikli", "7/24 Telefon"],
                  ["Özel Hesap Yöneticisi", false, false, true],
                ].map(([ozellik, baslangic, standart, premium], i) => (
                  <tr key={i} className={`border-b border-gray-50 ${i % 2 === 0 ? "" : "bg-gray-50/50"}`}>
                    <td className="px-6 py-3.5 text-gray-700 font-medium">{ozellik}</td>
                    {[baslangic, standart, premium].map((val, j) => (
                      <td key={j} className={`text-center px-4 py-3.5 ${j === 1 ? "bg-orange-50/50" : ""}`}>
                        {typeof val === "boolean" ? (
                          val
                            ? <span className="text-green-500 font-bold text-base">✓</span>
                            : <span className="text-gray-300 font-bold text-base">–</span>
                        ) : (
                          <span className="font-semibold text-gray-800">{val}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SSS */}
        <div className="mt-12 bg-sky-50 border border-sky-100 rounded-2xl p-8">
          <h2 className="font-black text-gray-900 text-xl mb-6 text-center">Sıkça Sorulan Sorular</h2>
          <div className="space-y-4 max-w-2xl mx-auto">
            {[
              { s: "İlk 3 ay ücretsiz mi gerçekten?", c: "Evet! Başlangıç paketi ilk 3 ay tamamen ücretsizdir. Kredi kartı gerekmez." },
              { s: "Komisyon nasıl hesaplanır?", c: "Komisyon yalnızca platform üzerinden gelen siparişlerden alınır. Doğrudan aramalardan komisyon alınmaz." },
              { s: "İstediğim zaman iptal edebilir miyim?", c: "Evet, herhangi bir aylık dönem sonunda herhangi bir ceza olmadan iptal edebilirsiniz." },
            ].map(({ s, c }) => (
              <div key={s} className="bg-white rounded-xl p-5 border border-sky-100">
                <p className="font-bold text-gray-900 mb-2">❓ {s}</p>
                <p className="text-gray-500 text-sm">{c}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}