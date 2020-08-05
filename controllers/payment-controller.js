const { Payment } = require("../db/models");
const BillController = require("./bill-controller");
const { Bill, Apartment } = require("../db/models");

class PaymentController {
  static async getNewPayment(req, res, next) {
    const bills = await Bill.findAll();
    const apartments = await Apartment.findAll();
    res.render("payments/new", { bills: bills, apartments: apartments });
  }

  static async CreatePayment(req, res, next) {
    const { ApartmentId, amount, BillId } = req.body;

    try {
      await Payment.create({
        BillId,
        ApartmentId,
        amount,
        adminId: req.user.id,
        paidAt: new Date(),
      });
      req.flash("success", "Payment recorded successfully");
      res.redirect("/dashboard");
    } catch (err) {
      console.log("insertion error is here: ", err);
      const bills = await Bill.findAll();
      const apartments = await Apartment.findAll();
      req.flash("errorr", "Could not record payment");
      res.render("payments/new", {
        amount,
        bills,
        apartments,
      });
    }
  }
}

module.exports = PaymentController;
