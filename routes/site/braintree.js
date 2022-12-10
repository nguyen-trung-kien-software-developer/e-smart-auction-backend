const express = require("express");
const braintreeController = require("../../app/controllers/site/BraintreeController");
const braintreeRouter = express.Router();
const { authenticate } = require("../../app/middlewares/auth/authenticate");

braintreeRouter.get(
  "/getToken",
  authenticate,
  braintreeController.generateToken
);

braintreeRouter.post(
  "/payment",
  authenticate,
  braintreeController.processPayment
);

module.exports = braintreeRouter;
