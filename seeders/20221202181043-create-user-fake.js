'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
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
      "users",
      [
        {
          name: "Nguyễn Trung Kiên",
          email: "admin@gmail.com",
          username: "admin",
          password: "123456",
          mobile: "0334662260",
          avatar: "admin.png",
        },
        {
          name: "Đặng Văn Tới",
          email: "ToiDang@gmail.com",
          username: "toidang",
          password: "123456",
          mobile: "0983274882",
          avatar: "employee1.png",
        },
        {
          name: "Phạm Văn Hùng",
          email: "HungPham@gmail.com",
          username: "hungpham",
          password: "123456",
          mobile: "0984376834",
          avatar: "employee2.png",
        },
      ],
      {}
    );

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete("users", null, {});
  }
};
