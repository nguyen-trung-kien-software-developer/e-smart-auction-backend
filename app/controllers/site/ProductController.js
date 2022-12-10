const productService = require("../../services/ProductService");

class ProductController {
  // [GET]: /get-products-by-first-sub-category-slug/:firstSubCategorySlug
  getProductsByFirstSubCategorySlug = async (req, res) => {
    try {
      const { firstSubCategorySlug } = req.params;
      let { page, price_from, price_to, size_id, color_id, sort } = req.query;

      if (page != undefined) {
        page = page - 1;
      }
      if (page == undefined) {
        page = 0;
      }

      const allProducts =
        await productService.getProductListByFirstSubCategorySlug(
          firstSubCategorySlug,
          page,
          price_from,
          price_to,
          size_id,
          color_id,
          sort
        );

      const products =
        await productService.getProductListByFirstSubCategorySlugHavingLimit(
          firstSubCategorySlug,
          page,
          price_from,
          price_to,
          size_id,
          color_id,
          sort
        );

      if (!products) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      let result = { ...products, page_number: allProducts.length };

      res.status(200).send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  // [GET]: /get-products-by-second-sub-category-slug/:secondSubCategorySlug
  getProductsBySecondSubCategorySlug = async (req, res) => {
    try {
      const { secondSubCategorySlug } = req.params;
      let { page, price_from, price_to, size_id, color_id, sort } = req.query;

      if (page != undefined) {
        page = page - 1;
      }
      if (page == undefined) {
        page = 0;
      }

      const allProducts =
        await productService.getProductListBySecondSubCategorySlug(
          secondSubCategorySlug,
          page,
          price_from,
          price_to,
          size_id,
          color_id,
          sort
        );

      const products =
        await productService.getProductListBySecondSubCategorySlugHavingLimit(
          secondSubCategorySlug,
          page,
          price_from,
          price_to,
          size_id,
          color_id,
          sort
        );

      if (!products) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      let result = { ...products, page_number: allProducts.length };

      res.status(200).send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  // [GET]: /show/:productSlug
  show = async (req, res) => {
    try {
      const { productSlug } = req.params;

      const product = await productService.getProductBySlug(productSlug);

      if (!product) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(product);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  // [GET]: /get-related-products-by-product-slug/:productSlug
  fetchRelatedProducts = async (req, res) => {
    try {
      const { productSlug } = req.params;

      const products = await productService.getRelatedProductsByProductSlug(
        productSlug
      );

      if (!products) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(products);
    } catch (error) {
      res.status(500).send(error);
    }
  };
}

module.exports = new ProductController();
