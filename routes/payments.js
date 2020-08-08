var express = require("express");
var router = express.Router();

const PaymentController = require("../controllers/payment-controller");

router.get("/new", PaymentController.getNewPayment);
router.post("/", PaymentController.CreatePayment);
router.get("/", PaymentController.getAllPayments);
router.get("/:id/approve", PaymentController.approvePayment);
router.get("/:id", PaymentController.getPaymentById);

module.exports = router;
