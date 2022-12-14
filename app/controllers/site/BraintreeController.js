const buyerService = require("../../services/BuyerService");
const sellerService = require("../../services/SellerService");
const braintree = require("braintree");
const { response } = require("express");
require("dotenv").config();

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

class BraintreeController {
  // [GET]: /getToken/:userId
  generateToken = async (req, res) => {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  };

  // [POST]: /payment
  processPayment = async (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce;
    let amountFromTheClient = req.body.amount;
    // charge
    let newTransaction = gateway.transaction.sale(
      {
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true,
        },
      },
      (error, result) => {
        if (error) {
          res.status(500).json(error);
        } else {
          res.json(result);
        }
      }
    );
  };
}

module.exports = new BraintreeController();
