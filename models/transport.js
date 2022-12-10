"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ District }) {
      // define association here
      this.belongsTo(District, {
        foreignKey: "district_id",
        as: "district",
      });
    }
  }
  Transport.init(
    {
      price: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Transport",
    }
  );
  return Transport;
};
