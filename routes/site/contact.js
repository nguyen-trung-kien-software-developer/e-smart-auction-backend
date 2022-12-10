const express = require("express");
const contactRouter = express.Router();
const contactController = require("../../app/controllers/site/ContactController");

// contactRouter.get("/contact-us", contactController.index);

contactRouter.post("/contact-us/send-email", contactController.sendEmail);

module.exports = contactRouter;
