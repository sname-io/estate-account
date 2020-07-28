var express = require("express");
var router = express.Router();
const BillController = require("../controllers/bill-controller");

/* GET bills listing. */
router.get("/", BillController.getAll);

module.exports = router;
