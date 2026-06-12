const columns = [
  {
    label: "Marketplace",
    sub: "Bilheteria na casa dos outros",
    highlight: false,
    items: ["Taxa alta de 10% a 15%", "Sem controle da operação", "Sua marca diluída", "Os dados são deles"],
  },
  {
    label: "Fivepass",
    sub: "A sua bilheteria, sem complexidade",
    highlight: true,
    items: ["Taxa de 3% a 5%", "Controle total da operação", "Tudo com a sua marca", "Os dados são 100% seus"],
  },
  {
    label: "Sistema próprio",
    sub: "Plataforma feita do zero",
    highlight: false,
    items: ["Custo alto de desenvolvimento", "Complexidade técnica", "Manutenção pesada", "Meses até o primeiro evento"],
  },
]

const mechanics = [
  { icon: "🏷️", title: "Sua loja de ingressos", text: "No seu domínio, com a sua identidade visual. O cliente compra na sua casa." },
  { icon: "💻", title: "Desktop e celular", text: "Venda e gestão de qualquer lugar, sem instalar nada. A estrutura é digital e na nuvem." },
  { icon: "📲", title: "Check-in que não trava", text: "Entrada por QR Code e catraca de reconhecimento facial. Rápido, mesmo no pico." },
  { icon: "⚡", title: "Dinheiro direto na sua conta", text: "O pagamento não passa pela Fivepass — cai na sua conta, na hora." },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" style={{ padding: "120px 24px", background: "var(--bg-darker)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
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
            Como funciona
          </p>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 46px)",
              fontWeight: 700,
              color: "var(--text-primary)",
              lineHeight: 1.15,
              maxWidth: "760px",
              margin: "0 auto",
            }}
          >
            Sua própria bilheteria — sem construir plataforma do zero.
          </h2>
          <p
            style={{
              fontSize: "17px",
              color: "var(--text-secondary)",
              lineHeight: 1.6,
              maxWidth: "640px",
              margin: "20px auto 0",
            }}
          >
            Existe um vazio entre o marketplace massificado e o sistema próprio caro de manter. A Fivepass é esse meio:
            a infraestrutura roda invisível, a operação é 100% sua.
          </p>
        </div>

        {/* Zona cinzenta — comparação em 3 colunas */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px", marginBottom: "72px" }}>
          {columns.map((col) => (
            <div
              key={col.label}
              style={{
                padding: "32px",
                background: col.highlight ? "#00d9ff0a" : "var(--bg-dark)",
                border: col.highlight ? "1px solid var(--accent)" : "1px solid var(--border)",
                borderRadius: "12px",
                boxShadow: col.highlight ? "0 0 32px #00d9ff22" : "none",
              }}
            >
              <h3 style={{ fontSize: "20px", fontWeight: 700, color: col.highlight ? "var(--accent)" : "var(--text-primary)" }}>
                {col.label}
              </h3>
              <p style={{ fontSize: "13px", color: "var(--text-tertiary)", marginTop: "4px", marginBottom: "20px" }}>{col.sub}</p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                {col.items.map((item) => (
                  <li key={item} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <span style={{ color: col.highlight ? "var(--success)" : "var(--text-tertiary)", flexShrink: 0, fontWeight: 700 }}>
                      {col.highlight ? "✓" : "—"}
                    </span>
                    <span style={{ fontSize: "14px", color: col.highlight ? "var(--text-primary)" : "var(--text-secondary)", lineHeight: 1.5 }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Como opera */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
          {mechanics.map((m) => (
            <div key={m.title} style={{ padding: "28px", background: "var(--bg-dark)", border: "1px solid var(--border)", borderRadius: "10px" }}>
              <div style={{ fontSize: "26px", marginBottom: "14px" }}>{m.icon}</div>
              <h4 style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "8px" }}>{m.title}</h4>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6 }}>{m.text}</p>
            </div>
          ))}
        </div>

        <p style={{ textAlign: "center", marginTop: "56px", fontSize: "18px", fontWeight: 600, color: "var(--text-primary)" }}>
          Você opera. A Fivepass é o motor invisível.
        </p>
      </div>
    </section>
  )
}
