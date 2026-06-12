const pains = [
  {
    icon: "💸",
    title: "A taxa come a sua margem",
    description:
      "No marketplace você paga 10% a 15% por ingresso — e ainda repassa esse custo pro público. A margem que era do seu evento fica no caminho.",
  },
  {
    icon: "⏳",
    title: "Seu dinheiro fica preso",
    description:
      "A venda acontece, mas o dinheiro fica retido por dias na conta da plataforma. Caixa travado justo quando você precisa pagar a operação.",
  },
  {
    icon: "🎭",
    title: "A marca da plataforma que é divulgada",
    description:
      "O checkout tem a cara da plataforma, o concorrente aparece do lado e a experiência dilui o seu evento. Você fortalece a marca dos outros.",
  },
  {
    icon: "📇",
    title: "Seu cliente vira lead deles",
    description:
      "Quem comprou de você fica na base do marketplace, não na sua. Sem dados, sem CRM, sem remarketing — cada evento recomeça do zero.",
  },
]

export function PainPoints() {
  return (
    <section id="problema" style={{ padding: "120px 24px", background: "var(--bg-dark)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "72px" }}>
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
            Aqui é onde vaza o LUCRO do produtor
          </p>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 46px)",
              fontWeight: 700,
              color: "var(--text-primary)",
              lineHeight: 1.15,
              maxWidth: "760px",
              margin: "0 auto",
            }}
          >
            As maiores dores que dificultam PRODUTORES a lucrarem com eventos
          </h2>
          <p
            style={{
              fontSize: "17px",
              color: "var(--text-secondary)",
              lineHeight: 1.6,
              maxWidth: "620px",
              margin: "20px auto 0",
            }}
          >
            Taxa alta, dinheiro retido, marca diluída e o cliente que é seu virando base de dados deles. O modelo
            atual trabalha contra a sua operação.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
          {pains.map((pain) => (
            <div
              key={pain.title}
              style={{
                padding: "32px",
                background: "var(--bg-darker)",
                border: "1px solid var(--border)",
                borderRadius: "10px",
              }}
            >
              <div style={{ fontSize: "30px", marginBottom: "18px" }}>{pain.icon}</div>
              <h3 style={{ fontSize: "17px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "12px", lineHeight: 1.3 }}>
                {pain.title}
              </h3>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.7 }}>{pain.description}</p>
            </div>
          ))}
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: "56px",
            fontSize: "18px",
            fontWeight: 600,
            color: "var(--text-primary)",
          }}
        >
          Dá pra vender ingresso sem entregar a sua operação.
        </p>
      </div>
    </section>
  )
}
