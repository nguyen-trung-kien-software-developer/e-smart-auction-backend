const successBidService = require("../../services/SuccessBidService");

class SuccessBidController {
  index = async (req, res) => {
    try {
      const successBidList = await successBidService.getSuccessBidList();

      if (!successBidList) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(successBidList);
    } catch (error) {
      res.status(500).send(error);
    }
  };

//   store = async (req, res) => {
//     const successBid = req.body;

//     try {
//       const createdSuccessBid = await successBidService.storeNewSuccessBid(
//         successBid
//       );

//       res.status(201).send(createdSuccessBid);
//     } catch (error) {
//       res.status(500).send(error);
//     }
//   };

  edit = async (req, res) => {
    const { id } = req.params;

    try {
      const successBid = await successBidService.getSuccessBidById(id);

      if (!successBid) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(successBid);
    } catch (error) {
      res.status(500).send(error);
    }
  };

//   update = async (req, res) => {
//     const { id } = req.params;
//     const newSuccessBid = req.body;

//     try {
//       const updatedSuccessBid = await successBidService.updateSuccessBidById(
//         id,
//         newSuccessBid
//       );

//       if (!updatedSuccessBid) {
//         res.status(404).send("NOT FOUND !!!");
//         return;
//       }

//       res.status(200).send(updatedSuccessBid);
//     } catch (error) {
//       res.status(500).send(error);
//     }
//   };

  destroy = async (req, res) => {
    
    try {
      const { id } = req.params;
      const deletedSuccessBid = await successBidService.deleteSuccessBidById(id);

      if (!deletedSuccessBid) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send("Deleted SuccessBid Successfully !");
    } catch (error) {
      res.status(500).send(error);
    }
  };
}

module.exports = new SuccessBidController();
