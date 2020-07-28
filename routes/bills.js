var express = require("express");
var router = express.Router();
const BillController = require("../controllers/bill-controller");

router.get("/", BillController.getAllBills);

router.get("/new", BillController.getNewBill);

module.exports = router;
