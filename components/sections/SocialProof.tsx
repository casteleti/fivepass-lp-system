import { whatsappUrl } from "@/lib/whatsapp"

const trust = [
  "Centenas de grandes eventos",
  "Estabilidade no pico de venda",
  "Entrada sem fila (QR + catraca facial)",
  "Dados protegidos e LGPD",
]

export function SocialProof() {
  return (
    <section id="prova" className="sec theme-black">
      <div className="sec-in">
        <div className="sec-head">
          <span className="eyebrow">Prova real</span>
          <h2 className="h2">+12.000 pessoas entrando. A Fivepass segurando a portaria.</h2>
          <p className="lead" style={{ marginTop: 18 }}>
            Não é simulação nem render bonitinho. É um produtor mostrando a fila do evento dele entrar — QR e catraca
            facial validando em tempo real, sem travar.
          </p>
        </div>

        {/* vídeo vertical 9:16 do depoimento */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 40 }}>
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 330,
              aspectRatio: "9 / 16",
              borderRadius: 18,
              overflow: "hidden",
              border: "1px solid var(--sec-accent)",
              boxShadow: "0 0 48px rgba(0,217,255,.18)",
              background: "linear-gradient(160deg, #0e2748, #07090e)",
            }}
          >
            <video
              controls
              playsInline
              preload="metadata"
              poster="/videos/depoimento-poster.jpg"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            >
              <source src="/videos/depoimento.mp4" type="video/mp4" />
              Seu navegador não suporta vídeo.
            </video>
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px 12px", marginBottom: 36 }}>
          {trust.map((t) => (
            <span key={t} className="card" style={{ padding: "10px 16px", fontSize: 13, color: "var(--sec-text-2)", display: "inline-flex", gap: 8, alignItems: "center" }}>
              <span style={{ color: "var(--success)", fontWeight: 800 }}>✓</span>
              {t}
            </span>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <a className="cta" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            Quero testar o sistema
          </a>
        </div>
      </div>
    </section>
  )
}
