"use strict";
const { Model } = require("sequelize");
var currencyFormatter = require("currency-formatter");
const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    formattedAmount() {
      return currencyFormatter.format(this.amount, {
        code: "NGN",
        precision: 0,
      });
    }

    formattedCreatedAt() {
      return moment(this.createdAt).format("ddd DD MMM, YYYY");
      // moment().format("MMMM Do YYYY, h:mm:ss a");
    }

    static associate(models) {
      Bill.hasMany(models.Payment, {
        onDelete: "CASCADE",
      });
    }
  }
  Bill.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please provide a value for "name"',
          },
          notEmpty: {
            msg: 'Please provide a value for "name"',
          },
        },
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please provide a value for "amount"',
          },
          notEmpty: {
            msg: 'Please provide a value for "amount"',
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Bill",
    }
  );
  return Bill;
};
