const app = require('../../../index')

const { restRouterTestCollecte } = require("./test.data.collecte/testDataCollecteRouter");

const restRouter = app;

// Import routes  use unique route names
restRouter.use("/test/api/collecte/seed/data", restRouterTestCollecte);


// Add more route imports and usage as needed

module.exports = restRouter;