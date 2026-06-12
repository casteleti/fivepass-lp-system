import { whatsappUrl } from "@/lib/whatsapp"

const proofs = [
  "3% a 5% de taxa",
  "Dinheiro na hora, na sua conta",
  "Sua marca, seu domínio",
  "Testado por centenas de grandes eventos",
]

export function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, #1e3a5f33 0%, transparent 70%), var(--bg-darker)",
        display: "flex",
        alignItems: "center",
        padding: "120px 24px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto", width: "100%", position: "relative" }}>
        {/* Eyebrow — âncora de categoria (marca ainda desconhecida) */}
        <div style={{ marginBottom: "28px" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "100px",
              border: "1px solid #00d9ff33",
              background: "#00d9ff0a",
              color: "var(--accent)",
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "0.02em",
            }}
          >
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent)" }} />
            Plataforma de ticketing white-label
          </span>
        </div>

        {/* H1 — V4: claim de categoria + margem */}
        <h1
          style={{
            fontSize: "clamp(38px, 6vw, 68px)",
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
            marginBottom: "24px",
            maxWidth: "880px",
          }}
        >
          A bilheteria que mais dá <span style={{ color: "var(--accent)" }}>margem</span> pro produtor de eventos.
        </h1>

        {/* Subheadline — mecanismo + prova */}
        <p
          style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "var(--text-secondary)",
            lineHeight: 1.6,
            marginBottom: "40px",
            maxWidth: "620px",
          }}
        >
          Menor taxa do mercado (<strong style={{ color: "var(--text-primary)" }}>3% a 5%</strong>), tudo com a{" "}
          <strong style={{ color: "var(--text-primary)" }}>sua marca</strong> e o dinheiro caindo direto na sua
          conta, <strong style={{ color: "var(--text-primary)" }}>na hora</strong>. Seu evento vende, sua margem cresce.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "16px 32px",
              background: "var(--accent)",
              color: "var(--bg-darker)",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 0 24px #00d9ff33",
            }}
          >
            Quero testar o sistema
          </a>
          <a
            href="#how-it-works"
            style={{
              padding: "16px 32px",
              background: "transparent",
              color: "var(--text-secondary)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Como funciona ↓
          </a>
        </div>

        {/* Faixa de micro-prova */}
        <div style={{ marginTop: "56px", display: "flex", gap: "12px 28px", flexWrap: "wrap" }}>
          {proofs.map((p) => (
            <div key={p} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ color: "var(--success)", fontSize: "15px", fontWeight: 700 }}>✓</span>
              <span style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>{p}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
