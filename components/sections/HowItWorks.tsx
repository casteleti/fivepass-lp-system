const steps = [
  {
    step: 1,
    title: "Configure seu evento",
    description: "Defina ingressos, lotes, preços, quantidade e período de vendas direto no painel. Em minutos.",
  },
  {
    step: 2,
    title: "Personalize sua página",
    description: "Página de vendas com sua marca, cores e domínio. Nenhum logo de terceiro na frente do seu público.",
  },
  {
    step: 3,
    title: "Divulgue e venda",
    description: "Compartilhe o link de vendas. Checkout otimizado, pagamento em múltiplas formas, 100% seguro.",
  },
  {
    step: 4,
    title: "Acompanhe em tempo real",
    description: "Dashboard com vendas, receita, origem do tráfego e comportamento do público. Tudo em um lugar.",
  },
  {
    step: 5,
    title: "Execute e cresça",
    description: "No dia do evento, controle o acesso via QR. Pós-evento: sua base de compradores para remarketing.",
  },
]

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      style={{
        padding: "120px 24px",
        background: "var(--bg-dark)",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <p style={{ color: "var(--accent)", fontSize: "13px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>
            Como funciona
          </p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.2 }}>
            De zero ao ingresso vendido em um dia
          </h2>
        </div>

        <div style={{ position: "relative" }}>
          {/* Linha vertical */}
          <div
            style={{
              position: "absolute",
              left: "28px",
              top: "32px",
              bottom: "32px",
              width: "1px",
              background: "linear-gradient(180deg, var(--accent) 0%, var(--border) 100%)",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {steps.map((step, i) => (
              <div
                key={step.step}
                style={{
                  display: "flex",
                  gap: "32px",
                  alignItems: "flex-start",
                  padding: "32px 0",
                  borderBottom: i < steps.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    background: "var(--bg-darker)",
                    border: "2px solid var(--accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    color: "var(--accent)",
                    fontSize: "16px",
                    flexShrink: 0,
                    zIndex: 1,
                    position: "relative",
                  }}
                >
                  {step.step}
                </div>
                <div style={{ paddingTop: "12px" }}>
                  <h3 style={{ fontSize: "18px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "8px" }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
