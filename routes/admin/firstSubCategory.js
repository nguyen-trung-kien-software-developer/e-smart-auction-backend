const express = require("express");
const firstSubCategoryRouter = express.Router();
const firstSubCategoryController = require("../../app/controllers/admin/FirstSubCategoryController");
const { authenticate } = require("../../app/middlewares/auth/authenticate");

firstSubCategoryRouter.get("/", authenticate, firstSubCategoryController.index);

firstSubCategoryRouter.get("/:id", authenticate, firstSubCategoryController.edit);

firstSubCategoryRouter.post("/", authenticate, firstSubCategoryController.store);

firstSubCategoryRouter.put("/:id", authenticate, firstSubCategoryController.update);

firstSubCategoryRouter.delete("/:id", authenticate, firstSubCategoryController.destroy);

module.exports = firstSubCategoryRouter;
