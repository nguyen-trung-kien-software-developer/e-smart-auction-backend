const bidService = require("../../services/BidService");

class BidController {
  index = async (req, res) => {
    try {
      const bidList = await bidService.getBidList();

      if (!bidList) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(bidList);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  store = async (req, res) => {
    const bid = req.body;

    try {
      const createdBid = await bidService.storeNewBid(
        bid
      );

      if (createdBid == 2) {
        res
          .status(500)
          .send(
            `Tiền đặt đấu giá hiện tại phải lớn hơn tiền đặt đấu giá cao nhất trước đó của sản phẩm !!`
          );
        return;
      }

      if (!createdBid) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(201).send(createdBid);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  edit = async (req, res) => {
    const { id } = req.params;

    try {
      const bid = await bidService.getBidById(id);

      if (!bid) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(bid);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  update = async (req, res) => {
    const { id } = req.params;
    const newBid = req.body;

    try {
      const updatedBid = await bidService.updateBidById(
        id,
        newBid
      );

      if (updatedBid == 2) {
        res
          .status(500)
          .send(
            `Tiền đặt đấu giá hiện tại phải lớn hơn tiền đặt đấu giá cao nhất trước đó của sản phẩm !!`
          );
        return;
      }

      if (!updatedBid) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(updatedBid);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  destroy = async (req, res) => {
    const { id } = req.params;

    try {
      const deletedBid = await bidService.deleteBidById(id);

      if (!deletedBid) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send("Deleted Bid Successfully !");
    } catch (error) {
      res.status(500).send(error);
    }
  };
}

module.exports = new BidController();
