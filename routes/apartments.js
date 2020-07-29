var express = require("express");
var router = express.Router();
const ApartmentController = require("../controllers/apartment-controller");

/* GET bills listing. */
router.get("/", ApartmentController.getAllApartments);

module.exports = router;
