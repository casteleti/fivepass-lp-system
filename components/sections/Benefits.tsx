const benefits = [
  { icon: "📈", title: "ROI imediato", description: "Economize até 15% em taxas por ingresso versus marketplaces. Para eventos com 1.000+ ingressos, o custo da plataforma se paga na primeira edição." },
  { icon: "🎯", title: "Dados que convertem", description: "Cada comprador vira contato na sua base. E-mail, telefone, histórico de compras. Remarketing no próximo evento sem depender de mídia paga." },
  { icon: "⚡", title: "Checkout de alta performance", description: "Página de compra otimizada para mobile, carregamento rápido e fluxo simplificado. Menos abandono de carrinho, mais vendas concluídas." },
  { icon: "🔐", title: "Segurança e antifraude", description: "Gateway com tokenização, 3DS2, monitoramento de fraude em tempo real. Chargebacks reduzidos e transações protegidas." },
  { icon: "📱", title: "Controle de acesso integrado", description: "App de portaria com leitura de QR. Validação offline disponível. Relatório de presença em tempo real durante o evento." },
  { icon: "🔌", title: "Integrações nativas", description: "CRM, WhatsApp, e-mail marketing, plataformas de anúncio. Seu ecossistema de marketing conectado de ponta a ponta." },
]

export function Benefits() {
  return (
    <section
      id="benefits"
      style={{
        padding: "120px 24px",
        background: "var(--bg-darker)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <p style={{ color: "var(--accent)", fontSize: "13px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>
            Benefícios concretos
          </p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.2 }}>
            O que muda quando você tem controle
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              style={{
                padding: "32px",
                background: "var(--bg-dark)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                display: "flex",
                gap: "20px",
                transition: "border-color 300ms ease",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--primary-light)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)")}
            >
              <div style={{ fontSize: "28px", flexShrink: 0 }}>{benefit.icon}</div>
              <div>
                <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "8px" }}>
                  {benefit.title}
                </h3>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
