import { prisma } from "@/lib/db"

interface LogParams {
  method: string
  endpoint: string
  status: number
  requestBody?: unknown
  responseBody?: unknown
  errorMessage?: string
  ipAddress?: string
  userAgent?: string
  duration: number
}

export async function logApi(params: LogParams) {
  try {
    await prisma.apiLog.create({
      data: {
        method: params.method,
        endpoint: params.endpoint,
        status: params.status,
        requestBody: params.requestBody ? (params.requestBody as object) : undefined,
        responseBody: params.responseBody ? (params.responseBody as object) : undefined,
        errorMessage: params.errorMessage,
        ipAddress: params.ipAddress,
        userAgent: params.userAgent,
        duration: params.duration,
      },
    })
  } catch {
    // Non-critical — don't let logging failures break requests
  }
}
