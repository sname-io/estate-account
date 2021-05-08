var express = require("express");
var router = express.Router();
const UserController = require("../controllers/user-controller");
const authorization = require("../middlewares/authorization");

/* GET users new page. */
router.get(
  "/new",
  authorization("createAny", "user"),
  UserController.getNewUser
);

router.post("/", authorization("createAny", "user"), UserController.createUser);

module.exports = router;
