export function Loss() {
  return (
    <section id="conta" className="sec theme-blue">
      <div className="sec-in" style={{ maxWidth: 760, textAlign: "center" }}>
        <span className="eyebrow">Faça a conta</span>

        <h2 className="h2">Pega o faturamento do seu último evento e tira 12%.</h2>

        <p className="lead" style={{ marginTop: 22 }}>
          Esse dinheiro não foi pra produção. Não foi pra você. Foi pra taxa de um marketplace que nem sabe o nome do
          seu evento.
        </p>

        <p className="lead" style={{ marginTop: 16 }}>
          Num lote de <strong style={{ color: "#fff" }}>R$ 100 mil</strong>, são{" "}
          <strong style={{ color: "#fff" }}>R$ 12 mil</strong> fora do seu bolso. Em 10 eventos no ano, é um carro. Todo
          ano.
        </p>

        <p style={{ fontSize: "clamp(18px, 2.8vw, 23px)", fontWeight: 700, color: "#fff", marginTop: 28, lineHeight: 1.4 }}>
          E o pior: quem pagou por aquilo ficou na base <span className="accent">deles</span> — não na sua.
        </p>

        <div style={{ marginTop: 34 }}>
          <a className="cta" href="#cta">
            Quero testar o Fivepass
          </a>
        </div>
      </div>
    </section>
  )
}
