"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ward extends Model {
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
  Ward.init(
    {
      name: {
        type: DataTypes.STRING,
      },
      gso_id: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Ward",
    }
  );
  return Ward;
};
