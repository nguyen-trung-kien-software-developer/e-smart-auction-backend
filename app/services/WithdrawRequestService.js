const { WithDrawRequest } = require("../../models");
const sellerService = require("./SellerService");

class WithDrawRequestService {
  getWithdrawRequestList = async () => {
    let withDrawRequestList = await WithDrawRequest.findAll();

    if (withDrawRequestList) {
      return withDrawRequestList;
    } else {
      return false;
    }
  };

  getWithDrawRequestById = async (id) => {
    const withDrawRequest = await WithDrawRequest.findOne({
      where: {
        id,
      },
    });

    if (withDrawRequest) {
      return withDrawRequest;
    } else {
      return false;
    }
  };

  updateWithDrawRequestById = async (id, newWithDrawRequest) => {
    try {
      let oldWithDrawRequest = await this.getWithDrawRequestById(id);

    if (oldWithDrawRequest) {
      let { amount, seller_id } = newWithDrawRequest;

      const seller = await sellerService.getSellerById(seller_id);

      oldWithDrawRequest.is_withdraw = 1;
      oldWithDrawRequest.updatedAt = Date.now();

      seller.wallet = seller.wallet - amount;
      const updatedSeller = await seller.save();

      const updatedWithDrawRequest = await oldWithDrawRequest.save();

      return updatedWithDrawRequest;
    } else {
      return false;
    }
    } catch (error) {
      return false;
    }
  };
}

module.exports = new WithDrawRequestService();
