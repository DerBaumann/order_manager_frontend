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

export const CreateContact = z.object({
  firstname: z.string(),
  lastname: z.string(),
  email: z.email(),
  phone: z.string(),
  street: z.string(),
  placeName: z.string(),
  postCode: z.string().length(4),
  canton: z.string(),
});
export type CreateContact = z.infer<typeof CreateContact>;

export const ContactTableRow = z.object({
  id: z.number(),
  firstname: z.string(),
  lastname: z.string(),
  email: z.email(),
  phone: z.string(),
  street: z.string(),
  placeName: z.string(),
  postCode: z.string().length(4),
  canton: z.string(),
});
export type ContactTableRow = z.infer<typeof ContactTableRow>;

export const tableRowFromContact = (contact: Contact): ContactTableRow => ({
  id: contact.id,
  firstname: contact.firstname,
  lastname: contact.lastname,
  email: contact.email,
  phone: contact.phone,
  street: contact.street,
  placeName: contact.place.name,
  postCode: contact.place.postCode,
  canton: contact.place.canton,
});
