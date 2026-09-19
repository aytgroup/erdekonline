const features = [
  { emoji: "⚡", title: "Hızlı Teslimat", desc: "Ortalama 30 dakikada kapınıza. Erdek'in her köşesine ulaşıyoruz.", bg: "bg-yellow-50 border-yellow-100" },
  { emoji: "📞", title: "Kolay Sipariş", desc: "Tek tıkla arayın veya WhatsApp üzerinden sipariş verin. Hızlı ve pratik.", bg: "bg-green-50 border-green-100" },
  { emoji: "❤️", title: "Yerel Destek", desc: "Erdek'in işletmelerini destekleyin. Her siparişte şehrinize katkı.", bg: "bg-red-50 border-red-100" },
  { emoji: "💬", title: "7/24 Destek", desc: "WhatsApp veya telefon ile anında yanıt alın. Her zaman yanınızdayız.", bg: "bg-sky-50 border-sky-100" },
  { emoji: "⭐", title: "Güvenilir Yorumlar", desc: "Gerçek müşteri yorumları ile doğru işletmeyi seçin.", bg: "bg-purple-50 border-purple-100" },
  { emoji: "👥", title: "Topluluk", desc: "Yorumlar, öneriler ve etkinlikler bir arada. Erdek'in dijital nabzı.", bg: "bg-orange-50 border-orange-100" },
];

export default function WhyErDekOnline() {
  return (
    <section className="w-full bg-gray-50 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-sky-100 text-sky-600 font-semibold text-sm px-4 py-1.5 rounded-full mb-3">
            Neden ErdekOnline?
          </span>
          <h2 className="text-3xl font-black text-gray-900 mb-3">
            <span className="text-orange-500">Erdek&apos;e Özel,</span> <span className="text-sky-500">Size Özel</span>
          </h2>
          <p className="text-gray-500 text-base max-w-lg mx-auto">
            Büyük şehir uygulamalarının sunmadığı yerel deneyimi Erdek&apos;in ruhunu taşıyan bir platformla yaşayın.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div key={f.title} className={`border rounded-2xl p-6 hover:shadow-md transition-shadow ${f.bg}`}>
              <div className="text-3xl mb-4">{f.emoji}</div>
              <h3 className="font-bold text-gray-900 text-base mb-2">{f.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}