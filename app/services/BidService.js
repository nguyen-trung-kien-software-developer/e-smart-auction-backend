const { Bid } = require("../../models");
const buyerService = require("./BuyerService");
const sellerService = require("./SellerService");
const productService = require("./ProductService");

class BidService {
  saveNewBid = async (requestedBid, user) => {
    try {
      const { current_bid, product_id } = requestedBid;
      const { email, username, user_type } = user;

      const product = await productService.getProductById(product_id);

      if (product != null) {
        if (current_bid <= product.current_bid_amount) {
          return 2;
        }
      } else {
        return false;
      }

      let newBid = null;

      if (user_type === "customer") {
        const buyer = await buyerService.getBuyerByEmail(email);

        newBid = await Bid.create({
          created_date: Date.now(),
          current_bid,
          product_id: product.id,
          seller_id: null,
          buyer_id: buyer.id,
        });

        if (!newBid) {
          return false;
        }

        product.current_bid_amount = current_bid;
        const updatedProduct = await product.save();
      }

      if (user_type === "vendor") {
        const seller = await sellerService.getSellerByEmail(email);

        newBid = await Bid.create({
          created_date: Date.now(),
          current_bid,
          product_id: product.id,
          seller_id: seller.id,
          buyer_id: null,
        });

        if (!newBid) {
          return false;
        }

        product.current_bid_amount = current_bid;
        const updatedProduct = await product.save();
      }

      return newBid;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  getBidList = async () => {
    let bidList = await Bid.findAll();

    if (bidList) {
      return bidList;
    } else {
      return false;
    }
  };

  getBidById = async (id) => {
    const bid = await Bid.findOne({
      where: {
        id,
      },
    });

    if (bid) {
      return bid;
    } else {
      return false;
    }
  };

  storeNewBid = async (bid) => {
    try {
      let { buyer_id, seller_id, product_id, current_bid } = bid;

    const product = await productService.getProductById(product_id);

      if (product != null) {
        if (current_bid <= product.current_bid_amount) {
          return 2;
        }
      } else {
        return false;
      }

    const newBid = await Bid.create({
      buyer_id: buyer_id != null ? buyer_id : null,
      seller_id: seller_id != null ? seller_id : null,
      product_id,
      current_bid,
      created_date: Date.now(),
    });

    product.current_bid_amount = current_bid;
      const updatedProduct = await product.save();

    return newBid;
    } catch (error) {
      return false;
    }
  };

  updateBidById = async (id, newBid) => {
    try {
      let oldBid = await this.getBidById(id);

    if (oldBid) {
      let { buyer_id, seller_id, product_id, current_bid } = newBid;

      const product = await productService.getProductById(product_id);

      if (product != null) {
        if (current_bid <= product.current_bid_amount) {
          return 2;
        }
      } else {
        return false;
      }

      oldBid.buyer_id = buyer_id;
      oldBid.seller_id = seller_id;
      oldBid.product_id = product_id;
      oldBid.current_bid = current_bid;
      oldBid.updatedAt = Date.now();

      product.current_bid_amount = current_bid;
      const updatedProduct = await product.save();

      const updatedBid = await oldBid.save();

      return updatedBid;
    } else {
      return false;
    }
    } catch (error) {
      return false;
    }
  };

  deleteBidById = async (id) => {
    const oldBid = await this.getBidById(id);

    if (oldBid) {
      const deletedBid = await Bid.destroy({
        where: {
          id,
        },
      });

      return deletedBid;
    } else {
      return false;
    }
  };
}

module.exports = new BidService();
