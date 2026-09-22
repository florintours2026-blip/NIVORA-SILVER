const jwt = require("jsonwebtoken");
const env = require("../config/env");

function signUser(user) {
  return jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    env.jwtSecret,
    { expiresIn: "7d" }
  );
}

module.exports = { signUser };
