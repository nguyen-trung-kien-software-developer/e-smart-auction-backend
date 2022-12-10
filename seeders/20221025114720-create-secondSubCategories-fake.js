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
      "secondsubcategories",
      [
        {
          name: "Máy tính xách tay Máy tính xách tay",
          first_sub_category_id: 11,
          slug: "may-tinh-xach-tay-may-tinh-xach-tay",
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        {
          name: "Windows",
          first_sub_category_id: 10,
          slug: "windows",
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        {
          name: "Apple Shop Điệnthoại di động",
          first_sub_category_id: 12,
          slug: "apple-shop-djienthoai-di-djong",
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        {
          name: "Android Smartphones",
          first_sub_category_id: 12,
          slug: "android-smartphones",
          createdAt: Date.now(),
          updatedAt: Date.now(),
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
  },
};
