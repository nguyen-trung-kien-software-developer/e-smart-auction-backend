const buyerService = require("../../services/BuyerService");

class BuyerController {
  // [GET]: /show/:buyerId
  show = async (req, res) => {
    try {
      const { buyerId } = req.params;

      const buyer = await buyerService.getBuyerById(
        buyerId,
      );

      if (!buyer) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(buyer);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  // [PUT]: /update-account
  updateAccount = async (req, res) => {
    try {
      const user = req.user;

      const buyer = await buyerService.updateBuyerById(
        req.body,
        user
      );

      if (!buyer) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(buyer);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  // [GET]: /get-success-bids-by-seller-id
  getSuccessBidsBySellerId = async (req, res) => {
    try {
      const user = req.user;

      const successBids = await buyerService.getSuccessBidsBySellerId(
        user,
      );

      if (!successBids) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(successBids);
    } catch (error) {
      res.status(500).send(error);
    }
  };
}

module.exports = new BuyerController();
