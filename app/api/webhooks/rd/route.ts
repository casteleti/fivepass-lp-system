import { NextRequest, NextResponse } from "next/server"
import { logApi } from "@/lib/api-logger"

export async function POST(req: NextRequest) {
  const start = Date.now()
  const secret = req.headers.get("x-rd-webhook-secret")
  const expectedSecret = process.env.RD_WEBHOOK_SECRET

  if (expectedSecret && secret !== expectedSecret) {
    await logApi({ method: "POST", endpoint: "/api/webhooks/rd", status: 401, errorMessage: "Invalid webhook secret", duration: Date.now() - start })
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  // Placeholder — integração RD Station futura
  await logApi({ method: "POST", endpoint: "/api/webhooks/rd", status: 200, requestBody: body, responseBody: { received: true }, duration: Date.now() - start })

  return NextResponse.json({ received: true })
}
