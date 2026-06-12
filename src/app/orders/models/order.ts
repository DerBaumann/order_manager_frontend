import { z } from 'zod';
import { Contact } from '../../contacts/models/contact';
import { CreateOrderPosition, OrderPosition } from '../../order_positions/models/order_position';

export const OrderStatus = z.enum(['OPEN', 'IN_PROGRESS', 'FINISHED', 'CANCELLED']);
export type OrderStatus = z.infer<typeof OrderStatus>;

export const OrderPriority = z.enum(['LOW', 'MEDIUM', 'HIGH']);
export type OrderPriority = z.infer<typeof OrderPriority>;

export const CreateOrder = z.object({
  name: z.string(),
  description: z.string(),
  status: OrderStatus,
  startDate: z.iso.date(),
  endDate: z.iso.date(),
  priority: OrderPriority,
  category: z.string(),
  positions: z.array(CreateOrderPosition),
  contactId: z.number().int(),
});
export type CreateOrder = z.infer<typeof CreateOrder>;

export const Order = z.object({
  id: z.number().int(),
  name: z.string(),
  description: z.string(),
  status: OrderStatus,
  startDate: z.iso.date(),
  endDate: z.iso.date(),
  priority: OrderPriority,
  category: z.string(),
  positions: z.array(OrderPosition),
  contact: Contact,
});
export type Order = z.infer<typeof Order>;

export const OrderTableRow = Order.omit({
  positions: true,
  contact: true,
}).extend({
  contactName: z.string(),
});
export type OrderTableRow = z.infer<typeof OrderTableRow>;

export const tableRowFromOrder = (order: Order): OrderTableRow => ({
  id: order.id,
  name: order.name,
  description: order.description,
  status: order.status,
  startDate: order.startDate,
  endDate: order.endDate,
  priority: order.priority,
  category: order.category,
  contactName: `${order.contact.firstname} ${order.contact.lastname}`,
});
