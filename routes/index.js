var express = require("express");
var router = express.Router();
const { User } = require("../db/models");

var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      const user = await User.findOne({ where: { username: username } });
      if (user && user.isValidPassword(password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect username / password" });
      }
    } catch (err) {
      console.log("Error:", err);

      return done(null, false, {
        message: "Something went wrong with your Signin",
      });
    }
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.redirect("/login");
});

router.get("/login", function (req, res, next) {
  res.render("login", { title: "Dairy Farm Account" });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    // failureFlash: true,
  })
);

module.exports = router;
