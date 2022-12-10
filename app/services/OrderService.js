const { Order, Transport } = require("../../models");
const buyerService = require("./BuyerService");
const sellerService = require("./SellerService");

class OrderService {
  saveNewOrder = async (requestedOrder, user) => {
    try {
      const {
        fullname,
        shipping_email,
        phone_number,
        housenumber_street,
        district,
        ward,
        account_type,
        account_no,
      } = requestedOrder;
      const { email, user_type } = user;

      const transport = await Transport.findOne({
        where: {
          district_id: district,
        },
      });

      const date = new Date();
      date.setDate(date.getDate() + 3);

      let order = null;
      if (user_type === "customer") {
        const buyer = await buyerService.getBuyerByEmail(email);

        order = await Order.create({
          created_date: Date.now(),
          delivery_date: date,
          shipping_housenumber_street: housenumber_street,
          shipping_fullname: fullname,
          shipping_mobile: phone_number,
          shipping_email,
          order_status_id: 1,
          shipping_status_id: 1,
          buyer_id: buyer.id,
          seller_id: null,
          shipping_ward_id: ward,
          shipping_fee: transport.price,
          account_type,
          account_no,
        });
      }

      if (user_type === "vendor") {
        const seller = await sellerService.getSellerByEmail(email);

        order = await Order.create({
          created_date: Date.now(),
          delivery_date: date,
          shipping_housenumber_street: housenumber_street,
          shipping_fullname: fullname,
          shipping_mobile: phone_number,
          shipping_email,
          order_status_id: 1,
          shipping_status_id: 1,
          buyer_id: null,
          seller_id: seller.id,
          shipping_ward_id: ward,
          shipping_fee: transport.price,
          account_type,
          account_no,
        });
      }

      if (!order) {
        return false;
      }

      return order;
    } catch (err) {
      return false;
    }
  };
}

module.exports = new OrderService();
