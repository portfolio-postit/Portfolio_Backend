const router = require("express")();
const controller = require("../controller/skill/controller");
const auth = require("../middleware/auth");
const upload = require("../middleware/multer");
router.post(
  "/",
  auth.authMiddleware,
  upload.upload.single("image"),
  controller.write
);
router.get("/", controller.showSkill);
module.exports = router;
