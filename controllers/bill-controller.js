const { Bill } = require("../db/models");

class BillController {
  static async getAllBills(req, res, next) {
    const bills = await Bill.findAll();
    res.render("bills/index", {
      bills: bills,
      title: "Bills",
      active: "bills",
    });
  }

  static getNewBill(req, res, next) {
    res.render("bills/new");
  }
}

module.exports = BillController;
