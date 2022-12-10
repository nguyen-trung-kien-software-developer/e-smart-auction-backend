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
      "firstsubcategories",
      [
        {
          name: "IT & COMPUTERS",
          parent_category_id: 6,
          slug: "it-and-computers",
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        {
          name: "MOBILES PHONES",
          parent_category_id: 6,
          slug: "mobiles-phones",
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        {
          name: "PC COMPONENTS",
          parent_category_id: 6,
          slug: "pc-components",
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        {
          name: "WIRELESS",
          parent_category_id: 6,
          slug: "wireless",
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
