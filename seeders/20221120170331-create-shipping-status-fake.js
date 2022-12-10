"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "shippingstatuses",
      [
        {
          name: "waiting_pickup",
          description: "Chờ lấy hàng",
        },
        {
          name: "shipping",
          description: "Đang giao hàng",
        },
        {
          name: "shipped",
          description: "Đã giao hàng",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("shippingstatuses", null, {});
  },
};
