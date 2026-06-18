"use client"

import { useEffect } from "react"
import { track } from "@/lib/analytics"

// id da <section> → nome legível pro analytics (reports GA4/Pixel).
// Mantém os ids atuais (são âncoras de scroll) e só dá um nome bonito pro evento.
const SECTION_NAMES: Record<string, string> = {
  hero: "hero",
  "hero-pitch": "hero",
  conta: "perda_taxa",
  problema: "problema",
  virada: "solucao",
  muda: "beneficios",
  plataforma: "plataforma",
  prova: "prova_social",
  faq: "faq",
  agora: "urgencia",
  cta: "cta_final",
}

/**
 * Tracking da LP (GA4 + Meta Pixel via lib/analytics):
 *  - section_view  (IntersectionObserver, 1x por seção)
 *  - cta_click     (todo CTA "Quero testar o Fivepass" aponta pra #cta)
 *  - scroll_25/50/75/100
 *  - time_on_page_30s/60s/120s
 *  - form_start / form_submit
 * Montado no layout → roda em todas as páginas (param `page` separa LP de /quiz).
 */
export function Analytics() {
  useEffect(() => {
    const fired = new Set<string>()
    const once = (key: string, fn: () => void) => {
      if (fired.has(key)) return
      fired.add(key)
      fn()
    }

    // 1) section_view
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          const id = (e.target as HTMLElement).id
          once(`sec:${id}`, () => track("section_view", { section_name: SECTION_NAMES[id] || id }))
          io.unobserve(e.target)
        }
      },
      { threshold: 0.4 },
    )
    document.querySelectorAll<HTMLElement>("section[id]").forEach((s) => io.observe(s))

    // 2) cta_click
    const onClick = (ev: MouseEvent) => {
      const a = (ev.target as HTMLElement)?.closest?.('a[href="#cta"]') as HTMLAnchorElement | null
      if (!a) return
      const sec = a.closest("section[id]") as HTMLElement | null
      let section_name = "outro"
      if (sec) section_name = SECTION_NAMES[sec.id] || sec.id
      else if (a.closest("header")) section_name = "navbar"
      else if (a.closest("footer")) section_name = "footer"
      else if (a.closest(".mobile-sticky-cta")) section_name = "sticky_mobile"
      track("cta_click", {
        section_name,
        button_name: (a.textContent || "").replace(/\s+/g, " ").trim().slice(0, 60),
        destination: "form_final",
      })
    }
    document.addEventListener("click", onClick)

    // 3) form_start (1ª interação) + form_submit
    const onFocusIn = (ev: Event) => {
      const t = ev.target as HTMLElement | null
      if (t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) once("form_start", () => track("form_start"))
    }
    document.addEventListener("focusin", onFocusIn)
    const onSubmit = () => once("form_submit", () => track("form_submit"))
    document.addEventListener("submit", onSubmit, true)

    // 4) scroll depth
    const onScroll = () => {
      const el = document.documentElement
      const max = el.scrollHeight - el.clientHeight
      if (max <= 0) return
      const pct = (el.scrollTop / max) * 100
      for (const m of [25, 50, 75, 100]) if (pct >= m) once(`scroll:${m}`, () => track(`scroll_${m}`))
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()

    // 5) tempo na página
    const timers = [30, 60, 120].map((s) => window.setTimeout(() => track(`time_on_page_${s}s`), s * 1000))

    return () => {
      io.disconnect()
      document.removeEventListener("click", onClick)
      document.removeEventListener("focusin", onFocusIn)
      document.removeEventListener("submit", onSubmit, true)
      window.removeEventListener("scroll", onScroll)
      timers.forEach((t) => window.clearTimeout(t))
    }
  }, [])

  return null
}
