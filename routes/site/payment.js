const express = require("express");
const paymentController = require("../../app/controllers/site/PaymentController");
const paymentRouter = express.Router();
const { authenticate } = require("../../app/middlewares/auth/authenticate");

paymentRouter.post(
  "/processPayment",
  authenticate,
  paymentController.processPayment
);

module.exports = paymentRouter;
