"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      sku: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      featured_image: {
        type: Sequelize.STRING,
      },
      hover_featured_image: {
        type: Sequelize.STRING,
      },
      short_subscription: {
        type: Sequelize.TEXT,
      },
      description_detail: {
        type: Sequelize.TEXT,
      },
      additional_information: {
        type: Sequelize.TEXT,
      },
      condition: {
        type: Sequelize.STRING,
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "secondsubcategories",
          key: "id",
        },
      },
      seller_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "sellers",
          key: "id",
        },
      },
      price: {
        type: Sequelize.INTEGER,
      },
      start_bid_amount: {
        type: Sequelize.INTEGER,
      },
      current_bid_amount: {
        type: Sequelize.INTEGER,
      },
      step_bid_amount: {
        type: Sequelize.INTEGER,
      },
      auction_start: {
        type: Sequelize.DATE,
      },
      auction_end: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("Products");
  },
};
