const productService = require("../../services/ProductService");


class ProductController {
  index = async (req, res) => {
    const { name } = req.query;

    try {
      const productList = await productService.getProductList(name);

      if (!productList) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(productList);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  store = async (req, res) => {
    const product = req.body;

    try {
      const createdProduct = await productService.storeNewProduct(
        product
      );

      if(!createdProduct) {
        res.status(404).send("NOT FOUND!!!");
                return;
      }

      res.status(201).send(createdProduct);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  edit = async (req, res) => {
    const { id } = req.params;

    try {
      const product = await productService.getProductById(id);

      if (!product) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(product);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  update = async (req, res) => {
    const { id } = req.params;
    const newProduct = req.body;

    try {
      const updatedProduct = await productService.updateProductById(
        id,
        newProduct
      );

      if (!updatedProduct) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(updatedProduct);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  destroy = async (req, res) => {
    const { id } = req.params;

    try {
      const deletedProduct = await productService.deleteProductById(id);

      if (!deletedProduct) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send("Deleted Product Successfully !");
    } catch (error) {
      res.status(500).send(error);
    }
  };
}

module.exports = new ProductController();
