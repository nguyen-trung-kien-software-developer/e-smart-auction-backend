"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Buyer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Ward, Bid, Order }) {
      // define association here
      this.belongsTo(Ward, {
        foreignKey: "ward_id",
        as: "ward",
      });

      this.hasMany(Bid, {
        foreignKey: "buyer_id",
        as: "bids",
      });

      this.hasMany(Order, {
        foreignKey: "buyer_id",
        as: "orders",
      });
    }
  }
  Buyer.init(
    {
      fullname: {
        type: DataTypes.STRING,
      },
      username: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      mobile: {
        type: DataTypes.STRING,
      },
      housenumber_street: {
        type: DataTypes.STRING,
      },
      zip_code: {
        type: DataTypes.STRING,
      },
      is_active: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Buyer",
    }
  );
  return Buyer;
};
