"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SecondSubCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ FirstSubCategory, Product }) {
      // define association here
      this.belongsTo(FirstSubCategory, {
        foreignKey: "first_sub_category_id",
        as: "firstSubCategory",
      });

      this.hasMany(Product, {
        foreignKey: "category_id",
        as: "products",
      });
    }
  }
  SecondSubCategory.init(
    {
      name: {
        type: DataTypes.STRING,
      },
      slug: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "SecondSubCategory",
    }
  );
  return SecondSubCategory;
};
