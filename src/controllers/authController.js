const auth = require("../services/authService");

async function register(req, res) {
  res.status(201).json(await auth.register(req.body));
}

async function login(req, res) {
  res.json(await auth.login(req.body));
}

module.exports = { register, login };
