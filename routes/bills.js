var express = require("express");
var router = express.Router();
var BillController = require("../controllers/bill-controller");

router.get("/", BillController.getAllBills);

router.get("/new", BillController.getNewBill);

module.exports = router;
