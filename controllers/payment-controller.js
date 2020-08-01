const { Payment } = require("../db/models");

class PaymentController {
  static async getAllPayments(req, res, next) {
    const payments = await Payment.findAll();
    res.render("payments/index", {
      payments: payments,
      title: "Payments",
      active: "Payments",
    });
  }
}

module.exports = PaymentController;
