const router = require("express").Router();
const controller = require("../controllers/adminController");
const { requireAuth, requireAdmin } = require("../middleware/auth");

router.use(requireAuth, requireAdmin);
router.get("/dashboard", controller.dashboard);
router.get("/accounting", controller.accounting);

module.exports = router;
