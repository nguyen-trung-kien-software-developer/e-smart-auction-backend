"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    return Promise.all([
      queryInterface.addColumn(
        "products", // table name
        "size_id", // new field name
        {
          type: Sequelize.INTEGER,
          references: {
            model: "sizes",
            key: "id",
          },
          allowNull: true,
        }
      ),
      queryInterface.addColumn(
        "products", // table name
        "color_id", // new field name
        {
          type: Sequelize.INTEGER,
          references: {
            model: "colors",
            key: "id",
          },
          allowNull: true,
        }
      ),
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([
      queryInterface.removeColumn("products", "size_id"),
      queryInterface.removeColumn("products", "color_id"),
    ]);
  },
};
