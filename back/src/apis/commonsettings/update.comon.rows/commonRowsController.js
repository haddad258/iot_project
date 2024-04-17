
const createHttpError = require("http-errors");
const uuid = require("uuid");
const app = require("../../../../index");



const updatecommonRows = async (req, res, next) => {
  try {
    
    await app.db
      .table(req.body.data)
      .update({ status:req.body.status })
      .where("id", "=", req.body.id)
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



module.exports = {
  updatecommonRows,
};
  