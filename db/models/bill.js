"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
