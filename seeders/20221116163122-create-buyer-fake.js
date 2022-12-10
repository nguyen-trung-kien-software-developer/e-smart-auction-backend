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
      "buyers",
      [
        {
          fullname: "Nguyễn Văn Tùng",
          username: "tungnguyen123",
          email: "tungnguyen@gmail.com",
          password: bcrypt.hashSync("123456aA@", salt),
          mobile: "0334662260",
          housenumber_street:
            "142/27 đường Huỳnh Thị Hai, phường Tân Chánh Hiệp, Quận 12, TPHCM",
          zip_code: "100000",
          is_active: 1,
        },
        {
          fullname: "Trần Văn Cao",
          username: "caotran493",
          email: "caotran493@gmail.com",
          password: bcrypt.hashSync("123456aA@", salt),
          mobile: "0334662260",
          housenumber_street:
            "142/27 đường Huỳnh Thị Hai, phường Tân Chánh Hiệp, Quận 12, TPHCM",
          zip_code: "100000",
          is_active: 1,
        },
        {
          fullname: "Quất Văn Tài",
          username: "taiquat994",
          email: "taiquat994@gmail.com",
          password: bcrypt.hashSync("123456aA@", salt),
          mobile: "0334662260",
          housenumber_street:
            "142/27 đường Huỳnh Thị Hai, phường Tân Chánh Hiệp, Quận 12, TPHCM",
          zip_code: "100000",
          is_active: 1,
        },
        {
          fullname: "Lâm Thị Cờ",
          username: "colamthi9482",
          email: "colamthi9482@gmail.com",
          password: bcrypt.hashSync("123456aA@", salt),
          mobile: "0334662260",
          housenumber_street:
            "142/27 đường Huỳnh Thị Hai, phường Tân Chánh Hiệp, Quận 12, TPHCM",
          zip_code: "100000",
          is_active: 1,
        },
        {
          fullname: "Sao Cũng Được",
          username: "saocungduoc333",
          email: "saocungduoc333@gmail.com",
          password: bcrypt.hashSync("123456aA@", salt),
          mobile: "0334662260",
          housenumber_street:
            "142/27 đường Huỳnh Thị Hai, phường Tân Chánh Hiệp, Quận 12, TPHCM",
          zip_code: "100000",
          is_active: 1,
        },
        {
          fullname: "Lê Thị Lan",
          username: "lelan322",
          email: "lelan322@gmail.com",
          password: bcrypt.hashSync("123456aA@", salt),
          mobile: "0334662260",
          housenumber_street:
            "142/27 đường Huỳnh Thị Hai, phường Tân Chánh Hiệp, Quận 12, TPHCM",
          zip_code: "100000",
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
    await queryInterface.bulkDelete("buyers", null, {});
  },
};
