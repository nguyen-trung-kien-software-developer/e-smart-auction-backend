const orderItemService = require("../../services/OrderItemService");
const orderService = require("../../services/OrderService");

class PaymentController {
  // [POST]: /processPayment
  processPayment = async (req, res) => {
    try {
      const requestedOrder = req.body.order;
      const requestedOrderItems = req.body.orderItems;
      const productType = req.body.product_type;
      const user = req.user;

      const order = await orderService.saveNewOrder(requestedOrder, user);

      if (!order) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      const orderItem = await orderItemService.saveNewOrderItem(
        requestedOrderItems,
        order,
        productType,
        user
      );

      if (!orderItem) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(order);
    } catch (err) {
      res.status(500).send(err);
    }
  };
}

module.exports = new PaymentController();
