const express = require("express");
const productController = require("../../app/controllers/site/ProductController");
const productRouter = express.Router();

productRouter.get(
  "/get-products-by-first-sub-category-slug/:firstSubCategorySlug",
  productController.getProductsByFirstSubCategorySlug
);

productRouter.get(
  "/get-products-by-second-sub-category-slug/:secondSubCategorySlug",
  productController.getProductsBySecondSubCategorySlug
);

productRouter.get("/show/:productSlug", productController.show);

productRouter.get(
  "/get-related-products-by-product-slug/:productSlug",
  productController.fetchRelatedProducts
);

module.exports = productRouter;
