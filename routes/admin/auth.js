const express = require("express");
const authRouter = express.Router();
const userController = require("../../app/controllers/admin/UserController");

authRouter.post("/login", userController.login);

authRouter.post("/register", userController.register);

module.exports = authRouter;
