"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Apartment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    address() {
      return `Block ${this.block_number} flat ${this.flat}`;
    }
    shortAddress() {
      return `Blk ${this.block_number} Flt ${this.flat}`;
    }

    static associate(models) {
      Apartment.hasMany(models.Payment, {
        onDelete: "CASCADE",
        foreignKey: "apartmentId",
      });
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
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Apartment",
    }
  );
  return Apartment;
};
