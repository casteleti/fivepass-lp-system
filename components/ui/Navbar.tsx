"use client"

import { useEffect, useState } from "react"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "0 24px",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(5,6,9,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        transition: "all 300ms ease",
      }}
    >
      <div style={{ fontWeight: 800, fontSize: "20px", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
        Five<span style={{ color: "var(--accent)" }}>pass</span>
      </div>

      <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
        {[
          { label: "Como funciona", href: "#how-it-works" },
          { label: "Benefícios", href: "#benefits" },
          { label: "FAQ", href: "#faq" },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            style={{
              color: "var(--text-secondary)",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 500,
              transition: "color 200ms ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
          >
            {item.label}
          </a>
        ))}

        <a
          href="#cta"
          style={{
            padding: "8px 20px",
            background: "var(--accent)",
            color: "var(--bg-darker)",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: 600,
            textDecoration: "none",
            transition: "all 200ms ease",
            boxShadow: "0 0 12px #00d9ff22",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 0 20px #00d9ff44")}
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 0 12px #00d9ff22")}
        >
          Demonstração
        </a>
      </div>
    </nav>
  )
}
