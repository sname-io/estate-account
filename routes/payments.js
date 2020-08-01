var express = require("express");
var router = express.Router();
const PaymentController = require("../controllers/payment-controller");

router.get("/", PaymentController.getAllPayments);

module.exports = router;
