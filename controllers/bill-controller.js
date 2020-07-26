class BillController {
  static getAllBills(req, res, next) {
    res.render("bills/index");
  }

  static getNewBill(req, res, next) {
    res.render("bills/new");
  }
}

module.exports = BillController;
