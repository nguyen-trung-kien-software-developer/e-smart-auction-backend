"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ParentCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ FirstSubCategory }) {
      // define association here
      this.hasMany(FirstSubCategory, {
        foreignKey: "parent_category_id",
        as: "firstSubCategories",
      });
    }
  }
  ParentCategory.init(
    {
      name: {
        type: DataTypes.STRING,
      },
      icon_image: {
        type: DataTypes.STRING,
      },
      slug: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "ParentCategory",
    }
  );
  return ParentCategory;
};
