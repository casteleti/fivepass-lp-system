import { Fragment } from "react"

const rows = [
  { k: "Lucro", b: "taxa de 10% a 15%", a: "3% a 5% — a menor do mercado" },
  { k: "Caixa", b: "preso por semanas", a: "no seu caixa antes do evento" },
  { k: "Marca", b: "checkout com a cara deles", a: "ingresso e site com a sua" },
  { k: "Dados", b: "seu cliente é lead deles", a: "base 100% sua" },
  { k: "Controle", b: "preço e regra ditados", a: "a operação é sua" },
]

export function Benefits() {
  return (
    <section id="muda" className="sec theme-blue">
      <div className="sec-in" style={{ maxWidth: 880 }}>
        <div className="sec-head">
          <span className="eyebrow">Antes e depois</span>
          <h2 className="h2">O que os outros sistemas tiram, a Fivepass retorna!</h2>
        </div>

        <div className="cmp">
          {/* cabeçalho */}
          <div className="cmp-h cmp-c1" />
          <div className="cmp-h cmp-c2">Outras Plataformas</div>
          <div className="cmp-h cmp-c3">Plataforma Fivepass</div>

          {/* linhas */}
          {rows.map((r) => (
            <Fragment key={r.k}>
              <div className="cmp-c1 cmp-label">{r.k}</div>
              <div className="cmp-c2">{r.b}</div>
              <div className="cmp-c3">
                <span className="cmp-chk">✓</span>
                {r.a}
              </div>
            </Fragment>
          ))}
        </div>

        <p style={{ textAlign: "center", marginTop: 34, fontSize: "clamp(17px, 2.4vw, 20px)", fontWeight: 700, color: "#fff" }}>
          Seu evento volta a ser inteiramente seu.
        </p>
      </div>
    </section>
  )
}
