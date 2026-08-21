import { z } from "zod";
import { truckTypeNames } from "../drizzle/schema";

export const leadSubmissionSchema = z.object({
  fullName: z.string().trim().min(2).max(160),
  company: z.string().trim().max(160).optional(),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().min(7).max(64),
  truckType: z.enum(truckTypeNames),
  truckCount: z.number().int().min(1).max(500).optional(),
  location: z.string().trim().max(180).optional(),
  message: z.string().trim().max(5000).optional(),
  consent: z.literal(true),
});

export const contactSubmissionSchema = z.object({
  name: z.string().trim().min(2).max(160),
  company: z.string().trim().max(160).optional(),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().max(64).optional(),
  subject: z.string().trim().min(2).max(240),
  message: z.string().trim().min(4).max(5000),
});
