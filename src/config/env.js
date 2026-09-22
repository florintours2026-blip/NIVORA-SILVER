require("dotenv").config();

module.exports = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 3000),
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET || "development-only-secret",
  corsOrigin: process.env.CORS_ORIGIN || "*",
  currency: process.env.STORE_CURRENCY || "SAR",
  adminEmail: process.env.ADMIN_EMAIL || "",
  smtp: {
    host: process.env.SMTP_HOST || "",
    port: Number(process.env.SMTP_PORT || 587),
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || ""
  },
  importTimeoutMs: Number(process.env.IMPORT_TIMEOUT_MS || 15000)
};
