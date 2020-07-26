class BillController {
  static getAll(req, res, next) {
    res.render("bills/index");
  }
}

module.exports = BillController;
