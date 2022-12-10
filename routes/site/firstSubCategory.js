const express = require("express");
const firstSubCategoryController = require("../../app/controllers/site/FirstSubCategoryController");
const firstSubCategoryRouter = express.Router();

firstSubCategoryRouter.get("/:slug", firstSubCategoryController.show);

module.exports = firstSubCategoryRouter;
