const express = require("express");
const productRouter = express.Router();
const productController = require("../../app/controllers/admin/ProductController");
const { authenticate } = require("../../app/middlewares/auth/authenticate");

productRouter.get("/", authenticate, productController.index);

productRouter.get("/:id", authenticate, productController.edit);

productRouter.post("/", authenticate, productController.store);

productRouter.put("/:id", authenticate, productController.update);

productRouter.delete("/:id", authenticate, productController.destroy);

module.exports = productRouter;
