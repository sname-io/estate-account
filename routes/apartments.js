var express = require("express");
var router = express.Router();
const ApartmentController = require("../controllers/apartment-controller");

/* GET bills listing. */
router.get("/", ApartmentController.getAllApartments);
router.get("/:id/edit", ApartmentController.editApartment);
router.put("/:id", ApartmentController.updateApartment);

module.exports = router;
