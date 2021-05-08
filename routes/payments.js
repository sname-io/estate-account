var express = require("express");
var router = express.Router();

const PaymentController = require("../controllers/payment-controller");
const authorization = require("../middlewares/authorization");

router.get(
  "/new",
  authorization("createAny", "payment"),
  PaymentController.getNewPayment
);
router.post(
  "/",
  authorization("createAny", "payment"),
  PaymentController.CreatePayment
);
router.get(
  "/",
  authorization("readAny", "payment"),
  PaymentController.getAllPayments
);
router.get(
  "/:id/approve",
  authorization("updateAny", "payment"),
  PaymentController.approvePayment
);
router.get(
  "/:id/delete",
  authorization("deleteAny", "payment"),
  PaymentController.deletePayment
);
router.get(
  "/:id",
  authorization("readAny", "payment"),
  PaymentController.getPaymentById
);

module.exports = router;
