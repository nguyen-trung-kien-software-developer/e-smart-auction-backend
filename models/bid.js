"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bid extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Buyer, Product, Seller }) {
      // define association here
      this.belongsTo(Seller, {
        foreignKey: "seller_id",
        as: "seller",
      });

      this.belongsTo(Buyer, {
        foreignKey: "buyer_id",
        as: "buyer",
      });

      this.belongsTo(Product, {
        foreignKey: "product_id",
        as: "product",
      });
    }
  }
  Bid.init(
    {
      // buyer_id: {
      //   type: DataTypes.INTEGER,
      // },
      // product_id: {
      //   type: DataTypes.INTEGER,
      // },
      created_date: {
        type: DataTypes.DATE,
      },
      current_bid: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Bid",
    }
  );
  return Bid;
};
