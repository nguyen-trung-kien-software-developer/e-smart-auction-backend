const { SuccessBid } = require("../../models");
const buyerService = require("./BuyerService");
const sellerService = require("./SellerService");
const productService = require("./ProductService");

class SuccessBidService {
  saveNewSuccessBid = async (requestedSuccessBid, user) => {
    try {
      const { current_successBid, product_id } = requestedSuccessBid;
      const { email, username, user_type } = user;

      const product = await productService.getProductById(product_id);

      if (product != null) {
        if (current_successBid <= product.current_successBid_amount) {
          return 2;
        }
      } else {
        return false;
      }

      let newSuccessBid = null;

      if (user_type === "customer") {
        const buyer = await buyerService.getBuyerByEmail(email);

        newSuccessBid = await SuccessBid.create({
          created_date: Date.now(),
          current_successBid,
          product_id: product.id,
          seller_id: null,
          buyer_id: buyer.id,
        });

        if (!newSuccessBid) {
          return false;
        }

        product.current_successBid_amount = current_successBid;
        const updatedProduct = await product.save();
      }

      if (user_type === "vendor") {
        const seller = await sellerService.getSellerByEmail(email);

        newSuccessBid = await SuccessBid.create({
          created_date: Date.now(),
          current_successBid,
          product_id: product.id,
          seller_id: seller.id,
          buyer_id: null,
        });

        if (!newSuccessBid) {
          return false;
        }

        product.current_bid_amount = current_successBid;
        const updatedProduct = await product.save();
      }

      return newSuccessBid;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  getSuccessBidList = async () => {
    let successBidList = await SuccessBid.findAll();

    if (successBidList) {
      return successBidList;
    } else {
      return false;
    }
  };

  getSuccessBidById = async (id) => {
    const successBid = await SuccessBid.findOne({
      where: {
        id,
      },
    });

    if (successBid) {
      return successBid;
    } else {
      return false;
    }
  };

//   storeNewSuccessBid = async (successBid) => {
//     let { buyer_id, seller_id, product_id, current_successBid } = successBid;

//     const newSuccessBid = await SuccessBid.create({
//       buyer_id: buyer_id != null ? buyer_id : null,
//       seller_id: seller_id != null ? seller_id : null,
//       product_id,
//       current_successBid,
//       created_date: Date.now(),
//     });

//     return newSuccessBid;
//   };

//   updateSuccessBidById = async (id, newSuccessBid) => {
//     const oldSuccessBid = await this.getSuccessBidById(id);

//     if (oldSuccessBid) {
//       let { buyer_id, seller_id, product_id, current_successBid } = newSuccessBid;

//       oldSuccessBid.buyer_id = buyer_id;
//       oldSuccessBid.seller_id = seller_id;
//       oldSuccessBid.product_id = product_id;
//       oldSuccessBid.current_successBid = current_successBid;
//       oldSuccessBid.updatedAt = Date.now();

//       const updatedSuccessBid = await oldSuccessBid.save();

//       return updatedSuccessBid;
//     } else {
//       return false;
//     }
//   };

  deleteSuccessBidById = async (id) => {
    try {
      const oldSuccessBid = await this.getSuccessBidById(id);
      console.log(oldSuccessBid)

    if (oldSuccessBid) {
      const deletedSuccessBid = await SuccessBid.destroy({
        where: {
          id,
        },
      });

      return deletedSuccessBid;
    } else {
      return false;
    }
    } catch (error) {
      return false; 
    }
  };
}

module.exports = new SuccessBidService();
