var express = require("express");
var router = express.Router();
const UserController = require("../controllers/user-controller");

/* GET users new page. */
router.get("/new", UserController.getNewUser);

router.post("/", UserController.createUser);

module.exports = router;
