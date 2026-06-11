"use client"

import { useSearchParams } from "next/navigation"
import { Suspense, useState } from "react"

function ThankYouContent() {
  const params = useSearchParams()
  const leadId = params.get("leadId")
  const [whatsappLoading, setWhatsappLoading] = useState(false)

  const handleWhatsapp = async () => {
    if (!leadId) return
    setWhatsappLoading(true)
    try {
      const res = await fetch("/api/whatsapp-click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId }),
      })
      const data = await res.json()
      if (data.whatsappUrl) window.open(data.whatsappUrl, "_blank")
    } finally {
      setWhatsappLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-darker)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          maxWidth: "560px",
          width: "100%",
          textAlign: "center",
          padding: "64px 48px",
          background: "var(--bg-dark)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
        }}
      >
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            background: "#10b98122",
            border: "2px solid var(--success)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "32px",
            margin: "0 auto 32px",
          }}
        >
          ✓
        </div>

        <h1 style={{ fontSize: "32px", fontWeight: 800, color: "var(--text-primary)", marginBottom: "16px", lineHeight: 1.2 }}>
          Recebemos seu contato!
        </h1>

        <p style={{ fontSize: "16px", color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "40px" }}>
          Nossa equipe vai entrar em contato em até <strong style={{ color: "var(--text-primary)" }}>24 horas</strong> para
          agendar sua demonstração gratuita.
        </p>

        {leadId && (
          <div style={{ marginBottom: "32px" }}>
            <p style={{ color: "var(--text-tertiary)", fontSize: "14px", marginBottom: "16px" }}>
              Prefere conversar agora? Fale direto no WhatsApp:
            </p>
            <button
              onClick={handleWhatsapp}
              disabled={whatsappLoading}
              style={{
                padding: "14px 32px",
                background: "#25d366",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontSize: "15px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 300ms ease",
              }}
            >
              {whatsappLoading ? "Abrindo..." : "💬 Chamar no WhatsApp"}
            </button>
          </div>
        )}

        <a
          href="/"
          style={{
            color: "var(--text-tertiary)",
            fontSize: "14px",
            textDecoration: "none",
            transition: "color 200ms ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-tertiary)")}
        >
          ← Voltar ao início
        </a>
      </div>
    </div>
  )
}

export default function ThankYouPage() {
  return (
    <Suspense>
      <ThankYouContent />
    </Suspense>
  )
}
