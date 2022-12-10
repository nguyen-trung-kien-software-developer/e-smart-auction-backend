const express = require("express");
const menuController = require("../../app/controllers/site/MenuController");
const menuRouter = express.Router();

menuRouter.get(
  "/get-all-parent-categories",
  menuController.fetchAllParentCategories
);

module.exports = menuRouter;
