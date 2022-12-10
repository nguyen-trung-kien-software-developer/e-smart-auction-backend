"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("SuccessBids", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "products",
          key: "id",
        },
        allowNull: true,
      },
      buyer_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "buyers",
          key: "id",
        },
        allowNull: true,
      },
      seller_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "sellers",
          key: "id",
        },
        allowNull: true,
      },
      win_bid_amount: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("SuccessBids");
  },
};
