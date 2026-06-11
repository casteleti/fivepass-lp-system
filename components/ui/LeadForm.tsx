"use client"

import { useState } from "react"

interface LeadFormProps {
  variant?: string
  onSuccess?: (leadId: string) => void
}

export function LeadForm({ variant = "default", onSuccess }: LeadFormProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    eventType: "",
    monthlyTicketsEstimate: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")

    try {
      const body = {
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        company: form.company || undefined,
        eventType: form.eventType || undefined,
        monthlyTicketsEstimate: form.monthlyTicketsEstimate
          ? parseInt(form.monthlyTicketsEstimate, 10)
          : undefined,
        landingVariant: variant,
      }

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      const data = await res.json()

      if (!res.ok) {
        setStatus("error")
        setErrorMsg(data.error || "Erro ao enviar. Tente novamente.")
        return
      }

      setStatus("success")
      onSuccess?.(data.leadId)
    } catch {
      setStatus("error")
      setErrorMsg("Falha de conexão. Verifique sua internet e tente novamente.")
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    background: "var(--bg-darker)",
    border: "1px solid var(--border)",
    borderRadius: "6px",
    color: "var(--text-primary)",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 200ms ease",
  }

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "13px",
    fontWeight: 500,
    color: "var(--text-secondary)",
    marginBottom: "6px",
  }

  if (status === "success") {
    return (
      <div style={{ textAlign: "center", padding: "48px 24px" }}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>✓</div>
        <h3 style={{ fontSize: "22px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "12px" }}>
          Recebemos seu contato!
        </h3>
        <p style={{ color: "var(--text-secondary)", fontSize: "15px", lineHeight: 1.7 }}>
          Nossa equipe entrará em contato em até 24 horas para agendar sua demonstração.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div>
          <label style={labelStyle} htmlFor="name">Nome *</label>
          <input
            id="name"
            type="text"
            required
            placeholder="Seu nome"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />
        </div>
        <div>
          <label style={labelStyle} htmlFor="email">E-mail *</label>
          <input
            id="email"
            type="email"
            required
            placeholder="seu@email.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div>
          <label style={labelStyle} htmlFor="phone">Telefone</label>
          <input
            id="phone"
            type="tel"
            placeholder="11999999999"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />
        </div>
        <div>
          <label style={labelStyle} htmlFor="company">Empresa</label>
          <input
            id="company"
            type="text"
            placeholder="Nome da empresa"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div>
          <label style={labelStyle} htmlFor="eventType">Tipo de evento</label>
          <select
            id="eventType"
            value={form.eventType}
            onChange={(e) => setForm({ ...form, eventType: e.target.value })}
            style={{ ...inputStyle, cursor: "pointer" }}
            onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          >
            <option value="">Selecione...</option>
            <option value="show">Show / Festival</option>
            <option value="festa">Festa / Balada</option>
            <option value="conferencia">Conferência / Congresso</option>
            <option value="outro">Outro</option>
          </select>
        </div>
        <div>
          <label style={labelStyle} htmlFor="tickets">Ingressos/mês (estimativa)</label>
          <input
            id="tickets"
            type="number"
            min="0"
            placeholder="Ex: 5000"
            value={form.monthlyTicketsEstimate}
            onChange={(e) => setForm({ ...form, monthlyTicketsEstimate: e.target.value })}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />
        </div>
      </div>

      {errorMsg && (
        <p style={{ color: "var(--error)", fontSize: "13px", background: "#ef444411", padding: "12px 16px", borderRadius: "6px", border: "1px solid #ef444433" }}>
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        style={{
          padding: "16px",
          background: status === "loading" ? "var(--accent-subtle)" : "var(--accent)",
          color: "var(--bg-darker)",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          fontWeight: 700,
          cursor: status === "loading" ? "not-allowed" : "pointer",
          transition: "all 300ms ease",
          boxShadow: status === "loading" ? "none" : "0 0 24px #00d9ff33",
        }}
      >
        {status === "loading" ? "Enviando..." : "Quero uma demonstração gratuita →"}
      </button>

      <p style={{ fontSize: "12px", color: "var(--text-tertiary)", textAlign: "center" }}>
        Sem compromisso. Nossa equipe retorna em até 24h.
      </p>
    </form>
  )
}
