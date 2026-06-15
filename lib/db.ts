import { PrismaClient } from "@prisma/client"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalForPrisma = globalThis as unknown as { prisma: any }

// Só instancia se DATABASE_URL estiver configurada — evita crash no import
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const prisma: PrismaClient = globalForPrisma.prisma ?? (process.env.DATABASE_URL
  ? (() => {
      const client = new PrismaClient({
        log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
      })
      if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = client
      return client
    })()
  : null)
