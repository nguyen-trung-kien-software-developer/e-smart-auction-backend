const express = require("express");
const userRouter = express.Router();
const userController = require("../../app/controllers/admin/UserController");
const { authenticate } = require("../../app/middlewares/auth/authenticate");

userRouter.get("/", authenticate, userController.index);

userRouter.get("/:id", authenticate, userController.edit);

userRouter.post("/", authenticate, userController.store);

userRouter.put("/:id", authenticate, userController.update);

userRouter.delete("/:id", authenticate, userController.destroy);

module.exports = userRouter;
