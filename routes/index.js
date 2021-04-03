const router = require("express")();
const user = require("./users");

router.use("/user", user);

module.exports = router;
