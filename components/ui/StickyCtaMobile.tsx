"use client"

import { useState, useEffect } from "react"

export function StickyCtaMobile() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleClick = () => {
    const el = document.getElementById("cta")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  if (!visible) return null

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "16px 24px",
        background: "var(--bg-darker)",
        borderTop: "1px solid var(--border)",
        zIndex: 100,
        display: "none",
      }}
      className="mobile-sticky-cta"
    >
      <button
        onClick={handleClick}
        style={{
          width: "100%",
          padding: "16px",
          background: "var(--accent)",
          color: "var(--bg-darker)",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          fontWeight: 700,
          cursor: "pointer",
          boxShadow: "0 0 24px #00d9ff44",
        }}
      >
        Quero uma demonstração →
      </button>
      <style>{`
        @media (max-width: 768px) {
          .mobile-sticky-cta { display: block !important; }
        }
      `}</style>
    </div>
  )
}
