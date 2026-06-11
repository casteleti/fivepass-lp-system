"use client"

import { useState } from "react"

const faqs = [
  {
    question: "Fivepass é um marketplace?",
    answer: "Não. Fivepass é uma plataforma white-label — você vende com sua marca, seu domínio e fica com seus dados. Nenhum logo ou redirecionamento para outra plataforma.",
  },
  {
    question: "Como funciona a precificação?",
    answer: "Cobramos uma taxa mensal fixa baseada no volume de eventos, não por ingresso vendido. Isso significa que quanto mais você vender, menor é o custo percentual.",
  },
  {
    question: "Preciso de equipe técnica para implementar?",
    answer: "Não. O onboarding é guiado e gerenciado pela nossa equipe. Em média, você está operacional em 48 horas após a contratação.",
  },
  {
    question: "Os dados dos compradores ficam comigo?",
    answer: "100%. Todos os dados de compradores são seus — nome, e-mail, telefone, histórico de compras. Você pode exportar a qualquer momento e integrar com seu CRM.",
  },
  {
    question: "Funciona para eventos de qualquer porte?",
    answer: "Sim. Nossos clientes vão de eventos com 200 pessoas a festivais com 40.000. A plataforma escala automaticamente.",
  },
  {
    question: "E o suporte no dia do evento?",
    answer: "Você tem um gerente de conta dedicado disponível durante o evento. Além disso, o app de portaria funciona offline para garantir check-in mesmo sem internet.",
  },
  {
    question: "Posso migrar minha base de compradores atual?",
    answer: "Sim. Oferecemos suporte completo de migração — importação de base, histórico de eventos e configuração das integrações existentes.",
  },
  {
    question: "Quais formas de pagamento são aceitas?",
    answer: "Cartão de crédito (parcelado), débito, PIX e boleto. Liquidação antecipada disponível para eventos de grande porte.",
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section
      id="faq"
      style={{
        padding: "120px 24px",
        background: "var(--bg-darker)",
      }}
    >
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <p style={{ color: "var(--accent)", fontSize: "13px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>
            Dúvidas frequentes
          </p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.2 }}>
            Perguntas que todo promoter faz
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{
                border: "1px solid",
                borderColor: open === i ? "var(--primary-light)" : "var(--border)",
                borderRadius: "8px",
                overflow: "hidden",
                transition: "border-color 300ms ease",
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%",
                  padding: "20px 24px",
                  background: "var(--bg-dark)",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "16px",
                  textAlign: "left",
                  color: "var(--text-primary)",
                  fontSize: "15px",
                  fontWeight: 500,
                }}
              >
                <span>{faq.question}</span>
                <span
                  style={{
                    color: "var(--accent)",
                    fontSize: "20px",
                    flexShrink: 0,
                    transition: "transform 300ms ease",
                    transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                    display: "inline-block",
                  }}
                >
                  +
                </span>
              </button>
              {open === i && (
                <div
                  style={{
                    padding: "0 24px 20px",
                    background: "var(--bg-dark)",
                    color: "var(--text-secondary)",
                    fontSize: "14px",
                    lineHeight: 1.8,
                    borderTop: "1px solid var(--border)",
                    paddingTop: "16px",
                  }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
