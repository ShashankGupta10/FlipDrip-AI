const express = require("express");
const cartRouter = express.Router();
const { cartController, cartRecieveController } = require("../controllers/cartControllers.js");

cartRouter.route("/").post(cartController);
cartRouter.route("/").get(cartRecieveController);

module.exports = {
  cartRouter,
};
