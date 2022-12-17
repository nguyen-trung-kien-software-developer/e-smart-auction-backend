'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WithDrawRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Seller}) {
      // define association here
      this.belongsTo(Seller, {
        foreignKey: "seller_id",
        as: "seller",
      });
    }
  }
  WithDrawRequest.init({
    amount: {
      type: DataTypes.INTEGER
    },
    is_withdraw: {
      type: DataTypes.TINYINT,
    }
  }, {
    sequelize,
    modelName: 'WithDrawRequest',
  });
  return WithDrawRequest;
};