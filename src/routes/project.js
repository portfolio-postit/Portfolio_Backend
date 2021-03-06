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

router.post("/tag/:id", auth.authMiddleware, controller.addTag);
router.delete("/tag/:id", auth.authMiddleware, controller.deleteTag);
router.patch("/tag/:id", auth.authMiddleware, controller.changeTag);

router.get("/detail/:id", controller.readDetailProject);
router.delete("/detail/:id", auth.authMiddleware, controller.deleteProject);
router.patch("/detail/:id", auth.authMiddleware, controller.changeProject);
router.get("/all/:email", controller.readAllRroject);
module.exports = router;
