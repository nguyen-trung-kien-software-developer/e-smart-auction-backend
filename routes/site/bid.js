const express = require("express");
const bidController = require("../../app/controllers/site/BidController");
const bidRouter = express.Router();
const { authenticate } = require("../../app/middlewares/auth/authenticate");

bidRouter.post("/create-new-bid", authenticate, bidController.createNewBid);

module.exports = bidRouter;
