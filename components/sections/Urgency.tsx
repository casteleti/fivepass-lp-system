import { whatsappUrl } from "@/lib/whatsapp"

export function Urgency() {
  return (
    <section id="agora" className="sec theme-black">
      <div className="sec-in" style={{ maxWidth: 740, textAlign: "center" }}>
        <span className="eyebrow">Por que agora</span>

        <h2 className="h2">
          O próximo evento já pode ser na <span className="accent">sua bilheteria</span>.
        </h2>

        <p className="lead" style={{ marginTop: 20 }}>
          A taxa do evento passado você não recupera. Mas dá pra parar de perder a partir do próximo. Sem fidelidade, sem
          instalação, sem complicação — colocamos seu primeiro evento no ar com você.
        </p>

        <div style={{ marginTop: 32 }}>
          <a className="cta" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            Quero começar pelo próximo evento
          </a>
        </div>
      </div>
    </section>
  )
}
