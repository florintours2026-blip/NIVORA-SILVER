const router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/products", require("./products"));
router.use("/orders", require("./orders"));
router.use("/admin", require("./admin"));
router.use("/imports", require("./imports"));

router.get("/health", (req, res) => res.json({ ok: true, service: "nivora-silver-api" }));

module.exports = router;
