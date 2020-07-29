const { Bill } = require("../db/models");

class BillController {
  static async getAll(req, res, next) {
    const bills = await Bill.findAll();
    res.render("bills/index", {
      bills: bills,
      title: "Bills",
      active: "bills",
    });
  }
}

module.exports = BillController;