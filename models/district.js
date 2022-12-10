"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class District extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Province, Ward }) {
      // define association here
      this.belongsTo(Province, {
        foreignKey: "province_id",
        as: "province",
      });
      this.hasMany(Ward, {
        foreignKey: "district_id",
        as: "wards",
      });
    }
  }
  District.init(
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
      modelName: "District",
    }
  );
  return District;
};
