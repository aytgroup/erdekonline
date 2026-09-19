const GA_ID = "G-80P45WTK19";

// dataLayer ve gtag stub'ını hemen tanımla
(window as unknown as Record<string, unknown>).dataLayer =
  (window as unknown as Record<string, unknown>).dataLayer || [];

function gtag(...args: unknown[]) {
  ((window as unknown as Record<string, unknown>).dataLayer as unknown[]).push(args);
}

(window as unknown as Record<string, unknown>).gtag = gtag;

gtag("js", new Date());
gtag("config", GA_ID, { send_page_view: true });

// GA4 script tag'ini head'e ekle
const script = document.createElement("script");
script.id = "ga4-gtm";
script.async = true;
script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
document.head.appendChild(script);

// Router geçişlerinde sayfa görünümü gönder
export function onRouterTransitionStart(url: string) {
  const w = window as unknown as Record<string, unknown>;
  if (typeof w.gtag === "function") {
    (w.gtag as (...a: unknown[]) => void)("config", GA_ID, { page_path: url });
  }
}