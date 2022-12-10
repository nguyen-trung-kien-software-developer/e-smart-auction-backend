"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FirstSubCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ ParentCategory, SecondSubCategory }) {
      // define association here
      this.belongsTo(ParentCategory, {
        foreignKey: "parent_category_id",
        as: "parentCategory",
      });
      this.hasMany(SecondSubCategory, {
        foreignKey: "first_sub_category_id",
        as: "secondSubCategories",
      });
    }
  }
  FirstSubCategory.init(
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
      modelName: "FirstSubCategory",
    }
  );
  return FirstSubCategory;
};
