var express = require("express");
var router = express.Router();
const ApartmentController = require("../controllers/apartment-controller");
const authorization = require("../middlewares/authorization");

/* GET bills listing. */
router.get(
  "/",
  authorization("readAny", "apartment"),
  ApartmentController.getAllApartments
);
router.get(
  "/:id/edit",
  authorization("updateAny", "apartment"),
  ApartmentController.editApartment
);
router.put(
  "/:id",
  authorization("updateAny", "apartment"),
  ApartmentController.updateApartment
);

module.exports = router;
