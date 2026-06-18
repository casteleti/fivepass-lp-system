import type { Metadata } from "next"
import { Quiz } from "@/components/ui/Quiz"

// Página dedicada de campanha (Meta Ads): SÓ o quiz, sem a landing.
// O lead cai direto no preenchimento → envia pro RD Station (/api/leads) → WhatsApp.
export const metadata: Metadata = {
  title: "Fivepass — Diagnóstico gratuito da sua bilheteria",
  description: "Responda 3 perguntas rápidas e descubra como vender mais ingressos pagando menos taxa.",
  alternates: { canonical: "/quiz" },
  // Destino de tráfego pago — fora do índice orgânico (evita SEO de página sem conteúdo).
  robots: { index: false, follow: true },
}

export default function QuizPage() {
  return <Quiz standalone />
}
