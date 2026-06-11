import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getRedis } from "@/lib/redis"

export async function GET() {
  const start = Date.now()
  const services: Record<string, { status: string; latency?: number }> = {}

  // Check DB
  try {
    const dbStart = Date.now()
    await prisma.$queryRaw`SELECT 1`
    services.database = { status: "ok", latency: Date.now() - dbStart }
  } catch (err) {
    services.database = { status: "error" }
  }

  // Check Redis
  try {
    const { client, available } = await getRedis()
    if (available && client) {
      const redisStart = Date.now()
      await client.ping()
      services.redis = { status: "ok", latency: Date.now() - redisStart }
    } else {
      services.redis = { status: "unavailable" }
    }
  } catch {
    services.redis = { status: "error" }
  }

  const allOk = services.database?.status === "ok"
  const status = allOk ? "ok" : "degraded"

  return NextResponse.json(
    {
      status,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      latency: Date.now() - start,
      services,
      node: process.version,
    },
    { status: allOk ? 200 : 503 }
  )
}
