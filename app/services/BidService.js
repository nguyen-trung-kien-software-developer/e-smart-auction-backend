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
}

module.exports = new BidService();
