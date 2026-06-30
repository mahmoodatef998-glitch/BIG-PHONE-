import { z } from 'zod';

export const rfqItemSchema = z.object({
  product_id: z.string().trim().max(80).optional().nullable(),
  slug: z.string().trim().min(1).max(200),
  name: z.string().trim().min(1).max(300),
  quantity: z.coerce.number().int().positive().max(1_000_000),
  moq: z.coerce.number().int().positive().max(1_000_000).optional(),
  storage: z.string().trim().max(80).optional().nullable(),
  color: z.string().trim().max(80).optional().nullable(),
  brand_name: z.string().trim().max(120).optional().nullable(),
  unit_price_aed: z.coerce.number().nonnegative().max(10_000_000).optional().nullable(),
});

export const rfqSchema = z.object({
  company_name: z.string().trim().min(2).max(200),
  contact_person: z.string().trim().min(2).max(120),
  country: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(6).max(30),
  email: z.string().trim().email().max(200),
  product_interest: z.string().trim().min(2).max(8000).optional(),
  quantity: z.coerce.number().int().positive().max(10_000_000).optional().nullable(),
  items: z.array(rfqItemSchema).max(500).optional(),
  message: z.string().trim().max(2000).optional().nullable(),
}).superRefine((data, ctx) => {
  const hasItems = Array.isArray(data.items) && data.items.length > 0;
  if (hasItems) return;
  if (!data.product_interest || data.product_interest.length < 2) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Product or cart items required',
      path: ['product_interest'],
    });
  }
});

export type RFQPayload = z.infer<typeof rfqSchema>;
export type RFQItemPayload = z.infer<typeof rfqItemSchema>;
