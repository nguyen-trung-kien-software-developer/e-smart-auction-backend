const express = require("express");
const sizeController = require("../../app/controllers/site/SizeController");
const sizeRouter = express.Router();

sizeRouter.get("/get-all-sizes", sizeController.fetchAllSizes);

module.exports = sizeRouter;
