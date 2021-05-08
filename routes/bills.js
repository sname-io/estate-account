var express = require("express");
var router = express.Router();

const BillController = require("../controllers/bill-controller");
const authorization = require("../middlewares/authorization");

router.get("/", authorization("readAny", "bill"), BillController.getAllBills);

router.get(
  "/new",
  authorization("createAny", "bill"),
  BillController.getNewBill
);
router.post("/", authorization("createAny", "bill"), BillController.createBill);
router.get(
  "/:id/edit",
  authorization("updateAny", "bill"),
  BillController.editBill
);
router.put(
  "/:id",
  authorization("updateAny", "bill"),
  BillController.updateBill
);

module.exports = router;
