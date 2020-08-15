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
    if (!req.user.isSuperAdmin()) {
      req.flash("error", "Unauthorized");
      req.res.redirect("/bills");
    }

    res.render("bills/new", { name: "", amount: "" });
  }

  static async CreateBill(req, res, next) {
    const { name, amount } = req.body;

    try {
      const bill = await Bill.create({
        name: name,
        amount: amount,
      });

      res.redirect("/bills");
    } catch (err) {
      res.render("bills/new", { name: name, amount: amount });
    }
  }
}

module.exports = BillController;
