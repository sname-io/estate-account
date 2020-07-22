"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Apartment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Apartment.init(
    {
      block_number: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: 'Please provide a value for "block number"',
          },
          notEmpty: {
            msg: 'Please provide a value for "block number"',
          },
        },
      },
      flat: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please provide a value for "flat"',
          },
          notEmpty: {
            msg: 'Please provide a value for "flat"',
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Apartment",
    }
  );
  return Apartment;
};
