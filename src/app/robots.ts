import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/isletme-panel", "/profil", "/sepet", "/siparisler", "/favoriler"],
      },
    ],
    sitemap: "https://erdekonline.com/sitemap.xml",
  };
}