const withdrawRequestService = require("../../services/WithdrawRequestService");

class WithdrawRequestController {
  index = async (req, res) => {
    try {
      const withdrawRequestList = await withdrawRequestService.getWithdrawRequestList();

      if (!withdrawRequestList) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(withdrawRequestList);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  update = async (req, res) => {
    const { id } = req.params;
    const newWithdrawRequest = req.body;

    try {
      const updatedWithdrawRequest = await withdrawRequestService.updateWithDrawRequestById(
        id,
        newWithdrawRequest
      );

      if (!updatedWithdrawRequest) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(updatedWithdrawRequest);
    } catch (error) {
      res.status(500).send(error);
    }
  };
}

module.exports = new WithdrawRequestController();
