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
      "bids",
      [
        {
          buyer_id: 1,
          seller_id: null,
          product_id: 16,
          created_date: Date.now(),
          current_bid: 100000,
        },
        {
          buyer_id: 2,
          seller_id: null,
          product_id: 16,
          created_date: Date.now(),
          current_bid: 150000,
        },
        {
          buyer_id: 3,
          seller_id: null,
          product_id: 16,
          created_date: Date.now(),
          current_bid: 200000,
        },
        {
          buyer_id: 4,
          seller_id: null,
          product_id: 16,
          created_date: Date.now(),
          current_bid: 300000,
        },
        {
          buyer_id: 5,
          seller_id: null,
          product_id: 16,
          created_date: Date.now(),
          current_bid: 400000,
        },
        {
          buyer_id: null,
          seller_id: 4,
          product_id: 17,
          created_date: Date.now(),
          current_bid: 500000,
        },
        {
          buyer_id: null,
          seller_id: 3,
          product_id: 17,
          created_date: Date.now(),
          current_bid: 100000,
        },
        {
          buyer_id: null,
          seller_id: 2,
          product_id: 17,
          created_date: Date.now(),
          current_bid: 100000,
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
    await queryInterface.bulkDelete("bids", null, {});
  },
};
