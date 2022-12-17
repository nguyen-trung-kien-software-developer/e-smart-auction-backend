const express = require("express");
const sellerController = require("../../app/controllers/site/SellerController");
const { authenticate } = require("../../app/middlewares/auth/authenticate");
const sellerRouter = express.Router();

sellerRouter.get("/get-all-sellers", sellerController.fetchAllSellers);

sellerRouter.get("/show/:sellerId", sellerController.show);

sellerRouter.put("/update-account", authenticate, sellerController.updateAccount);

sellerRouter.get("/get-orders-by-seller-id", authenticate, sellerController.getOrderBySellerId);

sellerRouter.get("/get-products-by-seller-id", authenticate, sellerController.getProductBySellerId);

sellerRouter.get("/get-products-in-store", authenticate, sellerController.getProductInStore);

sellerRouter.get("/get-product-detail-by-product-id/:productId", authenticate, sellerController.getProductDetailByProductId);

sellerRouter.put("/update-store-information", authenticate, sellerController.updateStoreInformation);

sellerRouter.post("/create-new-product", authenticate, sellerController.createNewProduct);

sellerRouter.put("/update-product/:productId", authenticate, sellerController.updateProduct);

sellerRouter.delete("/delete-product/:productId", authenticate, sellerController.detroyProduct);

sellerRouter.get("/get-wallet", authenticate, sellerController.getWallet);

sellerRouter.get("/seller-dashboard", authenticate, sellerController.dashboard);

sellerRouter.get("/get-data-chart", authenticate, sellerController.showDataChart);

sellerRouter.post("/send-withdraw-request", authenticate, sellerController.sendWithDrawRequest);

module.exports = sellerRouter;
