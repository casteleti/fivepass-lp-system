const testimonials = [
  {
    quote: "Migramos para Fivepass e economizamos R$ 48.000 em taxas no primeiro evento. Em 3 meses nossa base de leads cresceu 4x.",
    author: "Carlos Mendes",
    role: "Diretor, Arena Eventos SP",
    initials: "CM",
  },
  {
    quote: "Finalmente tenho controle de verdade. Dashboard em tempo real, dados dos compradores, remarketing. Isso mudou como eu planejo meus eventos.",
    author: "Fernanda Lima",
    role: "Produtora, FL Produções",
    initials: "FL",
  },
  {
    quote: "O checkout deles converte muito mais. A taxa de abandono caiu pela metade. E o suporte é real — falo com uma pessoa, não com ticket.",
    author: "Rodrigo Alves",
    role: "CEO, Groove Entretenimento",
    initials: "RA",
  },
]

const metrics = [
  { value: "+500k", label: "Ingressos processados" },
  { value: "R$12M+", label: "Em vendas gerenciadas" },
  { value: "98.7%", label: "Uptime histórico" },
  { value: "4.9/5", label: "Satisfação dos clientes" },
]

export function SocialProof() {
  return (
    <section
      id="social-proof"
      style={{
        padding: "120px 24px",
        background: "var(--bg-darker)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <p style={{ color: "var(--accent)", fontSize: "13px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>
            Quem usa Fivepass
          </p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.2 }}>
            Promoters que escolheram crescer com controle
          </h2>
        </div>

        {/* Métricas */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", marginBottom: "80px" }}>
          {metrics.map((m) => (
            <div
              key={m.label}
              style={{
                textAlign: "center",
                padding: "32px 16px",
                background: "var(--bg-dark)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
              }}
            >
              <div style={{ fontSize: "32px", fontWeight: 800, color: "var(--accent)", lineHeight: 1 }}>{m.value}</div>
              <div style={{ fontSize: "13px", color: "var(--text-tertiary)", marginTop: "8px" }}>{m.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          {testimonials.map((t) => (
            <div
              key={t.author}
              style={{
                padding: "32px",
                background: "var(--bg-dark)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
              }}
            >
              <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "24px", fontStyle: "italic" }}>
                "{t.quote}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "var(--primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "var(--accent)",
                    flexShrink: 0,
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>{t.author}</div>
                  <div style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
