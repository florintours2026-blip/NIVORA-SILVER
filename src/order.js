const { z } = require("zod");

const orderSchema = z.object({
  customerId: z.string().uuid().optional().nullable(),
  items: z.array(z.object({
    productId: z.string().uuid(),
    quantity: z.coerce.number().int().positive(),
    price: z.coerce.number().nonnegative()
  })).min(1),
  shippingAddress: z.record(z.string(), z.string()).optional().default({}),
  paymentMethod: z.literal("prepaid"),
  notes: z.string().optional().default("")
});

module.exports = { orderSchema };
