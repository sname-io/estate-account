var express = require("express");
var router = express.Router();

const BillController = require("../controllers/bill-controller");

router.get("/", BillController.getAllBills);

router.get("/new", BillController.getNewBill);
router.post("/", BillController.createBill);
router.get("/:id/edit", BillController.editBill);
router.put("/:id", BillController.updateBill);

module.exports = router;
