const router = require("express")();
const user = require("./users");
const about = require("./about");
const skill = require("./skill");
const project = require("./project");
const main = require("./main");
const question = require("./question");

router.use("/main", main);
router.use("/user", user);
router.use("/skill", skill);
router.use("/project", project);
router.use("/about", about);
router.use("/question", question);
module.exports = router;
