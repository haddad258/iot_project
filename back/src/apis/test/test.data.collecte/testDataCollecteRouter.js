
const express = require("express");
const TestCollectController = require("./testDataCollectController");

const authJwt = require("../../../middlewares/authJwt");
const restRouterTestCollecte = express.Router();

restRouterTestCollecte.get("/list", /* [authJwt.verifyToken], */  TestCollectController.getListe);
restRouterTestCollecte.get("/norep", /* [authJwt.verifyToken], */  TestCollectController.norep);

module.exports = { restRouterTestCollecte };
  