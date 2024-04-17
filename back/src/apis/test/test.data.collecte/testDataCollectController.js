
const createHttpError = require("http-errors");
const uuid = require("uuid");
const app = require("../../../../index");

function getRandomElementFromArray(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }
  function getRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
const data_qualitys =["Accuracy","Precision","Consistency","Reliability"]
const transmission_protocols =["REST","MQTT","HTTP","5G","3G-4G"]
const stat= ["ON","OFF","Suspend"]
const getListe = async (req, res, next) => {
  try {
    
    const sensorsId= await app.db.select("id").from('sensors')
    const gatewaysId= await app.db.select("id").from('gateways')
    console.log("getListe",sensorsId)
    console.log("getListe",gatewaysId)

    for (let index = 0; index < 20; index++) {
        for (const sensors of sensorsId) {
            await  app.db.transaction(async (trx) => {
                console.log(sensors)
               await trx("data_collected").insert({
                sensor:sensors.id,
                gateway:getRandomElementFromArray(gatewaysId).id,
                measurement: getRandomNumberBetween(1,100),
                measurement_accuracy:getRandomNumberBetween(1,5),
                data_quality:getRandomElementFromArray(data_qualitys),
                transmission_protocol:getRandomElementFromArray(transmission_protocols),
                status:getRandomElementFromArray(stat)
               });
    
            });
            console.log(`Transaction for  successfully completed!`);
          }
        
    }


   
  } catch (error) {
    next(new createHttpError.InternalServerError(error));
  }
};



module.exports = {
    getListe,
};
  