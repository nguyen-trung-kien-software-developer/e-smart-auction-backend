const express = require("express");
const parentCategoryRouter = express.Router();
const parentCategoryController = require("../../app/controllers/admin/ParentCategoryController");
const { authenticate } = require("../../app/middlewares/auth/authenticate");

parentCategoryRouter.get("/", authenticate, parentCategoryController.index);

parentCategoryRouter.get("/:id", authenticate, parentCategoryController.edit);

parentCategoryRouter.post("/", authenticate, parentCategoryController.store);

parentCategoryRouter.put("/:id", authenticate, parentCategoryController.update);

parentCategoryRouter.delete("/:id", authenticate, parentCategoryController.destroy);

module.exports = parentCategoryRouter;
