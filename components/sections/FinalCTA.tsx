import { whatsappUrl } from "@/lib/whatsapp"

export function FinalCTA() {
  return (
    <section
      id="cta"
      style={{
        padding: "120px 24px",
        background: "radial-gradient(ellipse 100% 80% at 50% 100%, #1e3a5f55 0%, transparent 70%), var(--bg-dark)",
      }}
    >
      <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
        <h2
          style={{
            fontSize: "clamp(30px, 5vw, 52px)",
            fontWeight: 800,
            color: "var(--text-primary)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: "20px",
          }}
        >
          Seu próximo evento pode dar <span style={{ color: "var(--accent)" }}>mais margem</span>.
        </h2>

        <p style={{ fontSize: "18px", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "40px" }}>
          Fale com a Fivepass no WhatsApp. A gente mostra a plataforma funcionando e calcula com você quanto a sua
          operação economiza em taxa.
        </p>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "18px 40px",
            background: "var(--accent)",
            color: "var(--bg-darker)",
            borderRadius: "10px",
            fontSize: "17px",
            fontWeight: 700,
            textDecoration: "none",
            boxShadow: "0 0 32px #00d9ff44",
          }}
        >
          Quero testar o sistema
        </a>

        <p style={{ fontSize: "13px", color: "var(--text-tertiary)", marginTop: "20px" }}>
          Sem compromisso. Atendimento humano que responde rápido.
        </p>

        <p style={{ fontSize: "17px", color: "var(--text-secondary)", marginTop: "56px", fontStyle: "italic" }}>
          Seu evento terminou. Seu dinheiro já está na sua conta.
        </p>
      </div>
    </section>
  )
}
