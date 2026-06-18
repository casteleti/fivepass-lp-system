"use client"

import { useEffect, useState } from "react"
import { track } from "@/lib/analytics"

type Choice = { label: string; value: string | number; emoji?: string }
type Step = { key: "eventType" | "volume" | "dor"; title: string; subtitle?: string; options: Choice[] }

const STEPS: Step[] = [
  {
    key: "eventType",
    title: "Que tipo de evento você produz?",
    options: [
      { label: "Show / Festival", value: "show", emoji: "🎤" },
      { label: "Festa / Balada", value: "festa", emoji: "🎉" },
      { label: "Casa de Eventos / Ingresso na Entrada", value: "casa_eventos", emoji: "🏛️" },
      { label: "Conferência / Congresso", value: "conferencia", emoji: "🎫" },
      { label: "Outro", value: "outro", emoji: "✨" },
    ],
  },
  {
    key: "volume",
    title: "Quantos ingressos você vende por mês?",
    subtitle: "Uma estimativa já ajuda.",
    options: [
      { label: "Até 500", value: 250 },
      { label: "500 a 2 mil", value: 1000 },
      { label: "2 mil a 10 mil", value: 5000 },
      { label: "Mais de 10 mil", value: 15000 },
    ],
  },
  {
    key: "dor",
    title: "O que mais te incomoda hoje?",
    options: [
      { label: "Taxa alta comendo a margem", value: "taxa", emoji: "💸" },
      { label: "Dinheiro preso por semanas", value: "caixa", emoji: "⏳" },
      { label: "Minha marca diluída na plataforma", value: "marca", emoji: "🏷️" },
      { label: "Medo de cair no pico de venda", value: "estabilidade", emoji: "⚡" },
    ],
  },
]

const TOTAL = STEPS.length + 1 // + etapa de contato
// Ao concluir, o lead é levado pra Landing Page (veio direto do anúncio, ainda não a viu).
const LP_URL = "/"

export function Quiz({ standalone = false }: { standalone?: boolean }) {
  const [open, setOpen] = useState(standalone)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | number>>({})
  const [form, setForm] = useState({ name: "", whatsapp: "", email: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [err, setErr] = useState("")

  // Abre o quiz ao clicar em qualquer CTA de WhatsApp (menos os de dentro do modal).
  // No modo standalone (/quiz) o quiz já nasce aberto — sem gatilho de clique.
  useEffect(() => {
    if (standalone) return
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.('a[href*="wa.me"]') as HTMLElement | null
      if (a && !a.closest(".quiz-modal")) {
        e.preventDefault()
        setOpen(true)
        track("quiz_start", { form_type: "quiz", trigger: "wa_cta" })
      }
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [standalone])

  // No modo standalone (/quiz) não há clique de gatilho — o quiz_start dispara no mount.
  useEffect(() => {
    if (standalone) track("quiz_start", { form_type: "quiz", trigger: "standalone_page" })
  }, [standalone])

  // Trava scroll + Esc fecha
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && !standalone) setOpen(false) }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [open, standalone])

  if (!open) return null

  const pick = (key: string, value: string | number) => {
    const next = { ...answers, [key]: value }
    setAnswers(next)
    if (step === STEPS.length - 1) {
      // última pergunta respondida → quiz "completo", falta só a etapa de contato.
      track("quiz_complete", { form_type: "quiz", eventType: next.eventType, volume: next.volume, dor: next.dor })
    }
    window.setTimeout(() => setStep((s) => s + 1), 170)
  }

  const submit = async () => {
    const phone = form.whatsapp.replace(/\D/g, "")
    if (form.name.trim().length < 2) return setErr("Digite seu nome.")
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setErr("E-mail inválido.")
    if (phone.length < 10) return setErr("WhatsApp inválido (com DDD).")
    setErr("")
    setStatus("loading")
    // quiz_submit = tentativa de envio (equivalente ao form_submit do form principal).
    track("quiz_submit", { form_type: "quiz", eventType: answers.eventType, volume: answers.volume, dor: answers.dor })
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone,
          eventType: answers.eventType,
          monthlyTicketsEstimate: typeof answers.volume === "number" ? answers.volume : undefined,
          landingVariant: "quiz",
          dor: answers.dor, // ignorado pelo /api/leads; usado na integração com o RD
        }),
      })
      if (!res.ok && res.status !== 409) {
        const d = await res.json().catch(() => ({}))
        setStatus("error")
        setErr(d.error || "Erro ao enviar. Tente de novo.")
        return
      }
      track("lead_success", { form_type: "quiz", eventType: answers.eventType, volume: answers.volume, dor: answers.dor })
      setStatus("success")
      // Leva pra Landing Page conhecer a Fivepass (o lead veio do anúncio direto pro quiz).
      window.setTimeout(() => {
        window.location.href = LP_URL
      }, 3000)
    } catch {
      setStatus("error")
      setErr("Falha de conexão. Tente de novo.")
    }
  }

  const isContact = step === STEPS.length
  const progress = status === "success" ? 100 : Math.round(((step + 0.5) / TOTAL) * 100)

  return (
    <div
      className="quiz-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Diagnóstico Fivepass"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "radial-gradient(ellipse 110% 55% at 50% 0%, #0b2f5e 0%, transparent 55%), #07090e",
        display: "flex",
        flexDirection: "column",
        animation: "quizFade .25s ease",
        color: "#f4f7fb",
      }}
    >
      <style>{`
        @keyframes quizFade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes quizIn { from { opacity: 0; transform: translateY(16px) } to { opacity: 1; transform: none } }
        .quiz-step { animation: quizIn .28s ease both }
        .quiz-opt { transition: border-color .15s ease, background .15s ease, transform .1s ease; }
        .quiz-opt:active { transform: scale(.985) }
        @media (hover:hover) { .quiz-opt:hover { border-color: rgba(0,217,255,.5) } }
        .quiz-field { transition: border-color .15s ease, box-shadow .15s ease }
        .quiz-field:focus { border-color: var(--accent); outline: none; box-shadow: 0 0 0 3px rgba(0,217,255,.18) }
      `}</style>

      {/* Topo: voltar · progresso · fechar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "calc(env(safe-area-inset-top) + 12px) 18px 8px",
        }}
      >
        {step > 0 && status !== "success" ? (
          <button onClick={() => setStep((s) => Math.max(0, s - 1))} aria-label="Voltar" style={iconBtn}>
            ←
          </button>
        ) : (
          <span style={{ width: 36 }} />
        )}
        <div style={{ flex: 1, height: 5, borderRadius: 3, background: "rgba(255,255,255,.12)", overflow: "hidden" }}>
          <div style={{ width: `${progress}%`, height: "100%", background: "var(--accent)", borderRadius: 3, transition: "width .45s cubic-bezier(.4,0,.2,1)" }} />
        </div>
        {standalone ? (
          <span style={{ width: 36 }} />
        ) : (
          <button onClick={() => setOpen(false)} aria-label="Fechar" style={iconBtn}>
            ✕
          </button>
        )}
      </div>

      {/* Conteúdo */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", overflowY: "auto" }}>
        <div style={{ width: "100%", maxWidth: 540, margin: "0 auto", padding: "24px 22px calc(env(safe-area-inset-bottom) + 28px)" }}>
          {status === "success" ? (
            <div className="quiz-step" style={{ textAlign: "center" }}>
              <div style={{ fontSize: 56, marginBottom: 14 }}>🎉</div>
              <h2 style={{ fontSize: "clamp(26px,7vw,34px)", fontWeight: 800, lineHeight: 1.15 }}>Recebemos!</h2>
              <p style={{ fontSize: 16, color: "#bcceea", lineHeight: 1.6, marginTop: 14 }}>
                Agora conheça a <strong style={{ color: "#fff" }}>Fivepass</strong> por dentro — estamos te levando pra página.
              </p>
              <a href={LP_URL} style={{ ...primaryBtn, marginTop: 28 }}>
                Conhecer a Fivepass
              </a>
            </div>
          ) : isContact ? (
            <div className="quiz-step" key="contact">
              <p style={stepTag}>Última etapa</p>
              <h2 style={qTitle}>Pra onde enviamos seu diagnóstico?</h2>
              <p style={{ fontSize: 15, color: "#bcceea", marginTop: 8 }}>Vamos estudar o modelo do seu evento e voltar com a solução que aumenta a sua margem.</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 26 }}>
                <input
                  className="quiz-field"
                  style={field}
                  placeholder="Seu nome"
                  value={form.name}
                  autoComplete="name"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                  className="quiz-field"
                  style={field}
                  type="tel"
                  inputMode="numeric"
                  placeholder="WhatsApp (com DDD)"
                  value={form.whatsapp}
                  autoComplete="tel"
                  onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                />
                <input
                  className="quiz-field"
                  style={field}
                  type="email"
                  inputMode="email"
                  placeholder="Seu melhor e-mail"
                  value={form.email}
                  autoComplete="email"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              {err && <p style={{ color: "#ff7a88", fontSize: 14, marginTop: 14 }}>{err}</p>}

              <button onClick={submit} disabled={status === "loading"} style={{ ...primaryBtn, marginTop: 20, opacity: status === "loading" ? 0.7 : 1 }}>
                {status === "loading" ? "Enviando..." : "Enviar"}
              </button>
              <p style={{ fontSize: 12, color: "#8ba6c8", textAlign: "center", marginTop: 14 }}>
                Seus dados são tratados com segurança (LGPD).
              </p>
            </div>
          ) : (
            <div className="quiz-step" key={step}>
              <p style={stepTag}>Pergunta {step + 1} de {STEPS.length}</p>
              <h2 style={qTitle}>{STEPS[step].title}</h2>
              {STEPS[step].subtitle && <p style={{ fontSize: 15, color: "#bcceea", marginTop: 8 }}>{STEPS[step].subtitle}</p>}

              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 26 }}>
                {STEPS[step].options.map((opt) => {
                  const selected = answers[STEPS[step].key] === opt.value
                  return (
                    <button
                      key={String(opt.value)}
                      className="quiz-opt"
                      onClick={() => pick(STEPS[step].key, opt.value)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        width: "100%",
                        textAlign: "left",
                        padding: "17px 18px",
                        minHeight: 60,
                        borderRadius: 14,
                        border: `1px solid ${selected ? "var(--accent)" : "rgba(255,255,255,.14)"}`,
                        background: selected ? "rgba(0,217,255,.10)" : "rgba(255,255,255,.04)",
                        color: "#fff",
                        fontSize: 16,
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      {opt.emoji && <span style={{ fontSize: 24, flexShrink: 0 }}>{opt.emoji}</span>}
                      <span style={{ flex: 1 }}>{opt.label}</span>
                      <span style={{ color: "var(--accent)", fontSize: 18, opacity: selected ? 1 : 0.35 }}>→</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const iconBtn: React.CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,.14)",
  background: "rgba(255,255,255,.04)",
  color: "#cfe0f2",
  fontSize: 17,
  cursor: "pointer",
  flexShrink: 0,
}

const stepTag: React.CSSProperties = {
  color: "var(--accent)",
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: ".08em",
  textTransform: "uppercase",
  marginBottom: 12,
}

const qTitle: React.CSSProperties = {
  fontSize: "clamp(24px,6.2vw,34px)",
  fontWeight: 800,
  lineHeight: 1.18,
  letterSpacing: "-0.01em",
}

const field: React.CSSProperties = {
  width: "100%",
  padding: "16px 16px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,.16)",
  background: "rgba(255,255,255,.04)",
  color: "#fff",
  fontSize: 16, // >=16px evita zoom no iOS
}

const primaryBtn: React.CSSProperties = {
  display: "block",
  width: "100%",
  padding: "17px",
  background: "var(--accent)",
  color: "#06121a",
  border: "none",
  borderRadius: 12,
  fontSize: 16,
  fontWeight: 800,
  textAlign: "center",
  textDecoration: "none",
  cursor: "pointer",
  boxShadow: "0 10px 30px rgba(0,217,255,.28)",
}
