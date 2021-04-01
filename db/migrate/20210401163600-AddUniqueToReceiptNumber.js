"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(
      "Payments", // table name
      "receiptNumber", // new field name
      {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      }
    );
  },
};
