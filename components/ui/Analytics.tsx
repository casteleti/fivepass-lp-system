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
  porte: "casos_uso",
}

// Resolve section_name a partir do elemento clicado (section pai, ou áreas fixas como navbar/footer).
function resolveSectionName(el: HTMLElement): string {
  const sec = el.closest("section[id]") as HTMLElement | null
  if (sec) return SECTION_NAMES[sec.id] || sec.id
  if (el.closest("header")) return "navbar"
  if (el.closest("footer")) return "footer"
  if (el.closest(".mobile-sticky-cta")) return "sticky_mobile"
  return "outro"
}

/**
 * Tracking da LP (GTM dataLayer + GA4 via lib/analytics; Meta Pixel via tag no GTM):
 *  - section_view    (IntersectionObserver, 1x por seção)
 *  - cta_click       (todo CTA "Quero testar o Fivepass" aponta pra #cta)
 *  - whatsapp_click  (todo CTA que aponta pra wa.me, mesmo que abra o quiz)
 *  - scroll_25/50/75/100
 *  - time_on_page_30s/60s/120s
 *  - form_start / form_submit  (form_type: main_form | quiz)
 * Eventos do quiz (quiz_start/quiz_complete/quiz_submit) e lead_success ficam em Quiz.tsx/FinalCTA.tsx,
 * pois dependem de estado interno (respostas, sucesso da API) que esse listener global não tem.
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

    // 2) cta_click (CTAs do form principal) + whatsapp_click (CTAs que apontam pro WhatsApp/quiz)
    const onClick = (ev: MouseEvent) => {
      const target = ev.target as HTMLElement
      const a = target?.closest?.('a[href="#cta"]') as HTMLAnchorElement | null
      if (a) {
        track("cta_click", {
          section_name: resolveSectionName(a),
          button_name: (a.textContent || "").replace(/\s+/g, " ").trim().slice(0, 60),
          destination: "form_final",
        })
        return
      }
      const wa = target?.closest?.('a[href*="wa.me"]') as HTMLAnchorElement | null
      if (wa) {
        track("whatsapp_click", {
          section_name: resolveSectionName(wa),
          button_name: (wa.textContent || "").replace(/\s+/g, " ").trim().slice(0, 60),
          destination: "whatsapp",
        })
      }
    }
    document.addEventListener("click", onClick)

    // 3) form_start (1ª interação) + form_submit — diferencia form_type (main_form | quiz)
    const onFocusIn = (ev: Event) => {
      const t = ev.target as HTMLElement | null
      if (!t || !/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return
      const form_type = t.closest(".quiz-modal") ? "quiz" : "main_form"
      once(`form_start:${form_type}`, () => track("form_start", { form_type }))
    }
    document.addEventListener("focusin", onFocusIn)
    // Só o form principal usa <form onSubmit> de verdade — o quiz dispara "quiz_submit" via lib/analytics direto.
    const onSubmit = () => once("form_submit:main_form", () => track("form_submit", { form_type: "main_form" }))
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
