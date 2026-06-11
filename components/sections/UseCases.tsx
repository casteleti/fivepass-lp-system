const cases = [
  {
    category: "Shows e Festas",
    title: "Eventos de entretenimento com 500 a 50.000 pessoas",
    description: "Lotes com preço progressivo, controle de capacidade, integração com portal do fã e remarketing de recorrência.",
    tags: ["Shows", "Festivais", "Festas corporativas"],
  },
  {
    category: "Conferências e Congressos",
    title: "Eventos B2B com gestão de credenciamento e networking",
    description: "Múltiplos tipos de ingresso (VIP, standard, expositor), check-in inteligente, emissão de certificado integrada.",
    tags: ["Congressos", "Summit", "Workshops"],
  },
  {
    category: "Esportes e Arena",
    title: "Eventos recorrentes que precisam fidelizar",
    description: "Programas de fidelidade, plano de temporada, meia-entrada automatizada e integrações com sistemas de clube.",
    tags: ["Futebol", "Lutas", "Corridas"],
  },
  {
    category: "Cultura e Arte",
    title: "Teatro, exposições e experiências premium",
    description: "Checkout sofisticado condizente com o público, seleção de assento e voucher digital personalizado.",
    tags: ["Teatro", "Exposições", "Musicais"],
  },
]

export function UseCases() {
  return (
    <section
      id="use-cases"
      style={{
        padding: "120px 24px",
        background: "var(--bg-dark)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <p style={{ color: "var(--accent)", fontSize: "13px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>
            Casos de uso
          </p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.2 }}>
            Para todo tipo de evento que leva a sério
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
          {cases.map((c) => (
            <div
              key={c.category}
              style={{
                padding: "32px",
                background: "var(--bg-darker)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                transition: "border-color 300ms ease",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--primary-light)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)")}
            >
              <p style={{ fontSize: "12px", color: "var(--accent)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>
                {c.category}
              </p>
              <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "12px", lineHeight: 1.4 }}>
                {c.title}
              </h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "20px" }}>
                {c.description}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {c.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: "4px 10px",
                      background: "#1e3a5f33",
                      border: "1px solid var(--primary)",
                      borderRadius: "100px",
                      fontSize: "11px",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
