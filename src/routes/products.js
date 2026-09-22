const router = require("express").Router();
const controller = require("../controllers/productController");
const { requireAuth, requireAdmin } = require("../middleware/auth");

router.get("/", controller.list);
router.get("/:id", controller.get);
router.post("/", requireAuth, requireAdmin, controller.create);
router.patch("/:id", requireAuth, requireAdmin, controller.update);

module.exports = router;
