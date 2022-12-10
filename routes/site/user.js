const express = require("express");
const userRouter = express.Router();
const userController = require("../../app/controllers/site/UserController");

userRouter.post("/login", userController.login);

userRouter.post("/register", userController.register);

module.exports = userRouter;
