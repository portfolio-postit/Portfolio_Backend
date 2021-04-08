const router = require("express")();
const controller = require("../controller/skill/controller");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer");
router.post(
  "/",
  auth.authMiddleware,
  multer.upload.single("image"),
  controller.write
);
router.get("/", controller.showSkill);
router.delete("/", auth.authMiddleware, multer.deleteS3);
module.exports = router;
