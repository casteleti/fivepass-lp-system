// Integração RD Station — envio de conversão (cria/atualiza o contato no RD).
// Usa o TOKEN PÚBLICO como api_key (é o token que o RD reserva p/ conversões).
// Endpoint oficial: POST https://api.rd.services/platform/conversions?api_key=...
// Best-effort: nunca lança — se o RD falhar/estiver off, o lead já foi salvo no banco.

export type RdConversion = {
  email: string
  name?: string
  mobilePhone?: string
  eventType?: string
  volume?: number
  dor?: string
}

const CONVERSION_IDENTIFIER = "fivepass-lp-quiz"

export async function sendRdConversion(data: RdConversion): Promise<boolean> {
  const apiKey = process.env.RD_PUBLIC_TOKEN
  if (!apiKey || !data.email) return false

  try {
    const res = await fetch(`https://api.rd.services/platform/conversions?api_key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_type: "CONVERSION",
        event_family: "CDP",
        payload: {
          conversion_identifier: CONVERSION_IDENTIFIER,
          email: data.email,
          name: data.name,
          mobile_phone: data.mobilePhone,
          // Campos custom: só são gravados se existirem no RD (cf_*); senão, ignorados.
          cf_tipo_evento: data.eventType,
          cf_ingressos_mes: data.volume,
          cf_principal_dor: data.dor,
        },
      }),
    })
    return res.ok
  } catch {
    return false
  }
}
