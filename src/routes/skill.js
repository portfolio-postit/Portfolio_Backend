const router = require("express")();
var multer = require("multer");
var upload = multer();
const controller = require("../controller/skill/controller");
const auth = require("../middleware/auth");
const type = require("../middleware/type");
const s3 = require("../controller/s3/controller");
router.post(
  "/",
  auth.authMiddleware,
  upload.single("image"),
  type.typeMiddleware,
  controller.write
);
router.patch("/:id", type.typeMiddleware, controller.changeSkill);
router.get("/:email", controller.showAllSkill);
router.get("/:email/:type", controller.showTypeSkill);
router.delete("/:id", auth.authMiddleware, s3.deleteS3);
module.exports = router;
