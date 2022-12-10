const express = require("express");
const buyerController = require("../../app/controllers/site/BuyerController");
const { authenticate } = require("../../app/middlewares/auth/authenticate");
const buyerRouter = express.Router();

buyerRouter.get("/show/:buyerId", buyerController.show);

buyerRouter.put("/update-account", authenticate, buyerController.updateAccount);

buyerRouter.get("/get-success-bids-by-seller-id", authenticate, buyerController.getSuccessBidsBySellerId);

module.exports = buyerRouter;
