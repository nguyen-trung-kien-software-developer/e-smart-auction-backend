const firstSubCategoryService = require("../../services/FirstSubCategoryService");
const productService = require("../../services/ProductService");

class HomeController {
  // [GET]: /get-all-parent-categories
  getOneProductByFirstSubCategoryId = async (req, res) => {
    try {
      const { firstSubCategory_id } = req.query;

      const product =
        await firstSubCategoryService.getOneProductByFirstSubCategoryId(
          firstSubCategory_id
        );

      if (!product) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }
      res.status(200).send(product);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  // [GET]: /get-lastest-auction
  getLastestAuction = async (req, res) => {
    try {
      const products =
        await productService.getLastestProductListOrderByAuctionStartDesc();

      if (!products) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(products);
    } catch (error) {
      res.status(500).send(err);
    }
  };
}

module.exports = new HomeController();
