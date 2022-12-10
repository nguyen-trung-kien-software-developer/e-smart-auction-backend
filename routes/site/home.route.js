const express = require("express");
const homeController = require("../../app/controllers/site/HomeController");
const homeRouter = express.Router();

homeRouter.get(
  "/get-one-product-by-firstsubcategory-id",
  homeController.getOneProductByFirstSubCategoryId
);

homeRouter.get("/get-lastest-auction", homeController.getLastestAuction);

module.exports = homeRouter;
