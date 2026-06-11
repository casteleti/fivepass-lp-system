const pains = [
  {
    icon: "💸",
    title: "Taxa por ingresso comendo sua margem",
    description:
      "Cada ingresso vendido em marketplace cede 10-15% de taxa. Em shows com 5.000 ingressos, isso representa dezenas de milhares de reais que ficam no bolso de terceiros.",
  },
  {
    icon: "🔒",
    title: "Seus dados de cliente não são seus",
    description:
      "O marketplace retém os dados dos compradores. Você não consegue criar relacionamento, remarketing ou fidelização. Cada evento recomeça do zero.",
  },
  {
    icon: "🎨",
    title: "Marca submetida à identidade da plataforma",
    description:
      "Página de venda com a cara deles. Experiência genérica que dilui sua marca e enfraquece a percepção premium do seu evento.",
  },
  {
    icon: "📊",
    title: "Zero visibilidade sobre o funil de vendas",
    description:
      "Você sabe quantos ingressos vendeu. Mas não sabe quantas pessoas visitaram, abandonaram o carrinho ou voltaram dias depois. Decidir no escuro.",
  },
]

export function PainPoints() {
  return (
    <section
      id="pain-points"
      style={{
        padding: "120px 24px",
        background: "var(--bg-dark)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <p style={{ color: "var(--accent)", fontSize: "13px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>
            O problema
          </p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.2 }}>
            Por que continuar perdendo nas condições dos outros?
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "24px",
          }}
        >
          {pains.map((pain) => (
            <div
              key={pain.title}
              style={{
                padding: "32px",
                background: "var(--bg-darker)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                transition: "border-color 300ms ease",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "#1e3a5f")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)")}
            >
              <div style={{ fontSize: "32px", marginBottom: "20px" }}>{pain.icon}</div>
              <h3 style={{ fontSize: "17px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "12px", lineHeight: 1.3 }}>
                {pain.title}
              </h3>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                {pain.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
