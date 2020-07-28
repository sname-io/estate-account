"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Bills",
      [
        {
          name: "January Security",
          amount: 10000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Estate due",
          amount: 60000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Infrastructure Levy",
          amount: 10000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Bills", null, {});
  },
};
