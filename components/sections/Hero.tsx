"use client"

import { useState } from "react"

interface HeroProps {
  onCtaClick?: () => void
}

export function Hero({ onCtaClick }: HeroProps) {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        background: `radial-gradient(ellipse 80% 60% at 50% 0%, #1e3a5f33 0%, transparent 70%), var(--bg-darker)`,
        display: "flex",
        alignItems: "center",
        padding: "80px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow background */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, #00d9ff0a 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%", position: "relative" }}>
        {/* Badge */}
        <div style={{ marginBottom: "32px" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "100px",
              border: "1px solid #00d9ff33",
              background: "#00d9ff0a",
              color: "var(--accent)",
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "0.02em",
            }}
          >
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent)", display: "inline-block" }} />
            Plataforma enterprise de bilheteria
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: "clamp(40px, 6vw, 72px)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
            marginBottom: "24px",
            maxWidth: "800px",
          }}
        >
          Venda seus ingressos com{" "}
          <span style={{ color: "var(--accent)" }}>autonomia total</span>
        </h1>

        {/* Subheadline */}
        <p
          style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            marginBottom: "48px",
            maxWidth: "600px",
          }}
        >
          A plataforma white-label para promoters e organizadores que querem controle
          sobre dados, marca e receita — sem depender de marketplaces.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
          <button
            onClick={onCtaClick}
            style={{
              padding: "16px 32px",
              background: "var(--accent)",
              color: "var(--bg-darker)",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 300ms ease",
              boxShadow: "0 0 24px #00d9ff33",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 0 40px #00d9ff55"
              e.currentTarget.style.transform = "translateY(-1px)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 0 24px #00d9ff33"
              e.currentTarget.style.transform = "translateY(0)"
            }}
          >
            Quero uma demonstração
          </button>
          <a
            href="#how-it-works"
            style={{
              padding: "16px 32px",
              background: "transparent",
              color: "var(--text-secondary)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: 500,
              cursor: "pointer",
              textDecoration: "none",
              transition: "all 300ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent)"
              e.currentTarget.style.color = "var(--text-primary)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)"
              e.currentTarget.style.color = "var(--text-secondary)"
            }}
          >
            Como funciona →
          </a>
        </div>

        {/* Social proof micro */}
        <div style={{ marginTop: "64px", display: "flex", gap: "48px", flexWrap: "wrap" }}>
          {[
            { value: "+500k", label: "Ingressos vendidos" },
            { value: "98%", label: "Uptime garantido" },
            { value: "3x", label: "Receita vs marketplace" },
          ].map((stat) => (
            <div key={stat.label}>
              <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--accent)", lineHeight: 1 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: "13px", color: "var(--text-tertiary)", marginTop: "4px" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
