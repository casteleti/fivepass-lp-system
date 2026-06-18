"use client"

import { useState } from "react"
import { track } from "@/lib/analytics"

const INSTAGRAM_URL = "https://www.instagram.com/five.pass/"

export function FinalCTA() {
  const [form, setForm] = useState({ name: "", phone: "", email: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "flash">("idle")
  const [err, setErr] = useState("")

  const submit = async () => {
    if (status !== "idle") return
    const phone = form.phone.replace(/\D/g, "")
    if (form.name.trim().length < 2) return setErr("Digite seu nome.")
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setErr("E-mail inválido.")
    if (phone.length < 10) return setErr("WhatsApp inválido (com DDD).")
    setErr("")
    setStatus("loading")
    // form_submit (tentativa) já é capturado pelo listener global em Analytics.tsx via onSubmit do <form>.
    try {
      // Coleta o lead (vai pro RD Station via /api/leads). Best-effort.
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone,
          landingVariant: "lp-final",
        }),
      })
      if (res.ok || res.status === 409) track("lead_success", { form_type: "main_form" })
    } catch {
      // segue pro Instagram mesmo se a rede falhar
    }
    // pisca a tela e abre o Instagram do Fivepass
    setStatus("flash")
    window.setTimeout(() => {
      window.location.href = INSTAGRAM_URL
    }, 650)
  }

  return (
    <section
      id="cta"
      className="sec theme-blue"
      style={{
        background:
          "radial-gradient(ellipse 90% 80% at 50% 120%, rgba(0,217,255,.22) 0%, transparent 60%), linear-gradient(180deg, #0b2447, #0a1c38)",
      }}
    >
      <div className="sec-in" style={{ maxWidth: 560, textAlign: "center" }}>
        <h2 className="h2">
          Vendeu o ingresso, recebeu. O dinheiro cai <span className="accent">antes do evento</span> e paga os fornecedores.
        </h2>

        <p className="lead" style={{ marginTop: 18 }}>
          Deixe seus dados e teste a Fivepass — a gente te mostra a plataforma rodando.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            submit()
          }}
          style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 28, textAlign: "left" }}
        >
          <input
            className="fp-field"
            placeholder="Seu nome"
            value={form.name}
            autoComplete="name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="fp-field"
            type="tel"
            inputMode="numeric"
            placeholder="WhatsApp (com DDD)"
            value={form.phone}
            autoComplete="tel"
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <input
            className="fp-field"
            type="email"
            inputMode="email"
            placeholder="Seu melhor e-mail"
            value={form.email}
            autoComplete="email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          {err && <p style={{ color: "#ff7a88", fontSize: 14 }}>{err}</p>}

          <button
            type="submit"
            className="cta"
            disabled={status !== "idle"}
            style={{ width: "100%", marginTop: 6, padding: "18px", border: "none", cursor: "pointer", opacity: status === "loading" ? 0.7 : 1 }}
          >
            {status === "loading" ? "Enviando..." : "Quero testar o Fivepass →"}
          </button>
        </form>

        <p style={{ fontSize: 12, color: "var(--sec-text-3)", marginTop: 16 }}>
          Seus dados são tratados com segurança (LGPD).
        </p>
      </div>

      <style>{`
        .fp-field { width: 100%; padding: 16px; border-radius: 12px; border: 1px solid rgba(255,255,255,.18); background: rgba(255,255,255,.06); color: #fff; font-size: 16px; }
        .fp-field::placeholder { color: #9bb3d4; }
        .fp-field:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px rgba(0,217,255,.18); }
        @keyframes fpFlash { 0% { opacity: 0 } 40% { opacity: 1 } 100% { opacity: 1 } }
      `}</style>

      {status === "flash" && (
        <div aria-hidden style={{ position: "fixed", inset: 0, zIndex: 300, background: "#fff", animation: "fpFlash .6s ease forwards" }} />
      )}
    </section>
  )
}
