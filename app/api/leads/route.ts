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

    // Envia a conversão pro RD Station (best-effort — não derruba o lead se o RD falhar)
    await sendRdConversion({
      email: parsed.data.email,
      name: parsed.data.name,
      mobilePhone: parsed.data.phone,
      eventType: parsed.data.eventType,
      volume: parsed.data.monthlyTicketsEstimate,
      dor: (body as { dor?: string })?.dor,
    })

    const response = { success: true, leadId: lead.id, redirectUrl: `/thank-you?leadId=${lead.id}` }
    await logApi({ method: "POST", endpoint: "/api/leads", status: 201, requestBody: body, responseBody: response, duration: Date.now() - start, ipAddress: ip, userAgent })
    return NextResponse.json(response, { status: 201 })
  } catch (err: unknown) {
    const isDuplicate = err instanceof Error && err.message.includes("Unique constraint")
    if (isDuplicate) {
      const response = { success: false, error: "Este e-mail já está cadastrado." }
      await logApi({ method: "POST", endpoint: "/api/leads", status: 409, requestBody: body, responseBody: response, duration: Date.now() - start, ipAddress: ip, userAgent })
      return NextResponse.json(response, { status: 409 })
    }

    const errMsg = err instanceof Error ? err.message : "Unknown error"
    await logApi({ method: "POST", endpoint: "/api/leads", status: 500, requestBody: body, errorMessage: errMsg, duration: Date.now() - start, ipAddress: ip, userAgent })
    return NextResponse.json({ success: false, error: "Erro interno. Tente novamente." }, { status: 500 })
  }
}
