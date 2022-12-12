const express = require("express");
const successBidRouter = express.Router();
const successBidController = require("../../app/controllers/admin/ParentCategoryController");
const { authenticate } = require("../../app/middlewares/auth/authenticate");

successBidRouter.get("/", authenticate, successBidController.index);

successBidRouter.get("/:id", authenticate, successBidController.edit);

successBidRouter.delete("/:id", authenticate, successBidController.destroy);

module.exports = successBidRouter;
