const router = require("express").Router();
const { requireAuth, requireAdmin } = require("../middleware/auth");
const { importProduct } = require("../services/importService");

const buckets = new Map();
const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = Number(process.env.MAX_IMPORT_REQUESTS_PER_MINUTE || 10);

function importRateLimit(req, res, next) {
  const now = Date.now();
  const key = req.ip || req.socket.remoteAddress || "unknown";
  const current = buckets.get(key) || { count: 0, resetAt: now + WINDOW_MS };

  if (now > current.resetAt) {
    current.count = 0;
    current.resetAt = now + WINDOW_MS;
  }

  current.count += 1;
  buckets.set(key, current);

  if (current.count > MAX_REQUESTS) {
    return res.status(429).json({ error: "تم تجاوز عدد محاولات الاستيراد المسموح بها مؤقتاً" });
  }
  next();
}

router.post("/product", requireAuth, requireAdmin, importRateLimit, async (req, res, next) => {
  try {
    const url = String(req.body?.url || "").trim();
    if (!url) return res.status(400).json({ error: "رابط المنتج مطلوب" });
    const product = await importProduct(url);
    res.json({ ok: true, product });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
