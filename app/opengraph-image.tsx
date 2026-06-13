import { ImageResponse } from "next/og"

// OG image 1200x630 — usada por Open Graph e Twitter (preview no WhatsApp/Instagram/Meta).
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "Fivepass — A bilheteria que mais dá margem pro seu evento"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(ellipse 90% 70% at 50% 0%, #0b2f5e 0%, transparent 60%), linear-gradient(135deg, #07090e 0%, #0b2447 100%)",
          color: "#f4f7fb",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 64, fontWeight: 800, letterSpacing: "-0.02em" }}>
          <span>FI</span>
          <span style={{ color: "#00d9ff" }}>V</span>
          <span>EPASS</span>
        </div>

        <div style={{ display: "flex", fontSize: 60, fontWeight: 800, lineHeight: 1.1, marginTop: 36, maxWidth: 920 }}>
          A bilheteria que mais dá margem pro seu evento.
        </div>

        <div style={{ display: "flex", fontSize: 30, color: "#bcceea", marginTop: 28 }}>
          Menor taxa do mercado (3% a 5%) · Sua marca · Dinheiro na hora
        </div>

        <div style={{ display: "flex", alignItems: "center", marginTop: 44, fontSize: 26, color: "#00d9ff", fontWeight: 700 }}>
          Mais eventos. Menos taxas.
        </div>
      </div>
    ),
    { ...size },
  )
}
