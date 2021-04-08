const router = require("express")();
var multer = require("multer");
var upload = multer();
const controller = require("../controller/skill/controller");
const auth = require("../middleware/auth");
const type = require("../middleware/type");
// const s3 = require("../controller/s3/controller");
// const multer = require("../middleware/multer");
const { route } = require("./users");
router.post(
  "/",
  auth.authMiddleware,
  upload.single("image"),
  type.typeMiddleware,
  controller.write
);
router.get("/", controller.showAllSkill);
router.get("/type", controller.showTypeSkill);
// router.delete("/", auth.authMiddleware, s3.deleteS3);
module.exports = router;
