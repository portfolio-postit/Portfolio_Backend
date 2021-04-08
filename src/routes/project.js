const router = require("express")();
const controller = require("../controller/skill/controller");
const auth = require("../middleware/auth");
router.post("/", auth.authMiddleware);
router.get("/", controller.showSkill);
router.delete("/", auth.authMiddleware);
module.exports = router;
