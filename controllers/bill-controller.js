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

  static async CreateBill(req, res, next) {
    console.log(req);
    const { name, amount } = req.body;

    const bill = await Bill.create({
      name: name,
      amount: amount,
    });

    res.redirect("/bills");
  }
}

module.exports = BillController;
