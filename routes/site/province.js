const express = require("express");
const provinceRouter = express.Router();
const provinceController = require("../../app/controllers/site/ProvinceController");

provinceRouter.get("/get-all-provinces", provinceController.fetchAllProvinces);

provinceRouter.get("/show/:id", provinceController.show);

module.exports = provinceRouter;
