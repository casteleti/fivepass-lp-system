import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { leadSchema } from "@/lib/validations/lead"
import { logApi } from "@/lib/api-logger"
import { sendRdConversion } from "@/lib/rd"

export async function POST(req: NextRequest) {
  const start = Date.now()
  const ip = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "unknown"
  const userAgent = req.headers.get("user-agent") ?? undefined

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON" }, { status: 400 })
  }

  const parsed = leadSchema.safeParse(body)
  if (!parsed.success) {
    await logApi({ method: "POST", endpoint: "/api/leads", status: 400, requestBody: body, responseBody: parsed.error.flatten(), duration: Date.now() - start, ipAddress: ip, userAgent })
    return NextResponse.json({ success: false, errors: parsed.error.flatten() }, { status: 400 })
  }

  const url = new URL(req.url)
  const utmSource = url.searchParams.get("utm_source") ?? req.headers.get("referer") ?? undefined
  const utmMedium = url.searchParams.get("utm_medium") ?? undefined
  const utmCampaign = url.searchParams.get("utm_campaign") ?? undefined
  const utmTerm = url.searchParams.get("utm_term") ?? undefined
  const utmContent = url.searchParams.get("utm_content") ?? undefined

  // Envia pro RD Station primeiro (não depende do banco)
  await sendRdConversion({
    email: parsed.data.email,
    name: parsed.data.name,
    mobilePhone: parsed.data.phone,
    eventType: parsed.data.eventType,
    volume: parsed.data.monthlyTicketsEstimate,
    dor: (body as { dor?: string })?.dor,
  })

  // Tenta salvar no banco se DATABASE_URL estiver configurada (best-effort)
  let leadId: number | undefined
  try {
    const lead = await prisma.lead.create({
      data: {
        ...parsed.data,
        source: utmSource,
        medium: utmMedium,
        campaign: utmCampaign,
        term: utmTerm,
        content: utmContent,
        ipAddress: ip,
        userAgent,
        trackingEvents: {
          create: {
            eventName: "form_submit",
            eventData: { landingVariant: parsed.data.landingVariant },
          },
        },
      },
    })
    leadId = lead.id
  } catch {
    // Banco indisponível — lead já foi enviado ao RD Station
  }

  const response = { success: true, leadId, redirectUrl: `/thank-you${leadId ? `?leadId=${leadId}` : ""}` }
  await logApi({ method: "POST", endpoint: "/api/leads", status: 201, requestBody: body, responseBody: response, duration: Date.now() - start, ipAddress: ip, userAgent }).catch(() => {})
  return NextResponse.json(response, { status: 201 })
}
