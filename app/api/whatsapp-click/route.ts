import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { logApi } from "@/lib/api-logger"
import { z } from "zod"

const schema = z.object({ leadId: z.string().cuid() })

export async function POST(req: NextRequest) {
  const start = Date.now()
  const ip = req.headers.get("x-forwarded-for") ?? "unknown"
  const userAgent = req.headers.get("user-agent") ?? undefined

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON" }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ success: false, errors: parsed.error.flatten() }, { status: 400 })
  }

  try {
    await prisma.lead.update({
      where: { id: parsed.data.leadId },
      data: {
        whatsappClicked: true,
        whatsappClickedAt: new Date(),
        trackingEvents: {
          create: { eventName: "whatsapp_click" },
        },
      },
    })

    const phone = process.env.WHATSAPP_PHONE_NUMBER || "5511999999999"
    const message = encodeURIComponent(process.env.WHATSAPP_DEFAULT_MESSAGE || "Olá! Gostaria de saber mais sobre Fivepass...")
    const whatsappUrl = `https://wa.me/${phone}?text=${message}`

    const response = { success: true, whatsappUrl }
    await logApi({ method: "POST", endpoint: "/api/whatsapp-click", status: 200, requestBody: body, responseBody: response, duration: Date.now() - start, ipAddress: ip, userAgent })
    return NextResponse.json(response)
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : "Unknown error"
    await logApi({ method: "POST", endpoint: "/api/whatsapp-click", status: 500, errorMessage: errMsg, duration: Date.now() - start, ipAddress: ip, userAgent })
    return NextResponse.json({ success: false, error: "Erro interno." }, { status: 500 })
  }
}
