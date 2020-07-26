var express = require("express");
var router = express.Router();
var BillController = require("../controllers/bill-controller");

router.get("/", BillController.getAll);

module.exports = router;
