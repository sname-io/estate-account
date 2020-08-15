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

  static async createBill(req, res, next) {
    const { name, amount } = req.body;

    try {
      const bill = await Bill.create({
        name: name,
        amount: amount,
      });
      req.flash("success", "Bill created");
      res.redirect("/bills");
    } catch (err) {
      req.flash("error", "Could not create bill");
      res.render("bills/new", { name: name, amount: amount });
    }
  }

  static async editBill(req, res, next) {
    if (!req.user.isSuperAdmin()) {
      req.flash("error", "Unauthorized");
      req.res.redirect("/bills");
    }

    const { id } = req.params;
    const bill = await Bill.findByPk(id);

    res.render("bills/edit", { bill });
  }

  static async updateBill(req, res, next) {
    const { id } = req.params;
    const { name, amount } = req.body;

    try {
      const bill = await Bill.update(
        {
          name: name,
          amount: amount,
        },
        { where: { id: id } }
      );
      req.flash("success", "Bill updated");
      res.redirect("/bills");
    } catch (err) {
      req.flash("error", "Could not update bill");
      res.render("bills/edit", { bill });
    }
  }
}

module.exports = BillController;
