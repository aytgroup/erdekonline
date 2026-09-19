import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ErdekOnline",
    short_name: "ErdekOnline",
    description: "Erdek'in dijital platformu. Yemek, market, tekne turu ve daha fazlası.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0284c7",
    orientation: "portrait",
    categories: ["food", "shopping", "travel", "lifestyle"],
    icons: [
      {
        src: "/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcuts: [
      {
        name: "Yemek Siparişi",
        url: "/yemek",
        description: "Restoran ve yemek siparişi ver",
      },
      {
        name: "İşletmeler",
        url: "/isletmeler",
        description: "Tüm işletmelere göz at",
      },
      {
        name: "Tekne Turları",
        url: "/tekne",
        description: "Tekne turu rezervasyonu yap",
      },
    ],
  };
}