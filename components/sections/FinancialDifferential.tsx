const rows = [
  { criteria: "Taxa por ingresso", marketplace: "10 a 15%", fivepass: "Taxa fixa por evento" },
  { criteria: "Propriedade dos dados", marketplace: "Da plataforma", fivepass: "100% sua" },
  { criteria: "Marca na página de vendas", marketplace: "Da plataforma", fivepass: "100% sua" },
  { criteria: "Remarketing de compradores", marketplace: "Bloqueado", fivepass: "Livre" },
  { criteria: "Dashboard de analytics", marketplace: "Básico", fivepass: "Completo + tempo real" },
  { criteria: "Checkout personalizado", marketplace: "Não", fivepass: "Sim" },
  { criteria: "Integração com CRM/marketing", marketplace: "Limitada", fivepass: "Nativa" },
  { criteria: "Suporte dedicado", marketplace: "Ticket genérico", fivepass: "Gerente de conta" },
]

export function FinancialDifferential() {
  return (
    <section
      id="financial"
      style={{
        padding: "120px 24px",
        background: "var(--bg-dark)",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <p style={{ color: "var(--accent)", fontSize: "13px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>
            Comparativo
          </p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.2 }}>
            Fivepass vs. marketplace
          </h2>
          <p style={{ color: "var(--text-secondary)", marginTop: "16px", fontSize: "16px" }}>
            O que você realmente está pagando quando vende pelo marketplace.
          </p>
        </div>

        <div style={{ border: "1px solid var(--border)", borderRadius: "8px", overflow: "hidden" }}>
          {/* Header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              padding: "16px 24px",
              background: "var(--bg-darker)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <span style={{ color: "var(--text-tertiary)", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>Critério</span>
            <span style={{ color: "var(--text-tertiary)", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", textAlign: "center" }}>Marketplace</span>
            <span style={{ color: "var(--accent)", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", textAlign: "center" }}>Fivepass</span>
          </div>

          {rows.map((row, i) => (
            <div
              key={row.criteria}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                padding: "16px 24px",
                borderBottom: i < rows.length - 1 ? "1px solid var(--border)" : "none",
                background: i % 2 === 0 ? "transparent" : "#ffffff03",
                alignItems: "center",
              }}
            >
              <span style={{ color: "var(--text-secondary)", fontSize: "14px" }}>{row.criteria}</span>
              <span style={{ color: "#ef4444aa", fontSize: "14px", textAlign: "center" }}>{row.marketplace}</span>
              <span style={{ color: "var(--success)", fontSize: "14px", textAlign: "center", fontWeight: 500 }}>{row.fivepass}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
