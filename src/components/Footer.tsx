import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";

const platformLinks = [
  { href: "/yemek", label: "🍽️ Yemek Siparişi" },
  { href: "/market", label: "🛒 Market" },
  { href: "/tekne", label: "⛵ Tekne Turları" },
  { href: "/konaklama", label: "🏨 Konaklama" },
  { href: "/yerel", label: "🐟 Yerel Ürünler" },
  { href: "/hizmetler", label: "💈 Hizmetler" },
  { href: "/etkinlikler", label: "🎭 Etkinlikler" },
  { href: "/isletmeler", label: "🏪 Tüm İşletmeler" },
];

const businessLinks = [
  { href: "/isletme-kayit", label: "İşletme Kaydı" },
  { href: "/isletme-giris", label: "İşletme Girişi" },
  { href: "/fiyatlandirma", label: "Fiyatlandırma" },
  { href: "/isletme-bilgi", label: "Nasıl Çalışır?" },
  { href: "/destek", label: "Destek" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/blog", label: "📝 Erdek Rehberi" },
];

const socialLinks = [
  {
    href: "https://www.instagram.com/erdekonline/",
    label: "Instagram",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    href: "https://www.facebook.com/erdekonline",
    label: "Facebook",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    href: "https://twitter.com/erdekonline",
    label: "X (Twitter)",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.svg"
                alt="Erdek Online Logo"
                width={52}
                height={52}
                className="rounded-full drop-shadow-lg"
              />
              <span className="font-black text-white text-lg">
                Erdek<span className="text-sky-400">Online</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Erdek&apos;in dijital platformu. Yerel işletmeleri ve halkı bir araya getiriyoruz.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
              <MapPin size={14} className="text-sky-400 shrink-0" />
              Erdek, Balıkesir, Türkiye
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
              <Phone size={14} className="text-sky-400 shrink-0" />
              <a href="tel:+902668350000" className="hover:text-sky-400 transition-colors">+90 (266) 835 00 00</a>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Mail size={14} className="text-sky-400 shrink-0" />
              <a href="mailto:info@erdekonline.com" className="hover:text-sky-400 transition-colors">info@erdekonline.com</a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-white font-bold mb-4">Platform</h4>
            <ul className="space-y-2.5">
              {platformLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-sky-400 text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* İşletmeler */}
          <div>
            <h4 className="text-white font-bold mb-4">İşletmeler</h4>
            <ul className="space-y-2.5">
              {businessLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-sky-400 text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* App + Social */}
          <div>
            <h4 className="text-white font-bold mb-4">Mobil Uygulama</h4>
            <p className="text-gray-400 text-sm mb-4">Yakında App Store ve Google Play&apos;de!</p>
            <div className="space-y-2 mb-5">
              <div className="flex items-center gap-3 bg-gray-800 rounded-xl px-4 py-3 border border-gray-700 opacity-70">
                <span className="text-2xl">🍎</span>
                <div>
                  <div className="text-xs text-gray-400">Yakında</div>
                  <div className="text-white text-sm font-semibold">App Store</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gray-800 rounded-xl px-4 py-3 border border-gray-700 opacity-70">
                <span className="text-2xl">🤖</span>
                <div>
                  <div className="text-xs text-gray-400">Yakında</div>
                  <div className="text-white text-sm font-semibold">Google Play</div>
                </div>
              </div>
            </div>
            <h4 className="text-white font-bold mb-3 text-sm">Takip Et</h4>
            <div className="flex gap-3">
              {socialLinks.map(({ svg, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 bg-gray-800 hover:bg-sky-600 rounded-lg flex items-center justify-center transition-colors border border-gray-700 text-gray-400 hover:text-white"
                >
                  {svg}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <span>© 2026 ErdekOnline. Tüm hakları saklıdır.</span>
          <div className="flex gap-4">
            <Link href="/gizlilik" className="hover:text-sky-400 transition-colors">Gizlilik Politikası</Link>
            <Link href="/kullanim-kosullari" className="hover:text-sky-400 transition-colors">Kullanım Koşulları</Link>
            <Link href="/kvkk" className="hover:text-sky-400 transition-colors">KVKK</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}