const sellerService = require("../../services/SellerService");

class SellerController {
  // [GET]: /get-all-sellers
  fetchAllSellers = async (req, res) => {
    try {
      let { page, name } = req.query;

      if (page != undefined) {
        page = page - 1;
      }
      if (page == undefined) {
        page = 0;
      }

      const sellers = await sellerService.getAllSellers(page, name);

      if (!sellers) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(sellers);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  // [GET]: /show/:sellerId
  show = async (req, res) => {
    try {
      const { sellerId, sort, product_name } = req.params;

      const seller = await sellerService.getSellerById(
        sellerId,
        sort,
        product_name
      );

      if (!seller) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(seller);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  // [PUT]: /update-account
  updateAccount = async (req, res) => {
    try {
      const user = req.user;

      const seller = await sellerService.updateSellerById(
        req.body,
        user
      );

      if (!seller) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(seller);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  // [GET]: /get-orders-by-seller-id
  getOrderBySellerId = async (req, res) => {
     try {
      const user = req.user;

      const orders = await sellerService.getOrderListBySellerIdOrderByCreatedDateDesc(
        user
      );

      if (!orders) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(orders);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  // [GET]: /get-products-by-seller-id
  getProductBySellerId = async (req, res) => {
    try {
      const user = req.user;

      const products = await sellerService.getProductListBySellerIdOrderByCreatedDateDesc(
        user
      );

      if (!products) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(products);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  // [GET]: /get-products-in-store
  getProductInStore = async (req, res) => {
    try {
      const user = req.user;
      let { page, sort } = req.query;

      if (page != undefined) {
        page = page - 1;
      }
      if (page == undefined) {
        page = 0;
      }

      const products = await sellerService.getProductInStoreHavingLimit(
        user,
        page,
        sort
      );

      if (!products) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(products);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  // [GET]: /get-product-detail-by-product-id/:productId
  getProductDetailByProductId = async (req, res) => {
    try {
      const user = req.user;
      const { productId } = req.params;

      const product = await sellerService.getProductDetailByProductId(
        productId,
        user
      );

      if (!product) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(product);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  // [PUT]: /update-store-information
  updateStoreInformation = async (req, res) => {
    try {
      const user = req.user;

      const seller = await sellerService.updateStoreInformationBySellerLogon(
        req.body,
        user
      );

      if (!seller) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(seller);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  // [POST]: /create-new-product
  createNewProduct = async (req, res) => {
    try {
      const user = req.user;

      const product = await sellerService.createNewProductBySeller(
        req.body,
        user
      );

      if (!product) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(product);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  // [PUT]: /update-product/:productId
  updateProduct = async (req, res) => {
    try {
      const user = req.user
      const { productId } = req.params;

      const product = await sellerService.updateProductByProductId(
        req.body,
        user,
        productId
      );

      if (!product) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(product);
    } catch (error) {
      console.log(error)
      res.status(500).send(error);
    }
  }

  detroyProduct = async (req, res) => {
    try {
      const user = req.user
      const { productId } = req.params;

      const product = await sellerService.deleteProductByProductId(
        user,
        productId
      );

      if (!product) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send('Deleted successfully!');
    } catch (error) {
      console.log(error)
      res.status(500).send(error);
    }
  }

  // [GET]: /get-wallet
  getWallet = async (req, res) => {
    try {
      const user = req.user;

      const wallet = await sellerService.getWallet(user);

      if (!wallet) {
        res.status(404).send("NOT FOUND!!!");
        return;
      }
      
      res.status(200).send(wallet);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  // [GET]: 
  dashboard = async (req, res) => {
    try {
      const user = req.user;

      const dashboard = await sellerService.getSellerDashboard(user);

      if (!dashboard) {
        res.status(404).send("NOT FOUND!!!");
        return;
      }

      res.status(200).send(dashboard);
  } catch (error) {
      res.status(500).send(error); 
  }
}
}

module.exports = new SellerController();
