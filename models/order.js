"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Ward, OrderStatus, ShippingStatus, Buyer, Seller }) {
      // define association here
      this.belongsTo(Ward, {
        foreignKey: "shipping_ward_id",
        as: "ward",
      });

      this.belongsTo(OrderStatus, {
        foreignKey: "order_status_id",
        as: "orderStatus",
      });

      this.belongsTo(ShippingStatus, {
        foreignKey: "shipping_status_id",
        as: "shippingStatus",
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
  Order.init(
    {
      created_date: {
        type: DataTypes.DATE,
      },
      shipping_housenumber_street: {
        type: DataTypes.STRING,
      },
      shipping_fullname: {
        type: DataTypes.STRING,
      },
      shipping_mobile: {
        type: DataTypes.STRING,
      },
      shipping_email: {
        type: DataTypes.STRING,
      },
      delivery_date: {
        type: DataTypes.DATE,
      },
      shipping_fee: {
        type: DataTypes.INTEGER,
      },
      account_type: {
        type: DataTypes.STRING,
      },
      account_no: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
