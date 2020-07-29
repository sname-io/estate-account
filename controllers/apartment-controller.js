const { Apartment } = require("../db/models");
const paginate = require("express-paginate");

class ApartmentController {
  static async getAllApartments(req, res, next) {
    const result = await Apartment.findAndCountAll({
      limit: req.query.limit,
      offset: req.skip,
    });

    const itemCount = result.count;
    const pageCount = Math.ceil(result.count / req.query.limit);

    res.render("apartments/index", {
      apartments: result.rows,
      title: "Apartments",
      active: "apartments",
      itemCount,
      pageCount,
      currentPage: req.query.page,
      pages: paginate.getArrayPages(req)(5, pageCount, req.query.page),
    });
  }
}

module.exports = ApartmentController;
