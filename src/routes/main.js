const router = require("express")();
const controller = require("../controller/main/controller");

router.get("/:email", controller.readMainProject);
module.exports = router;
