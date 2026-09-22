const nodemailer = require("nodemailer");
const env = require("../config/env");

async function sendOrderCreated(order) {
  if (!env.smtp.host || !env.adminEmail) {
    console.log("Email not configured; order notification skipped:", order.id);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: env.smtp.host,
    port: env.smtp.port,
    secure: env.smtp.port === 465,
    auth: env.smtp.user ? { user: env.smtp.user, pass: env.smtp.pass } : undefined
  });

  await transporter.sendMail({
    from: env.smtp.user,
    to: env.adminEmail,
    subject: `NIVORA SILVER — New Order ${order.orderNumber}`,
    text: `New order ${order.orderNumber} has been created. Total: ${order.total} ${env.currency}.`
  });
}

module.exports = { sendOrderCreated };
