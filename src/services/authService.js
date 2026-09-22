const bcrypt = require("bcryptjs");
const pool = require("../config/db");
const { signUser } = require("../utils/jwt");

async function register({ name, email, password }) {
  const hash = await bcrypt.hash(password, 12);
  const { rows } = await pool.query(
    `INSERT INTO users (name,email,password_hash,role)
     VALUES ($1,$2,$3,'customer')
     RETURNING id,name,email,role`,
    [name, email.toLowerCase(), hash]
  );
  return { user: rows[0], token: signUser(rows[0]) };
}

async function login({ email, password }) {
  const { rows } = await pool.query(
    `SELECT id,name,email,password_hash,role FROM users WHERE email=$1`,
    [email.toLowerCase()]
  );
  const user = rows[0];
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    const err = new Error("Invalid email or password");
    err.statusCode = 401;
    throw err;
  }
  delete user.password_hash;
  return { user, token: signUser(user) };
}

module.exports = { register, login };
