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
      "orderstatuses",
      [
        {
          name: "waiting_progress",
          description: "Chờ Xử Lý",
        },
        {
          name: "paid",
          description: "Đã thanh toán",
        },
        {
          name: "cancel_order",
          description: "Hủy Đơn Hàng",
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
    await queryInterface.bulkDelete("orderstatuses", null, {});
  },
};
