const router = require("express")();
const auth = require("../middleware/auth");
const multer = require("multer");
const upload = multer();
const controller = require("../controller/project/controller");
router.post(
  "/",
  auth.authMiddleware,
  upload.single("image"),
  controller.createProject
);
router.get("/:id", controller.readDetailProject);
router.delete("/", auth.authMiddleware);
module.exports = router;
