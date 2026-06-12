"use client"

import { useEffect, useState, type CSSProperties, type ReactNode } from "react"

type Tok = { t: string; a?: boolean } // a = palavra em azul (accent)

const PREFIX = "O Fivepass é para produtor que"

/** Cada frase tem 2 linhas (o "\n" marca a quebra). O que está em `a:true` sai azul. */
const PHRASES: Tok[][] = [
  [{ t: "não aguenta " }, { t: "taxas", a: true }, { t: "\nabusivas de marketplace." }],
  [{ t: "quer ver a " }, { t: "própria marca", a: true }, { t: "\nna plataforma e checkout." }],
  [{ t: "não aceita que o sistema\ncaia bem no " }, { t: "pico das vendas.", a: true }],
  [{ t: "quer " }, { t: "dinheiro na conta", a: true }, { t: ",\nnão preso na plataforma." }],
  [{ t: "não quer dor de cabeça\nno " }, { t: "check-in", a: true }, { t: " dos eventos." }],
  [{ t: "gosta de acompanhar as\nvendas em " }, { t: "tempo real.", a: true }],
  [{ t: "quer ter " }, { t: "lucro", a: true }, { t: "\ncom o sucesso do evento." }],
]

const plain = (toks: Tok[]) => toks.map((x) => x.t).join("")
const len = (toks: Tok[]) => plain(toks).length
const LONGEST = PHRASES.reduce((a, b) => (len(b) > len(a) ? b : a), PHRASES[0])
const ARIA = `${PREFIX} ${plain(PHRASES[0]).replace(/\n/g, " ")}`

const TYPE_MS = 50
const DELETE_MS = 26
const HOLD_FULL_MS = 2000
const HOLD_EMPTY_MS = 350

/** Renderiza os primeiros `n` caracteres da frase, preservando quebras e cor azul. */
function render(toks: Tok[], n: number): ReactNode[] {
  const out: ReactNode[] = []
  let consumed = 0
  let key = 0
  for (const tok of toks) {
    const remaining = n - consumed
    if (remaining <= 0) break
    const slice = tok.t.slice(0, remaining)
    consumed += tok.t.length
    slice.split("\n").forEach((part, idx) => {
      if (idx > 0) out.push(<br key={`b${key++}`} />)
      if (part) {
        out.push(
          <span key={`s${key++}`} style={tok.a ? { color: "var(--accent)" } : undefined}>
            {part}
          </span>,
        )
      }
    })
  }
  return out
}

export function TypewriterHeadline() {
  const [n, setN] = useState(len(PHRASES[0])) // SSR: frase 0 completa
  const [pi, setPi] = useState(0)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

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
  }, [])

  const h1Style: CSSProperties = {
    fontSize: "clamp(21px, 6.5vw, 56px)",
    fontWeight: 800,
    lineHeight: 1.16,
    letterSpacing: "-0.015em",
    color: "var(--sec-text)",
    maxWidth: 900,
  }

  return (
    <>
      {/* quebra do prefixo só no mobile — inline p/ não ser removido pelo processador de CSS */}
      <style>{`@media (max-width: 767px) { .prefix-line2 { display: block; } }`}</style>
      <h1 aria-label={ARIA} style={h1Style}>
      <span style={{ display: "block" }}>
        <span>O Fivepass é </span>
        <span className="prefix-line2">para produtor que</span>
      </span>
      <span style={{ display: "block", position: "relative", marginTop: 8 }}>
        {/* sizer invisível: reserva as 2 linhas (sem pulo de layout) */}
        <span aria-hidden="true" style={{ visibility: "hidden", display: "block" }}>
          {render(LONGEST, len(LONGEST))}
        </span>
        {/* linha que gira (animada) */}
        <span aria-hidden="true" style={{ position: "absolute", left: 0, top: 0, right: 0 }}>
          {render(PHRASES[pi], n)}
          <span className="tw-caret">|</span>
        </span>
      </span>
      </h1>
    </>
  )
}
