"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Payments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      apartmentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Apartments",
          key: "id",
          as: "apartmentId",
        },
      },
      adminId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
          as: "adminId",
        },
      },
      billId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Bills",
          key: "id",
          as: "billId",
        },
      },
      approved_at: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Payments");
  },
};
