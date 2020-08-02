const { Payment } = require("../db/models");
const BillController = require("./bill-controller");
const { Bill, Apartment } = require("../db/models");

class PaymentController {
  static async getNewPayment(req, res, next) {
    const bills = await Bill.findAll();
    const apartments = await Apartment.findAll();
    res.render("payments/new", { bills: bills, apartments: apartments });
  }
}

module.exports = PaymentController;
