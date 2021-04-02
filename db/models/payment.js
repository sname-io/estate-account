"use strict";
var currencyFormatter = require("currency-formatter");
const moment = require("moment");
var srs = require("secure-random-string");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    formattedAmount() {
      return currencyFormatter.format(this.amount, {
        code: "NGN",
        precision: 0,
      });
    }

    processedBy() {
      return this.User.username;
    }

    approved() {
      return this.approvedAt !== null;
    }

    formattedCreatedAt() {
      return moment(this.createdAt).format("DD-MM-YYYY");
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
      Payment.belongsTo(models.User, {
        onDelete: "CASCADE",
        foreignKey: "adminId",
      });
    }
  }

  Payment.init(
    {
      amount: DataTypes.INTEGER,
      adminId: DataTypes.INTEGER,
      apartmentId: DataTypes.INTEGER,
      billId: DataTypes.INTEGER,
      receiptNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      approvedAt: DataTypes.DATE,
    },
    {
      hooks: {
        // beforeCreate: async (payment, options) => {
        //   const sr = srs({ length: 10, alphanumeric: true });
        //   payment.receiptNumber = sr.toUpperCase();
        // },
      },
      sequelize,
      modelName: "Payment",
    }
  );
  return Payment;
};
