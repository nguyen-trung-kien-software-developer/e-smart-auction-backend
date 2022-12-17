const express = require("express");
const successBidRouter = express.Router();
const successBidController = require("../../app/controllers/admin/SuccessBidController");
const { authenticate } = require("../../app/middlewares/auth/authenticate");

successBidRouter.get("/", authenticate, successBidController.index);

successBidRouter.get("/:id", authenticate, successBidController.edit);

module.exports = successBidRouter;
