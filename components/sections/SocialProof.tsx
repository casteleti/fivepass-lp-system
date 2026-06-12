const trust = [
  { icon: "🏟️", title: "Centenas de grandes eventos", text: "A plataforma já foi testada na operação real de eventos de todos os portes." },
  { icon: "📲", title: "Check-in que aguenta o pico", text: "QR Code e catraca de reconhecimento facial: entrada rápida mesmo com fila grande." },
  { icon: "🔒", title: "Segurança e LGPD", text: "Checkout com criptografia de ponta e conformidade com a LGPD." },
  { icon: "🤝", title: "Suporte humano e migração assistida", text: "Gente de verdade ajudando — e a troca de plataforma sem estresse." },
]

export function SocialProof() {
  return (
    <section id="prova" style={{ padding: "120px 24px", background: "var(--bg-darker)" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
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
            Prova real
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
            Mais de 1.000 pessoas entrando. A Fivepass no controle.
          </h2>
          <p style={{ fontSize: "17px", color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: "620px", margin: "20px auto 0" }}>
            Não é promessa — é operação rodando. Veja um produtor mostrando a fila do evento dele entrar com a Fivepass
            controlando a portaria em tempo real.
          </p>
        </div>

        {/* Vídeo vertical (9:16) do depoimento */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "72px" }}>
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "340px",
              aspectRatio: "9 / 16",
              borderRadius: "18px",
              overflow: "hidden",
              border: "1px solid var(--accent)",
              boxShadow: "0 0 48px #00d9ff22",
              background: "linear-gradient(160deg, #0e1b2e 0%, var(--bg-darker) 100%)",
            }}
          >
            <video
              controls
              playsInline
              preload="metadata"
              poster="/videos/depoimento-poster.jpg"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            >
              <source src="/videos/depoimento.mp4" type="video/mp4" />
              Seu navegador não suporta vídeo.
            </video>
          </div>
        </div>

        {/* Sinais de confiança */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
          {trust.map((t) => (
            <div key={t.title} style={{ padding: "28px", background: "var(--bg-dark)", border: "1px solid var(--border)", borderRadius: "10px" }}>
              <div style={{ fontSize: "26px", marginBottom: "14px" }}>{t.icon}</div>
              <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "8px", lineHeight: 1.3 }}>{t.title}</h3>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6 }}>{t.text}</p>
            </div>
          ))}
        </div>

        <p style={{ textAlign: "center", marginTop: "48px", fontSize: "18px", fontWeight: 600, color: "var(--text-primary)" }}>
          Estabilidade nos picos, entrada sem fila, dados protegidos.
        </p>
      </div>
    </section>
  )
}
