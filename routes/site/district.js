const express = require("express");
const districtRouter = express.Router();
const districtController = require("../../app/controllers/site/DistrictController");

districtRouter.get("/get-all-districts", districtController.fetchAllDistricts);

districtRouter.get("/show/:id", districtController.show);

districtRouter.get("/get-district-by-province-id/:provinceId", districtController.getDistrictByProvinceId);

module.exports = districtRouter;
