import { whatsappUrl } from "@/lib/whatsapp"

const points = [
  { i: "⚡", t: "O dinheiro não passa pela nossa conta", d: "Cai direto na sua, na hora da venda — antes do evento." },
  { i: "🏷️", t: "Ingresso, site e comunicação com a sua marca", d: "O cliente compra na sua casa." },
  { i: "📊", t: "Os dados são seus", d: "Prontos pra remarketing no próximo evento." },
  { i: "📲", t: "Check-in por QR Code e catraca facial", d: "Entrada rápida, mesmo no pico." },
]

export function HowItWorks() {
  return (
    <section id="virada" className="sec theme-white">
      <div className="sec-in">
        <div className="sec-head">
          <span className="eyebrow">A virada</span>
          <h2 className="h2">
            E se a bilheteria fosse <span className="accent">sua de verdade</span>?
          </h2>
          <p className="lead" style={{ marginTop: 18 }}>
            A Fivepass é o motor invisível do seu evento. Quem aparece pro público é você — sua marca, seu domínio, sua
            cara. A tecnologia roda por trás; o controle fica na sua mão.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 18 }}>
          {points.map((p) => (
            <div key={p.t} className="card" style={{ padding: 26 }}>
              <div style={{ fontSize: 26, marginBottom: 12 }}>{p.i}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--sec-text)", marginBottom: 6, lineHeight: 1.3 }}>{p.t}</h3>
              <p style={{ fontSize: 14, color: "var(--sec-text-2)", lineHeight: 1.6 }}>{p.d}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 40 }}>
          <a className="cta" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            Quero a minha bilheteria
          </a>
        </div>
      </div>
    </section>
  )
}
