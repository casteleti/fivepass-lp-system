"use client"

import { useEffect } from "react"
import Clarity from "@microsoft/clarity"
import { setClarityReady } from "@/lib/analytics"

const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID

// Guarda contra dupla inicialização (ex.: Fast Refresh em dev, remounts).
// Clarity.init() injeta um <script id="clarity-script"> e o próprio pacote já
// no-opa se o id já existe no DOM — esse flag é uma segunda camada de segurança.
let clarityInitialized = false

/**
 * Inicializa o Microsoft Clarity via pacote oficial @microsoft/clarity (sem script
 * manual no <head>). Client Component dedicado — o RootLayout continua Server
 * Component; só este componente roda no client, e só dentro de useEffect (nunca
 * durante SSR, mesmo que o import do pacote seja estático e avaliado no server
 * durante a renderização inicial: o pacote só toca `window`/`document` dentro das
 * funções chamadas em runtime, nunca no top-level do módulo).
 * Só inicializa em produção (NODE_ENV === "production") e só se
 * NEXT_PUBLIC_CLARITY_ID estiver setado — sem isso, vira no-op silencioso.
 */
export function ClarityProvider() {
  useEffect(() => {
    if (clarityInitialized) return
    if (process.env.NODE_ENV !== "production") return
    if (!CLARITY_ID) return

    Clarity.init(CLARITY_ID)
    clarityInitialized = true
    setClarityReady(Clarity)
  }, [])

  return null
}
