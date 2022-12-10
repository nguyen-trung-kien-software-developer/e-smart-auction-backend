const express = require("express");
const uploadRouter = express.Router();
const uploadController = require("../../app/controllers/admin/UploadController");
const { uploadImage } = require("../../app/middlewares/uploads/upload-image");
const { authenticate } = require("../../app/middlewares/auth/authenticate");

uploadRouter.post(
  "/image/products",
  authenticate,
  uploadImage("products"),
  uploadController.uploadImage
);

// uploadRouter.post(
//   "/image/rooms",
//   authenticate,
//   uploadImage("rooms"),
//   uploadController.uploadImage
// );

// uploadRouter.post(
//   "/image/services",
//   authenticate,
//   uploadImage("services"),
//   uploadController.uploadImage
// );

// uploadRouter.post(
//   "/image/histories",
//   authenticate,
//   uploadImage("histories"),
//   uploadController.uploadImage
// );

// uploadRouter.post(
//   "/image/collaborators",
//   authenticate,
//   uploadImage("collaborators"),
//   uploadController.uploadImage
// );

// uploadRouter.post(
//   "/image/galleries",
//   authenticate,
//   uploadImage("galleries"),
//   uploadController.uploadImage
// );

uploadRouter.post(
  "/image/users",
  authenticate,
  uploadImage("users"),
  uploadController.uploadImage
);

module.exports = uploadRouter;
