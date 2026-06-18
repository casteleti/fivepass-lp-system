"use client"

import { useState, useEffect } from "react"

export function StickyCtaMobile() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (!visible) return null

  return (
    <div
      className="mobile-sticky-cta"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "14px 20px calc(14px + env(safe-area-inset-bottom))",
        background: "rgba(5,6,9,0.92)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid var(--border)",
        zIndex: 100,
        display: "none",
      }}
    >
      <a
        href="#cta"
        style={{
          display: "block",
          width: "100%",
          padding: "15px",
          background: "var(--accent)",
          color: "var(--bg-darker)",
          borderRadius: "10px",
          fontSize: "16px",
          fontWeight: 700,
          textAlign: "center",
          textDecoration: "none",
          boxShadow: "0 0 24px #00d9ff44",
        }}
      >
        Quero testar o Fivepass
      </a>
      <style>{`
        @media (max-width: 768px) {
          .mobile-sticky-cta { display: block !important; }
        }
      `}</style>
    </div>
  )
}
