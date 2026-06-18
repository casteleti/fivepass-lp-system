"use client"

import { useEffect, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react"

type Tok = { t: string; a?: boolean } // a = palavra em azul (accent)

const PREFIX_1 = "O Fivepass é "
const PREFIX_2 = "para produtor que"

/**
 * Frases sem quebra de linha manual — o wrap é 100% natural (CSS), então funciona
 * em qualquer largura de tela sem risco de estourar a altura reservada (ver tw-stack
 * mais abaixo). O que está em `a:true` sai azul (--accent).
 */
const PHRASES: Tok[][] = [
  [{ t: "não aguenta " }, { t: "taxas", a: true }, { t: " abusivas de marketplace." }],
  [{ t: "quer ver a " }, { t: "própria marca", a: true }, { t: " na plataforma e checkout." }],
  [{ t: "não aceita que o sistema caia bem no " }, { t: "pico das vendas.", a: true }],
  [{ t: "quer " }, { t: "dinheiro na conta", a: true }, { t: ", não preso na plataforma." }],
  [{ t: "não quer dor de cabeça no " }, { t: "check-in", a: true }, { t: " dos eventos." }],
  [{ t: "gosta de acompanhar as vendas em " }, { t: "tempo real.", a: true }],
  [{ t: "quer ter " }, { t: "lucro", a: true }, { t: " com o sucesso do evento." }],
]

const plain = (toks: Tok[]) => toks.map((x) => x.t).join("")
const len = (toks: Tok[]) => plain(toks).length
const ARIA = `${PREFIX_1}${PREFIX_2} ${plain(PHRASES[0])}`

// Desktop/tablet: digitação char-by-char.
const TYPE_MS = 48
const DELETE_MS = 24
const HOLD_FULL_MS = 2200
const HOLD_EMPTY_MS = 350
// Mobile: rotação de frase completa (fade + slide).
const FADE_HOLD_MS = 2600

/** Renderiza os primeiros `n` caracteres da frase, preservando a cor azul dos tokens. */
function renderPartial(toks: Tok[], n: number): ReactNode[] {
  const out: ReactNode[] = []
  let consumed = 0
  let key = 0
  for (const tok of toks) {
    const remaining = n - consumed
    if (remaining <= 0) break
    const slice = tok.t.slice(0, remaining)
    consumed += tok.t.length
    if (slice) out.push(<span key={key++} style={tok.a ? { color: "var(--accent)" } : undefined}>{slice}</span>)
  }
  return out
}

function renderFull(toks: Tok[]): ReactNode[] {
  return toks.map((tok, i) =>
    tok.t ? (
      <span key={i} style={tok.a ? { color: "var(--accent)" } : undefined}>
        {tok.t}
      </span>
    ) : null,
  )
}

type Mode = "typing" | "fade"

// Sincroniza com matchMedia via useSyncExternalStore (sem setState em efeito,
// sem hydration mismatch: getServerSnapshot replica o default do 1º paint SSR).
function subscribeMq(query: string) {
  return (onChange: () => void) => {
    const mq = window.matchMedia(query)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }
}
const subscribeWidth = subscribeMq("(min-width: 768px)")
const subscribeReduced = subscribeMq("(prefers-reduced-motion: reduce)")
const getIsDesktopWidth = () => window.matchMedia("(min-width: 768px)").matches
const getIsReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
const getIsDesktopWidthServer = () => true // default = typing (mesmo comportamento do 1º paint anterior)
const getIsReducedMotionServer = () => false

/**
 * Headline animada da Hero — adaptive design:
 *  - Desktop/tablet (>=768px): digitação char-by-char com cursor.
 *  - Mobile (<768px): troca de frase com fade + slide (mais leve, sem risco de
 *    quebra inesperada de linha em telas estreitas).
 * A altura do bloco animado é reservada via "grid-stack" (todas as frases
 * empilhadas invisíveis na mesma célula de grid) — o navegador calcula sozinho
 * a altura máxima necessária pra largura atual, sem JS e sem overflow cortado.
 * Respeita prefers-reduced-motion (fallback estático, primeira frase completa).
 */
export function TypewriterHeadline() {
  const isDesktopWidth = useSyncExternalStore(subscribeWidth, getIsDesktopWidth, getIsDesktopWidthServer)
  const reducedMotion = useSyncExternalStore(subscribeReduced, getIsReducedMotion, getIsReducedMotionServer)
  const mode: Mode = isDesktopWidth ? "typing" : "fade"

  const [n, setN] = useState(len(PHRASES[0]))
  const [pi, setPi] = useState(0)

  // Desktop/tablet: digitação char-by-char.
  useEffect(() => {
    if (mode !== "typing" || reducedMotion) return

    let phrase = 0
    let char = len(PHRASES[0])
    let deleting = true
    let cancelled = false
    let timer: ReturnType<typeof setTimeout>

    const tick = () => {
      if (cancelled) return
      const L = len(PHRASES[phrase])
      if (!deleting) {
        char++
        setN(char)
        setPi(phrase)
        if (char >= L) {
          deleting = true
          timer = setTimeout(tick, HOLD_FULL_MS)
          return
        }
        timer = setTimeout(tick, TYPE_MS)
      } else {
        char--
        setN(Math.max(char, 0))
        setPi(phrase)
        if (char <= 0) {
          deleting = false
          phrase = (phrase + 1) % PHRASES.length
          char = 0
          timer = setTimeout(tick, HOLD_EMPTY_MS)
          return
        }
        timer = setTimeout(tick, DELETE_MS)
      }
    }

    timer = setTimeout(tick, HOLD_FULL_MS)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [mode, reducedMotion])

  // Mobile: rotação de frase completa (1 atualização a cada ~2.6s — muito mais leve que o typing).
  useEffect(() => {
    if (mode !== "fade" || reducedMotion) return
    const id = setInterval(() => setPi((p) => (p + 1) % PHRASES.length), FADE_HOLD_MS)
    return () => clearInterval(id)
  }, [mode, reducedMotion])

  const h1Style: CSSProperties = {
    fontSize: "clamp(21px, 6.5vw, 56px)",
    fontWeight: 800,
    lineHeight: 1.16,
    letterSpacing: "-0.015em",
    color: "var(--sec-text)",
    maxWidth: 900,
  }

  const showTyping = mode === "typing" && !reducedMotion

  return (
    <>
      <style>{`
        @media (max-width: 767px) { .prefix-line2 { display: block; } }
        .tw-stack { display: grid; }
        .tw-stack > * { grid-area: 1 / 1; }
        .tw-sizer { visibility: hidden; }
        .tw-fade-line { animation: tw-fadeIn .5s ease both; }
        @keyframes tw-fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
      `}</style>
      <h1 aria-label={ARIA} style={h1Style}>
        <span style={{ display: "block" }}>
          <span>{PREFIX_1}</span>
          <span className="prefix-line2">{PREFIX_2}</span>
        </span>

        {/* tw-stack: todas as frases empilhadas (grid-area: 1/1) reservam a altura máxima
            necessária na largura atual — sem JS, sem overflow cortado, qualquer breakpoint. */}
        <span className="tw-stack" style={{ marginTop: 8 }}>
          {PHRASES.map((toks, i) => (
            <span key={`sizer-${i}`} className="tw-sizer" aria-hidden="true">
              {plain(toks)}
            </span>
          ))}

          {reducedMotion ? (
            <span aria-hidden="true">{renderFull(PHRASES[0])}</span>
          ) : showTyping ? (
            <span aria-hidden="true">
              {renderPartial(PHRASES[pi], n)}
              <span className="tw-caret">|</span>
            </span>
          ) : (
            <span key={pi} className="tw-fade-line" aria-hidden="true">
              {renderFull(PHRASES[pi])}
            </span>
          )}
        </span>
      </h1>
    </>
  )
}
