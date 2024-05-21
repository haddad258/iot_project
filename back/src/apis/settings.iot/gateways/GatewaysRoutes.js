
const express = require("express");
const GatewaysController = require("./GatewaysController");
const authJwt = require("../../../middlewares/authJwt");

const restRoutergateways = express.Router();

restRoutergateways.post("/", [authJwt.verifyToken],  GatewaysController.addGateways);
restRoutergateways.put("/:id", [authJwt.verifyToken],  GatewaysController.updateGateways);
restRoutergateways.put("/compose/:id", [authJwt.verifyToken],  GatewaysController.updateGatewaysCompose);
restRoutergateways.put("/assign/:id", [authJwt.verifyToken],  GatewaysController.updateGatewaysAssign);
restRoutergateways.put("/decompose/:id", [authJwt.verifyToken],  GatewaysController.decomposeGatways);
restRoutergateways.get("/", [authJwt.verifyToken],  GatewaysController.getAllGateways);
restRoutergateways.get("/:id", [authJwt.verifyToken],  GatewaysController.getGatewaysById);

module.exports = { restRoutergateways };
  