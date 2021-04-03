const router = require('express')();
const { route } = require('.');
const controller = require("../controller/user/controller");
const auth = require("../middleware/auth");


router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/refresh", auth.refreshMiddleware, controller.refresh);
router.get("/check", auth.authMiddleware, controller.check);
router.get("/token", auth.authMiddleware, controller.token);
module.exports = router;
