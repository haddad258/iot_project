const app = require("../../../../index");
const express = require("express");

const { restRouterusers } = require("../admins/UsersRoutes");
const { restRouterprivilege } = require("../privilege/PrivilegeRoutes");
const { restRoutersensors } = require("../sensors/SensorsRoutes");
const { restRoutergateways } = require("../gateways/GatewaysRoutes");
const { restRouterorders } = require("../orders/OrdersRoutes");


const restRouter = app;

// Import routes  use unique route names
restRouter.use("/api/users/admin", restRouterusers);
restRouter.use("/api/privileges/list", restRouterprivilege);
restRouter.use("/api/sensors/list", restRoutersensors);
restRouter.use("/api/gateways/list", restRoutergateways);
restRouter.use("/api/orders/index", restRouterorders);


// Add more route imports and usage as needed

module.exports = restRouter;