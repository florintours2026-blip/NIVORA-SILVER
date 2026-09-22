const pool = require("../config/db");
const { createOrder } = require("../services/orderService");

async function create(req, res) {
  const order = await createOrder(req.body);
  res.status(201).json(order);
}

async function list(req, res) {
  const { rows } = await pool.query(
    `SELECT o.*, u.name AS customer_name, u.email AS customer_email
     FROM orders o LEFT JOIN users u ON u.id=o.customer_id
     ORDER BY o.created_at DESC`
  );
  res.json(rows);
}

async function get(req, res) {
  const { rows } = await pool.query(`SELECT * FROM orders WHERE id=$1`, [req.params.id]);
  if (!rows[0]) return res.status(404).json({ error: "Order not found" });
  res.json(rows[0]);
}

async function updateStatus(req, res) {
  const { status, paymentStatus } = req.body;
  const { rows } = await pool.query(
    `UPDATE orders SET status=COALESCE($1,status),
     payment_status=COALESCE($2,payment_status),updated_at=NOW()
     WHERE id=$3 RETURNING *`,
    [status || null, paymentStatus || null, req.params.id]
  );
  if (!rows[0]) return res.status(404).json({ error: "Order not found" });
  res.json(rows[0]);
}

module.exports = { create, list, get, updateStatus };
