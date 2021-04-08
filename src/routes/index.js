const router = require("express")();
const user = require("./users");
const about = require("./about");
const skill = require("./skill");
// const project = require("./project");

router.use("/user", user);
router.use("/skill", skill);
// router.use("/project", project);
router.use("/about", about);
module.exports = router;
