"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ SuccessBid, Order }) {
      // define association here
      this.belongsTo(SuccessBid, {
        foreignKey: "success_bid_id",
        as: "successBid",
      });

      this.belongsTo(Order, {
        foreignKey: "order_id",
        as: "order",
      });
    }
  }
  OrderItem.init(
    {},
    {
      sequelize,
      modelName: "OrderItem",
    }
  );
  return OrderItem;
};
