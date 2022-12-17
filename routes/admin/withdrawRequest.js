const express = require("express");
const withdrawRequestRouter = express.Router();
const withdrawRequestController = require("../../app/controllers/admin/WithdrawRequestController");
const { authenticate } = require("../../app/middlewares/auth/authenticate");

withdrawRequestRouter.get("/", authenticate, withdrawRequestController.index);

withdrawRequestRouter.put("/:id", authenticate, withdrawRequestController.update);

module.exports = withdrawRequestRouter;
