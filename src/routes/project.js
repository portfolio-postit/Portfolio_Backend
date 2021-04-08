const router = require("express")();
const auth = require("../middleware/auth");
const type = require("../middleware/type");
var multer = require("multer");
var upload = multer();
router.about(
  "/",
  auth.authMiddleware,
  upload.single("image")
  //   controller.createAbout
);
// router.get("/:email");
router.delete("/", auth.authMiddleware);
module.exports = router;
