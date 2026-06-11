"use client"

import { LeadForm } from "@/components/ui/LeadForm"

export function FinalCTA() {
  return (
    <section
      id="cta"
      style={{
        padding: "120px 24px",
        background: `radial-gradient(ellipse 100% 80% at 50% 100%, #1e3a5f44 0%, transparent 70%), var(--bg-dark)`,
      }}
    >
      <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
        <div style={{ marginBottom: "16px" }}>
          <span
            style={{
              display: "inline-block",
              padding: "6px 16px",
              borderRadius: "100px",
              background: "#00d9ff0a",
              border: "1px solid #00d9ff33",
              color: "var(--accent)",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Vagas limitadas para onboarding em julho
          </span>
        </div>

        <h2
          style={{
            fontSize: "clamp(28px, 5vw, 52px)",
            fontWeight: 800,
            color: "var(--text-primary)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: "20px",
          }}
        >
          Pronto para vender seus ingressos<br />
          <span style={{ color: "var(--accent)" }}>do seu jeito?</span>
        </h2>

        <p
          style={{
            fontSize: "17px",
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            marginBottom: "56px",
          }}
        >
          Agende uma demonstração gratuita e descubra como Fivepass pode
          transformar a operação do seu próximo evento em menos de 30 minutos.
        </p>

        <div
          style={{
            background: "var(--bg-darker)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "48px",
            backdropFilter: "blur(8px)",
          }}
        >
          <LeadForm variant="final-cta" />
        </div>
      </div>
    </section>
  )
}
