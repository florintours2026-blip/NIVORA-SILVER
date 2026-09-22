const pool = require("../config/db");

async function dashboard(req, res) {
  const [products, orders, customers, revenue] = await Promise.all([
    pool.query(`SELECT COUNT(*)::int AS count FROM products`),
    pool.query(`SELECT COUNT(*)::int AS count FROM orders`),
    pool.query(`SELECT COUNT(*)::int AS count FROM users WHERE role='customer'`),
    pool.query(`SELECT COALESCE(SUM(total),0)::numeric AS total FROM orders WHERE payment_status='paid'`)
  ]);

  res.json({
    products: products.rows[0].count,
    orders: orders.rows[0].count,
    customers: customers.rows[0].count,
    paidRevenue: revenue.rows[0].total
  });
}

async function accounting(req, res) {
  const { rows } = await pool.query(`
    SELECT
      COALESCE(SUM(o.total) FILTER (WHERE o.payment_status='paid'),0)::numeric AS revenue,
      COALESCE(SUM(oi.quantity * p.cost_price) FILTER (WHERE o.payment_status='paid'),0)::numeric AS cost,
      COALESCE(SUM(o.total) FILTER (WHERE o.payment_status='paid'),0)
      - COALESCE(SUM(oi.quantity * p.cost_price) FILTER (WHERE o.payment_status='paid'),0) AS profit
    FROM orders o
    LEFT JOIN order_items oi ON oi.order_id=o.id
    LEFT JOIN products p ON p.id=oi.product_id
  `);
  res.json(rows[0]);
}

module.exports = { dashboard, accounting };
