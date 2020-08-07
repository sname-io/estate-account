"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const p1 = await bcrypt.hash("dairyfarm", 10);
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "admin",
          password: p1,
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "super_admin",
          password: p1,
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
