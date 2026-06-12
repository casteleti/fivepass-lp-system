const rows = [
  { k: "Lucro", b: "taxa de 10% a 15%", a: "3% a 5% — a menor do mercado" },
  { k: "Caixa", b: "preso por semanas", a: "na hora, na sua conta" },
  { k: "Marca", b: "checkout com a cara deles", a: "ingresso e site com a sua" },
  { k: "Dados", b: "seu cliente é lead deles", a: "base 100% sua" },
  { k: "Controle", b: "preço e regra ditados", a: "a operação é sua" },
]

export function Benefits() {
  return (
    <section id="muda" className="sec theme-blue">
      <div className="sec-in" style={{ maxWidth: 860 }}>
        <div className="sec-head">
          <span className="eyebrow">Antes e depois</span>
          <h2 className="h2">Os 5 que o marketplace tira — e a Fivepass devolve.</h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {rows.map((r) => (
            <div key={r.k} className="card" style={{ padding: "18px 20px" }}>
              <div style={{ fontWeight: 800, color: "var(--sec-accent)", fontSize: 14, textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 10 }}>
                {r.k}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 18px" }}>
                <div style={{ flex: "1 1 200px", display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <span style={{ color: "#ff5468", fontWeight: 800, flexShrink: 0 }}>✕</span>
                  <span style={{ fontSize: 14, color: "var(--sec-text-3)", textDecoration: "line-through", textDecorationColor: "rgba(255,84,104,.5)", lineHeight: 1.4 }}>
                    {r.b}
                  </span>
                </div>
                <div style={{ flex: "1 1 200px", display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <span style={{ color: "var(--success)", fontWeight: 800, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 14, color: "var(--sec-text)", fontWeight: 600, lineHeight: 1.4 }}>{r.a}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p style={{ textAlign: "center", marginTop: 34, fontSize: "clamp(17px, 2.4vw, 20px)", fontWeight: 700, color: "#fff" }}>
          Seu evento volta a ser inteiramente seu.
        </p>
      </div>
    </section>
  )
}
