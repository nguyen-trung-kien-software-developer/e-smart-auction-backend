const express = require("express");
const transportRouter = express.Router();
const transportController = require("../../app/controllers/admin/TransportController");
const { authenticate } = require("../../app/middlewares/auth/authenticate");

transportRouter.get("/", authenticate, transportController.index);

transportRouter.get("/:id", authenticate, transportController.edit);

transportRouter.post("/", authenticate, transportController.store);

transportRouter.put("/:id", authenticate, transportController.update);

transportRouter.delete("/:id", authenticate, transportController.destroy);

module.exports = transportRouter;
