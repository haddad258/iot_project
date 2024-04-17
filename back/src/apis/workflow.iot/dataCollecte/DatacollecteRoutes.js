
const express = require("express");
const DatacollecteController = require("./DatacollecteController");
const authJwt = require("../../../middlewares/authJwt");
const restRouterdataCollecte = express.Router();


restRouterdataCollecte.post("/add", /* [authJwt.verifyToken], */  DatacollecteController.addDatacollecte);
restRouterdataCollecte.put("/:id", /* [authJwt.verifyToken], */  DatacollecteController.updateDatacollecte);
restRouterdataCollecte.get("/", /* [authJwt.verifyToken], */  DatacollecteController.getAllDatacollectes);
restRouterdataCollecte.get("/:id", /* [authJwt.verifyToken], */  DatacollecteController.getDatacollecteById);
restRouterdataCollecte.get("/bysensors/:id", /* [authJwt.verifyToken], */  DatacollecteController.getAllDatacollectesbySensors);

module.exports = { restRouterdataCollecte };
  