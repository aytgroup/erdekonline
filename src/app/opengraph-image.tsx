import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ErdekOnline — Erdek'in Dijital Platformu";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0284c7 0%, #2563eb 60%, #1d4ed8 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          padding: "60px",
          position: "relative",
        }}
      >
        {/* Arka plan desen */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 50%)",
          }}
        />

        {/* Logo + Marka */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "32px" }}>
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "44px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
            }}
          >
            🌊
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "white", fontSize: "52px", fontWeight: 900, lineHeight: 1 }}>
              Erdek
              <span style={{ color: "#fde047" }}>Online</span>
            </span>
            <span style={{ color: "rgba(186,230,253,0.9)", fontSize: "20px", marginTop: "4px" }}>
              Erdek bir tık uzağında
            </span>
          </div>
        </div>

        {/* Ana başlık */}
        <div
          style={{
            color: "white",
            fontSize: "38px",
            fontWeight: 800,
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: "28px",
            maxWidth: "900px",
          }}
        >
          Erdek&apos;in Dijital Platformu
        </div>

        {/* Hizmet ikonları */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "36px" }}>
          {[
            { emoji: "🍽️", label: "Yemek" },
            { emoji: "🛒", label: "Market" },
            { emoji: "⛵", label: "Tekne" },
            { emoji: "🏨", label: "Konaklama" },
            { emoji: "🫒", label: "Yerel" },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px",
                background: "rgba(255,255,255,0.15)",
                borderRadius: "16px",
                padding: "14px 20px",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              <span style={{ fontSize: "32px" }}>{item.emoji}</span>
              <span style={{ color: "rgba(224,242,254,0.95)", fontSize: "14px", fontWeight: 600 }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Alt bilgi */}
        <div
          style={{
            color: "rgba(186,230,253,0.8)",
            fontSize: "18px",
            textAlign: "center",
          }}
        >
          www.erdekonline.com
        </div>
      </div>
    ),
    { ...size }
  );
}