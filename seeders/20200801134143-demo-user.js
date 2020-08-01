"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "admin",
          password: "dairyfarm",
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "super_admin",
          password: "dairyfarm",
          role: "superAdmin",
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
