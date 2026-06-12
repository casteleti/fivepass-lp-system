const items = [
  { q: "“Dá trabalho migrar?”", a: "Migração assistida: configuramos seus primeiros eventos e treinamos seu time." },
  { q: "“E se cair no pico?”", a: "Infraestrutura em nuvem testada em centenas de grandes eventos. A mesma estabilidade dos gigantes." },
  { q: "“O checkout é seguro?”", a: "Criptografia de ponta e conformidade com a LGPD. As mesmas garantias dos maiores." },
  { q: "“Já tenho taxa negociada.”", a: "Vamos comparar na ponta do lápis — a economia + marca + dados quase sempre vira a balança." },
]

export function FAQ() {
  return (
    <section id="objecoes" className="sec theme-white">
      <div className="sec-in" style={{ maxWidth: 760 }}>
        <div className="sec-head">
          <span className="eyebrow">As objeções de sempre</span>
          <h2 className="h2">&ldquo;Meu cliente vai confiar numa plataforma que ele não conhece?&rdquo;</h2>
        </div>

        <p className="lead" style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 36px" }}>
          Ele nem precisa conhecer. <strong style={{ color: "var(--sec-text)" }}>Quem aparece é você.</strong> A Fivepass
          é invisível de propósito — o cliente compra na sua marca, no seu domínio. A segurança roda por trás. É essa a
          graça do white-label.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
          {items.map((it) => (
            <div key={it.q} className="card" style={{ padding: 22 }}>
              <h3 style={{ fontSize: 15, fontWeight: 800, color: "var(--sec-text)", marginBottom: 8 }}>{it.q}</h3>
              <p style={{ fontSize: 14, color: "var(--sec-text-2)", lineHeight: 1.6 }}>{it.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
