
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
fs = require('fs');
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "LOGISTIC API",
    version: "1.0.0",
    description: "Document for logistic plateform",
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
      name: "H.rafik",
      url: "haddadrafik258@gmail.com",
    },
  },
  servers: [
    {
      url: "http://localhost:8009",
      description: "Development server",
    },
  ],
  components: {
    securitySchemes: {
      jwt: {
        type: "http",
        scheme: "bearer",
        in: "header",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      jwt: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./src/apis/web/*.js", "./src/apis/mobile/*.js", "./src/apis/statistic/*.js"],
};



const swaggerSpec = swaggerJSDoc(options);
const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

const env = require("./env");
const db = require("./database");

app.set("view engine", "html");
app.set("views", path.join(__dirname, "views"));
app.get("/renderfile", /* [authJwt.verifyToken],  */async (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname + '/views/index.html'));
  }
  catch (error) {
    console.log(error)

  }
});
/**
 * @swagger
 * /image/entities/:typeentity/:name/{entity}:
 *   put:
 *     summary: update  admin.
 *     description: Id of user
 *     tags:
 *       - admin
 *     requestBody:
 *       name: Optional description in *Markdown*
 *       required: true
 *       decription: Optional description in *Markdown*
 *       reuired: false
 *       content:
 *         application/json:
 *           schema:
 *             allOf:
 *               -  $ref: '#/components/schemas/app_user'
 *               -  $ref: '#/components/schemas/admin'
 *             properties:
 *               privilege:
 *                 type: string
 *                 description: The privilege's ID.
 *                 example: admin
 *               permissions:
 *                 type: array
 *                 description: The permission's ID.
 *                 example: ['03de03c4-64fd-40e8-ba8c-b7273d06f83f']
 *
 *     parameters:

 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID user.
 *         schema:
 *           type: string
 *
 *     responses:
 *       200:
 *         description: user updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     username:          # <!--- form field username
 *                             type: string
 *                     lastname:          # <!--- form field lastname
 *                             type: string
 *                     firstname:          # <!--- form field firstname
 *                              type: string
 *                     phone_number:          # <!--- form field phone_number
 *                                type: string
 *                     address:          # <!--- form field address
 *                            type: string
 *                     password:          # <!--- form field password
 *                             type: string
 *                     descriminator:          # <!--- form field descriminator
 *                                  type: string
 *                     email:          # <!--- form field email
 *                          type: string
 *
 *                     comapny:          # <!--- form field email
 *                          type: string
 *                     code_postal:          # <!--- form field email
 *                          type: string
 *                     code_fiscal:          # <!--- form field email
 *                          type: string
 */

app.get('/image/entities/:typeentity/:name', (req, res) => {
  
  // res.contentType("application/csv");
  //res.download(__dirname + '/public/apk/'+req.params.apk, "version21.apk", (err) => {
  //res.status(200).sendFile(__dirname + '/public/'+req.params.typeentity+'/'+req.params.name);
  var img = fs.readFileSync(__dirname + '/public/' + req.params.typeentity + '/' + req.params.name);
  res.writeHead(200, { 'Content-Type': 'image/png' });
  res.end(img, 'binary');
  if (Error) res.status(200).sendFile(__dirname + '/public/whaite.png');
});


app.db = db;

module.exports = app;

require("./contributor-1");

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
console.log("listening on port " + env.port);
app.listen(env.port || 80);
