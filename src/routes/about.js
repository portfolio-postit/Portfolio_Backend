const router = require("express")();
const controller = require("../controller/about/controller");
const auth = require("../middleware/auth");
const type = require("../middleware/type");
var multer = require("multer");
var upload = multer();
router.post(
  "/",
  auth.authMiddleware,
  upload.single("image"),
  controller.createAbout
);
router.get("/:email", controller.readAbout);
router.delete("/", auth.authMiddleware, controller.deleteAbout);
module.exports = router;
