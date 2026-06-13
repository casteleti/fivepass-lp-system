// Integração RD Station — envio de conversão (cria/atualiza o contato no RD).
// Usa o TOKEN PÚBLICO como api_key (token que o RD reserva p/ conversões).
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

// Rótulos legíveis enviados pro RD (em vez dos códigos internos do quiz)
const EVENT_LABEL: Record<string, string> = {
  show: "Show / Festival",
  festa: "Festa / Balada",
  conferencia: "Conferência / Congresso",
  outro: "Outro",
}
const VOLUME_LABEL: Record<number, string> = {
  250: "Até 500",
  1000: "500 a 2 mil",
  5000: "2 mil a 10 mil",
  15000: "Mais de 10 mil",
}
const DOR_LABEL: Record<string, string> = {
  taxa: "Taxa alta",
  caixa: "Dinheiro preso",
  marca: "Marca diluída",
  estabilidade: "Instabilidade no pico",
}

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
          // Identificadores EXATOS dos campos personalizados criados no RD:
          cf_tipo_de_evento: data.eventType ? EVENT_LABEL[data.eventType] ?? data.eventType : undefined,
          cf_ingressos_por_mes:
            typeof data.volume === "number" ? VOLUME_LABEL[data.volume] ?? String(data.volume) : undefined,
          cf_principal_dor: data.dor ? DOR_LABEL[data.dor] ?? data.dor : undefined,
        },
      }),
    })
    return res.ok
  } catch {
    return false
  }
}
