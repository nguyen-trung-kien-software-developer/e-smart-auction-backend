const express = require("express");
const parentCategoryController = require("../../app/controllers/site/ParentCategoryController");
const parentCategoryRouter = express.Router();

parentCategoryRouter.get(
  "/get-all-parent-categories",
  parentCategoryController.fetchAllParentCategories
);

parentCategoryRouter.get("/:slug", parentCategoryController.show);

module.exports = parentCategoryRouter;
