const { Apartment } = require("../db/models");
const paginate = require("express-paginate");

class ApartmentController {
  static async getAllApartments(req, res, next) {
    // const result = await Apartment.findAndCountAll({
    //   limit: req.query.limit,
    //   offset: req.skip,
    // });

    const apartments = await Apartment.findAll();

    // const itemCount = result.count;
    // const pageCount = Math.ceil(result.count / req.query.limit);

    res.render("apartments/index", {
      apartments: apartments,
      title: "Apartments",
      active: "apartments",
      // itemCount,
      // pageCount,
      // currentPage: req.query.page,
      // pages: paginate.getArrayPages(req)(5, pageCount, req.query.page),
    });
  }

  static async editApartment(req, res, next) {
    const { id } = req.params;
    const apartment = await Apartment.findByPk(id);

    res.render("apartments/edit", { apartment });
  }

  static async updateApartment(req, res, next) {
    const { id } = req.params;
    const { name } = req.body;

    try {
      const apartment = await Apartment.update(
        {
          name: name,
        },
        { where: { id: id } }
      );
      req.flash("success", "Apartment updated");
      res.redirect("/apartments");
    } catch (err) {
      req.flash("error", "Could not update apartment");
      res.render("apartments/edit", { apartment });
    }
  }
}

module.exports = ApartmentController;
