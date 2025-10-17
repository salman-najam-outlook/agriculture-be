require("dotenv").config();
process.env.DEBUG = process.env.DEBUG || 'api:server api:error api:email api:sms' || 'api*';
var logger = require("morgan");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const app = express();
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
// const redis = require("./components/redis");
const swaggerOptions = require("./swagger-config");
const { natsWrapper } = require("./helpers/event_bus/nats-wrapper.js");
const { MongoClient } = require('mongodb');
const i18n = require('i18n');
// setting global variable rootPath
global.rootPath = path.resolve(__dirname);
const rabbitMQService = require("./helpers/rabbitmq/marketplace-consumer.js");
global.globalTranslationCache = {}
global.endPoint = ""
global.httpMethod = ""
// allow request from following URL's
// var corsOptions = {
//   origin: "http://ec2-3-218-20-78.compute-1.amazonaws.com",
//   optionsSuccessStatus: 200, // For legacy browser support
// };

const mongoURL = process.env.MONGO_URL || 'mongodb://dimitra:u1q2c2Fzt3vn2hFhiFC6j@127.0.0.1:27017/admin?replicaSet=mongodb&ssl=false&directConnection=true';
const client = new MongoClient(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
// Connect to MongoDB
client.connect()
  .then(() => {
    console.log('Connected to MongoDB');
    app.locals.mongoClient = client;
  })
  .catch(err => {
    // console.error('Error connecting to MongoDB:', err);
    // Handle connection error
  });

  i18n.configure({
    locales: ['en', 'es', 'sw'],
    defaultLocale: 'en',
    directory: __dirname + '/locales',
    cookie: 'lang',
  });

  app.use((req, res, next) => {
    res.locals.__ = res.__;
    next();
  });

const specs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(helmet());
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
app.use(logger("dev"));

app.use("/api", require("./routes"));
// app.use(express.static("./client"));
app.use(express.static(__dirname + "/files/carbon_credit"));
app.use(express.static(__dirname + '/assets/'));
app.get("/", async (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
// rabbitMQService.initializeConsumer();

module.exports = app;
