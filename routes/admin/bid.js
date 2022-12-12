const express = require("express");
const bidRouter = express.Router();
const bidController = require("../../app/controllers/admin/BidController");
const { authenticate } = require("../../app/middlewares/auth/authenticate");

bidRouter.get("/", authenticate, bidController.index);

bidRouter.get("/:id", authenticate, bidController.edit);

bidRouter.post("/", authenticate, bidController.store);

bidRouter.put("/:id", authenticate, bidController.update);

bidRouter.delete("/:id", authenticate, bidController.destroy);

module.exports = bidRouter;
