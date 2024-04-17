const app = require("../../../../index");
const express = require("express");

const { restRouterdataCollecte } = require("../dataCollecte/DatacollecteRoutes");

const restRouter = app;

// Import routes  use unique route names
restRouter.use("/api/data/collect/from/sensors", restRouterdataCollecte);



// Add more route imports and usage as needed

module.exports = restRouter;