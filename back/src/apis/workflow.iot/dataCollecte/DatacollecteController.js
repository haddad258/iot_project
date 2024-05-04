
const createHttpError = require("http-errors");
const uuid = require("uuid");
const app = require("../../../../index");

const addDatacollecte = async (req, res, next) => {
  try {
    console.log("here",req.body)
    await app.db
      .table("data_collected")
      .insert(req.body)
      .then(() => {
        res.status(200).json({
          message: "New dataCollecte created",
          status: 200,
          data: req.body,
        });
      });
  } catch (error) {
    console.log("here",error)
    next(
      new createHttpError.BadRequest("Invalid values to create a dataCollecte.")
    );
  }
};

const updateDatacollecte = async (req, res, next) => {
  try {
    await app.db
      .table("data_collected")
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

const getAllDatacollectes = async (req, res, next) => {
  try {
    await app.db
      .from("data_collected")
      .select("*")
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "dataCollecte not found with the given id",
            status: 200,
            data: rows,
          });
        }
        res.json({
          message: "dataCollecte fetched",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.InternalServerError("Internal Server Error"));
  }
};

const getDatacollecteById = async (req, res, next) => {
  try {
    await app.db
      .from("data_collected")
      .select("*")
      .where("id", "=", req.params.id)
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "dataCollecte not found with the given id",
            status: 200,
            data: rows,
          });
        }

        res.json({
          message: "dataCollecte fetched with the given id",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.BadRequest("Bad Request"));
  }
};
const getAllDatacollectesbySensors = async (req, res, next) => {
  try {
    console.log("req.params address_mac_sensor",req.params)
    await app.db
      .from("data_collected")
      .select("*")
      .where("address_mac_sensor","=",req.params.id)
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "dataCollecte not found with the given id",
            status: 200,
            data: rows,
          });
        }
        res.json({
          message: "dataCollecte fetched",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.InternalServerError("Internal Server Error"));
  }
};
module.exports = {
  addDatacollecte,
  updateDatacollecte,
  getAllDatacollectes,
  getDatacollecteById,
  getAllDatacollectesbySensors
};
  