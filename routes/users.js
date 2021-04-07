const router = require("express")();
const controller = require("../controller/user/controller");
const auth = require("../middleware/auth");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.patch("/refresh", auth.refreshMiddleware, controller.refresh);
router.get("/check", auth.authMiddleware, controller.check);
module.exports = router;
