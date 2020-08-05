"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("Payments", "apartmentId", "ApartmentId");
    await queryInterface.renameColumn("Payments", "billId", "BillId");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("Payments", "ApartmentId", "apartmentId");
    await queryInterface.renameColumn("Payments", "BillId", "billId");
  },
};
