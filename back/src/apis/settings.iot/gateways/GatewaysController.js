
const createHttpError = require("http-errors");
const uuid = require("uuid");
const app = require("../../../../index");

const addGateways = async (req, res, next) => {
  try {
    console.log(req.body)
    await app.db
      .table(`gateways`)
      .insert(req.body)
      .then(() => {
        res.status(200).json({
          message: "New gateways created",
          status: 200,
          data: req.body,
        });
      });
  } catch (error) {
    console.log(error)
    next(
      new createHttpError.BadRequest("Invalid values to create a gateways.")
    );
  }
};

const updateGateways = async (req, res, next) => {
  try {
    console.log(req.body)
    await app.db
      .table("gateways")
      .update({ ...req.body, updated_at: new Date() })
      .where("id", "=", req.params.id)
      .then(() => {
        res.status(200).json({
          message: "Successfully updated",
          status: 200,
          data: req.body,
        });
      });
  } catch (error) {
    next(new createHttpError.InternalServerError(error));
  }
};
const updateGatewaysCompose = async (req, res, next) => {
  try {
    console.log(req.body)
    await app.db
      .table("sensors")
      .update({ gateways:req.params.id, updated_at: new Date() })
      .where("id", "IN", req.body?.sensors)
      .then(() => {
        res.status(200).json({
          message: "Successfully updated",
          status: 200,
          data: req.body,
        });
      });
  } catch (error) {
    next(new createHttpError.InternalServerError(error));
  }
};
const updateGatewaysAssign = async (req, res, next) => {
  try {
    console.log("updateGatewaysAssign",req.body)
    await app.db
      .table("orders")
      .update({ gateways:req.params.id, updated_at: new Date() })
      .where("id", "IN", req.body?.orders)
      .then(() => {
        res.status(200).json({
          message: "Successfully updated",
          status: 200,
          data: req.body,
        });
      });
  } catch (error) {
    next(new createHttpError.InternalServerError(error));
  }
};


const getAllGateways = async (req, res, next) => {
  try {
    await app.db
      .from("gateways")
      .select("*")
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "gateways not found with the given id",
            status: 200,
            data: rows,
          });
        }
        res.json({
          message: "gateways fetched",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.InternalServerError("Internal Server Error"));
  }
};

const getGatewaysById = async (req, res, next) => {
  try {
    await app.db
      .from("gateways")
      .select("*")
      .where("id", "=", req.params.id)
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "gateways not found with the given id",
            status: 200,
            data: rows,
          });
        }

        res.json({
          message: "gateways fetched with the given id",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.BadRequest("Bad Request"));
  }
};

module.exports = {
  addGateways,
  updateGateways,
  getAllGateways,
  getGatewaysById,
  updateGatewaysCompose,
  updateGatewaysAssign
};
  