"use strict";
const bcrypt = require("bcryptjs");

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

    const salt = bcrypt.genSaltSync(10);

    await queryInterface.bulkInsert(
      "sellers",
      [
        {
          username: "kennykiennguyen123",
          password: bcrypt.hashSync("123456aA@", salt),
          company_name: "SPKT",
          fullname: "Nguyễn Trung Kiên",
          mobile: "0334662260",
          email: "kiennt0x@gmail.com",
          housenumber_street: "1 Võ Văn Ngân",
          zip_code: "10000",
          is_active: 1,
        },
        {
          username: "maitiendung011",
          password: bcrypt.hashSync("123456aA@", salt),
          company_name: "SPKT",
          fullname: "Mai Tiến Dũng",
          mobile: "0334662260",
          email: "kiennt0x@gmail.com",
          housenumber_street: "1 Võ Văn Ngân",
          zip_code: "10000",
          is_active: 1,
        },
        {
          username: "nguyenvantoan99",
          password: bcrypt.hashSync("123456aA@", salt),
          company_name: "SPKT",
          fullname: "Nguyễn Văn Toản",
          mobile: "0334662260",
          email: "kiennt0x@gmail.com",
          housenumber_street: "1 Võ Văn Ngân",
          zip_code: "10000",
          is_active: 1,
        },
        {
          username: "trannamcam87",
          password: bcrypt.hashSync("123456aA@", salt),
          company_name: "SPKT",
          fullname: "Trần Nam Cam",
          mobile: "0334662260",
          email: "kiennt0x@gmail.com",
          housenumber_street: "1 Võ Văn Ngân",
          zip_code: "10000",
          is_active: 1,
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

    await queryInterface.bulkDelete("sellers", null, {});
  },
};
