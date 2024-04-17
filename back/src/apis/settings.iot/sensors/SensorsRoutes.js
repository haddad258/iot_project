
const express = require("express");
const SensorsController = require("./SensorsController");
const authJwt = require("../../../middlewares/authJwt");

const restRoutersensors = express.Router();

restRoutersensors.post("/", [authJwt.verifyToken],  SensorsController.addSensors);
restRoutersensors.put("/:id", [authJwt.verifyToken],  SensorsController.updateSensors);
restRoutersensors.get("/", [authJwt.verifyToken],  SensorsController.getAllSensors);
restRoutersensors.get("/:id", [authJwt.verifyToken],  SensorsController.getSensorsById);
restRoutersensors.get("/list/bygateway/:id", [authJwt.verifyToken],  SensorsController.getSensorsByIdGateway);

module.exports = { restRoutersensors };
  