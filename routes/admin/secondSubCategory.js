const express = require("express");
const secondSubCategoryRouter = express.Router();
const secondSubCategoryController = require("../../app/controllers/admin/SecondSubCategoryController");
const { authenticate } = require("../../app/middlewares/auth/authenticate");

secondSubCategoryRouter.get("/", authenticate, secondSubCategoryController.index);

secondSubCategoryRouter.get("/:id", authenticate, secondSubCategoryController.edit);

secondSubCategoryRouter.post("/", authenticate, secondSubCategoryController.store);

secondSubCategoryRouter.put("/:id", authenticate, secondSubCategoryController.update);

secondSubCategoryRouter.delete("/:id", authenticate, secondSubCategoryController.destroy);

module.exports = secondSubCategoryRouter;
