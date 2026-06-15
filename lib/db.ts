import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }

function getPrisma(): PrismaClient | null {
  if (!process.env.DATABASE_URL) return null
  if (globalForPrisma.prisma) return globalForPrisma.prisma
  const client = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  })
  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = client
  return client
}

export const prisma = {
  lead: {
    create: async (args: Parameters<PrismaClient["lead"]["create"]>[0]) => {
      const client = getPrisma()
      if (!client) throw new Error("DATABASE_URL not configured")
      return client.lead.create(args)
    },
  },
  apiLog: {
    create: async (args: Parameters<PrismaClient["apiLog"]["create"]>[0]) => {
      const client = getPrisma()
      if (!client) throw new Error("DATABASE_URL not configured")
      return client.apiLog.create(args)
    },
  },
  trackingEvent: {
    create: async (args: Parameters<PrismaClient["trackingEvent"]["create"]>[0]) => {
      const client = getPrisma()
      if (!client) throw new Error("DATABASE_URL not configured")
      return client.trackingEvent.create(args)
    },
  },
}
