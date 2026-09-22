const router = require("express").Router();
const controller = require("../controllers/orderController");
const { requireAuth, requireAdmin } = require("../middleware/auth");

router.post("/", requireAuth, controller.create);
router.get("/", requireAuth, requireAdmin, controller.list);
router.get("/:id", requireAuth, controller.get);
router.patch("/:id/status", requireAuth, requireAdmin, controller.updateStatus);

module.exports = router;
