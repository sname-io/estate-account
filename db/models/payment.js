"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Payment.belongsTo(models.Apartment, {
        onDelete: "CASCADE",
      });

      Payment.belongsTo(models.Bill, {
        onDelete: "CASCADE",
      });
    }
  }
  Payment.init(
    {
      amount: DataTypes.INTEGER,
      adminId: DataTypes.INTEGER,
      approved_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Payment",
    }
  );
  return Payment;
};
