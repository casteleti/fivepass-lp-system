import { z } from "zod"

export const leadSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().regex(/^\d{10,15}$/).optional(),
  company: z.string().max(200).optional(),
  eventType: z.enum(["show", "festa", "conferencia", "outro"]).optional(),
  monthlyTicketsEstimate: z.number().int().min(0).max(1000000).optional(),
  landingVariant: z.string().default("default"),
})

export type LeadInput = z.infer<typeof leadSchema>
