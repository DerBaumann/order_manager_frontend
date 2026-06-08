import z from 'zod';

export const Place = z.object({
  id: z.number(),
  name: z.string(),
  postCode: z.string().length(4),
  canton: z.string(),
});
export type Place = z.infer<typeof Place>;

export const Contact = z.object({
  id: z.number(),
  firstname: z.string(),
  lastname: z.string(),
  email: z.email(),
  phone: z.string(),
  street: z.string(),
  place: Place,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
export type Contact = z.infer<typeof Contact>;
