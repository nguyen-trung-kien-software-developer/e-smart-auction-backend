const { OrderItem, SuccessBid, Product, Seller } = require("../../models");
const buyerService = require("./BuyerService");
const sellerService = require("./SellerService");

class OrderItemService {
  saveNewOrderItem = async (requestedOrderItems, order, productType, user) => {
    try {
      const { email, user_type } = user;

      if(productType === 'normal_product') {
        requestedOrderItems.forEach(async (orderItem) => {
          let createdSuccessBid = null

          if (user_type === "customer") {
            const buyer = await buyerService.getBuyerByEmail(email);

            createdSuccessBid = await SuccessBid.create({
            product_id: orderItem.product_id,
            buyer_id: buyer.id,
            order_id: null
            });
          }

          if (user_type === "vendor") {
            const seller = await sellerService.getSellerByEmail(email);

            createdSuccessBid = await SuccessBid.create({
              product_id: orderItem.product_id,
              buyer_id: null,
              order_id: seller.id
            });
          }

          const result = await OrderItem.create({
            success_bid_id: createdSuccessBid.id,
            order_id: order.id,
          });
  
          const successBid = await SuccessBid.findOne({
            where: {
              id: createdSuccessBid.id,
            },
          });
  
          successBid.paid = 1;
          const updatedSuccessBid = await successBid.save();

           const product = await Product.findOne({
            where: {
              id: orderItem.product_id,
            }
          });

          const seller = await Seller.findOne({
            where: {
              id: product.seller_id,
            }
          });

          seller.wallet = seller.wallet + product.price;
          const updatedSeller = await seller.save();

        });
      } 

      if(productType === 'success_bid_product') {
        requestedOrderItems.forEach(async (orderItem) => {
          const result = await OrderItem.create({
            success_bid_id: orderItem.success_bid_id,
            order_id: order.id,
          });
  
          const successBid = await SuccessBid.findOne({
            where: {
              id: orderItem.success_bid_id,
            },
          });
  
          successBid.paid = 1;
          const updatedSuccessBid = await successBid.save();

          const product = await Product.findOne({
            where: {
              id: successBid.product_id,
            }
          });

          const seller = await Seller.findOne({
            where: {
              id: product.seller_id,
            }
          });

          seller.wallet = seller.wallet + successBid.win_bid_amount;
          const updatedSeller = await seller.save();
        });
      }

      return true;
    } catch (err) {
      return false;
    }
  };
}

module.exports = new OrderItemService();
