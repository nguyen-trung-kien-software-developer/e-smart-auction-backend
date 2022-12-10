const express = require("express");
const colorController = require("../../app/controllers/site/ColorController");
const colorRouter = express.Router();

colorRouter.get("/get-all-colors", colorController.fetchAllColors);

module.exports = colorRouter;
