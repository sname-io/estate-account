var express = require("express");
var router = express.Router();

var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

class User {
  constructor() {
    this.username = null;
    this.id = 2;
  }
  static findOne({ username }, cb) {
    if (username === "sname") {
      const user = new User();
      user.username = "sname";
      cb(null, user);
    } else {
      cb(null, null);
    }
  }

  static findById(id, cb) {
    if (id === 2) {
      return;
    }
  }

  validPassword(password) {
    return password === "osiname";
  }
}

passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    });
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
