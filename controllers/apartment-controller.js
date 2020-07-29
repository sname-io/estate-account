const { Apartment } = require("../db/models");

class ApartmentController {
  static async getAllApartments(req, res, next) {
    const apartments = await Apartment.findAll();

    res.render("apartments/index", {
      apartments: apartments,
      title: "Apartments",
      active: "apartments",
    });
  }
}

module.exports = ApartmentController;
