const router = require("express")();
const auth = require("../middleware/auth");
const controller = require("../controller/qeustion/controller");
router.post("/", controller.sendQuestion);
router.get("/", auth.authMiddleware, controller.readQuestion);

module.exports = router;
