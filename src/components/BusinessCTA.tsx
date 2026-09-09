import Link from "next/link";

const benefits = [
  "Ücretsiz işletme sayfası oluştur",
  "Erdek'teki binlerce müşteriye ulaş",
  "Siparişleri kolayca yönet",
  "İlk 3 ay komisyon sıfır",
  "7/24 teknik destek",
  "Kapına 'ErdekOnline Üyesi' levhası",
];

export default function BusinessCTA() {
  return (
    <section className="w-full py-14 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div
          className="rounded-3xl overflow-hidden"
          style={{ background: "linear-gradient(135deg,#0284c7,#2563eb)" }}
        >
          <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
            {/* Sol */}
            <div>
              <span className="inline-flex items-center gap-2 bg-yellow-400/20 text-yellow-300 text-sm font-semibold px-3 py-1.5 rounded-full border border-yellow-400/30 mb-5">
                🏪 İşletme Sahipleri
              </span>
              <h2 className="text-3xl font-black text-white mb-4 leading-tight">
                İşletmenizi<br />
                <span className="text-yellow-300">Dijitale Taşıyın</span>
              </h2>
              <p className="text-sky-100 text-base leading-relaxed mb-6">
                Erdek&apos;teki işletmenizi ErdekOnline&apos;a ekleyin. Müşterileriniz sizi kolayca
                bulsun ve kapınıza &quot;ErdekOnline Üyesidir&quot; levhasını asın.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/isletme-kayit"
                  className="bg-white text-sky-700 font-bold px-6 py-3 rounded-xl hover:bg-sky-50 transition-colors text-center"
                >
                  Hemen Başla →
                </Link>
                <Link
                  href="/isletme-bilgi"
                  className="border border-white/40 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors text-center"
                >
                  Daha Fazla Bilgi
                </Link>
              </div>
            </div>

            {/* Sağ */}
            <div className="flex flex-col justify-center gap-3">
              <h3 className="text-white font-bold text-lg mb-1">Avantajlarınız:</h3>
              {benefits.map((b) => (
                <div key={b} className="flex items-center gap-3">
                  <span className="text-green-400 text-lg">✓</span>
                  <span className="text-sky-100 text-sm">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}