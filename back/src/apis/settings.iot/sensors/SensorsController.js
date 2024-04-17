
const createHttpError = require("http-errors");
const uuid = require("uuid");
const app = require("../../../../index");

const addSensors = async (req, res, next) => {
  try {
    console.log(req.body, "sensors")
    await app.db
      .table(`sensors`)
      .insert(req.body)
      .then(() => {
        res.status(200).json({
          message: "New sensors created",
          status: 200,
          data: req.body,
        });
      });
  } catch (error) {
    console.log(error)
    next(
      new createHttpError.BadRequest("Invalid values to create a sensors.")
    );
  }
};

const updateSensors = async (req, res, next) => {
  try {
    await app.db
      .table("sensors")
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

const getAllSensors = async (req, res, next) => {
  try {
    await app.db
      .from("sensors")
      .select("*")
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "sensors not found with the given id",
            status: 200,
            data: rows,
          });
        }
        res.json({
          message: "sensors fetched",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.InternalServerError("Internal Server Error"));
  }
};

const getSensorsById = async (req, res, next) => {
  try {
    await app.db
      .from("sensors")
      .select("*")
      .where("id", "=", req.params.id)
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "sensors not found with the given id",
            status: 200,
            data: rows,
          });
        }

        res.json({
          message: "sensors fetched with the given id",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.BadRequest("Bad Request"));
  }
};
const getSensorsByIdGateway = async (req, res, next) => {
  try {
    console.log("getSensorsByIdGateway",req.params.id)
    const Gateway = await app.db
      .from("gateways")
      .select("*")
      .where("id", "=", req.params.id)
    console.log("getSensorsByIdGateway",Gateway)

    const sensors = await app.db
      .from("sensors")
      .select("*")
      .where("gateways", "=", req.params.id)
      console.log("getSensorsByIdGateway",sensors)

    res.json({
      message: "sensors fetched with the given id",
      status: 200,
      data: { gateway:Gateway, sensors:sensors },
    });
  } catch (error) {
    next(new createHttpError.BadRequest("Bad Request"));
  }
};

module.exports = {
  addSensors,
  updateSensors,
  getAllSensors,
  getSensorsById,
  getSensorsByIdGateway
};
