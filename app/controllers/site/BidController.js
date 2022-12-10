const bidService = require("../../services/BidService");

class BidController {
  // [POST]: /create-new-bid
  createNewBid = async (req, res) => {
    try {
      const requestedBid = req.body;
      const user = req.user;

      const newBid = await bidService.saveNewBid(requestedBid, user);

      if (newBid == 2) {
        res
          .status(500)
          .send(
            `Tiền đặt đấu giá hiện tại phải lớn hơn tiền đặt đấu giá cao nhất trước đó của sản phẩm !!`
          );
        return;
      }

      if (!newBid) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(newBid);
    } catch (err) {
      res.status(500).send(err);
    }
  };
}

module.exports = new BidController();
