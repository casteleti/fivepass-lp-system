"use client"

import { useEffect, useState } from "react"

export function Navbar() {
  // sobre o hero (topo) vs. rolado (perto do bloco 2) — só muda o visual no mobile
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const hero = document.getElementById("hero")
    const onScroll = () => {
      const h = hero?.offsetHeight ?? window.innerHeight
      setScrolled(window.scrollY > h * 0.6)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <header
      className={scrolled ? "site-nav nav-scrolled" : "site-nav nav-top"}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "rgba(5,6,9,0.72)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Regras de transição mobile inline (não passam pelo processador de CSS) */}
      <style>{`
        .site-nav .nav-logo { height: 26px; width: auto; aspect-ratio: 800 / 174; display: block; object-fit: contain; transition: height .35s ease; }
        .site-nav .nav-cta {
          opacity: 1; transform: none; pointer-events: auto;
          transition: opacity .35s ease, transform .35s ease;
        }
        @media (max-width: 767px) {
          .nav-top .nav-logo { height: 42px; }
          .nav-top .nav-cta { display: none; }
          .nav-scrolled .nav-logo { height: 26px; }
          .nav-scrolled .nav-cta { display: inline-flex; opacity: 1; transform: none; pointer-events: auto; }
        }
      `}</style>

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "13px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: "42px",
        }}
      >
        <a href="#hero" aria-label="Fivepass — início" style={{ display: "inline-flex" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/fivepass-site-01.png" alt="Fivepass" width={184} height={40} className="nav-logo" />
        </a>

        <a
          href="#cta"
          className="nav-cta"
          style={{
            padding: "10px 18px",
            background: "var(--accent)",
            color: "var(--bg-darker)",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: 700,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          Quero testar o Fivepass
        </a>
      </div>
    </header>
  )
}
