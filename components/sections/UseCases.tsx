const cases = [
  {
    tag: "Começando",
    title: "Primeiros eventos e produções pequenas",
    description:
      "Comece com a menor taxa do mercado e a sua marca desde o primeiro ingresso. Sem mensalidade de plataforma cara pra dar o primeiro passo.",
  },
  {
    tag: "Em crescimento",
    title: "Casas e produtores recorrentes",
    description:
      "Vários eventos por mês, tudo num lugar só. Dados pra fidelizar, remarketing pro próximo lote e operação que acompanha o seu ritmo.",
  },
  {
    tag: "Grandes eventos",
    title: "Festivais, arenas e corporativo",
    description:
      "Alto volume, picos de venda e check-in crítico. Infraestrutura em nuvem que não falha no dia, com QR Code e catraca facial na portaria.",
  },
]

export function UseCases() {
  return (
    <section id="use-cases" style={{ padding: "120px 24px", background: "var(--bg-dark)" }}>
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
            A plataforma que escala juntamente com os seus eventos
          </p>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 46px)",
              fontWeight: 700,
              color: "var(--text-primary)",
              lineHeight: 1.15,
              maxWidth: "780px",
              margin: "0 auto",
            }}
          >
            Seja uma festa com 300 pessoas, ou um mega evento com 10.000 participantes
          </h2>
          <p style={{ fontSize: "17px", color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: "640px", margin: "20px auto 0" }}>
            Você não troca de plataforma quando o evento cresce — a Fivepass cresce junto. Mesma infraestrutura pra quem
            está começando e pra quem lota arena.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          {cases.map((c) => (
            <div key={c.tag} style={{ padding: "32px", background: "var(--bg-darker)", border: "1px solid var(--border)", borderRadius: "12px" }}>
              <span
                style={{
                  display: "inline-block",
                  padding: "4px 12px",
                  background: "#00d9ff0a",
                  border: "1px solid #00d9ff33",
                  borderRadius: "100px",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "var(--accent)",
                  marginBottom: "18px",
                }}
              >
                {c.tag}
              </span>
              <h3 style={{ fontSize: "18px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "12px", lineHeight: 1.3 }}>{c.title}</h3>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.7 }}>{c.description}</p>
            </div>
          ))}
        </div>

        <p style={{ textAlign: "center", marginTop: "56px", fontSize: "18px", fontWeight: 600, color: "var(--text-primary)" }}>
          Sem teto. Sem trocar de plataforma. A operação escala com o seu evento.
        </p>
      </div>
    </section>
  )
}
