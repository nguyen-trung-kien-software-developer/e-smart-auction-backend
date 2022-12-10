"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SuccessBid extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Product, Buyer, Seller }) {
      // define association here
      this.belongsTo(Product, {
        foreignKey: "product_id",
        as: "product",
      });

      this.belongsTo(Buyer, {
        foreignKey: "buyer_id",
        as: "buyer",
      });

      this.belongsTo(Seller, {
        foreignKey: "seller_id",
        as: "seller",
      });
    }
  }
  SuccessBid.init(
    {
      win_bid_amount: {
        type: DataTypes.INTEGER,
      },
      paid: {
        type: DataTypes.TINYINT,
      },
    },
    {
      sequelize,
      modelName: "SuccessBid",
    }
  );
  return SuccessBid;
};
