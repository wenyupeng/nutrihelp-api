require("dotenv").config();

const folderInit = require('./middleware/folderInit');
folderInit.init();

const express = require("express");
const app = express();

require('./config/logger');

// apply global limiter
const { globalLimiter } = require('./middleware/rateLimiter');
app.use(globalLimiter);

// helmet security
const helmetConfig = require('./config/helmetConfig');
app.use(helmetConfig);

// swagger doc
const swaggerUi = require("swagger-ui-express");
const { swaggerDocument } = require("./config/swagger");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
