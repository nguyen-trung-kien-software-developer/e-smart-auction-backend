const express = require("express");
const transportController = require("../../app/controllers/site/TransportController");
const transportRouter = express.Router();

transportRouter.get("/get-transport-by-district-id/:districtId", transportController.getTransportByDistrictId);

module.exports = transportRouter;
