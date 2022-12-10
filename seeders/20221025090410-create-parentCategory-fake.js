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
      "parentCategories",
      [
        {
          name: "Máy tính xách tay, Máy tính bảng & Điện thoại",
          icon_image: '<i class="fa fa-mobile""></i>',
          slug: "may-tinh-xach-tay-may-tinh-bang-and-djien-thoai",
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        {
          name: "PC, thiết bị ngoại vi & phần mềm",
          icon_image: '<i class="fa fa-desktop"></i>',
          slug: "pc-thiet-bi-ngoai-vi-and-phan-memi",
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        {
          name: "TV, Audio-Video & Photo",
          icon_image: '<i class="fa fa-tv"></i>',
          slug: "tv-audio-video-and-photo",
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        {
          name: "Thiết bị gia dụng & AC",
          icon_image: '<i class="fa fa-adjust"></i>',
          slug: "thiet-bi-gia-dung-and-ac",
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        {
          name: "Trò chơi & Bảng điều khiển",
          icon_image: '<i class="fa fa-gamepad"></i>',
          slug: "tro-choi-and-bang-djieu-khien",
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        {
          name: "Chăm sóc cá nhân & Mỹ phẩm",
          icon_image: '<i class="fa fa-tint"></i>',
          slug: "cham-soc-ca-nhan-and-my-pham",
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        {
          name: "Sách, Văn phòng & Quà tặng",
          icon_image: '<i class="fa fa-book"></i>',
          slug: "cham-soc-ca-nhan-and-my-pham",
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        {
          name: "Theo dõi đơn hàng",
          icon_image: '<i class="fa fa-truck"></i>',
          slug: "theo-doi-djon-hang",
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
    await queryInterface.bulkDelete("parentCategories", null, {});
  },
};
