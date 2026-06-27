import { z } from 'zod';

export const rfqSchema = z.object({
  company_name: z.string().trim().min(2).max(200),
  contact_person: z.string().trim().min(2).max(120),
  country: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(6).max(30),
  email: z.string().trim().email().max(200),
  product_interest: z.string().trim().min(2).max(300),
  quantity: z.coerce.number().int().positive().max(1_000_000).optional().nullable(),
  message: z.string().trim().max(2000).optional().nullable(),
});

export type RFQPayload = z.infer<typeof rfqSchema>;
