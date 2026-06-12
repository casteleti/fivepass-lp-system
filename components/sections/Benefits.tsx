const rows = [
  {
    key: "Lucro",
    before: "Taxa de 10% a 15% comendo a margem",
    after: "Taxa de 3% a 5% — a menor do mercado",
  },
  {
    key: "Caixa",
    before: "Dinheiro retido por dias na conta da plataforma",
    after: "Cai na hora, direto na sua conta",
  },
  {
    key: "Marca",
    before: "Checkout com a cara da plataforma",
    after: "Ingresso, site e comunicação com a SUA marca",
  },
  {
    key: "Dados",
    before: "Seu cliente é lead do marketplace",
    after: "Base 100% sua, pronta pra remarketing",
  },
  {
    key: "Controle",
    before: "Preço e regras ditados pela plataforma",
    after: "Sua operação, suas decisões, do seu jeito",
  },
]

export function Benefits() {
  return (
    <section id="benefits" style={{ padding: "120px 24px", background: "var(--bg-dark)" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <p
            style={{
              color: "var(--accent)",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            O que muda
          </p>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 46px)",
              fontWeight: 700,
              color: "var(--text-primary)",
              lineHeight: 1.15,
              maxWidth: "720px",
              margin: "0 auto",
            }}
          >
            Os 5 que o marketplace tira — e a Fivepass devolve.
          </h2>
          <p style={{ fontSize: "17px", color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: "560px", margin: "20px auto 0" }}>
            Marca, dados, lucro, controle e cliente. Veja o antes e o depois.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {rows.map((row) => (
            <div
              key={row.key}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(90px, 0.6fr) 1fr 1fr",
                gap: "16px",
                alignItems: "center",
                padding: "20px 24px",
                background: "var(--bg-darker)",
                border: "1px solid var(--border)",
                borderRadius: "10px",
              }}
            >
              <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--accent)" }}>{row.key}</div>

              <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <span style={{ color: "var(--error)", flexShrink: 0, fontWeight: 700 }}>✕</span>
                <span style={{ fontSize: "14px", color: "var(--text-tertiary)", lineHeight: 1.5, textDecoration: "line-through", textDecorationColor: "#ef444466" }}>
                  {row.before}
                </span>
              </div>

              <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <span style={{ color: "var(--success)", flexShrink: 0, fontWeight: 700 }}>✓</span>
                <span style={{ fontSize: "14px", color: "var(--text-primary)", lineHeight: 1.5, fontWeight: 500 }}>{row.after}</span>
              </div>
            </div>
          ))}
        </div>

        <p style={{ textAlign: "center", marginTop: "48px", fontSize: "18px", fontWeight: 600, color: "var(--text-primary)" }}>
          Seu evento volta a ser inteiramente seu.
        </p>
      </div>
    </section>
  )
}
