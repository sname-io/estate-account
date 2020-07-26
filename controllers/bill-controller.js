class BillController {
  static getAllBills(req, res, next) {
    res.render("bills/index");
  }

  static getNewBill(req, res, next) {
    res.render("bills/form");
  }
}

module.exports = BillController;
