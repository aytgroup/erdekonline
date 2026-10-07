import { Zap, Shield, MapPin, Smartphone, Star, Clock } from "lucide-react";

const ozellikler = [
  { icon:<Zap size={24} className="text-orange-500"/>, baslik:"Hizli Teslimat", aciklama:"Ortalama 20 dakikada kapi kapi teslimat. Erdek'te en hizli servis." },
  { icon:<Shield size={24} className="text-sky-500"/>, baslik:"Guvenli Odeme", aciklama:"128-bit SSL sifreleme ile guvenli odeme. Bilgileriniz her zaman koruma altinda." },
  { icon:<MapPin size={24} className="text-green-500"/>, baslik:"Erdek'e Ozel", aciklama:"Sadece Erdek'e odaklandik. Yerel isletmeleri en iyi biz taniyoruz." },
  { icon:<Smartphone size={24} className="text-purple-500"/>, baslik:"Kolay Kullanim", aciklama:"Mobil uyumlu tasarim ile her cihazdan kolayca siparis verin." },
  { icon:<Star size={24} className="text-yellow-500"/>, baslik:"Gercek Yorumlar", aciklama:"Sadece siparis veren musteriler yorum yapabilir. %100 gercek puanlar." },
  { icon:<Clock size={24} className="text-red-500"/>, baslik:"7/24 Destek", aciklama:"Her zaman yaninizdayiz. WhatsApp veya telefon ile aninda destek." },
];

export default function WhyErDekOnline() {
  return (
    <section className="w-full py-16 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-sky-100 text-sky-700 font-semibold text-sm px-4 py-1.5 rounded-full mb-3">Neden ErdekOnline?</span>
          <h2 className="text-3xl font-black text-gray-900 mb-3">Erdek&apos;in En Iyi Platformu</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Erdek&apos;te yasam ve tatil deneyimini kolaylastirmak icin tasarlandi.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ozellikler.map((o,i)=>(
            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-4">{o.icon}</div>
              <h3 className="font-black text-gray-900 text-base mb-2">{o.baslik}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{o.aciklama}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

