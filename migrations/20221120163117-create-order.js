"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      created_date: {
        type: Sequelize.DATE,
      },
      order_status_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "orderstatuses",
          key: "id",
        },
      },
      shipping_status_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "shippingstatuses",
          key: "id",
        },
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
      shipping_ward_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "wards",
          key: "id",
        },
      },
      shipping_housenumber_street: {
        type: Sequelize.STRING,
      },
      shipping_fullname: {
        type: Sequelize.STRING,
      },
      shipping_mobile: {
        type: Sequelize.STRING,
      },
      delivery_date: {
        type: Sequelize.DATE,
      },
      shipping_fee: {
        type: Sequelize.INTEGER,
      },
      account_type: {
        type: Sequelize.STRING,
      },
      account_no: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Orders");
  },
};
