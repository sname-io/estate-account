"use strict";
var currencyFormatter = require("currency-formatter");
const moment = require("moment");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    formattedAmount() {
      return currencyFormatter.format(this.amount, {
        code: "NGN",
        precision: 0,
      });
    }

    formattedCreatedAt() {
      return moment(this.createdAt).format("DD-MM-YYYY");
      // moment().format("MMMM Do YYYY, h:mm:ss a");
    }
    static associate(models) {
      Payment.belongsTo(models.Apartment, {
        onDelete: "CASCADE",
        foreignKey: "apartmentId",
      });

      Payment.belongsTo(models.Bill, {
        onDelete: "CASCADE",
        foreignKey: "billId",
      });
    }
  }
  Payment.init(
    {
      amount: DataTypes.INTEGER,
      adminId: DataTypes.INTEGER,
      apartmentId: DataTypes.INTEGER,
      billId: DataTypes.INTEGER,
      approved_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Payment",
    }
  );
  return Payment;
};
