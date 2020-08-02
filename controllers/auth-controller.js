const passport = require("../config/passport/passport");

class AuthController {
  static logout(req, res) {
    req.logout();
    req.flash("success", "Logged out successfully!");
    res.redirect("/login");
  }

  static login() {
    return passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/login",
      failureFlash: true,
    });
  }

  static getLogin(req, res, next) {
    res.render("login", {
      title: "Dairy Farm Account",
    });
  }
}

module.exports = AuthController;
