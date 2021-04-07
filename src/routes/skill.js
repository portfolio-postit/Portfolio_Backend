const router = require("express")();
const controller = require("../controller/skill/controller");
const auth = require("../middleware/auth");
const upload = require("../middleware/multer");
router.post(
  "/",
  auth.authMiddleware,
  upload.upload.single("image"),
  function (req, res) {
    console.log(req.filename);
    console.log(req.body.id);
  }
);
router.get("/test", function (req) {
  console.log(req.body.id);
});
module.exports = router;
