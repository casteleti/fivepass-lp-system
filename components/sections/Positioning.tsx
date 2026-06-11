export function Positioning() {
  return (
    <section
      id="positioning"
      style={{
        padding: "120px 24px",
        background: `linear-gradient(180deg, var(--bg-dark) 0%, var(--bg-darker) 100%)`,
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
          <div>
            <p style={{ color: "var(--accent)", fontSize: "13px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>
              Por que Fivepass
            </p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.2, marginBottom: "24px" }}>
              Infraestrutura enterprise.<br />
              <span style={{ color: "var(--accent)" }}>Sua marca na frente.</span>
            </h2>
            <p style={{ fontSize: "16px", color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "32px" }}>
              Fivepass não é mais um marketplace. É uma plataforma white-label que coloca
              você no centro — com sua identidade, seus dados e sua receita. Você gerencia
              tudo. Nós garantimos a infra.
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                "Plataforma totalmente white-label",
                "Dados 100% seus (CRM, remarketing, fidelização)",
                "Taxa fixa por evento, não por ingresso",
                "Suporte enterprise com SLA garantido",
              ].map((item) => (
                <li key={item} style={{ display: "flex", alignItems: "center", gap: "12px", color: "var(--text-secondary)", fontSize: "15px" }}>
                  <span style={{ color: "var(--success)", fontSize: "18px", flexShrink: 0 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Visual card */}
          <div
            style={{
              background: `linear-gradient(135deg, #1e3a5f22 0%, #00d9ff08 100%)`,
              border: "1px solid var(--border)",
              borderRadius: "12px",
              padding: "48px",
              backdropFilter: "blur(12px)",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            {[
              { label: "Controle de marca", value: "100%", color: "var(--accent)" },
              { label: "Propriedade dos dados", value: "100%", color: "var(--success)" },
              { label: "Economia vs marketplace", value: "até 15%", color: "var(--warning)" },
              { label: "Conversão média", value: "+38%", color: "var(--accent)" },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "20px", borderBottom: "1px solid var(--border)" }}>
                <span style={{ color: "var(--text-secondary)", fontSize: "14px" }}>{item.label}</span>
                <span style={{ color: item.color, fontWeight: 700, fontSize: "22px" }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
