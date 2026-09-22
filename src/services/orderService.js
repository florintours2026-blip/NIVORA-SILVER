const crypto = require("crypto");
const pool = require("../config/db");
const { sendOrderCreated } = require("./emailService");

async function createOrder({ customerId, items, shippingAddress, paymentMethod, notes }) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const orderNumber = `NV-${Date.now()}-${crypto.randomBytes(2).toString("hex").toUpperCase()}`;

    const orderResult = await client.query(
      `INSERT INTO orders
       (order_number,customer_id,status,payment_status,payment_method,subtotal,total,shipping_address,notes)
       VALUES ($1,$2,'pending','pending',$3,$4,$4,$5,$6)
       RETURNING *`,
      [orderNumber, customerId || null, paymentMethod, total, shippingAddress || {}, notes || ""]
    );

    for (const item of items) {
      await client.query(
        `INSERT INTO order_items (order_id,product_id,quantity,unit_price)
         VALUES ($1,$2,$3,$4)`,
        [orderResult.rows[0].id, item.productId, item.quantity, item.price]
      );
    }

    await client.query("COMMIT");
    await sendOrderCreated(orderResult.rows[0]);
    return orderResult.rows[0];
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}

module.exports = { createOrder };
