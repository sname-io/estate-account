"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "Oluwaseun",
          password: "osiname",
          role: "super_admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "Dammy",
          password: "osiname",
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
