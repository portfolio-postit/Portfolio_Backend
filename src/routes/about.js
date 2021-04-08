const router = require("express")();
const controller = require("../controller/about/controller");
const auth = require("../middleware/auth");
router.post("/", auth.authMiddleware, controller.createAbout);
router.get("/:email", controller.readAbout);
router.delete("/", auth.authMiddleware);
module.exports = router;
