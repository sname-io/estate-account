class HomeController {
  static dashboard(req, res, next) {
    res.render("dashboard", { title: "Welcome" });
  }
}

module.exports = HomeController;
