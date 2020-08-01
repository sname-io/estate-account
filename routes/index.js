var express = require("express");
var router = express.Router();
const HomeController = require("../controllers/home-controller");
const AuthController = require("../controllers/auth-controller");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.redirect("/login");
});

router.get("/login", AuthController.getLogin);

router.get("/dashboard", HomeController.dashboard);

router.post("/login", AuthController.login());

module.exports = router;
