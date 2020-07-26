class HomeController {
  static dashboard(req, res, next) {
    res.render("dashboard", { title: "Welcome", active: "dashboard" });
  }
}

module.exports = HomeController;
