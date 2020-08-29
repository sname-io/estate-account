const { User } = require("../db/models");

class UserController {
  static async getNewUser(req, res, next) {
    if (!req.user.isSuperAdmin()) {
      req.flash("error", "Unauthorized");
      req.res.redirect("/dashboard");
    }

    res.render("users/new");
  }

  static async createUser(req, res, next) {
    if (!req.user.isSuperAdmin()) {
      req.flash("error", "Unauthorized");
      req.res.redirect("/dashboard");
    }

    const { username, password, role } = req.body;

    try {
      await User.create({
        username,
        password,
        role,
      });

      req.flash("success", "User created successfully");
      res.redirect("/dashboard");
    } catch (err) {
      req.flash("error", "Could not create user");
      res.render("users/new");
    }
  }
}

module.exports = UserController;
