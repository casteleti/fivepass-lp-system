const pillars = [
  {
    number: "01",
    title: "Autonomia",
    description: "Configure preços, lotes, descontos e regras sem depender de suporte. Você tem acesso total ao backoffice.",
  },
  {
    number: "02",
    title: "Controle",
    description: "Dashboard em tempo real: vendas, origem, abandono, receita prevista. Decisões baseadas em dados reais.",
  },
  {
    number: "03",
    title: "Tecnologia",
    description: "Stack enterprise: pagamentos seguros, gateway redundante, proteção antifraude e checkout de alta conversão.",
  },
  {
    number: "04",
    title: "Resultado",
    description: "Mais margem, marca forte e lista própria de compradores. O resultado de um evento vira ativo para o próximo.",
  },
]

export function Pillars() {
  return (
    <section
      id="pillars"
      style={{
        padding: "120px 24px",
        background: "var(--bg-darker)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <p style={{ color: "var(--accent)", fontSize: "13px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>
            Os 4 pilares
          </p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.2 }}>
            A estrutura que sustenta seu negócio de eventos
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>
          {pillars.map((pillar) => (
            <div
              key={pillar.number}
              style={{
                padding: "40px 32px",
                background: "var(--bg-dark)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                position: "relative",
                overflow: "hidden",
                transition: "border-color 300ms ease, transform 300ms ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement
                el.style.borderColor = "var(--primary-light)"
                el.style.transform = "translateY(-4px)"
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement
                el.style.borderColor = "var(--border)"
                el.style.transform = "translateY(0)"
              }}
            >
              <div
                style={{
                  fontSize: "56px",
                  fontWeight: 800,
                  color: "#1e3a5f33",
                  lineHeight: 1,
                  marginBottom: "24px",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {pillar.number}
              </div>
              <h3 style={{ fontSize: "22px", fontWeight: 700, color: "var(--accent)", marginBottom: "16px" }}>
                {pillar.title}
              </h3>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
