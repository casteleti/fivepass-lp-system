"use client"

import { useEffect } from "react"
import { setClarityReady } from "@/lib/analytics"

const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID

/**
 * Inicializa o Microsoft Clarity via pacote oficial @microsoft/clarity.
 * Client Component dedicado — não entra no RootLayout como Server Component,
 * não usa script manual no <head>, não roda no SSR.
 * Só inicializa em produção e só se NEXT_PUBLIC_CLARITY_ID estiver setado.
 */
export function Clarity() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return
    if (!CLARITY_ID) return

    let cancelled = false
    import("@microsoft/clarity").then(({ default: clarity }) => {
      if (cancelled) return
      clarity.init(CLARITY_ID)
      setClarityReady(clarity)
    })

    return () => {
      cancelled = true
    }
  }, [])

  return null
}
