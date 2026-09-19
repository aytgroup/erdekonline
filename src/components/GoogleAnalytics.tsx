"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const GA_ID = "G-80P45WTK19";

type GtagWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
};

export function GaPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const w = window as GtagWindow;
    if (typeof w.gtag !== "function") return;
    const url = pathname + (searchParams?.toString() ? "?" + searchParams.toString() : "");
    w.gtag("config", GA_ID, { page_path: url });
  }, [pathname, searchParams]);

  return null;
}

export default function GoogleAnalytics() {
  useEffect(() => {
    if (document.getElementById("ga4-script")) return;

    const w = window as GtagWindow;
    w.dataLayer = w.dataLayer || [];
    w.gtag = function (...args: unknown[]) {
      (w.dataLayer as unknown[]).push(args);
    };
    w.gtag("js", new Date());
    w.gtag("config", GA_ID, { send_page_view: true });

    const script = document.createElement("script");
    script.id = "ga4-script";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);
  }, []);

  return null;
}