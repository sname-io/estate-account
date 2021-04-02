const { Payment } = require("../db/models");
const { Bill, Apartment, User } = require("../db/models");
var srs = require("secure-random-string");

class PaymentController {
  static async getNewPayment(req, res, next) {
    const bills = await Bill.findAll();
    const { apartment } = req.query;
    const apartments = await Apartment.findAll();
    const sr = srs({ length: 10, alphanumeric: true });
    res.render("payments/new", {
      bills: bills,
      apartments: apartments,
      active: "payments",
      apartmentId: apartment,
      receiptNumber: sr.toUpperCase(),
    });
  }

  static async getAllPayments(req, res, next) {
    const { bill, apartment } = req.query;
    let filters = {
      ...(bill && { billId: bill }),
      ...(apartment && { apartmentId: apartment }),
    };

    const payments = await Payment.findAll({
      where: filters,
      include: [Bill, Apartment, User],
    });

    let newUrl;

    if (apartment) {
      newUrl = `/payments/new?apartment=${apartment}`;
    } else {
      newUrl = `/payments/new`;
    }

    res.render("payments/index", {
      payments,
      title: "Payments",
      active: "payments",
      apartment: apartment,
      newUrl,
    });
  }

  static async CreatePayment(req, res, next) {
    const { apartmentId, amount, billId, receiptNumber } = req.body;

    try {
      await Payment.create({
        billId,
        apartmentId,
        amount,
        receiptNumber,
        adminId: req.user.id,
        paidAt: new Date(),
      });
      req.flash("success", "Payment recorded successfully");
      res.redirect("/payments");
    } catch (err) {
      const bills = await Bill.findAll();
      const apartments = await Apartment.findAll();
      let e = "Could not record payment";
      if (err.errors && err.errors[0] && err.errors[0].message) {
        e = err.errors[0].message;
      }

      req.flash("error", e);
      res.render("payments/new", {
        amount,
        bills,
        apartments,
        receiptNumber,
      });
    }
  }

  static async approvePayment(req, res) {
    const { id } = req.params;

    try {
      if (!req.user.isSuperAdmin()) {
        throw "Unauthorized";
      }

      const payment = await Payment.findByPk(id);

      payment.approvedAt = new Date();
      await payment.save();
      req.flash("success", "Payment Approved");
    } catch (err) {
      req.flash("error", "Could not approve payment");
    }
    res.redirect("/payments");
  }

  static async deletePayment(req, res) {
    const { id } = req.params;
    try {
      const payment = await Payment.findByPk(id);
      await payment.destroy();
      req.flash("success", "Payment Deleted");
    } catch (err) {
      req.flash("error", "Could not delete payment");
    }
    res.redirect("/payments");
  }

  static async getPaymentById(req, res) {
    const { id } = req.params;
    try {
      const payment = await Payment.findByPk(id);
      if (!payment) {
        throw "Payment not forund";
      }
      res.render(`payments/show`, {
        payment: payment,
        title: "Payments",
        active: "payments",
      });
    } catch (err) {
      req.flash("error", "Could not find payment");
      res.redirect("/payments");
    }
  }
}

module.exports = PaymentController;
