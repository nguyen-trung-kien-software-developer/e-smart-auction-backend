const express = require("express");
const wardRouter = express.Router();
const wardController = require("../../app/controllers/site/WardController");

wardRouter.get("/get-all-wards", wardController.fetchAllWards);

wardRouter.get("/show/:id", wardController.show);

wardRouter.get("/get-ward-by-district-id/:districtId", wardController.getWardByDistrictId);

module.exports = wardRouter;
