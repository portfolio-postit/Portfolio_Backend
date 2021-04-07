const router = require("express")();
const user = require("./users");
const about = require("./about");
router.use("/user", user);
// router.use("/skill", skill);
// router.use("project", project);
router.use("/about", about);
module.exports = router;
