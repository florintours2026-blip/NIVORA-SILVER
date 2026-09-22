const pool = require("../config/db");

async function list(req, res) {
  const { rows } = await pool.query(
    `SELECT p.*, c.name AS category_name
     FROM products p LEFT JOIN categories c ON c.id=p.category_id
     WHERE p.active=true ORDER BY p.created_at DESC`
  );
  res.json(rows);
}

async function get(req, res) {
  const { rows } = await pool.query(`SELECT * FROM products WHERE id=$1`, [req.params.id]);
  if (!rows[0]) return res.status(404).json({ error: "Product not found" });
  res.json(rows[0]);
}

async function create(req, res) {
  const p = req.body;
  const { rows } = await pool.query(
    `INSERT INTO products
     (name,slug,description,category_id,price,compare_at_price,cost_price,stock,sku,images,active)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
     RETURNING *`,
    [p.name,p.slug,p.description||"",p.categoryId||null,p.price,p.compareAtPrice||null,
     p.costPrice||null,p.stock||0,p.sku||null,JSON.stringify(p.images||[]),p.active!==false]
  );
  res.status(201).json(rows[0]);
}

async function update(req, res) {
  const p = req.body;
  const { rows } = await pool.query(
    `UPDATE products SET name=COALESCE($1,name),description=COALESCE($2,description),
     price=COALESCE($3,price),stock=COALESCE($4,stock),active=COALESCE($5,active),
     images=COALESCE($6,images),updated_at=NOW()
     WHERE id=$7 RETURNING *`,
    [p.name,p.description,p.price,p.stock,p.active,p.images ? JSON.stringify(p.images) : null,req.params.id]
  );
  if (!rows[0]) return res.status(404).json({ error: "Product not found" });
  res.json(rows[0]);
}

module.exports = { list, get, create, update };
