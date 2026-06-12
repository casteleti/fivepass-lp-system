"use client"

import { useState } from "react"

const faqs = [
  {
    question: "Ninguém conhece a Fivepass. Meu cliente vai confiar?",
    answer:
      "Por ser white-label, o cliente compra na SUA marca, no seu domínio. A Fivepass é o motor invisível que garante a segurança por trás — o cliente confia em você, não numa plataforma estranha.",
  },
  {
    question: "Dá trabalho migrar de plataforma?",
    answer:
      "Migração assistida: a gente configura seus primeiros eventos e treina sua equipe. Transição sem estresse, no seu tempo.",
  },
  {
    question: "E se o sistema cair no pico de venda?",
    answer:
      "Infraestrutura em nuvem preparada para grandes volumes, com a mesma estabilidade dos gigantes. Já foi testada na operação real de centenas de grandes eventos.",
  },
  {
    question: "O check-in é rápido? Tenho medo de fila.",
    answer:
      "Validação por QR Code e por catraca de reconhecimento facial — ágil e que funciona offline. Entrada fluida, sem fila, mesmo com milhares de pessoas.",
  },
  {
    question: "Como funciona a taxa e o recebimento?",
    answer:
      "Taxa de 3% a 5% conforme o plano — uma das menores do mercado. E o dinheiro não passa pela nossa conta: cai direto na sua, na hora.",
  },
  {
    question: "O checkout é seguro?",
    answer:
      "Criptografia de ponta e conformidade com a LGPD. As mesmas garantias de segurança dos maiores players do mercado.",
  },
  {
    question: "Funciona para eventos de qualquer porte?",
    answer:
      "Sim. Da primeira festa ao festival de 100 mil. A estrutura digital escala junto com o seu evento — você não precisa trocar de plataforma quando crescer.",
  },
  {
    question: "Já tenho uma taxa negociada por volume.",
    answer:
      "Vamos comparar na ponta do lápis. A economia em taxa somada ao ganho em marca e dados costuma superar o benefício que você tem hoje.",
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" style={{ padding: "120px 24px", background: "var(--bg-darker)" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
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
            Perguntas frequentes
          </p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.15 }}>
            As dúvidas que todo produtor faz antes de trocar.
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{
                border: "1px solid",
                borderColor: open === i ? "var(--accent)" : "var(--border)",
                borderRadius: "10px",
                overflow: "hidden",
                transition: "border-color 250ms ease",
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
                  fontWeight: 600,
                }}
              >
                <span>{faq.question}</span>
                <span
                  style={{
                    color: "var(--accent)",
                    fontSize: "22px",
                    flexShrink: 0,
                    transition: "transform 250ms ease",
                    transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                    display: "inline-block",
                    lineHeight: 1,
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
                    lineHeight: 1.75,
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
