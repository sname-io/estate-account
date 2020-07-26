var express = require("express");
var router = express.Router();
var { User } = require("../db/models");
const HomeController = require("../controllers/home-controller");
const passport = require("../config/passport/passport");

/* GET home page. */
router.get("/", async function (req, res, next) {
  res.redirect("/login");
});

router.get("/login", function (req, res, next) {
  res.render("login", { title: "Dairy Farm Account" });
});

router.get("/dashboard", HomeController.dashboard);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    // failureFlash: true,
  })
);

module.exports = router;
