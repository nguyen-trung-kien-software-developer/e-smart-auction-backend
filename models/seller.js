"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Seller extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Ward, Product, Bid, Order, WithDrawRequest }) {
      // define association here
      this.belongsTo(Ward, {
        foreignKey: "ward_id",
        as: "ward",
      });

      this.hasMany(Product, {
        foreignKey: "seller_id",
        as: "products",
      });

      this.hasMany(Bid, {
        foreignKey: "seller_id",
        as: "bids",
      });

      this.hasMany(Order, {
        foreignKey: "buyer_id",
        as: "orders",
      });

      this.hasMany(WithDrawRequest, {
        foreignKey: "seller_id",
        as: "withDrawRequests",
      });
    }
  }
  Seller.init(
    {
      username: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      company_name: {
        type: DataTypes.STRING,
      },
      fullname: {
        type: DataTypes.STRING,
      },
      mobile: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      housenumber_street: {
        type: DataTypes.STRING,
      },
      zip_code: {
        type: DataTypes.STRING,
      },
      wallet: {
        type: DataTypes.INTEGER,
      },
      minimum_withdraw: {
        type: DataTypes.STRING,
      },
      is_active: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Seller",
    }
  );
  return Seller;
};
