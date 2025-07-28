const yaml = require("yamljs");

const swaggerDocument = yaml.load("./index.yaml");

module.exports = { swaggerDocument };
