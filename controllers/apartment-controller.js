const { Apartment } = require("../db/models");

class ApartmentController {
  static async getAllApartments(req, res, next) {
    const { page, per_page } = req.query;
    const limit = per_page || 10;
    const offset = (page || 0) * limit;
    const total = await Apartment.count;

    const apartments = await Apartment.findAll({ limit, offset });

    res.render("apartments/index", {
      apartments: apartments,
      title: "Apartments",
      active: "apartments",
      total,
    });
  }
}

module.exports = ApartmentController;
