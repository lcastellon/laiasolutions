import { z } from "zod";
import { QUOTE_SERVICES } from "./contact";

export const quoteSchema = z.object({
  submissionId: z.string().uuid(),
  name: z.string().trim().min(1).max(120),
  business: z.string().trim().max(160),
  contact: z.string().trim().min(1).max(160),
  service: z.string().refine((value) => QUOTE_SERVICES.includes(value)),
  description: z.string().trim().min(1).max(2500),
  website: z.string().max(0),
});