"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const yorumlar = [
  { id: 1, isim: "Ayşe K.", sehir: "İstanbul", puan: 5, yorum: "Yaz tatilinde Erdek'te kaldım. Kalamar Balık'tan sipariş verdim, gerçekten muhteşemdi. Hem hızlı hem lezzetli!", isletme: "Kalamar Balık Restaurant", emoji: "🐟", tarih: "Ağustos 2026" },
  { id: 2, isim: "Mehmet Y.", sehir: "Ankara", puan: 5, yorum: "ErdekOnline sayesinde tatil planımı kolayca yaptım. Tekne turu rezervasyonunu buradan yaptım, harika bir deneyimdi.", isletme: "Erdek Mavi Tur", emoji: "⛵", tarih: "Temmuz 2026" },
  { id: 3, isim: "Zeynep A.", sehir: "Bursa", puan: 5, yorum: "Yerel köy ürünleri bölümü inanılmaz! Zeytinyağı ve bal sipariş ettim, eve kadar geldi. Erdek'in tadını İstanbul'da yaşıyorum.", isletme: "Yerel Köy Ürünleri", emoji: "🫒", tarih: "Eylül 2026" },
  { id: 4, isim: "Ali R.", sehir: "İzmir", puan: 5, yorum: "Pansiyon rezervasyonumu buradan yaptım. Çok kolay ve güvenilir. Sahil Pansiyon çok temizdi, tavsiye ederim.", isletme: "Erdek Sahil Pansiyon", emoji: "🏨", tarih: "Ağustos 2026" },
  { id: 5, isim: "Fatma S.", sehir: "Erdek", puan: 5, yorum: "Erdekliyim ama ErdekOnline'ı çok sevdim. Artık marketten sipariş veriyorum, eve 20 dakikada geliyor. Harika!", isletme: "Şevket Market", emoji: "🛒", tarih: "Eylül 2026" },
];

export default function TestimonialSection() {
  const [aktif, setAktif] = useState(0);

  const onceki = () => setAktif(a => (a - 1 + yorumlar.length) % yorumlar.length);
  const sonraki = () => setAktif(a => (a + 1) % yorumlar.length);

  const y = yorumlar[aktif];

  return (
    <section className="w-full bg-gradient-to-br from-sky-50 to-blue-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block bg-yellow-100 text-yellow-700 font-semibold text-sm px-4 py-1.5 rounded-full mb-3">
            ⭐ Müşteri Yorumları
          </span>
          <h2 className="text-3xl font-black text-gray-900">Onlar Ne Dedi?</h2>
          <p className="text-gray-500 text-sm mt-2">Gerçek kullanıcıların gerçek deneyimleri</p>
        </div>

        <div className="relative">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
            {/* Yıldızlar */}
            <div className="flex gap-1 mb-6 justify-center">
              {[...Array(y.puan)].map((_, i) => (
                <Star key={i} size={22} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>

            {/* Yorum */}
            <blockquote className="text-gray-700 text-lg md:text-xl font-medium leading-relaxed text-center mb-8 italic">
              &ldquo;{y.yorum}&rdquo;
            </blockquote>

            {/* Kullanıcı */}
            <div className="flex items-center justify-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full flex items-center justify-center text-white font-black text-lg shadow-md">
                {y.isim.charAt(0)}
              </div>
              <div className="text-left">
                <p className="font-black text-gray-900">{y.isim}</p>
                <p className="text-gray-500 text-sm">{y.sehir} · {y.tarih}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-sm">{y.emoji}</span>
                  <span className="text-xs text-sky-600 font-semibold">{y.isletme}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigasyon */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={onceki}
              className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:bg-sky-50 hover:border-sky-300 hover:text-sky-600 transition-all">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {yorumlar.map((_, i) => (
                <button key={i} onClick={() => setAktif(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${i === aktif ? "bg-sky-500 w-6" : "bg-gray-300"}`} />
              ))}
            </div>
            <button onClick={sonraki}
              className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:bg-sky-50 hover:border-sky-300 hover:text-sky-600 transition-all">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Alt istatistik */}
        <div className="grid grid-cols-3 gap-4 mt-10">
          {[
            { deger: "500+", etiket: "Mutlu Müşteri", emoji: "😊" },
            { deger: "4.9★", etiket: "Ort. Puan", emoji: "⭐" },
            { deger: "%98", etiket: "Memnuniyet", emoji: "💚" },
          ].map(s => (
            <div key={s.etiket} className="bg-white rounded-2xl p-5 text-center border border-gray-100 shadow-sm">
              <div className="text-2xl mb-1">{s.emoji}</div>
              <div className="text-2xl font-black text-gray-900">{s.deger}</div>
              <div className="text-gray-500 text-xs mt-1">{s.etiket}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}