const router = require("express")();
const controller = require("../controller/skill/controller");
const auth = require("../middleware/auth");
const upload = require("../middleware/multer");
router.post(
  "/upload",
  auth.authMiddleware,
  upload.upload.single("image"),
  controller.write
);
router.get("/test", function (req) {
  console.log(req.body.id);
});
module.exports = router;
