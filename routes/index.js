const firstSubCategoryRouter = require("./site/firstSubCategory");
const homeRouter = require("./site/home.route");
const menuRouter = require("./site/menu.route");
const parentCategoryRouter = require("./site/parentCategoryList");
const productRouter = require("./site/product");
const sizeRouter = require("./site/size");
const colorRouter = require("./site/color");
const sellerRouter = require("./site/seller");
const contactRouter = require("./site/contact");
const userRouter = require("./site/user");
const wardRouter = require("./site/ward");
const districtRouter = require("./site/district");
const provinceRouter = require("./site/province");
const bidRouter = require("./site/bid");
const braintreeRouter = require("./site/braintree");
const paymentRouter = require("./site/payment");
const transportRouter = require("./site/transport");
const buyerRouter = require("./site/buyer");
const authRouter = require("./admin/auth");
const adminUserRouter = require("./admin/user");
const uploadRouter = require("./admin/upload");
const adminParentCategoryRouter = require("./admin/parentCategory");
const adminFirstSubCategoryRouter = require("./admin/firstSubCategory");
const adminSecondSubCategoryRouter = require("./admin/secondSubCategory");
const adminTransportRouter = require("./admin/transport");
const adminBidRouter = require("./admin/bid");
const adminSuccessBidRouter = require("./admin/successBid");
const adminProductRouter = require("./admin/product");
const withdrawRequestRouter = require("./admin/withdrawRequest");
;

const route = (app) => {
  // site
  app.get("/", (req, res) => {
    res.redirect("/home");
  });
  app.use("/menu", menuRouter);
  app.use("/home", homeRouter);
  app.use("/parent-category", parentCategoryRouter);
  app.use("/first-sub-category", firstSubCategoryRouter);
  app.use("/product", productRouter);
  app.use("/size", sizeRouter);
  app.use("/color", colorRouter);
  app.use("/seller", sellerRouter);
  app.use("/buyer", buyerRouter);
  app.use("/contact", contactRouter);
  app.use("/user", userRouter);
  app.use("/ward", wardRouter);
  app.use("/district", districtRouter);
  app.use("/province", provinceRouter);
  app.use("/bid", bidRouter);
  app.use("/braintree", braintreeRouter);
  app.use("/payment", paymentRouter);
  app.use("/transport", transportRouter);

  // admin
  app.use("/admin", authRouter);
  app.use("/admin/user", adminUserRouter);
  app.use("/admin/upload", uploadRouter);
  app.use("/admin/parent-category", adminParentCategoryRouter);
  app.use("/admin/first-sub-category", adminFirstSubCategoryRouter);
  app.use("/admin/second-sub-category", adminSecondSubCategoryRouter);
  app.use("/admin/transport", adminTransportRouter);
  app.use("/admin/bid", adminBidRouter);
  app.use("/admin/success-bid", adminSuccessBidRouter);
  app.use("/admin/product", adminProductRouter);
  app.use("/admin/withdraw", withdrawRequestRouter);
};

module.exports = route;
