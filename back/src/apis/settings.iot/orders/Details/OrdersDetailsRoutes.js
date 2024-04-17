
const express = require("express");
const OrdersDetailsController = require("./OrdersDetailsController");
const authJwt = require("../../../../middlewares/authJwt");

const restRouterordersDetails = express.Router();

restRouterordersDetails.post("/add", [authJwt.verifyToken],  OrdersDetailsController.addOrdersDetails);
restRouterordersDetails.put("/:id", [authJwt.verifyToken],  OrdersDetailsController.updateOrdersDetails);
restRouterordersDetails.get("/", [authJwt.verifyToken],  OrdersDetailsController.getAllOrdersDetailss);
restRouterordersDetails.get("/:id", [authJwt.verifyToken],  OrdersDetailsController.getOrdersDetailsById);

module.exports = { restRouterordersDetails };
  