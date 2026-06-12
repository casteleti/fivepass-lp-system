const pains = [
  { t: "A taxa", d: "10% a 15% por ingresso, que ainda encarece o ingresso pro seu público." },
  { t: "O seu dinheiro", d: "preso por semanas, travando seu caixa justo quando você mais precisa." },
  { t: "A sua marca", d: "o checkout tem a cara dele, com o concorrente aparecendo do lado." },
  { t: "O seu cliente", d: "vira lead dele. Sem dados, você recomeça do zero a cada evento." },
]

export function PainPoints() {
  return (
    <section id="problema" className="sec theme-black">
      <div className="sec-in">
        <div className="sec-head">
          <span className="eyebrow">Onde vaza o seu lucro</span>
          <h2 className="h2">
            O marketplace não é seu parceiro. É seu <span style={{ color: "#ff5468" }}>sócio oculto</span>.
          </h2>
          <p className="lead" style={{ marginTop: 18 }}>
            Entra em todo evento sem ser convidado e leva a parte mais cara:
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 18 }}>
          {pains.map((p) => (
            <div key={p.t} className="card" style={{ padding: 26 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ color: "#ff5468", fontSize: 20, fontWeight: 800, lineHeight: 1.1, flexShrink: 0 }}>✕</span>
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--sec-text)", marginBottom: 6 }}>{p.t}</h3>
                  <p style={{ fontSize: 14, color: "var(--sec-text-2)", lineHeight: 1.6 }}>{p.d}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
