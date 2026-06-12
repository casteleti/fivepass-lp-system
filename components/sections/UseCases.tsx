const cases = [
  { i: "🎟️", t: "Começando", d: "A menor taxa e a sua marca desde o 1º ingresso." },
  { i: "🔁", t: "Recorrente", d: "Vários eventos num lugar só, com dados pra fidelizar." },
  { i: "🏟️", t: "Grande porte", d: "Alto volume, pico de venda e check-in que não falha no dia." },
]

export function UseCases() {
  return (
    <section id="porte" className="sec theme-blue">
      <div className="sec-in">
        <div className="sec-head">
          <span className="eyebrow">Escala com você</span>
          <h2 className="h2">Seja uma festa de 300 ou um mega evento de 10.000.</h2>
          <p className="lead" style={{ marginTop: 18 }}>
            A mesma estrutura que aguenta o festival atende o seu primeiro evento. Você não troca de plataforma quando
            cresce — a Fivepass cresce junto.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 18 }}>
          {cases.map((c) => (
            <div key={c.t} className="card" style={{ padding: 26 }}>
              <div style={{ fontSize: 26, marginBottom: 12 }}>{c.i}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--sec-text)", marginBottom: 6 }}>{c.t}</h3>
              <p style={{ fontSize: 14, color: "var(--sec-text-2)", lineHeight: 1.6 }}>{c.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
