import { z } from 'zod';

export const CreateOrderPosition = z.object({
  name: z.string(),
  description: z.string().optional(),
  amount: z.number().int(),
  price: z.number(),
});
export type CreateOrderPosition = z.infer<typeof CreateOrderPosition>;

export const OrderPosition = z.object({
  id: z.number().int(),
  name: z.string(),
  description: z.string().nullable().optional(),
  amount: z.number().int(),
  price: z.number(),
});
export type OrderPosition = z.infer<typeof OrderPosition>;
