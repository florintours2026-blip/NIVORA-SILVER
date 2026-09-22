const router = require("express").Router();
const { requireAuth, requireAdmin } = require("../middleware/auth");
const { importProduct } = require("../services/importService");

router.post("/product", requireAuth, requireAdmin, async (req, res, next) => {
  try {
    res.json(await importProduct(req.body.url));
  } catch (e) { next(e); }
});

module.exports = router;
