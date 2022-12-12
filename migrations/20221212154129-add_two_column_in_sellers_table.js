'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    return Promise.all([
      queryInterface.addColumn(
        "sellers", // table name
        "wallet", // new field name
        {
          type: Sequelize.INTEGER,
        }
      ),
      queryInterface.addColumn(
        "sellers", // table name
        "minimum_withdraw", // new field name
        {
          type: Sequelize.INTEGER,
        }
      ),
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("sellers");
  }
};
