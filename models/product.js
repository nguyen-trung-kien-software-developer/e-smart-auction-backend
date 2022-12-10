"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ SecondSubCategory, Seller, Size, Color, Bid }) {
      // define association here
      this.belongsTo(SecondSubCategory, {
        foreignKey: "category_id",
        as: "secondSubCategory",
      });

      this.belongsTo(Seller, {
        foreignKey: "seller_id",
        as: "seller",
      });

      this.belongsTo(Size, {
        foreignKey: "size_id",
        as: "size",
      });

      this.belongsTo(Color, {
        foreignKey: "color_id",
        as: "color",
      });

      this.hasMany(Bid, {
        foreignKey: "product_id",
        as: "bids",
      });
    }
  }
  Product.init(
    {
      sku: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      featured_image: {
        type: DataTypes.STRING,
      },
      hover_featured_image: {
        type: DataTypes.STRING,
      },
      short_subscription: {
        type: DataTypes.TEXT,
      },
      description_detail: {
        type: DataTypes.TEXT,
      },
      additional_information: {
        type: DataTypes.TEXT,
      },
      condition: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.INTEGER,
      },
      start_bid_amount: {
        type: DataTypes.INTEGER,
      },
      current_bid_amount: {
        type: DataTypes.INTEGER,
      },
      step_bid_amount: {
        type: DataTypes.INTEGER,
      },
      auction_start: {
        type: DataTypes.DATE,
      },
      auction_end: {
        type: DataTypes.DATE,
      },
      created_date: {
        type: DataTypes.DATE,
      },
      slug: {
        type: DataTypes.STRING,
      },
      // color_id: {
      //   type: DataTypes.INTEGER,
      // },
      // size_id: {
      //   type: DataTypes.INTEGER,
      // },
      // product_id: {
      //   type: DataTypes.INTEGER,
      // },
      // seller_id: {
      //   type: DataTypes.INTEGER,
      // },
      // category_id: {
      //   type: DataTypes.INTEGER,
      // },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
