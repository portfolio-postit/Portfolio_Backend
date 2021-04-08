const router = require("express")();
const controller = require("../controller/about/controller");
const auth = require("../middleware/auth");
router.post("/", auth.authMiddleware, controller.createAbout);
// router.get("/", controller.showSkill);
router.delete("/", auth.authMiddleware);
module.exports = router;
