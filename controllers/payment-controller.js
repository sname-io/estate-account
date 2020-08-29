const { Payment } = require("../db/models");
const { Bill, Apartment } = require("../db/models");

class PaymentController {
  static async getNewPayment(req, res, next) {
    const bills = await Bill.findAll();
    const { apartment } = req.query;
    const apartments = await Apartment.findAll();
    res.render("payments/new", {
      bills: bills,
      apartments: apartments,
      active: "payments",
      apartmentId: apartment,
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
      include: [Bill, Apartment],
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
    const { apartmentId, amount, billId } = req.body;

    try {
      await Payment.create({
        billId,
        apartmentId,
        amount,
        adminId: req.user.id,
        paidAt: new Date(),
      });
      req.flash("success", "Payment recorded successfully");
      res.redirect("/payments");
    } catch (err) {
      console.log("insertion error is here: ", err);
      const bills = await Bill.findAll();
      const apartments = await Apartment.findAll();
      req.flash("error", "Could not record payment");
      res.render("payments/new", {
        amount,
        bills,
        apartments,
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
    console.log("this is id", id);
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
